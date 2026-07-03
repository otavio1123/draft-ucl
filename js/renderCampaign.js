/* ===================================================== */
/* RENDERCAMPAIGN.JS - RENDERIZAÇÃO DA CAMPANHA */
/* ===================================================== */

/*
  Este arquivo desenha a tela da campanha:
  - cabeçalho A CAMPANHA;
  - seletor NORMAL/RÁPIDO;
  - lista dos 8 jogos da fase de liga;
  - botão REVELAR liberado jogo por jogo.
*/

/* ===================================================== */
/* CRIA OU PEGA A TELA DA CAMPANHA */
/* ===================================================== */

function getCampaignPageElement() {
  let campaignPage = document.getElementById("campaignPage");

  if (campaignPage) {
    return campaignPage;
  }

  campaignPage = document.createElement("main");
  campaignPage.id = "campaignPage";
  campaignPage.className = "campaign-page hidden";

  const draftPage = document.getElementById("draftPage");

  if (draftPage && draftPage.parentNode) {
    draftPage.parentNode.insertBefore(campaignPage, draftPage.nextSibling);
  } else {
    document.body.appendChild(campaignPage);
  }

  return campaignPage;
}

/* ===================================================== */
/* INICIA A CAMPANHA A PARTIR DO DRAFT */
/* Chamada pelo botão SIMULAR A UCL */
/* ===================================================== */

function initCampaignFromDraft() {
  const campaign = startLeagueCampaign();

  if (!campaign) {
    return;
  }

  const draftPage = document.getElementById("draftPage");
  const campaignPage = getCampaignPageElement();

  if (draftPage) {
    draftPage.classList.add("hidden");
  }

  if (campaignPage) {
    campaignPage.classList.remove("hidden");
  }

  renderCampaignPage();
}

/* ===================================================== */
/* RENDERIZA A TELA PRINCIPAL DA CAMPANHA */
/* ===================================================== */

function renderCampaignPage() {
  const state = window.gameState;
  const campaignPage = getCampaignPageElement();

  if (!state || !state.campaign || !campaignPage) {
    return;
  }

  campaignPage.innerHTML = `
    <section class="campaign-header">
      <div class="campaign-title-block">
        <small>DRAFT UCL</small>
        <h1>A CAMPANHA</h1>
        <p>Fase de Liga · 8 jogos</p>
      </div>

      ${renderCampaignSpeedSelector()}
    </section>

    <section class="campaign-summary">
      <div class="campaign-summary-card">
        <small>TIME</small>
        <h2>DRAFT</h2>
        <p>
          Formação: ${state.userTeam?.formation || state.selectedFormation}
          · Estilo: ${state.userTeam?.style || state.selectedStyle}
        </p>
      </div>

      <div class="campaign-summary-card">
        <small>FASE</small>
        <h2>LIGA</h2>
        <p>Simule um jogo por vez para avançar na campanha.</p>
      </div>
    </section>

    <section class="league-matches-section">
      <div class="section-title">
        <small>CALENDÁRIO</small>
        <h2>8 JOGOS DA FASE DE LIGA</h2>
      </div>

   <div class="league-matches-list">
  ${renderLeagueMatches()}
</div>

${renderLeagueFinishButton()}
    </section>
  `;

  setupCampaignButtons();
}

/* ===================================================== */
/* RENDERIZA O SELETOR NORMAL / RÁPIDO */
/* ===================================================== */

function renderCampaignSpeedSelector() {
  const state = window.gameState;
  const speedMode = state?.campaign?.speedMode || "normal";
  const isRunning = state?.campaign?.isMatchRunning || false;

  return `
    <div class="campaign-speed-box">
      <span>Modo de jogo:</span>

      <div class="campaign-speed-buttons">
        <button
          class="campaign-speed-btn ${speedMode === "normal" ? "active" : ""}"
          data-speed-mode="normal"
          type="button"
          ${isRunning ? "disabled" : ""}
        >
          NORMAL
        </button>

        <button
          class="campaign-speed-btn ${speedMode === "fast" ? "active" : ""}"
          data-speed-mode="fast"
          type="button"
          ${isRunning ? "disabled" : ""}
        >
          RÁPIDO
        </button>
      </div>
    </div>
  `;
}

/* ===================================================== */
/* RENDERIZA TODOS OS JOGOS */
/* ===================================================== */

function renderLeagueMatches() {
  const state = window.gameState;

  if (!state || !state.campaign || !Array.isArray(state.campaign.matches)) {
    return "";
  }

  return state.campaign.matches
    .map((match, index) => {
      return renderLeagueMatchCard(match, index);
    })
    .join("");
}
/* ===================================================== */
/* BOTÃO VER CLASSIFICAÇÃO */
/* Aparece somente depois que os 8 jogos terminam */
/* ===================================================== */

function renderLeagueFinishButton() {
  const state = window.gameState;

  if (!state || !state.campaign || !state.campaign.leagueFinished) {
    return "";
  }

  return `
    <div class="league-finish-actions">
      <button class="view-standings-btn" type="button">
        VER CLASSIFICAÇÃO →
      </button>
    </div>
  `;
}
/* ===================================================== */
/* RENDERIZA UM CARD DE JOGO */
/* ===================================================== */

function renderLeagueMatchCard(match, index) {
  const statusText = getMatchStatusText(match);
  const resultClass = getDraftMatchResult(match);

  const actionArea = renderMatchActionArea(match, index);
  const liveArea = renderMatchLiveArea(match);
  const detailsArea = renderMatchDetailsArea(match);

return `
  <article class="league-match-card ${match.status} ${resultClass} ${match.expanded ? "expanded" : ""}" data-match-index="${index}">
      <div class="match-card-top">
        <small>JOGO ${match.matchNumber}</small>
        <span>${statusText}</span>
      </div>

      <div class="match-teams-line">
        ${renderTeamName(match.homeTeam)}
        <strong class="match-versus">x</strong>
        ${renderTeamName(match.awayTeam)}
      </div>

      ${liveArea}

      ${actionArea}

      ${detailsArea}
    </article>
  `;
}

/* ===================================================== */
/* RENDERIZA NOME DO TIME */
/* DRAFT aparece sozinho */
/* Adversário aparece com clube + temporada menor */
/* ===================================================== */

function renderTeamName(team) {
  if (!team) {
    return `<span class="team-name">Time</span>`;
  }

  if (team.id === "draft_user_team") {
    return `
      <span class="team-name draft-team-name">
        DRAFT
      </span>
    `;
  }

  return `
    <span class="team-name">
      ${team.club}
      <small>${team.season}</small>
    </span>
  `;
}

/* ===================================================== */
/* TEXTO DO STATUS DO JOGO */
/* ===================================================== */

function getMatchStatusText(match) {
  if (!match) return "";

  if (match.status === "live") {
    return "EM ANDAMENTO";
  }

  if (match.status === "finished") {
    return "FINALIZADO";
  }

  if (match.unlocked) {
    return "LIBERADO";
  }

  return "BLOQUEADO";
}
/* ===================================================== */
/* RESULTADO DO DRAFT NO JOGO */
/* Retorna:
   - win  = vitória do DRAFT
   - draw = empate
   - loss = derrota do DRAFT
*/
/* ===================================================== */

