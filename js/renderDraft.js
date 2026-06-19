/* ===================================================== */
/* RENDERDRAFT.JS - TELA DE ESCALAÇÃO / DRAFT */
/* ===================================================== */

/*
  Este arquivo cuida apenas da parte visual do draft:
  - desenhar o campo;
  - mostrar os slots da formação;
  - trocar formação;
  - trocar estilo;
  - atualizar o box score visual.

  A lógica de sortear time e escolher jogador virá depois,
  no arquivo draftEngine.js.
*/
/* ===================================================== */
/* INICIALIZA A TELA DO DRAFT */
/* Essa função será chamada pelo main.js */
/* ===================================================== */
let isDrawingTeam = false; 

function initDraftPage() {
  if (window.draftPageStarted) {
    return;
  }

  window.draftPageStarted = true;

  console.log("initDraftPage rodou");

setupDraftInitialState();
setupFormationButtons();
setupStyleButtons();
setupDrawButtonPlaceholder();
setupSortButtons();
setupRerollButton();
setupFinishDraftButton();
  renderPitch();
  renderSquadList();
  updateHeaderLabels();
  updateBoxScore();
}
/* ===================================================== */
/* CRIA LAYOUT DO DRAFT COM VARIANTE MOBILE */
/*
  Objetivo:
  - no desktop, continua usando buildLayout();
  - no mobile, usa buildMobileLayout();
  - se buildMobileLayout não existir, usa buildLayout() como segurança;
  - não altera jogadores, posições aceitas, overall ou simulação.
*/
/* ===================================================== */

function createDraftLayout(formation, style) {
  const isMobile = window.matchMedia("(max-width: 480px)").matches;

  if (isMobile && typeof buildMobileLayout === "function") {
    return buildMobileLayout(formation, style);
  }

  return buildLayout(formation, style);
}
//* ===================================================== */
/* ESTADO INICIAL DA ESCALAÇÃO */
/*
  Segurança:
  - cria o layout correto para desktop ou mobile;
  - se mudar de mobile para desktop sem jogadores no campo,
    recria o layout no modo correto;
  - se já tiver jogador escalado, não apaga ninguém;
  - evita o layout mobile ficar preso no PC.
*/
/* ===================================================== */

function setupDraftInitialState() {
  const state = window.gameState;

  state.selectedFormation = state.selectedFormation || "4-3-3";
  state.selectedStyle = state.selectedStyle || "Equilibrado";

  state.selectedPlayers = state.selectedPlayers || [];
  state.usedPlayers = state.usedPlayers || [];

  /*
    Identifica se o layout atual deve ser mobile ou desktop.
  */
  const currentLayoutMode = window.matchMedia("(max-width: 480px)").matches
    ? "mobile"
    : "desktop";

  /*
    Confere se já existe layout.
  */
  const hasLayout =
    Array.isArray(state.currentLayout) &&
    state.currentLayout.length > 0;

  /*
    Confere se já existe jogador colocado no campo.
    Se tiver jogador, não recriamos o layout para não apagar escalação.
  */
  const hasPlacedPlayers =
    hasLayout &&
    state.currentLayout.some((slot) => slot && slot.player);

  /*
    Cria ou recria o layout somente quando for seguro:
    - se não existe layout;
    - ou se mudou de mobile/desktop e ainda não colocou jogador.
  */
  if (!hasLayout || (!hasPlacedPlayers && state.currentLayoutMode !== currentLayoutMode)) {
    state.currentLayout = createDraftLayout(
      state.selectedFormation,
      state.selectedStyle
    );

    state.currentLayoutMode = currentLayoutMode;
  }
}
/* ===================================================== */
/* ATIVA VISUALMENTE O BOTÃO CLICADO */
/* ===================================================== */

function setActiveButton(buttons, activeButton) {
  if (!buttons || !activeButton) {
    return;
  }

  buttons.forEach((button) => {
    button.classList.remove("active");
  });

  activeButton.classList.add("active");
}
function setActiveButton(buttons, activeButton) {
  if (!buttons || !activeButton) {
    return;
  }

  buttons.forEach((button) => {
    button.classList.remove("active");
  });

  activeButton.classList.add("active");
}


/* ===================================================== */
/* BOTÕES DE FORMAÇÃO */
/* ===================================================== */

