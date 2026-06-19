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

const DRAFT_CLUB_COOLDOWN = 3;

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

  while (recentClubs.length > DRAFT_CLUB_COOLDOWN) {
    recentClubs.shift();
  }
}

function pickTeamAvoidingRecentClubs(teams) {
  if (!Array.isArray(teams) || teams.length === 0) {
    return null;
  }

  const recentClubs = new Set(getRecentDraftClubs());

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

  const randomIndex = Math.floor(Math.random() * finalPool.length);

  return finalPool[randomIndex];
}

/* ===================================================== */
/* SORTEIA UM TIME VÁLIDO */
/* Só sorteia times que ainda tenham pelo menos */
/* 1 jogador disponível para entrar no campo */
/*
  Agora também evita repetir o mesmo clube em sequência,
  mesmo que seja de outra temporada.
*/
/* ===================================================== */

function drawRandomTeam() {
  const availableTeams = getAvailableTeamsForDraft();

  if (availableTeams.length === 0) {
    alert("Não há mais jogadores disponíveis para completar o time.");
    return null;
  }

  const team = pickTeamAvoidingRecentClubs(availableTeams);

  if (!team) {
    alert("Não foi possível sortear um time válido.");
    return null;
  }

  rememberDraftClub(team);

  window.gameState.currentDrawnTeam = team;

  return team;
}
/* ===================================================== */
/* RETORNA TIMES QUE AINDA TÊM JOGADORES ÚTEIS */
/* ===================================================== */

function getAvailableTeamsForDraft() {
  const database = window.teamsDatabase || [];

  return database.filter((team) => {
    const availablePlayers = getAvailablePlayersFromTeam(team);

    return availablePlayers.length > 0;
  });
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

window.normalizePlayerName = normalizePlayerName;
window.isPlayerAlreadyUsed = isPlayerAlreadyUsed;
window.markPlayerAsUsed = markPlayerAsUsed;
window.canPlayerFitSlot = canPlayerFitSlot;
window.getAcceptedPositionsForSlot = getAcceptedPositionsForSlot;