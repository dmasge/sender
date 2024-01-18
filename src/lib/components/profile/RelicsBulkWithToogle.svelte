<script>
    import { onMount } from "svelte";

    export let build;
    let relics = build["r"];
    import RelicsBulk from "$lib/components/RelicsBulk.svelte";
    import { browser } from "$app/environment";
    import LbStats from "$lib/components/LbStats.svelte";
    import RelicSetDisplay from "$lib/components/RelicSetDisplay.svelte";
    import Rankings from "$lib/components/profile/Rankings.svelte";
    import { fly } from "svelte/transition";
    import HrefAvatarLc from "$lib/components/profile/HrefAvatarLc.svelte";
    import { isBuildNewFormat } from "$lib/components/profile/temp.js";
    import { score_build } from "$lib/components/calculators/lbcalcs/score_builds.js";
    import { getRelicSets } from "$lib/components/buildSuggestions/BuildSuggestions.js";
    import RvSummary from "$lib/components/RVSummary.svelte";
    import LbCalcDesc from "./LbCalcDesc.svelte";
    import CalcDetails from "./CalcDetails.svelte";
    import ChaseSubs from "./ChaseSubs.svelte";
    import BracketSelector from "./BracketSelector.svelte";
    import PotentialBracketScores from "./PotentialBracketScores/PotentialBracketScores.svelte";
    export let selectedCategory;
    export let expanded = false;
    let isCalcsDone = false;
    let relicSets = [];
    let lbStats = [];
    function getTextUntilUnderscore(inputString) {
        let index = inputString.indexOf("_");
        if (index !== -1) {
            return inputString.substring(0, index);
        } else {
            return inputString;
        }
    }
    if (browser) {
        try {
            async function performCalculations() {
                build["rs"] = getRelicSets(build["r"]);
                if (isBuildNewFormat(build)) {
                    try {
                        build = score_build(build);
                        isCalcsDone = true;
                    } catch (error) {
                        console.log(error);
                    }
                } else {
                    isCalcsDone = true;
                }
                relicSets = build["rs"];
                lbStats = [];
                let keys = build["lb"] ? Object.keys(build["lb"]) : [];
                let firstKey = keys.length > 0 ? keys[0] : false;
                if (firstKey) {
                    let isFirstKeyInStats = build["lbstats"][firstKey]
                        ? true
                        : false;
                    lbStats = isFirstKeyInStats
                        ? build["lbstats"][firstKey]
                        : build["lbstats"];
                }
            }
            onMount(async () => {
                await performCalculations();
            });
        } catch (error) {
            console.log(error);
        }
    }
    $: isNewFormat = "effSpd" in build;
</script>

{#if isCalcsDone}
    <BracketSelector {build} bind:selectedCategory></BracketSelector>
    <div style="margin: -1px;"></div>
    <div in:fly={{ x: -200, duration: 300 }} class="tooglableParentDiv">
        <Rankings {build} redirect={expanded} bind:selectedCategory />
        {#if isNewFormat}
            {#if selectedCategory}
                <div style="width: 300px; margin:auto;">
                    <CalcDetails {build} key={selectedCategory} />
                    <p
                        class="statsP"
                        style="font-size: 11px; padding-top:1px;padding-bottom:1px; padding-right:0; padding-left:0; margin:0; text-align: center; "
                    >
                        {"Standardized to " +
                            getTextUntilUnderscore(selectedCategory) +
                            " max lvl & trace"}
                    </p>
                </div>

                <div
                    style="display: flex; justify-content: space-between; padding-right: 10px; margin-left: 20px; width:280px;"
                >
                    <div style="margin-left: -16px; margin-right:5.5px;">
                        <HrefAvatarLc
                            redirect={expanded}
                            {build}
                            key={selectedCategory}
                        />
                        <LbStats lbStats={build["lbstats"][selectedCategory]} />
                        <RelicSetDisplay {relicSets} />
                    </div>
                    <div
                        style="display:flex; flex-direction: column; justify-content: space-evenly;"
                    >
                        <div style="display: flex; justify-content: end;">
                            <LbCalcDesc
                                calcDesc={build["calcDetails"][
                                    selectedCategory
                                ]}
                            />
                        </div>
                    </div>
                </div>
            {/if}
        {:else}
            <HrefAvatarLc redirect={expanded} {build} key={selectedCategory} />
            {#if "lbstats" in build}
                <LbStats {lbStats} />
            {/if}
            <RelicSetDisplay {relicSets} />
        {/if}
        <RelicsBulk {relics} charId={build["k"]} />
        <RvSummary {relics} charId={build["k"]} />

        {#if isNewFormat && selectedCategory}
            <ChaseSubs {build} {selectedCategory} />
            <PotentialBracketScores {build} {selectedCategory}></PotentialBracketScores>
        {/if}
    </div>
{/if}

<style>
    .tooglableParentDiv {
        background-color: rgba(30, 0, 70, 0.7);
        width: fit-content;
        min-width: 220px;
        margin: auto;
        padding: 7px;
        margin-top: 7px;
        border-radius: 10px;
        box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.2);
        margin-bottom: 5px;
        padding-bottom: 12px;
    }
</style>
