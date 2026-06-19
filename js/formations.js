/* ===================================================== */
/* FORMATIONS.JS - FORMAÇÕES, ESTILOS E POSIÇÕES */
/* ===================================================== */

/*
  Este arquivo cuida de:
  - quais formações existem;
  - onde cada posição aparece no campo;
  - como o estilo muda a formação;
  - quais posições cada jogador pode ocupar.
*/

/* ===================================================== */
/* LISTA DE FORMAÇÕES DISPONÍVEIS */
/* ===================================================== */

const formationOptions = [
  "4-3-3",
  "4-4-2",
  "4-2-3-1",
  "3-5-2",
  "3-4-3",
  "5-3-2",
  "5-4-1"
];

/* ===================================================== */
/* LISTA DE ESTILOS DISPONÍVEIS */
/* ===================================================== */

const styleOptions = [
  "Defensivo",
  "Equilibrado",
  "Ofensivo"
];

/* ===================================================== */
/* FORMAÇÕES BASE */
/* x = posição horizontal no campo */
/* y = posição vertical no campo */
/* Quanto menor o y, mais perto do ataque */
/* Quanto maior o y, mais perto do goleiro */
/* ===================================================== */

const formationTemplates = {
"4-3-3": [
 { code: "PE", label: "PE", x: 13, y: 25 },
  { code: "CA", label: "CA", x: 50, y: 14 },
  { code: "PD", label: "PD", x: 87, y: 25 },

  { code: "MEI", label: "MEI", x: 30, y: 47 },
  { code: "MC", label: "MC", x: 70, y: 47 },
  { code: "VOL", label: "VOL", x: 50, y: 58 },

  { code: "LE", label: "LE", x: 14, y: 70 },
  { code: "ZAG", label: "ZAG", x: 36, y: 74 },
  { code: "ZAG", label: "ZAG", x: 64, y: 74 },
  { code: "LD", label: "LD", x: 86, y: 70 },
{ code: "GOL", label: "GOL", x: 50, y: 88 }],

  "4-4-2": [
  { code: "CA", label: "CA", x: 39, y: 18 },
  { code: "CA", label: "CA", x: 61, y: 18 },

  { code: "ME", label: "ME", x: 13, y: 39 },
  { code: "MC", label: "MC", x: 38, y: 45 },
  { code: "VOL", label: "VOL", x: 62, y: 45 },
  { code: "MD", label: "MD", x: 87, y: 39 },

  { code: "LE", label: "LE", x: 14, y: 71 },
  { code: "ZAG", label: "ZAG", x: 38, y: 77 },
  { code: "ZAG", label: "ZAG", x: 62, y: 77 },
  { code: "LD", label: "LD", x: 86, y: 71 },

    { code: "GOL", label: "GOL", x: 50, y: 90 }
  ],

"4-2-3-1": [
  { code: "CA", label: "CA", x: 50, y: 20 },

  { code: "PE", label: "PE", x: 18, y: 36 },
  { code: "MEI", label: "MEI", x: 50, y: 36 },
  { code: "PD", label: "PD", x: 82, y: 36 },

  { code: "VOL", label: "VOL", x: 37, y: 52 },
  { code: "VOL", label: "VOL", x: 63, y: 52 },

  { code: "LE", label: "LE", x: 14, y: 72 },
  { code: "ZAG", label: "ZAG", x: 38, y: 78 },
  { code: "ZAG", label: "ZAG", x: 62, y: 78 },
  { code: "LD", label: "LD", x: 86, y: 72 },

  { code: "GOL", label: "GOL", x: 50, y: 90 }
],

  "3-5-2": [
  { code: "CA", label: "CA", x: 42, y: 18 },
  { code: "CA", label: "CA", x: 58, y: 18 },

  { code: "ALA", label: "ALA", x: 14, y: 43 },
{ code: "MC", label: "MC", x: 35, y: 49 },
  { code: "MEI", label: "MEI", x: 50, y: 39 },
  { code: "VOL", label: "VOL", x: 65, y: 49 },
  { code: "ALA", label: "ALA", x: 86, y: 43 },

  { code: "ZAG", label: "ZAG", x: 30, y: 74 },
  { code: "ZAG", label: "ZAG", x: 50, y: 78 },
  { code: "ZAG", label: "ZAG", x: 70, y: 74 },

    { code: "GOL", label: "GOL", x: 50, y: 90 }
  ],

  "3-4-3": [
    { code: "PE", label: "PE", x: 18, y: 22 },
    { code: "CA", label: "CA", x: 50, y: 16 },
    { code: "PD", label: "PD", x: 82, y: 22 },

    { code: "ALA", label: "ALA", x: 16, y: 46 },
    { code: "MC", label: "MC", x: 38, y: 48 },
    { code: "VOL", label: "VOL", x: 62, y: 48 },
    { code: "ALA", label: "ALA", x: 84, y: 46 },

    { code: "ZAG", label: "ZAG", x: 30, y: 76 },
    { code: "ZAG", label: "ZAG", x: 50, y: 72 },
    { code: "ZAG", label: "ZAG", x: 70, y: 76 },

{ code: "GOL", label: "GOL", x: 50, y: 90 }  ],

"5-3-2": [
  { code: "CA",  label: "CA",  x: 39, y: 18 },
  { code: "CA",  label: "CA",  x: 61, y: 18 },

  { code: "MC",  label: "MC",  x: 32, y: 43 },
  { code: "MEI", label: "MEI", x: 50, y: 36 },
  { code: "VOL", label: "VOL", x: 68, y: 43 },

  { code: "ALA", label: "ALA", x: 16, y: 58 },
  { code: "ZAG", label: "ZAG", x: 34, y: 75 },
  { code: "ZAG", label: "ZAG", x: 50, y: 77 },
  { code: "ZAG", label: "ZAG", x: 66, y: 75 },
  { code: "ALA", label: "ALA", x: 84, y: 58 },

  { code: "GOL", label: "GOL", x: 50, y: 90 }
],
"5-4-1": [
  { code: "CA", label: "CA", x: 50, y: 19 },

  { code: "ME", label: "ME", x: 24, y: 30 },
  { code: "MC", label: "MC", x: 41, y: 42 },
  { code: "VOL", label: "VOL", x: 59, y: 47 },
  { code: "MD", label: "MD", x: 76, y: 30 },

  { code: "ALA", label: "ALA", x: 14, y: 60 },
  { code: "ZAG", label: "ZAG", x: 31, y: 74 },
  { code: "ZAG", label: "ZAG", x: 50, y: 77 },
  { code: "ZAG", label: "ZAG", x: 69, y: 74 },
  { code: "ALA", label: "ALA", x: 86, y: 60 },

  { code: "GOL", label: "GOL", x: 50, y: 90 }
]
};

