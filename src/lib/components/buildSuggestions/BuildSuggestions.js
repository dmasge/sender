import { writable } from 'svelte/store';
import { score_build } from "$lib/components/calculators/lbcalcs/score_builds.js";
export const selectedCategoryWriteable = writable(0);



let localBuild;
let selectedCategory;
export function findByGeneticSACombination(type1, type2, type3, type4, type5, type6, build, selectedCategory_) {
    localBuild = DeepCopyBuild(build);
    selectedCategory = selectedCategory_;
    let types = [type1, type2, type3, type4, type5, type6];
    let currentSolution = types.map((type) => type[0]);
    let bestSolution = currentSolution;
    let bestScore = evalBuild(...bestSolution);
    let temperature = 10;
    let coolingRate = 0.0001;

    while (temperature > 0.01) {
        let newSolution = geneticAlgorithmMutation(currentSolution, types);

        let currentScore = evalBuild(...currentSolution);
        let newScore = evalBuild(...newSolution);

        if (
            acceptanceProbability(currentScore, newScore, temperature) >
            Math.random()
        ) {
            currentSolution = newSolution;
            currentScore = newScore;
        }

        if (currentScore > bestScore) {
            bestSolution = currentSolution;
            bestScore = currentScore;
        }
        temperature *= 1 - coolingRate;
    }
    return [bestScore, bestSolution];
}



function acceptanceProbability(currentScore, newScore, temperature) {
    if (newScore > currentScore) {
        return 1.0;
    }
    return Math.exp((newScore - currentScore) / temperature);
}
function evalBuild(item1, item2, item3, item4, item5, item6) {
    let r = [item1, item2, item3, item4, item5, item6];
    let sets = getRelicSets(r);
    localBuild["frontScore"][selectedCategory] = 0;
    localBuild["r"] = r;
    localBuild['rs'] = sets;
    localBuild = score_build(localBuild);
    let score = localBuild["frontScore"][selectedCategory];
    return score;
}

export function getRelicSets(relics) {
    let rsDict = {};
    for (let relic of relics) {
        if (rsDict[relic['set']]) {
            rsDict[relic['set']]++;
        } else {
            rsDict[relic['set']] = 1;
        }
    }
    let setsList = [];
    for (let key in rsDict) {
        let val = rsDict[key];
        let setIdStr = String(key);
        if (val === 2 || val === 3) {
            setsList.push([setIdStr, 2]);
        } else if (val === 4) {
            setsList.push([setIdStr, 2], [setIdStr, 4]);
        }
    }
    return setsList;
}



function geneticAlgorithmMutation(solution, types) {
    let mutationIndex = Math.floor(Math.random() * solution.length);
    let mutationValue =
        types[mutationIndex][
            Math.floor(Math.random() * types[mutationIndex].length)
        ];
    let newSolution = [...solution];
    newSolution[mutationIndex] = mutationValue;
    return newSolution;
}


export function GroupRelicsByType(relics){
    let groupedData = { 1 : [], 2 : [], 3 : [], 4 : [], 5 : [], 6 : []};
        for (let key in relics) {
            let value = relics[key];
            let tValue = value.t;

            if (!groupedData[tValue]) {
                groupedData[tValue] = [];
            }
            groupedData[tValue].push(value);
        }
    return [groupedData[1], groupedData[2], groupedData[3], groupedData[4], groupedData[5], groupedData[6]];
}

export function DeepCopyBuild(build){
    removeCircular(build);
    let localBuild = JSON.parse(JSON.stringify(build));
    return localBuild;
}


function removeCircular(ref) {
    const seen = new Map();
    const detect = (obj) => {
        seen.set(obj, true);
        for (let [key, value] of Object.entries(obj)) {
            if (typeof value === "object" && value !== null) {
                if (seen.has(value)) {
                    delete obj[key];
                } else {
                    detect(value);
                }
            }
        }
    };
    detect(ref);
}











