/* ===================================================== */
/* DRAFTENGINE.JS - LÓGICA DO DRAFT */
/* ===================================================== */

/*
  Este arquivo cuida da lógica:
  - sortear time;
  - guardar time sorteado;
  - listar jogadores disponíveis.

  A parte visual continua no renderDraft.js.
*/


/* ===================================================== */
/* CONTROLE ANTI-REPETIÇÃO DE CLUBE NO DRAFT */
/*
  Objetivo:
  - Evitar que o mesmo clube caia várias vezes seguidas;
  - Funciona mesmo quando o clube tem temporadas diferentes;
  - Exemplo: Barcelona 2008/2009 bloqueia Barcelona 2010/2011 por algumas rolagens;
  - Não remove times da database;
  - Não impede o clube de aparecer para sempre;
  - Se o filtro bloquear todos os times disponíveis, o sorteio volta ao normal para não travar o jogo.
*/
/* ===================================================== */

const NORMAL_DRAFT_CLUB_COOLDOWN = 3;
const ELITE_DRAFT_CLUB_COOLDOWN = 5;

function normalizeClubName(name) {
  if (!name) return "";

  return name
    .toString()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]/g, "")
    .trim();
}

function getTeamClubKey(team) {
  if (!team) return "";

  return normalizeClubName(team.club || team.name || team.id || "");
}
/* ===================================================== */
/* MODO DO DRAFT - NORMAL / ELITE */
/*
  Controla quais times podem aparecer no sorteio do Draft.

  Regras:
  - normal = usa toda a database;
  - elite  = usa apenas campeões e vices.

  Importante:
  - ainda não altera campanha;
  - ainda não altera simulação;
  - ainda não altera mata-mata;
  - apenas filtra a pool do sorteio do Draft.
*/
/* ===================================================== */

function normalizeDraftText(value) {
  if (!value) return "";

  return value
    .toString()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]/g, "")
    .trim();
}

function getTeamDraftCategory(team) {
  const category = normalizeDraftText(team?.categoryType || team?.type || "");

  if (
    category.includes("runner") ||
    category.includes("runnerup") ||
    category.includes("vice") ||
    category.includes("finalista")
  ) {
    return "runnerUp";
  }

  if (
    category.includes("champion") ||
    category.includes("campeao")
  ) {
    return "champion";
  }

  if (
    category.includes("underdog") ||
    category.includes("azarao")
  ) {
    return "underdog";
  }

  if (
    category.includes("historic") ||
    category.includes("historico")
  ) {
    return "historic";
  }

  return "historic";
}

function getDraftMode() {
  return window.gameState?.selectedDraftMode || "normal";
}

function isEliteDraftMode() {
  return getDraftMode() === "elite";
}
function getDraftClubCooldown() {
  if (isEliteDraftMode()) {
    return ELITE_DRAFT_CLUB_COOLDOWN;
  }

  return NORMAL_DRAFT_CLUB_COOLDOWN;
}
function getDraftTeamOverallValue(team) {
  const overall = Number(team?.teamOverall || team?.finalPower || 0);

  if (!Number.isFinite(overall)) {
    return 0;
  }

  return overall;
}

function isHistoricEliteForDraft(team) {
  return (
    getTeamDraftCategory(team) === "historic" &&
    getDraftTeamOverallValue(team) >= 86
  );
}

function isHistoricStrongForDraft(team) {
  const overall = getDraftTeamOverallValue(team);

  return (
    getTeamDraftCategory(team) === "historic" &&
    overall >= 85 &&
    overall < 86
  );
}

function isEliteUnderdogForDraft(team) {
  return (
    getTeamDraftCategory(team) === "underdog" &&
    getDraftTeamOverallValue(team) >= 82
  );
}

function isTeamAllowedInEliteDraftMode(team) {
  const category = getTeamDraftCategory(team);

  return (
    category === "champion" ||
    category === "runnerUp" ||
    isHistoricEliteForDraft(team) ||
    isHistoricStrongForDraft(team) ||
    isEliteUnderdogForDraft(team)
  );
}

