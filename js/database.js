
const underdogTeams = [
{
  id: "deportivo_2003_2004",
  club: "Deportivo La Coruña",
  season: "2003/2004",
  type: "Azarão histórico",
  categoryType: "underdog",
  tier: "medium",

  teamOverall: 83,
  finalPower: 84,
  attack: 83,
  midfield: 85,
  defense: 82,
  mentality: 86,
  chemistry: 85,
  championsExperience: 82,
  historicalWeight: 85,
  clutch: 86,
  consistency: 81,
  style: "Equilibrado",

  players: [
    // Ajustado: removidos reservas extras e posições reduzidas para maior realismo
    { position: "PE", positions: ["PE", "ATA"], name: "Albert Luque", rating: 84 },
    { position: "CA", positions: ["CA"], name: "Diego Tristán", rating: 83 },
    { position: "MD", positions: ["MD"], name: "Víctor Sánchez", rating: 80 },

    { position: "MEI", positions: ["MEI"], name: "Valerón", rating: 87 },
    { position: "MC", positions: ["MC"], name: "Sergio González", rating: 82 },
    { position: "VOL", positions: ["VOL", "MC"], name: "Mauro Silva", rating: 85 },

    { position: "LE", positions: ["LE"], name: "Joan Capdevila", rating: 81 },
    { position: "ZAG", positions: ["ZAG"], name: "Noureddine Naybet", rating: 82 },
    { position: "ZAG", positions: ["ZAG"], name: "Jorge Andrade", rating: 84 },
    { position: "LD", positions: ["LD", "ALA"], name: "Lionel Scaloni", rating: 80 },
    { position: "GOL", positions: ["GOL"], name: "José Molina", rating: 82 }
  ]
},

{
  id: "psv_2004_2005",
  club: "PSV",
  season: "2004/2005",
  type: "Azarão histórico",
  categoryType: "underdog",
  tier: "medium",

  teamOverall: 84,
  finalPower: 85,
  attack: 82,
  midfield: 86,
  defense: 83,
  mentality: 86,
  chemistry: 87,
  championsExperience: 82,
  historicalWeight: 85,
  clutch: 86,
  consistency: 84,
  style: "Equilibrado",

  players: [
    // Ajustado: removidos reservas extras e posições reduzidas para maior realismo
    { position: "PE", positions: ["PE", "ME"], name: "DaMarcus Beasley", rating: 80 },
    { position: "CA", positions: ["CA"], name: "Jan Vennegoor", rating: 81 },
    { position: "PD", positions: ["PD", "MD"], name: "Jefferson Farfán", rating: 83 },

    { position: "MEI", positions: ["MEI", "MC"], name: "Park Ji-sung", rating: 84 },
    { position: "MC", positions: ["MC", "VOL"], name: "Phillip Cocu", rating: 85 },
    { position: "VOL", positions: ["VOL", "MC"], name: "Mark van Bommel", rating: 86 },

    { position: "LE", positions: ["LE", "ALA"], name: "Young-pyo", rating: 81 },
    { position: "ZAG", positions: ["ZAG"], name: "Alex", rating: 85 },
    { position: "ZAG", positions: ["ZAG"], name: "Wilfred Bouma", rating: 82 },
    { position: "LD", positions: ["LD", "ZAG"], name: "André Ooijer", rating: 81 },
    { position: "GOL", positions: ["GOL"], name: "Heurelho Gomes", rating: 84 }
  ]
},

{
  id: "villarreal_2005_2006",
  club: "Villarreal",
  season: "2005/2006",
  type: "Azarão histórico",
  categoryType: "underdog",
  tier: "medium",

  teamOverall: 83,
  finalPower: 84,
  attack: 84,
  midfield: 86,
  defense: 81,
  mentality: 85,
  chemistry: 86,
  championsExperience: 80,
  historicalWeight: 84,
  clutch: 85,
  consistency: 82,
  style: "Equilibrado",

  players: [
    // Ajustado: removidos reservas extras e posições reduzidas para maior realismo
    { position: "ME", positions: ["ME", "LE"], name: "Juan Pablo Sorín", rating: 82 },
    { position: "CA", positions: ["CA"], name: "Diego Forlán", rating: 86 },
    { position: "MD", positions: ["MD", "MEI"], name: "Santi Cazorla", rating: 80 },

    { position: "MEI", positions: ["MEI"], name: "Román Riquelme", rating: 89 },
    { position: "MC", positions: ["MC", "VOL"], name: "Marcos Senna", rating: 84 },
    { position: "VOL", positions: ["VOL", "MC"], name: "Alessio Tacchinardi", rating: 81 },

    { position: "LE", positions: ["LE", "ALA"], name: " Arruabarrena", rating: 80 },
    { position: "ZAG", positions: ["ZAG"], name: "Gonzalo Rodríguez", rating: 82 },
    { position: "ZAG", positions: ["ZAG"], name: "Manuel Peña", rating: 80 },
    { position: "LD", positions: ["LD"], name: "Javi Venta", rating: 80 },
    { position: "GOL", positions: ["GOL"], name: "Sebastián Viera", rating: 81 }
  ]
},

{
  id: "schalke_2010_2011",
  club: "Schalke 04",
  season: "2010/2011",
  type: "Azarão histórico",
  categoryType: "underdog",
  tier: "medium",

  teamOverall: 82,
  finalPower: 82,
  attack: 83,
  midfield: 81,
  defense: 81,
  mentality: 84,
  chemistry: 80,
  championsExperience: 82,
  historicalWeight: 82,
  clutch: 83,
  consistency: 79,
  style: "Defensivo",

  players: [
    // Ajustado: removidos reservas extras, posições reduzidas e rating de Neuer balanceado
    { position: "MEI", positions: ["MEI", "ME"], name: "Manuel Jurado", rating: 79 },
    { position: "CA", positions: ["CA"], name: "Klaas-Jan Huntelaar", rating: 82 },
    { position: "MD", positions: ["MD", "PD"], name: "Jefferson Farfán", rating: 83 },
    { position: "ATA", positions: ["ATA", "CA"], name: "Raúl González", rating: 84 },

    { position: "MC", positions: ["MC", "VOL"], name: "Jermaine Jones", rating: 79 },
    { position: "VOL", positions: ["VOL", "ZAG"], name: "Joel Matip", rating: 80 },

    { position: "LE", positions: ["LE"], name: "Hans Sarpei", rating: 76 },
    { position: "ZAG", positions: ["ZAG"], name: "Benedikt Höwedes", rating: 82 },
    { position: "ZAG", positions: ["ZAG"], name: "Christoph Metzelder", rating: 78 },
    { position: "LD", positions: ["LD", "ALA"], name: "Atsuto Uchida", rating: 78 },
    { position: "GOL", positions: ["GOL"], name: "Manuel Neuer", rating: 88 }
  ]
},

{
  id: "shakhtar_2010_2011",
  club: "Shakhtar Donetsk",
  season: "2010/2011",
  type: "Azarão forte",
  categoryType: "underdog",
  tier: "medium",

  teamOverall: 83,
  finalPower: 83,
  attack: 84,
  midfield: 83,
  defense: 81,
  mentality: 83,
  chemistry: 85,
  championsExperience: 81,
  historicalWeight: 82,
  clutch: 82,
  consistency: 81,
  style: "Ofensivo",

  players: [
    // Ajustado: removidos reservas extras e posições reduzidas para maior realismo
    { position: "PE", positions: ["PE", "ME"], name: "Willian", rating: 85 },
    { position: "CA", positions: ["CA"], name: "Luiz Adriano", rating: 81 },
    { position: "PD", positions: ["PD", "MD"], name: "Douglas Costa", rating: 83 },

    { position: "MEI", positions: ["MEI", "MC"], name: "Jádson", rating: 83 },
    { position: "MC", positions: ["MC", "VOL"], name: "Fernandinho", rating: 84 },
    { position: "VOL", positions: ["VOL", "MC"], name: "Hübschman", rating: 80 },

    { position: "LE", positions: ["LE", "ALA"], name: "Răzvan Raț", rating: 80 },
    { position: "ZAG", positions: ["ZAG"], name: "Chygrynskiy", rating: 81 },
    { position: "ZAG", positions: ["ZAG"], name: "Rakitskiy", rating: 81 },
    { position: "LD", positions: ["LD", "ALA"], name: "Darijo Srna", rating: 85 },
    { position: "GOL", positions: ["GOL"], name: "Andriy Pyatov", rating: 81 }
  ]
},

{
  id: "malaga_2012_2013",
  club: "Málaga",
  season: "2012/2013",
  type: "Azarão histórico",
  categoryType: "underdog",
  tier: "medium",

  teamOverall: 83,
  finalPower: 84,
  attack: 82,
  midfield: 85,
  defense: 81,
  mentality: 85,
  chemistry: 86,
  championsExperience: 79,
  historicalWeight: 84,
  clutch: 85,
  consistency: 81,
  style: "Equilibrado",

  players: [
    // Ajustado: removidos reservas extras e posições reduzidas para maior realismo
    { position: "PE", positions: ["PE", "ME"], name: "Eliseu", rating: 80 },
    { position: "CA", positions: ["CA"], name: "Roque Santa Cruz", rating: 81 },
    { position: "MD", positions: ["MD", "PD"], name: "Joaquín", rating: 84 },

    { position: "MEI", positions: ["MEI"], name: "Isco", rating: 87 },
    { position: "MC", positions: ["MC", "VOL"], name: "Jérémy Toulalan", rating: 84 },
    { position: "VOL", positions: ["VOL", "MC"], name: "Ignacio Camacho", rating: 80 },

    { position: "LE", positions: ["LE"], name: "Antunes", rating: 78 },
    { position: "ZAG", positions: ["ZAG"], name: "Martín Demichelis", rating: 82 },
    { position: "ZAG", positions: ["ZAG"], name: "Weligton", rating: 80 },
    { position: "LD", positions: ["LD"], name: "Jesús Gámez", rating: 79 },
    { position: "GOL", positions: ["GOL"], name: "Willy Caballero", rating: 85 }
  ]
},

{
  id: "galatasaray_2012_2013",
  club: "Galatasaray",
  season: "2012/2013",
  type: "Azarão forte",
  categoryType: "underdog",
  tier: "medium",

  teamOverall: 83,
  finalPower: 84,
  attack: 85,
  midfield: 84,
  defense: 80,
  mentality: 86,
  chemistry: 83,
  championsExperience: 85,
  historicalWeight: 84,
  clutch: 86,
  consistency: 81,
  style: "Ofensivo",

  players: [
    // Ajustado: removidos reservas extras e posições reduzidas para maior realismo
    { position: "ATA", positions: ["ATA", "CA"], name: "Burak Yılmaz", rating: 83 },
    { position: "CA", positions: ["CA"], name: "Didier Drogba", rating: 85 },
    { position: "MD", positions: ["MD", "MC"], name: "Hamit Altıntop", rating: 80 },

    { position: "MEI", positions: ["MEI"], name: "Wesley Sneijder", rating: 86 },
    { position: "MC", positions: ["MC", "MEI"], name: "Selçuk İnan", rating: 83 },
    { position: "VOL", positions: ["VOL", "MC"], name: "Felipe Melo", rating: 83 },

    { position: "LE", positions: ["LE", "ME"], name: "Albert Riera", rating: 78 },
    { position: "ZAG", positions: ["ZAG"], name: "Semih Kaya", rating: 79 },
    { position: "ZAG", positions: ["ZAG"], name: "Dany Nounkeu", rating: 78 },
    { position: "LD", positions: ["LD", "ALA"], name: "Emmanuel Eboué", rating: 80 },
    { position: "GOL", positions: ["GOL"], name: "Fernando Muslera", rating: 85 }
  ]
},

{
  id: "porto_2014_2015",
  club: "Porto",
  season: "2014/2015",
  type: "Azarão forte",
  categoryType: "underdog",
  tier: "medium",

  teamOverall: 84,
  finalPower: 84,
  attack: 85,
  midfield: 83,
  defense: 83,
  mentality: 84,
  chemistry: 85,
  championsExperience: 83,
  historicalWeight: 85,
  clutch: 83,
  consistency: 83,
  style: "Equilibrado",

  players: [
    // Ajustado: removidos reservas extras e posições reduzidas para maior realismo
    { position: "PE", positions: ["PE", "ME"], name: "Yacine Brahimi", rating: 85 },
    { position: "CA", positions: ["CA"], name: "Jackson Martínez", rating: 86 },
    { position: "PD", positions: ["PD", "MD"], name: "Ricardo Quaresma", rating: 83 },

    { position: "MEI", positions: ["MEI", "MC"], name: "Óliver Torres", rating: 81 },
    { position: "MC", positions: ["MC", "VOL"], name: "Héctor Herrera", rating: 83 },
    { position: "VOL", positions: ["VOL", "MC"], name: "Casemiro", rating: 84 },

    { position: "LE", positions: ["LE", "ALA"], name: "Alex Sandro", rating: 84 },
    { position: "ZAG", positions: ["ZAG"], name: "Maicon", rating: 81 },
    { position: "ZAG", positions: ["ZAG"], name: "Iván Marcano", rating: 80 },
    { position: "LD", positions: ["LD", "ALA"], name: "Danilo", rating: 85 },
    { position: "GOL", positions: ["GOL"], name: "Fabiano", rating: 80 }
  ]
},

{
  id: "monaco_2016_2017",
  club: "Monaco",
  season: "2016/2017",
  type: "Azarão elite",
  categoryType: "underdog",
  tier: "strong",

  teamOverall: 86,
  finalPower: 87,
  attack: 88,
  midfield: 86,
  defense: 83,
  mentality: 86,
  chemistry: 89,
  championsExperience: 82,
  historicalWeight: 88,
  clutch: 87,
  consistency: 84,
  style: "Ofensivo",

  players: [
    // Ajustado: removidos reservas extras e posições reduzidas para maior realismo
    { position: "ME", positions: ["ME", "PE"], name: "Thomas Lemar", rating: 85 },
    { position: "CA", positions: ["CA"], name: "Radamel Falcao", rating: 87 },
    { position: "PD", positions: ["PD", "ATA"], name: "Kylian Mbappé", rating: 87 },

    { position: "MEI", positions: ["MEI", "MD"], name: "Bernardo Silva", rating: 86 },
    { position: "MC", positions: ["MC", "MEI"], name: "João Moutinho", rating: 83 },
    { position: "VOL", positions: ["VOL", "MC"], name: "Fabinho", rating: 85 },

    { position: "LE", positions: ["LE", "ALA"], name: "Benjamin Mendy", rating: 83 },
    { position: "ZAG", positions: ["ZAG"], name: "Jemerson", rating: 82 },
    { position: "ZAG", positions: ["ZAG"], name: "Kamil Glik", rating: 83 },
    { position: "LD", positions: ["LD", "ALA"], name: "Djibril Sidibé", rating: 82 },
    { position: "GOL", positions: ["GOL"], name: "Danijel Subašić", rating: 83 }
  ]
},

{
  id: "leicester_2016_2017",
  club: "Leicester City",
  season: "2016/2017",
  type: "Azarão",
  categoryType: "underdog",
  tier: "medium",

  teamOverall: 81,
  finalPower: 82,
  attack: 83,
  midfield: 79,
  defense: 80,
  mentality: 85,
  chemistry: 83,
  championsExperience: 77,
  historicalWeight: 82,
  clutch: 83,
  consistency: 79,
  style: "Defensivo",

  players: [
    // Ajustado: removidos reservas extras e posições reduzidas para maior realismo
    { position: "ME", positions: ["ME", "MD"], name: "Marc Albrighton", rating: 79 },
    { position: "CA", positions: ["CA"], name: "Jamie Vardy", rating: 83 },
    { position: "PD", positions: ["PD", "MD"], name: "Riyad Mahrez", rating: 85 },

    { position: "ATA", positions: ["ATA", "CA"], name: "Shinji Okazaki", rating: 79 },
    { position: "MC", positions: ["MC", "VOL"], name: "Danny Drinkwater", rating: 80 },
    { position: "VOL", positions: ["VOL", "MC"], name: "Wilfred Ndidi", rating: 79 },

    { position: "LE", positions: ["LE"], name: "Christian Fuchs", rating: 79 },
    { position: "ZAG", positions: ["ZAG"], name: "Robert Huth", rating: 79 },
    { position: "ZAG", positions: ["ZAG"], name: "Wes Morgan", rating: 79 },
    { position: "LD", positions: ["LD"], name: "Danny Simpson", rating: 77 },
    { position: "GOL", positions: ["GOL"], name: "Kasper Schmeichel", rating: 83 }
  ]
},

{
  id: "atalanta_2019_2020",
  club: "Atalanta",
  season: "2019/2020",
  type: "Azarão ofensivo",
  categoryType: "underdog",
  tier: "medium",

  teamOverall: 84,
  finalPower: 84,
  attack: 87,
  midfield: 84,
  defense: 81,
  mentality: 84,
  chemistry: 88,
  championsExperience: 78,
  historicalWeight: 84,
  clutch: 83,
  consistency: 82,
  style: "Ofensivo",

  players: [
    // Ajustado: removidos reservas extras e posições reduzidas para maior realismo
    { position: "MEI", positions: ["MEI", "PE"], name: "Papu Gómez", rating: 85 },
    { position: "CA", positions: ["CA"], name: "Duván Zapata", rating: 84 },
    { position: "ATA", positions: ["ATA", "CA"], name: "Josip Iličić", rating: 85 },

    { position: "MC", positions: ["MC", "MEI"], name: "Ruslan Malinovskyi", rating: 82 },
    { position: "MC", positions: ["MC"], name: "Mario Pašalić", rating: 81 },
    { position: "VOL", positions: ["VOL", "MC"], name: "Marten de Roon", rating: 82 },

    { position: "ALA", positions: ["ALA", "LE"], name: "Robin Gosens", rating: 84 },
    { position: "ZAG", positions: ["ZAG"], name: "José Luis Palomino", rating: 80 },
    { position: "ZAG", positions: ["ZAG"], name: "Rafael Tolói", rating: 80 },
    { position: "ALA", positions: ["ALA", "LD"], name: "Hans Hateboer", rating: 81 },
    { position: "GOL", positions: ["GOL"], name: "Pierluigi Gollini", rating: 81 }
  ]
},

{
  id: "rb_leipzig_2019_2020",
  club: "RB Leipzig",
  season: "2019/2020",
  type: "Azarão moderno",
  categoryType: "underdog",
  tier: "medium",

  teamOverall: 84,
  finalPower: 84,
  attack: 85,
  midfield: 83,
  defense: 84,
  mentality: 83,
  chemistry: 86,
  championsExperience: 78,
  historicalWeight: 84,
  clutch: 83,
  consistency: 83,
  style: "Equilibrado",

  players: [
    // Ajustado: removidos reservas extras e posições reduzidas para maior realismo
    { position: "MEI", positions: ["MEI", "PE"], name: "Christopher Nkunku", rating: 81 },
    { position: "CA", positions: ["CA"], name: "Timo Werner", rating: 84 },
    { position: "ATA", positions: ["ATA", "CA"], name: "Patrik Schick", rating: 82 },

    { position: "ME", positions: ["ME", "MEI"], name: "Emil Forsberg", rating: 82 },
    { position: "MC", positions: ["MC", "MD"], name: "Marcel Sabitzer", rating: 84 },
    { position: "VOL", positions: ["VOL", "MC"], name: "Konrad Laimer", rating: 82 },

    { position: "ALA", positions: ["ALA", "LE"], name: "Angeliño", rating: 81 },
    { position: "ZAG", positions: ["ZAG"], name: "Dayot Upamecano", rating: 84 },
    { position: "ZAG", positions: ["ZAG", "LD"], name: "Lukas Klostermann", rating: 82 },
    { position: "LD", positions: ["LD", "ALA"], name: "Nordi Mukiele", rating: 80 },
    { position: "GOL", positions: ["GOL"], name: "Péter Gulácsi", rating: 83 }
  ]
},

{
  id: "cska_moscow_2009_2010",
  club: "CSKA Moscow",
  season: "2009/2010",
  type: "Azarão de quartas",
  categoryType: "underdog",
  tier: "medium",

  teamOverall: 81,
  finalPower: 82,
  attack: 82,
  midfield: 81,
  defense: 79,
  mentality: 83,
  chemistry: 82,
  championsExperience: 78,
  historicalWeight: 80,
  clutch: 82,
  consistency: 79,
  style: "Defensivo",

  players: [
    // Ajustado: removidos reservas extras e posições reduzidas para maior realismo
    { position: "MD", positions: ["MD", "PD"], name: "Miloš Krasić", rating: 83 },
    { position: "CA", positions: ["CA"], name: "Tomáš Necid", rating: 79 },
    { position: "ATA", positions: ["ATA", "CA"], name: "Vágner Love", rating: 82 },

    { position: "MEI", positions: ["MEI", "MC"], name: "Keisuke Honda", rating: 82 },
    { position: "MC", positions: ["MC", "MEI"], name: "Alan Dzagoev", rating: 82 },
    { position: "VOL", positions: ["VOL", "MC"], name: "Elvir Rahimić", rating: 79 },

    { position: "LE", positions: ["LE"], name: "Georgi Shchennikov", rating: 77 },
    { position: "ZAG", positions: ["ZAG"], name: "Sergei Ignashevich", rating: 81 },
    { position: "ZAG", positions: ["ZAG"], name: "Vasili Berezutski", rating: 80 },
    { position: "LD", positions: ["LD", "ZAG"], name: "Aleksei Berezutski", rating: 79 },
    { position: "GOL", positions: ["GOL"], name: "Igor Akinfeev", rating: 83 }
  ]
},

{
  id: "apoel_2011_2012",
  club: "APOEL",
  season: "2011/2012",
  type: "Azarão histórico",
  categoryType: "underdog",
  tier: "underdog",

  teamOverall: 78,
  finalPower: 80,
  attack: 78,
  midfield: 79,
  defense: 79,
  mentality: 85,
  chemistry: 84,
  championsExperience: 76,
  historicalWeight: 80,
  clutch: 84,
  consistency: 77,
  style: "Defensivo",

  players: [
    // Ajustado: removidos reservas extras e posições reduzidas para maior realismo
    { position: "ATA", positions: ["ATA", "CA"], name: "Aílton Almeida", rating: 80 },
    { position: "CA", positions: ["CA"], name: "Esteban Solari", rating: 78 },
    { position: "ME", positions: ["ME", "MEI"], name: "Gustavo Manduca", rating: 78 },
    { position: "MD", positions: ["MD", "MEI"], name: "Charalambides", rating: 79 },

    { position: "MC", positions: ["MC"], name: "Hélio Pinto", rating: 77 },
    { position: "VOL", positions: ["VOL", "MC"], name: "Nuno Morais", rating: 79 },

    { position: "LE", positions: ["LE"], name: "William Boaventura", rating: 77 },
    { position: "ZAG", positions: ["ZAG"], name: "Paulo Jorge", rating: 78 },
    { position: "ZAG", positions: ["ZAG"], name: "Marcelo Oliveira", rating: 77 },
    { position: "LD", positions: ["LD"], name: "Poursaitidis", rating: 76 },
    { position: "GOL", positions: ["GOL"], name: "Dionisis Chiotis", rating: 80 }
  ]
},

{
  id: "club_brugge_2022_2023",
  club: "Club Brugge",
  season: "2022/2023",
  type: "Azarão de oitavas",
  categoryType: "underdog",
  tier: "medium",

  teamOverall: 82,
  finalPower: 82,
  attack: 81,
  midfield: 82,
  defense: 83,
  mentality: 84,
  chemistry: 84,
  championsExperience: 77,
  historicalWeight: 81,
  clutch: 83,
  consistency: 81,
  style: "Equilibrado",

  players: [
    // Ajustado: removidos reservas extras e posições reduzidas para maior realismo
    { position: "PE", positions: ["PE", "ME"], name: "Noa Lang", rating: 82 },
    { position: "CA", positions: ["CA"], name: "Ferran Jutglà", rating: 81 },
    { position: "PD", positions: ["PD"], name: "Skov Olsen", rating: 82 },

    { position: "MEI", positions: ["MEI", "MC"], name: "Hans Vanaken", rating: 84 },
    { position: "MC", positions: ["MC", "VOL"], name: "Raphael Onyedika", rating: 80 },
    { position: "VOL", positions: ["VOL", "MC"], name: "Mats Rits", rating: 79 },

    { position: "LE", positions: ["LE", "ALA"], name: "Bjorn Meijer", rating: 79 },
    { position: "ZAG", positions: ["ZAG"], name: "Brandon Mechele", rating: 80 },
    { position: "ZAG", positions: ["ZAG"], name: "Abakar Sylla", rating: 80 },
    { position: "LD", positions: ["LD", "ALA"], name: "Clinton Mata", rating: 80 },
    { position: "GOL", positions: ["GOL"], name: "Simon Mignolet", rating: 84 }
  ]
},

{
  id: "anderlecht_1985_1986",
  club: "Anderlecht",
  season: "1985/1986",
  type: "Azarão semifinalista",
  categoryType: "underdog",
  tier: "medium",

  teamOverall: 82,
  finalPower: 82,
  attack: 82,
  midfield: 83,
  defense: 82,
  mentality: 84,
  chemistry: 84,
  championsExperience: 82,
  historicalWeight: 82,
  clutch: 82,
  consistency: 81,
  style: "Equilibrado",

  players: [
    // Ajustado: removidos reservas extras e posições reduzidas para maior realismo
    { position: "ME", positions: ["ME", "PE"], name: "Vercauteren", rating: 83 },
    { position: "CA", positions: ["CA"], name: "Vandenbergh", rating: 83 },
    { position: "ATA", positions: ["ATA", "CA"], name: "Arnór Guðjohnsen", rating: 82 },

    { position: "MEI", positions: ["MEI"], name: "Enzo Scifo", rating: 86 },
    { position: "MC", positions: ["MC", "VOL"], name: "Per Frimann", rating: 80 },
    { position: "VOL", positions: ["VOL", "MC"], name: "Vandereycken", rating: 82 },

    { position: "LE", positions: ["LE", "ZAG"], name: "Andersen", rating: 80 },
    { position: "ZAG", positions: ["ZAG"], name: "Georges Grün", rating: 82 },
    { position: "ZAG", positions: ["ZAG"], name: "Morten Olsen", rating: 84 },
    { position: "LD", positions: ["LD", "ZAG"], name: "Peruzović", rating: 80 },
    { position: "GOL", positions: ["GOL"], name: "Jacky Munaron", rating: 82 }
  ]
},

{
  id: "spartak_moscow_1990_1991",
  club: "Spartak Moscow",
  season: "1990/1991",
  type: "Azarão semifinalista",
  categoryType: "underdog",
  tier: "medium",

  teamOverall: 83,
  finalPower: 83,
  attack: 83,
  midfield: 84,
  defense: 82,
  mentality: 85,
  chemistry: 86,
  championsExperience: 80,
  historicalWeight: 83,
  clutch: 84,
  consistency: 82,
  style: "Equilibrado",

  players: [
    // Ajustado: removidos reservas extras e posições reduzidas para maior realismo
    { position: "ATA", positions: ["ATA", "CA"], name: "Valery Shmarov", rating: 83 },
    { position: "CA", positions: ["CA"], name: "Sergei Yuran", rating: 84 },
    { position: "ATA", positions: ["ATA", "CA"], name: "Dmitri Radchenko", rating: 82 },

    { position: "MEI", positions: ["MEI", "MC"], name: "Mostovoi", rating: 85 },
    { position: "MC", positions: ["MC", "VOL"], name: "Vasili Kulkov", rating: 83 },
    { position: "VOL", positions: ["VOL", "MC"], name: "Igor Shalimov", rating: 82 },

    { position: "LE", positions: ["LE"], name: "Dmitri Khlestov", rating: 80 },
    { position: "ZAG", positions: ["ZAG"], name: "Viktor Onopko", rating: 82 },
    { position: "ZAG", positions: ["ZAG"], name: "Gorlukovich", rating: 82 },
    { position: "LD", positions: ["LD"], name: "Andrei Ivanov", rating: 80 },
    { position: "GOL", positions: ["GOL"], name: "Stanislav Cherchesov", rating: 83 }
  ]
},

{
  id: "roma_2017_2018",
  club: "Roma",
  season: "2017/2018",
  type: "Azarão semifinalista",
  categoryType: "underdog",
  tier: "medium",

  teamOverall: 84,
  finalPower: 85,
  attack: 85,
  midfield: 84,
  defense: 83,
  mentality: 87,
  chemistry: 85,
  championsExperience: 82,
  historicalWeight: 86,
  clutch: 88,
  consistency: 82,
  style: "Equilibrado",

  players: [
    // Ajustado: removidos reservas extras, posições reduzidas e rating de Alisson balanceado
    { position: "PE", positions: ["PE"], name: "Stephan El Shaarawy", rating: 82 },
    { position: "CA", positions: ["CA"], name: "Edin Džeko", rating: 86 },
    { position: "PD", positions: ["PD"], name: "Cengiz Ünder", rating: 80 },

    { position: "MEI", positions: ["MEI", "MC"], name: "Radja Nainggolan", rating: 86 },
    { position: "MC", positions: ["MC", "VOL"], name: "Kevin Strootman", rating: 83 },
    { position: "VOL", positions: ["VOL", "MC"], name: "Daniele De Rossi", rating: 84 },

    { position: "LE", positions: ["LE", "ALA"], name: "Kolarov", rating: 83 },
    { position: "ZAG", positions: ["ZAG"], name: "Federico Fazio", rating: 82 },
    { position: "ZAG", positions: ["ZAG"], name: "Kostas Manolas", rating: 84 },
    { position: "LD", positions: ["LD", "ALA"], name: "Florenzi", rating: 82 },
    { position: "GOL", positions: ["GOL"], name: "Alisson Becker", rating: 85 }
  ]
},

{
  id: "lyon_2019_2020",
  club: "Lyon",
  season: "2019/2020",
  type: "Azarão semifinalista",
  categoryType: "underdog",
  tier: "medium",

  teamOverall: 83,
  finalPower: 84,
  attack: 84,
  midfield: 84,
  defense: 82,
  mentality: 86,
  chemistry: 84,
  championsExperience: 81,
  historicalWeight: 85,
  clutch: 86,
  consistency: 80,
  style: "Defensivo",

  players: [
    // Ajustado: removidos reservas extras e posições reduzidas para maior realismo
    { position: "ME", positions: ["ME", "LE"], name: "Maxwel Cornet", rating: 80 },
    { position: "CA", positions: ["CA"], name: "Moussa Dembélé", rating: 83 },
    { position: "PD", positions: ["PD", "ATA"], name: "Memphis Depay", rating: 85 },

    { position: "MEI", positions: ["MEI", "MC"], name: "Houssem Aouar", rating: 82 },
    { position: "MC", positions: ["MC", "VOL"], name: "Bruno Guimarães", rating: 82 },
    { position: "VOL", positions: ["VOL", "MC"], name: "Lucas Tousart", rating: 81 },

    { position: "LE", positions: ["LE"], name: "Fernando Marçal", rating: 78 },
    { position: "ZAG", positions: ["ZAG"], name: "Jason Denayer", rating: 81 },
    { position: "ZAG", positions: ["ZAG"], name: "Marcelo", rating: 80 },
    { position: "LD", positions: ["LD"], name: "Léo Dubois", rating: 80 },
    { position: "GOL", positions: ["GOL"], name: "Anthony Lopes", rating: 84 }
  ]
}
];


