/* ===================================================== */
/* CAMPAIGNENGINE.JS - MOTOR DA CAMPANHA */
/* ===================================================== */

/*
  Este arquivo controla a criação da campanha:
  - cria o time DRAFT a partir dos jogadores escolhidos;
  - seleciona adversários da database;
  - monta os 8 jogos da fase de liga;
  - controla modo NORMAL/RÁPIDO;
  - prepara funções de acréscimos e cronômetro.
*/



/* ===================================================== */
/* CONFIGURAÇÕES DA FASE DE LIGA */
/* ===================================================== */

const LEAGUE_MATCHES_TOTAL = 8;

const CAMPAIGN_SPEEDS = {
  normal: {
    label: "NORMAL",
    duration: 15000 // 15 segundos
  },

  fast: {
    label: "RÁPIDO",
    duration: 7000 // 9 segundos
  }
};
/* ===================================================== */
/* FUNÇÕES AUXILIARES */
/* ===================================================== */

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffleArray(array) {
  const copy = [...array];

  for (let i = copy.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));

    const temp = copy[i];
    copy[i] = copy[randomIndex];
    copy[randomIndex] = temp;
  }

  return copy;
}

function normalizeText(text) {
  if (!text) return "";

  return text
    .toString()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

function calculateAverage(players) {
  if (!Array.isArray(players) || players.length === 0) {
    return 0;
  }

  const total = players.reduce((sum, player) => {
    return sum + (player.rating || 0);
  }, 0);

  return Math.round(total / players.length);
}

/* ===================================================== */
/* IDENTIFICA A CATEGORIA DO TIME */
/* ===================================================== */

function getTeamCategory(team) {
const category = normalizeText(team?.categoryType || team?.type || "");
  if (
    category.includes("runner") ||
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

/* ===================================================== */
/* PEGA A DATABASE DA CAMPANHA */
/* ===================================================== */

function getCampaignDatabase() {
  const database = window.teamsDatabase || [];

  return database.filter((team) => {
    return team && team.id && team.club && team.season;
  });
}
/* ===================================================== */
/* MODO DA CAMPANHA - NORMAL / ELITE */
/*
  Define qual regra de seleção de adversários será usada.

  Normal:
  - mantém a distribuição atual.

  Elite:
  - 4 campeões;
  - 3 vices;
  - 1 histórico elite;
  - sem repetir clube nos 8 jogos do DRAFT.
*/
/* ===================================================== */

function getCampaignDraftMode() {
  return window.gameState?.selectedDraftMode === "elite"
    ? "elite"
    : "normal";
}

function isEliteCampaignMode() {
  return getCampaignDraftMode() === "elite";
}

const ELITE_HISTORIC_MAIN_OVERALL = 86;
const ELITE_HISTORIC_FALLBACK_OVERALL = 85;

function getTeamTier(team) {
  return normalizeText(team?.tier || "");
}

function getTeamOverallValue(team) {
  const overall = Number(team?.teamOverall || team?.finalPower || 0);

  if (!Number.isFinite(overall)) {
    return 0;
  }

  return overall;
}

function isHistoricTeam(team) {
  return getTeamCategory(team) === "historic";
}

function isHistoricEliteTeam(team) {
  return isHistoricTeam(team) && getTeamOverallValue(team) >= ELITE_HISTORIC_MAIN_OVERALL;
}

function isHistoricStrongTeam(team) {
  return isHistoricTeam(team) && getTeamOverallValue(team) >= ELITE_HISTORIC_FALLBACK_OVERALL;
}
/* ===================================================== */
/* TIMES PERMITIDOS NA LIGA GERAL DO MODO ELITE */
/*
  No Modo Elite, a classificação geral deve usar apenas:
  - campeões;
  - vices;
  - históricos elite.

  Não entram:
  - azarões;
  - históricos comuns.
*/
/* ===================================================== */
function isEliteLeagueTeam(team) {
  const category = getTeamCategory(team);

  return (
    category === "champion" ||
    category === "runnerUp" ||
    isHistoricStrongTeam(team)
  );
}

function isElitePrimaryTeam(team) {
  const category = getTeamCategory(team);

  return category === "champion" || category === "runnerUp";
}
/* ===================================================== */
/* PEGA OS JOGADORES ESCALADOS NO CAMPO */
/* ===================================================== */

function getDraftPlayersFromLayout() {
  const state = window.gameState;

  if (!state || !Array.isArray(state.currentLayout)) {
    return [];
  }

  return state.currentLayout
    .filter((slot) => {
      return slot.player;
    })
    .map((slot) => {
      return {
        ...slot.player,
        fieldPosition: slot.code
      };
    });
}

/* ===================================================== */
/* SEPARA JOGADORES POR SETOR */
/* ===================================================== */

function getPlayersByFieldGroup(players, group) {
  const groups = {
    attack: ["PE", "PD", "CA", "ATA"],
    midfield: ["MEI", "MC", "VOL", "ME", "MD"],
    defense: ["GOL", "ZAG", "LD", "LE", "ALA"]
  };

  const allowedPositions = groups[group] || [];

  return players.filter((player) => {
    return allowedPositions.includes(player.fieldPosition);
  });
}

/* ===================================================== */
/* CRIA O TIME DRAFT */
/* ===================================================== */

function createDraftTeamFromCurrentDraft() {
  const state = window.gameState;

  if (!state) {
    return null;
  }

  const players = getDraftPlayersFromLayout();

  if (players.length < 11) {
    alert("Complete os 11 jogadores antes de iniciar a campanha.");
    return null;
  }

  const attackPlayers = getPlayersByFieldGroup(players, "attack");
  const midfieldPlayers = getPlayersByFieldGroup(players, "midfield");
  const defensePlayers = getPlayersByFieldGroup(players, "defense");

  const overall = calculateAverage(players);

  const draftTeam = {
    id: "draft_user_team",
    club: "DRAFT",
    season: "Seu elenco",
    type: "Time montado no draft",
    categoryType: "draft",
    tier: "user",

    teamOverall: overall,
    finalPower: overall,

    attack: calculateAverage(attackPlayers) || overall,
    midfield: calculateAverage(midfieldPlayers) || overall,
    defense: calculateAverage(defensePlayers) || overall,

    mentality: overall,
    chemistry: overall,
    championsExperience: overall,
    historicalWeight: overall,
    clutch: overall,
    consistency: overall,

   style: state.selectedStyle || "Equilibrado",
formation: state.selectedFormation || "4-3-3",

    players: players
  };

  state.userTeam = draftTeam;

  return draftTeam;
}

/* ===================================================== */
/* SELECIONA TIMES SEM REPETIR ID */
/* Tenta evitar repetir o mesmo clube também */
/* ===================================================== */

function pickTeamsFromPool(pool, amount, usedIds, usedClubs) {
  const selected = [];
  const shuffledPool = shuffleArray(pool);

  /* Primeiro tenta sem repetir clube */
  shuffledPool.forEach((team) => {
    if (selected.length >= amount) return;

    const clubKey = normalizeText(team.club);

    if (usedIds.has(team.id)) return;
    if (usedClubs.has(clubKey)) return;

    selected.push(team);
    usedIds.add(team.id);
    usedClubs.add(clubKey);
  });

  /* Se faltar time, permite repetir clube, mas nunca repetir ID */
  shuffledPool.forEach((team) => {
    if (selected.length >= amount) return;

    if (usedIds.has(team.id)) return;

    const clubKey = normalizeText(team.club);

    selected.push(team);
    usedIds.add(team.id);
    usedClubs.add(clubKey);
  });

  return selected;
}

/* ===================================================== */
/* SELECIONA TIMES SEM REPETIR CLUBE */
/*
  Usado no Modo Elite para os 8 jogos do DRAFT.

  Diferença para pickTeamsFromPool:
  - aqui NÃO existe segunda tentativa repetindo clube;
  - se faltar time, retorna menos times;
  - isso evita repetir Real Madrid, Milan, Liverpool etc.
*/
/* ===================================================== */

function pickTeamsWithoutClubRepeat(pool, amount, usedIds, usedClubs) {
  const selected = [];
  const shuffledPool = shuffleArray(pool);

  shuffledPool.forEach((team) => {
    if (selected.length >= amount) return;

    const clubKey = normalizeText(team.club);

    if (usedIds.has(team.id)) return;
    if (usedClubs.has(clubKey)) return;

    selected.push(team);
    usedIds.add(team.id);
    usedClubs.add(clubKey);
  });

  return selected;
}
/* ===================================================== */
/* SELECIONA OS 8 ADVERSÁRIOS DA FASE DE LIGA */
/* Modelo inicial:
   - 2 campeões
   - 2 vices
   - 2 históricos
   - 2 azarões
*/
/* ===================================================== */
/* ===================================================== */
/* EMBARALHA LISTA DE TIMES */
/*
  Usado para deixar a ordem dos adversários da campanha variada.
  Não altera a quantidade de cada categoria.
  Apenas muda a ordem final dos jogos.
*/
/* ===================================================== */

function shuffleCampaignTeams(teams) {
  const shuffledTeams = [...teams];

  for (let i = shuffledTeams.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));

    const temporaryTeam = shuffledTeams[i];
    shuffledTeams[i] = shuffledTeams[randomIndex];
    shuffledTeams[randomIndex] = temporaryTeam;
  }

  return shuffledTeams;
} 
/* ===================================================== */
/* SELECIONA ADVERSÁRIOS NORMAIS DA FASE DE LIGA */
/*
  Modo Normal:
  - 2 campeões;
  - 2 vices;
  - 2 históricos;
  - 2 azarões.

  Mantém a regra atual do jogo.
*/
/* ===================================================== */

function selectNormalLeagueOpponents() {
  const database = getCampaignDatabase();

  if (database.length < LEAGUE_MATCHES_TOTAL) {
    alert("Database não tem times suficientes para montar a fase de liga.");
    return [];
  }

  const usedIds = new Set();
  const usedClubs = new Set();

  const opponents = [];

const selectionRules = [
  { category: "champion", amount: 2 },
  { category: "runnerUp", amount: 1 },
  { category: "historic", amount: 3 },
  { category: "underdog", amount: 2 }
];
  selectionRules.forEach((rule) => {
    const categoryPool = database.filter((team) => {
      return getTeamCategory(team) === rule.category;
    });

    const selected = pickTeamsFromPool(
      categoryPool,
      rule.amount,
      usedIds,
      usedClubs
    );

    opponents.push(...selected);
  });

  if (opponents.length < LEAGUE_MATCHES_TOTAL) {
    const remainingAmount = LEAGUE_MATCHES_TOTAL - opponents.length;

    const fallbackPool = database.filter((team) => {
      return !usedIds.has(team.id);
    });

    const fallbackTeams = pickTeamsFromPool(
      fallbackPool,
      remainingAmount,
      usedIds,
      usedClubs
    );

    opponents.push(...fallbackTeams);
  }

  return shuffleCampaignTeams(opponents).slice(0, LEAGUE_MATCHES_TOTAL);
}

/* ===================================================== */
/* MONTA OS 36 TIMES - MODO ELITE */
/*
  Regras:
  - DRAFT entra sempre;
  - os 8 adversários diretos entram sempre;
  - completa com campeões, vices e históricos fortes;
  - históricos principais: teamOverall >= 86;
  - fallback histórico: teamOverall >= 85;
  - não entra azarão;
  - não repete clube.

  Meta aproximada:
  - 10 campeões;
  - 8 vices;
  - 17 históricos;
  - 1 DRAFT.
*/
/* ===================================================== */
function selectEliteLeagueOpponents() {
  const database = getCampaignDatabase();

  const usedIds = new Set();
  const usedClubs = new Set();

  const opponents = [];

  const selectionRules = [
    { category: "champion", amount: 3 },
    { category: "runnerUp", amount: 2 },
    { category: "historicElite", amount: 3 }
  ];

  selectionRules.forEach((rule) => {
    let categoryPool = [];

    if (rule.category === "historicElite") {
      categoryPool = database.filter((team) => {
        return isHistoricEliteTeam(team);
      });
    } else {
      categoryPool = database.filter((team) => {
        return getTeamCategory(team) === rule.category;
      });
    }

    const selected = pickTeamsWithoutClubRepeat(
      categoryPool,
      rule.amount,
      usedIds,
      usedClubs
    );

    opponents.push(...selected);
  });

  /*
    Fallback do Elite:
    se faltar histórico over 86, completa com histórico over 85.
    Continua sem azarão e sem repetir clube.
  */
  if (opponents.length < LEAGUE_MATCHES_TOTAL) {
    const remainingAmount = LEAGUE_MATCHES_TOTAL - opponents.length;

    const historicStrongPool = database.filter((team) => {
      return isHistoricStrongTeam(team);
    });

    const fallbackHistoricTeams = pickTeamsWithoutClubRepeat(
      historicStrongPool,
      remainingAmount,
      usedIds,
      usedClubs
    );

    opponents.push(...fallbackHistoricTeams);
  }

  /*
    Fallback final:
    se ainda faltar, completa com qualquer time permitido no Elite:
    campeão, vice ou histórico over 85.
  */
  if (opponents.length < LEAGUE_MATCHES_TOTAL) {
    const remainingAmount = LEAGUE_MATCHES_TOTAL - opponents.length;

    const eliteFallbackPool = database.filter((team) => {
      return isEliteLeagueTeam(team);
    });

    const fallbackTeams = pickTeamsWithoutClubRepeat(
      eliteFallbackPool,
      remainingAmount,
      usedIds,
      usedClubs
    );

    opponents.push(...fallbackTeams);
  }

  if (opponents.length < LEAGUE_MATCHES_TOTAL) {
    alert(
      "Não foi possível montar a fase de liga Elite sem repetir clubes. Verifique se há campeões, vices e históricos com over 85+ suficientes."
    );

    return [];
  }

  return shuffleCampaignTeams(opponents).slice(0, LEAGUE_MATCHES_TOTAL);
}

/* ===================================================== */
/* SELECIONA OS 8 ADVERSÁRIOS DA FASE DE LIGA */
/*
  Decide automaticamente entre:
  - Modo Normal;
  - Modo Elite.
*/
/* ===================================================== */

function selectLeagueOpponents() {
  if (isEliteCampaignMode()) {
    return selectEliteLeagueOpponents();
  }

  return selectNormalLeagueOpponents();
}

/* ===================================================== */
/* CRIA OS 8 JOGOS DA FASE DE LIGA */
/* 4 jogos em casa e 4 fora */
/* ===================================================== */

function createLeagueMatches(draftTeam, opponents) {
  return opponents.map((opponent, index) => {
    const matchNumber = index + 1;

    /*
      Alterna casa/fora:
      Jogo 1 casa
      Jogo 2 fora
      Jogo 3 casa
      Jogo 4 fora...
    */
    const draftIsHome = index % 2 === 0;

    const homeTeam = draftIsHome ? draftTeam : opponent;
    const awayTeam = draftIsHome ? opponent : draftTeam;

    return {
      id: `league_match_${matchNumber}`,
      matchNumber: matchNumber,

      homeTeam: homeTeam,
      awayTeam: awayTeam,
      opponentTeam: opponent,

      draftIsHome: draftIsHome,

      status: "waiting", // waiting, live, finished
      unlocked: index === 0,
      expanded: false,

      currentMinute: 0,

      addedTime: null,

      homeScore: 0,
      awayScore: 0,

      events: [],
      shownEvents: []
    };
  });
}

/* ===================================================== */
/* CRIA CLASSIFICAÇÃO INICIAL */
/* Agora simples, depois vamos evoluir para 36 times */
/* ===================================================== */

function createInitialStandings(teams) {
  return teams.map((team) => {
    return {
      teamId: team.id,
      club: team.club,
      season: team.season,

      played: 0,
      wins: 0,
      draws: 0,
      losses: 0,

      goalsFor: 0,
      goalsAgainst: 0,
      goalDifference: 0,

      points: 0
    };
  });
}
/* ===================================================== */
/* MONTA OS 36 TIMES DA FASE DE LIGA */
/*
  Modo Normal:
  - mantém a distribuição atual.

  Modo Elite:
  - DRAFT;
  - 8 adversários diretos já selecionados;
  - completa com campeões e vices primeiro;
  - usa históricos elite apenas se precisar;
  - não usa azarões;
  - não usa históricos comuns;
  - não repete clube.
*/
/* ===================================================== */

function buildLeagueTeamsForCampaign(draftTeam, opponents) {
  if (isEliteCampaignMode()) {
    return buildEliteLeagueTeamsForCampaign(draftTeam, opponents);
  }

  return buildNormalLeagueTeamsForCampaign(draftTeam, opponents);
}

/* ===================================================== */
/* MONTA OS 36 TIMES - MODO NORMAL */
/*
  Mantém a regra original:
  - DRAFT;
  - 8 adversários;
  - extras por categoria.
*/
/* ===================================================== */

function buildNormalLeagueTeamsForCampaign(draftTeam, opponents) {
  const database = getCampaignDatabase();

  const usedIds = new Set();
  const usedClubs = new Set();

  const leagueTeams = [];

  /* Adiciona o DRAFT */
  leagueTeams.push(draftTeam);
  usedIds.add(draftTeam.id);
  usedClubs.add(normalizeText(draftTeam.club));

  /* Adiciona os 8 adversários do DRAFT */
  opponents.forEach((team) => {
    if (!team || usedIds.has(team.id)) return;

    leagueTeams.push(team);
    usedIds.add(team.id);
    usedClubs.add(normalizeText(team.club));
  });

  /*
    Completa os 27 times extras da classificação
    dividindo entre as categorias do modo normal.
  */
const extraSelectionRules = [
  { category: "champion", amount: 5 },
  { category: "runnerUp", amount: 5 },
  { category: "historic", amount: 11 },
  { category: "underdog", amount: 6 }
];

  extraSelectionRules.forEach((rule) => {
    if (leagueTeams.length >= 36) return;

    const remainingSlots = 36 - leagueTeams.length;
    const amountToPick = Math.min(rule.amount, remainingSlots);

    const categoryPool = database.filter((team) => {
      return getTeamCategory(team) === rule.category;
    });

    const selected = pickTeamsFromPool(
      categoryPool,
      amountToPick,
      usedIds,
      usedClubs
    );

    leagueTeams.push(...selected);
  });

  /*
    Fallback normal:
    se alguma categoria não tiver times suficientes,
    completa com qualquer time disponível da database.
  */
  if (leagueTeams.length < 36) {
    const remainingAmount = 36 - leagueTeams.length;

    const fallbackPool = database.filter((team) => {
      return !usedIds.has(team.id);
    });

    const fallbackTeams = pickTeamsFromPool(
      fallbackPool,
      remainingAmount,
      usedIds,
      usedClubs
    );

    leagueTeams.push(...fallbackTeams);
  }

  return leagueTeams.slice(0, 36);
}

/* ===================================================== */
/* MONTA OS 36 TIMES - MODO ELITE */
/*
  Regras:
  - DRAFT entra sempre;
  - os 8 adversários diretos entram sempre;
  - completa primeiro com campeões e vices;
  - usa históricos elite apenas para completar;
  - não entra azarão;
  - não entra histórico comum;
  - não repete clube.

  Se não houver 36 clubes únicos válidos, retorna [].
*/
/* ===================================================== */
function buildEliteLeagueTeamsForCampaign(draftTeam, opponents) {
  const database = getCampaignDatabase();

  const usedIds = new Set();
  const usedClubs = new Set();

  const leagueTeams = [];

  function addUniqueTeam(team) {
    if (!team) return false;

    const clubKey = normalizeText(team.club);

    if (!clubKey) return false;
    if (usedIds.has(team.id)) return false;
    if (usedClubs.has(clubKey)) return false;

    leagueTeams.push(team);
    usedIds.add(team.id);
    usedClubs.add(clubKey);

    return true;
  }

  function addTeamsFromPool(pool, amount) {
    const shuffledPool = shuffleArray(pool);
    let added = 0;

    shuffledPool.forEach((team) => {
      if (leagueTeams.length >= 36) return;
      if (added >= amount) return;

      const wasAdded = addUniqueTeam(team);

      if (wasAdded) {
        added++;
      }
    });

    return added;
  }

  /* Adiciona o DRAFT */
  leagueTeams.push(draftTeam);
  usedIds.add(draftTeam.id);
  usedClubs.add(normalizeText(draftTeam.club));

  /* Adiciona os 8 adversários diretos do DRAFT */
  opponents.forEach((team) => {
    addUniqueTeam(team);
  });

  /*
    Completa a Classificação Geral Elite.
    Meta aproximada dos 35 adversários:
    - 10 campeões;
    - 8 vices;
    - 17 históricos fortes;
    - 0 azarões.
    
    Como os 8 adversários diretos já entram antes,
    aqui completamos os extras.
  */
  const extraSelectionRules = [
    {
      amount: 7,
      pool: database.filter((team) => {
        return getTeamCategory(team) === "champion";
      })
    },
    {
      amount: 6,
      pool: database.filter((team) => {
        return getTeamCategory(team) === "runnerUp";
      })
    },
    {
      amount: 14,
      pool: database.filter((team) => {
        return isHistoricEliteTeam(team);
      })
    }
  ];

  extraSelectionRules.forEach((rule) => {
    if (leagueTeams.length >= 36) return;

    const remainingSlots = 36 - leagueTeams.length;
    const amountToPick = Math.min(rule.amount, remainingSlots);

    addTeamsFromPool(rule.pool, amountToPick);
  });

  /*
    Fallback 1:
    se faltarem históricos over 86, completa com históricos over 85.
  */
  if (leagueTeams.length < 36) {
    const remainingAmount = 36 - leagueTeams.length;

    const historicStrongPool = database.filter((team) => {
      return isHistoricStrongTeam(team);
    });

    addTeamsFromPool(historicStrongPool, remainingAmount);
  }

  /*
    Fallback 2:
    se ainda faltar, completa com qualquer time permitido no Elite.
    Ainda não entra azarão.
  */
  if (leagueTeams.length < 36) {
    const remainingAmount = 36 - leagueTeams.length;

    const eliteFallbackPool = database.filter((team) => {
      return isEliteLeagueTeam(team);
    });

    addTeamsFromPool(eliteFallbackPool, remainingAmount);
  }

  if (leagueTeams.length < 36) {
    alert(
      "Não foi possível montar a Classificação Geral Elite com 36 clubes únicos. Adicione mais campeões, vices ou históricos com over 85+."
    );

    return [];
  }

  return leagueTeams.slice(0, 36);
}
/* ===================================================== */
/* CRIA UMA LINHA ZERADA DA CLASSIFICAÇÃO */
/* ===================================================== */

function createStandingRow(team) {
  return {
    teamId: team.id,
    club: team.club,
    season: team.season,
    teamOverall: team.teamOverall || 80,

    played: 0,
    wins: 0,
    draws: 0,
    losses: 0,

    goalsFor: 0,
    goalsAgainst: 0,
    goalDifference: 0,

    points: 0,

    position: null,
    situation: null
  };
}

/* ===================================================== */
/* FORÇA DO TIME PARA SIMULAÇÃO INVISÍVEL */
/* Usada apenas nos jogos simulados dos outros clubes */
/* ===================================================== */

function calculateStandingTeamPower(team) {
  if (!team) return 80;

  const overall = team.teamOverall || 80;
  const attack = team.attack || overall;
  const midfield = team.midfield || overall;
  const defense = team.defense || overall;
  const mentality = team.mentality || overall;
  const chemistry = team.chemistry || overall;
  const clutch = team.clutch || overall;
  const consistency = team.consistency || overall;

  let tierBonus = 0;

  if (team.tier === "elite") tierBonus = 2;
  if (team.tier === "strong") tierBonus = 1;
  if (team.tier === "underdog") tierBonus = -2;

  return (
    overall * 0.32 +
    attack * 0.16 +
    midfield * 0.14 +
    defense * 0.14 +
    mentality * 0.08 +
    chemistry * 0.06 +
    clutch * 0.05 +
    consistency * 0.05 +
    tierBonus
  );
}

/* ===================================================== */
/* SORTEIO POISSON SIMPLES */
/* Transforma gols esperados em gols reais */
/* ===================================================== */

function campaignPoissonRandom(lambda) {
  const limit = Math.exp(-lambda);

  let probability = 1;
  let goals = 0;

  do {
    goals++;
    probability *= Math.random();
  } while (probability > limit);

  return goals - 1;
}

/* ===================================================== */
/* LIMITA VALOR ENTRE MÍNIMO E MÁXIMO */
/* ===================================================== */

function clampCampaignNumber(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

/* ===================================================== */
/* SIMULA UM JOGO INVISÍVEL ENTRE DOIS TIMES */
/* Não aparece na tela, só alimenta a classificação */
/* ===================================================== */

function simulateHiddenLeagueMatch(homeTeam, awayTeam) {
  const homeAttack = homeTeam.attack || homeTeam.teamOverall || 80;
  const homeDefense = homeTeam.defense || homeTeam.teamOverall || 80;

  const awayAttack = awayTeam.attack || awayTeam.teamOverall || 80;
  const awayDefense = awayTeam.defense || awayTeam.teamOverall || 80;

  const homePower = calculateStandingTeamPower(homeTeam);
  const awayPower = calculateStandingTeamPower(awayTeam);

  let homeExpectedGoals = 1.20;
  let awayExpectedGoals = 1.05;

  homeExpectedGoals += (homeAttack - awayDefense) / 22;
  awayExpectedGoals += (awayAttack - homeDefense) / 22;

  /* Diferença geral de força */
  homeExpectedGoals += (homePower - awayPower) / 45;
  awayExpectedGoals += (awayPower - homePower) / 45;

  /* Mandante tem pequena vantagem */
  homeExpectedGoals += 0.15;
  awayExpectedGoals -= 0.05;

  homeExpectedGoals = clampCampaignNumber(homeExpectedGoals, 0.20, 3.60);
  awayExpectedGoals = clampCampaignNumber(awayExpectedGoals, 0.20, 3.60);

  return {
    homeTeam,
    awayTeam,
    homeScore: clampCampaignNumber(campaignPoissonRandom(homeExpectedGoals), 0, 6),
    awayScore: clampCampaignNumber(campaignPoissonRandom(awayExpectedGoals), 0, 6)
  };
}

/* ===================================================== */
/* CHAVE ÚNICA PARA EVITAR REPETIR CONFRONTO */
/* ===================================================== */

function createPairKey(teamA, teamB) {
  return [teamA.id, teamB.id].sort().join("__");
}

/* ===================================================== */
/* APLICA RESULTADO NA CLASSIFICAÇÃO */
/* ===================================================== */

function applyResultToStandings(standingsMap, homeTeam, awayTeam, homeScore, awayScore) {
  const homeRow = standingsMap.get(homeTeam.id);
  const awayRow = standingsMap.get(awayTeam.id);

  if (!homeRow || !awayRow) return;

  homeRow.played += 1;
  awayRow.played += 1;

  homeRow.goalsFor += homeScore;
  homeRow.goalsAgainst += awayScore;

  awayRow.goalsFor += awayScore;
  awayRow.goalsAgainst += homeScore;

  if (homeScore > awayScore) {
    homeRow.wins += 1;
    awayRow.losses += 1;

    homeRow.points += 3;
  } else if (homeScore < awayScore) {
    awayRow.wins += 1;
    homeRow.losses += 1;

    awayRow.points += 3;
  } else {
    homeRow.draws += 1;
    awayRow.draws += 1;

    homeRow.points += 1;
    awayRow.points += 1;
  }

  homeRow.goalDifference = homeRow.goalsFor - homeRow.goalsAgainst;
  awayRow.goalDifference = awayRow.goalsFor - awayRow.goalsAgainst;
}

/* ===================================================== */
/* APLICA OS 8 JOGOS REAIS DO DRAFT NA CLASSIFICAÇÃO */
/* ===================================================== */

function applyDraftMatchesToStandings(standingsMap, matches, usedPairs) {
  matches.forEach((match) => {
    if (!match || match.status !== "finished") return;

    applyResultToStandings(
      standingsMap,
      match.homeTeam,
      match.awayTeam,
      match.homeScore,
      match.awayScore
    );

    usedPairs.add(createPairKey(match.homeTeam, match.awayTeam));
  });
}

/* ===================================================== */
/* SIMULA OS JOGOS INVISÍVEIS */
/* Todos os times precisam terminar com 8 jogos */
/* O DRAFT não joga invisível, pois seus 8 jogos são reais */
/* ===================================================== */

function simulateHiddenLeagueMatches(teams, standingsMap, usedPairs) {
  const hiddenMatches = [];

  let attempts = 0;
  const maxAttempts = 20000;

  while (attempts < maxAttempts) {
    attempts++;

    const teamsNeedingGames = teams.filter((team) => {
      const row = standingsMap.get(team.id);

      if (!row) return false;
      if (team.id === "draft_user_team") return false;

      return row.played < 8;
    });

    if (teamsNeedingGames.length < 2) {
      break;
    }

    /*
      Pega primeiro quem tem menos jogos,
      para equilibrar a tabela.
    */
    const shuffled = shuffleArray(teamsNeedingGames);

    shuffled.sort((a, b) => {
      const rowA = standingsMap.get(a.id);
      const rowB = standingsMap.get(b.id);

      return rowA.played - rowB.played;
    });

    const homeTeam = shuffled[0];

    let possibleOpponents = shuffled.filter((team) => {
      if (team.id === homeTeam.id) return false;

      const pairKey = createPairKey(homeTeam, team);

      return !usedPairs.has(pairKey);
    });

    /*
      Se travar por repetição de confronto,
      libera repetir confronto para fechar 8 jogos.
      Isso evita loop infinito.
    */
    if (possibleOpponents.length === 0) {
      possibleOpponents = shuffled.filter((team) => {
        return team.id !== homeTeam.id;
      });
    }

    if (possibleOpponents.length === 0) {
      break;
    }

    possibleOpponents.sort((a, b) => {
      const rowA = standingsMap.get(a.id);
      const rowB = standingsMap.get(b.id);

      return rowA.played - rowB.played;
    });

    const awayTeam = possibleOpponents[0];

    const hiddenMatch = simulateHiddenLeagueMatch(homeTeam, awayTeam);

    applyResultToStandings(
      standingsMap,
      hiddenMatch.homeTeam,
      hiddenMatch.awayTeam,
      hiddenMatch.homeScore,
      hiddenMatch.awayScore
    );

    usedPairs.add(createPairKey(homeTeam, awayTeam));
    hiddenMatches.push(hiddenMatch);
  }

  return hiddenMatches;
}

/* ===================================================== */
/* DEFINE SITUAÇÃO NA CHAMPIONS */
/* ===================================================== */

function getQualificationSituation(position) {
  if (position <= 8) {
    return "round16";
  }

  if (position <= 24) {
    return "playoffs";
  }

  return "eliminated";
}

function getQualificationLabel(situation) {
  if (situation === "round16") {
    return "OITAVAS";
  }

  if (situation === "playoffs") {
    return "PLAYOFFS";
  }

  return "ELIMINADO";
}

/* ===================================================== */
/* ORDENA A CLASSIFICAÇÃO */
/* Critérios:
   1. pontos
   2. saldo de gols
   3. gols pró
   4. overall do time
*/
/* ===================================================== */

function sortLeagueStandings(standings) {
  return standings.sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    if (b.goalDifference !== a.goalDifference) return b.goalDifference - a.goalDifference;
    if (b.goalsFor !== a.goalsFor) return b.goalsFor - a.goalsFor;

    return (b.teamOverall || 0) - (a.teamOverall || 0);
  });
}