function isTeamAllowedInDraftMode(team) {
  if (!isEliteDraftMode()) {
    return true;
  }

  return isTeamAllowedInEliteDraftMode(team);
}

function getTeamsDatabaseForDraftMode() {
  const database = window.teamsDatabase || [];

  if (!isEliteDraftMode()) {
    return database;
  }

  return database.filter((team) => {
    return isTeamAllowedInDraftMode(team);
  });
}
function getRecentDraftClubs() {
  const state = window.gameState;

  if (!state) {
    return [];
  }

  if (!Array.isArray(state.recentDraftClubs)) {
    state.recentDraftClubs = [];
  }

  return state.recentDraftClubs;
}

function rememberDraftClub(team) {
  const recentClubs = getRecentDraftClubs();
  const clubKey = getTeamClubKey(team);

  if (!clubKey) {
    return;
  }

  recentClubs.push(clubKey);

while (recentClubs.length > getDraftClubCooldown()) {
  recentClubs.shift();
}
}
/* ===================================================== */
/* PERFIL DE SORTEIO POR MODO */
/*
  Define a chance de cada tipo de time sair no botão ROLAR.

  Normal:
  - 25% campeões;
  - 25% vices;
  - 40% históricos;
  - 10% azarões.

  Elite:
  - 27% campeões;
  - 25% vices;
  - 35% históricos over >= 86;
  - 10% históricos over >= 85 e menor que 86;
  - 3% azarões over >= 82.
*/
/* ===================================================== */

function getDraftDrawModeProfile() {
  if (isEliteDraftMode()) {
    return [
      {
        key: "champion",
        chance: 27,
        filter: (team) => getTeamDraftCategory(team) === "champion"
      },
      {
        key: "runnerUp",
        chance: 25,
        filter: (team) => getTeamDraftCategory(team) === "runnerUp"
      },
      {
        key: "historicElite",
        chance: 35,
        filter: (team) => isHistoricEliteForDraft(team)
      },
      {
        key: "historicStrong",
        chance: 10,
        filter: (team) => isHistoricStrongForDraft(team)
      },
      {
        key: "underdog",
        chance: 3,
        filter: (team) => isEliteUnderdogForDraft(team)
      }
    ];
  }

  return [
    {
      key: "champion",
      chance: 25,
      filter: (team) => getTeamDraftCategory(team) === "champion"
    },
    {
      key: "runnerUp",
      chance: 25,
      filter: (team) => getTeamDraftCategory(team) === "runnerUp"
    },
    {
      key: "historic",
      chance: 40,
      filter: (team) => getTeamDraftCategory(team) === "historic"
    },
    {
      key: "underdog",
      chance: 10,
      filter: (team) => getTeamDraftCategory(team) === "underdog"
    }
  ];
}

function pickDraftDrawRule(profile) {
  const totalChance = profile.reduce((total, rule) => {
    return total + rule.chance;
  }, 0);

  let randomChance = Math.random() * totalChance;

  for (const rule of profile) {
    randomChance -= rule.chance;

    if (randomChance <= 0) {
      return rule;
    }
  }

  return profile[profile.length - 1];
}
/* ===================================================== */
/* PESO DE SORTEIO POR FORÇA DO TIME */
/*
  Deixa o Draft mais difícil.

  A lógica olha o maior rating disponível do time.
  Isso é melhor do que olhar apenas o elenco completo, porque:
  - se o jogador 99 já foi usado;
  - ou não encaixa em nenhuma vaga livre;
  o time não precisa continuar sendo tão penalizado.

  A partir de jogador 95 disponível, o time já fica mais raro.
  Times com jogador 99 ainda podem sair, mas ficam bem mais raros.
*/
/* ===================================================== */