/* ===================================================== */
/* POSIÇÕES ACEITAS */
/* Exemplo:
   Slot LD aceita jogador LD, LAT ou ALA.
*/
/* ===================================================== */

const acceptedMap = {
  GOL: ["GOL"],

  LD: ["LD", "LAT", "ALA"],
  LE: ["LE", "LAT", "ALA"],

  ZAG: ["ZAG"],

  VOL: ["VOL", "MC"],
  MC: ["MC", "VOL", "MEI"],
  MEI: ["MEI", "MC"],

  MD: ["MD", "PD", "ALA"],
  ME: ["ME", "PE", "ALA"],

  PD: ["PD", "MD", "PE"],
  PE: ["PE", "ME", "PD"],

  CA: ["CA", "ATA"],
  ATA: ["ATA", "CA", "PE", "PD"],

  ALA: ["ALA", "LD", "LE", "MD", "ME", "PD", "PE"]
};

/* ===================================================== */
/* CRIA O LAYOUT DA FORMAÇÃO */
/* Recebe formação + estilo e devolve os 11 slots prontos */
/* ===================================================== */

function buildLayout(formation = "4-3-3", style = "Equilibrado") {
  const template = formationTemplates[formation] || formationTemplates["4-3-3"];

  const layout = template.map((slot, index) => ({
    id: index,
    code: slot.code,
    label: slot.label,
    x: slot.x,
    y: slot.y,
    player: null
  }));

  applyStyleToLayout(layout, formation, style);

  // Ajusta espaçamento das formações que não são 4-3-3.
  // Isso vale também para Defensivo, Equilibrado e Ofensivo.
  adjustNon433LayoutSpacing(layout, formation);

  return layout;}

/* ===================================================== */
/* APLICA VARIAÇÕES DE ESTILO */
/*
  Defensivo:
  - recua ou troca algumas posições para VOL/LE/LD.

  Equilibrado:
  - mantém o desenho base da formação.

  Ofensivo:
  - adianta algumas posições para MEI/PE/PD.

  Segurança:
  - não altera jogadores;
  - não altera rating;
  - não altera regra de posição aceita;
  - só muda code/label/x/y dos slots.
*/
/* ===================================================== */

function applyStyleToLayout(layout, formation, style) {
  if (style === "Equilibrado") {
    return layout;
  }

  if (formation === "4-3-3") {
    apply433Style(layout, style);
    return layout;
  }

  if (formation === "4-4-2") {
    apply442Style(layout, style);
    return layout;
  }

  if (formation === "4-2-3-1") {
    apply4231Style(layout, style);
    return layout;
  }

  if (formation === "3-5-2") {
    apply352Style(layout, style);
    return layout;
  }

  if (formation === "3-4-3") {
    apply343Style(layout, style);
    return layout;
  }

  if (formation === "5-3-2") {
    apply532Style(layout, style);
    return layout;
  }

  if (formation === "5-4-1") {
    apply541Style(layout, style);
    return layout;
  }

  applyGenericStyle(layout, style);

  return layout;
}

/* ===================================================== */
/* 4-3-3 */
/* ===================================================== */

function apply433Style(layout, style) {
  const mids = getIndexesByCodes(layout, ["MEI", "MC", "VOL"]);

  if (style === "Defensivo") {
    setSlot(layout[mids[0]], "VOL", "VOL", 34, 49);
    setSlot(layout[mids[1]], "MC", "MC", 66, 49);
    setSlot(layout[mids[2]], "VOL", "VOL", 50, 60);
  }

if (style === "Ofensivo") {
  setSlot(layout[mids[0]], "MC", "MC", 34, 48);
  setSlot(layout[mids[1]], "MEI", "MEI", 50, 38);
  setSlot(layout[mids[2]], "MC", "MC", 66, 48);
}
}

/* ===================================================== */
/* 4-4-2 */
/* ===================================================== */

function apply442Style(layout, style) {
  const mids = getIndexesByCodes(layout, ["ME", "MC", "VOL", "MD"]);

if (style === "Defensivo") {
  setSlot(layout[mids[0]], "ME", "ME", 18, 42);
  setSlot(layout[mids[1]], "VOL", "VOL", 42, 50);
  setSlot(layout[mids[2]], "VOL", "VOL", 58, 50);
  setSlot(layout[mids[3]], "MD", "MD", 82, 42);
}

if (style === "Ofensivo") {
  setSlot(layout[mids[0]], "ME", "ME", 18, 40);
  setSlot(layout[mids[1]], "MEI", "MEI", 42, 38);
  setSlot(layout[mids[2]], "MC", "MC", 58, 49);
  setSlot(layout[mids[3]], "MD", "MD", 82, 40);
}
}

function apply4231Style(layout, style) {
  const mids = getIndexesByCodes(layout, ["MEI", "VOL", "VOL"]);

  if (style === "Defensivo") {
    /*
      4-2-3-1 Defensivo:
      - 2 VOL
      - 1 MC central no lugar do MEI
    */
    setSlot(layout[mids[0]], "MC", "MC", 50, 40);
    setSlot(layout[mids[1]], "VOL", "VOL", 37, 53);
    setSlot(layout[mids[2]], "VOL", "VOL", 63, 53);
  }

  if (style === "Ofensivo") {
    /*
      4-2-3-1 Ofensivo:
      - 1 MEI
      - 1 MC
      - 1 VOL
    */
    setSlot(layout[mids[0]], "MEI", "MEI", 50, 36);
    setSlot(layout[mids[1]], "MC", "MC", 37, 53);
    setSlot(layout[mids[2]], "VOL", "VOL", 63, 53);
  }
}
/* ===================================================== */
/* 3-5-2 */
/* ===================================================== */