function setupFormationButtons() {
  const buttons = document.querySelectorAll(".formation-btn");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const formation = button.dataset.formation;

      if (!formation) return;

      gameState.selectedFormation = formation;

      // Sempre que muda formação, por enquanto limpa o campo.
      // Depois podemos criar aviso antes de limpar.
      gameState.selectedPlayers = [];
gameState.currentLayout = createDraftLayout(
  gameState.selectedFormation,
  gameState.selectedStyle
);

      setActiveButton(buttons, button);
      renderPitch();
      renderSquadList();
      updateHeaderLabels();
      updateBoxScore();
    });
  });
}

/* ===================================================== */
/* BOTÕES DE ESTILO */
/* ===================================================== */

function setupStyleButtons() {
  const buttons = document.querySelectorAll(".style-btn");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const style = button.dataset.style;

      if (!style) return;

      gameState.selectedStyle = style;

      // Quando muda estilo, a formação se reposiciona.
      // Por enquanto também limpa o campo para evitar bagunça.
      gameState.selectedPlayers = [];
 gameState.currentLayout = createDraftLayout(
  gameState.selectedFormation,
  gameState.selectedStyle
);

      setActiveButton(buttons, button);
      renderPitch();
      renderSquadList();
      updateHeaderLabels();
      updateBoxScore();
    });
  });
}

/* ===================================================== */
/* BOTÃO DE SORTEIO COM ANIMAÇÃO */
/* ===================================================== */

function setupDrawButtonPlaceholder() {
  const drawButton = document.getElementById("drawButton");

  if (!drawButton) return;

  drawButton.addEventListener("click", () => {
    animateTeamDraw();
  });
}
/* ===================================================== */
/* ATIVA BOTÃO CLICADO */
/* ===================================================== */

function animateTeamDraw() {
  if (isDrawingTeam) {
    return;
  }

  const state = window.gameState;

  if (!state) {
    return;
  }

  if (state.roundOpen) {
    alert("Escolha um jogador antes de sortear outro time.");
    return;
  }

  const database = getAvailableTeamsForDraft();
  const drawButton = document.getElementById("drawButton");
  const drawResult = document.getElementById("drawResult");
  const playersList = document.getElementById("playersList");
  const playersTools = document.getElementById("playersTools");
  const draftPage = document.getElementById("draftPage");

if (database.length === 0) {
  alert("Banco de times vazio.");
  return;
}

isDrawingTeam = true;

state.roundOpen = true;
state.pendingPlayer = null;
state.pendingTeam = null;

  updateRerollText();

  if (draftPage) {
    draftPage.classList.add("draft-started");
    draftPage.classList.remove("round-finished");

    console.log("DRAFT PAGE AO ROLAR:", draftPage.className);
  }

  /* Enquanto está sorteando */
  if (drawButton) {
    drawButton.disabled = true;

    drawButton.innerHTML = `
      <span class="roll-text">ROLANDO</span>
      <span class="roll-dice">🎲</span>
    `;
  }

if (playersList) {
  playersList.innerHTML = "";
}

  if (playersTools) {
    playersTools.style.display = "";
  }

  const animationInterval = setInterval(() => {
    const randomIndex = Math.floor(Math.random() * database.length);
    const previewTeam = database[randomIndex];

    if (drawResult) {
      drawResult.innerHTML = `
        <small>DADO ROLANDO...</small>
        <h2>${previewTeam.club}</h2>
        <p>${previewTeam.season}</p>
      `;
    }
  }, 120);

  setTimeout(() => {
    clearInterval(animationInterval);

    const finalTeam = drawRandomTeam();

    if (finalTeam) {
      if (draftPage) {
        draftPage.classList.add("draft-started");
        draftPage.classList.remove("round-finished");

        console.log("DRAFT PAGE TIME SAIU:", draftPage.className);
      }

      state.currentRoundTeam = finalTeam;

      renderDrawnTeam(finalTeam);
      renderPlayersList(finalTeam);
    }

    /* Depois que saiu o time */
    if (drawButton) {
      drawButton.disabled = true;

      drawButton.innerHTML = `
        <span class="roll-text">ROLAR</span>
        <span class="roll-dice">🎲</span>
      `;
    }

    isDrawingTeam = false;
  }, 3000);
}
/* ===================================================== */
/* ATUALIZA TEXTO DO CABEÇALHO */
/* ===================================================== */

