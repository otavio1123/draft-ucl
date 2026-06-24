/* ===================================================== */
/* TIMER ATIVO DA PARTIDA */
/*
  Garante que só exista 1 jogo rodando por vez.
  Usado na fase de liga.
*/
/* ===================================================== */

let activeMatchTimer = null;


/* ===================================================== */
/* AJUSTE DE DIFICULDADE DO DRAFT */
/*
  Este bloco controla os bônus do time montado pelo usuário.

  Objetivo:
  - deixar o DRAFT competitivo;
  - evitar que o campeonato fique impossível;
  - não garantir vitória automática;
  - manter adversários fortes perigosos;
  - permitir ajuste diferente entre fase de liga, mata-mata e final.

  Importante:
  - só afeta jogos em que o DRAFT participa;
  - não altera database;
  - não altera sorteio;
  - não altera pênaltis;
  - não muda placares diretamente;
  - apenas ajusta o xG usado na simulação dos gols.

  Ajuste atual:
  - dificuldade média;
  - fase de liga mais disputada;
  - mata-mata difícil, mas vencível;
  - final pesada, sem ser impossível.
*/
/* ===================================================== */

const USER_DRAFT_TEAM_ID = "draft_user_team";


/* ===================================================== */
/* BÔNUS BASE DO DRAFT */
/*
  Usado como bônus principal do time do usuário.

  Ataque:
  - aumenta levemente o xG quando o DRAFT está atacando.

  Defesa:
  - reduz levemente o xG do adversário quando ele ataca contra o DRAFT.

  Ajuste atual:
  - menor que a versão fácil;
  - ainda recompensa um Draft bem montado;
  - evita que o time do usuário domine todos os jogos.
*/
/* ===================================================== */

const DRAFT_ATTACK_XG_BONUS = 0.13;
const DRAFT_DEFENSE_XG_REDUCTION = 0.09;


/* ===================================================== */
/* BÔNUS DE MANDO DO DRAFT NA FASE DE LIGA */
/*
  Controla a ajuda extra do DRAFT em jogos com mando.

  Ataque:
  - em casa o DRAFT recebe uma vantagem pequena;
  - fora de casa recebe uma vantagem bem menor.

  Defesa:
  - em casa o DRAFT protege um pouco melhor;
  - fora de casa fica mais vulnerável.

  Ajuste atual:
  - deixa a fase de liga mais difícil;
  - jogos fora de casa ficam mais perigosos;
  - evita campanha fácil demais antes do mata-mata.
*/
/* ===================================================== */

const DRAFT_HOME_ATTACK_BONUS = 0.065;
const DRAFT_AWAY_ATTACK_BONUS = 0.025;

const DRAFT_HOME_DEFENSE_BONUS = 0.045;
const DRAFT_AWAY_DEFENSE_BONUS = 0.020;


/* ===================================================== */
/* REDUÇÃO DO BÔNUS NO MATA-MATA */
/*
  A fase de liga usa 100% dos bônus acima.

  O mata-mata usa apenas uma parte desses bônus.
  Isso mantém playoffs, oitavas, quartas e semifinal mais difíceis.

  Exemplo:
  0.56 = usa 56% do bônus normal.

  Ajuste atual:
  - 0.45 era difícil demais;
  - 0.64 ficou fácil demais;
  - 0.56 fica no meio termo:
    ainda pesado, mas sem deixar o Draft injusto.
*/
/* ===================================================== */

const DRAFT_KNOCKOUT_BONUS_MULTIPLIER = 0.56;


/* ===================================================== */
/* BÔNUS ESPECIAL DA FINAL */
/*
  A final é jogo único e deve ser tratada como campo neutro.

  Por isso:
  - não usa bônus de casa;
  - não usa bônus de fora;
  - não usa o bônus cheio da liga;
  - recebe apenas uma ajuda fixa menor.

  Ataque:
  - DRAFT ganha +0.055 xG na final.

  Defesa:
  - adversário perde 0.050 xG quando ataca contra o DRAFT.

  Ajuste atual:
  - final continua difícil;
  - evita título automático;
  - ainda dá chance real para um Draft forte vencer.
*/
/* ===================================================== */