/* ===================================================== */
/* GERA A CLASSIFICAÇÃO GERAL COM 36 TIMES */
/* Deve ser chamada depois que os 8 jogos terminarem */
/* ===================================================== */

function generateLeagueStandings() {
  const state = window.gameState;

  if (!state || !state.campaign) {
    return [];
  }

  const campaign = state.campaign;
  const teams = campaign.teams || [];

  if (teams.length < 36) {
    alert("A campanha não possui 36 times para gerar a classificação.");
    return [];
  }

  const standingsMap = new Map();

  teams.forEach((team) => {
    standingsMap.set(team.id, createStandingRow(team));
  });

  const usedPairs = new Set();

  /* Primeiro aplica os jogos reais do DRAFT */
  applyDraftMatchesToStandings(
    standingsMap,
    campaign.matches,
    usedPairs
  );

  /* Depois simula os jogos invisíveis dos outros times */
  const hiddenMatches = simulateHiddenLeagueMatches(
    teams,
    standingsMap,
    usedPairs
  );

  let standings = Array.from(standingsMap.values());

  standings = sortLeagueStandings(standings);

  standings.forEach((row, index) => {
    const position = index + 1;
    const situation = getQualificationSituation(position);

    row.position = position;
    row.situation = situation;
    row.situationLabel = getQualificationLabel(situation);
  });

  const draftRow = standings.find((row) => {
    return row.teamId === "draft_user_team";
  });

  campaign.hiddenMatches = hiddenMatches;
  campaign.standings = standings;

  if (draftRow) {
    campaign.userStandingPosition = draftRow.position;
    campaign.userQualificationStatus = draftRow.situation;
  }

  console.log("CLASSIFICAÇÃO GERADA:", standings);
  console.log("POSIÇÃO DO DRAFT:", campaign.userStandingPosition);
  console.log("SITUAÇÃO DO DRAFT:", campaign.userQualificationStatus);

  return standings;
}
/* ===================================================== */
/* INICIA A CAMPANHA */
/* Chamada depois do botão SIMULAR A UCL */
/* ===================================================== */