function getDraftMatchResult(match) {
  if (!match || match.status !== "finished") {
    return "";
  }

  const draftId = "draft_user_team";

  const draftIsHome = match.homeTeam?.id === draftId;
  const draftIsAway = match.awayTeam?.id === draftId;

  if (!draftIsHome && !draftIsAway) {
    return "";
  }

  const draftScore = draftIsHome ? match.homeScore : match.awayScore;
  const opponentScore = draftIsHome ? match.awayScore : match.homeScore;

  if (draftScore > opponentScore) {
    return "win";
  }

  if (draftScore < opponentScore) {
    return "loss";
  }

  return "draw";
}
/* ===================================================== */
/* ÁREA DO BOTÃO REVELAR */
/* ===================================================== */

function renderMatchActionArea(match, index) {
  if (!match) return "";
if (match.status === "finished") {
  const resultClass = getDraftMatchResult(match);

  return `
    <button
      class="finished-score-btn ${resultClass}"
      data-toggle-match="${index}"
      type="button"
    >
      ${match.homeScore} - ${match.awayScore}
    </button>
  `;
}

  if (match.status === "live") {
    return "";
  }

  if (match.unlocked) {
    return `
      <button
        class="reveal-match-btn"
        data-reveal-match="${index}"
        type="button"
      >
        REVELAR →
      </button>
    `;
  }

  return `
    <div class="locked-match-label">
      —
    </div>
  `;
}

/* ===================================================== */
/* ÁREA AO VIVO */
/* Por enquanto fica pronta para o cronômetro */
/* Depois o simulationEngine vai atualizar esses elementos */
/* ===================================================== */

function renderMatchLiveArea(match) {
  if (!match || match.status !== "live") {
    return "";
  }

  return `
    <div class="match-live-area">
      <div class="match-clock" id="matchClock-${match.id}">
        ${match.currentMinute || "0'"}
      </div>

      <div class="match-score" id="matchScore-${match.id}">
        ${match.homeScore} - ${match.awayScore}
      </div>

      <div class="match-events-list" id="matchEvents-${match.id}">
        ${renderShownEvents(match)}
      </div>
    </div>
  `;
}

/* ===================================================== */
/* EVENTOS MOSTRADOS DURANTE O JOGO */
/* Gols do DRAFT e do adversário terão classes diferentes */
/* ===================================================== */

function renderShownEvents(match) {
  if (!match || !Array.isArray(match.shownEvents)) {
    return "";
  }

  return match.shownEvents
    .map((event) => {
      const goalClass = event.teamId === "draft_user_team"
        ? "goal-for"
        : "goal-against";

      const assistText = event.assist
        ? `<small>Ass: ${event.assist}</small>`
        : "";

      return `
        <div class="match-event-row ${goalClass}">
          <span>${event.displayMinute}</span>
          <strong>${event.scorer}</strong>
          ${assistText}
        </div>
      `;
    })
    .join("");
}

/* ===================================================== */
/* DETALHES DO JOGO FINALIZADO */
/* Abre/fecha ao clicar no placar */
/* ===================================================== */

function renderMatchDetailsArea(match) {
  if (!match || match.status !== "finished" || !match.expanded) {
    return "";
  }

  if (!Array.isArray(match.events) || match.events.length === 0) {
    return `
      <div class="match-details-area">
        <p>Nenhum gol na partida.</p>
      </div>
    `;
  }

  const eventsHtml = match.events
    .map((event) => {
      const goalClass = event.teamId === "draft_user_team"
        ? "goal-for"
        : "goal-against";

      const assistText = event.assist
        ? `<small>Ass: ${event.assist}</small>`
        : "";

      return `
        <div class="match-event-row ${goalClass}">
          <span>${event.displayMinute}</span>
          <strong>${event.scorer}</strong>
          ${assistText}
        </div>
      `;
    })
    .join("");

  return `
    <div class="match-details-area">
      ${eventsHtml}
    </div>
  `;
}

/* ===================================================== */
/* CONFIGURA CLIQUES DA CAMPANHA */
/* ===================================================== */

function setupCampaignButtons() {
  setupCampaignSpeedButtons();
  setupRevealMatchButtons();
  setupFinishedMatchToggle();
  setupViewStandingsButton();
}

/* ===================================================== */
/* BOTÕES NORMAL / RÁPIDO */
/* ===================================================== */

function setupCampaignSpeedButtons() {
  const speedButtons = document.querySelectorAll(".campaign-speed-btn");

  speedButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const mode = button.dataset.speedMode;

      const changed = setCampaignSpeedMode(mode);

      if (changed) {
        renderCampaignPage();
      }
    });
  });
}

/* ===================================================== */
/* BOTÃO REVELAR */
/* Por enquanto apenas prepara o clique */
/* Depois vamos ligar com simulationEngine.js */
/* ===================================================== */

function setupRevealMatchButtons() {
  const revealButtons = document.querySelectorAll(".reveal-match-btn");

  revealButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const matchIndex = Number(button.dataset.revealMatch);

      if (typeof window.startCampaignMatch === "function") {
        window.startCampaignMatch(matchIndex);
        return;
      }

      alert("A tela da campanha está pronta. O algoritmo da partida será o próximo passo.");
    });
  });
}

/* ===================================================== */
/* ABRIR / FECHAR DETALHES DO JOGO FINALIZADO */
/* ===================================================== */

function setupFinishedMatchToggle() {
  const scoreButtons = document.querySelectorAll(".finished-score-btn");

  scoreButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const matchIndex = Number(button.dataset.toggleMatch);
      const state = window.gameState;

      if (!state || !state.campaign || !state.campaign.matches[matchIndex]) {
        return;
      }

      const match = state.campaign.matches[matchIndex];

      match.expanded = !match.expanded;

      renderCampaignPage();
    });
  });
}

/* ===================================================== */
/* BOTÃO VER CLASSIFICAÇÃO */
/* Gera a classificação geral e troca para a tela da tabela */
/* ===================================================== */

function setupViewStandingsButton() {
  const button = document.querySelector(".view-standings-btn");

  if (!button) {
    return;
  }

  button.addEventListener("click", () => {
    if (typeof window.generateLeagueStandings !== "function") {
      alert("O algoritmo da classificação ainda não foi carregado.");
      return;
    }

    const standings = window.generateLeagueStandings();

    if (!Array.isArray(standings) || standings.length === 0) {
      alert("Não foi possível gerar a classificação.");
      return;
    }

    renderLeagueStandingsPage();
  });
}
/* ===================================================== */
/* TELA DA CLASSIFICAÇÃO GERAL */
/* Mostra os 36 times seguindo as regras da Champions:
   1º ao 8º     = Oitavas
   9º ao 24º    = Playoffs
   25º ao 36º   = Eliminado
*/
/* ===================================================== */

function renderLeagueStandingsPage() {
  const state = window.gameState;
  const campaignPage = getCampaignPageElement();

  if (!state || !state.campaign || !campaignPage) {
    return;
  }

  const standings = state.campaign.standings || [];
  const draftPosition = state.campaign.userStandingPosition;
  const draftStatus = state.campaign.userQualificationStatus;

  campaignPage.innerHTML = `
    <section class="standings-page">
      <div class="standings-header">
        <small>DRAFT UCL</small>
        <h1>Classificação Geral</h1>
        <p>${renderDraftStandingSummary(draftPosition, draftStatus)}</p>
      </div>

      <div class="standings-table-wrapper">
        <table class="standings-table">
          <thead>
            <tr>
              <th>POS</th>
              <th>TIME</th>
              <th>J</th>
              <th>PTS</th>
              <th>V</th>
              <th>E</th>
              <th>D</th>
              <th>GP</th>
              <th>GC</th>
              <th>SG</th>
              <th>SITUAÇÃO</th>
            </tr>
          </thead>

          <tbody>
            ${renderStandingsRows(standings)}
          </tbody>
        </table>
      </div>

      ${renderStandingActionButton()}
    </section>
  `;

  setupStandingActionButton();
}