function apply352Style(layout, style) {
  const mids = getIndexesByCodes(layout, ["ALA", "MC", "MEI", "VOL", "ALA"]);

if (style === "Defensivo") {
  setSlot(layout[mids[0]], "LE", "LE", 14, 43);
  setSlot(layout[mids[1]], "MC", "MC", 34, 44);
  setSlot(layout[mids[2]], "VOL", "VOL", 50, 54);
  setSlot(layout[mids[3]], "VOL", "VOL", 66, 44);
  setSlot(layout[mids[4]], "LD", "LD", 86, 43);
}
  if (style === "Ofensivo") {
    setSlot(layout[mids[0]], "PE", "PE", 16, 41);
    setSlot(layout[mids[1]], "MEI", "MEI", 36, 43);
    setSlot(layout[mids[2]], "MC", "MC", 50, 53);
    setSlot(layout[mids[3]], "MEI", "MEI", 64, 43);
    setSlot(layout[mids[4]], "PD", "PD", 84, 41);
  }
}
/* ===================================================== */
/* 3-4-3 */
/* ===================================================== */

function apply343Style(layout, style) {
  const mids = getIndexesByCodes(layout, ["ALA", "MC", "VOL", "ALA"]);

if (style === "Defensivo") {
  setSlot(layout[mids[0]], "LE", "LE", 16, 47);
  setSlot(layout[mids[1]], "VOL", "VOL", 40, 49);
  setSlot(layout[mids[2]], "VOL", "VOL", 60, 49);
  setSlot(layout[mids[3]], "LD", "LD", 84, 47);
}

  if (style === "Ofensivo") {
    setSlot(layout[mids[0]], "ME", "ME", 16, 43);
    setSlot(layout[mids[1]], "MEI", "MEI", 40, 45);
    setSlot(layout[mids[2]], "MC", "MC", 60, 49);
    setSlot(layout[mids[3]], "MD", "MD", 84, 43);
  }
}

/* ===================================================== */
/* 5-3-2 */
/* ===================================================== */

function apply532Style(layout, style) {
  const mids = getIndexesByCodes(layout, ["MEI", "MC", "VOL", "ALA", "ALA"]);

const attackers = getIndexesByCodes(layout, ["CA", "CA"]);

if (style === "Defensivo") {
  setSlot(layout[attackers[0]], "CA", "CA", 40, 18);
  setSlot(layout[attackers[1]], "CA", "CA", 60, 18);

  setSlot(layout[mids[0]], "MC", "MC", 33, 43);
  setSlot(layout[mids[1]], "VOL", "VOL", 50, 51);
  setSlot(layout[mids[2]], "VOL", "VOL", 67, 43);

  setSlot(layout[mids[3]], "LE", "LE", 12, 66);
  setSlot(layout[mids[4]], "LD", "LD", 88, 66);
}

if (style === "Ofensivo") {
  setSlot(layout[0], "CA", "CA", 40, 18);
  setSlot(layout[1], "CA", "CA", 60, 18);

setSlot(layout[mids[0]], "MEI", "MEI", 30, 41);
setSlot(layout[mids[1]], "MEI", "MEI", 50, 42);
setSlot(layout[mids[2]], "MC", "MC", 70, 41);

  setSlot(layout[mids[3]], "ALA", "ALA", 12, 64);
  setSlot(layout[mids[4]], "ALA", "ALA", 88, 64);
}
}

/* ===================================================== */
/* 5-4-1 */
/* ===================================================== */

function apply541Style(layout, style) {
  const mids = getIndexesByCodes(layout, ["ME", "MC", "VOL", "MD", "ALA", "ALA"]);

if (style === "Defensivo") {
  setSlot(layout[mids[0]], "ME", "ME", 18, 35);
  setSlot(layout[mids[1]], "VOL", "VOL", 40, 49);
  setSlot(layout[mids[2]], "VOL", "VOL", 60, 49);
  setSlot(layout[mids[3]], "MD", "MD", 82, 35);

  setSlot(layout[mids[4]], "LE", "LE", 12, 66);
  setSlot(layout[mids[5]], "LD", "LD", 88, 66);
}

if (style === "Ofensivo") {
  setSlot(layout[mids[0]], "PE", "PE", 18, 36);
  setSlot(layout[mids[1]], "MEI", "MEI", 40, 44);
  setSlot(layout[mids[2]], "MC", "MC", 60, 48);
  setSlot(layout[mids[3]], "PD", "PD", 82, 36);

  setSlot(layout[mids[4]], "ALA", "ALA", 12, 65);
  setSlot(layout[mids[5]], "ALA", "ALA", 88, 65);
}
}

/* ===================================================== */
/* ESTILO GENÉRICO */
/* Usado como segurança caso alguma formação nova seja criada */
/* ===================================================== */

function applyGenericStyle(layout, style) {
  if (style === "Defensivo") {
    const meiIndex = layout.findIndex((slot) => slot.code === "MEI");

    if (meiIndex !== -1) {
      layout[meiIndex].code = "VOL";
      layout[meiIndex].label = "VOL";
      layout[meiIndex].y += 6;
      return;
    }

    const mcIndex = layout.findIndex((slot) => slot.code === "MC");

    if (mcIndex !== -1) {
      layout[mcIndex].code = "VOL";
      layout[mcIndex].label = "VOL";
      layout[mcIndex].y += 5;
    }
  }

  if (style === "Ofensivo") {
    const volIndex = layout.findIndex((slot) => slot.code === "VOL");

    if (volIndex !== -1) {
      layout[volIndex].code = "MEI";
      layout[volIndex].label = "MEI";
      layout[volIndex].y -= 6;
    }
  }
}
/* ===================================================== */
/* CRIA LAYOUT MOBILE */
/*
  Objetivo:
  - usar o layout normal como base;
  - manter o desktop intacto;
  - aplicar apenas pequenos ajustes visuais no mobile;
  - evitar regras gerais agressivas que bagunçam formações.
*/
/* ===================================================== */

function buildMobileLayout(formation = "4-3-3", style = "Equilibrado") {
  const layout = buildLayout(formation, style);

  /*
    Aplica somente correções pequenas e específicas.
    Nada de ajuste geral em todos os jogadores.
  */
  applyMobileLayoutFineTuning(layout, formation, style);

  return layout;
}

/* ===================================================== */
/* AJUSTES FINOS MOBILE DAS FORMAÇÕES */
/*
  Versão segura.

  Objetivo:
  - mexer somente em casos específicos;
  - manter o desenho original das formações;
  - evitar sobreposição no campo mobile;
  - não alterar desktop;
  - não alterar posição aceita;
  - não alterar jogador, overall, campanha ou simulação.

  Regra:
  - só mexer em x/y;
  - fazer ajustes pequenos;
  - cada formação/estilo fica isolado.
*/
/* ===================================================== */