function updateHeaderLabels() {
  const formationLabel = document.getElementById("formationLabel");
  const styleLabel = document.getElementById("styleLabel");

  if (formationLabel) {
    formationLabel.textContent = gameState.selectedFormation;
  }

  if (styleLabel) {
    styleLabel.textContent = gameState.selectedStyle;
  }
}

/* ===================================================== */
/* DESENHA O CAMPO */
/* ===================================================== */

function renderPitch() {
  const pitch = document.getElementById("pitch");

  if (!pitch) return;

  pitch.innerHTML = "";

const layout = window.gameState.currentLayout || [];
  layout.forEach((slot, index) => {
    const slotElement = document.createElement("button");

    slotElement.className = "pitch-slot";
    slotElement.type = "button";

    slotElement.dataset.index = index;
    slotElement.dataset.slot = slot.code;

    slotElement.style.left = `${slot.x}%`;
    slotElement.style.top = `${slot.y}%`;
const pendingPlayer = window.gameState.pendingPlayer;

const canUseSlot =
  pendingPlayer &&
  !slot.player &&
  canPlayerFitSlot(pendingPlayer, slot);

if (canUseSlot) {
  slotElement.classList.add("available-slot");
}
    if (slot.player) {
      slotElement.classList.add("filled");

      slotElement.innerHTML = `
        <div class="pitch-player-card">
          <div class="pitch-rating-ball">${slot.player.rating}</div>
          <div class="pitch-player-name">${getShortPlayerName(slot.player.name)}</div>
        </div>
      `;
    } else {
      slotElement.innerHTML = `
        <span class="slot-empty">${slot.label}</span>
      `;
    }

    slotElement.addEventListener("click", () => {
      handlePitchSlotClick(index);
    });

    pitch.appendChild(slotElement);
  });
}

/* ===================================================== */
/* CLIQUE EM UM SLOT DO CAMPO */
/* Por enquanto só mostra o slot clicado.
   Depois vamos usar para colocar o jogador escolhido.
*/
/* ===================================================== */
/* ===================================================== */
/* CLIQUE NO SLOT DO CAMPO */
/* Coloca o jogador selecionado na posição permitida */
/* ===================================================== */

function handlePitchSlotClick(slotIndex) {
  const state = window.gameState;

  if (!state) return;

  const slot = state.currentLayout[slotIndex];
  const player = state.pendingPlayer;
  const team = state.pendingTeam;

  if (!slot) return;

  if (!player) {
    alert("Escolha um jogador primeiro.");
    return;
  }

  if (slot.player) {
    alert("Essa posição já está ocupada.");
    return;
  }

if (!canPlayerFitSlot(player, slot)) {
  alert(`${player.name} não encaixa em ${slot.code}.`);
  return;
}

  const selectedPlayer = {
    ...player,
    selectedPosition: slot.code,
    teamClub: team ? team.club : "",
    teamSeason: team ? team.season : ""
  };

/* Coloca no campo */
state.currentLayout[slotIndex].player = selectedPlayer;

/* Salva na escalação apenas uma vez */
state.selectedPlayers.push(selectedPlayer);
/* Marca o jogador para não aparecer mais em outros sorteios */
markPlayerAsUsed(selectedPlayer);

/* Fecha a rodada atual */
state.roundOpen = false;
state.currentRoundTeam = null;
state.currentRoundPlayers = [];

/* Limpa seleção pendente */
state.pendingPlayer = null;
state.pendingTeam = null;

/* Atualiza o card da esquerda */
renderChosenPlayerCard(selectedPlayer, team, slot.code);

/* Limpa a lista da rodada */
clearPlayerRoundList();

/* Atualiza a tela */
renderPitch();
renderSquadList();
updateHeaderLabels();
updateBoxScore();
checkDraftCompletion();

/*
  MOBILE:
  Depois de colocar o jogador no campo,
  sobe para o painel de sorteio para rolar novamente.
*/
if (window.matchMedia("(max-width: 480px)").matches) {
  requestAnimationFrame(() => {
    document.querySelector(".draw-panel")?.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  });
}
}
/* ===================================================== */
/* MOSTRA O JOGADOR ESCOLHIDO NO CARD DO SORTEIO */
/* ===================================================== */