function getTeamHighestAvailablePlayerRating(team) {
  const availablePlayers = getAvailablePlayersFromTeam(team);

  if (!Array.isArray(availablePlayers) || availablePlayers.length === 0) {
    return 0;
  }

  return availablePlayers.reduce((highestRating, player) => {
    return Math.max(highestRating, player.rating || 0);
  }, 0);
}

function getDraftTeamDrawWeight(team) {
  const highestRating = getTeamHighestAvailablePlayerRating(team);
  const teamPower = team?.finalPower || team?.teamOverall || 85;

  let weight = 1;

  /*
    Peso pelo melhor jogador disponível.
    A partir de 95 já fica raro.

    Quanto menor o peso, menor a chance do time sair.
  */
  if (highestRating >= 99) {
    weight *= 0.25;
  } else if (highestRating >= 98) {
    weight *= 0.35;
  } else if (highestRating >= 97) {
    weight *= 0.45;
  } else if (highestRating >= 96) {
    weight *= 0.55;
  } else if (highestRating >= 95) {
    weight *= 0.65;
  }

  /*
    Peso pela força geral do time.
    Times muito fortes também ficam um pouco mais raros.
  */
  if (teamPower >= 92) {
    weight *= 0.80;
  } else if (teamPower >= 89) {
    weight *= 0.92;
  } else if (teamPower <= 84) {
    weight *= 1.12;
  }

  /*
    Segurança:
    nunca deixa o peso zerar.
    O time raro ainda pode aparecer, só fica mais difícil.
  */
  return Math.max(0.10, Math.min(weight, 1.25));
}

function pickWeightedDraftTeam(teams) {
  if (!Array.isArray(teams) || teams.length === 0) {
    return null;
  }

  const weightedTeams = teams.map((team) => {
    return {
      team: team,
      weight: getDraftTeamDrawWeight(team)
    };
  });

  const totalWeight = weightedTeams.reduce((total, item) => {
    return total + item.weight;
  }, 0);

  let randomWeight = Math.random() * totalWeight;

  for (const item of weightedTeams) {
    randomWeight -= item.weight;

    if (randomWeight <= 0) {
      return item.team;
    }
  }

  return weightedTeams[weightedTeams.length - 1].team;
}
function pickTeamAvoidingRecentClubs(teams) {
  if (!Array.isArray(teams) || teams.length === 0) {
    return null;
  }

const recentClubs = new Set(
  getRecentDraftClubs().slice(-getDraftClubCooldown())
);

  const filteredTeams = teams.filter((team) => {
    const clubKey = getTeamClubKey(team);

    if (!clubKey) {
      return true;
    }

    return !recentClubs.has(clubKey);
  });

  /*
    Se ainda houver times depois do filtro, sorteia deles.
    Se o filtro bloquear tudo, usa a lista original para evitar bug/travamento.
  */
  const finalPool = filteredTeams.length > 0 ? filteredTeams : teams;

  /*
    Sorteio com peso:
    - mantém o anti-repetição de clube;
    - reduz a chance de times com jogadores 95+;
    - deixa o Draft mais difícil sem remover nenhum time.
  */
  return pickWeightedDraftTeam(finalPool);
}

/* ===================================================== */
/* SORTEIA TIME DE ACORDO COM O MODO */
/*
  Primeiro escolhe uma categoria pela porcentagem do modo.
  Depois sorteia dentro daquela categoria usando:
  - anti-repetição de clube;
  - peso por jogador 95+;
  - peso por força geral do time.
*/
/* ===================================================== */

