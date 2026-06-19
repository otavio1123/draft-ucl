/* ===================================================== */
/* SHARECARD.JS - COMPARTILHAR / BAIXAR IMAGENS */
/* ===================================================== */

const SHARE_SITE_URL = "https://meudraft.com";

function getShareMessage(type = "card") {
  const baseMessage = type === "campaign"
    ? "Veja minha campanha no MeuDraft"
    : "Montei meu time dos sonhos no MeuDraft!";

  if (SHARE_SITE_URL) {
return `${baseMessage} ${SHARE_SITE_URL}`;  }

  return baseMessage;
}

function isMobileDevice() {
  return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
}

document.addEventListener("click", async (event) => {
  const clickedElement = event.target;

  if (!(clickedElement instanceof Element)) {
    return;
  }

  const cardButton = clickedElement.closest("#shareImageButton");
  const campaignButton = clickedElement.closest("#shareCampaignButton");

  if (cardButton) {
    await handleShareImage(cardButton, {
      elementId: "finalCard",
      fileName: "draft-champions-card.png",
      title: "DRAFT Champions",
      type: "card"
    });

    return;
  }

  if (campaignButton) {
    await handleShareImage(campaignButton, {
      elementId: "campaignGamesCapture",
      fileName: "draft-champions-campanha.png",
      title: "DRAFT Champions - Campanha",
      type: "campaign"
    });
  }
});

async function handleShareImage(button, options) {
  const targetElement = document.getElementById(options.elementId);

  if (!targetElement) {
    alert("Imagem não encontrada para gerar o arquivo.");
    return;
  }

  if (typeof html2canvas === "undefined") {
    alert("html2canvas não foi carregado. Confira o script no HTML.");
    return;
  }

  const originalButtonText = button.textContent;

  try {
    button.disabled = true;
    button.textContent = "GERANDO IMAGEM...";

    const canvas = await html2canvas(targetElement, {
      backgroundColor: null,
      scale: 2,
      useCORS: true
    });

    const blob = await canvasToBlob(canvas);

    if (!blob) {
      throw new Error("Não foi possível gerar a imagem.");
    }

    const isMobile = isMobileDevice();

    if (!isMobile) {
      downloadBlob(blob, options.fileName);
      return;
    }

    const file = new File([blob], options.fileName, {
      type: "image/png"
    });

    const canShareFile =
      navigator.share &&
      navigator.canShare &&
      navigator.canShare({ files: [file] });

    if (canShareFile) {
      try {
        await navigator.share({
          title: options.title,
          text: getShareMessage(options.type),
          files: [file]
        });
      } catch (error) {
        if (error.name === "AbortError") {
          return;
        }

        console.warn("Falha no compartilhamento nativo. Baixando imagem.", error);
        downloadBlob(blob, options.fileName);
      }
    } else {
      downloadBlob(blob, options.fileName);
    }
  } catch (error) {
    console.error("Erro ao gerar/compartilhar imagem:", error);
    alert("Não foi possível gerar a imagem. Tente novamente.");
  } finally {
    button.disabled = false;
    button.textContent = originalButtonText;
  }
}

function canvasToBlob(canvas) {
  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      resolve(blob);
    }, "image/png", 1);
  });
}

function downloadBlob(blob, fileName) {
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;

  document.body.appendChild(link);
  link.click();
  link.remove();

  URL.revokeObjectURL(url);
}