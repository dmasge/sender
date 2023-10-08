<script>
    export let build;
    let relics = build["r"];
    import RelicsBulk from "$lib/components/RelicsBulk.svelte";
    import LbStats from "$lib/components/LbStats.svelte";
    import RelicSetDisplay from "$lib/components/RelicSetDisplay.svelte";
    import Rankings from "$lib/components/profile/Rankings.svelte";

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
</script>

<div class="tooglableParentDiv">
    <Rankings {build} redirect={expanded} />
    <LbStats {lbStats} />
    <RelicSetDisplay {relicSets} />
    <div style="display: {showBuild ? 'block' : 'none'};">
        <RelicsBulk {relics} charId={build["k"]} />
        <div style="margin: -10px;"></div>
        <RvSummary {relics} charId={build["k"]} />
    </div>
</div>
{#if !expanded}
    <button
        class="toggle-build-button"
        on:click={() => (showBuild = !showBuild)}
    >
        {showBuild ? "Hide" : "Show"} relics
    </button>
{/if}

<style>
    .tooglableParentDiv {
        background-color: rgba(30, 0, 69, 0.647);
        width: fit-content;
        min-width: 220px;
        margin: auto;
        padding: 7px;
        margin-top: 7px;
        border-radius: 20px;
        box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.2);
        margin-bottom: 5px;
    }

    .toggle-build-button {
        cursor: pointer;
        display: block;
        margin: 0 auto;
        text-align: center;
        outline: none;
    }
</style>
