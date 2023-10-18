<script>
    export let build;
    let relics = build["r"];
    import RelicsBulk from "$lib/components/RelicsBulk.svelte";
    import LbStats from "$lib/components/LbStats.svelte";
    import RelicSetDisplay from "$lib/components/RelicSetDisplay.svelte";
    import Rankings from "$lib/components/profile/Rankings.svelte";
    import { fly } from "svelte/transition";
    import HrefAvatarLc from "$lib/components/profile/HrefAvatarLc.svelte";

    import { score_build } from "$lib/components/calculators/lbcalcs/score_builds.js";
    let shouldRenderNewFormat = false;
    if (build["k"] == "1208") {
        try {
            build = score_build(build);
        } catch (error) {
            console.log(error);
        }
        shouldRenderNewFormat = true;
        // console.log(build);
    }

    let showBuild = false;
    export let expanded = false;
    if (expanded) {
        showBuild = true;
    }

    let relicSets = build["rs"];
    let lbStats = [];
    let keys = build["lb"] ? Object.keys(build["lb"]) : [];
    let firstKey = keys.length > 0 ? keys[0] : false;
    if (firstKey) {
        let isFirstKeyInStats = build["lbstats"][firstKey] ? true : false;
        lbStats = isFirstKeyInStats
            ? build["lbstats"][firstKey]
            : build["lbstats"];
    }
    import RvSummary from "$lib/components/RVSummary.svelte";
    import LbCalcDesc from "./LbCalcDesc.svelte";
    import CalcDetails from "./CalcDetails.svelte";
    let selectedCategory;

    function getTextUntilUnderscore(inputString) {
        let index = inputString.indexOf("_");
        if (index !== -1) {
            return inputString.substring(0, index);
        } else {
            return inputString;
        }
    }
    console.log(build);
</script>

<div in:fly={{ x: -200, duration: 300 }} class="tooglableParentDiv">
    <Rankings {build} redirect={expanded} bind:selectedCategory />
    {#if build["k"] == "1208" && "lbstats" in build}
        {#if shouldRenderNewFormat && selectedCategory}
            <div style="width: 300px; margin:auto;">
                <CalcDetails {build} key={selectedCategory} />
                <p
                    class="statsP"
                    style="font-size: 11px; padding-top:1px;padding-bottom:1px; padding-right:0; padding-left:0; margin:0; text-align: center; "
                >
                    {"All calcs and stats assume " +
                        getTextUntilUnderscore(selectedCategory) +
                        " with max lvl & trace"}
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
                    <LbStats {lbStats} />
                    <RelicSetDisplay {relicSets} />
                </div>
                <div
                    style="display:flex; flex-direction: column; justify-content: space-evenly;"
                >
                    <div style="display: flex; justify-content: end;">
                        <LbCalcDesc
                            lbStats={build["calcDetails"][selectedCategory]}
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
    <!-- <div style="display: {showBuild ? 'block' : 'none'};"> -->
    <RelicsBulk {relics} charId={build["k"]} />
    <RvSummary {relics} charId={build["k"]} />
    <!-- </div> -->
</div>

<!-- {#if !expanded}
    <button
        class="toggle-build-button"
        on:click={() => (showBuild = !showBuild)}
    >
        {showBuild ? "Hide" : "Show"} relics
    </button>
{/if} -->

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

    /* .toggle-build-button {
        cursor: pointer;
        display: block;
        margin: 0 auto;
        text-align: center;
        outline: none;
    } */
</style>