/* ===================================================== */
/* RESUMO DA POSIÇÃO DO DRAFT */
/* ===================================================== */

function renderDraftStandingSummary(position, status) {
  if (!position || !status) {
    return "Classificação da fase de liga.";
  }

  if (status === "round16") {
    return `DRAFT terminou em ${position}º lugar — Oitavas`;
  }

  if (status === "playoffs") {
    return `DRAFT terminou em ${position}º lugar — Playoffs`;
  }

  return `DRAFT terminou em ${position}º lugar — Eliminado`;
}

/* ===================================================== */
/* LINHAS DA TABELA */
/* ===================================================== */

function renderStandingsRows(standings) {
  if (!Array.isArray(standings)) {
    return "";
  }

  return standings
    .map((row) => {
      const rowClass = getStandingRowClass(row);
      const isDraft = row.teamId === "draft_user_team";

      return `
        <tr class="${rowClass} ${isDraft ? "draft-standing-row" : ""}">
          <td>${row.position}</td>
          <td>
            <strong>${row.club}</strong>
            ${row.season && row.teamId !== "draft_user_team" ? `<small>${row.season}</small>` : ""}
          </td>
          <td>${row.played}</td>
          <td>${row.points}</td>
          <td>${row.wins}</td>
          <td>${row.draws}</td>
          <td>${row.losses}</td>
          <td>${row.goalsFor}</td>
          <td>${row.goalsAgainst}</td>
          <td>${row.goalDifference}</td>
          <td>
            <span class="standing-status ${row.situation}">
              ${row.situationLabel}
            </span>
          </td>
        </tr>
      `;
    })
    .join("");
}

/* ===================================================== */
/* CLASSE DA LINHA POR POSIÇÃO */
/* ===================================================== */

function getStandingRowClass(row) {
  if (!row || !row.position) {
    return "";
  }

  if (row.position <= 8) {
    return "standing-round16";
  }

  if (row.position <= 24) {
    return "standing-playoffs";
  }

  return "standing-eliminated";
}

/* ===================================================== */
/* BOTÃO FINAL CONFORME POSIÇÃO DO DRAFT */
/* ===================================================== */

function renderStandingActionButton() {
  const state = window.gameState;

  if (!state || !state.campaign) {
    return "";
  }

  const status = state.campaign.userQualificationStatus;

  if (status === "round16") {
    return `
      <div class="standing-action-area">
        <button class="standing-action-btn" data-standing-action="round16" type="button">
          AVANÇAR PARA OITAVAS →
        </button>
      </div>
    `;
  }

  if (status === "playoffs") {
    return `
      <div class="standing-action-area">
        <button class="standing-action-btn" data-standing-action="playoffs" type="button">
          IR PARA PLAYOFFS →
        </button>
      </div>
    `;
  }

  return `
    <div class="standing-action-area">
      <button class="standing-action-btn replay" data-standing-action="replay" type="button">
        JOGAR NOVAMENTE
      </button>
    </div>
  `;
}

/* ===================================================== */
/* CLIQUE DO BOTÃO FINAL DA CLASSIFICAÇÃO */
/* Inicia playoffs ou oitavas conforme posição do DRAFT */
/* ===================================================== */

function setupStandingActionButton() {
  const button = document.querySelector(".standing-action-btn");

  if (!button) {
    return;
  }

  button.addEventListener("click", () => {
    const action = button.dataset.standingAction;

    if (action === "replay") {
      location.reload();
      return;
    }

    if (typeof window.startKnockoutFromStandings !== "function") {
      alert("Motor do mata-mata não carregado.");
      return;
    }

    const knockout = window.startKnockoutFromStandings();

    if (!knockout || !knockout.currentTie) {
      alert("Não foi possível iniciar o mata-mata.");
      return;
    }

    renderKnockoutPage();
  });
}

/* ===================================================== */
/* SELETOR DE VELOCIDADE DO MATA-MATA */
/* Usa o mesmo speedMode da campanha, mas renderiza */
/* a tela do mata-mata em vez de voltar para a liga */
/* ===================================================== */

function renderKnockoutSpeedSelector() {
  const state = window.gameState;

  if (!state || !state.campaign) {
    return "";
  }

  const currentMode = state.campaign.speedMode || "normal";
  const isRunning = state.campaign.isMatchRunning;

  return `
    <div class="knockout-speed-box">
      <small>MODO DE JOGO</small>

      <div class="knockout-speed-buttons">
        <button
          class="knockout-speed-btn ${currentMode === "normal" ? "active" : ""}"
          data-knockout-speed="normal"
          type="button"
          ${isRunning ? "disabled" : ""}
        >
          NORMAL
        </button>

        <button
          class="knockout-speed-btn ${currentMode === "fast" ? "active" : ""}"
          data-knockout-speed="fast"
          type="button"
          ${isRunning ? "disabled" : ""}
        >
          RÁPIDO
        </button>
      </div>
    </div>
  `;
}
/* ===================================================== */
/* TELA DO MATA-MATA */
/* Mostra o confronto atual com ida e volta */
/* ===================================================== */

function renderKnockoutPage() {
  const state = window.gameState;
  const campaignPage = getCampaignPageElement();

  if (!state || !state.campaign || !state.campaign.knockout || !campaignPage) {
    return;
  }

  const knockout = state.campaign.knockout;
  const tie = knockout.currentTie;

  if (!tie) {
    return;
  }

  campaignPage.innerHTML = `
    <section class="knockout-page">
      <section class="knockout-header">
        <small>DRAFT UCL</small>
        <h1>${tie.stageLabel}</h1>
<p>${tie.isSingleMatch ? "Final em jogo único" : "Confronto eliminatório · Ida e volta"}</p>      </section>

      ${renderKnockoutSpeedSelector()}

      <section class="knockout-main-card">
        <div class="knockout-stage-label">
          <small>CONFRONTO</small>
          <h2>
            DRAFT
            <span>x</span>
            ${tie.opponentTeam.club}
            <small>${tie.opponentTeam.season || ""}</small>
          </h2>
        </div>

        <div class="knockout-aggregate-box">
          <small>AGREGADO</small>
          <strong>
            DRAFT ${tie.aggregateDraft} - ${tie.aggregateOpponent} ${tie.opponentTeam.club}
          </strong>
        </div>
      </section>

<section class="knockout-legs-list">
  ${renderKnockoutLegCard(tie, tie.firstLeg, 0)}
  ${tie.isSingleMatch ? "" : renderKnockoutLegCard(tie, tie.secondLeg, 1)}
</section>

      ${renderKnockoutResultCard(tie)}
    </section>
  `;

  setupKnockoutButtons();
}
/* ===================================================== */
/* CARD DE CADA JOGO DO MATA-MATA */
/* ===================================================== */