function applyMobileLayoutFineTuning(layout, formation = "4-3-3", style = "Equilibrado") {
  if (!Array.isArray(layout)) {
    return layout;
  }

  const normalizedFormation = String(formation).trim();
  const normalizedStyle = String(style).trim().toLowerCase();

  const key = `${normalizedFormation}|${normalizedStyle}`;

  const getSlotsByCode = (code) => {
    return layout.filter((slot) => slot && slot.code === code);
  };

  const setMobileSlot = (slot, x, y) => {
    if (!slot) return;

    slot.x = x;
    slot.y = y;
  };

  /*
    5-3-2 Equilibrado
    Pequeno ajuste:
    - abre os dois CA;
    - dá respiro ao trio MC / MEI / VOL;
    - abre um pouco os alas;
    - organiza os 3 zagueiros.
  */
  if (key === "5-3-2|equilibrado") {
    const cas = getSlotsByCode("CA");
    const alas = getSlotsByCode("ALA");
    const mc = getSlotsByCode("MC")[0];
    const mei = getSlotsByCode("MEI")[0];
    const vol = getSlotsByCode("VOL")[0];
    const zags = getSlotsByCode("ZAG");

    setMobileSlot(cas[0], 37, 18);
    setMobileSlot(cas[1], 63, 18);

    setMobileSlot(mei, 50, 39);
    setMobileSlot(mc, 35, 49);
    setMobileSlot(vol, 65, 49);

    setMobileSlot(alas[0], 13, 58);
    setMobileSlot(alas[1], 87, 58);

    setMobileSlot(zags[0], 29, 72);
    setMobileSlot(zags[1], 50, 75);
    setMobileSlot(zags[2], 71, 72);
  }

  /*
    5-3-2 Ofensivo
    Pequeno ajuste:
    - abre os dois CA;
    - separa os dois MEI e o MC;
    - mantém alas abertos.
  */
  if (key === "5-3-2|ofensivo") {
    const cas = getSlotsByCode("CA");
    const alas = getSlotsByCode("ALA");
    const mc = getSlotsByCode("MC")[0];
    const meis = getSlotsByCode("MEI");
    const zags = getSlotsByCode("ZAG");

    setMobileSlot(cas[0], 37, 18);
    setMobileSlot(cas[1], 63, 18);

    setMobileSlot(meis[0], 37, 43);
    setMobileSlot(meis[1], 50, 40);
    setMobileSlot(mc, 63, 43);

    setMobileSlot(alas[0], 13, 59);
    setMobileSlot(alas[1], 87, 59);

    setMobileSlot(zags[0], 29, 72);
    setMobileSlot(zags[1], 50, 75);
    setMobileSlot(zags[2], 71, 72);
  }

 /*
  4-3-3 Equilibrado
  Ajuste mobile:
  - abre mais MEI e MC;
  - mantém VOL centralizado;
  - sobe um pouco LE e LD.
*/
if (key === "4-3-3|equilibrado") {
  const mei = getSlotsByCode("MEI")[0];
  const mc = getSlotsByCode("MC")[0];
  const vol = getSlotsByCode("VOL")[0];

  const le = getSlotsByCode("LE")[0];
  const ld = getSlotsByCode("LD")[0];

  /*
    Meio:
    mais espaço entre MEI e MC.
  */
  setMobileSlot(mei, 30, 44);
  setMobileSlot(mc, 70, 44);
  setMobileSlot(vol, 50, 59);

  /*
    Laterais:
    sobem um pouco no campo.
  */
  setMobileSlot(le, 14, 63);
  setMobileSlot(ld, 86, 63);
}

 /*
  4-3-3 Defensivo
  Ajuste mobile:
  - abre mais os dois jogadores da primeira linha;
  - mantém um VOL central mais atrás;
  - sobe um pouco LE e LD.
*/
if (key === "4-3-3|defensivo") {
  const mc = getSlotsByCode("MC")[0];
  const vols = getSlotsByCode("VOL");

  const le = getSlotsByCode("LE")[0];
  const ld = getSlotsByCode("LD")[0];

  /*
    Meio:
    dois jogadores abertos e um volante central atrás.
  */
  setMobileSlot(vols[0], 30, 47);
  setMobileSlot(mc, 70, 47);
  setMobileSlot(vols[1], 50, 61);

  /*
    Laterais:
    sobem um pouco no campo.
  */
  setMobileSlot(le, 14, 65);
  setMobileSlot(ld, 86, 65);
}

/*
  4-3-3 Ofensivo
  Ajuste mobile:
  - mantém MEI central avançado;
  - abre mais os dois MC;
  - sobe um pouco LE e LD.
*/
if (key === "4-3-3|ofensivo") {
  const meis = getSlotsByCode("MEI");
  const mcs = getSlotsByCode("MC");

  const le = getSlotsByCode("LE")[0];
  const ld = getSlotsByCode("LD")[0];

  /*
    Meio:
    MEI central e MCs mais espaçados.
  */
  setMobileSlot(meis[0], 50, 38);
  setMobileSlot(mcs[0], 30, 51);
  setMobileSlot(mcs[1], 70, 51);

  /*
    Laterais:
    sobem um pouco no campo.
  */
  setMobileSlot(le, 14, 65);
  setMobileSlot(ld, 86, 65);
}
/*
  4-4-2 Defensivo
  Ajuste mobile:
  - abre melhor os dois CA;
  - mantém ME e MD abertos;
  - separa bem os dois VOL;
  - sobe levemente LE e LD;
  - ajusta os dois ZAG para não ficarem colados.
*/
if (key === "4-4-2|defensivo") {
  const cas = getSlotsByCode("CA");

  const me = getSlotsByCode("ME")[0];
  const md = getSlotsByCode("MD")[0];

  const vols = getSlotsByCode("VOL");

  const le = getSlotsByCode("LE")[0];
  const ld = getSlotsByCode("LD")[0];

  const zags = getSlotsByCode("ZAG");

  /*
    Ataque:
    dois CA mais separados.
  */
  setMobileSlot(cas[0], 32, 18);
  setMobileSlot(cas[1], 68, 18);

  /*
    Lados:
    ME e MD abertos, sem subir demais.
  */
  setMobileSlot(me, 14, 40);
  setMobileSlot(md, 86, 40);

  /*
    Meio defensivo:
    dois VOL bem separados para não sobrepor.
  */
  setMobileSlot(vols[0], 33, 54);
  setMobileSlot(vols[1], 67, 54);

  /*
    Laterais:
    sobem um pouco no campo.
  */
  setMobileSlot(le, 14, 66);
  setMobileSlot(ld, 86, 66);

  /*
    Zaga:
    dois zagueiros um pouco mais separados.
  */
  setMobileSlot(zags[0], 35, 75);
  setMobileSlot(zags[1], 65, 75);
}
/*
  4-4-2 Equilibrado
  Ajuste mobile:
  - abre um pouco os dois CA;
  - dá mais espaço para ME / MC / VOL / MD;
  - sobe levemente LE e LD.
*/
if (key === "4-4-2|equilibrado") {
  const cas = getSlotsByCode("CA");

  const me = getSlotsByCode("ME")[0];
  const md = getSlotsByCode("MD")[0];
  const mc = getSlotsByCode("MC")[0];
  const vol = getSlotsByCode("VOL")[0];

  const le = getSlotsByCode("LE")[0];
  const ld = getSlotsByCode("LD")[0];

  /*
    Ataque:
    dois CA um pouco mais abertos.
  */
  setMobileSlot(cas[0], 32, 18);
  setMobileSlot(cas[1], 66, 18);

  /*
    Meio:
    ME e MD abertos;
    MC e VOL com mais espaço no centro.
  */
  setMobileSlot(me, 14, 38);
  setMobileSlot(mc, 33, 53);
  setMobileSlot(vol, 65, 53);
  setMobileSlot(md, 86, 38);

  /*
    Laterais:
    sobem um pouco no campo.
  */
  setMobileSlot(le, 14, 66);
  setMobileSlot(ld, 86, 66);
}
/*
  4-4-2 Ofensivo
  Ajuste mobile:
  - abre melhor os dois CA;
  - sobe ME e MD para apoiar o ataque;
  - separa bem MEI e MC para não ficarem em cima quando tiver jogador escalado.
*/
if (key === "4-4-2|ofensivo") {
  const cas = getSlotsByCode("CA");

  const me = getSlotsByCode("ME")[0];
  const md = getSlotsByCode("MD")[0];

  const mei = getSlotsByCode("MEI")[0];
  const mc = getSlotsByCode("MC")[0];

  /*
    Ataque:
    dois CA mais separados.
  */
  setMobileSlot(cas[0], 32, 18);
  setMobileSlot(cas[1], 68, 18);

  /*
    Lados:
    ME e MD mais à frente.
    y menor = sobe no campo.
  */
  setMobileSlot(me, 15, 36);
  setMobileSlot(md, 85, 36);

  /*
    Meio:
    MEI mais à esquerda e mais alto;
    MC mais à direita e mais baixo.
    Isso evita sobreposição quando o card do jogador aparece.
  */
  setMobileSlot(mei, 38, 44);
  setMobileSlot(mc, 62, 53);
}
/*
  4-2-3-1 Defensivo
  Ajuste mobile:
  - abre mais os dois VOL;
  - mantém o MEI centralizado;
  - evita que os cards dos volantes fiquem um em cima do outro.
*/
if (key === "4-2-3-1|defensivo") {
  const mei = getSlotsByCode("MEI")[0];
  const vols = getSlotsByCode("VOL");

  /*
    MEI:
    centralizado, um pouco acima dos volantes.
  */
  setMobileSlot(mei, 50, 40);

  /*
    Volantes:
    mais abertos na horizontal.
    x menor vai para esquerda.
    x maior vai para direita.
  */
  setMobileSlot(vols[0], 34, 55);
  setMobileSlot(vols[1], 66, 55);
}
/*
  4-2-3-1 Ofensivo
  Ajuste mobile:
  - mantém o MEI central mais avançado;
  - abre melhor o MEI de apoio e o MC;
  - evita sobreposição quando os jogadores forem escalados.
*/
if (key === "4-2-3-1|ofensivo") {
  const meis = getSlotsByCode("MEI");
  const mc = getSlotsByCode("MC")[0];

  /*
    MEI central:
    fica no centro e mais avançado.
  */
  setMobileSlot(meis[0], 50, 38);

  /*
    Segunda linha do meio:
    abre mais o MEI e o MC.
  */
  setMobileSlot(meis[1], 34, 52);
  setMobileSlot(mc, 66, 52);
}
/*
  3-5-2 Defensivo
  Ajuste mobile:
  - abre um pouco os dois CA;
  - organiza MC / VOL / VOL;
  - mantém LE e LD abertos;
  - abre melhor a linha de 3 zagueiros.
*/
if (key === "3-5-2|defensivo") {
  const cas = getSlotsByCode("CA");

  const le = getSlotsByCode("LE")[0];
  const ld = getSlotsByCode("LD")[0];

  const mc = getSlotsByCode("MC")[0];
  const vols = getSlotsByCode("VOL");

  const zags = getSlotsByCode("ZAG");

  /*
    Ataque:
    dois CA mais separados.
  */
  setMobileSlot(cas[0], 36, 18);
  setMobileSlot(cas[1], 64, 18);

  /*
    Laterais:
    bem abertos e um pouco mais à frente.
  */
  setMobileSlot(le, 12, 45);
  setMobileSlot(ld, 88, 45);

  /*
    Meio:
    MC e VOL abertos;
    VOL central mais atrás.
  */
  setMobileSlot(mc, 33, 50);
  setMobileSlot(vols[0], 67, 50);
  setMobileSlot(vols[1], 50, 63);

  /*
    Zaga:
    três zagueiros mais espaçados.
  */
  setMobileSlot(zags[0], 27, 73);
  setMobileSlot(zags[1], 50, 77);
  setMobileSlot(zags[2], 73, 73);
}
/*
  3-5-2 Equilibrado
  Ajuste mobile:
  - abre os dois CA;
  - alas mais abertos;
  - MEI central;
  - MC e VOL mais separados;
  - zagueiros bem distribuídos.
*/
if (key === "3-5-2|equilibrado") {
  const cas = getSlotsByCode("CA");
  const alas = getSlotsByCode("ALA");

  const mc = getSlotsByCode("MC")[0];
  const mei = getSlotsByCode("MEI")[0];
  const vol = getSlotsByCode("VOL")[0];

  const zags = getSlotsByCode("ZAG");

  /*
    Ataque:
    dois CA mais separados.
  */
  setMobileSlot(cas[0], 36, 18);
  setMobileSlot(cas[1], 64, 18);

  /*
    Alas:
    bem abertos e um pouco à frente.
  */
  setMobileSlot(alas[0], 12, 45);
  setMobileSlot(alas[1], 88, 45);

  /*
    Meio:
    MEI central mais alto;
    MC e VOL mais abertos.
  */
  setMobileSlot(mei, 50, 41);
  setMobileSlot(mc, 34, 54);
  setMobileSlot(vol, 66, 54);

  /*
    Zaga:
    abre a linha de 3.
  */
  setMobileSlot(zags[0], 27, 73);
  setMobileSlot(zags[1], 50, 77);
  setMobileSlot(zags[2], 73, 73);
}
/*
  3-5-2 Ofensivo
  Ajuste mobile:
  - abre os dois CA;
  - mantém PE e PD abertos;
  - separa os dois MEI e o MC;
  - abre melhor a zaga.
*/
if (key === "3-5-2|ofensivo") {
  const cas = getSlotsByCode("CA");

  const pe = getSlotsByCode("PE")[0];
  const pd = getSlotsByCode("PD")[0];

  const meis = getSlotsByCode("MEI");
  const mc = getSlotsByCode("MC")[0];

  const zags = getSlotsByCode("ZAG");

  /*
    Ataque:
    dois CA mais separados.
  */
  setMobileSlot(cas[0], 35, 18);
  setMobileSlot(cas[1], 65, 18);

  /*
    Pontas:
    mantêm amplitude.
  */
  setMobileSlot(pe, 13, 37);
  setMobileSlot(pd, 87, 37);

  /*
    Meio:
    dois MEI mais abertos;
    MC central mais atrás.
  */
  setMobileSlot(meis[0], 32, 50);
  setMobileSlot(meis[1], 68, 50);
  setMobileSlot(mc, 50, 62);

  /*
    Zaga:
    três zagueiros mais espaçados.
  */
  setMobileSlot(zags[0], 27, 73);
  setMobileSlot(zags[1], 50, 77);
  setMobileSlot(zags[2], 73, 73);
}
  /*
    3-4-3 Ofensivo
    Pequeno ajuste:
    - separa MEI e MC;
    - organiza linha de 3 zagueiros.
  */
  if (key === "3-4-3|ofensivo") {
    const mei = getSlotsByCode("MEI")[0];
    const mc = getSlotsByCode("MC")[0];
    const zags = getSlotsByCode("ZAG");

    setMobileSlot(mei, 40, 46);
    setMobileSlot(mc, 60, 50);

    setMobileSlot(zags[0], 30, 72);
    setMobileSlot(zags[1], 50, 69);
    setMobileSlot(zags[2], 70, 72);
  }
/*
  3-4-3 Defensivo
  Ajuste mobile:
  - mantém PE / CA / PD;
  - abre LE e LD;
  - separa os dois VOL;
  - recua e espaça o trio de zaga.
*/
if (key === "3-4-3|defensivo") {
  const ca = getSlotsByCode("CA")[0];
  const pe = getSlotsByCode("PE")[0];
  const pd = getSlotsByCode("PD")[0];

  const le = getSlotsByCode("LE")[0];
  const ld = getSlotsByCode("LD")[0];
  const vols = getSlotsByCode("VOL");

  const zags = getSlotsByCode("ZAG");

  /*
    Ataque:
    mantém o trio ofensivo bem distribuído.
  */
  setMobileSlot(pe, 13, 25);
  setMobileSlot(ca, 50, 16);
  setMobileSlot(pd, 87, 25);

  /*
    Laterais:
    mais abertos, sem subir demais.
  */
  setMobileSlot(le, 13, 48);
  setMobileSlot(ld, 87, 48);

  /*
    Meio:
    dois VOL mais separados.
  */
  setMobileSlot(vols[0], 36, 56);
  setMobileSlot(vols[1], 64, 56);

  /*
    Zaga:
    mais recuada e mais espaçada.
  */
  setMobileSlot(zags[0], 25, 76);
  setMobileSlot(zags[1], 50, 73);
  setMobileSlot(zags[2], 75, 76);
}
/*
  3-4-3 Equilibrado
  Ajuste mobile:
  - alas bem abertos;
  - MC e VOL separados;
  - trio de zaga mais recuado e espaçado.
*/
if (key === "3-4-3|equilibrado") {
  const ca = getSlotsByCode("CA")[0];
  const pe = getSlotsByCode("PE")[0];
  const pd = getSlotsByCode("PD")[0];

  const alas = getSlotsByCode("ALA");
  const mc = getSlotsByCode("MC")[0];
  const vol = getSlotsByCode("VOL")[0];

  const zags = getSlotsByCode("ZAG");

  /*
    Ataque:
    mantém PE / CA / PD.
  */
  setMobileSlot(pe, 13, 25);
  setMobileSlot(ca, 50, 16);
  setMobileSlot(pd, 87, 25);

  /*
    Alas:
    abertos e alinhados.
  */
  setMobileSlot(alas[0], 12, 47);
  setMobileSlot(alas[1], 88, 47);

  /*
    Meio:
    MC e VOL mais separados.
  */
  setMobileSlot(mc, 36, 56);
  setMobileSlot(vol, 64, 56);

  /*
    Zaga:
    mais recuada e aberta.
  */
  setMobileSlot(zags[0], 25, 76);
  setMobileSlot(zags[1], 50, 73);
  setMobileSlot(zags[2], 75, 76);
}
/*
  3-4-3 Ofensivo
  Ajuste mobile:
  - mantém PE / CA / PD;
  - ME e MD abertos;
  - separa MEI e MC;
  - recua e espaça o trio de zaga.
*/
if (key === "3-4-3|ofensivo") {
  const ca = getSlotsByCode("CA")[0];
  const pe = getSlotsByCode("PE")[0];
  const pd = getSlotsByCode("PD")[0];

  const me = getSlotsByCode("ME")[0];
  const md = getSlotsByCode("MD")[0];
  const mei = getSlotsByCode("MEI")[0];
  const mc = getSlotsByCode("MC")[0];

  const zags = getSlotsByCode("ZAG");

  /*
    Ataque:
    trio ofensivo bem aberto.
  */
  setMobileSlot(pe, 13, 25);
  setMobileSlot(ca, 50, 16);
  setMobileSlot(pd, 87, 25);

  /*
    Lados:
    ME e MD abertos.
  */
  setMobileSlot(me, 13, 47);
  setMobileSlot(md, 87, 47);

  /*
    Meio:
    MEI e MC separados para não sobrepor.
  */
  setMobileSlot(mei, 37, 55);
  setMobileSlot(mc, 63, 55);

  /*
    Zaga:
    mais recuada e mais espaçada.
  */
  setMobileSlot(zags[0], 25, 76);
  setMobileSlot(zags[1], 50, 73);
  setMobileSlot(zags[2], 75, 76);
}
/*
  5-3-2 Defensivo
  Ajuste mobile:
  - abre os dois CA;
  - organiza MC / VOL / VOL;
  - mantém LE e LD abertos;
  - recua e espaça melhor os 3 ZAG.
*/
if (key === "5-3-2|defensivo") {
  const cas = getSlotsByCode("CA");

  const le = getSlotsByCode("LE")[0];
  const ld = getSlotsByCode("LD")[0];

  const mc = getSlotsByCode("MC")[0];
  const vols = getSlotsByCode("VOL");

  const zags = getSlotsByCode("ZAG");

  /*
    Ataque:
    dois CA um pouco mais abertos.
  */
  setMobileSlot(cas[0], 35, 18);
  setMobileSlot(cas[1], 65, 18);

  /*
    Meio:
    MC e VOL abertos;
    VOL central mais atrás.
  */
  setMobileSlot(mc, 34, 43);
  setMobileSlot(vols[0], 66, 43);
  setMobileSlot(vols[1], 50, 57);

  /*
    Laterais:
    bem abertos.
  */
  setMobileSlot(le, 12, 62);
  setMobileSlot(ld, 88, 62);

  /*
    Zaga:
    mais recuada e espaçada.
  */
  setMobileSlot(zags[0], 26, 75);
  setMobileSlot(zags[1], 50, 72);
  setMobileSlot(zags[2], 74, 75);
}
/*
  5-3-2 Equilibrado
  Ajuste mobile:
  - abre os dois CA;
  - mantém MEI central;
  - separa MC e VOL;
  - mantém alas bem abertos;
  - recua e espaça os 3 ZAG.
*/
if (key === "5-3-2|equilibrado") {
  const cas = getSlotsByCode("CA");
  const alas = getSlotsByCode("ALA");

  const mc = getSlotsByCode("MC")[0];
  const mei = getSlotsByCode("MEI")[0];
  const vol = getSlotsByCode("VOL")[0];

  const zags = getSlotsByCode("ZAG");

  /*
    Ataque:
    dois CA mais separados.
  */
  setMobileSlot(cas[0], 35, 18);
  setMobileSlot(cas[1], 65, 18);

  /*
    Meio:
    MEI central mais avançado;
    MC e VOL abertos.
  */
  setMobileSlot(mei, 50, 38);
  setMobileSlot(mc, 34, 50);
  setMobileSlot(vol, 66, 50);

  /*
    Alas:
    bem abertos.
  */
  setMobileSlot(alas[0], 12, 60);
  setMobileSlot(alas[1], 88, 60);

  /*
    Zaga:
    mais recuada e espaçada.
  */
  setMobileSlot(zags[0], 26, 75);
  setMobileSlot(zags[1], 50, 72);
  setMobileSlot(zags[2], 74, 75);
}
/*
  5-3-2 Ofensivo
  Ajuste mobile:
  - abre os dois CA;
  - separa os dois MEI e o MC;
  - mantém alas abertos;
  - recua e espaça os 3 ZAG.
*/
if (key === "5-3-2|ofensivo") {
  const cas = getSlotsByCode("CA");
  const alas = getSlotsByCode("ALA");

  const meis = getSlotsByCode("MEI");
  const mc = getSlotsByCode("MC")[0];

  const zags = getSlotsByCode("ZAG");

  /*
    Ataque:
    dois CA mais separados.
  */
  setMobileSlot(cas[0], 35, 18);
  setMobileSlot(cas[1], 65, 18);

  /*
    Meio:
    MEI central mais avançado;
    MEI esquerdo e MC direito mais abertos.
  */
  setMobileSlot(meis[0], 34, 51);
  setMobileSlot(meis[1], 50, 38);
  setMobileSlot(mc, 66, 51);

  /*
    Alas:
    bem abertos.
  */
  setMobileSlot(alas[0], 12, 61);
  setMobileSlot(alas[1], 88, 61);

  /*
    Zaga:
    mais recuada e espaçada.
  */
  setMobileSlot(zags[0], 26, 75);
  setMobileSlot(zags[1], 50, 72);
  setMobileSlot(zags[2], 74, 75);
}
/*
  5-4-1 Defensivo
  Ajuste mobile:
  - mantém CA central;
  - ME e MD abertos;
  - abre os dois VOL;
  - mantém LE e LD abertos;
  - recua e espaça o trio de zaga.
*/
if (key === "5-4-1|defensivo") {
  const ca = getSlotsByCode("CA")[0];

  const me = getSlotsByCode("ME")[0];
  const md = getSlotsByCode("MD")[0];

  const vols = getSlotsByCode("VOL");

  const le = getSlotsByCode("LE")[0];
  const ld = getSlotsByCode("LD")[0];

  const zags = getSlotsByCode("ZAG");

  /*
    Ataque:
    CA centralizado.
  */
  setMobileSlot(ca, 50, 18);

  /*
    Lados:
    ME e MD abertos e um pouco à frente.
  */
  setMobileSlot(me, 16, 36);
  setMobileSlot(md, 84, 36);

  /*
    Meio:
    dois VOL mais separados.
  */
  setMobileSlot(vols[0], 35, 52);
  setMobileSlot(vols[1], 65, 52);

  /*
    Laterais:
    bem abertos.
  */
  setMobileSlot(le, 12, 62);
  setMobileSlot(ld, 88, 62);

  /*
    Zaga:
    mais recuada e espaçada.
  */
  setMobileSlot(zags[0], 26, 75);
  setMobileSlot(zags[1], 50, 73);
  setMobileSlot(zags[2], 74, 75);
}
/*
  5-4-1 Equilibrado
  Ajuste mobile:
  - mantém CA central;
  - ME e MD abertos;
  - separa MC e VOL;
  - alas bem abertos;
  - recua e espaça o trio de zaga.
*/
if (key === "5-4-1|equilibrado") {
  const ca = getSlotsByCode("CA")[0];

  const me = getSlotsByCode("ME")[0];
  const md = getSlotsByCode("MD")[0];

  const mc = getSlotsByCode("MC")[0];
  const vol = getSlotsByCode("VOL")[0];

  const alas = getSlotsByCode("ALA");
  const zags = getSlotsByCode("ZAG");

  /*
    Ataque:
    CA centralizado.
  */
  setMobileSlot(ca, 50, 18);

  /*
    Lados:
    ME e MD abertos e levemente avançados.
  */
  setMobileSlot(me, 16, 36);
  setMobileSlot(md, 84, 36);

  /*
    Meio:
    MC e VOL mais separados.
  */
  setMobileSlot(mc, 35, 52);
  setMobileSlot(vol, 65, 52);

  /*
    Alas:
    abertos na linha de cinco.
  */
  setMobileSlot(alas[0], 12, 62);
  setMobileSlot(alas[1], 88, 62);

  /*
    Zaga:
    mais recuada e espaçada.
  */
  setMobileSlot(zags[0], 26, 75);
  setMobileSlot(zags[1], 50, 73);
  setMobileSlot(zags[2], 74, 75);
}
/*
  5-4-1 Ofensivo
  Ajuste mobile:
  - mantém CA central;
  - PE e PD abertos;
  - separa MEI e MC;
  - alas bem abertos;
  - recua e espaça o trio de zaga.
*/
if (key === "5-4-1|ofensivo") {
  const ca = getSlotsByCode("CA")[0];

  const pe = getSlotsByCode("PE")[0];
  const pd = getSlotsByCode("PD")[0];

  const mei = getSlotsByCode("MEI")[0];
  const mc = getSlotsByCode("MC")[0];

  const alas = getSlotsByCode("ALA");
  const zags = getSlotsByCode("ZAG");

  /*
    Ataque:
    CA centralizado.
  */
  setMobileSlot(ca, 50, 18);

  /*
    Pontas:
    PE e PD abertos.
  */
  setMobileSlot(pe, 16, 34);
  setMobileSlot(pd, 84, 34);

  /*
    Meio:
    MEI e MC separados para não sobrepor.
  */
  setMobileSlot(mei, 36, 51);
  setMobileSlot(mc, 64, 51);

  /*
    Alas:
    bem abertos.
  */
  setMobileSlot(alas[0], 12, 62);
  setMobileSlot(alas[1], 88, 62);

  /*
    Zaga:
    mais recuada e espaçada.
  */
  setMobileSlot(zags[0], 26, 75);
  setMobileSlot(zags[1], 50, 73);
  setMobileSlot(zags[2], 74, 75);
}

  /*
    Segurança final:
    impede qualquer posição de sair do campo.
  */
  layout.forEach((slot) => {
    if (!slot) return;

    slot.x = Math.max(9, Math.min(91, slot.x));
    slot.y = Math.max(8, Math.min(92, slot.y));
  });

  return layout;
}
  /* ===================================================== */