function renderChosenPlayerCard(player, team, position) {
  const drawResult = document.getElementById("drawResult");

  if (!drawResult) return;

  const teamName = team ? `${team.club} ${team.season}` : "";

  drawResult.innerHTML = `
    <small>JOGADOR ESCOLHIDO</small>
    <h2>${player.name}</h2>
    <p>${position} · ${teamName}</p>
  `;
}
/* ===================================================== */
/* LIMPA A LISTA APÓS COLOCAR O JOGADOR NO CAMPO */
/* ===================================================== */

/* ===================================================== */
/* LIMPA A LISTA APÓS COLOCAR O JOGADOR NO CAMPO */
/* Fecha o painel da rodada e libera o próximo sorteio */
/* ou mostra o botão final se chegar em 11/11. */
/* ===================================================== */

function clearPlayerRoundList() {
  const playersList = document.getElementById("playersList");
  const playersTools = document.getElementById("playersTools");
  const drawButton = document.getElementById("drawButton");
  const draftPage = document.getElementById("draftPage");

  if (draftPage) {
    draftPage.classList.add("round-finished");
  }

  if (playersTools) {
    playersTools.style.display = "none";
  }

  if (playersList) {
    playersList.innerHTML = "";
  }

  /*
    Se o draft chegou em 11/11:
    - troca o card;
    - esconde ROLAR;
    - mostra SIMULAR A UCL;
    - para a função aqui.
  */
  const draftComplete = checkDraftCompletion();

  if (draftComplete) {
    return;
  }

  /*
    Se ainda não chegou em 11/11,
    libera o botão ROLAR para a próxima rodada.
  */
  if (drawButton) {
    drawButton.disabled = false;
    drawButton.classList.remove("hidden");

    drawButton.innerHTML = `
      <span class="roll-text">ROLAR</span>
      <span class="roll-dice">🎲</span>
    `;
  }
}
/* ===================================================== */
/* LISTA DA ESCALAÇÃO NO BOX SCORE */
/* Mostra posição, nome e over do jogador */
/* ===================================================== */

function renderSquadList() {
  const squadList = document.getElementById("squadList");

  if (!squadList) return;

  const layout = window.gameState.currentLayout || [];

  squadList.innerHTML = "";

  layout.forEach((slot) => {
    const row = document.createElement("div");

    row.className = "squad-row";

    const playerName = slot.player
      ? getShortPlayerName(slot.player.name)
      : "—";

    const playerRating = slot.player
      ? slot.player.rating
      : "—";

    row.innerHTML = `
      <span class="squad-position">${slot.label}</span>
      <strong class="squad-player-name">${playerName}</strong>
      <b class="squad-player-rating">${playerRating}</b>
    `;

    squadList.appendChild(row);
  });
}
/* ===================================================== */
/* ATUALIZA BOX SCORE */
/* Por enquanto fica vazio, mas já deixa a base pronta.
*/
/* ===================================================== */
function updateBoxScore() {
  const state = window.gameState;

  const teamCount = document.getElementById("teamCount");
  const overallScore = document.getElementById("overallScore");

  const attackOverall = document.getElementById("attackOverall");
  const midOverall = document.getElementById("midOverall");
  const defenseOverall = document.getElementById("defenseOverall");

  const layout = state.currentLayout || [];

  const filledSlots = layout.filter((slot) => slot.player);
  const selectedCount = filledSlots.length;

  if (teamCount) {
    teamCount.textContent = `${selectedCount}/11`;
  }

  /* OVERALL GERAL DO TIME */
  const teamOverall = calculateAverageRating(filledSlots);

  if (overallScore) {
    overallScore.textContent = teamOverall || "—";
  }

  /* SETORES */
  const attackSlots = filledSlots.filter((slot) => {
    return ["PE", "CA", "PD", "ATA"].includes(slot.code);
  });

  const midfieldSlots = filledSlots.filter((slot) => {
    return ["MEI", "MC", "VOL", "ME", "MD", "ALA"].includes(slot.code);
  });

  const defenseSlots = filledSlots.filter((slot) => {
    return ["LE", "LD", "ZAG", "GOL"].includes(slot.code);
  });

  if (attackOverall) {
    attackOverall.textContent = calculateAverageRating(attackSlots) || "—";
  }

  if (midOverall) {
    midOverall.textContent = calculateAverageRating(midfieldSlots) || "—";
  }

  if (defenseOverall) {
    defenseOverall.textContent = calculateAverageRating(defenseSlots) || "—";
  }
}
/* ===================================================== */
/* CALCULA MÉDIA DE OVERALL */
/* ===================================================== */