const DRAFT_FINAL_ATTACK_BONUS = 0.055;
const DRAFT_FINAL_DEFENSE_REDUCTION = 0.050;
/* ===================================================== */
/* DELAY DO FIM DA PARTIDA */
/*
  Pequena pausa visual no último minuto/acréscimo
  antes de finalizar a partida.
*/
/* ===================================================== */

const MATCH_END_DELAY = 1000;
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
/* MODIFICADOR OFENSIVO DO ESTILO */
/*
  Controla o quanto o estilo aumenta ou reduz
  o xG do próprio time quando ele ataca.

  Ofensivo:
  - cria mais chances;
  - recebe bônus maior de ataque.

  Equilibrado:
  - recebe um bônus pequeno;
  - representa controle sem exagero.

  Defensivo:
  - cria menos chances;
  - troca ataque por segurança.
*/
/* ===================================================== */

function getStyleAttackModifier(team) {
  if (!team || !team.style) return 0;

  if (team.style === "Ofensivo") return 0.18;
  if (team.style === "Equilibrado") return 0.03;
  if (team.style === "Defensivo") return -0.10;

  return 0;
}
/* ===================================================== */
/* MODIFICADOR DEFENSIVO DO ESTILO */
/* Ofensivo se expõe mais */
/* Defensivo fecha mais os espaços */
/* ===================================================== */

/* ===================================================== */
/* MODIFICADOR DEFENSIVO DO ESTILO */
/*
  Controla o quanto o estilo afeta o xG do adversário.

  Importante:
  - valor positivo = o time se expõe mais;
  - valor negativo = o time protege melhor.

  Ofensivo:
  - ataca mais;
  - deixa mais espaço para o adversário.

  Equilibrado:
  - protege um pouco melhor sem travar o ataque.

  Defensivo:
  - fecha mais os espaços;
  - reduz mais o xG do adversário.
*/
/* ===================================================== */

