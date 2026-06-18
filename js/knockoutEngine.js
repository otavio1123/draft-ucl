/* ===================================================== */
/* KNOCKOUTENGINE.JS - MOTOR DO MATA-MATA */
/* ===================================================== */

/*
  Este arquivo controla o mata-mata:
  - playoffs;
  - oitavas;
  - quartas;
  - semifinal;
  - final;
  - agregado;
  - pênaltis futuramente.

  Importante:
  Ele fica separado da fase de liga para não quebrar:
  - campaign.matches;
  - cronômetro da fase de liga;
  - classificação geral.
*/

/* ===================================================== */
/* ORDEM DAS FASES DO MATA-MATA */
/* ===================================================== */

const KNOCKOUT_STAGES = {
  playoffs: {
    id: "playoffs",
    label: "PLAYOFFS",
    nextStage: "round16",
    nextLabel: "OITAVAS"
  },

  round16: {
    id: "round16",
    label: "OITAVAS",
    nextStage: "quarter",
    nextLabel: "QUARTAS"
  },

  quarter: {
    id: "quarter",
    label: "QUARTAS",
    nextStage: "semi",
    nextLabel: "SEMIFINAL"
  },

  semi: {
    id: "semi",
    label: "SEMIFINAL",
    nextStage: "final",
    nextLabel: "FINAL"
  },

  final: {
    id: "final",
    label: "FINAL",
    nextStage: null,
    nextLabel: null
  }
};
/* Timer separado do mata-mata */
/* Não mistura com o timer da fase de liga */
let activeKnockoutTimer = null;

/* Timer separado dos pênaltis */
let activePenaltyTimer = null;
/* ===================================================== */
/* PEGA O TIME DRAFT */
/* ===================================================== */

function getDraftTeamForKnockout() {
  const state = window.gameState;

  if (!state || !state.userTeam) {
    return null;
  }

  return state.userTeam;
}

/* ===================================================== */
/* PEGA A LINHA DO DRAFT NA CLASSIFICAÇÃO */
/* ===================================================== */

function getDraftStandingRow() {
  const state = window.gameState;

  if (!state || !state.campaign || !Array.isArray(state.campaign.standings)) {
    return null;
  }

  return state.campaign.standings.find((row) => {
    return row.teamId === "draft_user_team";
  }) || null;
}

/* ===================================================== */
/* PEGA UM TIME DA CLASSIFICAÇÃO PELO ID */
/* ===================================================== */

function getCampaignTeamById(teamId) {
  const state = window.gameState;

  if (!state || !state.campaign || !Array.isArray(state.campaign.teams)) {
    return null;
  }

  return state.campaign.teams.find((team) => {
    return team.id === teamId;
  }) || null;
}

/* ===================================================== */
/* ESCOLHE ADVERSÁRIO DOS PLAYOFFS */
/*
  Regra simples baseada no regulamento:

  DRAFT 9º ao 16º:
  - pega alguém entre 17º e 24º
  - DRAFT decide a volta em casa

  DRAFT 17º ao 24º:
  - pega alguém entre 9º e 16º
  - DRAFT faz a ida em casa
*/
/* ===================================================== */

function pickPlayoffOpponent() {
  const state = window.gameState;
  const draftRow = getDraftStandingRow();

  if (!state || !state.campaign || !draftRow) {
    return null;
  }

  const draftPosition = draftRow.position;

  let opponentRows = [];

  if (draftPosition >= 9 && draftPosition <= 16) {
    opponentRows = state.campaign.standings.filter((row) => {
      return row.position >= 17 && row.position <= 24;
    });
  } else if (draftPosition >= 17 && draftPosition <= 24) {
    opponentRows = state.campaign.standings.filter((row) => {
      return row.position >= 9 && row.position <= 16;
    });
  }

  opponentRows = opponentRows.filter((row) => {
    return row.teamId !== "draft_user_team";
  });

  if (opponentRows.length === 0) {
    return null;
  }

  const randomIndex = Math.floor(Math.random() * opponentRows.length);
  const opponentRow = opponentRows[randomIndex];

  return getCampaignTeamById(opponentRow.teamId);
}

/* ===================================================== */
/* ESCOLHE ADVERSÁRIO DAS OITAVAS */
/*
  Primeira versão segura:
  - pega um time classificado entre 9º e 24º que não seja o DRAFT.
  - depois vamos melhorar para simular vencedores dos playoffs.
*/
/* ===================================================== */

function pickRound16Opponent() {
  const state = window.gameState;

  if (!state || !state.campaign || !Array.isArray(state.campaign.standings)) {
    return null;
  }

  const possibleRows = state.campaign.standings.filter((row) => {
    return row.teamId !== "draft_user_team" &&
      row.position >= 9 &&
      row.position <= 24;
  });

  if (possibleRows.length === 0) {
    return null;
  }

  const randomIndex = Math.floor(Math.random() * possibleRows.length);
  const opponentRow = possibleRows[randomIndex];

  return getCampaignTeamById(opponentRow.teamId);
}

