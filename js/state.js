/* ===================================================== */
/* STATE.JS - ESTADO GLOBAL DO JOGO */
/* ===================================================== */

/*
  Este objeto guarda tudo que muda durante o jogo:
  - formação escolhida;
  - estilo escolhido;
  - modo escolhido;
  - jogadores escolhidos;
  - layout atual do campo;
  - rodada atual do draft;
  - time final montado pelo jogador;
  - campanha da Champions.
*/

const gameState = {
  /* ===================================================== */
  /* CONFIGURAÇÕES DO DRAFT */
  /* ===================================================== */

  selectedFormation: "4-3-3",
  selectedStyle: "Equilibrado",

  /*
    Modo do Draft:
    - normal = modo atual, com todos os tipos de times;
    - elite  = modo especial, com pool mais forte.

    O modo começa destravado.
    Depois do primeiro ROLAR, ele será travado para evitar bugs.
  */
  selectedDraftMode: "normal",
  draftModeLocked: false,

  /* ===================================================== */
  /* JOGADORES DO DRAFT */
  /* ===================================================== */

  selectedPlayers: [],
  usedPlayers: [],

  pendingPlayer: null,
  pendingTeam: null,

  currentLayout: [],

  /* ===================================================== */
  /* CONTROLE DA RODADA ATUAL DO DRAFT */
  /* ===================================================== */

  currentRoundTeam: null,
  currentRoundPlayers: [],

  rerollsRemaining: 2,

  roundOpen: false,
  draftFinished: false,

  /* ===================================================== */
  /* TIME FINAL DO USUÁRIO */
  /* Será montado quando clicar em SIMULAR A UCL */
  /* ===================================================== */

  userTeam: null,

  /* ===================================================== */
  /* CAMPANHA DA CHAMPIONS */
  /* Guarda fase de liga, velocidade, jogos e classificação */
  /* ===================================================== */

  campaign: {
    phase: "league",

    speedMode: "normal",
    matchDuration: 24000,

    currentMatchIndex: 0,
    isMatchRunning: false,

    teams: [],
    matches: [],
    standings: []
  }
};

/* Deixa o estado acessível para todos os arquivos JS */
window.gameState = gameState;