function getStyleDefenseExposureModifier(team) {
  if (!team || !team.style) return 0;

  if (team.style === "Ofensivo") return 0.13;
  if (team.style === "Equilibrado") return -0.02;
  if (team.style === "Defensivo") return -0.15;

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
/* IDENTIFICA O TIPO DE PARTIDA */
/*
  Define se o jogo atual é:
  - fase de liga;
  - mata-mata ida/volta;
  - final em jogo único.

  A fase de liga normalmente não possui propriedade "leg".

  No mata-mata:
  - "first"  = jogo de ida;
  - "second" = jogo de volta.

  Na final:
  - "final" = jogo único.
*/
/* ===================================================== */

function getMatchStageType(match) {
  if (!match) {
    return "league";
  }

  if (match.leg === "final") {
    return "final";
  }

  if (match.leg === "first" || match.leg === "second") {
    return "knockout";
  }

  return "league";
}
/* ===================================================== */
/* GOLS ESPERADOS */
/*
  Usa ataque do time contra defesa do adversário.

  Regras de bônus do DRAFT:
  - fase de liga: bônus completo;
  - mata-mata: bônus reduzido;
  - final: campo neutro, sem casa/fora e com bônus fixo menor.
*/
/* ===================================================== */

function calculateExpectedGoals(attackingTeam, defendingTeam, isHome, match = null) {
  const attackPower = calculateAttackPower(attackingTeam);
  const defensePower = calculateDefensePower(defendingTeam);

  const matchStageType = getMatchStageType(match);

  const powerDifference = attackPower - defensePower;

  let expectedGoals = 1.15;

  expectedGoals += powerDifference / 18;

  /*
    Mando geral da partida.

    Fase de liga e mata-mata:
    - time da casa recebe vantagem;
    - time visitante recebe pequena redução.

    Final:
    - jogo único em campo neutro;
    - não aplica vantagem de casa nem redução de visitante.
  */
  if (matchStageType !== "final") {
    if (isHome) {
      expectedGoals += 0.15;
    } else {
      expectedGoals -= 0.05;
    }
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
    Multiplicador do bônus do DRAFT.

    Liga:
    - usa 100% do bônus.

    Mata-mata:
    - usa bônus reduzido.

    Final:
    - não usa esse multiplicador,
      porque a final tem bônus fixo próprio.
  */
  const draftBonusMultiplier = matchStageType === "knockout"
    ? DRAFT_KNOCKOUT_BONUS_MULTIPLIER
    : 1;

  /*
    BÔNUS OFENSIVO DO DRAFT

    Final:
    - aplica apenas o bônus fixo da final;
    - não usa casa/fora.

    Liga e mata-mata:
    - aplica bônus base;
    - aplica bônus de casa ou fora;
    - no mata-mata esses bônus são reduzidos.
  */
  if (attackingTeam?.id === USER_DRAFT_TEAM_ID) {
    if (matchStageType === "final") {
      expectedGoals += DRAFT_FINAL_ATTACK_BONUS;
    } else {
      expectedGoals += DRAFT_ATTACK_XG_BONUS * draftBonusMultiplier;

      if (isHome) {
        expectedGoals += DRAFT_HOME_ATTACK_BONUS * draftBonusMultiplier;
      } else {
        expectedGoals += DRAFT_AWAY_ATTACK_BONUS * draftBonusMultiplier;
      }
    }
  }

  /*
    BÔNUS DEFENSIVO DO DRAFT

    Final:
    - reduz apenas o valor fixo da final no xG do adversário;
    - não usa casa/fora.

    Liga e mata-mata:
    - reduz o xG do adversário com bônus base;
    - aplica redução defensiva de casa ou fora;
    - no mata-mata esses bônus são reduzidos.

    Importante:
    isHome pertence ao time que está atacando.
    Então:
    - se o adversário ataca em casa, o DRAFT está fora;
    - se o adversário ataca fora, o DRAFT está em casa.
  */
  if (defendingTeam?.id === USER_DRAFT_TEAM_ID) {
    if (matchStageType === "final") {
      expectedGoals -= DRAFT_FINAL_DEFENSE_REDUCTION;
    } else {
      expectedGoals -= DRAFT_DEFENSE_XG_REDUCTION * draftBonusMultiplier;

      if (isHome) {
        expectedGoals -= DRAFT_AWAY_DEFENSE_BONUS * draftBonusMultiplier;
      } else {
        expectedGoals -= DRAFT_HOME_DEFENSE_BONUS * draftBonusMultiplier;
      }
    }
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
/*
  Converte o xG calculado em quantidade real de gols.

  Agora também recebe o objeto da partida.
  Isso permite que calculateExpectedGoals saiba se o jogo é:
  - fase de liga;
  - mata-mata;
  - final.

  Assim o bônus do DRAFT muda conforme a fase.
*/
/* ===================================================== */

function generateTeamGoals(attackingTeam, defendingTeam, isHome, match = null) {
  const expectedGoals = calculateExpectedGoals(
    attackingTeam,
    defendingTeam,
    isHome,
    match
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
  
const homeExpectedGoals = generateTeamGoals(homeTeam, awayTeam, true, match);
const awayExpectedGoals = generateTeamGoals(awayTeam, homeTeam, false, match);

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
  if (activeMatchTimer) {
    clearInterval(activeMatchTimer);
    activeMatchTimer = null;
  }

  if (currentMatch.isWaitingFinalDelay) {
    return;
  }

  currentMatch.isWaitingFinalDelay = true;

  setTimeout(() => {
    currentMatch.isWaitingFinalDelay = false;
    finishCampaignMatch(matchIndex);
  }, MATCH_END_DELAY);

  return;
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