/* ===================================================== */
/* CRIA UM CONFRONTO IDA E VOLTA */
/* ===================================================== */

function createTwoLegTie(stageId, draftTeam, opponentTeam) {
  const stage = KNOCKOUT_STAGES[stageId];

  if (!stage || !draftTeam || !opponentTeam) {
    return null;
  }

  const draftRow = getDraftStandingRow();
  const draftPosition = draftRow?.position || 99;

  /*
    Regra de mando:
    - se DRAFT veio melhor posicionado, decide a volta em casa;
    - se veio pior posicionado, faz ida em casa.
  */
  const opponentRow = window.gameState.campaign.standings.find((row) => {
    return row.teamId === opponentTeam.id;
  });

  const opponentPosition = opponentRow?.position || 99;

  const draftBetterSeed = draftPosition < opponentPosition;

  const firstLegHome = draftBetterSeed ? opponentTeam : draftTeam;
  const firstLegAway = draftBetterSeed ? draftTeam : opponentTeam;

  const secondLegHome = draftBetterSeed ? draftTeam : opponentTeam;
  const secondLegAway = draftBetterSeed ? opponentTeam : draftTeam;

  return {
    id: `${stageId}_${Date.now()}`,
    stage: stageId,
    stageLabel: stage.label,
    nextStage: stage.nextStage,
    nextLabel: stage.nextLabel,

    draftTeam: draftTeam,
    opponentTeam: opponentTeam,

    status: "waiting", // waiting, live, finished
    finished: false,

    firstLeg: {
      id: `${stageId}_first_leg`,
      leg: "first",
      label: "JOGO DE IDA",

      homeTeam: firstLegHome,
      awayTeam: firstLegAway,

      status: "waiting",
      unlocked: true,

      homeScore: 0,
      awayScore: 0,
      events: [],
      shownEvents: [],
      addedTime: null,
      currentMinute: "0'"
    },

    secondLeg: {
      id: `${stageId}_second_leg`,
      leg: "second",
      label: "JOGO DE VOLTA",

      homeTeam: secondLegHome,
      awayTeam: secondLegAway,

      status: "waiting",
      unlocked: false,

      homeScore: 0,
      awayScore: 0,
      events: [],
      shownEvents: [],
      addedTime: null,
      currentMinute: "0'"
    },

    aggregateDraft: 0,
    aggregateOpponent: 0,

    decidedByPenalties: false,
    penalties: null,

    winnerTeamId: null,
    eliminatedTeamId: null
  };
}

/* ===================================================== */
/* INICIA O MATA-MATA COM BASE NA CLASSIFICAÇÃO */
/* ===================================================== */

function startKnockoutFromStandings() {
  const state = window.gameState;

  if (!state || !state.campaign) {
    return null;
  }

  const draftStatus = state.campaign.userQualificationStatus;
  const draftTeam = getDraftTeamForKnockout();

  if (!draftTeam) {
    alert("Time DRAFT não encontrado.");
    return null;
  }

  /*
    Eliminado na fase de liga:
    não tem card, não tem mata-mata.
  */
  if (draftStatus === "eliminated") {
    state.campaign.knockout = {
      userEliminated: true,
      userStoppedAt: "league",
      currentStage: null,
      currentTie: null,
      completedTies: []
    };

    return state.campaign.knockout;
  }

  let stageId = null;
  let opponentTeam = null;

  if (draftStatus === "playoffs") {
    stageId = "playoffs";
    opponentTeam = pickPlayoffOpponent();
  }

  if (draftStatus === "round16") {
    stageId = "round16";
    opponentTeam = pickRound16Opponent();
  }

  if (!stageId || !opponentTeam) {
    alert("Não foi possível montar o confronto do mata-mata.");
    return null;
  }

  const tie = createTwoLegTie(stageId, draftTeam, opponentTeam);

  if (!tie) {
    alert("Não foi possível criar o confronto.");
    return null;
  }

  state.campaign.knockout = {
    userEliminated: false,
    userStoppedAt: null,

    currentStage: stageId,
    currentTie: tie,
    completedTies: []
  };

  console.log("MATA-MATA CRIADO:", state.campaign.knockout);

  return state.campaign.knockout;
}
/* ===================================================== */
/* PEGA O CONFRONTO ATUAL DO MATA-MATA */
/* ===================================================== */

function getCurrentKnockoutTie() {
  const state = window.gameState;

  if (!state || !state.campaign || !state.campaign.knockout) {
    return null;
  }

  return state.campaign.knockout.currentTie || null;
}