function calculateAverageRating(slots) {
  if (!Array.isArray(slots) || slots.length === 0) {
    return null;
  }

  const total = slots.reduce((sum, slot) => {
    return sum + Number(slot.player.rating || 0);
  }, 0);

  return Math.round(total / slots.length);
}
/* ===================================================== */
/* INICIALIZAÇÃO DE SEGURANÇA */
/* Garante que a tela do draft inicia mesmo sem main.js */
/* ===================================================== */

document.addEventListener("DOMContentLoaded", () => {
  if (document.querySelector(".draft-page")) {
    initDraftPage();
  }
});
/* ===================================================== */
/* MOSTRA O TIME SORTEADO NO CARD */
/* ===================================================== */

function renderDrawnTeam(team) {
  const drawResult = document.getElementById("drawResult");

  if (!drawResult) return;

  drawResult.innerHTML = `
    <small>SAIU</small>
    <h2>${team.club}</h2>
    <p>${team.season}</p>
  `;
}

/* ===================================================== */
/* MOSTRA OS JOGADORES DO TIME SORTEADO */
/* Aceita lista normal ou lista ordenada */
/* ===================================================== */

function renderPlayersList(team, customPlayers = null) {
  const playersList = document.getElementById("playersList");
  const state = window.gameState;

  if (!playersList || !state) return;

  state.currentRoundTeam = team;

  const players = customPlayers || getAvailablePlayersFromTeam(team);

  /*
    Guarda a ordem original da rodada.
    Só atualiza quando NÃO for lista ordenada.
  */
  if (!customPlayers) {
    state.currentRoundPlayers = [...players];
  }

  if (players.length === 0) {
    playersList.innerHTML = `
      <div class="empty-player-message">
        Esse time não possui jogadores disponíveis.
      </div>
    `;

    return;
  }

  playersList.innerHTML = "";

  players.forEach((player) => {
    const playerButton = document.createElement("button");

    playerButton.className = "player-option";

    if (window.gameState.pendingPlayer === player) {
      playerButton.classList.add("selected-player");
    }

    playerButton.type = "button";

    const playerPositions = getPlayerPositions(player).join("/");

    playerButton.innerHTML = `
      <div class="player-info">
        <strong>${player.name}</strong>
        <span>${playerPositions}</span>
      </div>

      <div class="player-action">
        <b>${player.rating}</b>
        <em>+</em>
      </div>
    `;

    playerButton.addEventListener("click", () => {
      selectPlayerForField(player, team);
    });

    playersList.appendChild(playerButton);
  });
}

/* ===================================================== */
/* BOTÕES DE ORDENAR JOGADORES */
/* ===================================================== */

function setupSortButtons() {
  const sortButtons = document.querySelectorAll("[data-sort]");

  sortButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const sortType = button.dataset.sort;
      const state = window.gameState;

      const team = state.currentRoundTeam;

      if (!team) return;

      const originalPlayers = state.currentRoundPlayers || [];
      let sortedPlayers = [...originalPlayers];

      if (sortType === "rating-desc") {
        sortedPlayers.sort((a, b) => b.rating - a.rating);
      }

      if (sortType === "rating-asc") {
        sortedPlayers.sort((a, b) => a.rating - b.rating);
      }

      if (sortType === "name-asc") {
        sortedPlayers.sort((a, b) => {
          return a.name.localeCompare(b.name, "pt-BR");
        });
      }

      if (sortType === "default") {
        sortedPlayers = [...originalPlayers];
      }

      renderPlayersList(team, sortedPlayers);
    });
  });
}
/* ===================================================== */
/* BOTÃO OUTRA SELEÇÃO */
/* Chama animação de re-sorteio */
/* ===================================================== */

