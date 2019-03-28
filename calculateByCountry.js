const R = require('ramda')

const writeJson = require('./writeJson')
/*
  writeJson prends deux arguments:
    * le nom du fichier
    * un objet ou une liste JSON
  
  ex:
    writeJson('asylumByCountry.json', list)
*/
const DATA = require('./asylum.json')
// asylum.json doit être créé avec prepareData


let countries = R.uniq(DATA.map(d=>d.country_asylum));

const calcSomme = (resultat, d) => {return resultat + d} //return si tu mets les {} 

const SOMME = pays => { return DATA.filter(d=>d.country_asylum == pays)
                          .map(d=>d.affected)
                          .reduce(calcSomme,0)}

//console.log(countries.map(pays => ({pays, somme:SOMME(pays)}))); 

const list = countries.map(pays => ({pays, somme:SOMME(pays)}))

writeJson('asylumByCountry.json', list)