function renderKnockoutLegCard(tie, leg, legIndex) {
  if (!tie || !leg) {
    return "";
  }

  const statusText = getKnockoutLegStatusText(leg);
  const actionArea = renderKnockoutLegAction(leg, legIndex);
  const liveArea = renderKnockoutLegLiveArea(leg);
  const detailsArea = renderKnockoutLegDetailsArea(leg);
  const resultClass = getDraftKnockoutLegResult(leg);

  return `
    <article class="knockout-leg-card ${leg.status} ${resultClass} ${leg.expanded ? "expanded" : ""}" data-knockout-leg="${legIndex}">
      <div class="knockout-leg-info">
        <small>${leg.label}</small>
        <strong>${statusText}</strong>
      </div>

      <div class="knockout-leg-teams">
        <span>${renderTeamName(leg.homeTeam)}</span>
        <b>x</b>
        <span>${renderTeamName(leg.awayTeam)}</span>
      </div>

      <div class="knockout-leg-action">
        ${actionArea}
      </div>

      ${liveArea}
      ${detailsArea}
    </article>
  `;
}

/* ===================================================== */
/* STATUS DO JOGO DO MATA-MATA */
/* ===================================================== */

function getKnockoutLegStatusText(leg) {
  if (!leg.unlocked) {
    return "BLOQUEADO";
  }

  if (leg.status === "finished") {
    return "FINALIZADO";
  }

  if (leg.status === "live") {
    return "EM ANDAMENTO";
  }

  return "AGUARDANDO";
}
/* ===================================================== */
/* RESULTADO DO DRAFT NO JOGO DO MATA-MATA */
/* Retorna:
   - win  = vitória do DRAFT
   - draw = empate
   - loss = derrota do DRAFT
*/
/* ===================================================== */

function getDraftKnockoutLegResult(leg) {
  if (!leg || leg.status !== "finished") {
    return "";
  }

  const draftId = "draft_user_team";

  const draftIsHome = leg.homeTeam?.id === draftId;
  const draftIsAway = leg.awayTeam?.id === draftId;

  if (!draftIsHome && !draftIsAway) {
    return "";
  }

  const draftScore = draftIsHome ? leg.homeScore : leg.awayScore;
  const opponentScore = draftIsHome ? leg.awayScore : leg.homeScore;

  if (draftScore > opponentScore) {
    return "win";
  }

  if (draftScore < opponentScore) {
    return "loss";
  }

  return "draw";
}
/* ===================================================== */
/* BOTÃO / PLACAR DO JOGO DO MATA-MATA */
/* ===================================================== */

function renderKnockoutLegAction(leg, legIndex) {
  if (!leg.unlocked) {
    return `
      <span class="knockout-locked-label">
        —
      </span>
    `;
  }

  if (leg.status === "finished") {
  const resultClass = getDraftKnockoutLegResult(leg);

  return `
    <button
      class="knockout-final-score ${resultClass}"
      data-toggle-knockout-leg="${legIndex}"
      type="button"
    >
      ${leg.homeScore} - ${leg.awayScore}
    </button>
  `;
}

  if (leg.status === "live") {
    return `
      <strong class="knockout-live-score">
        ${leg.homeScore} - ${leg.awayScore}
      </strong>
    `;
  }

  return `
    <button class="knockout-reveal-btn" data-knockout-leg="${legIndex}" type="button">
      REVELAR →
    </button>
  `;
}
/* ===================================================== */
/* ÁREA AO VIVO DO JOGO DO MATA-MATA */
/* Usa o mesmo visual da fase de liga */
/* ===================================================== */

function renderKnockoutLegLiveArea(leg) {
  if (!leg || leg.status !== "live") {
    return "";
  }

  return `
    <div class="knockout-live-area">
      <div class="match-clock">
        ${leg.currentMinute}
      </div>

      <div class="match-score">
        ${leg.homeScore} - ${leg.awayScore}
      </div>

      <div class="match-events-list">
        ${renderShownEvents(leg)}
      </div>
    </div>
  `;
}
/* ===================================================== */
/* DETALHES DO JOGO FINALIZADO DO MATA-MATA */
/* Abre ao clicar no placar final */
/* ===================================================== */

function renderKnockoutLegDetailsArea(leg) {
  if (!leg || leg.status !== "finished" || !leg.expanded) {
    return "";
  }

  const events = leg.shownEvents || leg.events || [];

  if (!Array.isArray(events) || events.length === 0) {
    return `
      <div class="knockout-details-area">
        <p class="no-events-text">Jogo sem gols.</p>
      </div>
    `;
  }

  return `
    <div class="knockout-details-area">
      ${renderShownEvents({
        ...leg,
        shownEvents: events
      })}
    </div>
  `;
}
/* ===================================================== */
/* CARD FINAL DO CONFRONTO */
/* Aparece depois da volta ou quando precisar de pênaltis */
/* ===================================================== */
function renderKnockoutResultCard(tie) {
  if (!tie) {
    return "";
  }

  /*
    Agregado empatado:
    mostra botão para iniciar pênaltis.
  */
  if (tie.status === "awaiting_penalties") {
    return `
      <section class="knockout-result-card penalties-needed">
        <small>AGREGADO EMPATADO</small>
        <h2>PÊNALTIS</h2>

        <p>
          DRAFT ${tie.aggregateDraft} - ${tie.aggregateOpponent} ${tie.opponentTeam.club}
        </p>

        <button class="start-penalties-btn" type="button">
          INICIAR PÊNALTIS →
        </button>
      </section>
    `;
  }

  /*
    Pênaltis em andamento:
    mostra o card ao vivo dos pênaltis.
  */
  if (tie.status === "penalties_live" || tie.penalties?.status === "live") {
    return renderPenaltyShootoutCard(tie);
  }

  /*
    Se o confronto ainda não terminou,
    não mostra card final.
  */
  if (!tie.finished) {
    return "";
  }

  const penaltyInfo = tie.decidedByPenalties && tie.penalties
    ? `
      <p>
        Pênaltis: DRAFT ${tie.penalties.draftScore} - ${tie.penalties.opponentScore} ${tie.opponentTeam.club}
      </p>
    `
    : "";

  /*
    DRAFT classificado / campeão.
  */
  if (tie.winnerTeamId === "draft_user_team") {
    const title = tie.stage === "final"
      ? "DRAFT É CAMPEÃO DA CHAMPIONS"
      : `DRAFT passou para ${tie.nextLabel || "A PRÓXIMA FASE"}`;

    const smallText = tie.stage === "final"
      ? "CAMPEÃO"
      : "CLASSIFICADO";

    const buttonText = tie.stage === "final"
      ? "VER MEU CARD"
      : `AVANÇAR PARA ${tie.nextLabel || "PRÓXIMA FASE"} →`;

    const buttonClass = tie.stage === "final"
      ? "knockout-card-btn"
      : "knockout-next-btn";

    const buttonData = tie.stage === "final"
      ? ""
      : `data-advance-knockout="true"`;

    return `
      <section class="knockout-result-card classified">
        <small>${smallText}</small>
        <h2>${title}</h2>

        <p>
          Agregado: DRAFT ${tie.aggregateDraft} - ${tie.aggregateOpponent} ${tie.opponentTeam.club}
        </p>

        ${penaltyInfo}

<div class="knockout-result-actions">
  ${tie.stage === "final" ? `
    <button class="knockout-repeat-team-btn" type="button">
      REPETIR TIME
    </button>
  ` : ""}

  <button class="${buttonClass}" ${buttonData} type="button">
    ${buttonText}
  </button>
</div>
      </section>
    `;
  }

  /*
    DRAFT eliminado / vice na final.
  */
let eliminatedTitle = "";

if (tie.stage === "final") {
  eliminatedTitle = "DRAFT perdeu a FINAL";
} else if (tie.stage === "playoffs") {
  eliminatedTitle = "DRAFT parou nos PLAYOFFS";
} else if (tie.stage === "round16") {
  eliminatedTitle = "DRAFT parou nas OITAVAS";
} else if (tie.stage === "quarter") {
  eliminatedTitle = "DRAFT parou nas QUARTAS";
} else if (tie.stage === "semi") {
  eliminatedTitle = "DRAFT parou na SEMIFINAL";
} else {
  eliminatedTitle = `DRAFT parou em ${tie.stageLabel}`;
}

  const eliminatedSmallText = tie.stage === "final"
    ? "VICE-CAMPEÃO"
    : "ELIMINADO";

  return `
    <section class="knockout-result-card eliminated">
      <small>${eliminatedSmallText}</small>
      <h2>${eliminatedTitle}</h2>

      <p>
        Agregado: DRAFT ${tie.aggregateDraft} - ${tie.aggregateOpponent} ${tie.opponentTeam.club}
      </p>

      ${penaltyInfo}

<div class="knockout-result-actions">
  <button class="knockout-replay-btn" type="button" onclick="location.reload()">
    JOGAR NOVAMENTE
  </button>

  <button class="knockout-repeat-team-btn" type="button">
    REPETIR TIME
  </button>

  <button class="knockout-card-btn" type="button">
    VER MEU CARD
  </button>
</div>
    </section>
  `;
}
  