const historicTeams = [
{
  id: "psg_2021_2022_mnm",
  club: "Paris Saint-Germain",
  season: "2021/2022",
  type: "Trio lendário",
  categoryType: "historic",
  tier: "elite",

  teamOverall: 90,
  finalPower: 91,
  attack: 96,
  midfield: 88,
  defense: 86,
  mentality: 88,
  chemistry: 87,
  championsExperience: 92,
  historicalWeight: 94,
  clutch: 90,
  consistency: 86,
  style: "Ofensivo",

  players: [
    // Ajustado: removidos reservas extras, posições reduzidas e ratings balanceados
    { position: "PE", positions: ["PE", "ME"], name: "Neymar", rating: 91 },
    { position: "CA", positions: ["CA", "ATA"], name: "Kylian Mbappé", rating: 93 },
    { position: "PD", positions: ["PD", "MEI"], name: "Lionel Messi", rating: 94 },

    { position: "MEI", positions: ["MEI", "PD"], name: "Ángel Di María", rating: 87 },
    { position: "MC", positions: ["MC", "VOL"], name: "Marco Verratti", rating: 88 },
    { position: "VOL", positions: ["VOL", "MC"], name: "Danilo Pereira", rating: 82 },

    { position: "LE", positions: ["LE", "ALA"], name: "Nuno Mendes", rating: 83 },
    { position: "ZAG", positions: ["ZAG"], name: "Presnel Kimpembe", rating: 84 },
    { position: "ZAG", positions: ["ZAG"], name: "Marquinhos", rating: 87 },
    { position: "LD", positions: ["LD", "ALA"], name: "Achraf Hakimi", rating: 85 },
    { position: "GOL", positions: ["GOL"], name: "Gianluigi Donnarumma", rating: 88 }
  ]
},

{
  id: "atletico_madrid_2025_2026",
  club: "Atlético de Madrid",
  season: "2025/2026",
  type: "Temporada atual",
  categoryType: "historic",
  tier: "strong",

  teamOverall: 88,
  finalPower: 89,
  attack: 89,
  midfield: 88,
  defense: 89,
  mentality: 92,
  chemistry: 88,
  championsExperience: 89,
  historicalWeight: 90,
  clutch: 90,
  consistency: 88,
  style: "Defensivo",

  players: [
    // Ajustado: removidos reservas extras, posições reduzidas e ratings balanceados
    { position: "PE", positions: ["PE", "ME"], name: "Ademola Lookman", rating: 84 },
    { position: "CA", positions: ["CA", "ATA"], name: "Julián Álvarez", rating: 88 },
    { position: "PD", positions: ["PD", "MD"], name: "Giuliano Simeone", rating: 80 },

    { position: "MEI", positions: ["MEI", "ATA"], name: "Antoine Griezmann", rating: 86 },
    { position: "MC", positions: ["MC"], name: "Rodrigo De Paul", rating: 84 },
    { position: "VOL", positions: ["VOL", "MC"], name: "Koke", rating: 83 },

    { position: "LE", positions: ["LE", "ALA"], name: "Matteo Ruggeri", rating: 80 },
    { position: "ZAG", positions: ["ZAG"], name: "Robin Le Normand", rating: 84 },
    { position: "ZAG", positions: ["ZAG"], name: "Giménez", rating: 84 },
    { position: "LD", positions: ["LD", "ALA"], name: "Nahuel Molina", rating: 82 },
    { position: "GOL", positions: ["GOL"], name: "Jan Oblak", rating: 87 }
  ]
},

{
  id: "bayern_2025_2026",
  club: "Bayern München",
  season: "2025/2026",
  type: "Temporada atual",
  categoryType: "historic",
  tier: "elite",

  teamOverall: 91,
  finalPower: 92,
  attack: 93,
  midfield: 91,
  defense: 89,
  mentality: 92,
  chemistry: 91,
  championsExperience: 93,
  historicalWeight: 93,
  clutch: 91,
  consistency: 92,
  style: "Ofensivo",

  players: [
    // Ajustado: removidos reservas extras, posições reduzidas e rating de Davies balanceado
    { position: "PE", positions: ["PE", "PD"], name: "Kingsley Coman", rating: 85 },
    { position: "CA", positions: ["CA"], name: "Harry Kane", rating: 93 },
    { position: "PD", positions: ["PD", "MEI"], name: "Michael Olise", rating: 86 },

    { position: "MEI", positions: ["MEI", "MC"], name: "Jamal Musiala", rating: 85 },
    { position: "MC", positions: ["MC", "VOL"], name: "Joshua Kimmich", rating: 88 },
    { position: "VOL", positions: ["VOL", "MC"], name: "Aleksandar Pavlović", rating: 82 },

    { position: "LE", positions: ["LE", "ALA"], name: "Alphonso Davies", rating: 85 },
    { position: "ZAG", positions: ["ZAG"], name: "Dayot Upamecano", rating: 84 },
    { position: "ZAG", positions: ["ZAG"], name: "Kim Min-jae", rating: 84 },
    { position: "LD", positions: ["LD", "MC"], name: "Konrad Laimer", rating: 82 },
    { position: "GOL", positions: ["GOL"], name: "Manuel Neuer", rating: 86 }
  ]
},

{
  id: "psg_2025_2026",
  club: "Paris Saint-Germain",
  season: "2025/2026",
  type: "Bicampeão da Champions",
  categoryType: "champion",
  tier: "elite",

  teamOverall: 92,
  finalPower: 93,
  attack: 93,
  midfield: 92,
  defense: 90,
  mentality: 94,
  chemistry: 94,
  championsExperience: 93,
  historicalWeight: 94,
  clutch: 95,
  consistency: 92,
  style: "Ofensivo",

  players: [
    // Ajustado: removidos reservas extras, posições reduzidas e ratings balanceados
    { position: "PE", positions: ["PE", "ME"], name: "Kvaratskhelia", rating: 91 },
    { position: "CA", positions: ["CA", "PD"], name: "Ousmane Dembélé", rating: 90 },
    { position: "PD", positions: ["PD", "MEI"], name: "Désiré Doué", rating: 85 },

    { position: "MEI", positions: ["MEI", "MC"], name: "Fabián Ruiz", rating: 85 },
    { position: "MC", positions: ["MC", "VOL"], name: "Vitinha", rating: 89 },
    { position: "VOL", positions: ["VOL", "MC"], name: "João Neves", rating: 88 },

    { position: "LE", positions: ["LE", "ALA"], name: "Nuno Mendes", rating: 87 },
    { position: "ZAG", positions: ["ZAG"], name: "Willian Pacho", rating: 87 },
    { position: "ZAG", positions: ["ZAG"], name: "Marquinhos", rating: 86 },
    { position: "LD", positions: ["LD", "ALA"], name: "Achraf Hakimi", rating: 88 },
    { position: "GOL", positions: ["GOL"], name: "Matvey Safonov", rating: 85 }
  ]
},

{
  id: "barcelona_1999_2000",
  club: "Barcelona",
  season: "1999/2000",
  type: "Histórico sem título",
  categoryType: "historic",
  tier: "strong",

  teamOverall: 86,
  finalPower: 86,
  attack: 89,
  midfield: 86,
  defense: 82,
  mentality: 85,
  chemistry: 86,
  championsExperience: 85,
  historicalWeight: 88,
  clutch: 85,
  consistency: 83,
  style: "Ofensivo",

  players: [
    // Ajustado: removidos reservas extras, posições reduzidas e ratings balanceados
    { position: "PE", positions: ["PE", "MEI"], name: "Rivaldo", rating: 90 },
    { position: "CA", positions: ["CA"], name: "Patrick Kluivert", rating: 86 },
    { position: "PD", positions: ["PD", "MD"], name: "Luís Figo", rating: 90 },

    { position: "VOL", positions: ["VOL", "MC"], name: "Pep Guardiola", rating: 85 },
    { position: "MC", positions: ["MC", "MEI"], name: "Luis Enrique", rating: 84 },
    { position: "MC", positions: ["MC", "VOL"], name: "Phillip Cocu", rating: 83 },

    { position: "LE", positions: ["LE", "ALA"], name: "Sergi Barjuán", rating: 82 },
    { position: "ZAG", positions: ["ZAG"], name: "Abelardo", rating: 81 },
    { position: "ZAG", positions: ["ZAG"], name: "Frank de Boer", rating: 83 },
    { position: "LD", positions: ["LD"], name: "Reiziger", rating: 81 },
    { position: "GOL", positions: ["GOL"], name: "Ruud Hesp", rating: 81 }
  ]
},

{
  id: "lazio_1999_2000",
  club: "Lazio",
  season: "1999/2000",
  type: "Histórico sem título",
  categoryType: "historic",
  tier: "strong",

  teamOverall: 86,
  finalPower: 86,
  attack: 86,
  midfield: 88,
  defense: 85,
  mentality: 86,
  chemistry: 86,
  championsExperience: 85,
  historicalWeight: 87,
  clutch: 86,
  consistency: 84,
  style: "Equilibrado",

  players: [
    // Ajustado: removidos reservas extras e posições reduzidas para maior realismo
    { position: "ME", positions: ["ME", "MC"], name: "Pavel Nedvěd", rating: 89 },
    { position: "CA", positions: ["CA"], name: "Marcelo Salas", rating: 85 },
    { position: "MD", positions: ["MD", "MC"], name: "Dejan Stanković", rating: 85 },

    { position: "MEI", positions: ["MEI", "MC"], name: "Verón", rating: 89 },
    { position: "MC", positions: ["MC", "VOL"], name: "Diego Simeone", rating: 84 },
    { position: "VOL", positions: ["VOL", "MC"], name: "Matías Almeyda", rating: 83 },

    { position: "LE", positions: ["LE"], name: "Giuseppe Pancaro", rating: 80 },
    { position: "ZAG", positions: ["ZAG"], name: "Alessandro Nesta", rating: 90 },
    { position: "ZAG", positions: ["ZAG"], name: "Siniša Mihajlović", rating: 84 },
    { position: "LD", positions: ["LD", "LE"], name: "Giuseppe Favalli", rating: 81 },
    { position: "GOL", positions: ["GOL"], name: "Luca Marchegiani", rating: 82 }
  ]
},

{
  id: "chelsea_1999_2000",
  club: "Chelsea",
  season: "1999/2000",
  type: "Histórico sem título",
  categoryType: "historic",
  tier: "medium",

  teamOverall: 83,
  finalPower: 83,
  attack: 83,
  midfield: 84,
  defense: 84,
  mentality: 84,
  chemistry: 82,
  championsExperience: 82,
  historicalWeight: 83,
  clutch: 83,
  consistency: 81,
  style: "Equilibrado",

  players: [
    // Ajustado: removidos reservas extras e posições reduzidas para maior realismo
    { position: "MEI", positions: ["MEI", "ATA"], name: "Gianfranco Zola", rating: 87 },
    { position: "CA", positions: ["CA"], name: "Tore André Flo", rating: 82 },
    { position: "ATA", positions: ["ATA", "MC"], name: "Gustavo Poyet", rating: 83 },

    { position: "MC", positions: ["MC", "VOL"], name: "Dennis Wise", rating: 82 },
    { position: "MC", positions: ["MC", "MEI"], name: "Roberto Di Matteo", rating: 83 },
    { position: "VOL", positions: ["VOL", "MC"], name: "Didier Deschamps", rating: 84 },

    { position: "LE", positions: ["LE", "ALA"], name: "Graeme Le Saux", rating: 81 },
    { position: "ZAG", positions: ["ZAG"], name: "Marcel Desailly", rating: 87 },
    { position: "ZAG", positions: ["ZAG"], name: "Frank Leboeuf", rating: 83 },
    { position: "LD", positions: ["LD"], name: "Albert Ferrer", rating: 80 },
    { position: "GOL", positions: ["GOL"], name: "Ed de Goey", rating: 81 }
  ]
},

{
  id: "manchester_united_2002_2003",
  club: "Manchester United",
  season: "2002/2003",
  type: "Histórico sem título",
  categoryType: "historic",
  tier: "strong",

  teamOverall: 87,
  finalPower: 87,
  attack: 89,
  midfield: 88,
  defense: 84,
  mentality: 88,
  chemistry: 87,
  championsExperience: 89,
  historicalWeight: 89,
  clutch: 88,
  consistency: 86,
  style: "Ofensivo",

  players: [
    // Ajustado: removidos reservas extras, posições reduzidas e rating de Van Nistelrooy balanceado
    { position: "ME", positions: ["ME", "PE"], name: "Ryan Giggs", rating: 88 },
    { position: "CA", positions: ["CA"], name: "Van Nistelrooy", rating: 90 },
    { position: "MD", positions: ["MD", "MC"], name: "David Beckham", rating: 89 },

    { position: "MEI", positions: ["MEI", "MC"], name: "Paul Scholes", rating: 89 },
    { position: "MC", positions: ["MC", "MEI"], name: "Verón", rating: 85 },
    { position: "VOL", positions: ["VOL", "MC"], name: "Roy Keane", rating: 88 },

    { position: "LE", positions: ["LE", "ZAG"], name: "Silvestre", rating: 81 },
    { position: "ZAG", positions: ["ZAG"], name: "Rio Ferdinand", rating: 87 },
    { position: "ZAG", positions: ["ZAG"], name: "Wes Brown", rating: 81 },
    { position: "LD", positions: ["LD"], name: "Gary Neville", rating: 83 },
    { position: "GOL", positions: ["GOL"], name: "Fabien Barthez", rating: 83 }
  ]
},

{
  id: "real_madrid_2002_2003",
  club: "Real Madrid",
  season: "2002/2003",
  type: "Histórico sem título",
  categoryType: "historic",
  tier: "strong",

  teamOverall: 88,
  finalPower: 88,
  attack: 91,
  midfield: 90,
  defense: 85,
  mentality: 88,
  chemistry: 87,
  championsExperience: 91,
  historicalWeight: 92,
  clutch: 89,
  consistency: 85,
  style: "Ofensivo",

  players: [
    // Ajustado: removidos reservas extras e posições reduzidas para maior realismo
    { position: "ATA", positions: ["ATA", "CA"], name: "Raúl González", rating: 90 },
    { position: "CA", positions: ["CA"], name: "Ronaldo Nazário", rating: 94 },
    { position: "PD", positions: ["PD", "MEI"], name: "Luís Figo", rating: 89 },

    { position: "MEI", positions: ["MEI", "MC"], name: "Zinedine Zidane", rating: 92 },
    { position: "MC", positions: ["MC", "MEI"], name: "Guti", rating: 84 },
    { position: "VOL", positions: ["VOL", "MC"], name: "Claude Makélélé", rating: 88 },

    { position: "LE", positions: ["LE", "ALA"], name: "Roberto Carlos", rating: 90 },
    { position: "ZAG", positions: ["ZAG"], name: "Fernando Hierro", rating: 84 },
    { position: "ZAG", positions: ["ZAG"], name: "Iván Helguera", rating: 83 },
    { position: "LD", positions: ["LD"], name: "Míchel Salgado", rating: 84 },
    { position: "GOL", positions: ["GOL"], name: "Iker Casillas", rating: 86 }
  ]
},

{
  id: "arsenal_2003_2004",
  club: "Arsenal",
  season: "2003/2004",
  type: "Histórico sem título",
  categoryType: "historic",
  tier: "strong",

  teamOverall: 88,
  finalPower: 88,
  attack: 90,
  midfield: 87,
  defense: 85,
  mentality: 87,
  chemistry: 89,
  championsExperience: 85,
  historicalWeight: 90,
  clutch: 86,
  consistency: 90,
  style: "Ofensivo",

  players: [
    // Ajustado: removidos reservas extras e posições reduzidas para maior realismo
    { position: "PE", positions: ["PE", "ME"], name: "Robert Pirès", rating: 88 },
    { position: "CA", positions: ["CA"], name: "Thierry Henry", rating: 93 },
    { position: "PD", positions: ["PD", "MD"], name: "Freddie Ljungberg", rating: 84 },

    { position: "MEI", positions: ["MEI", "ATA"], name: "Dennis Bergkamp", rating: 88 },
    { position: "MC", positions: ["MC", "VOL"], name: "Patrick Vieira", rating: 90 },
    { position: "VOL", positions: ["VOL", "MC"], name: "Gilberto Silva", rating: 85 },

    { position: "LE", positions: ["LE", "ALA"], name: "Ashley Cole", rating: 86 },
    { position: "ZAG", positions: ["ZAG"], name: "Sol Campbell", rating: 87 },
    { position: "ZAG", positions: ["ZAG"], name: "Kolo Touré", rating: 83 },
    { position: "LD", positions: ["LD"], name: "Lauren", rating: 82 },
    { position: "GOL", positions: ["GOL"], name: "Jens Lehmann", rating: 84 }
  ]
},

{
  id: "chelsea_2004_2005",
  club: "Chelsea",
  season: "2004/2005",
  type: "Histórico sem título",
  categoryType: "historic",
  tier: "strong",

  teamOverall: 88,
  finalPower: 88,
  attack: 87,
  midfield: 88,
  defense: 90,
  mentality: 89,
  chemistry: 89,
  championsExperience: 86,
  historicalWeight: 89,
  clutch: 88,
  consistency: 90,
  style: "Defensivo",

  players: [
    // Ajustado: posições reduzidas para maior realismo
    { position: "PE", positions: ["PE", "ME"], name: "Arjen Robben", rating: 88 },
    { position: "CA", positions: ["CA"], name: "Didier Drogba", rating: 86 },
    { position: "ME", positions: ["ME", "PE"], name: "Damien Duff", rating: 85 },

    { position: "MEI", positions: ["MEI", "MC"], name: "Frank Lampard", rating: 90 },
    { position: "MC", positions: ["MC", "VOL"], name: "Tiago Mendes", rating: 82 },
    { position: "VOL", positions: ["VOL", "MC"], name: "Claude Makélélé", rating: 89 },

    { position: "LE", positions: ["LE", "ZAG"], name: "William Gallas", rating: 85 },
    { position: "ZAG", positions: ["ZAG"], name: "John Terry", rating: 90 },
    { position: "ZAG", positions: ["ZAG"], name: "Ricardo Carvalho", rating: 88 },
    { position: "LD", positions: ["LD"], name: "Paulo Ferreira", rating: 83 },
    { position: "GOL", positions: ["GOL"], name: "Petr Čech", rating: 90 }
  ]
},

{
  id: "barcelona_2004_2005",
  club: "Barcelona",
  season: "2004/2005",
  type: "Histórico sem título",
  categoryType: "historic",
  tier: "strong",

  teamOverall: 86,
  finalPower: 86,
  attack: 89,
  midfield: 88,
  defense: 84,
  mentality: 86,
  chemistry: 88,
  championsExperience: 84,
  historicalWeight: 88,
  clutch: 86,
  consistency: 85,
  style: "Ofensivo",

  players: [
    // Ajustado: removidos reservas extras, posições reduzidas e rating de Ronaldinho balanceado
    { position: "PE", positions: ["PE", "MEI"], name: "Ronaldinho", rating: 92 },
    { position: "CA", positions: ["CA"], name: "Samuel Eto'o", rating: 88 },
    { position: "PD", positions: ["PD", "MD"], name: "Ludovic Giuly", rating: 83 },

    { position: "MEI", positions: ["MEI", "MC"], name: "Deco", rating: 88 },
    { position: "MC", positions: ["MC", "MEI"], name: "Xavi", rating: 86 },
    { position: "VOL", positions: ["VOL", "ZAG"], name: "Rafael Márquez", rating: 84 },

    { position: "LE", positions: ["LE"], name: "Van Bronckhorst", rating: 82 },
    { position: "ZAG", positions: ["ZAG"], name: "Carles Puyol", rating: 87 },
    { position: "ZAG", positions: ["ZAG"], name: "Oleguer", rating: 79 },
    { position: "LD", positions: ["LD", "ALA"], name: "Belletti", rating: 81 },
    { position: "GOL", positions: ["GOL"], name: "Víctor Valdés", rating: 82 }
  ]
},

{
  id: "lyon_2005_2006",
  club: "Lyon",
  season: "2005/2006",
  type: "Histórico sem título",
  categoryType: "historic",
  tier: "medium",

  teamOverall: 85,
  finalPower: 85,
  attack: 84,
  midfield: 87,
  defense: 85,
  mentality: 86,
  chemistry: 87,
  championsExperience: 84,
  historicalWeight: 86,
  clutch: 85,
  consistency: 86,
  style: "Equilibrado",

  players: [
    // Ajustado: removidos reservas extras e posições reduzidas para maior realismo
    { position: "ME", positions: ["ME", "PE"], name: "Florent Malouda", rating: 85 },
    { position: "CA", positions: ["CA"], name: "Fred", rating: 82 },
    { position: "PD", positions: ["PD", "ATA"], name: "Sylvain Wiltord", rating: 82 },

    { position: "MEI", positions: ["MEI"], name: "Pernambucano", rating: 89 },
    { position: "MC", positions: ["MC", "VOL"], name: "Tiago Mendes", rating: 83 },
    { position: "VOL", positions: ["VOL", "MC"], name: "Mahamadou Diarra", rating: 85 },

    { position: "LE", positions: ["LE", "ZAG"], name: "Éric Abidal", rating: 84 },
    { position: "ZAG", positions: ["ZAG"], name: "Cris", rating: 85 },
    { position: "ZAG", positions: ["ZAG"], name: "Cláudio Caçapa", rating: 81 },
    { position: "LD", positions: ["LD"], name: "Réveillère", rating: 80 },
    { position: "GOL", positions: ["GOL"], name: "Grégory Coupet", rating: 86 }
  ]
},

{
  id: "roma_2007_2008",
  club: "Roma",
  season: "2007/2008",
  type: "Histórico sem título",
  categoryType: "historic",
  tier: "medium",

  teamOverall: 84,
  finalPower: 84,
  attack: 84,
  midfield: 86,
  defense: 83,
  mentality: 85,
  chemistry: 85,
  championsExperience: 83,
  historicalWeight: 84,
  clutch: 84,
  consistency: 84,
  style: "Equilibrado",

  players: [
    // Ajustado: removidos reservas extras e posições reduzidas para maior realismo
    { position: "ATA", positions: ["ATA", "CA"], name: "Francesco Totti", rating: 90 },
    { position: "CA", positions: ["CA"], name: "Mirko Vučinić", rating: 82 },
    { position: "ME", positions: ["ME", "MC"], name: "Mancini", rating: 84 },

    { position: "MEI", positions: ["MEI", "MC"], name: "Simone Perrotta", rating: 83 },
    { position: "MC", positions: ["MC", "VOL"], name: "Daniele De Rossi", rating: 86 },
    { position: "VOL", positions: ["VOL", "MC"], name: "David Pizarro", rating: 84 },

    { position: "LE", positions: ["LE"], name: "Max Tonetto", rating: 80 },
    { position: "ZAG", positions: ["ZAG"], name: "Juan", rating: 83 },
    { position: "ZAG", positions: ["ZAG"], name: "Philippe Mexès", rating: 84 },
    { position: "LD", positions: ["LD"], name: "Christian Panucci", rating: 81 },
    { position: "GOL", positions: ["GOL"], name: "Doni", rating: 82 }
  ]
},

{
  id: "real_madrid_2011_2012",
  club: "Real Madrid",
  season: "2011/2012",
  type: "Histórico sem título",
  categoryType: "historic",
  tier: "elite",

  teamOverall: 90,
  finalPower: 90,
  attack: 94,
  midfield: 90,
  defense: 87,
  mentality: 91,
  chemistry: 90,
  championsExperience: 92,
  historicalWeight: 94,
  clutch: 92,
  consistency: 90,
  style: "Ofensivo",

  players: [
    // Ajustado: removidos reservas extras, posições reduzidas e ratings balanceados
    { position: "PE", positions: ["PE", "ATA"], name: "Cristiano Ronaldo", rating: 95 },
    { position: "CA", positions: ["CA"], name: "Karim Benzema", rating: 88 },
    { position: "PD", positions: ["PD", "MD"], name: "Ángel Di María", rating: 87 },

    { position: "MEI", positions: ["MEI", "MC"], name: "Mesut Özil", rating: 89 },
    { position: "MC", positions: ["MC", "VOL"], name: "Xabi Alonso", rating: 89 },
    { position: "VOL", positions: ["VOL", "MC"], name: "Sami Khedira", rating: 84 },

    { position: "LE", positions: ["LE", "ALA"], name: "Marcelo", rating: 87 },
    { position: "ZAG", positions: ["ZAG", "LD"], name: "Sergio Ramos", rating: 89 },
    { position: "ZAG", positions: ["ZAG"], name: "Pepe", rating: 87 },
    { position: "LD", positions: ["LD"], name: "Álvaro Arbeloa", rating: 80 },
    { position: "GOL", positions: ["GOL"], name: "Iker Casillas", rating: 90 }
  ]
},

{
  id: "barcelona_2011_2012",
  club: "Barcelona",
  season: "2011/2012",
  type: "Histórico sem título",
  categoryType: "historic",
  tier: "elite",

  teamOverall: 91,
  finalPower: 91,
  attack: 94,
  midfield: 95,
  defense: 88,
  mentality: 92,
  chemistry: 95,
  championsExperience: 93,
  historicalWeight: 95,
  clutch: 92,
  consistency: 92,
  style: "Ofensivo",

  players: [
    // Ajustado: posições reduzidas e ratings balanceados para escala do jogo
    { position: "MEI", positions: ["MEI", "MC"], name: "Andrés Iniesta", rating: 92 },
    { position: "CA", positions: ["CA", "PD"], name: "Lionel Messi", rating: 99 },
    { position: "PD", positions: ["PD", "ATA", "MEI"], name: "Alexis Sánchez", rating: 85 },

    { position: "MEI", positions: ["MEI", "MC"], name: "Cesc Fàbregas", rating: 87 },
    { position: "MC", positions: ["MC", "MEI"], name: " Xavi", rating: 93 },
    { position: "VOL", positions: ["VOL", "MC"], name: "Sergio Busquets", rating: 90 },

    { position: "LE", positions: ["LE", "ZAG"], name: "Éric Abidal", rating: 84 },
    { position: "ZAG", positions: ["ZAG"], name: "Carles Puyol", rating: 86 },
    { position: "ZAG", positions: ["ZAG"], name: "Gerard Piqué", rating: 88 },
    { position: "LD", positions: ["LD", "ALA"], name: "Dani Alves", rating: 89 },
    { position: "GOL", positions: ["GOL"], name: "Víctor Valdés", rating: 86 }
  ]
},

{
  id: "psg_2012_2013",
  club: "Paris Saint-Germain",
  season: "2012/2013",
  type: "Histórico sem título",
  categoryType: "historic",
  tier: "medium",

  teamOverall: 85,
  finalPower: 85,
  attack: 87,
  midfield: 85,
  defense: 86,
  mentality: 85,
  chemistry: 84,
  championsExperience: 83,
  historicalWeight: 85,
  clutch: 86,
  consistency: 83,
  style: "Equilibrado",

  players: [
    // Ajustado: posições reduzidas e ratings balanceados
    { position: "PE", positions: ["PE", "ATA"], name: "Ezequiel Lavezzi", rating: 84 },
    { position: "CA", positions: ["CA"], name: "Zlatan Ibrahimović", rating: 91 },
    { position: "PD", positions: ["PD", "MD"], name: "Lucas Moura", rating: 82 },

    { position: "MEI", positions: ["MEI", "MC"], name: "Javier Pastore", rating: 84 },
    { position: "MC", positions: ["MC", "VOL"], name: "Blaise Matuidi", rating: 84 },
    { position: "VOL", positions: ["VOL", "MC"], name: "Marco Verratti", rating: 84 },

    { position: "LE", positions: ["LE"], name: "Maxwell", rating: 82 },
    { position: "ZAG", positions: ["ZAG"], name: "Thiago Silva", rating: 89 },
    { position: "ZAG", positions: ["ZAG"], name: "Alex", rating: 83 },
    { position: "LD", positions: ["LD"], name: "Christophe Jallet", rating: 79 },
    { position: "GOL", positions: ["GOL"], name: "Salvatore Sirigu", rating: 84 }
  ]
},

{
  id: "borussia_dortmund_2016_2017",
  club: "Borussia Dortmund",
  season: "2016/2017",
  type: "Histórico sem título",
  categoryType: "historic",
  tier: "medium",

  teamOverall: 84,
  finalPower: 84,
  attack: 87,
  midfield: 83,
  defense: 81,
  mentality: 84,
  chemistry: 85,
  championsExperience: 82,
  historicalWeight: 84,
  clutch: 84,
  consistency: 82,
  style: "Ofensivo",

  players: [
    // Ajustado: posições reduzidas e rating ofensivo balanceado
    { position: "PE", positions: ["PE", "MEI"], name: "Marco Reus", rating: 86 },
    { position: "CA", positions: ["CA"], name: "Aubameyang", rating: 88 },
    { position: "PD", positions: ["PD", "MEI"], name: "Ousmane Dembélé", rating: 85 },

    { position: "MEI", positions: ["MEI", "MC"], name: "Shinji Kagawa", rating: 81 },
    { position: "MC", positions: ["MC", "VOL"], name: "Julian Weigl", rating: 82 },
    { position: "VOL", positions: ["VOL", "MC"], name: "Gonzalo Castro", rating: 80 },

    { position: "LE", positions: ["LE"], name: "Marcel Schmelzer", rating: 80 },
    { position: "ZAG", positions: ["ZAG"], name: "Papastathopoulos", rating: 84 },
    { position: "ZAG", positions: ["ZAG"], name: "Marc Bartra", rating: 81 },
    { position: "LD", positions: ["LD"], name: "Łukasz Piszczek", rating: 82 },
    { position: "GOL", positions: ["GOL"], name: "Roman Bürki", rating: 82 }
  ]
},

{
  id: "ajax_2018_2019",
  club: "Ajax",
  season: "2018/2019",
  type: "Histórico sem título",
  categoryType: "historic",
  tier: "strong",

  teamOverall: 86,
  finalPower: 87,
  attack: 86,
  midfield: 88,
  defense: 84,
  mentality: 88,
  chemistry: 90,
  championsExperience: 81,
  historicalWeight: 90,
  clutch: 89,
  consistency: 85,
  style: "Ofensivo",

  players: [
    // Ajustado: posições reduzidas e ratings balanceados
    { position: "ATA", positions: ["ATA", "CA", "MEI"], name: "Dušan Tadić", rating: 87 },
    { position: "CA", positions: ["CA"], name: "Kasper Dolberg", rating: 80 },
    { position: "PD", positions: ["PD", "MEI"], name: "Hakim Ziyech", rating: 86 },

    { position: "MEI", positions: ["MEI", "MC"], name: "Donny van de Beek", rating: 84 },
    { position: "MC", positions: ["MC", "VOL"], name: "Frenkie de Jong", rating: 87 },
    { position: "VOL", positions: ["VOL", "MC"], name: "Lasse Schöne", rating: 82 },

    { position: "LE", positions: ["LE", "ALA"], name: "Tagliafico", rating: 83 },
    { position: "ZAG", positions: ["ZAG"], name: "Matthijs de Ligt", rating: 86 },
    { position: "ZAG", positions: ["ZAG", "VOL"], name: "Daley Blind", rating: 83 },
    { position: "LD", positions: ["LD", "ALA"], name: "Mazraoui", rating: 80 },
    { position: "GOL", positions: ["GOL"], name: "André Onana", rating: 84 }
  ]
},
{
  id: "tottenham_2018_2019",
  club: "Tottenham",
  season: "2018/2019",
  type: "Histórico sem título",
  categoryType: "historic",
  tier: "strong",

  teamOverall: 85,
  finalPower: 86,
  attack: 88,
  midfield: 85,
  defense: 85,
  mentality: 88,
  chemistry: 85,
  championsExperience: 82,
  historicalWeight: 87,
  clutch: 88,
  consistency: 81,
  style: "Equilibrado",

  players: [
    // Ajustado: posições reduzidas e ratings balanceados
    { position: "PE", positions: ["PE", "ATA"], name: "Son Heung-min", rating: 87 },
    { position: "CA", positions: ["CA"], name: "Harry Kane", rating: 89 },
    { position: "PD", positions: ["PD"], name: "Lucas Moura", rating: 84 },

    { position: "MEI", positions: ["MEI", "MC"], name: "Christian Eriksen", rating: 88 },
    { position: "MC", positions: ["MC", "VOL"], name: "Moussa Sissoko", rating: 82 },
    { position: "VOL", positions: ["VOL", "ZAG"], name: "Eric Dier", rating: 80 },

    { position: "LE", positions: ["LE"], name: "Danny Rose", rating: 80 },
    { position: "ZAG", positions: ["ZAG"], name: "Jan Vertonghen", rating: 85 },
    { position: "ZAG", positions: ["ZAG"], name: "Toby Alderweireld", rating: 85 },
    { position: "LD", positions: ["LD", "ALA"], name: "Kieran Trippier", rating: 81 },
    { position: "GOL", positions: ["GOL"], name: "Hugo Lloris", rating: 85 }
  ]
},

{
  id: "napoli_2022_2023",
  club: "Napoli",
  season: "2022/2023",
  type: "Histórico sem título",
  categoryType: "historic",
  tier: "strong",

  teamOverall: 87,
  finalPower: 87,
  attack: 89,
  midfield: 87,
  defense: 86,
  mentality: 87,
  chemistry: 89,
  championsExperience: 81,
  historicalWeight: 87,
  clutch: 86,
  consistency: 89,
  style: "Ofensivo",

  players: [
    // Ajustado: removidos reservas extras, posições reduzidas e ratings balanceados
    { position: "PE", positions: ["PE"], name: "Kvaratskhelia", rating: 87 },
    { position: "CA", positions: ["CA"], name: "Victor Osimhen", rating: 88 },
    { position: "PD", positions: ["PD", "MD"], name: "Hirving Lozano", rating: 81 },

    { position: "MEI", positions: ["MEI", "MC"], name: "Piotr Zieliński", rating: 84 },
    { position: "MC", positions: ["MC", "VOL"], name: "Anguissa", rating: 84 },
    { position: "VOL", positions: ["VOL", "MC"], name: "Stanislav Lobotka", rating: 85 },

    { position: "LE", positions: ["LE"], name: "Mário Rui", rating: 80 },
    { position: "ZAG", positions: ["ZAG"], name: "Kim Min-jae", rating: 86 },
    { position: "ZAG", positions: ["ZAG"], name: "Amir Rrahmani", rating: 82 },
    { position: "LD", positions: ["LD"], name: "Di Lorenzo", rating: 84 },
    { position: "GOL", positions: ["GOL"], name: "Alex Meret", rating: 83 }
  ]
},

{
  id: "bayern_2004_2005",
  club: "Bayern München",
  season: "2004/2005",
  type: "Histórico sem título",
  categoryType: "historic",
  tier: "medium",

  teamOverall: 85,
  finalPower: 85,
  attack: 85,
  midfield: 85,
  defense: 84,
  mentality: 87,
  chemistry: 85,
  championsExperience: 88,
  historicalWeight: 87,
  clutch: 85,
  consistency: 85,
  style: "Equilibrado",

  players: [
    // Ajustado: removidos reservas extras e posições reduzidas para maior realismo
    { position: "ME", positions: ["ME", "MC"], name: "Schweinsteiger", rating: 83 },
    { position: "CA", positions: ["CA"], name: "Roy Makaay", rating: 88 },
    { position: "ATA", positions: ["ATA", "CA"], name: "Claudio Pizarro", rating: 84 },

    { position: "MEI", positions: ["MEI", "MC"], name: "Michael Ballack", rating: 89 },
    { position: "MC", positions: ["MC", "ME"], name: "Zé Roberto", rating: 85 },
    { position: "VOL", positions: ["VOL", "MC"], name: "Owen Hargreaves", rating: 83 },

    { position: "LE", positions: ["LE", "ALA"], name: "Bixente Lizarazu", rating: 83 },
    { position: "ZAG", positions: ["ZAG"], name: "Lúcio", rating: 87 },
    { position: "ZAG", positions: ["ZAG"], name: "Robert Kovač", rating: 82 },
    { position: "LD", positions: ["LD", "ALA"], name: "Willy Sagnol", rating: 84 },
    { position: "GOL", positions: ["GOL"], name: "Oliver Kahn", rating: 88 }
  ]
},

{
  id: "arsenal_2007_2008",
  club: "Arsenal",
  season: "2007/2008",
  type: "Histórico sem título",
  categoryType: "historic",
  tier: "medium",

  teamOverall: 85,
  finalPower: 85,
  attack: 86,
  midfield: 86,
  defense: 82,
  mentality: 84,
  chemistry: 87,
  championsExperience: 84,
  historicalWeight: 85,
  clutch: 84,
  consistency: 84,
  style: "Ofensivo",

  players: [
    // Ajustado: removidos reservas extras e posições reduzidas para maior realismo
    { position: "PE", positions: ["PE", "ATA"], name: "Robin van Persie", rating: 86 },
    { position: "CA", positions: ["CA"], name: "Emmanuel Adebayor", rating: 87 },
    { position: "PD", positions: ["PD", "MD"], name: "Theo Walcott", rating: 81 },

    { position: "MEI", positions: ["MEI", "MC"], name: "Cesc Fàbregas", rating: 89 },
    { position: "MC", positions: ["MC", "VOL"], name: "Mathieu Flamini", rating: 83 },
    { position: "VOL", positions: ["VOL", "MC"], name: "Gilberto Silva", rating: 83 },

    { position: "LE", positions: ["LE", "ALA"], name: "Gaël Clichy", rating: 82 },
    { position: "ZAG", positions: ["ZAG"], name: "William Gallas", rating: 85 },
    { position: "ZAG", positions: ["ZAG"], name: "Kolo Touré", rating: 84 },
    { position: "LD", positions: ["LD", "ALA"], name: "Bacary Sagna", rating: 83 },
    { position: "GOL", positions: ["GOL"], name: "Manuel Almunia", rating: 80 }
  ]
},

{
  id: "roma_2006_2007",
  club: "Roma",
  season: "2006/2007",
  type: "Histórico sem título",
  categoryType: "historic",
  tier: "medium",

  teamOverall: 84,
  finalPower: 84,
  attack: 84,
  midfield: 86,
  defense: 83,
  mentality: 85,
  chemistry: 85,
  championsExperience: 83,
  historicalWeight: 84,
  clutch: 83,
  consistency: 83,
  style: "Ofensivo",

  players: [
    // Ajustado: posições reduzidas e rating de Totti balanceado
    { position: "PE", positions: ["PE", "MEI"], name: "Mancini", rating: 85 },
    { position: "ATA", positions: ["ATA", "CA"], name: "Mirko Vučinić", rating: 81 },
    { position: "MD", positions: ["MD", "PD"], name: "Rodrigo Taddei", rating: 81 },

    { position: "MEI", positions: ["MEI", "CA"], name: "Francesco Totti", rating: 90 },
    { position: "MC", positions: ["MC", "MEI"], name: "Simone Perrotta", rating: 82 },
    { position: "VOL", positions: ["VOL", "MC"], name: "Daniele De Rossi", rating: 87 },

    { position: "LE", positions: ["LE"], name: "Max Tonetto", rating: 79 },
    { position: "ZAG", positions: ["ZAG"], name: "Philippe Mexès", rating: 84 },
    { position: "ZAG", positions: ["ZAG"], name: "Cristian Chivu", rating: 84 },
    { position: "LD", positions: ["LD", "ZAG"], name: "Christian Panucci", rating: 81 },
    { position: "GOL", positions: ["GOL"], name: "Doni", rating: 82 }
  ]
},

{
  id: "dynamo_kyiv_1998_1999",
  club: "Dynamo Kyiv",
  season: "1998/1999",
  type: "Histórico sem título",
  categoryType: "historic",
  tier: "medium",

  teamOverall: 85,
  finalPower: 85,
  attack: 87,
  midfield: 84,
  defense: 83,
  mentality: 86,
  chemistry: 86,
  championsExperience: 82,
  historicalWeight: 87,
  clutch: 85,
  consistency: 84,
  style: "Ofensivo",

  players: [
    // Ajustado: removidos reservas extras, posições reduzidas e rating de Shevchenko balanceado
    { position: "ATA", positions: ["ATA", "CA"], name: "Andriy Shevchenko", rating: 89 },
    { position: "CA", positions: ["CA", "ATA"], name: "Serhiy Rebrov", rating: 86 },
    { position: "MD", positions: ["MD", "PD"], name: "Vitaliy Kosovskyi", rating: 80 },

    { position: "MEI", positions: ["MEI", "MC"], name: "Valentin Belkevich", rating: 83 },
    { position: "MC", positions: ["MC"], name: "Kalitvintsev", rating: 81 },
    { position: "VOL", positions: ["VOL", "MC"], name: "Andriy Husin", rating: 82 },

    { position: "LE", positions: ["LE", "ZAG"], name: "Kakha Kaladze", rating: 83 },
    { position: "ZAG", positions: ["ZAG"], name: "Vladyslav Vashchuk", rating: 81 },
    { position: "ZAG", positions: ["ZAG"], name: "Oleksandr Holovko", rating: 81 },
    { position: "LD", positions: ["LD"], name: "Oleh Luzhnyi", rating: 82 },
    { position: "GOL", positions: ["GOL"], name: "Shovkovskyi", rating: 83 }
  ]
},

{
  id: "bayer_leverkusen_2004_2005",
  club: "Bayer Leverkusen",
  season: "2004/2005",
  type: "Histórico sem título",
  categoryType: "historic",
  tier: "medium",

  teamOverall: 84,
  finalPower: 84,
  attack: 85,
  midfield: 84,
  defense: 82,
  mentality: 83,
  chemistry: 84,
  championsExperience: 82,
  historicalWeight: 84,
  clutch: 82,
  consistency: 82,
  style: "Ofensivo",

  players: [
    // Ajustado: removidos reservas extras e posições reduzidas para maior realismo
    { position: "ME", positions: ["ME", "MC"], name: "Zé Roberto", rating: 86 },
    { position: "CA", positions: ["CA"], name: "Dimitar Berbatov", rating: 85 },
    { position: "ATA", positions: ["ATA", "CA"], name: "Andriy Voronin", rating: 82 },

    { position: "MEI", positions: ["MEI", "MC"], name: "Bernd Schneider", rating: 84 },
    { position: "MC", positions: ["MC", "MEI"], name: "Yıldıray Baştürk", rating: 82 },
    { position: "VOL", positions: ["VOL", "MC"], name: "Carsten Ramelow", rating: 82 },

    { position: "LE", positions: ["LE"], name: "Diego Placente", rating: 80 },
    { position: "ZAG", positions: ["ZAG"], name: "Juan", rating: 83 },
    { position: "ZAG", positions: ["ZAG"], name: "Roque Júnior", rating: 81 },
    { position: "LD", positions: ["LD"], name: "Gonzalo Castro", rating: 78 },
    { position: "GOL", positions: ["GOL"], name: "Hans-Jörg Butt", rating: 83 }
  ]
},

{
  id: "werder_bremen_2004_2005",
  club: "Werder Bremen",
  season: "2004/2005",
  type: "Histórico sem título",
  categoryType: "historic",
  tier: "medium",

  teamOverall: 83,
  finalPower: 83,
  attack: 84,
  midfield: 84,
  defense: 81,
  mentality: 83,
  chemistry: 85,
  championsExperience: 80,
  historicalWeight: 83,
  clutch: 82,
  consistency: 82,
  style: "Ofensivo",

  players: [
    // Ajustado: posições reduzidas para maior realismo
    { position: "ATA", positions: ["ATA", "CA"], name: "Miroslav Klose", rating: 85 },
    { position: "CA", positions: ["CA"], name: "Ivan Klasnić", rating: 83 },
    { position: "ME", positions: ["ME", "MEI"], name: "Johan Micoud", rating: 85 },

    { position: "MEI", positions: ["MEI", "MC"], name: "Tim Borowski", rating: 82 },
    { position: "MC", positions: ["MC", "VOL"], name: "Frank Baumann", rating: 81 },
    { position: "VOL", positions: ["VOL", "MC"], name: "Torsten Frings", rating: 84 },

    { position: "LE", positions: ["LE"], name: "Christian Schulz", rating: 78 },
    { position: "ZAG", positions: ["ZAG"], name: "Valérien Ismaël", rating: 82 },
    { position: "ZAG", positions: ["ZAG"], name: "Mladen Krstajić", rating: 81 },
    { position: "LD", positions: ["LD"], name: "Patrick Owomoyela", rating: 78 },
    { position: "GOL", positions: ["GOL"], name: "Andreas Reinke", rating: 80 }
  ]
},

{
  id: "galatasaray_2000_2001",
  club: "Galatasaray",
  season: "2000/2001",
  type: "Histórico sem título",
  categoryType: "historic",
  tier: "medium",

  teamOverall: 84,
  finalPower: 84,
  attack: 84,
  midfield: 85,
  defense: 82,
  mentality: 87,
  chemistry: 86,
  championsExperience: 83,
  historicalWeight: 86,
  clutch: 85,
  consistency: 83,
  style: "Equilibrado",

  players: [
    // Ajustado: removidos reservas extras e posições reduzidas para maior realismo
    { position: "ATA", positions: ["ATA", "CA"], name: "Hakan Şükür", rating: 85 },
    { position: "CA", positions: ["CA"], name: "Mário Jardel", rating: 86 },
    { position: "MD", positions: ["MD", "PD"], name: "Ümit Davala", rating: 81 },

    { position: "MEI", positions: ["MEI", "MC"], name: "Gheorghe Hagi", rating: 88 },
    { position: "MC", positions: ["MC", "VOL"], name: "Okan Buruk", rating: 82 },
    { position: "VOL", positions: ["VOL", "MC"], name: "Suat Kaya", rating: 81 },

    { position: "LE", positions: ["LE"], name: "Hakan Ünsal", rating: 80 },
    { position: "ZAG", positions: ["ZAG"], name: "Bülent Korkmaz", rating: 83 },
    { position: "ZAG", positions: ["ZAG"], name: "Capone", rating: 80 },
    { position: "LD", positions: ["LD", "ALA"], name: "Fatih Akyel", rating: 79 },
    { position: "GOL", positions: ["GOL"], name: "Cláudio Taffarel", rating: 84 }
  ]
},

{
  id: "atletico_madrid_2016_2017",
  club: "Atlético de Madrid",
  season: "2016/2017",
  type: "Histórico sem título",
  categoryType: "historic",
  tier: "strong",

  teamOverall: 88,
  finalPower: 88,
  attack: 87,
  midfield: 87,
  defense: 90,
  mentality: 91,
  chemistry: 88,
  championsExperience: 89,
  historicalWeight: 89,
  clutch: 88,
  consistency: 88,
  style: "Defensivo",

  players: [
    // Ajustado: posições reduzidas e ratings balanceados para escala do jogo
    { position: "ATA", positions: ["ATA", "CA"], name: "Antoine Griezmann", rating: 89 },
    { position: "CA", positions: ["CA"], name: "Kevin Gameiro", rating: 82 },
    { position: "MD", positions: ["MD", "MC"], name: "Saúl Ñíguez", rating: 84 },

    { position: "MEI", positions: ["MEI", "MC"], name: "Koke", rating: 85 },
    { position: "MC", positions: ["MC", "VOL"], name: "Gabi", rating: 84 },
    { position: "VOL", positions: ["VOL", "MC"], name: "Tiago Mendes", rating: 82 },

    { position: "LE", positions: ["LE", "ALA"], name: "Filipe Luís", rating: 85 },
    { position: "ZAG", positions: ["ZAG"], name: "Diego Godín", rating: 89 },
    { position: "ZAG", positions: ["ZAG"], name: "Stefan Savić", rating: 83 },
    { position: "LD", positions: ["LD", "ALA"], name: "Juanfran", rating: 83 },
    { position: "GOL", positions: ["GOL"], name: "Jan Oblak", rating: 88 }
  ]
},

{
  id: "manchester_city_2018_2019",
  club: "Manchester City",
  season: "2018/2019",
  type: "Histórico sem título",
  categoryType: "historic",
  tier: "elite",

  teamOverall: 90,
  finalPower: 90,
  attack: 91,
  midfield: 92,
  defense: 88,
  mentality: 89,
  chemistry: 92,
  championsExperience: 85,
  historicalWeight: 90,
  clutch: 87,
  consistency: 93,
  style: "Ofensivo",

  players: [
    // Ajustado: posições reduzidas e ratings balanceados para escala do jogo
    { position: "PE", positions: ["PE", "ME"], name: "Leroy Sané", rating: 85 },
    { position: "CA", positions: ["CA"], name: "Sergio Agüero", rating: 90 },
    { position: "PD", positions: ["PD", "PE"], name: "Raheem Sterling", rating: 88 },

    { position: "MEI", positions: ["MEI", "MC"], name: "Kevin De Bruyne", rating: 91 },
    { position: "MC", positions: ["MC", "MEI"], name: "David Silva", rating: 88 },
    { position: "VOL", positions: ["VOL", "MC"], name: "Fernandinho", rating: 86 },

    { position: "LE", positions: ["LE", "ALA"], name: "Oleksandr Zinchenko", rating: 80 },
    { position: "ZAG", positions: ["ZAG"], name: "Aymeric Laporte", rating: 86 },
    { position: "ZAG", positions: ["ZAG"], name: "John Stones", rating: 83 },
    { position: "LD", positions: ["LD", "ALA"], name: "Kyle Walker", rating: 84 },
    { position: "GOL", positions: ["GOL"], name: "Ederson", rating: 87 }
  ]
}
];


