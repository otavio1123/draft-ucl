/* ===================================================== */
/* ENCURTA NOME DO JOGADOR */
/* Exemplo: Víctor Valdés -> V. Valdés */
/* ===================================================== */

function getShortPlayerName(fullName) {
  if (!fullName) return "";

  const parts = fullName.trim().split(" ").filter(Boolean);

  if (parts.length === 1) {
    return parts[0];
  }

  const firstName = parts[0];
  const lastName = parts[parts.length - 1];

  return `${firstName.charAt(0)}. ${lastName}`;
}

/* Garante acesso global */
window.getShortPlayerName = getShortPlayerName;