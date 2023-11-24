<script>
    import ExhaustiveWorker from "$lib/components/buildSuggestions/ExhaustiveWorker.js?worker";
    import {
        selectedCategoryWriteable,
        DeepCopyBuild,
        getRelicSets,
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
            exhaustiveWorker.terminate();
            results.push([bestScore, bestSolution]);
            displayBuild();
        };
    }

    function TopLogic() {
        showInstructions = true;
        isCalculating = true;
        calcDone = false;
        bestBuild = undefined;
        results = [];
        let relics = loadUnlockedRelics(uid);
        for (let i = 0; i < totalWorkers; i++) {
            RunWorker(relics, i, totalWorkers);
        }
    }

    let calcDone = false;
    let isCalculating = false;
    let bestBuild = undefined;
    let bestScore = 0;
    let bestCombination;
    let showInstructions = false;
    function displayBuild() {
        if (results.length == totalWorkers) {
            [bestScore, bestCombination] = results.reduce((max, curr) =>
                curr[0] > max[0] ? curr : max
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
            <!-- {#if !isCalculating} -->
            <button disabled={isCalculating} on:click={() => TopLogic()}>
                <p>Optimize Build</p>
            </button>
            <!-- {/if} -->
            {#if showInstructions}
                <br />
                <p style="font-size: 13px;">
                    This tries out all your relic combinations to find the best
                    for your current leaderboard bracket.
                </p>
                <p style="font-size: 13px;">
                    If you have 20 relics per slot that means 20<sup>6</sup> combinations,
                    equivalent of 64 000 000
                </p>
                <p style="font-size: 13px;">
                    This can get extremely computationally intensive and may
                    take an eternity to return any result.
                </p>
                <p style="font-size: 13px;">
                    To avoid this issue lock 🔏 your relics from the inventory
                    below.
                </p>
                <p style="font-size: 13px;" />
                <p style="font-size: 13px;">
                    Locked relics are skipped and this reduces total possible
                    combinations, consequently results are returned faster.
                </p>
                <p style="font-size: 13px;">
                    For example you could lock EHR body when optimizing for
                    Seele.
                </p>
                <p style="font-size: 13px;">
                    If your character is ranked in more than one bracket first
                    set the bracket you're interested in and only then click on
                    optimize.
                </p>
                <p style="font-size: 13px;">
                    To add new relics refresh with them equipped. Your browser
                    will remember them and they can be used in optimization. You
                    can also save characters you don't use with relics equipped as "wardrobes".
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