function pickDraftTeamByMode(availableTeams) {
  if (!Array.isArray(availableTeams) || availableTeams.length === 0) {
    return null;
  }

  const profile = getDraftDrawModeProfile();
  const selectedRule = pickDraftDrawRule(profile);

  const selectedPool = availableTeams.filter((team) => {
    return selectedRule.filter(team);
  });

  if (selectedPool.length > 0) {
    return pickTeamAvoidingRecentClubs(selectedPool);
  }

  /*
    Fallback:
    se a categoria sorteada não tiver time útil para a posição atual,
    tenta as outras categorias do mesmo modo.
  */
  const fallbackRules = profile.filter((rule) => {
    return rule.key !== selectedRule.key;
  });

  for (const rule of fallbackRules) {
    const fallbackPool = availableTeams.filter((team) => {
      return rule.filter(team);
    });

    if (fallbackPool.length > 0) {
      return pickTeamAvoidingRecentClubs(fallbackPool);
    }
  }

  return pickTeamAvoidingRecentClubs(availableTeams);
}
/* ===================================================== */
/* RETORNA TIMES QUE AINDA TÊM JOGADORES ÚTEIS */
/*
  Usa a database completa e remove times que não possuem
  nenhum jogador disponível para entrar no campo.
*/
/* ===================================================== */

function getAvailableTeamsForDraft() {
  const database = getTeamsDatabaseForDraftMode();

  return database.filter((team) => {
    const availablePlayers = getAvailablePlayersFromTeam(team);

    return availablePlayers.length > 0;
  });
}
/* ===================================================== */
/* SORTEIA UM TIME VÁLIDO */
/* Só sorteia times que ainda tenham pelo menos */
/* 1 jogador disponível para entrar no campo */
/*
  Também evita repetir o mesmo clube em sequência,
  mesmo que seja de outra temporada.

  Quando rolar o dado novamente, a lista de jogadores
  volta para a ordenação padrão.
*/
/* ===================================================== */

function drawRandomTeam() {
  const availableTeams = getAvailableTeamsForDraft();

  if (availableTeams.length === 0) {
    alert("Não há mais jogadores disponíveis para completar o time.");
    return null;
  }

const team = pickDraftTeamByMode(availableTeams);
  if (!team) {
    alert("Não foi possível sortear um time válido.");
    return null;
  }

  rememberDraftClub(team);

  window.gameState.currentDrawnTeam = team;
  window.gameState.currentPlayerSortType = "default";

  return team;
}

/* ===================================================== */
/* RETORNA JOGADORES DISPONÍVEIS DO TIME SORTEADO */
/* Regras:
   - jogador precisa caber em alguma posição livre;
   - jogador já escolhido não pode aparecer de novo.
*/
/* ===================================================== */

function getAvailablePlayersFromTeam(team) {
  if (!team || !Array.isArray(team.players)) {
    return [];
  }

  return team.players.filter((player) => {
    const canFit = canPlayerFitAnyEmptySlot(player);
    const alreadyUsed = isPlayerAlreadyUsed(player);

    return canFit && !alreadyUsed;
  });
}
/* ===================================================== */
/* VERIFICA SE O JOGADOR PODE ENTRAR EM ALGUMA VAGA LIVRE */
/* ===================================================== */

function canPlayerFitAnyEmptySlot(player) {
  const emptySlots = getEmptyFieldSlots();

  if (!player || emptySlots.length === 0) {
    return false;
  }

  return emptySlots.some((slot) => {
    return canPlayerFitSlot(player, slot);
  });
}

function canPlayerFitSlot(player, slot) {
  if (!player || !slot) {
    return false;
  }

  const playerPositions = getPlayerPositions(player);
  const acceptedPositions = getAcceptedPositionsForSlot(slot.code);

  return playerPositions.some((position) => {
    return acceptedPositions.includes(position);
  });
}