/* ===================================================== */
/* NOME CURTO DO TIME NOS PÊNALTIS */
/* Evita aparecer "DRAFT Seu elenco" */
/* ===================================================== */

function getPenaltyTeamDisplayName(team, isDraftTeam = false) {
  if (isDraftTeam || team?.id === "draft_user_team") {
    return "DRAFT";
  }

  if (!team) {
    return "ADVERSÁRIO";
  }

  return team.season
    ? `${team.club} ${team.season}`
    : team.club;
}
/* ===================================================== */
/* CARD DOS PÊNALTIS AO VIVO */
/* ===================================================== */

function renderPenaltyShootoutCard(tie) {
  if (!tie || !tie.penalties) {
    return "";
  }

  const penalties = tie.penalties;
  const lastKick = penalties.kicks[penalties.kicks.length - 1];

  const draftLabel = getPenaltyTeamDisplayName(null, true);
  const opponentLabel = getPenaltyTeamDisplayName(tie.opponentTeam);

  return `
    <section class="penalty-shootout-card">
      <small>PÊNALTIS</small>

      <h2>
        ${draftLabel} ${penalties.draftScore} - ${penalties.opponentScore} ${tie.opponentTeam.club}
      </h2>

      <div class="penalty-board">
        ${renderPenaltyTeamLine(draftLabel, "draft", penalties)}

        ${renderPenaltyTeamLine(
          opponentLabel,
          "opponent",
          penalties
        )}
      </div>

      ${renderPenaltyCurrentKick(lastKick, tie)}
    </section>
  `;
}
/* ===================================================== */
/* NOME CURTO DO TIME NOS PÊNALTIS */
/* Evita aparecer "DRAFT Meu time" ou textos longos */
/* ===================================================== */

function getPenaltyTeamDisplayName(team, isDraftTeam = false) {
  if (isDraftTeam || team?.id === "draft_user_team") {
    return "DRAFT";
  }

  if (!team) {
    return "ADVERSÁRIO";
  }

  return team.season
    ? `${team.club} ${team.season}`
    : team.club;
}
/* ===================================================== */
/* LINHA DE CADA TIME NOS PÊNALTIS */
/* ===================================================== */

function renderPenaltyTeamLine(label, side, penalties) {
  const kicks = penalties.kicks.filter((kick) => {
    return kick.side === side;
  });

  const slotsCount = Math.max(5, kicks.length);

  const marks = [];

  for (let i = 0; i < slotsCount; i++) {
    const kick = kicks[i];

    if (!kick) {
      marks.push(`<span class="penalty-mark empty">-</span>`);
    } else if (kick.scored) {
      marks.push(`<span class="penalty-mark scored">✓</span>`);
    } else {
      marks.push(`<span class="penalty-mark missed">✕</span>`);
    }
  }

  return `
    <div class="penalty-team-line">
      <strong>${label}</strong>

      <div class="penalty-marks">
        ${marks.join("")}
      </div>

      <div class="penalty-names">
        ${kicks.map(renderPenaltyKickName).join("")}
      </div>
    </div>
  `;
}

/* ===================================================== */
/* NOME DO COBRADOR */
/* Verde se fez, vermelho se errou */
/* ===================================================== */

function renderPenaltyKickName(kick) {
  if (!kick) {
    return "";
  }

  const repeatText = kick.repeatNumber > 1 ? `(${kick.repeatNumber})` : "";
  const className = kick.scored ? "scored" : "missed";

  return `
    <span class="penalty-player-name ${className}">
      ${kick.playerName}${repeatText}
    </span>
  `;
}
/* ===================================================== */
/* COBRANÇA ATUAL / ÚLTIMA COBRANÇA */
/* ===================================================== */

function renderPenaltyCurrentKick(kick, tie) {
  if (!kick) {
    return `
      <div class="penalty-current-kick">
        <strong>Aguardando primeira cobrança...</strong>
      </div>
    `;
  }

  const resultText = kick.scored ? "GOL" : "ERROU";
  const resultClass = kick.scored ? "scored" : "missed";

  const teamLabel = kick.side === "draft"
    ? "DRAFT"
    : `${tie.opponentTeam.club}${tie.opponentTeam.season ? ` ${tie.opponentTeam.season}` : ""}`;

  return `
    <div class="penalty-current-kick">
      <small>Cobrança ${kick.order}</small>
      <strong class="${resultClass}">
        ${kick.playerName}
        <span>(${teamLabel})</span>
        bateu: ${resultText}
      </strong>
    </div>
  `;
}
/* ===================================================== */
/* BOTÕES DO MATA-MATA */
/* ===================================================== */

function setupKnockoutButtons() {
  setupKnockoutSpeedButtons();
  setupKnockoutFinishedScoreToggle();
  setupKnockoutCardButton();
  setupStartPenaltiesButton();
setupAdvanceKnockoutButton();
setupRepeatTeamButton();

  const buttons = document.querySelectorAll(".knockout-reveal-btn");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const legIndex = Number(button.dataset.knockoutLeg);

      if (typeof window.startKnockoutLeg !== "function") {
        alert("Motor do jogo mata-mata não carregado.");
        return;
      }

      window.startKnockoutLeg(legIndex);
    });
  });
}