/* ===================================================== */
/* AJUSTE GERAL DAS FORMAÇÕES QUE NÃO SÃO 4-3-3 */
/* ===================================================== */

/*
  Objetivo:
  - manter o 4-3-3 como está;
  - descer um pouco os meias das outras formações;
  - avançar um pouco os zagueiros;
  - aplicar isso também quando muda o estilo.
*/

function adjustNon433LayoutSpacing(layout, formation) {
  // Não mexe no 4-3-3, porque ele já está correto.
  if (formation === "4-3-3") {
    return;
  }

  layout.forEach((slot) => {
    const isMidfielder = ["ME", "MD", "MC", "MEI", "VOL", "ALA"].includes(slot.code);

    const isCenterBack = slot.code === "ZAG";

    /*
      Desce os meias.
      Regra:
      - só mexe em quem está no meio/ataque do campo;
      - não mexe em alas muito baixos, como os alas de linha de 5.
    */
    if (isMidfielder && slot.y < 60) {
      slot.y += 4;
    }

    /*
      Avança os zagueiros.
      No campo, y menor significa mais para frente.
    */
    if (isCenterBack) {
      slot.y -= 4;
    }
  });
}
/* ===================================================== */
/* FUNÇÕES AUXILIARES DE FORMAÇÃO */
/* ===================================================== */