/* ===================================================== */
/* PEGA IDA OU VOLTA PELO ÍNDICE */
/* 0 = ida | 1 = volta */
/* ===================================================== */

function getKnockoutLegByIndex(legIndex) {
  const tie = getCurrentKnockoutTie();

  if (!tie) {
    return null;
  }

  if (legIndex === 0) {
    return tie.firstLeg;
  }

  if (legIndex === 1) {
    return tie.secondLeg;
  }

  return null;
}

/* ===================================================== */
/* INICIA JOGO DO MATA-MATA */
/* Usa o mesmo gerador de eventos da fase de liga */
/* ===================================================== */

function startKnockoutLeg(legIndex) {
  const state = window.gameState;
  const tie = getCurrentKnockoutTie();
  const leg = getKnockoutLegByIndex(legIndex);

  if (!state || !state.campaign || !tie || !leg) {
    return;
  }

  if (!leg.unlocked) {
    alert("Esse jogo ainda está bloqueado.");
    return;
  }

  if (leg.status !== "waiting") {
    return;
  }

  if (state.campaign.isMatchRunning) {
    alert("Já existe um jogo em andamento.");
    return;
  }

  if (typeof generateMatchEvents !== "function") {
    alert("Gerador de eventos não encontrado.");
    return;
  }

  if (
    typeof generateAddedTime !== "function" ||
    typeof getMatchTotalTicks !== "function" ||
    typeof getMatchTickInterval !== "function" ||
    typeof formatMatchMinute !== "function"
  ) {
    alert("Funções de cronômetro da campanha não encontradas.");
    return;
  }

  const addedTime = generateAddedTime();
  const totalTicks = getMatchTotalTicks(addedTime);

  leg.status = "live";
  leg.currentMinute = "0'";
  leg.currentTick = 0;
  leg.totalTicks = totalTicks;
  leg.addedTime = addedTime;

  leg.homeScore = 0;
  leg.awayScore = 0;

  leg.events = [];
  leg.shownEvents = [];

  tie.status = "live";

  state.campaign.isMatchRunning = true;

/*
  generateMatchEvents retorna os eventos.
  Precisamos salvar no jogo do mata-mata.
*/
leg.events = generateMatchEvents(leg);

/*
  Boost do mata-mata.
  Só roda se a função já existir.
  Assim não quebra enquanto ainda estamos montando.
*/
if (typeof applyKnockoutMatchBoost === "function") {
  applyKnockoutMatchBoost(leg, legIndex);
}

  renderKnockoutPage();
  runKnockoutLegClock(legIndex);
}

/* ===================================================== */
/* RODA O CRONÔMETRO DO JOGO DO MATA-MATA */
/* ===================================================== */

function runKnockoutLegClock(legIndex) {
  const leg = getKnockoutLegByIndex(legIndex);

  if (!leg) {
    return;
  }

  const tickInterval = getMatchTickInterval(leg.addedTime);

  activeKnockoutTimer = setInterval(() => {
    const currentLeg = getKnockoutLegByIndex(legIndex);

    if (!currentLeg || currentLeg.status !== "live") {
      clearInterval(activeKnockoutTimer);
      activeKnockoutTimer = null;
      return;
    }

    currentLeg.currentTick += 1;
    currentLeg.currentMinute = formatMatchMinute(
      currentLeg.currentTick,
      currentLeg.addedTime
    );

    revealKnockoutEventsForTick(currentLeg, currentLeg.currentTick);

    if (currentLeg.currentTick >= currentLeg.totalTicks) {
      finishKnockoutLeg(legIndex);
      return;
    }

    renderKnockoutPage();
  }, tickInterval);
}

/* ===================================================== */
/* MOSTRA GOLS DO MATA-MATA NO MOMENTO CERTO */
/* ===================================================== */

function revealKnockoutEventsForTick(leg, tick) {
  if (!leg || !Array.isArray(leg.events)) {
    return;
  }

  const eventsToReveal = leg.events.filter((event) => {
    return event.tick === tick && !event.shown;
  });

  eventsToReveal.forEach((event) => {
    event.shown = true;

    leg.shownEvents.push(event);

    if (event.teamId === leg.homeTeam.id) {
      leg.homeScore += 1;
    } else if (event.teamId === leg.awayTeam.id) {
      leg.awayScore += 1;
    }
  });
}

/* ===================================================== */
/* FINALIZA JOGO DO MATA-MATA */
/* ===================================================== */