/* ===================================================== */
/* REPETIR TIME NA CAMPANHA */
/*
  Reinicia a Champions usando o mesmo elenco montado no Draft.

  Regras:
  - mantém o time atual do usuário;
  - mantém formação e estilo;
  - mantém jogadores escolhidos;
  - reinicia a velocidade da nova campanha em NORMAL;
  - apaga a campanha antiga;
  - sorteia uma nova fase de liga;
  - volta para a campanha do zero.

  Importante:
  - não recarrega a página;
  - não apaga o Draft;
  - não altera database;
  - não altera jogadores;
  - não altera formação;
  - não altera estilo.
*/
/* ===================================================== */
function restartCampaignWithCurrentTeam() {
  const state = window.gameState;

  if (!state || !state.userTeam) {
    alert("Não foi possível repetir o time. O elenco do Draft não foi encontrado.");
    return;
  }

  /*
    Segurança:
    apaga somente a competição atual.
    O time montado fica preservado em state.userTeam.
  */
  state.campaign = null;

  if (typeof startLeagueCampaign !== "function") {
    alert("Motor da campanha não carregado.");
    return;
  }

  const newCampaign = startLeagueCampaign();

  if (!newCampaign) {
    alert("Não foi possível criar uma nova campanha com este time.");
    return;
  }

  /*
    Segurança:
    ao repetir o time, a nova campanha sempre começa em modo normal.

    Isso evita bug visual onde a tela mostra "RÁPIDO",
    mas o motor da partida roda em velocidade normal.
  */
  if (typeof setCampaignSpeedMode === "function") {
    setCampaignSpeedMode("normal");
  } else {
    state.campaign.speedMode = "normal";
  }

  const draftPage = document.getElementById("draftPage");
  const campaignPage = getCampaignPageElement();

  if (draftPage) {
    draftPage.classList.add("hidden");
  }

  if (campaignPage) {
    campaignPage.classList.remove("hidden");
  }

  renderCampaignPage();
}

/* ===================================================== */
/* BOTÃO REPETIR TIME */
/*
  Aparece na tela de eliminado do mata-mata.

  Ao clicar:
  - reaproveita o elenco atual;
  - reinicia a fase de liga;
  - sorteia nova campanha.
*/
/* ===================================================== */

function setupRepeatTeamButton() {
  const button = document.querySelector(".knockout-repeat-team-btn");

  if (!button) {
    return;
  }

  button.addEventListener("click", () => {
    restartCampaignWithCurrentTeam();
  });
}
/* ===================================================== */
/* BOTÃO AVANÇAR PARA PRÓXIMA FASE */
/* ===================================================== */

function setupAdvanceKnockoutButton() {
  const button = document.querySelector("[data-advance-knockout]");

  if (!button) {
    return;
  }

  button.addEventListener("click", () => {
    if (typeof window.advanceToNextKnockoutStage !== "function") {
      alert("Avanço do mata-mata não carregado.");
      return;
    }

    const knockout = window.advanceToNextKnockoutStage();

    if (!knockout || !knockout.currentTie) {
      return;
    }

    renderKnockoutPage();
  });
}
/* ===================================================== */
/* BOTÃO INICIAR PÊNALTIS */
/* ===================================================== */

function setupStartPenaltiesButton() {
  const button = document.querySelector(".start-penalties-btn");

  if (!button) {
    return;
  }

  button.addEventListener("click", () => {
    if (typeof window.startPenaltyShootout !== "function") {
      alert("Motor dos pênaltis não carregado.");
      return;
    }

    window.startPenaltyShootout();
  });
}
function setupKnockoutCardButton() {
  const button = document.querySelector(".knockout-card-btn");

  if (!button) {
    return;
  }

  button.addEventListener("click", () => {
    renderCampaignCardPage();
  });
}
/* ===================================================== */
/* MEU CARD - FUNÇÕES DE APOIO */
/* ===================================================== */

function getDraftGoalsFromCardMatch(match) {
  if (!match) return 0;

  if (match.homeTeam?.id === "draft_user_team") {
    return match.homeScore || 0;
  }

  if (match.awayTeam?.id === "draft_user_team") {
    return match.awayScore || 0;
  }

  return 0;
}

function getOpponentGoalsFromCardMatch(match) {
  if (!match) return 0;

  if (match.homeTeam?.id === "draft_user_team") {
    return match.awayScore || 0;
  }

  if (match.awayTeam?.id === "draft_user_team") {
    return match.homeScore || 0;
  }

  return 0;
}

function getCardMatchEvents(match) {
  if (!match) return [];

  if (Array.isArray(match.events) && match.events.length > 0) {
    return match.events;
  }

  if (Array.isArray(match.shownEvents) && match.shownEvents.length > 0) {
    return match.shownEvents;
  }

  return [];
}

/* ===================================================== */
/* COLETA TODOS OS JOGOS DO DRAFT */
/* Liga + Mata-mata */
/* ===================================================== */

function collectDraftCampaignMatches() {
  const state = window.gameState;

  if (!state || !state.campaign) {
    return [];
  }

  const campaign = state.campaign;
  const matches = [];

  /* Fase de Liga */
  if (Array.isArray(campaign.matches)) {
    campaign.matches.forEach((match) => {
      if (!match || match.status !== "finished") return;

      matches.push({
        stage: "league",
        stageLabel: "Fase de Liga",
        match: match,
        tie: null
      });
    });
  }

  /* Mata-mata */
  const knockout = campaign.knockout;

  if (knockout) {
    const ties = [];

    if (Array.isArray(knockout.completedTies)) {
      knockout.completedTies.forEach((tie) => {
        if (tie) ties.push(tie);
      });
    }

    if (knockout.currentTie) {
      const alreadyAdded = ties.some((tie) => {
        return tie.id === knockout.currentTie.id;
      });

      if (!alreadyAdded) {
        ties.push(knockout.currentTie);
      }
    }

    ties.forEach((tie) => {
      if (!tie) return;

      if (tie.firstLeg && tie.firstLeg.status === "finished") {
        matches.push({
          stage: tie.stage,
          stageLabel: tie.stageLabel,
          match: tie.firstLeg,
          tie: tie
        });
      }

      if (!tie.isSingleMatch && tie.secondLeg && tie.secondLeg.status === "finished") {
        matches.push({
          stage: tie.stage,
          stageLabel: tie.stageLabel,
          match: tie.secondLeg,
          tie: tie
        });
      }
    });
  }

  return matches;
}

/* ===================================================== */
/* CALCULA OVERALL DO ELENCO DRAFT */
/* ===================================================== */

function getDraftCardOverall() {
  const state = window.gameState;
  const userTeam = state?.userTeam;

  if (userTeam?.teamOverall) return userTeam.teamOverall;
  if (userTeam?.overall) return userTeam.overall;

  const players = userTeam?.players || state?.selectedPlayers || [];

  if (!Array.isArray(players) || players.length === 0) {
    return "-";
  }

  const total = players.reduce((sum, player) => {
    return sum + (player.rating || 0);
  }, 0);

  return Math.round(total / players.length);
}

/* ===================================================== */
/* DESCOBRE RESULTADO FINAL DA CAMPANHA */
/* ===================================================== */

function getCampaignCardStatusLabel() {
  const state = window.gameState;
  const knockout = state?.campaign?.knockout;
  const tie = knockout?.currentTie;

  if (!knockout) {
    return "CAMPANHA FINALIZADA";
  }

  if (tie?.stage === "final" && tie.finished && tie.winnerTeamId === "draft_user_team") {
    return "CAMPEÃO DA CHAMPIONS";
  }

  if (tie?.stage === "final" && tie.finished && tie.winnerTeamId !== "draft_user_team") {
    return "VICE-CAMPEÃO";
  }

  if (knockout.userEliminated) {
    if (knockout.userStoppedAt === "playoffs") return "PAROU NOS PLAYOFFS";
    if (knockout.userStoppedAt === "round16") return "PAROU NAS OITAVAS";
    if (knockout.userStoppedAt === "quarter") return "PAROU NAS QUARTAS";
    if (knockout.userStoppedAt === "semi") return "PAROU NA SEMIFINAL";
    if (knockout.userStoppedAt === "final") return "VICE-CAMPEÃO";
  }

  if (tie?.finished && tie.winnerTeamId === "draft_user_team") {
    return "CLASSIFICADO";
  }

  return "CAMPANHA EM ANDAMENTO";
}