function getAcceptedPositionsForSlot(slotCode) {
  const state = window.gameState;
  const selectedStyle = state?.selectedStyle || "Equilibrado";

  /*
    ALA é a única posição mais flexível.
    Laterais e pontas podem virar ala.
  */
  if (slotCode === "ALA") {
    if (selectedStyle === "Defensivo") {
      return ["ALA", "LD", "LE"];
    }

    if (selectedStyle === "Ofensivo") {
      return ["ALA", "PE", "PD", "LD", "LE"];
    }

    return ["ALA", "LD", "LE", "PE", "PD"];
  }

  /*
    Regra mais difícil:
    cada posição aceita praticamente só ela mesma.
  */
  const compatibility = {
    GOL: ["GOL"],

    ZAG: ["ZAG"],
    LD: ["LD"],
    LE: ["LE"],

    VOL: ["VOL"],
    MC: ["MC"],
    MEI: ["MEI"],

    ME: ["ME"],
    MD: ["MD"],

    PE: ["PE"],
    PD: ["PD"],

  CA: ["CA", "ATA"],
ATA: ["ATA", "CA"]
  };

  return compatibility[slotCode] || [slotCode];
}

/* ===================================================== */
/* PEGA SOMENTE OS SLOTS VAZIOS DO CAMPO */
/* ===================================================== */

function getEmptyFieldSlots() {
  const gameState = window.gameState;

  if (!gameState || !Array.isArray(gameState.currentLayout)) {
    return [];
  }

  return gameState.currentLayout.filter((slot) => {
    return !slot.player;
  });
}

/* ===================================================== */
/* NORMALIZA NOME DO JOGADOR */
/* Evita repetir jogador mesmo em outro ano/time */
/* ===================================================== */

function normalizePlayerName(name) {
  if (!name) return "";

  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}


/* ===================================================== */
/* VERIFICA SE O JOGADOR JÁ FOI USADO */
/* ===================================================== */

function isPlayerAlreadyUsed(player) {
  const state = window.gameState;

  if (!state || !player) return false;

  const usedPlayers = state.usedPlayers || [];
  const playerKey = normalizePlayerName(player.name);

  return usedPlayers.includes(playerKey);
}


/* ===================================================== */
/* MARCA JOGADOR COMO USADO */
/* ===================================================== */

function markPlayerAsUsed(player) {
  const state = window.gameState;

  if (!state || !player) return;

  if (!Array.isArray(state.usedPlayers)) {
    state.usedPlayers = [];
  }

  const playerKey = normalizePlayerName(player.name);

  if (!state.usedPlayers.includes(playerKey)) {
    state.usedPlayers.push(playerKey);
  }
}
/* ===================================================== */
/* EXPORTA FUNÇÕES */
/* ===================================================== */
window.drawRandomTeam = drawRandomTeam;
window.getAvailableTeamsForDraft = getAvailableTeamsForDraft;
window.getAvailablePlayersFromTeam = getAvailablePlayersFromTeam;
window.canPlayerFitAnyEmptySlot = canPlayerFitAnyEmptySlot;
window.getEmptyFieldSlots = getEmptyFieldSlots;

window.getDraftMode = getDraftMode;
window.isEliteDraftMode = isEliteDraftMode;
window.getTeamDraftCategory = getTeamDraftCategory;
window.isTeamAllowedInDraftMode = isTeamAllowedInDraftMode;
window.getTeamsDatabaseForDraftMode = getTeamsDatabaseForDraftMode;

window.normalizePlayerName = normalizePlayerName;
window.isPlayerAlreadyUsed = isPlayerAlreadyUsed;
window.markPlayerAsUsed = markPlayerAsUsed;
window.canPlayerFitSlot = canPlayerFitSlot;
window.getAcceptedPositionsForSlot = getAcceptedPositionsForSlot;
window.getDraftTeamOverallValue = getDraftTeamOverallValue;
window.isHistoricEliteForDraft = isHistoricEliteForDraft;
window.isHistoricStrongForDraft = isHistoricStrongForDraft;
window.isEliteUnderdogForDraft = isEliteUnderdogForDraft;
window.getDraftDrawModeProfile = getDraftDrawModeProfile;
window.pickDraftTeamByMode = pickDraftTeamByMode;
window.getDraftClubCooldown = getDraftClubCooldown;
window.getRecentDraftClubs = getRecentDraftClubs;
window.getTeamClubKey = getTeamClubKey;
window.rememberDraftClub = rememberDraftClub;