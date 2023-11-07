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
        
        let [bestScore, bestSolution] = findBestGeneticCombination(type1, type2, type3, type4, type5, type6, build, selectedCategory);

        self.postMessage({ bestScore, bestSolution });
    } catch (error) {
        console.log(error);
    }
}





function findBestGeneticCombination(type1, type2, type3, type4, type5, type6, build, selectedCategory_) {
    localBuild = DeepCopyBuild(build);
    selectedCategory = selectedCategory_;
    // Define the size of the population and the number of generations
    let popSize = 40;
    let generations = 400;
    let elitismSize = Math.floor(popSize * 0.1);

    // Initialize the population with random solutions
    let population = [];
    for (let i = 0; i < popSize; i++) {
        let individual = [
            type1[Math.floor(Math.random() * type1.length)],
            type2[Math.floor(Math.random() * type2.length)],
            type3[Math.floor(Math.random() * type3.length)],
            type4[Math.floor(Math.random() * type4.length)],
            type5[Math.floor(Math.random() * type5.length)],
            type6[Math.floor(Math.random() * type6.length)]
        ];
        population.push(individual);
    }

    // Create a cache for memoization
    let cache = {};

    // Start the genetic algorithm
    for (let i = 0; i < generations; i++) {
        // Sort the population by fitness (the evalBuild function)
        population.sort((a, b) => {
            let keyA = JSON.stringify(a);
            let keyB = JSON.stringify(b);
            if (!cache[keyA]) cache[keyA] = evalBuild(...a);
            if (!cache[keyB]) cache[keyB] = evalBuild(...b);
            return cache[keyB] - cache[keyA];
        });

        // Keep the best individuals
        let newPopulation = population.slice(0, elitismSize);

        // Perform crossover and mutation to create new individuals
        while (newPopulation.length < popSize) {
            // Select two parents using tournament selection
            let parent1 = tournamentSelection(population, 5, cache);
            let parent2 = tournamentSelection(population, 5, cache);

            // Crossover
            let child = parent1.slice(0, 3).concat(parent2.slice(3, 6));

            // Mutation
            if (Math.random() < 0.1) {
                let mutationIndex = Math.floor(Math.random() * 6);
                child[mutationIndex] = [type1, type2, type3, type4, type5, type6][mutationIndex][Math.floor(Math.random() * [type1, type2, type3, type4, type5, type6][mutationIndex].length)];
            }

            newPopulation.push(child);
        }

        // Replace the old population with the new population
        population = newPopulation;
    }

    // Return the best solution
    let bestSolution = population[0];
    let bestScore = evalBuild(...bestSolution);

    // Return the best solution
    return [bestScore, bestSolution];
}

function tournamentSelection(population, tournamentSize, cache) {
    let tournament = [];
    for (let i = 0; i < tournamentSize; i++) {
        tournament.push(population[Math.floor(Math.random() * population.length)]);
    }
    tournament.sort((a, b) => {
        let keyA = JSON.stringify(a);
        let keyB = JSON.stringify(b);
        if (!cache[keyA]) cache[keyA] = evalBuild(...a);
        if (!cache[keyB]) cache[keyB] = evalBuild(...b);
        return cache[keyB] - cache[keyA];
    });
    return tournament[0];
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