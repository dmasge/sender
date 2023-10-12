<script>
    import { onMount } from "svelte";
    export let relics;
    export let charId;
    let substatsSum = [];
    let substatsMax = {
        HP: 42.3375490028,
        ATK: 21.1687730022,
        DEF: 21.1687730022,
        "HP%": 4.32,
        "ATK%": 4.32,
        "DEF%": 5.4,
        SPD: 2.6,
        "CR%": 3.24,
        "CD%": 6.48,
        "EHR%": 4.32,
        "RES%": 4.32,
        "BR%": 6.48,
        "Break%": 6.48,
    };
    function sumSubstats(relics) {
        for (let relic of relics) {
            let substats = relic["sb"];
            for (let substat of substats) {
                if (substat.length == 3) {
                    let p = substat[1].includes("%");
                    let key = p ? substat[0] + "%" : substat[0];
                    let value = parseFloat(substat[1].replace("%", ""));
                    let currentSum = substatsSum.hasOwnProperty(key)
                        ? substatsSum[key]
                        : { value: 0, count: 0 };
                    currentSum["value"] = currentSum["value"] + value;
                    currentSum["count"] = currentSum["count"] + substat[2];
                    substatsSum[key] = currentSum;
                }
            }
        }
        for (let key in substatsSum) {
            let maxValue = substatsMax[key] * substatsSum[key]["count"];
            substatsSum[key]["maxValue"] = maxValue;
            let RV =
                (substatsSum[key]["value"] / maxValue) *
                substatsSum[key]["count"];
            substatsSum[key]["RV"] = Number(RV.toFixed(1));
            substatsSum[key]["value"] = Number(
                Math.floor(substatsSum[key]["value"] * 10) / 10
            );
            if (key.includes("%") ){
                substatsSum[key]["displayValue"] =
                    substatsSum[key]["value"] + "%";
                substatsSum[key]["name"] = key.slice(0, -1);
            } else if (key.includes("SPD")){
                substatsSum[key]["displayValue"] =
                    substatsSum[key]["value"];
                substatsSum[key]["name"] = key;
            }
            else {
                substatsSum[key]["displayValue"] = String(
                    parseInt(substatsSum[key]["value"])
                );
                substatsSum[key]["name"] = key;
            }
        }
        let entries = Object.entries(substatsSum);
        entries.sort((a, b) => b[1]["RV"] - a[1]["RV"]);
        substatsSum = entries;
    }
    onMount(() => {
        sumSubstats(relics);
    });

    import {
        subHighlightsWriteable,
        toogleSubHighlights,
        getSubAffixBackgroundColor,
        getSubAffixTextColor,
    } from "$lib/cache/subHighlights.js";

    let subHighlights;
    subHighlightsWriteable.subscribe((value) => {
        subHighlights = value;
    });
</script>

<div
    class="statsSummaryDiv"
>
    <div style="display: flex; width:max-content; height: 35px;">
        {#key subHighlights}
            {#each substatsSum as [key, value]}
                <button
                    class="toogleButton"
                    style="width:max-content; display:flex; align-items: center; 
                    background-color: {getSubAffixBackgroundColor(
                        charId,
                        key
                    )}; color: {getSubAffixTextColor(charId, key)};
                    border: 1px solid {getSubAffixBackgroundColor(
                        charId,
                        key
                    ) == 'transparent'
                        ? 'transparent'
                        : 'rgb(133, 86, 0)'}"
                    on:click={toogleSubHighlights(charId, key)}
                >
                    <div class="fraction">
                        <span
                            style="border-bottom: 1px solid {getSubAffixTextColor(
                                charId,
                                key
                            )};">{value["RV"]}</span
                        >
                        <span>{value["count"]}</span>
                    </div>
                    {"  " + value["name"] + "  " + value["displayValue"]}
                </button>
            {/each}
        {/key}
    </div>
</div>

<style>
    /* Hide scrollbar for Chrome, Safari and Opera */
    .statsSummaryDiv::-webkit-scrollbar {
        height: 11px;
        /* display: none; */
    }

    /* Hide scrollbar for IE, Edge and Firefox */
    .statsSummaryDiv {
        /* -ms-overflow-style: none; 
        scrollbar-width: none;  */
        overflow-x: auto; margin:auto; height:fit-content;
    }
    .fraction {
        text-align: center;
        width: min-content;
    }

    .toogleButton {
        font-size: 11.5px;
    }

    .statsSummaryDiv {
        width: 335px;
    }
    
</style>
