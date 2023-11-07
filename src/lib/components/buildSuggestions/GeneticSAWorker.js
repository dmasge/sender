import {
    GroupRelicsByType,
    findByGeneticSACombination
} from "$lib/components/buildSuggestions/BuildSuggestions.js";

import { isBuildNewFormat } from "$lib/components/profile/temp.js";

self.onmessage = function(event) {
    const { uid, build, relics, selectedCategory } = event.data;
    calcIt(build, relics, selectedCategory);
};

function calcIt(build,  relics, selectedCategory) {
    if (build == undefined || !isBuildNewFormat(build)) {
        return;
    }
    try {
        let [type1, type2, type3, type4, type5, type6] =
            GroupRelicsByType(relics);
        
        let [bestScore, bestSolution] = findByGeneticSACombination(type1, type2, type3, type4, type5, type6, build, selectedCategory);

        self.postMessage({ bestScore, bestSolution });
    } catch (error) {
        console.log(error);
    }
}