/* ===================================================== */
/* CALCULA ESTATÍSTICAS DO CARD */
/* ===================================================== */

function buildCampaignCardStats() {
  const state = window.gameState;

  if (!state || !state.campaign) {
    return null;
  }

  const draftMatches = collectDraftCampaignMatches();

  let wins = 0;
  let draws = 0;
  let losses = 0;

  let goalsFor = 0;
  let goalsAgainst = 0;

  const scorers = {};
  const assists = {};

  draftMatches.forEach((item) => {
    const match = item.match;

    const draftGoals = getDraftGoalsFromCardMatch(match);
    const opponentGoals = getOpponentGoalsFromCardMatch(match);

    goalsFor += draftGoals;
    goalsAgainst += opponentGoals;

    if (draftGoals > opponentGoals) {
      wins++;
    } else if (draftGoals < opponentGoals) {
      losses++;
    } else {
      draws++;
    }

    const events = getCardMatchEvents(match);

    events.forEach((event) => {
      if (event.teamId !== "draft_user_team") return;

      if (event.scorer) {
        scorers[event.scorer] = (scorers[event.scorer] || 0) + 1;
      }

      if (event.assist) {
        assists[event.assist] = (assists[event.assist] || 0) + 1;
      }
    });
  });

  const topScorers = Object.entries(scorers)
    .map(([name, total]) => ({ name, total }))
    .sort((a, b) => b.total - a.total)
    .slice(0, 3);

  const topAssists = Object.entries(assists)
    .map(([name, total]) => ({ name, total }))
    .sort((a, b) => b.total - a.total)
    .slice(0, 3);

  return {
    statusLabel: getCampaignCardStatusLabel(),

    leaguePosition: state.campaign.userStandingPosition || "-",

    formation: state.userTeam?.formation || state.selectedFormation || "-",
    style: state.userTeam?.style || state.selectedStyle || "-",
    overall: getDraftCardOverall(),

    wins,
    draws,
    losses,

    goalsFor,
    goalsAgainst,
    goalDifference: goalsFor - goalsAgainst,

    topScorers,
    topAssists
  };
}
/* ===================================================== */
/* TELA MEU CARD */
/* ===================================================== */

function renderCampaignCardPage() {
  const campaignPage = getCampaignPageElement();
  const stats = buildCampaignCardStats();

  if (!campaignPage || !stats) {
    alert("Não foi possível montar o card da campanha.");
    return;
  }
  const isChampion = stats.statusLabel === "CAMPEÃO DA CHAMPIONS";

  campaignPage.innerHTML = `
   <section class="campaign-card-page ${isChampion ? "champion" : ""}">
<div class="campaign-card-capture ${isChampion ? "champion" : ""}" id="finalCard">
        <header class="campaign-card-header">
          <small>DRAFT UCL</small>
<h1 class="campaign-card-title">
  MEU CARD
</h1>        <strong>${stats.statusLabel}</strong>
        </header>

        <section class="campaign-card-squad">
          <small>ELENCO DRAFT</small>

          <div class="campaign-card-squad-grid">
            <div>
              <span>Overall Geral</span>
              <strong>${stats.overall}</strong>
            </div>

            <div>
              <span>Formação</span>
              <strong>${stats.formation}</strong>
            </div>

            <div>
              <span>Estilo</span>
              <strong>${stats.style}</strong>
            </div>
          </div>
        </section>

        <section class="campaign-card-summary">
          <div>
            <span>Posição na Liga</span>
            <strong>${stats.leaguePosition}º</strong>
          </div>

          <div>
            <span>Campanha</span>
            <strong>${stats.wins}V - ${stats.draws}E - ${stats.losses}D</strong>
          </div>

          <div>
            <span>Gols Feitos</span>
            <strong>${stats.goalsFor}</strong>
          </div>

          <div>
            <span>Gols Sofridos</span>
            <strong>${stats.goalsAgainst}</strong>
          </div>

          <div>
            <span>Saldo</span>
            <strong>${stats.goalDifference >= 0 ? "+" : ""}${stats.goalDifference}</strong>
          </div>
        </section>

        <section class="campaign-card-rankings">
          <div class="campaign-card-ranking-box">
            <small>TOP 3 ARTILHEIROS</small>
            ${renderCampaignCardRanking(stats.topScorers, "gol", "gols")}
          </div>

          <div class="campaign-card-ranking-box">
            <small>TOP 3 ASSISTENTES</small>
            ${renderCampaignCardRanking(stats.topAssists, "assistência", "assistências")}
          </div>
        </section>

        <section class="campaign-card-results">
          <div>
            <span>Vitórias</span>
            <strong>${stats.wins}</strong>
          </div>

          <div>
            <span>Empates</span>
            <strong>${stats.draws}</strong>
          </div>

          <div>
            <span>Derrotas</span>
            <strong>${stats.losses}</strong>
          </div>
        </section>
      </div>
<div class="campaign-card-actions">
  <button class="campaign-card-games-btn" type="button">
    VER JOGOS DA CAMPANHA
  </button>

  <button
    class="campaign-card-share-btn ${isChampion ? "champion" : ""}"
    id="shareImageButton"
    type="button"
  >
    COMPARTILHAR CARD
  </button>

  <button class="campaign-card-repeat-team-btn" type="button">
    REPETIR TIME
  </button>

  <button class="campaign-card-replay-btn" type="button" onclick="location.reload()">
    JOGAR NOVAMENTE
  </button>
</div>
    </section>
  `;

  setupCampaignCardPageButtons();
}

/* ===================================================== */
/* RANKING DO CARD */
/* ===================================================== */

function renderCampaignCardRanking(items, singularLabel, pluralLabel) {
  if (!Array.isArray(items) || items.length === 0) {
    return `
      <p class="empty-ranking-text">Nenhum registro.</p>
    `;
  }

  return `
    <ol>
      ${items.map((item) => {
        const label = item.total === 1 ? singularLabel : pluralLabel;

        return `
          <li>
            <span>${item.name}</span>
            <strong>${item.total} ${label}</strong>
          </li>
        `;
      }).join("")}
    </ol>
  `;
}

/* ===================================================== */
/* BOTÕES DO MEU CARD */
/* ===================================================== */

function setupCampaignCardPageButtons() {
  const gamesButton = document.querySelector(".campaign-card-games-btn");

  if (gamesButton) {
    gamesButton.addEventListener("click", () => {
      renderCampaignGamesPage();
    });
  }

  const repeatTeamButton = document.querySelector(".campaign-card-repeat-team-btn");

  if (repeatTeamButton) {
    repeatTeamButton.addEventListener("click", () => {
      restartCampaignWithCurrentTeam();
    });
  }
}

/* ===================================================== */
/* JOGOS DA CAMPANHA - FUNÇÕES DE APOIO */
/* ===================================================== */

function getCampaignGameStageOrder() {
  return [
    "league",
    "playoffs",
    "round16",
    "quarter",
    "semi",
    "final"
  ];
}

function getCampaignGameStageLabel(stage) {
  if (stage === "league") return "FASE DE LIGA";
  if (stage === "playoffs") return "PLAYOFFS";
  if (stage === "round16") return "OITAVAS";
  if (stage === "quarter") return "QUARTAS";
  if (stage === "semi") return "SEMIFINAL";
  if (stage === "final") return "FINAL";

  return "CAMPANHA";
}