const runnerUpTeams = [
{
  id: "arsenal_2025_2026",
  club: "Arsenal",
  season: "2025/2026",
  type: "Vice da Champions",
  categoryType: "runner_up",
  tier: "elite",

  teamOverall: 90,
  finalPower: 91,
  attack: 90,
  midfield: 92,
  defense: 91,
  mentality: 91,
  chemistry: 92,
  championsExperience: 88,
  historicalWeight: 91,
  clutch: 89,
  consistency: 93,
  style: "Equilibrado",

  players: [
    // Ajustado: removidos reservas extras, posições reduzidas e ratings balanceados
    { position: "PE", positions: ["PE", "ME"], name: "Gabriel Martinelli", rating: 84 },
    { position: "CA", positions: ["CA", "ATA"], name: "Kai Havertz", rating: 84 },
    { position: "PD", positions: ["PD"], name: "Bukayo Saka", rating: 86 },

    { position: "MEI", positions: ["MEI", "MC"], name: "Martin Ødegaard", rating: 86 },
    { position: "MC", positions: ["MC", "VOL"], name: "Declan Rice", rating: 89 },
    { position: "VOL", positions: ["VOL", "MC"], name: "Thomas Partey", rating: 82 },

    { position: "LE", positions: ["LE", "ZAG"], name: "Riccardo Calafiori", rating: 82 },
    { position: "ZAG", positions: ["ZAG"], name: "Gabriel Magalhães", rating: 88 },
    { position: "ZAG", positions: ["ZAG"], name: "William Saliba", rating: 88 },
    { position: "LD", positions: ["LD", "ZAG"], name: "Ben White", rating: 83 },
    { position: "GOL", positions: ["GOL"], name: "David Raya", rating: 84 }
  ]
},

{
  id: "bayern_1998_1999",
  club: "Bayern München",
  season: "1998/1999",
  type: "Vice forte",
  categoryType: "runner_up",
  tier: "strong",

  teamOverall: 86,
  finalPower: 87,
  attack: 84,
  midfield: 87,
  defense: 85,
  mentality: 89,
  chemistry: 87,
  championsExperience: 90,
  historicalWeight: 89,
  clutch: 87,
  consistency: 87,
  style: "Equilibrado",

  players: [
    // Ajustado: posições reduzidas e rating de Kahn balanceado
    { position: "MD", positions: ["MD", "PD"], name: "Mario Basler", rating: 84 },
    { position: "CA", positions: ["CA"], name: "Giovane Élber", rating: 86 },
    { position: "ME", positions: ["ME", "MD"], name: "Salihamidžić", rating: 82 },

    { position: "MEI", positions: ["MEI", "MC"], name: "Stefan Effenberg", rating: 88 },
    { position: "MC", positions: ["MC", "VOL"], name: "Lothar Matthäus", rating: 86 },
    { position: "VOL", positions: ["VOL", "MC"], name: "Jens Jeremies", rating: 83 },

    { position: "LE", positions: ["LE", "ALA"], name: "Bixente Lizarazu", rating: 85 },
    { position: "ZAG", positions: ["ZAG"], name: "Samuel Kuffour", rating: 84 },
    { position: "ZAG", positions: ["ZAG"], name: "Thomas Linke", rating: 82 },
    { position: "LD", positions: ["LD", "ZAG"], name: "Markus Babbel", rating: 82 },
    { position: "GOL", positions: ["GOL"], name: "Oliver Kahn", rating: 89 }
  ]
},

{
  id: "valencia_1999_2000",
  club: "Valencia",
  season: "1999/2000",
  type: "Vice forte",
  categoryType: "runner_up",
  tier: "medium",

  teamOverall: 84,
  finalPower: 85,
  attack: 84,
  midfield: 85,
  defense: 83,
  mentality: 87,
  chemistry: 86,
  championsExperience: 85,
  historicalWeight: 86,
  clutch: 86,
  consistency: 84,
  style: "Equilibrado",

  players: [
    // Ajustado: posições reduzidas e removida lógica de coringa falso
    { position: "ME", positions: ["ME", "PE"], name: "Kily González", rating: 84 },
    { position: "ATA", positions: ["ATA", "CA"], name: "Claudio López", rating: 86 },
    { position: "MD", positions: ["MD", "MC"], name: "Gaizka Mendieta", rating: 87 },

    { position: "MEI", positions: ["MEI", "MC"], name: "Gerard López", rating: 82 },
    { position: "MC", positions: ["MC", "VOL"], name: "David Albelda", rating: 82 },
    { position: "VOL", positions: ["VOL", "MC"], name: "Rubén Baraja", rating: 82 },

    { position: "LE", positions: ["LE"], name: "Amedeo Carboni", rating: 81 },
    { position: "ZAG", positions: ["ZAG"], name: "Mauricio Pellegrino", rating: 82 },
    { position: "ZAG", positions: ["ZAG"], name: "Miroslav Đukić", rating: 82 },
    { position: "LD", positions: ["LD"], name: "Jocelyn Angloma", rating: 80 },
    { position: "GOL", positions: ["GOL"], name: "Santiago Cañizares", rating: 85 }
  ]
},

{
  id: "valencia_2000_2001",
  club: "Valencia",
  season: "2000/2001",
  type: "Vice forte",
  categoryType: "runner_up",
  tier: "strong",

  teamOverall: 86,
  finalPower: 86,
  attack: 84,
  midfield: 87,
  defense: 84,
  mentality: 88,
  chemistry: 87,
  championsExperience: 87,
  historicalWeight: 87,
  clutch: 87,
  consistency: 86,
  style: "Equilibrado",

  players: [
    // Ajustado: posições reduzidas para maior realismo
    { position: "ME", positions: ["ME", "PE"], name: "Kily González", rating: 84 },
    { position: "CA", positions: ["CA"], name: "John Carew", rating: 83 },
    { position: "MEI", positions: ["MEI", "MC"], name: "Pablo Aimar", rating: 86 },

    { position: "MD", positions: ["MD", "MC"], name: "Gaizka Mendieta", rating: 88 },
    { position: "MC", positions: ["MC", "VOL"], name: "Rubén Baraja", rating: 85 },
    { position: "VOL", positions: ["VOL", "MC"], name: "David Albelda", rating: 84 },

    { position: "LE", positions: ["LE"], name: "Amedeo Carboni", rating: 81 },
    { position: "ZAG", positions: ["ZAG"], name: "Roberto Ayala", rating: 86 },
    { position: "ZAG", positions: ["ZAG"], name: "Mauricio Pellegrino", rating: 82 },
    { position: "LD", positions: ["LD"], name: "Curro Torres", rating: 80 },
    { position: "GOL", positions: ["GOL"], name: "Santiago Cañizares", rating: 86 }
  ]
},

{
  id: "bayer_leverkusen_2001_2002",
  club: "Bayer Leverkusen",
  season: "2001/2002",
  type: "Vice forte",
  categoryType: "runner_up",
  tier: "strong",

  teamOverall: 85,
  finalPower: 86,
  attack: 85,
  midfield: 86,
  defense: 84,
  mentality: 86,
  chemistry: 85,
  championsExperience: 85,
  historicalWeight: 87,
  clutch: 86,
  consistency: 84,
  style: "Ofensivo",

  players: [
    // Ajustado: removido reserva extra e posições reduzidas para maior realismo
    { position: "ME", positions: ["ME", "MC"], name: "Zé Roberto", rating: 86 },
    { position: "ATA", positions: ["ATA", "CA"], name: "Oliver Neuville", rating: 83 },
    { position: "MD", positions: ["MD", "PD"], name: "Bernd Schneider", rating: 84 },

    { position: "MEI", positions: ["MEI", "MC"], name: "Michael Ballack", rating: 89 },
    { position: "MC", positions: ["MC", "MEI"], name: "Baştürk", rating: 83 },
    { position: "VOL", positions: ["VOL", "MC"], name: "Carsten Ramelow", rating: 82 },

    { position: "LE", positions: ["LE"], name: "Diego Placente", rating: 81 },
    { position: "ZAG", positions: ["ZAG"], name: "Lúcio", rating: 87 },
    { position: "ZAG", positions: ["ZAG"], name: "Jens Nowotny", rating: 83 },
    { position: "LD", positions: ["LD"], name: "Boris Živković", rating: 80 },
    { position: "GOL", positions: ["GOL"], name: "Hans-Jörg Butt", rating: 83 }
  ]
},

{
  id: "juventus_2002_2003",
  club: "Juventus",
  season: "2002/2003",
  type: "Vice forte",
  categoryType: "runner_up",
  tier: "strong",

  teamOverall: 87,
  finalPower: 88,
  attack: 88,
  midfield: 88,
  defense: 87,
  mentality: 89,
  chemistry: 88,
  championsExperience: 90,
  historicalWeight: 90,
  clutch: 88,
  consistency: 87,
  style: "Equilibrado",

  players: [
    // Ajustado: posições reduzidas e rating de Buffon balanceado
    { position: "ME", positions: ["ME", "MC"], name: "Pavel Nedvěd", rating: 90 },
    { position: "CA", positions: ["CA"], name: "David Trezeguet", rating: 88 },
    { position: "MD", positions: ["MD"], name: "Mauro Camoranesi", rating: 84 },
    { position: "ATA", positions: ["ATA", "MEI"], name: "Del Piero", rating: 89 },

    { position: "MC", positions: ["MC", "VOL"], name: "Edgar Davids", rating: 86 },
    { position: "VOL", positions: ["VOL", "MC"], name: "Alessio Tacchinardi", rating: 83 },

    { position: "LE", positions: ["LE", "ALA"], name: "Gianluca Zambrotta", rating: 85 },
    { position: "ZAG", positions: ["ZAG"], name: "Ciro Ferrara", rating: 84 },
    { position: "ZAG", positions: ["ZAG"], name: "Paolo Montero", rating: 84 },
    { position: "LD", positions: ["LD", "ZAG"], name: "Lilian Thuram", rating: 88 },
    { position: "GOL", positions: ["GOL"], name: "Gianluigi Buffon", rating: 90 }
  ]
},

{
  id: "monaco_2003_2004",
  club: "Monaco",
  season: "2003/2004",
  type: "Vice azarão",
  categoryType: "runner_up",
  tier: "medium",

  teamOverall: 83,
  finalPower: 84,
  attack: 85,
  midfield: 81,
  defense: 82,
  mentality: 86,
  chemistry: 85,
  championsExperience: 81,
  historicalWeight: 85,
  clutch: 87,
  consistency: 81,
  style: "Ofensivo",

  players: [
    // Ajustado: posições reduzidas e ratings levemente balanceados
    { position: "ME", positions: ["ME", "PE"], name: "Jérôme Rothen", rating: 83 },
    { position: "CA", positions: ["CA"], name: "Fernando Morientes", rating: 86 },
    { position: "PD", positions: ["PD", "ATA"], name: "Ludovic Giuly", rating: 85 },
    { position: "ATA", positions: ["ATA", "CA"], name: "Dado Pršo", rating: 82 },

    { position: "MC", positions: ["MC", "VOL"], name: "Édouard Cissé", rating: 79 },
    { position: "VOL", positions: ["VOL", "MC"], name: "Lucas Bernardi", rating: 80 },

    { position: "LE", positions: ["LE", "ALA"], name: "Patrice Evra", rating: 82 },
    { position: "ZAG", positions: ["ZAG"], name: "Gaël Givet", rating: 80 },
    { position: "ZAG", positions: ["ZAG"], name: "Sébastien Squillaci", rating: 81 },
    { position: "LD", positions: ["LD"], name: "Hugo Ibarra", rating: 80 },
    { position: "GOL", positions: ["GOL"], name: "Flavio Roma", rating: 80 }
  ]
},

{
  id: "milan_2004_2005",
  club: "Milan",
  season: "2004/2005",
  type: "Vice lendário",
  categoryType: "runner_up",
  tier: "elite",

  teamOverall: 90,
  finalPower: 90,
  attack: 90,
  midfield: 91,
  defense: 91,
  mentality: 91,
  chemistry: 92,
  championsExperience: 94,
  historicalWeight: 94,
  clutch: 90,
  consistency: 90,
  style: "Equilibrado",

  players: [
    // Ajustado: posições reduzidas e ratings balanceados para escala do jogo
    { position: "MC", positions: ["MC", "MEI"], name: "Clarence Seedorf", rating: 88 },
    { position: "CA", positions: ["CA"], name: "Andriy Shevchenko", rating: 92 },
    { position: "ATA", positions: ["ATA", "CA"], name: "Hernán Crespo", rating: 88 },

    { position: "MEI", positions: ["MEI", "MC"], name: "Kaká", rating: 91 },
    { position: "MC", positions: ["MC", "VOL"], name: "Andrea Pirlo", rating: 90 },
    { position: "VOL", positions: ["VOL", "MC"], name: "Gennaro Gattuso", rating: 87 },

    { position: "LE", positions: ["LE", "ZAG"], name: "Paolo Maldini", rating: 90 },
    { position: "ZAG", positions: ["ZAG"], name: "Alessandro Nesta", rating: 90 },
    { position: "ZAG", positions: ["ZAG"], name: "Jaap Stam", rating: 88 },
    { position: "LD", positions: ["LD", "ALA"], name: "Cafu", rating: 87 },
    { position: "GOL", positions: ["GOL"], name: "Dida", rating: 87 }
  ]
},

{
  id: "arsenal_2005_2006",
  club: "Arsenal",
  season: "2005/2006",
  type: "Vice forte",
  categoryType: "runner_up",
  tier: "strong",

  teamOverall: 86,
  finalPower: 86,
  attack: 87,
  midfield: 85,
  defense: 85,
  mentality: 87,
  chemistry: 86,
  championsExperience: 84,
  historicalWeight: 87,
  clutch: 86,
  consistency: 86,
  style: "Equilibrado",

  players: [
    // Ajustado: removidos reservas extras e posições reduzidas para maior realismo
    { position: "PE", positions: ["PE", "ME"], name: "Robert Pirès", rating: 86 },
    { position: "CA", positions: ["CA"], name: "Thierry Henry", rating: 92 },
    { position: "PD", positions: ["PD", "MD"], name: "Freddie Ljungberg", rating: 83 },

    { position: "MEI", positions: ["MEI", "MC"], name: "Cesc Fàbregas", rating: 84 },
    { position: "MC", positions: ["MC", "VOL"], name: "Gilberto Silva", rating: 84 },
    { position: "VOL", positions: ["VOL", "MC"], name: "Mathieu Flamini", rating: 81 },

    { position: "LE", positions: ["LE", "ALA"], name: "Ashley Cole", rating: 87 },
    { position: "ZAG", positions: ["ZAG"], name: "Philippe Senderos", rating: 80 },
    { position: "ZAG", positions: ["ZAG"], name: "Kolo Touré", rating: 84 },
    { position: "LD", positions: ["LD", "ALA"], name: "Emmanuel Eboué", rating: 80 },
    { position: "GOL", positions: ["GOL"], name: "Jens Lehmann", rating: 86 }
  ]
},

{
  id: "liverpool_2006_2007",
  club: "Liverpool",
  season: "2006/2007",
  type: "Vice forte",
  categoryType: "runner_up",
  tier: "medium",

  teamOverall: 85,
  finalPower: 85,
  attack: 83,
  midfield: 87,
  defense: 84,
  mentality: 87,
  chemistry: 85,
  championsExperience: 87,
  historicalWeight: 86,
  clutch: 86,
  consistency: 84,
  style: "Equilibrado",

  players: [
    // Ajustado: posições reduzidas para maior realismo
    { position: "ME", positions: ["ME", "LE"], name: "John Arne Riise", rating: 82 },
    { position: "CA", positions: ["CA", "ATA"], name: "Dirk Kuyt", rating: 83 },
    { position: "PD", positions: ["PD", "MD"], name: "Jermaine Pennant", rating: 80 },

    { position: "MEI", positions: ["MEI", "MC"], name: "Steven Gerrard", rating: 90 },
    { position: "MC", positions: ["MC", "VOL"], name: "Xabi Alonso", rating: 87 },
    { position: "VOL", positions: ["VOL", "MC"], name: "Javier Mascherano", rating: 85 },

    { position: "LE", positions: ["LE"], name: "Fábio Aurélio", rating: 80 },
    { position: "ZAG", positions: ["ZAG"], name: "Jamie Carragher", rating: 85 },
    { position: "ZAG", positions: ["ZAG"], name: "Daniel Agger", rating: 82 },
    { position: "LD", positions: ["LD"], name: "Steve Finnan", rating: 81 },
    { position: "GOL", positions: ["GOL"], name: "Pepe Reina", rating: 86 }
  ]
},

{
  id: "chelsea_2007_2008",
  club: "Chelsea",
  season: "2007/2008",
  type: "Vice forte",
  categoryType: "runner_up",
  tier: "strong",

  teamOverall: 88,
  finalPower: 88,
  attack: 87,
  midfield: 88,
  defense: 89,
  mentality: 90,
  chemistry: 88,
  championsExperience: 89,
  historicalWeight: 89,
  clutch: 89,
  consistency: 88,
  style: "Equilibrado",

  players: [
    // Ajustado: posições reduzidas e ratings balanceados para escala do jogo
    { position: "ME", positions: ["ME", "PE"], name: "Florent Malouda", rating: 83 },
    { position: "CA", positions: ["CA"], name: "Didier Drogba", rating: 89 },
    { position: "PD", positions: ["PD", "MD"], name: "Joe Cole", rating: 84 },

    { position: "MEI", positions: ["MEI", "MC"], name: "Frank Lampard", rating: 89 },
    { position: "MC", positions: ["MC", "VOL"], name: "Michael Ballack", rating: 88 },
    { position: "VOL", positions: ["VOL", "MC"], name: "Claude Makélélé", rating: 87 },

    { position: "LE", positions: ["LE"], name: "Ashley Cole", rating: 86 },
    { position: "ZAG", positions: ["ZAG"], name: "John Terry", rating: 89 },
    { position: "ZAG", positions: ["ZAG"], name: "Ricardo Carvalho", rating: 88 },
    { position: "LD", positions: ["LD", "MC"], name: "Michael Essien", rating: 86 },
    { position: "GOL", positions: ["GOL"], name: "Petr Čech", rating: 89 }
  ]
},

{
  id: "manchester_united_2008_2009",
  club: "Manchester United",
  season: "2008/2009",
  type: "Vice elite",
  categoryType: "runner_up",
  tier: "strong",

  teamOverall: 89,
  finalPower: 89,
  attack: 91,
  midfield: 88,
  defense: 90,
  mentality: 90,
  chemistry: 90,
  championsExperience: 91,
  historicalWeight: 91,
  clutch: 89,
  consistency: 90,
  style: "Equilibrado",

  players: [
    // Ajustado: removidos reservas extras, posições reduzidas e ratings balanceados
    { position: "PE", positions: ["PE", "ATA"], name: "Cristiano Ronaldo", rating: 94 },
    { position: "CA", positions: ["CA", "ATA"], name: "Wayne Rooney", rating: 89 },
    { position: "MD", positions: ["MD", "PD"], name: "Park Ji-sung", rating: 82 },

    { position: "MEI", positions: ["MEI", "MC"], name: "Ryan Giggs", rating: 86 },
    { position: "MC", positions: ["MC", "VOL"], name: "Michael Carrick", rating: 84 },
    { position: "VOL", positions: ["VOL", "MC"], name: "Darren Fletcher", rating: 82 },

    { position: "LE", positions: ["LE", "ALA"], name: "Patrice Evra", rating: 86 },
    { position: "ZAG", positions: ["ZAG"], name: "Rio Ferdinand", rating: 89 },
    { position: "ZAG", positions: ["ZAG"], name: "Nemanja Vidić", rating: 90 },
    { position: "LD", positions: ["LD"], name: "John O'Shea", rating: 80 },
    { position: "GOL", positions: ["GOL"], name: "Van der Sar", rating: 88 }
  ]
},

{
  id: "bayern_2009_2010",
  club: "Bayern München",
  season: "2009/2010",
  type: "Vice forte",
  categoryType: "runner_up",
  tier: "strong",

  teamOverall: 86,
  finalPower: 86,
  attack: 87,
  midfield: 85,
  defense: 83,
  mentality: 87,
  chemistry: 86,
  championsExperience: 87,
  historicalWeight: 87,
  clutch: 86,
  consistency: 85,
  style: "Ofensivo",

  players: [
    // Ajustado: removidos reservas extras, posições reduzidas e ratings balanceados
    { position: "PE", positions: ["PE", "ME"], name: "Franck Ribéry", rating: 88 },
    { position: "CA", positions: ["CA", "ATA"], name: "Ivica Olić", rating: 84 },
    { position: "PD", positions: ["PD", "PE"], name: "Arjen Robben", rating: 89 },

    { position: "MEI", positions: ["MEI", "MC"], name: "Thomas Müller", rating: 84 },
    { position: "MC", positions: ["MC", "VOL"], name: "Schweinsteiger", rating: 86 },
    { position: "VOL", positions: ["VOL", "MC"], name: "Mark van Bommel", rating: 83 },

    { position: "LE", positions: ["LE"], name: "Holger Badstuber", rating: 80 },
    { position: "ZAG", positions: ["ZAG"], name: "Daniel Van Buyten", rating: 82 },
    { position: "ZAG", positions: ["ZAG"], name: "Martín Demichelis", rating: 81 },
    { position: "LD", positions: ["LD", "ALA"], name: "Philipp Lahm", rating: 88 },
    { position: "GOL", positions: ["GOL"], name: "Hans-Jörg", rating: 82 }
  ]
},

{
  id: "manchester_united_2010_2011",
  club: "Manchester United",
  season: "2010/2011",
  type: "Vice forte",
  categoryType: "runner_up",
  tier: "strong",

  teamOverall: 87,
  finalPower: 87,
  attack: 88,
  midfield: 86,
  defense: 87,
  mentality: 89,
  chemistry: 88,
  championsExperience: 91,
  historicalWeight: 90,
  clutch: 88,
  consistency: 88,
  style: "Equilibrado",

  players: [
    // Ajustado: removidos reservas extras e posições reduzidas para maior realismo
    { position: "PE", positions: ["PE", "PD"], name: "Nani", rating: 86 },
    { position: "CA", positions: ["CA", "ATA"], name: "Wayne Rooney", rating: 89 },
    { position: "PD", positions: ["PD", "MD"], name: "Antonio Valencia", rating: 84 },

    { position: "MEI", positions: ["MEI", "MC"], name: "Ryan Giggs", rating: 85 },
    { position: "MC", positions: ["MC", "VOL"], name: "Michael Carrick", rating: 84 },
    { position: "VOL", positions: ["VOL", "MC"], name: "Ji-sung", rating: 82 },

    { position: "LE", positions: ["LE", "ALA"], name: "Patrice Evra", rating: 85 },
    { position: "ZAG", positions: ["ZAG"], name: "Nemanja Vidić", rating: 89 },
    { position: "ZAG", positions: ["ZAG"], name: "Rio Ferdinand", rating: 87 },
    { position: "LD", positions: ["LD"], name: "Fábio", rating: 78 },
    { position: "GOL", positions: ["GOL"], name: "Van der Sar", rating: 88 }
  ]
},

{
  id: "bayern_2011_2012",
  club: "Bayern München",
  season: "2011/2012",
  type: "Vice forte",
  categoryType: "runner_up",
  tier: "strong",

  teamOverall: 88,
  finalPower: 88,
  attack: 90,
  midfield: 88,
  defense: 85,
  mentality: 88,
  chemistry: 88,
  championsExperience: 89,
  historicalWeight: 89,
  clutch: 87,
  consistency: 88,
  style: "Ofensivo",

  players: [
    // Ajustado: removidos reservas extras, posições reduzidas e ratings balanceados
    { position: "PE", positions: ["PE", "ME"], name: "Franck Ribéry", rating: 89 },
    { position: "CA", positions: ["CA"], name: "Mario Gómez", rating: 87 },
    { position: "PD", positions: ["PD", "PE"], name: "Arjen Robben", rating: 90 },

    { position: "MEI", positions: ["MEI", "MC"], name: "Thomas Müller", rating: 86 },
    { position: "MC", positions: ["MC", "VOL"], name: "Schweinsteiger", rating: 88 },
    { position: "VOL", positions: ["VOL", "MC"], name: "Toni Kroos", rating: 85 },

    { position: "LE", positions: ["LE", "ALA"], name: "Philipp Lahm", rating: 89 },
    { position: "ZAG", positions: ["ZAG"], name: "Holger Badstuber", rating: 82 },
    { position: "ZAG", positions: ["ZAG"], name: "Jérôme Boateng", rating: 84 },
    { position: "LD", positions: ["LD"], name: "Rafinha", rating: 80 },
    { position: "GOL", positions: ["GOL"], name: "Manuel Neuer", rating: 89 }
  ]
},

{
  id: "borussia_dortmund_2012_2013",
  club: "Borussia Dortmund",
  season: "2012/2013",
  type: "Vice forte",
  categoryType: "runner_up",
  tier: "strong",

  teamOverall: 88,
  finalPower: 88,
  attack: 89,
  midfield: 87,
  defense: 85,
  mentality: 89,
  chemistry: 90,
  championsExperience: 84,
  historicalWeight: 89,
  clutch: 88,
  consistency: 88,
  style: "Ofensivo",

  players: [
    // Ajustado: removidos reservas extras, posições reduzidas e ratings balanceados
    { position: "PE", positions: ["PE", "MEI"], name: "Marco Reus", rating: 87 },
    { position: "CA", positions: ["CA"], name: "Robert Lewandowski", rating: 89 },
    { position: "PD", positions: ["PD", "MD"], name: "Błaszczykowski", rating: 83 },

    { position: "MEI", positions: ["MEI", "MC"], name: "Mario Götze", rating: 86 },
    { position: "MC", positions: ["MC", "VOL"], name: "İlkay Gündoğan", rating: 86 },
    { position: "VOL", positions: ["VOL", "MC"], name: "Sven Bender", rating: 82 },

    { position: "LE", positions: ["LE"], name: "Marcel Schmelzer", rating: 81 },
    { position: "ZAG", positions: ["ZAG"], name: "Mats Hummels", rating: 87 },
    { position: "ZAG", positions: ["ZAG"], name: "Neven Subotić", rating: 84 },
    { position: "LD", positions: ["LD"], name: "Piszczek", rating: 84 },
    { position: "GOL", positions: ["GOL"], name: "Weidenfeller", rating: 84 }
  ]
},

{
  id: "atletico_madrid_2013_2014",
  club: "Atlético de Madrid",
  season: "2013/2014",
  type: "Vice forte",
  categoryType: "runner_up",
  tier: "strong",

  teamOverall: 88,
  finalPower: 88,
  attack: 86,
  midfield: 85,
  defense: 89,
  mentality: 92,
  chemistry: 90,
  championsExperience: 86,
  historicalWeight: 90,
  clutch: 91,
  consistency: 91,
  style: "Defensivo",

  players: [
    // Ajustado: removidos reservas extras, posições reduzidas e ratings balanceados
    { position: "ME", positions: ["ME", "MEI"], name: "Arda Turan", rating: 85 },
    { position: "CA", positions: ["CA"], name: "Diego Costa", rating: 88 },
    { position: "MD", positions: ["MD", "MC"], name: "Koke", rating: 85 },

    { position: "ATA", positions: ["ATA", "CA"], name: "Raúl García", rating: 82 },
    { position: "MC", positions: ["MC", "VOL"], name: "Gabi", rating: 85 },
    { position: "VOL", positions: ["VOL", "MC"], name: "Tiago Mendes", rating: 83 },

    { position: "LE", positions: ["LE", "ALA"], name: "Filipe Luís", rating: 85 },
    { position: "ZAG", positions: ["ZAG"], name: "Diego Godín", rating: 89 },
    { position: "ZAG", positions: ["ZAG"], name: "Miranda", rating: 86 },
    { position: "LD", positions: ["LD"], name: "Juanfran", rating: 84 },
    { position: "GOL", positions: ["GOL"], name: "Thibaut Courtois", rating: 89 }
  ]
},

{
  id: "juventus_2014_2015",
  club: "Juventus",
  season: "2014/2015",
  type: "Vice forte",
  categoryType: "runner_up",
  tier: "strong",

  teamOverall: 88,
  finalPower: 88,
  attack: 87,
  midfield: 88,
  defense: 88,
  mentality: 89,
  chemistry: 88,
  championsExperience: 90,
  historicalWeight: 90,
  clutch: 89,
  consistency: 89,
  style: "Equilibrado",

  players: [
    // Ajustado: removidos reservas extras, posições reduzidas e ratings balanceados
    { position: "ATA", positions: ["ATA", "CA"], name: "Álvaro Morata", rating: 84 },
    { position: "CA", positions: ["CA", "ATA"], name: "Carlos Tévez", rating: 89 },
    { position: "MD", positions: ["MD", "MEI"], name: "Roberto Pereyra", rating: 80 },

    { position: "MEI", positions: ["MEI", "MC"], name: "Arturo Vidal", rating: 87 },
    { position: "MC", positions: ["MC", "MEI"], name: "Paul Pogba", rating: 88 },
    { position: "VOL", positions: ["VOL", "MC"], name: "Andrea Pirlo", rating: 88 },

    { position: "LE", positions: ["LE"], name: "Patrice Evra", rating: 84 },
    { position: "ZAG", positions: ["ZAG"], name: "Giorgio Chiellini", rating: 88 },
    { position: "ZAG", positions: ["ZAG"], name: "Leonardo Bonucci", rating: 87 },
    { position: "LD", positions: ["LD", "ALA"], name: "Lichtsteiner", rating: 84 },
    { position: "GOL", positions: ["GOL"], name: "Gianluigi Buffon", rating: 89 }
  ]
},

{
  id: "atletico_madrid_2015_2016",
  club: "Atlético de Madrid",
  season: "2015/2016",
  type: "Vice forte",
  categoryType: "runner_up",
  tier: "strong",

  teamOverall: 87,
  finalPower: 87,
  attack: 86,
  midfield: 84,
  defense: 88,
  mentality: 91,
  chemistry: 89,
  championsExperience: 86,
  historicalWeight: 89,
  clutch: 90,
  consistency: 90,
  style: "Defensivo",

  players: [
    // Ajustado: removidos reservas extras, posições reduzidas e ratings balanceados
    { position: "PE", positions: ["PE", "ME"], name: "Yannick Carrasco", rating: 83 },
    { position: "CA", positions: ["CA", "ATA"], name: "Antoine Griezmann", rating: 88 },
    { position: "MD", positions: ["MD", "MC"], name: "Saúl Ñíguez", rating: 84 },

    { position: "MEI", positions: ["MEI", "MC"], name: "Koke", rating: 85 },
    { position: "MC", positions: ["MC", "VOL"], name: "Gabi", rating: 84 },
    { position: "VOL", positions: ["VOL", "MC"], name: "Augusto Fernández", rating: 80 },

    { position: "LE", positions: ["LE", "ALA"], name: "Filipe Luís", rating: 85 },
    { position: "ZAG", positions: ["ZAG"], name: "Diego Godín", rating: 88 },
    { position: "ZAG", positions: ["ZAG"], name: "José Giménez", rating: 84 },
    { position: "LD", positions: ["LD"], name: "Juanfran", rating: 84 },
    { position: "GOL", positions: ["GOL"], name: "Jan Oblak", rating: 88 }
  ]
},

{
  id: "psg_2019_2020",
  club: "Paris Saint-Germain",
  season: "2019/2020",
  type: "Vice histórico",
  categoryType: "runner_up",
  tier: "strong",

  teamOverall: 88,
  finalPower: 89,
  attack: 91,
  midfield: 87,
  defense: 85,
  mentality: 88,
  chemistry: 88,
  championsExperience: 87,
  historicalWeight: 89,
  clutch: 89,
  consistency: 85,
  style: "Ofensivo",

  players: [
    // Ajustado: posições reduzidas e ratings balanceados para escala do jogo
    { position: "PE", positions: ["PE", "MEI"], name: "Neymar", rating: 91 },
    { position: "CA", positions: ["CA", "ATA"], name: "Kylian Mbappé", rating: 92 },
    { position: "PD", positions: ["PD", "MEI"], name: "Ángel Di María", rating: 86 },

    { position: "MEI", positions: ["MEI", "MC"], name: "Marco Verratti", rating: 86 },
    { position: "MC", positions: ["MC", "VOL"], name: "Marquinhos", rating: 86 },
    { position: "VOL", positions: ["VOL", "MC"], name: "Leandro Paredes", rating: 82 },

    { position: "LE", positions: ["LE"], name: "Juan Bernat", rating: 81 },
    { position: "ZAG", positions: ["ZAG"], name: "Presnel Kimpembe", rating: 83 },
    { position: "ZAG", positions: ["ZAG"], name: "Thiago Silva", rating: 87 },
    { position: "LD", positions: ["LD", "ALA"], name: "Thilo Kehrer", rating: 79 },
    { position: "GOL", positions: ["GOL"], name: "Keylor Navas", rating: 87 }
  ]
},

{
  id: "sampdoria_1991_1992",
  club: "Sampdoria",
  season: "1991/1992",
  type: "Vice histórico",
  categoryType: "runner_up",
  tier: "strong",

  teamOverall: 86,
  finalPower: 86,
  attack: 86,
  midfield: 86,
  defense: 85,
  mentality: 87,
  chemistry: 87,
  championsExperience: 84,
  historicalWeight: 87,
  clutch: 85,
  consistency: 85,
  style: "Equilibrado",

  players: [
    // Ajustado: removidos reservas extras e posições reduzidas para maior realismo
    { position: "ATA", positions: ["ATA", "CA"], name: "Roberto Mancini", rating: 88 },
    { position: "CA", positions: ["CA"], name: "Gianluca Vialli", rating: 89 },
    { position: "MD", positions: ["MD"], name: "Attilio Lombardo", rating: 83 },

    { position: "MEI", positions: ["MEI", "MC"], name: "Srečko Katanec", rating: 82 },
    { position: "MC", positions: ["MC", "VOL"], name: "Toninho Cerezo", rating: 86 },
    { position: "VOL", positions: ["VOL", "MC"], name: "Fausto Pari", rating: 80 },

    { position: "LE", positions: ["LE"], name: "Amedeo Carboni", rating: 81 },
    { position: "ZAG", positions: ["ZAG"], name: "Pietro Vierchowod", rating: 87 },
    { position: "ZAG", positions: ["ZAG"], name: "Luca Pellegrini", rating: 82 },
    { position: "LD", positions: ["LD"], name: "Moreno Mannini", rating: 82 },
    { position: "GOL", positions: ["GOL"], name: "Gianluca Pagliuca", rating: 86 }
  ]
},

{
  id: "benfica_1989_1990",
  club: "Benfica",
  season: "1989/1990",
  type: "Vice histórico",
  categoryType: "runner_up",
  tier: "medium",

  teamOverall: 85,
  finalPower: 85,
  attack: 85,
  midfield: 84,
  defense: 84,
  mentality: 86,
  chemistry: 85,
  championsExperience: 86,
  historicalWeight: 86,
  clutch: 84,
  consistency: 84,
  style: "Equilibrado",

  players: [
    // Ajustado: removidos reservas extras, posições reduzidas e fechamento JS corrigido
    { position: "ATA", positions: ["ATA", "CA"], name: "Mats Magnusson", rating: 84 },
    { position: "CA", positions: ["CA"], name: "Vata", rating: 83 },
    { position: "MD", positions: ["MD", "PD"], name: "Pacheco", rating: 82 },

    { position: "MEI", positions: ["MEI", "MC"], name: "Valdo", rating: 87 },
    { position: "MC", positions: ["MC", "VOL"], name: "Jonas Thern", rating: 84 },
    { position: "VOL", positions: ["VOL", "MC"], name: "Diamantino", rating: 83 },

    { position: "LE", positions: ["LE"], name: "Álvaro Magalhães", rating: 81 },
    { position: "ZAG", positions: ["ZAG"], name: "Ricardo Gomes", rating: 86 },
    { position: "ZAG", positions: ["ZAG"], name: "Samuel", rating: 81 },
    { position: "LD", positions: ["LD", "ZAG"], name: "Veloso", rating: 82 },
    { position: "GOL", positions: ["GOL"], name: "Silvino", rating: 82 }
  ]
},

{
  id: "steaua_bucuresti_1988_1989",
  club: "Steaua București",
  season: "1988/1989",
  type: "Vice histórico",
  categoryType: "runner_up",
  tier: "medium",

  teamOverall: 84,
  finalPower: 84,
  attack: 84,
  midfield: 84,
  defense: 83,
  mentality: 85,
  chemistry: 86,
  championsExperience: 86,
  historicalWeight: 86,
  clutch: 83,
  consistency: 84,
  style: "Equilibrado",

  players: [
    // Ajustado: removidos reservas extras, removida duplicação de Iosif Rotariu e posições reduzidas
    { position: "ME", positions: ["ME", "ATA"], name: "Marius Lăcătuș", rating: 85 },
    { position: "CA", positions: ["CA", "ATA"], name: "Gavril Balint", rating: 84 },
    { position: "MD", positions: ["MD", "MEI"], name: "Ilie Dumitrescu", rating: 82 },

    { position: "MEI", positions: ["MEI", "MC"], name: "Gheorghe Hagi", rating: 89 },
    { position: "MC", positions: ["MC", "VOL"], name: "Tudorel Stoica", rating: 83 },
    { position: "VOL", positions: ["VOL", "MC"], name: "Iosif Rotariu", rating: 80 },

    { position: "LE", positions: ["LE", "ZAG"], name: "Adrian Bumbescu", rating: 80 },
    { position: "ZAG", positions: ["ZAG"], name: "Miodrag Belodedici", rating: 84 },
    { position: "ZAG", positions: ["ZAG"], name: "Ștefan Iovan", rating: 82 },
    { position: "LD", positions: ["LD", "ALA"], name: "Dan Petrescu", rating: 82 },
    { position: "GOL", positions: ["GOL"], name: "Silviu Lung", rating: 82 }
  ]
},

{
  id: "bayern_1986_1987",
  club: "Bayern München",
  season: "1986/1987",
  type: "Vice histórico",
  categoryType: "runner_up",
  tier: "strong",

  teamOverall: 86,
  finalPower: 86,
  attack: 84,
  midfield: 86,
  defense: 85,
  mentality: 88,
  chemistry: 86,
  championsExperience: 88,
  historicalWeight: 87,
  clutch: 85,
  consistency: 85,
  style: "Equilibrado",

  players: [
    // Ajustado: removidos reservas extras e posições reduzidas para maior realismo
    { position: "ATA", positions: ["ATA", "CA"], name: "Michael Rummenigge", rating: 83 },
    { position: "CA", positions: ["CA"], name: "Dieter Hoeneß", rating: 84 },
    { position: "MD", positions: ["MD", "ATA"], name: "Roland Wohlfarth", rating: 82 },

    { position: "MEI", positions: ["MEI", "MC"], name: "Lothar Matthäus", rating: 89 },
    { position: "MC", positions: ["MC", "VOL"], name: "Norbert Eder", rating: 82 },
    { position: "VOL", positions: ["VOL", "MC"], name: "Wolfgang Dremmler", rating: 82 },

    { position: "LE", positions: ["LE", "ALA"], name: "Andreas Brehme", rating: 86 },
    { position: "ZAG", positions: ["ZAG"], name: "Klaus Augenthaler", rating: 87 },
    { position: "ZAG", positions: ["ZAG"], name: "Hans Pflügler", rating: 82 },
    { position: "LD", positions: ["LD"], name: "Helmut Winklhofer", rating: 80 },
    { position: "GOL", positions: ["GOL"], name: "Jean-Marie Pfaff", rating: 88 }
  ]
},

{
  id: "juventus_1997_1998",
  club: "Juventus",
  season: "1997/1998",
  type: "Vice histórico",
  categoryType: "runner_up",
  tier: "elite",

  teamOverall: 87,
  finalPower: 88,
  attack: 89,
  midfield: 87,
  defense: 86,
  mentality: 89,
  chemistry: 88,
  championsExperience: 90,
  historicalWeight: 90,
  clutch: 88,
  consistency: 87,
  style: "Equilibrado",

  players: [
    // Ajustado: posições reduzidas e ratings balanceados para escala do jogo
    { position: "ATA", positions: ["ATA", "CA"], name: "Alessandro Del Piero", rating: 90 },
    { position: "CA", positions: ["CA"], name: "Filippo Inzaghi", rating: 88 },
    { position: "MEI", positions: ["MEI", "MC"], name: "Zinedine Zidane", rating: 91 },

    { position: "MD", positions: ["MD", "MC"], name: "Angelo Di Livio", rating: 83 },
    { position: "MC", positions: ["MC", "VOL"], name: "Didier Deschamps", rating: 86 },
    { position: "VOL", positions: ["VOL", "MC"], name: "Edgar Davids", rating: 86 },

    { position: "LE", positions: ["LE", "ALA"], name: "Gianluca Pessotto", rating: 82 },
    { position: "ZAG", positions: ["ZAG"], name: "Ciro Ferrara", rating: 86 },
    { position: "ZAG", positions: ["ZAG"], name: "Paolo Montero", rating: 85 },
    { position: "LD", positions: ["LD", "ZAG"], name: "Mark Iuliano", rating: 82 },
    { position: "GOL", positions: ["GOL"], name: "Angelo Peruzzi", rating: 88 }
  ]
},

{
  id: "ajax_1995_1996",
  club: "Ajax",
  season: "1995/1996",
  type: "Vice histórico",
  categoryType: "runner_up",
  tier: "elite",

  teamOverall: 89,
  finalPower: 89,
  attack: 88,
  midfield: 90,
  defense: 89,
  mentality: 90,
  chemistry: 92,
  championsExperience: 90,
  historicalWeight: 92,
  clutch: 88,
  consistency: 90,
  style: "Ofensivo",

  players: [
    // Ajustado: posições reduzidas e ratings balanceados para escala do jogo
    { position: "PE", positions: ["PE", "ATA"], name: "Marc Overmars", rating: 88 },
    { position: "CA", positions: ["CA"], name: "Patrick Kluivert", rating: 86 },
    { position: "PD", positions: ["PD", "MD"], name: "Finidi George", rating: 84 },

    { position: "MEI", positions: ["MEI", "MC"], name: "Jari Litmanen", rating: 89 },
    { position: "MC", positions: ["MC", "VOL"], name: "Edgar Davids", rating: 86 },
    { position: "VOL", positions: ["VOL", "MC"], name: "Clarence Seedorf", rating: 86 },

    { position: "LE", positions: ["LE"], name: "Frank de Boer", rating: 86 },
    { position: "ZAG", positions: ["ZAG"], name: "Danny Blind", rating: 86 },
    { position: "ZAG", positions: ["ZAG"], name: "Winston Bogarde", rating: 83 },
    { position: "LD", positions: ["LD", "ALA"], name: "Michael Reiziger", rating: 83 },
    { position: "GOL", positions: ["GOL"], name: "Edwin van der Sar", rating: 88 }
  ]
},

{
  id: "juventus_1996_1997",
  club: "Juventus",
  season: "1996/1997",
  type: "Vice histórico",
  categoryType: "runner_up",
  tier: "strong",

  teamOverall: 88,
  finalPower: 88,
  attack: 89,
  midfield: 88,
  defense: 87,
  mentality: 90,
  chemistry: 89,
  championsExperience: 91,
  historicalWeight: 91,
  clutch: 88,
  consistency: 88,
  style: "Equilibrado",

  players: [
    // Ajustado: posições reduzidas e ratings balanceados para escala do jogo
    { position: "ATA", positions: ["ATA", "CA"], name: "Alessandro Del Piero", rating: 90 },
    { position: "CA", positions: ["CA"], name: "Christian Vieri", rating: 87 },
    { position: "MD", positions: ["MD"], name: "Angelo Di Livio", rating: 83 },

    { position: "MEI", positions: ["MEI", "MC"], name: "Zinedine Zidane", rating: 90 },
    { position: "MC", positions: ["MC", "VOL"], name: "Didier Deschamps", rating: 86 },
    { position: "VOL", positions: ["VOL", "MC"], name: "Paulo Sousa", rating: 85 },

    { position: "LE", positions: ["LE"], name: "Gianluca Pessotto", rating: 82 },
    { position: "ZAG", positions: ["ZAG"], name: "Paolo Montero", rating: 85 },
    { position: "ZAG", positions: ["ZAG"], name: "Ciro Ferrara", rating: 85 },
    { position: "LD", positions: ["LD"], name: "Moreno Torricelli", rating: 82 },
    { position: "GOL", positions: ["GOL"], name: "Angelo Peruzzi", rating: 88 }
  ]
},

{
  id: "liverpool_2021_2022",
  club: "Liverpool",
  season: "2021/2022",
  type: "Vice elite",
  categoryType: "runner_up",
  tier: "strong",

  teamOverall: 89,
  finalPower: 89,
  attack: 91,
  midfield: 88,
  defense: 90,
  mentality: 90,
  chemistry: 91,
  championsExperience: 90,
  historicalWeight: 91,
  clutch: 88,
  consistency: 91,
  style: "Ofensivo",

  players: [
    // Ajustado: posições reduzidas e ratings balanceados
    { position: "PE", positions: ["PE", "ATA"], name: "Sadio Mané", rating: 89 },
    { position: "CA", positions: ["CA"], name: "Diogo Jota", rating: 84 },
    { position: "PD", positions: ["PD"], name: "Mohamed Salah", rating: 91 },

    { position: "MEI", positions: ["MEI", "MC"], name: "Thiago Alcântara", rating: 87 },
    { position: "MC", positions: ["MC", "VOL"], name: "Jordan Henderson", rating: 83 },
    { position: "VOL", positions: ["VOL", "MC"], name: "Fabinho", rating: 86 },

    { position: "LE", positions: ["LE", "ALA"], name: "Andy Robertson", rating: 86 },
    { position: "ZAG", positions: ["ZAG"], name: "Virgil van Dijk", rating: 90 },
    { position: "ZAG", positions: ["ZAG"], name: "Ibrahima Konaté", rating: 82 },
    { position: "LD", positions: ["LD", "ALA"], name: "T. Arnold", rating: 87 },
    { position: "GOL", positions: ["GOL"], name: "Alisson Becker", rating: 89 }
  ]
},

{
  id: "manchester_city_2020_2021",
  club: "Manchester City",
  season: "2020/2021",
  type: "Vice elite",
  categoryType: "runner_up",
  tier: "strong",

  teamOverall: 89,
  finalPower: 89,
  attack: 89,
  midfield: 92,
  defense: 89,
  mentality: 89,
  chemistry: 91,
  championsExperience: 86,
  historicalWeight: 89,
  clutch: 87,
  consistency: 91,
  style: "Ofensivo",

  players: [
    // Ajustado: posições reduzidas e ratings balanceados
    { position: "PE", positions: ["PE", "ME"], name: "Phil Foden", rating: 86 },
    { position: "CA", positions: ["CA", "MEI"], name: "Kevin De Bruyne", rating: 91 },
    { position: "PD", positions: ["PD", "MD"], name: "Riyad Mahrez", rating: 86 },

    { position: "MEI", positions: ["MEI", "MC"], name: "Bernardo Silva", rating: 86 },
    { position: "MC", positions: ["MC", "MEI"], name: "İlkay Gündoğan", rating: 85 },
    { position: "VOL", positions: ["VOL", "MC"], name: "Rodri", rating: 86 },

    { position: "LE", positions: ["LE", "ALA"], name: "João Cancelo", rating: 86 },
    { position: "ZAG", positions: ["ZAG"], name: "Rúben Dias", rating: 88 },
    { position: "ZAG", positions: ["ZAG"], name: "John Stones", rating: 84 },
    { position: "LD", positions: ["LD", "ALA"], name: "Kyle Walker", rating: 84 },
    { position: "GOL", positions: ["GOL"], name: "Ederson", rating: 88 }
  ]
}
];


