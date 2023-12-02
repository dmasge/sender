<script>
    import ExhaustiveWorker from "$lib/components/buildSuggestions/ExhaustiveWorker.js?worker";
    import {
        selectedCategoryWriteable,
        DeepCopyBuild,
        getRelicSets,
        GroupRelicsByType,
    } from "$lib/components/buildSuggestions/BuildSuggestions.js";
    import { loadUnlockedRelics } from "$lib/cache/relicsDbLock.js";
    import { score_build } from "$lib/components/calculators/lbcalcs/score_builds.js";

    import { isBuildNewFormat } from "$lib/components/profile/temp.js";
    import RelicsBulk from "$lib/components/RelicsBulk.svelte";
    export let uid;
    export let build;
    let selectedCategory;
    let totalWorkers = 12;
    let results = [];
    selectedCategoryWriteable.subscribe((value) => {
        if (value != 0 && value != undefined) {
            selectedCategory = value;
        }
    });

    function RunWorker(relics, fifth, totalWorkers) {
        let exhaustiveWorker;
        if (exhaustiveWorker) exhaustiveWorker.terminate();
        exhaustiveWorker = new ExhaustiveWorker();
        exhaustiveWorker.postMessage({
            uid: uid,
            build: build,
            relics: relics,
            fifth: fifth,
            totalWorkers: totalWorkers,
            selectedCategory: selectedCategory,
        });
        exhaustiveWorker.onmessage = function (event) {
            const { bestScore, bestSolution } = event.data;
            if (bestScore == -5) {
                // -5 means hasn't finished and just reporting number of combinations
                combinationsTried += bestSolution;
                endTime = new Date();
            } else {
                exhaustiveWorker.terminate();
                results.push([bestScore, bestSolution]);
                //endTime = new Date();
                displayBuild();
            }
        };
    }

    function TopLogic() {
        startTime = new Date();
        endTime = startTime;
        showInstructions = true;
        isCalculating = true;
        calcDone = false;
        bestBuild = undefined;
        combinationsTried = 0;
        combinationsTotal = 0;
        results = [];

        let relics = loadUnlockedRelics(uid);
        let relicsByType = GroupRelicsByType(relics);
        combinationsTotal = relicsByType.reduce(
            (total, type) => total * type.length,
            1,
        );

        for (let i = 0; i < totalWorkers; i++) {
            RunWorker(relicsByType, i, totalWorkers);
        }
    }

    let startTime, endTime;
    let calcDone = false;
    let isCalculating = false;
    let bestBuild = undefined;
    let bestScore = 0;
    let bestCombination;
    let showInstructions = false;
    let combinationsTried = 0;
    let combinationsTotal = 0;
    function displayBuild() {
        if (results.length == totalWorkers) {
            [bestScore, bestCombination] = results.reduce((max, curr) =>
                curr[0] > max[0] ? curr : max,
            );
            bestBuild = DeepCopyBuild(build);
            bestBuild["r"] = bestCombination;
            bestBuild["rs"] = getRelicSets(bestCombination);
            bestBuild = score_build(bestBuild);
            calcDone = true;
            isCalculating = false;
        }
    }
</script>

{#if isBuildNewFormat(build)}
    <div
        style="display: flex; margin:auto; justify-content: center; width: 360px;"
    >
        <div
            style="display: flex; flex-direction: column; align-items: center; justify-content: center;"
        >
            <button disabled={isCalculating} on:click={() => TopLogic()}>
                <p>Optimize Build</p>
            </button>
            {#if isCalculating || calcDone}
                <p>{combinationsTried + " / " + combinationsTotal}</p>
                <p>{"Time taken: " + ((endTime - startTime) / 1000).toFixed(2) + " seconds"}</p>
            {/if}
            {#if showInstructions}
                <br />
                <p style="font-size: 13px;">
                    To get results faster lock 🔏 your relics from the inventory
                    below. Locked relics are skipped.
                </p>
                <p style="font-size: 13px;">
                    If your character is ranked in more than one bracket first
                    set the bracket you're interested in and only then click on
                    optimize.
                </p>
                <p style="font-size: 13px;">
                    To add new relics refresh with them equipped. Your browser
                    will save them. You can also save characters you don't use with relics equipped.
                </p>
            {/if}
            {#if calcDone}
                <br />
                {@const percDiff = (
                    (bestBuild["frontScore"][selectedCategory] /
                        build["lb"][selectedCategory]["sc"] -
                        1) *
                    100
                ).toFixed(2)}
                <p class="statsP" style="font-size: 16px;">
                    <span>
                        {"Potential New Score: " +
                            bestBuild["frontScore"][selectedCategory]}
                    </span>
                    <span style="">
                        {"(" + (percDiff > 0 ? "+" : "") + percDiff + "%)"}
                    </span>
                </p>
                <RelicsBulk relics={bestBuild["r"]} charId={bestBuild["k"]} />
            {/if}
        </div>
    </div>
{/if}

<style>
    p {
        margin: 0;
    }
</style>
