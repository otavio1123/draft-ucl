/* ===================================================== */
/* TIMER ATIVO DA PARTIDA */
/* Garante que só exista 1 jogo rodando por vez */
/* ===================================================== */
let activeMatchTimer = null;


/* ===================================================== */
/* AJUSTE DE DIFICULDADE DO DRAFT */
/*
  Objetivo:
  - O campeonato estava difícil demais para vencer.
  - Este bônus ajuda o time montado pelo usuário a competir melhor.
  - Não garante vitória.
  - Não altera sorteio, mata-mata, pênaltis ou banco de times.
  - Só afeta jogos em que o DRAFT participa.

  Ajuste fino:
  - Se continuar muito difícil: aumente pouco, exemplo 0.18 / 0.14.
  - Se ficar fácil demais: reduza para 0.10 / 0.08.
*/
/* ===================================================== */

const USER_DRAFT_TEAM_ID = "draft_user_team";

const DRAFT_ATTACK_XG_BONUS = 0.16;
const DRAFT_DEFENSE_XG_REDUCTION = 0.13;


/* ===================================================== */
/* PESOS POR POSIÇÃO PARA GOL */
/* Quanto maior o peso, maior a chance de marcar */
/* ===================================================== */

const GOAL_POSITION_WEIGHTS = {
  CA: 1.45,
  ATA: 1.35,
  PE: 1.15,
  PD: 1.15,
  MEI: 0.95,
  ME: 0.75,
  MD: 0.75,
  MC: 0.55,
  VOL: 0.35,
  ALA: 0.30,
  LD: 0.22,
  LE: 0.22,
  ZAG: 0.18,
  GOL: 0
};

/* ===================================================== */
/* PESOS POR POSIÇÃO PARA ASSISTÊNCIA */
/* Meio-campistas, pontas e laterais têm mais chance */
/* ===================================================== */

const ASSIST_POSITION_WEIGHTS = {
  MEI: 1.45,
  MC: 1.25,
  PE: 1.20,
  PD: 1.20,
  ME: 1.15,
  MD: 1.15,
  ALA: 0.95,
  LD: 0.80,
  LE: 0.80,
  VOL: 0.75,
  ATA: 0.55,
  CA: 0.40,
  ZAG: 0.18,
  GOL: 0
};

/* ===================================================== */
/* FUNÇÕES AUXILIARES */
/* ===================================================== */

