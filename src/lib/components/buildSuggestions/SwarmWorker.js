import {
    GroupRelicsByType,  DeepCopyBuild, getRelicSets
} from "$lib/components/buildSuggestions/BuildSuggestions.js";
import { score_build } from "$lib/components/calculators/lbcalcs/score_builds.js";
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
        
        let [bestScore, bestSolution] = findBySwarmCombination(type1, type2, type3, type4, type5, type6, build, selectedCategory);

        self.postMessage({ bestScore, bestSolution });
    } catch (error) {
        console.log(error);
    }
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

export function findBySwarmCombination(type1, type2, type3, type4, type5, type6,  build, selectedCategory_) {
    localBuild = DeepCopyBuild(build);
    selectedCategory = selectedCategory_;
    // Define the particle swarm optimization parameters
    let swarmSize = 5432;
    let maxIter = 11;
    let c1 = 3;
    let c2 = 1;
    let w = 1;
    let dim = 6; // number of dimensions (6 types)

    // Initialize the swarm
    let swarm = [];
    for (let i = 0; i < swarmSize; i++) {
        let particle = {
            position: [Math.floor(Math.random() * type1.length), Math.floor(Math.random() * type2.length), Math.floor(Math.random() * type3.length), Math.floor(Math.random() * type4.length), Math.floor(Math.random() * type5.length), Math.floor(Math.random() * type6.length)],
            velocity: Array(dim).fill(0),
            bestPosition: [],
            bestScore: -Infinity
        };
        swarm.push(particle);
    }

    // Main loop
    for (let iter = 0; iter < maxIter; iter++) {
        w *= 0.9;
        for (let i = 0; i < swarmSize; i++) {
            let particle = swarm[i];

            // Calculate the score
            let score = evalBuild(type1[particle.position[0]], type2[particle.position[1]], type3[particle.position[2]], type4[particle.position[3]], type5[particle.position[4]], type6[particle.position[5]]);

            // Update the personal best
            if (score > particle.bestScore) {
                particle.bestScore = score;
                particle.bestPosition = particle.position.slice();
            }

            // Update the global best
            let gBest = swarm.reduce((max, p) => p.bestScore > max.bestScore ? p : max, swarm[0]);

            // Update the velocity and position
            for (let j = 0; j < dim; j++) {
                particle.velocity[j] = w * particle.velocity[j] + c1 * Math.random() * (particle.bestPosition[j] - particle.position[j]) + c2 * Math.random() * (gBest.bestPosition[j] - particle.position[j]);
                particle.position[j] = Math.round(particle.position[j] + particle.velocity[j]);

                // Ensure the particle's position is within the bounds
                if (particle.position[j] < 0) {
                    particle.position[j] = 0;
                } else if (particle.position[j] >= type1.length) {
                    particle.position[j] = type1.length - 1;
                }
            }
        }
    }

    // Return the global best
    let gBest = swarm.reduce((max, p) => p.bestScore > max.bestScore ? p : max, swarm[0]);
    return [gBest["bestScore"], [type1[gBest.bestPosition[0]], type2[gBest.bestPosition[1]], type3[gBest.bestPosition[2]], type4[gBest.bestPosition[3]], type5[gBest.bestPosition[4]], type6[gBest.bestPosition[5]]]];
}


