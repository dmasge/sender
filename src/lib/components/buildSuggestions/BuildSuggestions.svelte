<script>
    import { loadRelicsDb } from "$lib/cache/relicsDb.js";
    import GenSAWorker from "$lib/components/buildSuggestions/GeneticSAWorker.js?worker";
    import GeneticWorker from "$lib/components/buildSuggestions/GeneticWorker.js?worker";
    import ExhaustiveWorker from "$lib/components/buildSuggestions/ExhaustiveWorker.js?worker";
    import SwarmWorker from "$lib/components/buildSuggestions/SwarmWorker.js?worker";
    import { selectedCategoryWriteable, getRelicSets } from "$lib/components/buildSuggestions/BuildSuggestions.js";
    import { onDestroy } from "svelte";
    export let uid;
    export let build;

    let gsaWorker;
    let swarmWorker;
    let exhaustiveWorker;
    let geneticWorker;
    let selectedCategoryWithPercentageSign;
    selectedCategoryWriteable.subscribe((value) => {
        if (value != 0 && value != undefined) {
            selectedCategoryWithPercentageSign = value;
        }
    });

    function TopLogic() {
        let relics = loadRelicsDb(uid);
        if (gsaWorker) gsaWorker.terminate();
        gsaWorker = new GenSAWorker();
        gsaWorker.postMessage({
            uid: uid,
            build: build,
            relics: relics,
            selectedCategory: getSubstringAfterPercentSign(
                selectedCategoryWithPercentageSign
            ),
        });
        gsaWorker.onmessage = function (event) {
            const { bestScore, bestSolution } = event.data;
            console.log("GSA");
            console.log("Best Score: ", bestScore);
            console.log("Best Solution: ", bestSolution);
            // You can also update your UI here
            gsaWorker.terminate();
        };

        if (swarmWorker) swarmWorker.terminate();
        swarmWorker = new SwarmWorker();
        swarmWorker.postMessage({
            uid: uid,
            build: build,
            relics: relics,
            selectedCategory: getSubstringAfterPercentSign(
                selectedCategoryWithPercentageSign
            ),
        });
        swarmWorker.onmessage = function (event) {
            const { bestScore, bestSolution } = event.data;
            console.log("PSO");
            console.log("Best Score: ", bestScore);
            console.log("Best Solution: ", bestSolution);
            // You can also update your UI here
            swarmWorker.terminate();
        };

        if (geneticWorker) geneticWorker.terminate();
        geneticWorker = new GeneticWorker();
        geneticWorker.postMessage({
            uid: uid,
            build: build,
            relics: relics,
            selectedCategory: getSubstringAfterPercentSign(
                selectedCategoryWithPercentageSign
            ),
        });
        geneticWorker.onmessage = function (event) {
            const { bestScore, bestSolution } = event.data;
            console.log("Genetic");
            console.log("Best Score: ", bestScore);
            console.log("Best Solution: ", bestSolution);
            console.log(getRelicSets(bestSolution));
            // You can also update your UI here
            geneticWorker.terminate();
        };
        // if (exhaustiveWorker) exhaustiveWorker.terminate();
        // exhaustiveWorker = new ExhaustiveWorker();
        // exhaustiveWorker.postMessage({
        //     uid: uid,
        //     build: build,
        //     relics: relics,
        //     selectedCategory: getSubstringAfterPercentSign(
        //         selectedCategoryWithPercentageSign
        //     ),
        // });
        // exhaustiveWorker.onmessage = function (event) {
        //     const { bestScore, bestSolution } = event.data;
        //     console.log("Exhaustive");
        //     console.log("Best Score: ", bestScore);
        //     console.log("Best Solution: ", bestSolution);
        //     // You can also update your UI here
        //     exhaustiveWorker.terminate();
        // };
    }

    function getSubstringAfterPercentSign(inputString) {
        let percentIndex = inputString.indexOf("%");
        if (percentIndex !== -1) {
            return inputString.substring(percentIndex + 1);
        } else {
            return "No '%' sign found in the input string.";
        }
    }
</script>

<div style="display: flex; margin:auto; justify-content: center;">
<button on:click={() => 
    TopLogic()}> btttb </button>

</div>