function finishKnockoutLeg(legIndex) {
  const state = window.gameState;
  const tie = getCurrentKnockoutTie();
  const leg = getKnockoutLegByIndex(legIndex);

  if (!state || !state.campaign || !tie || !leg) {
    return;
  }

  if (activeKnockoutTimer) {
    clearInterval(activeKnockoutTimer);
    activeKnockoutTimer = null;
  }

  leg.status = "finished";
  leg.currentMinute = "FIM";

  state.campaign.isMatchRunning = false;

  updateKnockoutAggregate();

 /*
  Se for final em jogo único:
  decide após esse jogo.
*/
if (tie.isSingleMatch) {
  checkKnockoutTieResult();
  renderKnockoutPage();
  return;
}

/*
  Se terminou a ida:
  libera a volta.
*/
if (legIndex === 0) {
  tie.secondLeg.unlocked = true;
  tie.status = "waiting";
}

/*
  Se terminou a volta:
  verifica quem passou no agregado.
*/
if (legIndex === 1) {
  checkKnockoutTieResult();
}

  renderKnockoutPage();
}

/* ===================================================== */
/* CALCULA GOLS DO DRAFT EM UM JOGO */
/* ===================================================== */

function getDraftGoalsFromLeg(leg) {
  if (!leg) {
    return 0;
  }

  if (leg.homeTeam.id === "draft_user_team") {
    return leg.homeScore;
  }

  if (leg.awayTeam.id === "draft_user_team") {
    return leg.awayScore;
  }

  return 0;
}

/* ===================================================== */
/* CALCULA GOLS DO ADVERSÁRIO EM UM JOGO */
/* ===================================================== */

function getOpponentGoalsFromLeg(leg) {
  if (!leg) {
    return 0;
  }

  if (leg.homeTeam.id === "draft_user_team") {
    return leg.awayScore;
  }

  if (leg.awayTeam.id === "draft_user_team") {
    return leg.homeScore;
  }

  return 0;
}

/* ===================================================== */
/* ATUALIZA O AGREGADO DO CONFRONTO */
/* ===================================================== */

function updateKnockoutAggregate() {
  const tie = getCurrentKnockoutTie();

  if (!tie) {
    return;
  }

  const firstDraftGoals = getDraftGoalsFromLeg(tie.firstLeg);
  const firstOpponentGoals = getOpponentGoalsFromLeg(tie.firstLeg);

  /*
    Final em jogo único:
    agregado é o próprio placar da final.
  */
  if (tie.isSingleMatch) {
    tie.aggregateDraft = firstDraftGoals;
    tie.aggregateOpponent = firstOpponentGoals;
    return;
  }

  const secondDraftGoals = getDraftGoalsFromLeg(tie.secondLeg);
  const secondOpponentGoals = getOpponentGoalsFromLeg(tie.secondLeg);

  tie.aggregateDraft = firstDraftGoals + secondDraftGoals;
  tie.aggregateOpponent = firstOpponentGoals + secondOpponentGoals;
}

/* ===================================================== */
/* VERIFICA RESULTADO DO CONFRONTO */
/* Depois da volta:
   - DRAFT ganhou agregado = classificado
   - DRAFT perdeu agregado = eliminado
   - empate = pênaltis futuramente
*/
/* ===================================================== */

function checkKnockoutTieResult() {
  const state = window.gameState;
  const tie = getCurrentKnockoutTie();

  if (!state || !state.campaign || !state.campaign.knockout || !tie) {
    return;
  }

  updateKnockoutAggregate();

  if (tie.aggregateDraft > tie.aggregateOpponent) {
    tie.status = "finished";
    tie.finished = true;
    tie.winnerTeamId = "draft_user_team";
    tie.eliminatedTeamId = tie.opponentTeam.id;
    return;
  }

  if (tie.aggregateDraft < tie.aggregateOpponent) {
    tie.status = "finished";
    tie.finished = true;
    tie.winnerTeamId = tie.opponentTeam.id;
    tie.eliminatedTeamId = "draft_user_team";

    state.campaign.knockout.userEliminated = true;
    state.campaign.knockout.userStoppedAt = tie.stage;
    return;
  }

  /*
    Empate no agregado.
    Próximo passo: pênaltis ao vivo.
  */
  tie.status = "awaiting_penalties";
  tie.finished = false;
}


/* ===================================================== */
/* CONFIGURAÇÕES DOS PÊNALTIS */
/* ===================================================== */

const PENALTY_POSITION_PRIORITY = [
  "CA",
  "PE",
  "PD",
  "ATA",
  "MEI",
  "MC",
  "ME",
  "MD",
  "VOL",
  "ALA",
  "LD",
  "LE",
  "ZAG",
  "GOL"
];

const PENALTY_TAKER_WEIGHTS = {
  CA: 1.35,
  ATA: 1.30,
  PE: 1.20,
  PD: 1.20,
  MEI: 1.25,
  MC: 1.05,
  ME: 1.00,
  MD: 1.00,
  VOL: 0.80,
  ALA: 0.75,
  LD: 0.65,
  LE: 0.65,
  ZAG: 0.45,
  GOL: 0.05
};

/* ===================================================== */
/* LIMITA NÚMERO ENTRE MÍNIMO E MÁXIMO */
/* ===================================================== */