function setupRerollButton() {
  const rerollButton = document.getElementById("rerollButton");

  if (!rerollButton) return;

  rerollButton.addEventListener("click", () => {
    animateTeamReroll();
  });
}
/* ===================================================== */
/* ATUALIZA TEXTO DO RE-SORTEIO */
/* ===================================================== */

function updateRerollText() {
  const state = window.gameState;
  const rerollText = document.getElementById("rerollText");
  const rerollButton = document.getElementById("rerollButton");

  if (!state || !rerollText) return;

  const remaining = state.rerollsRemaining;
  const label = remaining === 1 ? "1 RESTANTE" : `${remaining} RESTANTES`;

  rerollText.textContent = `NÃO CURTIU? RE-SORTEIE · ${label}`;

  if (rerollButton) {
    rerollButton.disabled = remaining <= 0 || !state.roundOpen;
  }
}

/* ===================================================== */
/* BOTÃO SIMULAR A UCL */
/* Quando o draft estiver completo, inicia a campanha */
/* ===================================================== */

function setupFinishDraftButton() {
  const finishDraftButton = document.getElementById("finishDraftButton");

  if (!finishDraftButton) {
    return;
  }

  finishDraftButton.addEventListener("click", () => {
    const state = window.gameState;

    if (!state || !state.draftFinished) {
      alert("Complete o draft antes de iniciar a campanha.");
      return;
    }

    if (typeof window.initCampaignFromDraft !== "function") {
      alert("A tela da campanha ainda não foi carregada.");
      return;
    }

    window.initCampaignFromDraft();
  });
}
/* ===================================================== */
/* ANIMAÇÃO DO RE-SORTEIO */
/* Usa a mesma ideia do botão ROLAR */
/* ===================================================== */

function animateTeamReroll() {
  const state = window.gameState;

  if (!state || isDrawingTeam) {
    return;
  }

  if (!state.roundOpen) {
    alert("Você precisa sortear um time primeiro.");
    return;
  }

  if (state.rerollsRemaining <= 0) {
    alert("Você não tem mais re-sorteios nesta rodada.");
    return;
  }

  const availableTeams = getAvailableTeamsForDraft();

  if (availableTeams.length === 0) {
    alert("Não há mais times disponíveis para sortear.");
    return;
  }

  const currentTeam = state.currentRoundTeam;

  let rerollPool = availableTeams;

  if (currentTeam && availableTeams.length > 1) {
    rerollPool = availableTeams.filter((team) => {
      return team.id !== currentTeam.id;
    });
  }

  if (rerollPool.length === 0) {
    alert("Não há outro time disponível para re-sortear.");
    return;
  }

  const drawResult = document.getElementById("drawResult");
  const playersList = document.getElementById("playersList");
  const rerollButton = document.getElementById("rerollButton");
  const drawButton = document.getElementById("drawButton");
  const playersTools = document.getElementById("playersTools");

  isDrawingTeam = true;

  state.rerollsRemaining -= 1;
  state.pendingPlayer = null;
  state.pendingTeam = null;

  updateRerollText();

  if (rerollButton) {
    rerollButton.disabled = true;

    rerollButton.innerHTML = `
      <span class="roll-text">ROLANDO</span>
      <span class="roll-dice">🎲</span>
    `;
  }

if (drawButton) {
  drawButton.disabled = true;

  drawButton.innerHTML = `
    <span class="roll-text">ROLANDO</span>
    <span class="roll-dice">🎲</span>
  `;
}

if (playersTools) {
  playersTools.style.display = "";
}

if (playersList) {
  playersList.innerHTML = "";
}

  const animationInterval = setInterval(() => {
    const randomIndex = Math.floor(Math.random() * rerollPool.length);
    const previewTeam = rerollPool[randomIndex];

    if (drawResult) {
      drawResult.innerHTML = `
        <small>RE-SORTEANDO...</small>
        <h2>${previewTeam.club}</h2>
        <p>${previewTeam.season}</p>
      `;
    }
  }, 120);

  setTimeout(() => {
    clearInterval(animationInterval);

    const randomIndex = Math.floor(Math.random() * rerollPool.length);
    const newTeam = rerollPool[randomIndex];

    state.currentDrawnTeam = newTeam;
    state.currentRoundTeam = newTeam;

    renderDrawnTeam(newTeam);
    renderPlayersList(newTeam);
    renderPitch();
    updateRerollText();

    if (rerollButton) {
      rerollButton.innerHTML = "↻ OUTRO TIME";
      rerollButton.disabled = state.rerollsRemaining <= 0;
    }

if (drawButton) {
  drawButton.disabled = true;

  drawButton.innerHTML = `
    <span class="roll-text">ROLANDO</span>
    <span class="roll-dice">🎲</span>
  `;
}
    isDrawingTeam = false;
  }, 3000);
}
/* ===================================================== */
/* SELECIONA UM JOGADOR PARA ESCOLHER A POSIÇÃO */
/* ===================================================== */