function startLeagueCampaign() {
  const state = window.gameState;

  if (!state) {
    return null;
  }

  if (!state.draftFinished) {
    alert("Finalize o draft antes de iniciar a campanha.");
    return null;
  }

  const draftTeam = createDraftTeamFromCurrentDraft();

  if (!draftTeam) {
    return null;
  }

  const opponents = selectLeagueOpponents();

  if (opponents.length < LEAGUE_MATCHES_TOTAL) {
    alert("Não foi possível montar os 8 jogos da fase de liga.");
    return null;
  }

  const previousSpeedMode = state.campaign?.speedMode || "normal";
  const matchDuration = CAMPAIGN_SPEEDS[previousSpeedMode].duration;
const campaignTeams = buildLeagueTeamsForCampaign(draftTeam, opponents);

if (campaignTeams.length < 36) {
  alert("Não foi possível montar a Classificação Geral da campanha.");
  return null;
}

const matches = createLeagueMatches(draftTeam, opponents);
state.campaign = {
  phase: "league",

  speedMode: previousSpeedMode,
  matchDuration: matchDuration,

  currentMatchIndex: 0,
  isMatchRunning: false,
  leagueFinished: false,

  teams: campaignTeams,
  opponents: opponents,
  matches: matches,
  hiddenMatches: [],
  standings: createInitialStandings(campaignTeams),

  userStandingPosition: null,
  userQualificationStatus: null
};
  console.log("CAMPANHA CRIADA:", state.campaign);

  return state.campaign;
}