function clampPenaltyNumber(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

/* ===================================================== */
/* PEGA OS 11 JOGADORES QUE PODEM COBRAR */
/*
  DRAFT:
  - usa os 11 jogadores montados.

  Adversário:
  - usa somente os 11 primeiros da database.
  - reservas depois disso não cobram.
*/
/* ===================================================== */

function getPenaltyEligiblePlayers(team) {
  if (!team || !Array.isArray(team.players)) {
    return [];
  }

  return team.players.slice(0, 11);
}

/* ===================================================== */
/* PEGA GOLEIRO PARA INFLUENCIAR A CHANCE */
/* Pode procurar na lista toda, mas ele não precisa cobrar */
/* ===================================================== */

function getPenaltyGoalkeeper(team) {
  if (!team || !Array.isArray(team.players)) {
    return null;
  }

  return team.players.find((player) => {
    return player.position === "GOL" ||
      (Array.isArray(player.positions) && player.positions.includes("GOL"));
  }) || null;
}

/* ===================================================== */
/* POSIÇÃO PRINCIPAL PARA ORDENAR COBRADORES */
/* ===================================================== */

function getPenaltyPlayerMainPosition(player) {
  if (!player) {
    return "ZAG";
  }

  if (player.position) {
    return player.position;
  }

  if (Array.isArray(player.positions) && player.positions.length > 0) {
    return player.positions[0];
  }

  return "ZAG";
}

/* ===================================================== */
/* MONTA A ORDEM DOS COBRADORES */
/* Ordem:
   CA, PE, PD, ATA, MEI, MC...
   Dentro da mesma posição, maior rating primeiro.
*/
/* ===================================================== */

function buildPenaltyTakerOrder(team) {
  const players = getPenaltyEligiblePlayers(team);

  return players
    .slice()
    .sort((a, b) => {
      const positionA = getPenaltyPlayerMainPosition(a);
      const positionB = getPenaltyPlayerMainPosition(b);

      const priorityA = PENALTY_POSITION_PRIORITY.indexOf(positionA);
      const priorityB = PENALTY_POSITION_PRIORITY.indexOf(positionB);

      const safePriorityA = priorityA === -1 ? 99 : priorityA;
      const safePriorityB = priorityB === -1 ? 99 : priorityB;

      if (safePriorityA !== safePriorityB) {
        return safePriorityA - safePriorityB;
      }

      return (b.rating || 75) - (a.rating || 75);
    });
}

/* ===================================================== */
/* CALCULA CHANCE DE CONVERTER PÊNALTI */
/* ===================================================== */

function calculatePenaltyConversionChance(taker, attackingTeam, defendingTeam, isPressureKick) {
  const takerRating = taker?.rating || 75;

  const teamClutch = attackingTeam?.clutch || attackingTeam?.mentality || 80;
  const teamMentality = attackingTeam?.mentality || 80;

  const goalkeeper = getPenaltyGoalkeeper(defendingTeam);
  const goalkeeperRating = goalkeeper?.rating || defendingTeam?.defense || 80;

  let chance = 0.72;

  chance += (takerRating - 80) * 0.006;
  chance += (teamClutch - 80) * 0.003;
  chance += (teamMentality - 80) * 0.002;
  chance -= (goalkeeperRating - 80) * 0.004;

  if (isPressureKick) {
    chance -= 0.035;
  }

  return clampPenaltyNumber(chance, 0.55, 0.92);
}

/* ===================================================== */
/* CRIA OBJETO DOS PÊNALTIS */
/* ===================================================== */

function createPenaltyShootout(tie) {
  if (!tie) {
    return null;
  }

  return {
    status: "live",

    draftScore: 0,
    opponentScore: 0,

    kicks: [],

    draftTakers: buildPenaltyTakerOrder(tie.draftTeam),
    opponentTakers: buildPenaltyTakerOrder(tie.opponentTeam),

    winnerTeamId: null,
    loserTeamId: null
  };
}

/* ===================================================== */
/* INICIA PÊNALTIS */
/* ===================================================== */

function startPenaltyShootout() {
  const state = window.gameState;
  const tie = getCurrentKnockoutTie();

  if (!state || !state.campaign || !tie) {
    return;
  }

  if (tie.status !== "awaiting_penalties") {
    return;
  }

  if (state.campaign.isMatchRunning) {
    alert("Já existe uma disputa em andamento.");
    return;
  }

  tie.decidedByPenalties = true;
  tie.penalties = createPenaltyShootout(tie);
  tie.status = "penalties_live";

  state.campaign.isMatchRunning = true;

  renderKnockoutPage();
  runPenaltyShootout();
}

/* ===================================================== */
/* RODA PÊNALTIS AO VIVO */
/* ===================================================== */

function runPenaltyShootout() {
  const state = window.gameState;

  if (!state || !state.campaign) {
    return;
  }

const speedMode = state.campaign.speedMode || "normal";

/*
  Tempo dos pênaltis:
  - normal: mais cadenciado
  - rápido: ainda acelera, mas sem ficar instantâneo
*/
const interval = speedMode === "fast" ? 1500 : 2300;

  activePenaltyTimer = setInterval(() => {
    const tie = getCurrentKnockoutTie();

    if (!tie || !tie.penalties || tie.penalties.status !== "live") {
      clearInterval(activePenaltyTimer);
      activePenaltyTimer = null;
      return;
    }

    executeNextPenaltyKick(tie);

    if (tie.penalties.status === "finished") {
      finishPenaltyShootout(tie);

      clearInterval(activePenaltyTimer);
      activePenaltyTimer = null;
      return;
    }

    renderKnockoutPage();
  }, interval);
}

/* ===================================================== */
/* EXECUTA A PRÓXIMA COBRANÇA */
/* Ordem fixa:
   DRAFT cobra
   adversário cobra
   repete
*/
/* ===================================================== */

function executeNextPenaltyKick(tie) {
  const penalties = tie.penalties;

  if (!penalties || penalties.status !== "live") {
    return;
  }

  const kickIndex = penalties.kicks.length;
  const side = kickIndex % 2 === 0 ? "draft" : "opponent";

  const isDraftKick = side === "draft";

  const attackingTeam = isDraftKick ? tie.draftTeam : tie.opponentTeam;
  const defendingTeam = isDraftKick ? tie.opponentTeam : tie.draftTeam;

  const takers = isDraftKick ? penalties.draftTakers : penalties.opponentTakers;

  if (!Array.isArray(takers) || takers.length === 0) {
    return;
  }

  const teamKickNumber = penalties.kicks.filter((kick) => {
    return kick.side === side;
  }).length + 1;

  const takerIndex = (teamKickNumber - 1) % takers.length;
  const repeatNumber = Math.floor((teamKickNumber - 1) / takers.length) + 1;

  const taker = takers[takerIndex];

  const isPressureKick = teamKickNumber >= 5 || penalties.kicks.length >= 8;

  const chance = calculatePenaltyConversionChance(
    taker,
    attackingTeam,
    defendingTeam,
    isPressureKick
  );

  const scored = Math.random() < chance;

  if (isDraftKick && scored) {
    penalties.draftScore += 1;
  }

  if (!isDraftKick && scored) {
    penalties.opponentScore += 1;
  }

  penalties.kicks.push({
    order: penalties.kicks.length + 1,
    round: Math.ceil((penalties.kicks.length + 1) / 2),

    side: side,

    teamId: attackingTeam.id,
    teamName: attackingTeam.club,
    teamSeason: attackingTeam.season || "",

    playerName: taker.name,
    repeatNumber: repeatNumber,

    scored: scored,
    chance: chance
  });

  checkPenaltyShootoutEnd(tie);
}

/* ===================================================== */
/* VERIFICA SE A DISPUTA ACABOU */
/* Inclui:
   - encerramento antecipado nas 5 primeiras cobranças;
   - alternadas somente depois dos dois baterem na rodada.
*/
/* ===================================================== */

function checkPenaltyShootoutEnd(tie) {
  const penalties = tie.penalties;

  if (!penalties) {
    return;
  }

  const draftKicks = penalties.kicks.filter((kick) => {
    return kick.side === "draft";
  }).length;

  const opponentKicks = penalties.kicks.filter((kick) => {
    return kick.side === "opponent";
  }).length;

  const draftScore = penalties.draftScore;
  const opponentScore = penalties.opponentScore;

  const draftRemaining = Math.max(0, 5 - draftKicks);
  const opponentRemaining = Math.max(0, 5 - opponentKicks);

  /*
    FASE NORMAL DOS PÊNALTIS:
    Até os dois times completarem 5 cobranças.
  */
  const stillInFirstFive = draftKicks <= 5 && opponentKicks <= 5;

  if (stillInFirstFive) {
    /*
      Encerramento antecipado:
      exemplo 3 x 0, quando o outro não consegue mais alcançar.
    */
    if (draftScore > opponentScore + opponentRemaining) {
      setPenaltyWinner(tie, "draft_user_team");
      return;
    }

    if (opponentScore > draftScore + draftRemaining) {
      setPenaltyWinner(tie, tie.opponentTeam.id);
      return;
    }

    /*
      Depois que os dois bateram 5:
      se não estiver empatado, acabou.
    */
    if (draftKicks === 5 && opponentKicks === 5 && draftScore !== opponentScore) {
      const winnerId = draftScore > opponentScore
        ? "draft_user_team"
        : tie.opponentTeam.id;

      setPenaltyWinner(tie, winnerId);
      return;
    }

    return;
  }

  /*
    COBRANÇAS ALTERNADAS:
    Só pode decidir depois que os dois times baterem
    a mesma quantidade de cobranças.
    
    Exemplo:
    DRAFT bateu a 6ª e fez.
    Adversário ainda precisa bater a 6ª.
    Então NÃO pode acabar ainda.
  */
  if (draftKicks === opponentKicks && draftScore !== opponentScore) {
    const winnerId = draftScore > opponentScore
      ? "draft_user_team"
      : tie.opponentTeam.id;

    setPenaltyWinner(tie, winnerId);
  }
}

/* ===================================================== */
/* DEFINE VENCEDOR DOS PÊNALTIS */
/* ===================================================== */

function setPenaltyWinner(tie, winnerTeamId) {
  const penalties = tie.penalties;

  if (!penalties) {
    return;
  }

  penalties.status = "finished";
  penalties.winnerTeamId = winnerTeamId;

  if (winnerTeamId === "draft_user_team") {
    penalties.loserTeamId = tie.opponentTeam.id;
  } else {
    penalties.loserTeamId = "draft_user_team";
  }
}

/* ===================================================== */
/* FINALIZA PÊNALTIS E O CONFRONTO */
/* ===================================================== */

function finishPenaltyShootout(tie) {
  const state = window.gameState;

  if (!state || !state.campaign || !state.campaign.knockout || !tie || !tie.penalties) {
    return;
  }

  const winnerTeamId = tie.penalties.winnerTeamId;

  tie.status = "finished";
  tie.finished = true;

  tie.winnerTeamId = winnerTeamId;

  if (winnerTeamId === "draft_user_team") {
    tie.eliminatedTeamId = tie.opponentTeam.id;
  } else {
    tie.eliminatedTeamId = "draft_user_team";

    state.campaign.knockout.userEliminated = true;
    state.campaign.knockout.userStoppedAt = tie.stage;
  }

  state.campaign.isMatchRunning = false;

  renderKnockoutPage();
}
/* ===================================================== */
/* IDS DOS ADVERSÁRIOS JÁ ENFRENTADOS NO MATA-MATA */
/* Evita repetir adversário nas próximas fases */
/* ===================================================== */

function getUsedKnockoutOpponentIds() {
  const state = window.gameState;
  const usedIds = new Set();

  if (!state || !state.campaign || !state.campaign.knockout) {
    return usedIds;
  }

  const knockout = state.campaign.knockout;

  (knockout.completedTies || []).forEach((tie) => {
    if (tie?.opponentTeam?.id) {
      usedIds.add(tie.opponentTeam.id);
    }
  });

  if (knockout.currentTie?.opponentTeam?.id) {
    usedIds.add(knockout.currentTie.opponentTeam.id);
  }

  return usedIds;
}

/* ===================================================== */
/* ESCOLHE ADVERSÁRIO DA PRÓXIMA FASE */
/* Regras simples e seguras:
   - Se DRAFT veio dos playoffs para oitavas, pega top 8.
   - Se DRAFT já era top 8 e foi direto às oitavas, pega 9º ao 24º.
   - Quartas e semi pegam times restantes da classificação.
*/
/* ===================================================== */

function pickOpponentForNextKnockoutStage(stageId) {
  const state = window.gameState;
  const draftRow = getDraftStandingRow();

  if (!state || !state.campaign || !Array.isArray(state.campaign.standings)) {
    return null;
  }

  const usedIds = getUsedKnockoutOpponentIds();

  let possibleRows = state.campaign.standings.filter((row) => {
    return row.teamId !== "draft_user_team" && !usedIds.has(row.teamId);
  });

  if (stageId === "round16" && draftRow) {
    if (draftRow.position <= 8) {
      possibleRows = possibleRows.filter((row) => {
        return row.position >= 9 && row.position <= 24;
      });
    } else {
      possibleRows = possibleRows.filter((row) => {
        return row.position >= 1 && row.position <= 8;
      });
    }
  }

  if (stageId === "quarter") {
    possibleRows = possibleRows.filter((row) => {
      return row.position <= 24;
    });
  }

  if (stageId === "semi") {
    possibleRows = possibleRows.filter((row) => {
      return row.position <= 24;
    });
  }

  /*
    Segurança:
    se por algum motivo filtrou demais, volta para qualquer time não usado.
  */
  if (possibleRows.length === 0) {
    possibleRows = state.campaign.standings.filter((row) => {
      return row.teamId !== "draft_user_team" && !usedIds.has(row.teamId);
    });
  }

  if (possibleRows.length === 0) {
    return null;
  }

  const randomIndex = Math.floor(Math.random() * possibleRows.length);
  const opponentRow = possibleRows[randomIndex];

  return getCampaignTeamById(opponentRow.teamId);
}

/* ===================================================== */
/* AVANÇA PARA A PRÓXIMA FASE DO MATA-MATA */
/* ===================================================== */

function advanceToNextKnockoutStage() {
  const state = window.gameState;

  if (!state || !state.campaign || !state.campaign.knockout) {
    return null;
  }

  const knockout = state.campaign.knockout;
  const currentTie = knockout.currentTie;

  if (!currentTie || !currentTie.finished) {
    return null;
  }

  if (currentTie.winnerTeamId !== "draft_user_team") {
    return null;
  }

  const nextStageId = currentTie.nextStage;

  if (!nextStageId) {
    alert("Campanha finalizada.");
    return knockout;
  }
  const alreadySaved = (knockout.completedTies || []).some((tie) => {
    return tie.id === currentTie.id;
  });

  if (!alreadySaved) {
    knockout.completedTies.push(currentTie);
  }

const draftTeam = getDraftTeamForKnockout();

const opponentTeam = nextStageId === "final"
  ? pickFinalOpponent()
  : pickOpponentForNextKnockoutStage(nextStageId);

  if (!draftTeam || !opponentTeam) {
    alert("Não foi possível montar o adversário da próxima fase.");
    return null;
  }

const nextTie = nextStageId === "final"
  ? createFinalTie(draftTeam, opponentTeam)
  : createTwoLegTie(nextStageId, draftTeam, opponentTeam);

  if (!nextTie) {
    alert("Não foi possível criar a próxima fase.");
    return null;
  }

  knockout.currentStage = nextStageId;
  knockout.currentTie = nextTie;

  console.log("AVANÇOU PARA:", nextStageId, knockout.currentTie);

  return knockout;
}

/* ===================================================== */
/* ESCOLHE ADVERSÁRIO DA FINAL */
/* Pega um time forte ainda não enfrentado */
/* ===================================================== */

function pickFinalOpponent() {
  const state = window.gameState;

  if (!state || !state.campaign || !Array.isArray(state.campaign.standings)) {
    return null;
  }

  const usedIds = getUsedKnockoutOpponentIds();

  let possibleRows = state.campaign.standings.filter((row) => {
    return row.teamId !== "draft_user_team" && !usedIds.has(row.teamId);
  });

  /*
    Prioriza times fortes da classificação.
  */
  let strongestRows = possibleRows.filter((row) => {
    return row.position <= 12;
  });

  if (strongestRows.length === 0) {
    strongestRows = possibleRows;
  }

  if (strongestRows.length === 0) {
    return null;
  }

  const randomIndex = Math.floor(Math.random() * strongestRows.length);
  const opponentRow = strongestRows[randomIndex];

  return getCampaignTeamById(opponentRow.teamId);
}

/* ===================================================== */
/* CRIA FINAL EM JOGO ÚNICO */
/* ===================================================== */

function createFinalTie(draftTeam, opponentTeam) {
  if (!draftTeam || !opponentTeam) {
    return null;
  }

  return {
    id: `final_${Date.now()}`,
    stage: "final",
    stageLabel: "FINAL",
    nextStage: null,
    nextLabel: null,

    isSingleMatch: true,

    draftTeam: draftTeam,
    opponentTeam: opponentTeam,

    status: "waiting",
    finished: false,

    firstLeg: {
      id: "final_single_match",
      leg: "final",
      label: "JOGO ÚNICO",

      homeTeam: draftTeam,
      awayTeam: opponentTeam,

      status: "waiting",
      unlocked: true,

      homeScore: 0,
      awayScore: 0,
      events: [],
      shownEvents: [],
      addedTime: null,
      currentMinute: "0'"
    },

    secondLeg: null,

    aggregateDraft: 0,
    aggregateOpponent: 0,

    decidedByPenalties: false,
    penalties: null,

    winnerTeamId: null,
    eliminatedTeamId: null
  };
}
/* ===================================================== */
/* EXPÕE FUNÇÕES */
/* ===================================================== */
window.startKnockoutFromStandings = startKnockoutFromStandings;
window.createTwoLegTie = createTwoLegTie;
window.pickPlayoffOpponent = pickPlayoffOpponent;
window.pickRound16Opponent = pickRound16Opponent;

window.startKnockoutLeg = startKnockoutLeg;
window.finishKnockoutLeg = finishKnockoutLeg;
window.updateKnockoutAggregate = updateKnockoutAggregate;
window.checkKnockoutTieResult = checkKnockoutTieResult;

window.startPenaltyShootout = startPenaltyShootout;
window.executeNextPenaltyKick = executeNextPenaltyKick;
window.finishPenaltyShootout = finishPenaltyShootout;
window.advanceToNextKnockoutStage = advanceToNextKnockoutStage;
window.createFinalTie = createFinalTie;
window.pickFinalOpponent = pickFinalOpponent;