function clampNumber(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function getSafeNumber(value, fallback = 80) {
  const number = Number(value);

  if (Number.isNaN(number)) {
    return fallback;
  }

  return number;
}

function getPrimaryPlayerPosition(player) {
  if (!player) return "MC";

  if (player.fieldPosition) {
    return player.fieldPosition;
  }

  if (player.position) {
    return player.position;
  }

  if (Array.isArray(player.positions) && player.positions.length > 0) {
    return player.positions[0];
  }

  return "MC";
}

/* ===================================================== */
/* CALCULA PODER OFENSIVO DO TIME */
/* ===================================================== */

function calculateAttackPower(team) {
  if (!team) return 80;

  const attack = getSafeNumber(team.attack);
  const midfield = getSafeNumber(team.midfield);
  const overall = getSafeNumber(team.teamOverall);
  const chemistry = getSafeNumber(team.chemistry, overall);
  const mentality = getSafeNumber(team.mentality, overall);
  const clutch = getSafeNumber(team.clutch, overall);

  return (
    attack * 0.40 +
    midfield * 0.20 +
    overall * 0.20 +
    chemistry * 0.08 +
    mentality * 0.06 +
    clutch * 0.06
  );
}

/* ===================================================== */
/* CALCULA PODER DEFENSIVO DO TIME */
/* ===================================================== */

function calculateDefensePower(team) {
  if (!team) return 80;

  const defense = getSafeNumber(team.defense);
  const midfield = getSafeNumber(team.midfield);
  const overall = getSafeNumber(team.teamOverall);
  const chemistry = getSafeNumber(team.chemistry, overall);
  const mentality = getSafeNumber(team.mentality, overall);
  const consistency = getSafeNumber(team.consistency, overall);

  return (
    defense * 0.45 +
    midfield * 0.20 +
    overall * 0.15 +
    chemistry * 0.08 +
    mentality * 0.07 +
    consistency * 0.05
  );
}

/* ===================================================== */
/* MODIFICADOR DE ESTILO */
/* Ofensivo cria mais, mas pode se expor */
/* Defensivo cria menos, mas segura melhor */
/* ===================================================== */

function getStyleAttackModifier(team) {
  if (!team || !team.style) return 0;

  if (team.style === "Ofensivo") return 0.22;
  if (team.style === "Defensivo") return -0.14;

  return 0;
}
/* ===================================================== */
/* MODIFICADOR DEFENSIVO DO ESTILO */
/* Ofensivo se expõe mais */
/* Defensivo fecha mais os espaços */
/* ===================================================== */

function getStyleDefenseExposureModifier(team) {
  if (!team || !team.style) return 0;

  if (team.style === "Ofensivo") return 0.10;
  if (team.style === "Defensivo") return -0.10;

  return 0;
}

/* ===================================================== */
/* MODIFICADORES DE FORMAÇÃO */
/*
  attack:
  aumenta ou reduz o xG do próprio time.

  defenseExposure:
  afeta o xG do adversário.
  negativo = defende melhor
  positivo = se expõe mais
*/
/* ===================================================== */
const formationXgProfiles = {
  "4-3-3": {
    attack: 0.10,
    defenseExposure: 0.05
  },

  "4-4-2": {
    attack: 0.03,
    defenseExposure: -0.02
  },

  "4-2-3-1": {
    attack: 0.07,
    defenseExposure: -0.06
  },

  "3-5-2": {
    attack: 0.08,
    defenseExposure: 0.03
  },

  "3-4-3": {
    attack: 0.15,
    defenseExposure: 0.12
  },

  "5-3-2": {
    attack: -0.04,
    defenseExposure: -0.11
  },

  "5-4-1": {
    attack: -0.10,
    defenseExposure: -0.16
  }
};

function getTeamFormation(team) {
  if (!team) return null;

  return (
    team.formation ||
    team.selectedFormation ||
    team.defaultFormation ||
    null
  );
}

function getFormationAttackModifier(team) {
  const formation = getTeamFormation(team);

  if (!formation || !formationXgProfiles[formation]) {
    return 0;
  }

  return formationXgProfiles[formation].attack;
}

function getFormationDefenseExposureModifier(team) {
  const formation = getTeamFormation(team);

  if (!formation || !formationXgProfiles[formation]) {
    return 0;
  }

  return formationXgProfiles[formation].defenseExposure;
}
/* ===================================================== */
/* GOLS ESPERADOS */
/* Usa ataque do time contra defesa do adversário */
/* ===================================================== */

function calculateExpectedGoals(attackingTeam, defendingTeam, isHome) {
  const attackPower = calculateAttackPower(attackingTeam);
  const defensePower = calculateDefensePower(defendingTeam);

  const powerDifference = attackPower - defensePower;

  let expectedGoals = 1.15;

  expectedGoals += powerDifference / 18;

  if (isHome) {
    expectedGoals += 0.15;
  } else {
    expectedGoals -= 0.05;
  }

  /* Estilo do time que ataca */
  expectedGoals += getStyleAttackModifier(attackingTeam);

  /* Estilo do time que defende */
  expectedGoals += getStyleDefenseExposureModifier(defendingTeam);

  /* Formação do time que ataca */
  expectedGoals += getFormationAttackModifier(attackingTeam);

    /* Formação do time que defende */
  expectedGoals += getFormationDefenseExposureModifier(defendingTeam);

  /*
    BÔNUS LEVE DO DRAFT

    Quando o DRAFT ataca:
    - aumenta um pouco o xG do DRAFT.

    Quando o DRAFT defende:
    - reduz um pouco o xG do adversário.

    Isso deixa o campeonato mais vencível, mas ainda mantém risco:
    - o Poisson continua podendo gerar derrota;
    - adversários fortes continuam perigosos;
    - mata-mata ainda tem variância.
  */
  if (attackingTeam?.id === USER_DRAFT_TEAM_ID) {
    expectedGoals += DRAFT_ATTACK_XG_BONUS;
  }

  if (defendingTeam?.id === USER_DRAFT_TEAM_ID) {
    expectedGoals -= DRAFT_DEFENSE_XG_REDUCTION;
  }

  return clampNumber(expectedGoals, 0.25, 3.4);
}
/* ===================================================== */
/* SORTEIO POISSON */
/* Transforma gols esperados em quantidade real de gols */
/* Exemplo: 1.7 esperado pode virar 0, 1, 2, 3... */
/* ===================================================== */

function poissonRandom(lambda) {
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
/* GERA QUANTIDADE DE GOLS DE UM TIME */
/* ===================================================== */

function generateTeamGoals(attackingTeam, defendingTeam, isHome) {
  const expectedGoals = calculateExpectedGoals(
    attackingTeam,
    defendingTeam,
    isHome
  );

  const goals = poissonRandom(expectedGoals);

  /*
    Trava placares absurdos.
    5 ou 6 ainda podem acontecer, mas são raros.
  */
  return clampNumber(goals, 0, 6);
}

/* ===================================================== */
/* ESCOLHE JOGADOR COM PESO */
/* Usado para escolher artilheiro e assistente */
/* ===================================================== */

function pickWeightedPlayer(team, weights, excludedPlayerName = null) {
  if (!team || !Array.isArray(team.players)) {
    return null;
  }

  const excludedKey = excludedPlayerName
    ? excludedPlayerName.toLowerCase()
    : null;

  const candidates = team.players
    .filter((player) => {
      if (!player || !player.name) return false;

      if (excludedKey && player.name.toLowerCase() === excludedKey) {
        return false;
      }

      const position = getPrimaryPlayerPosition(player);
      const positionWeight = weights[position] || 0;

      return positionWeight > 0;
    })
    .map((player) => {
      const position = getPrimaryPlayerPosition(player);
      const positionWeight = weights[position] || 0;
      const rating = getSafeNumber(player.rating, 75);

      return {
        player,
        weight: rating * positionWeight
      };
    });

  if (candidates.length === 0) {
    return null;
  }

  const totalWeight = candidates.reduce((sum, item) => {
    return sum + item.weight;
  }, 0);

  let randomWeight = Math.random() * totalWeight;

  for (const item of candidates) {
    randomWeight -= item.weight;

    if (randomWeight <= 0) {
      return item.player;
    }
  }

  return candidates[candidates.length - 1].player;
}

/* ===================================================== */
/* ESCOLHE AUTOR DO GOL */
/* ===================================================== */

function pickGoalScorer(team) {
  return pickWeightedPlayer(team, GOAL_POSITION_WEIGHTS);
}

/* ===================================================== */
/* ESCOLHE ASSISTENTE */
/* 22% de chance de gol sem assistência */
/* ===================================================== */

function pickAssistPlayer(team, scorer) {
  const noAssistChance = 0.22;

  if (Math.random() < noAssistChance) {
    return null;
  }

  return pickWeightedPlayer(
    team,
    ASSIST_POSITION_WEIGHTS,
    scorer?.name || null
  );
}

/* ===================================================== */
/* PESO DO MINUTO */
/* Final dos tempos tem um pouco mais emoção */
/* ===================================================== */

function getGoalMinuteWeight(tick, addedTime) {
  const firstHalfAdded = addedTime?.firstHalf || 0;

  /*
    Converte tick para minuto real de jogo.
    Exemplo:
    tick 48 com +2 no 1º tempo vira 46'
  */
  let matchMinute = tick;

  if (tick > 45 + firstHalfAdded) {
    matchMinute = tick - firstHalfAdded;
  }

  if (matchMinute <= 15) return 0.85;
  if (matchMinute <= 30) return 1.00;
  if (matchMinute <= 45) return 1.15;
  if (matchMinute <= 60) return 1.00;
  if (matchMinute <= 75) return 1.20;
  if (matchMinute <= 90) return 1.35;

  return 1.55;
}

/* ===================================================== */
/* SORTEIA MINUTOS DOS GOLS */
/* Evita repetir o mesmo tick */
/* ===================================================== */

function generateGoalTicks(totalGoals, addedTime) {
  const totalTicks = getMatchTotalTicks(addedTime);
  const selectedTicks = [];

  if (totalGoals <= 0) {
    return selectedTicks;
  }

  while (selectedTicks.length < totalGoals) {
    const tick = Math.floor(Math.random() * totalTicks) + 1;
    const weight = getGoalMinuteWeight(tick, addedTime);

    if (selectedTicks.includes(tick)) {
      continue;
    }

    if (Math.random() <= weight / 1.6) {
      selectedTicks.push(tick);
    }
  }

  return selectedTicks.sort((a, b) => a - b);
}

/* ===================================================== */
/* GERA OS EVENTOS DE GOL DA PARTIDA */
/* ===================================================== */

function generateMatchEvents(match) {
  if (!match) {
    return [];
  }

  const homeTeam = match.homeTeam;
  const awayTeam = match.awayTeam;

  const homeExpectedGoals = generateTeamGoals(homeTeam, awayTeam, true);
  const awayExpectedGoals = generateTeamGoals(awayTeam, homeTeam, false);

  const totalGoals = homeExpectedGoals + awayExpectedGoals;

  const goalTicks = generateGoalTicks(totalGoals, match.addedTime);

  const goalSlots = [];

  for (let i = 0; i < homeExpectedGoals; i++) {
    goalSlots.push({
      team: homeTeam,
      side: "home"
    });
  }

  for (let i = 0; i < awayExpectedGoals; i++) {
    goalSlots.push({
      team: awayTeam,
      side: "away"
    });
  }

  /*
    Mistura a ordem de quem marcou.
    Depois os eventos são ordenados pelo minuto.
  */
  goalSlots.sort(() => Math.random() - 0.5);

  const events = goalSlots.map((goalSlot, index) => {
    const scorer = pickGoalScorer(goalSlot.team);
    const assist = pickAssistPlayer(goalSlot.team, scorer);

    const tick = goalTicks[index];

    return {
      id: `goal_${match.id}_${index + 1}`,

      type: "goal",
      tick: tick,
      displayMinute: formatMatchMinute(tick, match.addedTime),

      teamId: goalSlot.team.id,
      teamName: goalSlot.team.club,
      side: goalSlot.side,

      scorer: scorer?.name || "Jogador",
      assist: assist?.name || null
    };
  });

  return events.sort((a, b) => a.tick - b.tick);
}

/* ===================================================== */
/* MOSTRA OS EVENTOS DO MINUTO ATUAL */
/* Atualiza placar quando o gol aparece */
/* ===================================================== */

function revealEventsForTick(match, tick) {
  if (!match || !Array.isArray(match.events)) {
    return;
  }

  const eventsNow = match.events.filter((event) => {
    return event.tick === tick;
  });

  eventsNow.forEach((event) => {
    const alreadyShown = match.shownEvents.some((shownEvent) => {
      return shownEvent.id === event.id;
    });

    if (alreadyShown) {
      return;
    }

    match.shownEvents.push(event);

    if (event.side === "home") {
      match.homeScore += 1;
    } else {
      match.awayScore += 1;
    }
  });
}

/* ===================================================== */
/* INICIA UMA PARTIDA DA CAMPANHA */
/* Chamada pelo botão REVELAR */
/* ===================================================== */

function startCampaignMatch(matchIndex) {
  const state = window.gameState;

  if (!state || !state.campaign) {
    return;
  }

  if (state.campaign.isMatchRunning) {
    alert("Já existe uma partida em andamento.");
    return;
  }

  const match = state.campaign.matches[matchIndex];

  if (!match) {
    return;
  }

  if (!match.unlocked) {
    alert("Este jogo ainda está bloqueado.");
    return;
  }

  if (matchIndex !== state.campaign.currentMatchIndex) {
    alert("Simule os jogos em ordem.");
    return;
  }

  if (match.status !== "waiting") {
    return;
  }

  /* Prepara a partida */
  match.status = "live";
  match.currentTick = 0;
  match.currentMinute = "0'";

  match.homeScore = 0;
  match.awayScore = 0;

  match.addedTime = generateAddedTime();

  match.events = generateMatchEvents(match);
  match.shownEvents = [];

  state.campaign.isMatchRunning = true;

  renderCampaignPage();

  runCampaignMatchClock(matchIndex);
}

/* ===================================================== */
/* RODA O CRONÔMETRO DA PARTIDA */
/* ===================================================== */

function runCampaignMatchClock(matchIndex) {
  const state = window.gameState;

  if (!state || !state.campaign) {
    return;
  }

  const match = state.campaign.matches[matchIndex];

  if (!match || !match.addedTime) {
    return;
  }

  if (activeMatchTimer) {
    clearInterval(activeMatchTimer);
  }

  const totalTicks = getMatchTotalTicks(match.addedTime);
  const tickInterval = getMatchTickInterval(match.addedTime);

  let currentTick = 0;

  activeMatchTimer = setInterval(() => {
    const currentState = window.gameState;
    const currentMatch = currentState?.campaign?.matches[matchIndex];

    if (!currentMatch || currentMatch.status !== "live") {
      clearInterval(activeMatchTimer);
      activeMatchTimer = null;
      return;
    }

    currentTick += 1;

    currentMatch.currentTick = currentTick;
    currentMatch.currentMinute = formatMatchMinute(
      currentTick,
      currentMatch.addedTime
    );

    revealEventsForTick(currentMatch, currentTick);

    renderCampaignPage();

    if (currentTick >= totalTicks) {
      finishCampaignMatch(matchIndex);
    }
  }, tickInterval);
}

/* ===================================================== */
/* FINALIZA A PARTIDA */
/* Fecha o card ao vivo e libera o próximo jogo */
/* ===================================================== */

function finishCampaignMatch(matchIndex) {
  const state = window.gameState;

  if (!state || !state.campaign) {
    return;
  }

  const match = state.campaign.matches[matchIndex];

  if (!match) {
    return;
  }

  if (activeMatchTimer) {
    clearInterval(activeMatchTimer);
    activeMatchTimer = null;
  }
match.status = "finished";
match.currentMinute = "FIM";

state.campaign.isMatchRunning = false;

/*
  Se foi o último jogo da fase de liga:
  - marca a fase como finalizada;
  - não tenta liberar outro jogo.
*/
const isLastMatch = matchIndex >= state.campaign.matches.length - 1;

if (isLastMatch) {
  state.campaign.leagueFinished = true;
} else {
  unlockNextCampaignMatch();
}

renderCampaignPage();
}

/* ===================================================== */
/* EXPÕE FUNÇÕES PARA OUTROS ARQUIVOS */
/* ===================================================== */

window.startCampaignMatch = startCampaignMatch;
window.finishCampaignMatch = finishCampaignMatch;
window.generateMatchEvents = generateMatchEvents;
window.calculateAttackPower = calculateAttackPower;
window.calculateDefensePower = calculateDefensePower;