/* ===================================================== */
/* CONTROLE DO MODO NORMAL / RÁPIDO */
/* ===================================================== */

function setCampaignSpeedMode(mode) {
  const state = window.gameState;

  if (!state || !state.campaign) {
    return false;
  }

  if (state.campaign.isMatchRunning) {
    alert("Não é possível mudar o modo enquanto a partida está em andamento.");
    return false;
  }

  if (!CAMPAIGN_SPEEDS[mode]) {
    return false;
  }

  state.campaign.speedMode = mode;
  state.campaign.matchDuration = CAMPAIGN_SPEEDS[mode].duration;

  return true;
}

function getCampaignMatchDuration() {
  const state = window.gameState;

  if (!state || !state.campaign) {
    return CAMPAIGN_SPEEDS.normal.duration;
  }

  return state.campaign.matchDuration || CAMPAIGN_SPEEDS.normal.duration;
}

/* ===================================================== */
/* ACRÉSCIMOS */
/* 1º tempo: 0 até 5 */
/* 2º tempo: 0 até 8 */
/* ===================================================== */

function generateAddedTime() {
  return {
    firstHalf: getRandomInt(0, 5),
    secondHalf: getRandomInt(0, 8)
  };
}

/* ===================================================== */
/* TOTAL DE TICKS DA PARTIDA */
/*
  Exemplo:
  1º tempo +2
  2º tempo +5

  Total:
  90 + 2 + 5 = 97 ticks

  Isso permite mostrar:
  45+1'
  45+2'
  depois voltar para 46'
*/
/* ===================================================== */

