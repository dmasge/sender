export function dimSubs(name, charId){
    if (charSubs.hasOwnProperty(charId)){
        if (charSubs[charId].includes(name))
            return "rgba(0, 0, 0, 1)"
        if (secondarySubs.hasOwnProperty(charId) && secondarySubs[charId].includes(name))
            return "rgba(0, 0, 0, 0.6)"
        return "rgba(0, 0, 0, 0.15)"
    }
    return "rgba(0, 0, 0, 1)"
    
}

let charSubs = {
    '1102' : ['ATK', 'CR', 'CD'], // Seele
    '1005' : ['EHR', 'ATK', 'SPD'], // Kafka
    '1006' : ['ATK', 'CR', 'CD', 'EHR', 'SPD', 'Break'], // SW
    '1205' : ['CR', 'CD', 'HP'],  // Blade
    '1201' : ['CR', 'CD', 'ATK'],
    '1107' : ['CR', 'CD', 'ATK'], // CLARA
    '1204' : ['CR', 'CD', 'ATK'], // JING
    '1213' : ['CR', 'CD', 'ATK'], // dhil
    '1209' : ['CR', 'CD', 'ATK'], // dhil
}
let secondarySubs = {
    '1005' : ['CR', 'CD'],
    '1205' : ['ATK', 'SPD'],
    '1209' : ['EHR'],
}


export function getSubstatColor(name, value){
    let nm = name;
    if (value.includes("%")){
        nm = name + "%"
    }
    let val = parseFloat(value.replace(/%/g, ''));
    let values = substatValuesDict[nm];
    if (!values) {
        console.error(`No values found for ${nm}`);
        return;
    }
    let index = values.reduce((prev, curr, i) => Math.abs(curr - val) < Math.abs(values[prev] - val) ? i : prev, 0);
    return [index, colors[index]];
}


let colors = ["rgba(0, 0, 0, 0.2)", 
                "rgba(0, 0, 0, 0.7)", 
                "rgba(0, 0, 0, 1)", 
                "rgba(0, 0, 0, 1)", 
                "rgba(0, 0, 0, 1)", 
                "rgba(0, 0, 0, 1)"];


let substatValuesDict = {
    'HP' : Array.from({length: 6}, (_, i) => 38.103755 * (i + 1)),
    'ATK' : Array.from({length: 6}, (_, i) => 19.051877 * (i + 1)),
    'DEF' : Array.from({length: 6}, (_, i) => 19.051877 * (i + 1)),
    'SPD' : Array.from({length: 6}, (_, i) => 2.3 * (i + 1)),
    'HP%' : Array.from({length: 6}, (_, i) => 3.888 * (i + 1)),
    'ATK%' : Array.from({length: 6}, (_, i) => 3.888 * (i + 1)),
    'DEF%' : Array.from({length: 6}, (_, i) => 4.86 * (i + 1)),
    'CR%' : Array.from({length: 6}, (_, i) => 2.916 * (i + 1)),
    'CD%' : Array.from({length: 6}, (_, i) => 5.832 * (i + 1)),
    'EHR%' : Array.from({length: 6}, (_, i) => 3.888 * (i + 1)),
    'RES%' : Array.from({length: 6}, (_, i) => 3.888 * (i + 1)),
    'Break%' : Array.from({length: 6}, (_, i) => 5.832 * (i + 1)),
}

