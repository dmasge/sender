<script>
    import { browser } from "$app/environment";
    import { loadRelicsDb, relicsDbWriteable } from "$lib/cache/relicsDb.js";
    import {
        unlockAllRelics,
        LockAllDisplayedRelics,
        UnlockAllDisplayedRelics,
    } from "$lib/cache/relicsDbLock.js";
    import RelicWrapper from "$lib/components/relics/RelicWrapper.svelte";
    import {
        getRelicswRV,
        sortRelicsByRV,
        filterRelicsBySlot,
        filterRelicsBySet,
    } from "$lib/components/relics/relicConstants.js";
    import SubstatFilter from "./substatFilter.svelte";
    import { subWeightsInventoryWriteable } from "$lib/cache/subWeightsInventory.js";
    import { relicSlotTypeFilterWriteable } from "$lib/cache/relicSlotTypeFilter.js";
    import SlotFilter from "./slotFilter.svelte";
    import SetsFilter from "./SetsFilter.svelte";

    export let uid;
    let relics = {};
    let relicsScored = {};
    let sortedRelicsByRV = {};
    let relicsFiltered = {};
    let uniqueSetsToogle = {};

    function reloadRelics() {
        relics = loadRelicsDb(uid);
        relicsFiltered = filterRelicsBySlot(relics);
        let relicsSetFiltered = filterRelicsBySet(
            relicsFiltered,
            uniqueSetsToogle,
        );
        relicsScored = getRelicswRV(relicsSetFiltered);
        sortedRelicsByRV = sortRelicsByRV(relicsScored);
    }

    if (browser) {
        relics = loadRelicsDb(uid);

        relicsDbWriteable.subscribe(() => {
            reloadRelics();
        });
        subWeightsInventoryWriteable.subscribe(() => {
            reloadRelics();
        });
        relicSlotTypeFilterWriteable.subscribe(() => {
            reloadRelics();
        });
    }
    $: reloadRelics(uniqueSetsToogle);
</script>

<div style="background-color: #000000A0; padding: 10px; text-align: center;">
    <p style="font-weight: 700;  font-size: 20px; margin:0;">
        Relics Inventory
    </p>
</div>

{#if browser}
    <SubstatFilter />
    <SlotFilter />
    <div style="display: flex; justify-content: center; ">
        <button on:click={() => unlockAllRelics(uid)}>
            Clear all locks 🔓
        </button>
        <button on:click={() => LockAllDisplayedRelics(uid, sortedRelicsByRV)}>
            Lock Displayed Relics 🔏
        </button>
        <button
            on:click={() => UnlockAllDisplayedRelics(uid, sortedRelicsByRV)}
        >
            Unlock Displayed relics 🔓
        </button>
    </div>

    
    <SetsFilter {uid} bind:uniqueSetsToogle></SetsFilter>
    {#key relics}
        <div class="relicsLoopDiv">
            {#each sortedRelicsByRV as [key, relic]}
                <RelicWrapper {relic} {key} {uid} />
            {/each}
        </div>
    {/key}
{/if}

<style>
    .relicsLoopDiv {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        /* overflow-x: auto; */
    }
</style>