function selectPlayerForField(player, team) {
  const gameState = window.gameState;

  if (!gameState || !player) return;

  /*
    Segurança:
    guarda o jogador escolhido como pendente.
    Ele ainda NÃO entra no time aqui.
    Só entra quando o usuário clicar em uma posição do campo.
  */
  gameState.pendingPlayer = player;
  gameState.pendingTeam = team;

  /*
    Atualiza o card da esquerda para mostrar:
    ESCOLHA A POSIÇÃO
  */
  renderPlayerSelectionCard(player, team);

  /*
    Re-renderiza a lista para marcar visualmente
    qual jogador está selecionado.
  */
  renderPlayersList(team);

  /*
    Re-renderiza o campo para destacar apenas
    as posições onde esse jogador pode entrar.
  */
  renderPitch();

  /*
    MOBILE:
    Depois de selecionar o jogador, desce para o campo.
    Assim fica claro que o próximo passo é escolher a posição.
  */
  if (window.matchMedia("(max-width: 480px)").matches) {
    requestAnimationFrame(() => {
      document.querySelector(".center-panel")?.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    });
  }
}
/* ===================================================== */
/* MUDA O CARD DO SORTEIO PARA "ESCOLHA A POSIÇÃO" */
/* ===================================================== */

function renderPlayerSelectionCard(player, team) {
  const drawResult = document.getElementById("drawResult");

  if (!drawResult) return;

  const positions = getPlayerPositions(player).join(" / ");
  const teamName = team ? `${team.club} ${team.season}` : "";

  drawResult.innerHTML = `
    <small>ESCOLHA A POSIÇÃO</small>
    <h2>${player.name}</h2>
    <p>${positions} · ${teamName}</p>
  `;
}
/* ===================================================== */
/* VERIFICA SE O DRAFT FOI COMPLETADO */
/* Quando chegar em 11/11:
   - troca o card para ESCALAÇÃO COMPLETA;
   - esconde o botão ROLAR;
   - mostra o botão SIMULAR A UCL.
*/
/* ===================================================== */

function checkDraftCompletion() {
  const state = window.gameState;

  if (!state || !Array.isArray(state.currentLayout)) {
    return false;
  }

  const drawResult = document.getElementById("drawResult");
  const drawButton = document.getElementById("drawButton");
  const finishDraftButton = document.getElementById("finishDraftButton");

  const filledSlots = state.currentLayout.filter((slot) => {
    return slot.player;
  });

  const draftComplete = filledSlots.length >= 11;

  state.draftFinished = draftComplete;

  if (!draftComplete) {
    if (drawButton) {
      drawButton.classList.remove("hidden");
      drawButton.disabled = false;
    }

    if (finishDraftButton) {
      finishDraftButton.classList.add("hidden");
    }

    return false;
  }

  /* Card final do draft */
  if (drawResult) {
    drawResult.innerHTML = `
      <div class="draft-complete-card">
        <small>ESCALAÇÃO COMPLETA</small>

        <div class="draft-complete-count">
          <strong>11</strong><span>/11</span>
        </div>

        <p>Seu time está pronto para disputar a Champions.</p>
      </div>
    `;
  }

  /* Esconde o botão ROLAR */
  if (drawButton) {
    drawButton.classList.add("hidden");
    drawButton.disabled = true;
  }

  /* Mostra o botão SIMULAR A UCL */
  if (finishDraftButton) {
    finishDraftButton.classList.remove("hidden");
    finishDraftButton.classList.add("start-ucl-btn");
    finishDraftButton.innerHTML = `<span>SIMULAR A UCL</span><b>→</b>`;
  }

  return true;
}