/* Altera um slot com segurança */
function setSlot(slot, code, label, x, y) {
  if (!slot) return;

  slot.code = code;
  slot.label = label;
  slot.x = x;
  slot.y = y;
}

/* Pega os índices dos slots na ordem informada */
function getIndexesByCodes(layout, codes) {
  const usedIndexes = [];

  return codes.map((code) => {
    const foundIndex = layout.findIndex((slot, index) => {
      return slot.code === code && !usedIndexes.includes(index);
    });

    usedIndexes.push(foundIndex);

    return foundIndex;
  });
}

/* ===================================================== */
/* POSIÇÕES DO JOGADOR */
/* O jogador pode ter:
   - player.positions = ["MC", "VOL"]
   - ou só player.position = "MC"
*/
/* ===================================================== */

function getPlayerPositions(player) {
  if (!player) return [];

  if (Array.isArray(player.positions)) {
    return player.positions;
  }

  if (player.position) {
    return [player.position];
  }

  return [];
}

/* ===================================================== */
/* VERIFICA SE O JOGADOR PODE JOGAR NO SLOT */
/* ===================================================== */

function canPlayerPlayPosition(player, slotCode) {
  const playerPositions = getPlayerPositions(player);
  const acceptedPositions = acceptedMap[slotCode] || [slotCode];

  return playerPositions.some((position) => {
    return acceptedPositions.includes(position);
  });
}

/* ===================================================== */
/* EXPORTA PARA USAR EM OUTROS ARQUIVOS */
/* ===================================================== */

window.formationOptions = formationOptions;
window.styleOptions = styleOptions;
window.formationTemplates = formationTemplates;
window.acceptedMap = acceptedMap;

window.buildLayout = buildLayout;
window.buildMobileLayout = buildMobileLayout;

window.getPlayerPositions = getPlayerPositions;
window.canPlayerPlayPosition = canPlayerPlayPosition;