<script>
    import { score_build } from "$lib/components/calculators/lbcalcs/score_builds.js";
    import { DeepCopyBuild } from "$lib/components/buildSuggestions/BuildSuggestions.js";
    import { starRailRes, extension } from "$lib/constants.js";
    import {
        GetBracketsInfo,
        FindMostSimilarBracket,
    } from "$lib/components/profile/PotentialBracketScores/PotentialBracketScores.js";

    export let build;
    export let selectedCategory;
    let calcResults = [];

    function getPotentialScores(build) {
        let charId = build.k;
        let brackets = GetBracketsInfo(charId);
        for (let [coneId, value] of Object.entries(brackets)) {
            let e = value.e;
            let s = value.s;
            let localbuild = CleanBuild(DeepCopyBuild(build));
            localbuild.e = e;
            localbuild.lc.s = s;
            localbuild.lc.id = coneId;
            let scored_build = score_build(localbuild);
            calcResults.push(scored_build);
        }

        // Sort calcResults in descending order based on calcBuild.frontScore[bracketName]
        calcResults.sort((a, b) => {
            const bracketNameA = FindMostSimilarBracket(
                selectedCategory,
                Object.keys(a.frontScore),
            );
            const bracketNameB = FindMostSimilarBracket(
                selectedCategory,
                Object.keys(b.frontScore),
            );
            return b.frontScore[bracketNameB] - a.frontScore[bracketNameA];
        });
    }

    function CleanBuild(build) {
        build.effSpd = {};
        build.calcDetails = {};
        build.frontScore = {};
        build.lb = {};
        return build;
    }

    getPotentialScores(build);
</script>

{#if calcResults.length > 0}
    <p style="text-align: center; margin:3px;">
        {"Potential Score With Same Relics For Other Brackets (WIP)"}
    </p>

    <div class="horizontal-scroll">
        <div style="display: flex; width:max-content; height: 35px;">
            {#each calcResults as calcBuild}
                {@const bracketName = FindMostSimilarBracket(
                    selectedCategory,
                    Object.keys(calcBuild.frontScore),
                )}
                {@const scoreChange = (
                    (calcBuild.frontScore[bracketName] /
                        build.frontScore[selectedCategory] -
                        1) *
                    100
                ).toFixed(2)}
                {#if calcBuild.frontScore[bracketName] != build.frontScore[bracketName]}
                    <div style="padding:3px; width: 60px;">
                        <img
                            src={starRailRes +
                                "icon/light_cone/" +
                                calcBuild.lc.id +
                                extension}
                            alt={"..."}
                            class="RelicImg avatar"
                        />
                        <p style="text-align: center;">
                            {calcBuild.frontScore[bracketName]}
                        </p>
                    </div>
                {/if}
            {/each}
        </div>
    </div>
{/if}

<style>
    img {
        width: var(--CardAvatarLcSize);
        height: auto;
        margin-bottom: -5px;
    }
    p {
        margin: 0;
        color: rgb(255, 255, 72);
        font-size: 12px;
    }

    .horizontal-scroll {
        overflow-x: auto;
        margin: auto;
        height: fit-content;

        width: 335px;
        height: 75px;
    }
    .horizontal-scroll::-webkit-scrollbar {
        height: 11px;
    }
</style>