function getMatchTotalTicks(addedTime) {
  if (!addedTime) {
    return 90;
  }

  return 90 + addedTime.firstHalf + addedTime.secondHalf;
}

/* ===================================================== */
/* FORMATA O MINUTO DO CRONÔMETRO */
/*
  Exemplo com 1º tempo +2:

  tick 44 -> 44'
  tick 45 -> 45'
  tick 46 -> 45+1'
  tick 47 -> 45+2'
  tick 48 -> 46'

  Exemplo com 2º tempo +4:

  tick 92 -> 90'
  tick 93 -> 90+1'
  tick 94 -> 90+2'
*/
/* ===================================================== */

function formatMatchMinute(tick, addedTime) {
  if (!addedTime) {
    return `${tick}'`;
  }

  const firstHalfAdded = addedTime.firstHalf;

  if (tick <= 45) {
    return `${tick}'`;
  }

  if (tick <= 45 + firstHalfAdded) {
    return `45+${tick - 45}'`;
  }

  const secondHalfMinute = tick - firstHalfAdded;

  if (secondHalfMinute <= 90) {
    return `${secondHalfMinute}'`;
  }

  return `90+${secondHalfMinute - 90}'`;
}

/* ===================================================== */
/* CALCULA INTERVALO DO CRONÔMETRO */
/* NORMAL: 50 segundos */
/* RÁPIDO: 25 segundos */
/* ===================================================== */