function renderCampaignGameTeamName(team) {
  if (!team) {
    return "Time";
  }

  if (team.id === "draft_user_team") {
    return "DRAFT";
  }

  return `
    ${team.club}
    ${team.season ? `<small>${team.season}</small>` : ""}
  `;
}

function getDraftResultFromCampaignGame(match) {
  if (!match) {
    return "";
  }

  const draftGoals = getDraftGoalsFromCardMatch(match);
  const opponentGoals = getOpponentGoalsFromCardMatch(match);

  if (draftGoals > opponentGoals) return "win";
  if (draftGoals < opponentGoals) return "loss";
  return "draw";
}

function renderCampaignGameRow(item) {
  if (!item || !item.match) {
    return "";
  }

  const match = item.match;
  const resultClass = getDraftResultFromCampaignGame(match);

  return `
    <div class="campaign-game-row ${resultClass}">
      <div class="campaign-game-teams">
        <span>${renderCampaignGameTeamName(match.homeTeam)}</span>
        <b>x</b>
        <span>${renderCampaignGameTeamName(match.awayTeam)}</span>
      </div>

      <strong class="campaign-game-score">
        ${match.homeScore} - ${match.awayScore}
      </strong>
    </div>
  `;
}

function shouldRenderPenaltyDecisionAfterMatch(item) {
  if (!item || !item.tie || !item.match) {
    return false;
  }

  const tie = item.tie;

  if (!tie.decidedByPenalties || !tie.penalties) {
    return false;
  }

  if (tie.isSingleMatch) {
    return item.match === tie.firstLeg;
  }

  return item.match === tie.secondLeg;
}

function renderPenaltyDecisionRow(tie) {
  if (!tie || !tie.penalties) {
    return "";
  }

  const draftWon = tie.penalties.winnerTeamId === "draft_user_team";
  const decisionText = draftWon ? "DRAFT venceu nos pênaltis" : "DRAFT perdeu nos pênaltis";
  const resultClass = draftWon ? "win" : "loss";

  return `
    <div class="campaign-game-penalty-row ${resultClass}">
      <span>${decisionText}</span>
      <strong>
        ${tie.penalties.draftScore} - ${tie.penalties.opponentScore}
      </strong>
    </div>
  `;
}

function renderCampaignGamesSection(stage, items) {
  if (!Array.isArray(items) || items.length === 0) {
    return "";
  }

  return `
    <section class="campaign-games-section">
      <h2>${getCampaignGameStageLabel(stage)}</h2>

      <div class="campaign-games-list">
        ${items.map((item) => {
          return `
            ${renderCampaignGameRow(item)}
            ${shouldRenderPenaltyDecisionAfterMatch(item) ? renderPenaltyDecisionRow(item.tie) : ""}
          `;
        }).join("")}
      </div>
    </section>
  `;
}

/* ===================================================== */
/* TELA JOGOS DA CAMPANHA */
/* Lista limpa com todos os placares */
/* ===================================================== */

function renderCampaignGamesPage() {
  const campaignPage = getCampaignPageElement();
  const allMatches = collectDraftCampaignMatches();

  if (!campaignPage) {
    return;
  }

  const stageOrder = getCampaignGameStageOrder();

  campaignPage.innerHTML = `
    <section class="campaign-games-page">
      <div class="campaign-games-capture" id="campaignGamesCapture">
        <header class="campaign-games-header">
          <small>DRAFT UCL</small>
          <h1>JOGOS DA CAMPANHA</h1>
          <p>Todos os resultados do seu DRAFT na competição.</p>
        </header>

        ${stageOrder.map((stage) => {
          const items = allMatches.filter((item) => {
            return item.stage === stage;
          });

          return renderCampaignGamesSection(stage, items);
        }).join("")}
      </div>

      <div class="campaign-games-actions">
        <button class="campaign-games-back-btn" type="button">
          VOLTAR AO CARD
        </button>

        <button
          class="campaign-games-share-btn"
          id="shareCampaignButton"
          type="button"
        >
          COMPARTILHAR CAMPANHA
        </button>

 <button class="campaign-games-repeat-team-btn" type="button">
  REPETIR TIME
</button>

<button class="campaign-games-replay-btn" type="button" onclick="location.reload()">
  JOGAR NOVAMENTE
</button>
      </div>
    </section>
  `;

  /*
    Segurança:
    Sempre que usamos innerHTML, os botões da tela são recriados.
    Por isso, os eventos antigos deixam de existir.

    Essa chamada religa o clique do botão "VOLTAR AO CARD"
    depois que a tela de jogos é renderizada.

    O typeof evita erro caso a função ainda não exista ou seja removida.
  */
  if (typeof setupCampaignGamesPageButtons === "function") {
    setupCampaignGamesPageButtons();
  }
}
/* ===================================================== */
/* BOTÕES DA TELA JOGOS DA CAMPANHA */
/* ===================================================== */

function setupCampaignGamesPageButtons() {
  const backButton = document.querySelector(".campaign-games-back-btn");

  if (backButton) {
    backButton.addEventListener("click", () => {
      renderCampaignCardPage();
    });
  }

  const repeatTeamButton = document.querySelector(".campaign-games-repeat-team-btn");

  if (repeatTeamButton) {
    repeatTeamButton.addEventListener("click", () => {
      restartCampaignWithCurrentTeam();
    });
  }
}
/* ===================================================== */
/* ABRE / FECHA DETALHES DO JOGO FINALIZADO */
/* Clicando no placar final do mata-mata */
/* ===================================================== */

function setupKnockoutFinishedScoreToggle() {
  const buttons = document.querySelectorAll("[data-toggle-knockout-leg]");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const state = window.gameState;
      const legIndex = Number(button.dataset.toggleKnockoutLeg);

      if (!state || !state.campaign || !state.campaign.knockout) {
        return;
      }

      const tie = state.campaign.knockout.currentTie;

      if (!tie) {
        return;
      }

      const leg = legIndex === 0 ? tie.firstLeg : tie.secondLeg;

      if (!leg || leg.status !== "finished") {
        return;
      }

      leg.expanded = !leg.expanded;

      renderKnockoutPage();
    });
  });
}
/* ===================================================== */
/* BOTÕES NORMAL / RÁPIDO DO MATA-MATA */
/* ===================================================== */

function setupKnockoutSpeedButtons() {
  const buttons = document.querySelectorAll(".knockout-speed-btn");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const state = window.gameState;
      const mode = button.dataset.knockoutSpeed;

      if (!state || !state.campaign) {
        return;
      }

      if (state.campaign.isMatchRunning) {
        alert("Não é possível mudar a velocidade com jogo em andamento.");
        return;
      }

      if (typeof window.setCampaignSpeedMode !== "function") {
        alert("Controle de velocidade não carregado.");
        return;
      }

      window.setCampaignSpeedMode(mode);

      /*
        Importante:
        Renderiza a tela do mata-mata novamente.
        Não chama renderCampaignPage(), para não voltar para a liga.
      */
      renderKnockoutPage();
    });
  });
}
/* ===================================================== */
/* EXPÕE FUNÇÕES */
/* ===================================================== */

window.initCampaignFromDraft = initCampaignFromDraft;
window.renderCampaignPage = renderCampaignPage;