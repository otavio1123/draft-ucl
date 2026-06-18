document.addEventListener("DOMContentLoaded", () => {
  console.log("MAIN carregou");

  /*
    Modo claro removido.
    Não chamar initThemeToggle(), porque o jogo ficará apenas no modo escuro.
  */

  if (document.querySelector(".draft-page")) {
    console.log("Tela draft encontrada");

    if (typeof initDraftPage === "function") {
      initDraftPage();
      console.log("initDraftPage executado");
    } else {
      console.error("initDraftPage não foi encontrada. Verifique renderDraft.js");
    }
  }
});