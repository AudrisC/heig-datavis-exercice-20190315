
const d3 = require('d3')
const fs = require('fs')

// charger le fichier JSON de l'exercice
const data = require('./asylumByCountry.json')

// configuration du graphique
const WIDTH = 500
const HEIGHT = 500
const BAR_SPACE = HEIGHT / data.length
const BAR_HEIGHT = BAR_SPACE * 0.7
const BAR_COLOR = 'pink'
const NAME_MARGIN_LEFT = -100
const NAME_COLOR = 'black'
const SUM_MARGIN_RIGHT = WIDTH / 300
const SUM_COLOR = 'black'

// l'échelle pour retourner une valeur en fonction de la somme
const scale = d3.scaleLinear()
  .domain([0, d3.max(data, d => d.somme)])
  .range([0, WIDTH])

// dessiner un bâton
const drawBar = (sum, index) =>
  `<rect
    y="${index * BAR_SPACE}"
    height="${BAR_HEIGHT}"
    width="${scale(sum)}" 
    fill="${BAR_COLOR}"/>`

// dessiner tous les bâtons
const drawBars = data =>
  data.map((d, i) => drawBar(d.somme, i))
      .join('\n')

// écrire le nom du pays correspondant à côté du graph
const writeCountryName = (name, index) =>
  `<text font-family="verdana" font-size="14"
    x="${NAME_MARGIN_LEFT}"
    y="${index * BAR_SPACE + BAR_HEIGHT * 0.7}"
    fill="${NAME_COLOR}">
    ${name}
  </text>`

// Générer tout les noms à côté du pays 
const writeNames = data =>
  data
    .map((d, i) => writeCountryName(d.pays, i))
    .join('\n')

// écrire la somme pour un pays
const writeSommeByCountries = (sum, index) =>
  `<text font-family="verdana" font-size="14"
    x="${scale(sum) - SUM_MARGIN_RIGHT}"
    y="${index * BAR_SPACE + BAR_HEIGHT * 0.7}"
    fill="${SUM_COLOR}"
    text-anchor="end">
    ${sum}
    </text>`

// écrire la somme pour tout les pays affichés
const writeSommesByCountries = data =>
  data
    .map((d, i) => writeSommeByCountries(d.somme, i))
    .join('\n')

// pour créer un fichier SVG
// nous ajoutons l'attribut "xmlns" pour dire quel dialecte XML nous utilisons
// et une viewBox pour définir le système de coordonnées
// puis nous appelons les fonctions créées plus haut pour ajouter les éléments
const svg = data => `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${WIDTH} ${HEIGHT}">
    ${drawBars(data)}
    ${writeNames(data)}
    ${writeSommesByCountries(data)}
  </svg>
`

// écrire le fichier "graph.svg"
fs.writeFileSync('graph.svg', svg(data), 'utf-8')