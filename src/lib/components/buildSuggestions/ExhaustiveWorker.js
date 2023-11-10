import {
    GroupRelicsByType, DeepCopyBuild, getRelicSets
} from "$lib/components/buildSuggestions/BuildSuggestions.js";
import { score_build } from "$lib/components/calculators/lbcalcs/score_builds.js";
import { isBuildNewFormat } from "$lib/components/profile/temp.js";

self.onmessage = function (event) {
    const { uid, build, relics, fifth, totalWorkers, selectedCategory } = event.data;
    calcIt(build, relics, fifth, totalWorkers, selectedCategory);
};

function calcIt(build, relics, fifth, totalWorkers, selectedCategory) {
    if (build == undefined || !isBuildNewFormat(build)) {
        return;
    }
    try {
        let types = GroupRelicsByType(relics);

        // Find the index of the type with the most items
        let indexOfMaxItems = types.reduce((iMax, x, i, arr) => x.length > arr[iMax].length ? i : iMax, 0);

        // Apply getFifth to the type with the most items
        types[indexOfMaxItems] = getFifth(types[indexOfMaxItems], fifth, totalWorkers);

        let [bestScore, bestSolution] = findByExhaustiveCombination(...types, build, selectedCategory);

        self.postMessage({ bestScore, bestSolution });
    } catch (error) {
        console.log(error);
    }
}



function getFifth(list, fifth, totalWorkers = 5) {
    // Calculate the indices that correspond to the fifth
    let start = Math.floor(fifth * list.length / totalWorkers);
    let end = Math.floor((fifth + 1) * list.length / totalWorkers);

    // Return the subset of the list that corresponds to the fifth
    return list.slice(start, end);
}




let localBuild;
let selectedCategory;
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

export function findByExhaustiveCombination(type1, type2, type3, type4, type5, type6, build, selectedCategory_) {
    localBuild = DeepCopyBuild(build);
    selectedCategory = selectedCategory_;
    let maxScore = -Infinity;
    let bestCombination = null;
    // let totalCombinations = type1.length * type2.length * type3.length * type4.length * type5.length * type6.length;
    // console.log("Total combinations: " + totalCombinations);

    for (let item1 of type1) {
        for (let item2 of type2) {
            for (let item3 of type3) {
                for (let item4 of type4) {
                    for (let item5 of type5) {
                        for (let item6 of type6) {
                            let score = evalBuild(item1, item2, item3, item4, item5, item6);
                            if (score > maxScore) {
                                maxScore = score;
                                bestCombination = [item1, item2, item3, item4, item5, item6];
                            }
                        }
                    }
                }
            }
        }
    }

    return [maxScore, bestCombination];
}

