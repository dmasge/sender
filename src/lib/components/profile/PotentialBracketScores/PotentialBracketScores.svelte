<script>
    import { score_build } from "$lib/components/calculators/lbcalcs/score_builds.js";
    import { DeepCopyBuild } from "$lib/components/buildSuggestions/BuildSuggestions.js";
    import { starRailRes, extension } from "$lib/constants.js";
    import {
        GetBracketsInfo,
        FindMostSimilarBracket,
        getEidolonSuperimposeFromBracketName,
    } from "$lib/components/profile/PotentialBracketScores/PotentialBracketScores.js";

    export let build;
    export let selectedCategory;
    let calcResults = [];

    function getPotentialScores(build) {
        let charId = build.k;
        let brackets = GetBracketsInfo(charId);
        for (let value of brackets) {
            let e = value.e;
            let s = value.s;
            let coneId = value.id;
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
    <p style="text-align: center; margin:3px; margin-top:7px;">
        {"Potential Scores With Same Relics For Other Brackets"}
    </p>

    <div class="horizontal-scroll">
        <div
            style="display: flex; width:max-content; height: 35px; margin:auto;"
        >
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
                {@const spdChange = (
                    (calcBuild.effSpd[bracketName] /
                        build.effSpd[selectedCategory] -
                        1) *
                    100
                ).toFixed(2)}
                {@const textColor = scoreChange < 0 ? "red" : "yellow"}
                {@const spdTextColor = spdChange < 0 ? "red" : "yellow"}
                {#if calcBuild.frontScore[bracketName] != build.frontScore[bracketName]}
                    <div style="padding:3px; width: 60px; ">
                        <p style="color:{textColor};">
                            {(scoreChange >= 0 ? "+" : "") + scoreChange + "%"}
                        </p>
                        <p
                            style="position:relative; color:{textColor};background-color:#1C063C;"
                        >
                            {calcBuild.frontScore[bracketName]}
                        </p>
                        <img
                            style="margin-bottom: -5px;"
                            src={starRailRes +
                                "icon/light_cone/" +
                                calcBuild.lc.id +
                                extension}
                            alt={"..."}
                            class="RelicImg avatar"
                        />
                        <p
                            style="position:relative; color:{textColor}; margin-top:-9px; background-color:#1C063C;"
                        >
                            {getEidolonSuperimposeFromBracketName(bracketName)}
                        </p>
                        
                        {#if calcBuild.effSpd[bracketName] !== build.effSpd[selectedCategory]}
                            <div
                                style="display: flex; margin:auto; padding-left: 8px;"
                            >
                                <p style="color:{spdTextColor};">
                                    {calcBuild.effSpd[bracketName]}
                                </p>
                                <img
                                    style="width: 14px; height:14px; padding:0;"
                                    src="https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/icon/property/IconSpeed.png"
                                    alt="spd"
                                />
                            </div>
                        {/if}
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
    }
    p {
        margin: 0;
        color: rgb(255, 255, 72);
        font-size: 12.5px;
        text-align: center;
    }

    .horizontal-scroll {
        overflow-x: auto;
        margin: auto;
        height: fit-content;

        width: 335px;
        height: 120px;
    }
    .horizontal-scroll::-webkit-scrollbar {
        height: 11px;
    }
</style>
