export let substatsMax = {
    HP: 42.3375490028,
    ATK: 21.1687730022,
    DEF: 21.1687730022,
    "HP%": 4.32,
    "ATK%": 4.32,
    "DEF%": 5.4,
    SPD: 2.6,
    "CR%": 3.24,
    "CD%": 6.48,
    "EHR%": 4.32,
    "RES%": 4.32,
    "BR%": 6.48,
    "Break%": 6.48,
};


export function getRelicRv(relic) {
    let rv = 0;
    let substatsSum = [];
    let substats = relic["sb"];
    for (let substat of substats) {
        if (substat.length == 3) {
            let p = substat[1].includes("%");
            let key = p ? substat[0] + "%" : substat[0];
            let value = parseFloat(substat[1].replace("%", ""));
            let maxValue = substatsMax[key] * substat[2];
            let RV = (value / maxValue) * substat[2];
            rv = rv + RV;
        }
    }
    return Number(rv.toFixed(1));
}



import {
    loadrelicSlotTypeFilter,
} from "$lib/cache/relicSlotTypeFilter.js";

export function filterRelicsBySlot(relics) {
    let filterRules = loadrelicSlotTypeFilter();
    let relicsFiltered = {};
    for (let key in relics) {
        let relic = relics[key];
        if (filterRules[relic['t']]){
            relicsFiltered[key] = { ...relic};
        }
    }
    return relicsFiltered;
}

export function filterRelicsBySet(relics, uniqueSetsToogle) {
    let relicsFiltered = {};
    for (let key in relics) {
        let relic = relics[key];
        let setId = relic['set'];
        if (uniqueSetsToogle[setId] === undefined || uniqueSetsToogle[setId]){
            relicsFiltered[key] = { ...relic};
        }
    }
    return relicsFiltered;
}


import {
    loadSubWeightsInventory,
} from "$lib/cache/subWeightsInventory.js";

export function getSubWeightDict() {
    let weights = loadSubWeightsInventory();
    let weightsDict = {
        HP: weights[0] / 3,
        ATK: weights[1] / 3,
        DEF: weights[2] / 3,
        "HP%": weights[0],
        "ATK%": weights[1],
        "DEF%": weights[2],
        SPD: weights[3],
        "CR%": weights[4],
        "CD%": weights[5],
        "EHR%": weights[6],
        "RES%": weights[7],
        "BR%": weights[8],
    };
    return weightsDict;
}
export function getRelicwRv(relic) {
    let weightsDict = getSubWeightDict();
    let rv = 0;
    let substats = relic["sb"];
    for (let substat of substats) {
        if (substat.length == 3) {
            let p = substat[1].includes("%");
            let key = p ? substat[0] + "%" : substat[0];
            let value = parseFloat(substat[1].replace("%", ""));
            let maxValue = substatsMax[key] * substat[2];
            let RV = (value / maxValue) * substat[2] * weightsDict[key];
            rv = rv + RV;
        }
    }
    return Number(rv.toFixed(1));
}
export function getRelicswRV(relics) {
    let relicsScored = {};
    for (let key in relics) {
        let relic = relics[key];
        let rv = getRelicwRv(relic);
        relicsScored[key] = { ...relic, rv: rv };
    }
    return relicsScored;
}


export function getRelicsRV(relics) {
    let relicsScored = {};
    for (let key in relics) {
        let relic = relics[key];
        let rv = getRelicRv(relic);
        relicsScored[key] = { ...relic, rv: rv };
    }
    return relicsScored;
}

export function sortRelicsByRV(relicsScored) {
    return Object.entries(relicsScored)
        .sort(([, relicA], [, relicB]) => relicB.rv - relicA.rv);
}