const championTeams = [
{
  id: "steaua_bucuresti_1985_1986",
  club: "Steaua București",
  season: "1985/1986",
  type: "Campeão histórico",
  categoryType: "champion",
  tier: "medium",

  teamOverall: 84,
  finalPower: 85,
  attack: 83,
  midfield: 84,
  defense: 85,
  mentality: 88,
  chemistry: 86,
  championsExperience: 86,
  historicalWeight: 88,
  clutch: 90,
  consistency: 84,
  style: "Defensivo",

  players: [
    // Ajustado: posições reduzidas e ratings balanceados para escala do jogo
    { position: "ME", positions: ["ME", "ATA"], name: "Marius Lăcătuș", rating: 85 },
    { position: "CA", positions: ["CA"], name: "Victor Pițurcă", rating: 83 },
    { position: "ATA", positions: ["ATA", "CA"], name: "Gavril Balint", rating: 83 },

    { position: "MEI", positions: ["MEI", "MC"], name: "Ladislau Bölöni", rating: 84 },
    { position: "MC", positions: ["MC", "VOL"], name: "Tudorel Stoica", rating: 83 },
    { position: "VOL", positions: ["VOL", "MC"], name: "Lucian Bălan", rating: 80 },

    { position: "LE", positions: ["LE"], name: "Adrian Bumbescu", rating: 80 },
    { position: "ZAG", positions: ["ZAG"], name: "Miodrag Belodedici", rating: 84 },
    { position: "ZAG", positions: ["ZAG"], name: "Ștefan Iovan", rating: 82 },
    { position: "LD", positions: ["LD"], name: "Ilie Bărbulescu", rating: 79 },
    { position: "GOL", positions: ["GOL"], name: "Helmuth Duckadam", rating: 87 }
  ]
},

{
  id: "porto_1986_1987",
  club: "Porto",
  season: "1986/1987",
  type: "Campeão histórico",
  categoryType: "champion",
  tier: "strong",

  teamOverall: 86,
  finalPower: 87,
  attack: 87,
  midfield: 85,
  defense: 84,
  mentality: 89,
  chemistry: 88,
  championsExperience: 86,
  historicalWeight: 91,
  clutch: 91,
  consistency: 85,
  style: "Equilibrado",

  players: [
    // Ajustado: posições reduzidas para maior realismo
    { position: "PE", positions: ["PE", "ATA"], name: "Paulo Futre", rating: 89 },
    { position: "CA", positions: ["CA"], name: "Fernando Gomes", rating: 87 },
    { position: "PD", positions: ["PD", "ATA"], name: "Rabah Madjer", rating: 88 },

    { position: "MEI", positions: ["MEI", "MC"], name: "Jaime Magalhães", rating: 83 },
    { position: "MC", positions: ["MC", "VOL"], name: "António André", rating: 83 },
    { position: "VOL", positions: ["VOL", "MC"], name: "Frasco", rating: 82 },

    { position: "LE", positions: ["LE"], name: "Inácio", rating: 81 },
    { position: "ZAG", positions: ["ZAG"], name: "Celso", rating: 82 },
    { position: "ZAG", positions: ["ZAG"], name: "Eduardo Luís", rating: 81 },
    { position: "LD", positions: ["LD"], name: "João Pinto", rating: 84 },
    { position: "GOL", positions: ["GOL"], name: "Józef Młynarczyk", rating: 84 }
  ]
},

{
  id: "psv_1987_1988",
  club: "PSV",
  season: "1987/1988",
  type: "Campeão histórico",
  categoryType: "champion",
  tier: "strong",

  teamOverall: 85,
  finalPower: 86,
  attack: 84,
  midfield: 85,
  defense: 85,
  mentality: 88,
  chemistry: 87,
  championsExperience: 86,
  historicalWeight: 88,
  clutch: 89,
  consistency: 86,
  style: "Equilibrado",

  players: [
    // Ajustado: removidos reservas extras e posições reduzidas para maior realismo
    { position: "ATA", positions: ["ATA", "CA"], name: "Hans Gillhaus", rating: 83 },
    { position: "CA", positions: ["CA"], name: "Wim Kieft", rating: 85 },
    { position: "MD", positions: ["MD", "PD"], name: "Gerald Vanenburg", rating: 86 },

    { position: "ME", positions: ["ME", "MC"], name: "Søren Lerby", rating: 86 },
    { position: "MC", positions: ["MC", "VOL"], name: "Berry van Aerle", rating: 82 },
    { position: "VOL", positions: ["VOL", "MC"], name: "Frank Arnesen", rating: 84 },

    { position: "LE", positions: ["LE"], name: "Eric Gerets", rating: 84 },
    { position: "ZAG", positions: ["ZAG"], name: "Ronald Koeman", rating: 89 },
    { position: "ZAG", positions: ["ZAG"], name: "Ivan Nielsen", rating: 82 },
    { position: "LD", positions: ["LD"], name: "Jan Heintze", rating: 81 },
    { position: "GOL", positions: ["GOL"], name: "Van Breukelen", rating: 86 }
  ]
},

{
  id: "milan_1988_1989",
  club: "Milan",
  season: "1988/1989",
  type: "Campeão lendário",
  categoryType: "champion",
  tier: "elite",

  teamOverall: 91,
  finalPower: 92,
  attack: 91,
  midfield: 91,
  defense: 93,
  mentality: 94,
  chemistry: 93,
  championsExperience: 93,
  historicalWeight: 95,
  clutch: 94,
  consistency: 92,
  style: "Equilibrado",

  players: [
    // Ajustado: posições reduzidas e ratings mantidos por ser campeão lendário
    { position: "ATA", positions: ["ATA", "MEI"], name: "Ruud Gullit", rating: 92 },
    { position: "CA", positions: ["CA"], name: "Marco van Basten", rating: 94 },
    { position: "ME", positions: ["ME", "MC"], name: "Roberto Donadoni", rating: 87 },

    { position: "MEI", positions: ["MEI", "MC"], name: "Carlo Ancelotti", rating: 86 },
    { position: "MC", positions: ["MC", "VOL"], name: "Frank Rijkaard", rating: 91 },
    { position: "VOL", positions: ["VOL", "MC"], name: "Angelo Colombo", rating: 82 },

    { position: "LE", positions: ["LE"], name: "Paolo Maldini", rating: 90 },
    { position: "ZAG", positions: ["ZAG"], name: "Franco Baresi", rating: 94 },
    { position: "ZAG", positions: ["ZAG"], name: "Costacurta", rating: 87 },
    { position: "LD", positions: ["LD"], name: "Mauro Tassotti", rating: 86 },
    { position: "GOL", positions: ["GOL"], name: "Giovanni Galli", rating: 85 }
  ]
},

{
  id: "barcelona_1991_1992",
  club: "Barcelona",
  season: "1991/1992",
  type: "Campeão histórico",
  categoryType: "champion",
  tier: "strong",

  teamOverall: 88,
  finalPower: 89,
  attack: 89,
  midfield: 89,
  defense: 86,
  mentality: 90,
  chemistry: 90,
  championsExperience: 88,
  historicalWeight: 91,
  clutch: 91,
  consistency: 88,
  style: "Ofensivo",

  players: [
    // Ajustado: removidos reservas extras e posições reduzidas para maior realismo
    { position: "PE", positions: ["PE", "ATA"], name: "Hristo Stoichkov", rating: 90 },
    { position: "CA", positions: ["CA"], name: "Julio Salinas", rating: 84 },
    { position: "PD", positions: ["PD", "MD"], name: "Begiristain", rating: 84 },

    { position: "MEI", positions: ["MEI", "MC"], name: "Michael Laudrup", rating: 90 },
    { position: "MC", positions: ["MC", "VOL"], name: "Pep Guardiola", rating: 85 },
    { position: "VOL", positions: ["VOL", "MC"], name: "José Mari Bakero", rating: 84 },

    { position: "LE", positions: ["LE"], name: "Juan Carlos", rating: 80 },
    { position: "ZAG", positions: ["ZAG"], name: "Ronald Koeman", rating: 90 },
    { position: "ZAG", positions: ["ZAG"], name: "Albert Ferrer", rating: 82 },
    { position: "LD", positions: ["LD"], name: "Nando", rating: 81 },
    { position: "GOL", positions: ["GOL"], name: "Andoni Zubizarreta", rating: 86 }
  ]
},

{
  id: "marseille_1992_1993",
  club: "Marseille",
  season: "1992/1993",
  type: "Campeão histórico",
  categoryType: "champion",
  tier: "strong",

  teamOverall: 87,
  finalPower: 88,
  attack: 87,
  midfield: 88,
  defense: 87,
  mentality: 90,
  chemistry: 89,
  championsExperience: 87,
  historicalWeight: 90,
  clutch: 91,
  consistency: 87,
  style: "Equilibrado",

  players: [
    // Ajustado: removidos reservas extras e posições reduzidas para maior realismo
    { position: "PE", positions: ["PE", "ATA"], name: "Alen Bokšić", rating: 87 },
    { position: "CA", positions: ["CA"], name: "Rudi Völler", rating: 86 },
    { position: "PD", positions: ["PD", "MD"], name: "Abédi Pelé", rating: 89 },

    { position: "MEI", positions: ["MEI", "MC"], name: "Franck Sauzée", rating: 85 },
    { position: "MC", positions: ["MC", "VOL"], name: "Didier Deschamps", rating: 86 },
    { position: "VOL", positions: ["VOL", "MC"], name: "Jean-Jacques Eydelie", rating: 80 },

    { position: "LE", positions: ["LE"], name: "Éric Di Meco", rating: 82 },
    { position: "ZAG", positions: ["ZAG"], name: "Marcel Desailly", rating: 88 },
    { position: "ZAG", positions: ["ZAG"], name: "Basile Boli", rating: 85 },
    { position: "LD", positions: ["LD"], name: "Jocelyn Angloma", rating: 83 },
    { position: "GOL", positions: ["GOL"], name: "Fabien Barthez", rating: 84 }
  ]
},

{
  id: "ajax_1994_1995",
  club: "Ajax",
  season: "1994/1995",
  type: "Campeão lendário",
  categoryType: "champion",
  tier: "elite",

  teamOverall: 89,
  finalPower: 90,
  attack: 89,
  midfield: 90,
  defense: 89,
  mentality: 91,
  chemistry: 93,
  championsExperience: 89,
  historicalWeight: 93,
  clutch: 91,
  consistency: 91,
  style: "Ofensivo",

  players: [
    // Ajustado: posições reduzidas e ratings balanceados para escala do jogo
    { position: "PE", positions: ["PE", "ATA"], name: "Marc Overmars", rating: 88 },
    { position: "CA", positions: ["CA"], name: "Patrick Kluivert", rating: 86 },
    { position: "PD", positions: ["PD", "MD"], name: "Finidi George", rating: 84 },

    { position: "MEI", positions: ["MEI", "MC"], name: "Jari Litmanen", rating: 89 },
    { position: "MC", positions: ["MC", "VOL"], name: "Clarence Seedorf", rating: 86 },
    { position: "VOL", positions: ["VOL", "MC"], name: "Edgar Davids", rating: 86 },

    { position: "LE", positions: ["LE", "ZAG"], name: "Frank de Boer", rating: 86 },
    { position: "ZAG", positions: ["ZAG"], name: "Danny Blind", rating: 86 },
    { position: "ZAG", positions: ["ZAG"], name: "Frank Rijkaard", rating: 88 },
    { position: "LD", positions: ["LD", "ALA"], name: "Michael Reiziger", rating: 83 },
    { position: "GOL", positions: ["GOL"], name: "Van der Sar", rating: 88 }
  ]
},

{
  id: "juventus_1995_1996",
  club: "Juventus",
  season: "1995/1996",
  type: "Campeão histórico",
  categoryType: "champion",
  tier: "strong",

  teamOverall: 87,
  finalPower: 87,
  attack: 87,
  midfield: 87,
  defense: 87,
  mentality: 90,
  chemistry: 88,
  championsExperience: 90,
  historicalWeight: 90,
  clutch: 90,
  consistency: 87,
  style: "Equilibrado",

  players: [
    // Ajustado: removidos reservas extras e posições reduzidas para maior realismo
    { position: "ATA", positions: ["ATA", "CA"], name: "Alessandro Del Piero", rating: 89 },
    { position: "CA", positions: ["CA"], name: "Fabrizio Ravanelli", rating: 86 },
    { position: "MD", positions: ["MD"], name: "Angelo Di Livio", rating: 83 },

    { position: "MEI", positions: ["MEI", "MC"], name: "Gianluca Vialli", rating: 88 },
    { position: "MC", positions: ["MC", "VOL"], name: "Didier Deschamps", rating: 86 },
    { position: "VOL", positions: ["VOL", "MC"], name: "Antonio Conte", rating: 84 },

    { position: "LE", positions: ["LE"], name: "Gianluca Pessotto", rating: 82 },
    { position: "ZAG", positions: ["ZAG"], name: "Ciro Ferrara", rating: 86 },
    { position: "ZAG", positions: ["ZAG"], name: "Pietro Vierchowod", rating: 84 },
    { position: "LD", positions: ["LD"], name: "Moreno Torricelli", rating: 82 },
    { position: "GOL", positions: ["GOL"], name: "Angelo Peruzzi", rating: 88 }
  ]
},

{
  id: "borussia_dortmund_1996_1997",
  club: "Borussia Dortmund",
  season: "1996/1997",
  type: "Campeão histórico",
  categoryType: "champion",
  tier: "strong",

  teamOverall: 86,
  finalPower: 86,
  attack: 85,
  midfield: 86,
  defense: 87,
  mentality: 91,
  chemistry: 88,
  championsExperience: 87,
  historicalWeight: 89,
  clutch: 91,
  consistency: 86,
  style: "Equilibrado",

  players: [
    // Ajustado: posições reduzidas e jogadores mantidos como 11 principal
    { position: "ATA", positions: ["ATA", "CA"], name: "Karl-Heinz Riedle", rating: 86 },
    { position: "CA", positions: ["CA"], name: "Stéphane Chapuisat", rating: 86 },
    { position: "MEI", positions: ["MEI", "MC"], name: "Andreas Möller", rating: 88 },

    { position: "MD", positions: ["MD", "MC"], name: "Lars Ricken", rating: 83 },
    { position: "MC", positions: ["MC", "VOL"], name: "Paulo Sousa", rating: 86 },
    { position: "VOL", positions: ["VOL", "MC"], name: "Paul Lambert", rating: 82 },

    { position: "LE", positions: ["LE", "ZAG"], name: "Stefan Reuter", rating: 84 },
    { position: "ZAG", positions: ["ZAG"], name: "Jürgen Kohler", rating: 89 },
    { position: "ZAG", positions: ["ZAG"], name: "Matthias Sammer", rating: 90 },
    { position: "LD", positions: ["LD", "MC"], name: "Stefan Freund", rating: 82 },
    { position: "GOL", positions: ["GOL"], name: "Stefan Klos", rating: 84 }
  ]
},

{
  id: "real_madrid_1997_1998",
  club: "Real Madrid",
  season: "1997/1998",
  type: "Campeão histórico",
  categoryType: "champion",
  tier: "strong",

  teamOverall: 87,
  finalPower: 88,
  attack: 87,
  midfield: 88,
  defense: 86,
  mentality: 90,
  chemistry: 88,
  championsExperience: 91,
  historicalWeight: 91,
  clutch: 91,
  consistency: 86,
  style: "Equilibrado",

  players: [
    // Ajustado: removidos reservas extras, posições reduzidas e ratings balanceados
    { position: "PE", positions: ["PE", "ME"], name: "Sávio", rating: 84 },
    { position: "CA", positions: ["CA"], name: "Predrag Mijatović", rating: 88 },
    { position: "ATA", positions: ["ATA", "CA"], name: "Raúl González", rating: 88 },

    { position: "MEI", positions: ["MEI", "MC"], name: "Clarence Seedorf", rating: 86 },
    { position: "MC", positions: ["MC", "MEI"], name: "Fernando Redondo", rating: 88 },
    { position: "VOL", positions: ["VOL", "MC"], name: "Christian Karembeu", rating: 83 },

    { position: "LE", positions: ["LE", "ALA"], name: "Roberto Carlos", rating: 90 },
    { position: "ZAG", positions: ["ZAG"], name: "Fernando Hierro", rating: 87 },
    { position: "ZAG", positions: ["ZAG"], name: "Manuel Sanchís", rating: 84 },
    { position: "LD", positions: ["LD"], name: "Christian Panucci", rating: 83 },
    { position: "GOL", positions: ["GOL"], name: "Bodo Illgner", rating: 84 }
  ]
},


{
  id: "manchester_united_1998_1999",
  club: "Manchester United",
  season: "1998/1999",
  type: "Campeão lendário",
  categoryType: "champion",
  tier: "elite",

  teamOverall: 89,
  finalPower: 90,
  attack: 90,
  midfield: 90,
  defense: 87,
  mentality: 94,
  chemistry: 91,
  championsExperience: 91,
  historicalWeight: 95,
  clutch: 95,
  consistency: 89,
  style: "Ofensivo",

  players: [
    // Ajustado: removidos reservas extras, posições reduzidas e ratings balanceados
    { position: "ME", positions: ["ME"], name: "Ryan Giggs", rating: 88 },
    { position: "CA", positions: ["CA"], name: "Dwight Yorke", rating: 87 },
    { position: "ATA", positions: ["ATA", "CA"], name: "Andy Cole", rating: 86 },

    { position: "MD", positions: ["MD"], name: "David Beckham", rating: 89 },
    { position: "MC", positions: ["MC", "MEI"], name: "Paul Scholes", rating: 88 },
    { position: "VOL", positions: ["VOL", "MC"], name: "Roy Keane", rating: 90 },

    { position: "LE", positions: ["LE"], name: "Denis Irwin", rating: 84 },
    { position: "ZAG", positions: ["ZAG"], name: "Jaap Stam", rating: 89 },
    { position: "ZAG", positions: ["ZAG"], name: "Ronny Johnsen", rating: 82 },
    { position: "LD", positions: ["LD"], name: "Gary Neville", rating: 85 },
    { position: "GOL", positions: ["GOL"], name: "Peter Schmeichel", rating: 90 }
  ]
},

{
  id: "milan_2002_2003",
  club: "Milan",
  season: "2002/2003",
  type: "Campeão histórico",
  categoryType: "champion",
  tier: "elite",

  teamOverall: 89,
  finalPower: 90,
  attack: 88,
  midfield: 91,
  defense: 91,
  mentality: 92,
  chemistry: 91,
  championsExperience: 93,
  historicalWeight: 93,
  clutch: 91,
  consistency: 90,
  style: "Equilibrado",

  players: [
    // Ajustado: removidos reservas extras, Cafu removido por não pertencer a 2002/2003 e posições reduzidas
    { position: "ATA", positions: ["ATA", "CA"], name: "Andriy Shevchenko", rating: 91 },
    { position: "CA", positions: ["CA"], name: "Filippo Inzaghi", rating: 88 },
    { position: "MEI", positions: ["MEI"], name: "Rui Costa", rating: 88 },

    { position: "MC", positions: ["MC", "MEI"], name: "Clarence Seedorf", rating: 87 },
    { position: "MC", positions: ["MC", "VOL"], name: "Andrea Pirlo", rating: 88 },
    { position: "VOL", positions: ["VOL", "MC"], name: "Gennaro Gattuso", rating: 86 },

    { position: "LE", positions: ["LE", "ZAG"], name: "Paolo Maldini", rating: 90 },
    { position: "ZAG", positions: ["ZAG"], name: "Alessandro Nesta", rating: 90 },
    { position: "ZAG", positions: ["ZAG"], name: "Alessandro Costacurta", rating: 85 },
    { position: "LD", positions: ["LD"], name: "Dario Šimić", rating: 80 },
    { position: "GOL", positions: ["GOL"], name: "Dida", rating: 86 }
  ]
},

{
  id: "porto_2003_2004",
  club: "Porto",
  season: "2003/2004",
  type: "Campeão histórico",
  categoryType: "champion",
  tier: "strong",

  teamOverall: 87,
  finalPower: 88,
  attack: 85,
  midfield: 88,
  defense: 86,
  mentality: 91,
  chemistry: 91,
  championsExperience: 86,
  historicalWeight: 91,
  clutch: 92,
  consistency: 88,
  style: "Equilibrado",

  players: [
    // Ajustado: removidos reservas extras e posições reduzidas para maior realismo
    { position: "PE", positions: ["PE", "ATA"], name: "Derlei", rating: 84 },
    { position: "CA", positions: ["CA"], name: "Benni McCarthy", rating: 84 },
    { position: "PD", positions: ["PD", "MD"], name: "Carlos Alberto", rating: 83 },

    { position: "MEI", positions: ["MEI", "MC"], name: "Deco", rating: 89 },
    { position: "MC", positions: ["MC", "VOL"], name: "Maniche", rating: 86 },
    { position: "VOL", positions: ["VOL", "MC"], name: "Costinha", rating: 84 },

    { position: "LE", positions: ["LE"], name: "Nuno Valente", rating: 82 },
    { position: "ZAG", positions: ["ZAG"], name: "Ricardo Carvalho", rating: 88 },
    { position: "ZAG", positions: ["ZAG"], name: "Jorge Costa", rating: 83 },
    { position: "LD", positions: ["LD"], name: "Paulo Ferreira", rating: 83 },
    { position: "GOL", positions: ["GOL"], name: "Vítor Baía", rating: 85 }
  ]
},

{
  id: "liverpool_2004_2005",
  club: "Liverpool",
  season: "2004/2005",
  type: "Campeão histórico",
  categoryType: "champion",
  tier: "strong",

  teamOverall: 86,
  finalPower: 87,
  attack: 84,
  midfield: 88,
  defense: 85,
  mentality: 93,
  chemistry: 88,
  championsExperience: 88,
  historicalWeight: 92,
  clutch: 95,
  consistency: 83,
  style: "Equilibrado",

  players: [
    // Ajustado: removidos reservas extras e posições reduzidas para maior realismo
    { position: "ME", positions: ["ME", "LE"], name: "John Arne Riise", rating: 82 },
    { position: "CA", positions: ["CA"], name: "Milan Baroš", rating: 82 },
    { position: "ATA", positions: ["ATA", "CA"], name: "Djibril Cissé", rating: 82 },

    { position: "MEI", positions: ["MEI", "MC"], name: "Luis García", rating: 83 },
    { position: "MC", positions: ["MC", "MEI"], name: "Steven Gerrard", rating: 90 },
    { position: "VOL", positions: ["VOL", "MC"], name: "Xabi Alonso", rating: 86 },

    { position: "LE", positions: ["LE"], name: "Djimi Traoré", rating: 79 },
    { position: "ZAG", positions: ["ZAG"], name: "Jamie Carragher", rating: 85 },
    { position: "ZAG", positions: ["ZAG"], name: "Sami Hyypiä", rating: 84 },
    { position: "LD", positions: ["LD"], name: "Steve Finnan", rating: 81 },
    { position: "GOL", positions: ["GOL"], name: "Jerzy Dudek", rating: 83 }
  ]
},

{
  id: "barcelona_2005_2006",
  club: "Barcelona",
  season: "2005/2006",
  type: "Campeão histórico",
  categoryType: "champion",
  tier: "elite",

  teamOverall: 89,
  finalPower: 90,
  attack: 91,
  midfield: 89,
  defense: 87,
  mentality: 90,
  chemistry: 92,
  championsExperience: 88,
  historicalWeight: 93,
  clutch: 91,
  consistency: 90,
  style: "Ofensivo",

  players: [
    // Ajustado: removidos reservas extras, posições reduzidas e ratings balanceados
    { position: "PE", positions: ["PE", "MEI"], name: "Ronaldinho", rating: 94 },
    { position: "CA", positions: ["CA"], name: "Samuel Eto'o", rating: 90 },
    { position: "PD", positions: ["PD", "MD"], name: "Ludovic Giuly", rating: 83 },

    { position: "MEI", positions: ["MEI", "MC"], name: "Deco", rating: 89 },
    { position: "MC", positions: ["MC", "MEI"], name: "Xavi", rating: 87 },
    { position: "VOL", positions: ["VOL", "MC"], name: "Edmílson", rating: 82 },

    { position: "LE", positions: ["LE"], name: "Van Bronckhorst", rating: 82 },
    { position: "ZAG", positions: ["ZAG"], name: "Carles Puyol", rating: 88 },
    { position: "ZAG", positions: ["ZAG"], name: "Rafael Márquez", rating: 85 },
    { position: "LD", positions: ["LD", "ALA"], name: "Belletti", rating: 81 },
    { position: "GOL", positions: ["GOL"], name: "Víctor Valdés", rating: 83 }
  ]
},


{
  id: "milan_2006_2007",
  club: "Milan",
  season: "2006/2007",
  type: "Campeão histórico",
  categoryType: "champion",
  tier: "elite",

  teamOverall: 90,
  finalPower: 91,
  attack: 89,
  midfield: 92,
  defense: 90,
  mentality: 93,
  chemistry: 92,
  championsExperience: 94,
  historicalWeight: 94,
  clutch: 93,
  consistency: 90,
  style: "Equilibrado",

  players: [
    // Ajustado: removidos reservas extras, posições reduzidas e ratings balanceados
    { position: "ATA", positions: ["ATA", "CA"], name: "Filippo Inzaghi", rating: 88 },
    { position: "CA", positions: ["CA"], name: "Alberto Gilardino", rating: 85 },
    { position: "MEI", positions: ["MEI"], name: "Kaká", rating: 93 },

    { position: "ME", positions: ["ME", "MC"], name: "Clarence Seedorf", rating: 89 },
    { position: "MC", positions: ["MC", "VOL"], name: "Andrea Pirlo", rating: 91 },
    { position: "VOL", positions: ["VOL", "MC"], name: "Gennaro Gattuso", rating: 88 },

    { position: "LE", positions: ["LE", "ZAG"], name: "Paolo Maldini", rating: 89 },
    { position: "ZAG", positions: ["ZAG"], name: "Alessandro Nesta", rating: 90 },
    { position: "ZAG", positions: ["ZAG"], name: "Kakha Kaladze", rating: 83 },
    { position: "LD", positions: ["LD"], name: "Massimo Oddo", rating: 82 },
    { position: "GOL", positions: ["GOL"], name: "Dida", rating: 86 }
  ]
},

{
  id: "manchester_united_2007_2008",
  club: "Manchester United",
  season: "2007/2008",
  type: "Campeão histórico",
  categoryType: "champion",
  tier: "elite",

  teamOverall: 91,
  finalPower: 91,
  attack: 93,
  midfield: 90,
  defense: 91,
  mentality: 92,
  chemistry: 91,
  championsExperience: 92,
  historicalWeight: 94,
  clutch: 93,
  consistency: 91,
  style: "Equilibrado",

  players: [
    // Ajustado: removidos reservas extras, posições reduzidas e ratings balanceados
    { position: "PE", positions: ["PE", "ATA"], name: "Cristiano Ronaldo", rating: 95 },
    { position: "CA", positions: ["CA", "ATA"], name: "Wayne Rooney", rating: 89 },
    { position: "ATA", positions: ["ATA", "CA"], name: "Carlos Tévez", rating: 88 },

    { position: "MEI", positions: ["MEI", "MC"], name: "Ryan Giggs", rating: 86 },
    { position: "MC", positions: ["MC", "VOL"], name: "Paul Scholes", rating: 88 },
    { position: "VOL", positions: ["VOL", "MC"], name: "Michael Carrick", rating: 85 },

    { position: "LE", positions: ["LE", "ALA"], name: "Patrice Evra", rating: 87 },
    { position: "ZAG", positions: ["ZAG"], name: "Rio Ferdinand", rating: 89 },
    { position: "ZAG", positions: ["ZAG"], name: "Nemanja Vidić", rating: 90 },
    { position: "LD", positions: ["LD"], name: "Wes Brown", rating: 81 },
    { position: "GOL", positions: ["GOL"], name: "Van der Sar", rating: 88 }
  ]
},

{
  id: "barcelona_2008_2009",
  club: "Barcelona",
  season: "2008/2009",
  type: "Campeão histórico",
  categoryType: "champion",
  tier: "elite",

  teamOverall: 92,
  finalPower: 93,
  attack: 94,
  midfield: 94,
  defense: 89,
  mentality: 93,
  chemistry: 95,
  championsExperience: 92,
  historicalWeight: 94,
  clutch: 93,
  consistency: 93,
  style: "Ofensivo",

  players: [
    // Ajustado: posições reduzidas e ratings balanceados para escala do jogo
    { position: "PE", positions: ["PE", "CA"], name: "Thierry Henry", rating: 89 },
    { position: "CA", positions: ["CA"], name: "Samuel Eto'o", rating: 90 },
    { position: "PD", positions: ["PD", "MEI"], name: "Lionel Messi", rating: 97 },

    { position: "MEI", positions: ["MEI", "MC"], name: "Andrés Iniesta", rating: 91 },
    { position: "MC", positions: ["MC", "MEI"], name: "Xavi", rating: 92 },
    { position: "VOL", positions: ["VOL", "MC"], name: "Sergio Busquets", rating: 86 },

    { position: "LE", positions: ["LE"], name: "Éric Abidal", rating: 84 },
    { position: "ZAG", positions: ["ZAG"], name: "Carles Puyol", rating: 88 },
    { position: "ZAG", positions: ["ZAG"], name: "Gerard Piqué", rating: 86 },
    { position: "LD", positions: ["LD", "ALA"], name: "Dani Alves", rating: 89 },
    { position: "GOL", positions: ["GOL"], name: "Víctor Valdés", rating: 85 }
  ]
},

{
  id: "inter_2009_2010",
  club: "Inter de Milão",
  season: "2009/2010",
  type: "Campeão histórico",
  categoryType: "champion",
  tier: "elite",

  teamOverall: 90,
  finalPower: 91,
  attack: 90,
  midfield: 89,
  defense: 92,
  mentality: 93,
  chemistry: 91,
  championsExperience: 92,
  historicalWeight: 93,
  clutch: 94,
  consistency: 90,
  style: "Defensivo",

  players: [
    // Ajustado: posições reduzidas e ratings balanceados para escala do jogo
    { position: "PE", positions: ["PE", "ATA"], name: "Samuel Eto'o", rating: 89 },
    { position: "CA", positions: ["CA"], name: "Diego Milito", rating: 89 },
    { position: "PD", positions: ["PD", "MEI"], name: "Wesley Sneijder", rating: 90 },

    { position: "MEI", positions: ["MEI", "MC"], name: "Dejan Stanković", rating: 85 },
    { position: "MC", positions: ["MC", "VOL"], name: "Esteban Cambiasso", rating: 87 },
    { position: "VOL", positions: ["VOL", "MC"], name: "Thiago Motta", rating: 84 },

    { position: "LE", positions: ["LE", "ZAG"], name: "Cristian Chivu", rating: 83 },
    { position: "ZAG", positions: ["ZAG"], name: "Walter Samuel", rating: 88 },
    { position: "ZAG", positions: ["ZAG"], name: "Lúcio", rating: 89 },
    { position: "LD", positions: ["LD", "ALA"], name: "Maicon", rating: 89 },
    { position: "GOL", positions: ["GOL"], name: "Júlio César", rating: 89 }
  ]
},

{
  id: "barcelona_2010_2011",
  club: "Barcelona",
  season: "2010/2011",
  type: "Campeão lendário",
  categoryType: "champion",
  tier: "elite",

  teamOverall: 93,
  finalPower: 93,
  attack: 94,
  midfield: 95,
  defense: 89,
  mentality: 94,
  chemistry: 96,
  championsExperience: 94,
  historicalWeight: 96,
  clutch: 94,
  consistency: 95,
  style: "Ofensivo",

  players: [
    // Ajustado: posições reduzidas e ratings balanceados para escala do jogo
    { position: "PE", positions: ["PE", "ATA"], name: "David Villa", rating: 89 },
    { position: "CA", positions: ["CA", "MEI", "PD"], name: "Lionel Messi", rating: 99 },
    { position: "PD", positions: ["PD", "MD"], name: "Pedro Rodríguez", rating: 85 },

    { position: "MEI", positions: ["MEI", "MC"], name: "Andrés Iniesta", rating: 92 },
    { position: "MC", positions: ["MC", "MEI"], name: "Xavi", rating: 93 },
    { position: "VOL", positions: ["VOL", "MC"], name: "Sergio Busquets", rating: 89 },

    { position: "LE", positions: ["LE", "ZAG"], name: "Éric Abidal", rating: 85 },
    { position: "ZAG", positions: ["ZAG"], name: "Carles Puyol", rating: 88 },
    { position: "ZAG", positions: ["ZAG"], name: "Gerard Piqué", rating: 88 },
    { position: "LD", positions: ["LD", "ALA"], name: "Dani Alves", rating: 89 },
    { position: "GOL", positions: ["GOL"], name: "Víctor Valdés", rating: 86 }
  ]
},

{
  id: "chelsea_2011_2012",
  club: "Chelsea",
  season: "2011/2012",
  type: "Campeão histórico",
  categoryType: "champion",
  tier: "strong",

  teamOverall: 86,
  finalPower: 86,
  attack: 86,
  midfield: 85,
  defense: 86,
  mentality: 92,
  chemistry: 86,
  championsExperience: 91,
  historicalWeight: 90,
  clutch: 94,
  consistency: 84,
  style: "Defensivo",

  players: [
    // Ajustado: posições reduzidas e ratings balanceados para escala do jogo
    { position: "PE", positions: ["PE", "MEI"], name: "Juan Mata", rating: 86 },
    { position: "CA", positions: ["CA"], name: "Didier Drogba", rating: 90 },
    { position: "PD", positions: ["PD", "PE"], name: "Salomon Kalou", rating: 80 },

    { position: "MEI", positions: ["MEI", "MC"], name: "Frank Lampard", rating: 89 },
    { position: "MC", positions: ["MC", "VOL"], name: "Ramires", rating: 84 },
    { position: "VOL", positions: ["VOL", "MC"], name: "John Obi Mikel", rating: 81 },

    { position: "LE", positions: ["LE", "ALA"], name: "Ashley Cole", rating: 86 },
    { position: "ZAG", positions: ["ZAG"], name: "John Terry", rating: 86 },
    { position: "ZAG", positions: ["ZAG"], name: "Gary Cahill", rating: 82 },
    { position: "LD", positions: ["LD", "ZAG"], name: "Branislav Ivanović", rating: 84 },
    { position: "GOL", positions: ["GOL"], name: "Petr Čech", rating: 88 }
  ]
},

{
  id: "bayern_2012_2013",
  club: "Bayern München",
  season: "2012/2013",
  type: "Campeão histórico",
  categoryType: "champion",
  tier: "elite",

  teamOverall: 91,
  finalPower: 92,
  attack: 92,
  midfield: 91,
  defense: 90,
  mentality: 93,
  chemistry: 93,
  championsExperience: 92,
  historicalWeight: 94,
  clutch: 93,
  consistency: 93,
  style: "Ofensivo",

  players: [
    // Ajustado: removidos reservas extras, posições reduzidas e ratings balanceados
    { position: "PE", positions: ["PE", "ME"], name: "Franck Ribéry", rating: 91 },
    { position: "CA", positions: ["CA"], name: "Mario Mandžukić", rating: 86 },
    { position: "PD", positions: ["PD", "PE"], name: "Arjen Robben", rating: 90 },

    { position: "MEI", positions: ["MEI", "ATA"], name: "Thomas Müller", rating: 87 },
    { position: "MC", positions: ["MC", "VOL"], name: "Bastian Schweinsteiger", rating: 89 },
    { position: "VOL", positions: ["VOL", "MC"], name: "Javi Martínez", rating: 87 },

    { position: "LE", positions: ["LE", "ALA"], name: "David Alaba", rating: 85 },
    { position: "ZAG", positions: ["ZAG"], name: "Dante", rating: 84 },
    { position: "ZAG", positions: ["ZAG"], name: "Jérôme Boateng", rating: 85 },
    { position: "LD", positions: ["LD", "MC"], name: "Philipp Lahm", rating: 90 },
    { position: "GOL", positions: ["GOL"], name: "Manuel Neuer", rating: 90 }
  ]
},

{
  id: "real_madrid_2013_2014",
  club: "Real Madrid",
  season: "2013/2014",
  type: "Campeão histórico",
  categoryType: "champion",
  tier: "elite",

  teamOverall: 91,
  finalPower: 92,
  attack: 94,
  midfield: 90,
  defense: 88,
  mentality: 93,
  chemistry: 91,
  championsExperience: 94,
  historicalWeight: 95,
  clutch: 94,
  consistency: 90,
  style: "Ofensivo",

  players: [
    // Ajustado: removidos reservas extras, posições reduzidas e ratings balanceados
    { position: "PE", positions: ["PE", "ATA"], name: "Cristiano Ronaldo", rating: 97 },
    { position: "CA", positions: ["CA"], name: "Karim Benzema", rating: 89 },
    { position: "PD", positions: ["PD", "ATA"], name: "Gareth Bale", rating: 89 },

    { position: "MEI", positions: ["MEI", "MC"], name: "Ángel Di María", rating: 88 },
    { position: "MC", positions: ["MC", "MEI"], name: "Luka Modrić", rating: 89 },
    { position: "VOL", positions: ["VOL", "MC"], name: "Xabi Alonso", rating: 88 },

    { position: "LE", positions: ["LE", "ALA"], name: "Marcelo", rating: 87 },
    { position: "ZAG", positions: ["ZAG"], name: "Sergio Ramos", rating: 90 },
    { position: "ZAG", positions: ["ZAG"], name: "Pepe", rating: 87 },
    { position: "LD", positions: ["LD"], name: "Dani Carvajal", rating: 82 },
    { position: "GOL", positions: ["GOL"], name: "Iker Casillas", rating: 87 }
  ]
},

{
  id: "barcelona_2014_2015",
  club: "Barcelona",
  season: "2014/2015",
  type: "Campeão histórico",
  categoryType: "champion",
  tier: "elite",

  teamOverall: 92,
  finalPower: 93,
  attack: 96,
  midfield: 92,
  defense: 88,
  mentality: 93,
  chemistry: 94,
  championsExperience: 94,
  historicalWeight: 95,
  clutch: 94,
  consistency: 92,
  style: "Ofensivo",

  players: [
    // Ajustado: removidos reservas extras, posições reduzidas e rating de Messi balanceado
    { position: "PE", positions: ["PE", "ATA"], name: "Neymar", rating: 95 },
    { position: "CA", positions: ["CA"], name: "Luis Suárez", rating: 94 },
    { position: "PD", positions: ["PD", "MEI"], name: "Lionel Messi", rating: 99 },

    { position: "MEI", positions: ["MEI", "MC"], name: "Andrés Iniesta", rating: 90 },
    { position: "MC", positions: ["MC", "MEI"], name: "Ivan Rakitić", rating: 86 },
    { position: "VOL", positions: ["VOL", "MC"], name: "Sergio Busquets", rating: 89 },

    { position: "LE", positions: ["LE", "ALA"], name: "Jordi Alba", rating: 86 },
    { position: "ZAG", positions: ["ZAG"], name: "Gerard Piqué", rating: 87 },
    { position: "ZAG", positions: ["ZAG", "VOL"], name: "Javier Mascherano", rating: 84 },
    { position: "LD", positions: ["LD", "ALA"], name: "Dani Alves", rating: 86 },
    { position: "GOL", positions: ["GOL"], name: "Marc-André ter Stegen", rating: 84 }
  ]
},

{
  id: "real_madrid_2015_2016",
  club: "Real Madrid",
  season: "2015/2016",
  type: "Campeão histórico",
  categoryType: "champion",
  tier: "elite",

  teamOverall: 90,
  finalPower: 91,
  attack: 94,
  midfield: 91,
  defense: 88,
  mentality: 93,
  chemistry: 91,
  championsExperience: 94,
  historicalWeight: 94,
  clutch: 94,
  consistency: 89,
  style: "Ofensivo",

  players: [
    // Ajustado: posições reduzidas e ratings balanceados para escala do jogo
    { position: "PE", positions: ["PE", "ATA"], name: "Cristiano Ronaldo", rating: 99 },
    { position: "CA", positions: ["CA"], name: "Karim Benzema", rating: 88 },
    { position: "PD", positions: ["PD", "ATA"], name: "Gareth Bale", rating: 88 },

{ position: "MC", positions: ["MC", "VOL", "MEI"], name: "Toni Kroos", rating: 88 },
    { position: "MC", positions: ["MC", "MEI"], name: "Luka Modrić", rating: 90 },
    { position: "VOL", positions: ["VOL", "MC"], name: "Casemiro", rating: 85 },

    { position: "LE", positions: ["LE", "ALA"], name: "Marcelo", rating: 87 },
    { position: "ZAG", positions: ["ZAG"], name: "Sergio Ramos", rating: 95 },
    { position: "ZAG", positions: ["ZAG"], name: "Raphael Varane", rating: 87 },
    { position: "LD", positions: ["LD", "ALA"], name: "Dani Carvajal", rating: 85 },
    { position: "GOL", positions: ["GOL"], name: "Keylor Navas", rating: 87 }
  ]
},

{
  id: "liverpool_2018_2019",
  club: "Liverpool",
  season: "2018/2019",
  type: "Campeão histórico",
  categoryType: "champion",
  tier: "elite",

  teamOverall: 90,
  finalPower: 91,
  attack: 91,
  midfield: 87,
  defense: 92,
  mentality: 93,
  chemistry: 93,
  championsExperience: 89,
  historicalWeight: 94,
  clutch: 93,
  consistency: 92,
  style: "Ofensivo",

  players: [
    // Ajustado: removidos reservas extras, posições reduzidas e ratings balanceados
    { position: "PE", positions: ["PE", "ATA"], name: "Sadio Mané", rating: 89 },
    { position: "CA", positions: ["CA"], name: "Roberto Firmino", rating: 87 },
    { position: "PD", positions: ["PD"], name: "Mohamed Salah", rating: 93 },

    { position: "MEI", positions: ["MEI", "MC"], name: "Georginio Wijnaldum", rating: 84 },
    { position: "MC", positions: ["MC", "VOL"], name: "Jordan Henderson", rating: 83 },
    { position: "VOL", positions: ["VOL", "MC"], name: "Fabinho", rating: 86 },

    { position: "LE", positions: ["LE", "ALA"], name: "Andy Robertson", rating: 86 },
    { position: "ZAG", positions: ["ZAG"], name: "Virgil van Dijk", rating: 93 },
    { position: "ZAG", positions: ["ZAG"], name: "Joël Matip", rating: 84 },
    { position: "LD", positions: ["LD", "ALA"], name: "T. Arnold", rating: 86 },
    { position: "GOL", positions: ["GOL"], name: "Alisson Becker", rating: 89 }
  ]
},

{
  id: "bayern_2019_2020",
  club: "Bayern München",
  season: "2019/2020",
  type: "Campeão histórico",
  categoryType: "champion",
  tier: "elite",

  teamOverall: 92,
  finalPower: 93,
  attack: 94,
  midfield: 91,
  defense: 90,
  mentality: 93,
  chemistry: 94,
  championsExperience: 93,
  historicalWeight: 95,
  clutch: 94,
  consistency: 94,
  style: "Ofensivo",

  players: [
    // Ajustado: removidos reservas extras, posições reduzidas e ratings balanceados
    { position: "PE", positions: ["PE", "ME"], name: "Serge Gnabry", rating: 87 },
    { position: "CA", positions: ["CA"], name: "Robert Lewandowski", rating: 94 },
    { position: "PD", positions: ["PD", "PE"], name: "Kingsley Coman", rating: 85 },

    { position: "MEI", positions: ["MEI", "ATA"], name: "Thomas Müller", rating: 88 },
    { position: "MC", positions: ["MC", "VOL"], name: "Thiago Alcântara", rating: 89 },
    { position: "VOL", positions: ["VOL", "MC"], name: "Joshua Kimmich", rating: 88 },

    { position: "LE", positions: ["LE", "ALA"], name: "Alphonso Davies", rating: 85 },
    { position: "ZAG", positions: ["ZAG"], name: "David Alaba", rating: 86 },
    { position: "ZAG", positions: ["ZAG"], name: "Jérôme Boateng", rating: 84 },
    { position: "LD", positions: ["LD", "ALA"], name: "Benjamin Pavard", rating: 83 },
    { position: "GOL", positions: ["GOL"], name: "Manuel Neuer", rating: 90 }
  ]
},

{
  id: "chelsea_2020_2021",
  club: "Chelsea",
  season: "2020/2021",
  type: "Campeão histórico",
  categoryType: "champion",
  tier: "strong",

  teamOverall: 88,
  finalPower: 89,
  attack: 87,
  midfield: 88,
  defense: 90,
  mentality: 91,
  chemistry: 90,
  championsExperience: 87,
  historicalWeight: 90,
  clutch: 91,
  consistency: 88,
  style: "Defensivo",

  players: [
    // Ajustado: removidos reservas extras, posições reduzidas e ratings balanceados
    { position: "PE", positions: ["PE", "MEI"], name: "Mason Mount", rating: 84 },
    { position: "CA", positions: ["CA", "MEI"], name: "Kai Havertz", rating: 84 },
    { position: "ATA", positions: ["ATA", "PE"], name: "Timo Werner", rating: 83 },

    { position: "MEI", positions: ["VOL", "MC"], name: "N'Golo Kanté", rating: 89 },
    { position: "MC", positions: ["MC", "VOL"], name: "Jorginho", rating: 85 },
    { position: "VOL", positions: ["VOL", "MC"], name: "Mateo Kovačić", rating: 84 },

    { position: "LE", positions: ["LE", "ALA"], name: "Ben Chilwell", rating: 83 },
    { position: "ZAG", positions: ["ZAG"], name: "Thiago Silva", rating: 86 },
    { position: "ZAG", positions: ["ZAG"], name: "Antonio Rüdiger", rating: 84 },
    { position: "LD", positions: ["LD", "ALA"], name: "Reece James", rating: 83 },
    { position: "GOL", positions: ["GOL"], name: "Édouard Mendy", rating: 87 }
  ]
},

{
  id: "real_madrid_2021_2022",
  club: "Real Madrid",
  season: "2021/2022",
  type: "Campeão histórico",
  categoryType: "champion",
  tier: "elite",

  teamOverall: 90,
  finalPower: 92,
  attack: 91,
  midfield: 91,
  defense: 88,
  mentality: 95,
  chemistry: 91,
  championsExperience: 95,
  historicalWeight: 95,
  clutch: 97,
  consistency: 89,
  style: "Equilibrado",

  players: [
    // Ajustado: removidos reservas extras, posições reduzidas e ratings balanceados
    { position: "PE", positions: ["PE"], name: "Vinícius Júnior", rating: 90 },
    { position: "CA", positions: ["CA"], name: "Karim Benzema", rating: 94 },
    { position: "PD", positions: ["PD", "ATA"], name: "Rodrygo", rating: 84 },

    { position: "MEI", positions: ["MEI", "MC"], name: "Luka Modrić", rating: 90 },
    { position: "MC", positions: ["MC", "VOL"], name: "Toni Kroos", rating: 88 },
    { position: "VOL", positions: ["VOL", "MC"], name: "Casemiro", rating: 88 },

    { position: "LE", positions: ["LE"], name: "Ferland Mendy", rating: 83 },
    { position: "ZAG", positions: ["ZAG", "LE"], name: "David Alaba", rating: 86 },
    { position: "ZAG", positions: ["ZAG"], name: "Éder Militão", rating: 84 },
    { position: "LD", positions: ["LD"], name: "Dani Carvajal", rating: 83 },
    { position: "GOL", positions: ["GOL"], name: "Thibaut Courtois", rating: 91 }
  ]
},

{
  id: "manchester_city_2022_2023",
  club: "Manchester City",
  season: "2022/2023",
  type: "Campeão histórico",
  categoryType: "champion",
  tier: "elite",

  teamOverall: 92,
  finalPower: 93,
  attack: 94,
  midfield: 94,
  defense: 90,
  mentality: 93,
  chemistry: 94,
  championsExperience: 90,
  historicalWeight: 94,
  clutch: 93,
  consistency: 95,
  style: "Ofensivo",

  players: [
    // Ajustado: removidos reservas extras, posições reduzidas e ratings balanceados
    { position: "PE", positions: ["PE", "ME"], name: "Jack Grealish", rating: 85 },
    { position: "CA", positions: ["CA"], name: "Erling Haaland", rating: 94 },
    { position: "PD", positions: ["PD", "MEI"], name: "Bernardo Silva", rating: 88 },

    { position: "MEI", positions: ["MEI", "MC"], name: "Kevin De Bruyne", rating: 92 },
    { position: "MC", positions: ["MC", "MEI"], name: "İlkay Gündoğan", rating: 87 },
    { position: "VOL", positions: ["VOL", "MC"], name: "Rodri", rating: 89 },

    { position: "LE", positions: ["LE", "ZAG"], name: "Nathan Aké", rating: 83 },
    { position: "ZAG", positions: ["ZAG"], name: "Rúben Dias", rating: 89 },
    { position: "ZAG", positions: ["ZAG"], name: "Manuel Akanji", rating: 83 },
    { position: "LD", positions: ["LD", "ALA"], name: "Kyle Walker", rating: 85 },
    { position: "GOL", positions: ["GOL"], name: "Ederson", rating: 89 }
  ]
}
];
/* ===================================================== */
/* JUNTA TODOS OS TIMES EM UMA ÚNICA BASE */
/* Essa base será usada no draft e na campanha */
/* ===================================================== */

const teamsDatabase = [
  ...championTeams,
  ...runnerUpTeams,
  ...historicTeams,
  ...underdogTeams
];

/* ===================================================== */
/* EXPORTA A DATABASE PARA OS OUTROS ARQUIVOS */
/* ===================================================== */

window.championTeams = championTeams;
window.runnerUpTeams = runnerUpTeams;
window.historicTeams = historicTeams;
window.underdogTeams = underdogTeams;

window.teamsDatabase = teamsDatabase;

console.log("DATABASE CARREGADA:", teamsDatabase.length);