function getMatchTickInterval(addedTime) {
  const matchDuration = getCampaignMatchDuration();
  const totalTicks = getMatchTotalTicks(addedTime);

  return matchDuration / totalTicks;
}

/* ===================================================== */
/* PEGA O JOGO ATUAL */
/* ===================================================== */

function getCurrentCampaignMatch() {
  const state = window.gameState;

  if (!state || !state.campaign || !Array.isArray(state.campaign.matches)) {
    return null;
  }

  return state.campaign.matches[state.campaign.currentMatchIndex] || null;
}

/* ===================================================== */
/* LIBERA O PRÓXIMO JOGO */
/* ===================================================== */

function unlockNextCampaignMatch() {
  const state = window.gameState;

  if (!state || !state.campaign) {
    return;
  }

  const currentIndex = state.campaign.currentMatchIndex;
  const nextIndex = currentIndex + 1;

  state.campaign.currentMatchIndex = nextIndex;

  const nextMatch = state.campaign.matches[nextIndex];

  if (nextMatch) {
    nextMatch.unlocked = true;
  }
}

/* ===================================================== */
/* EXPÕE FUNÇÕES PARA OUTROS ARQUIVOS */
/* ===================================================== */

window.startLeagueCampaign = startLeagueCampaign;
window.createDraftTeamFromCurrentDraft = createDraftTeamFromCurrentDraft;

window.setCampaignSpeedMode = setCampaignSpeedMode;
window.getCampaignMatchDuration = getCampaignMatchDuration;

window.generateAddedTime = generateAddedTime;
window.getMatchTotalTicks = getMatchTotalTicks;
window.formatMatchMinute = formatMatchMinute;
window.getMatchTickInterval = getMatchTickInterval;

window.getCurrentCampaignMatch = getCurrentCampaignMatch;
window.unlockNextCampaignMatch = unlockNextCampaignMatch;
window.generateLeagueStandings = generateLeagueStandings;
window.getQualificationLabel = getQualificationLabel;

