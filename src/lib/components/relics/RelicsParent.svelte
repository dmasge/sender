<script>
    import { browser } from "$app/environment";
    import { loadRelicsDb, relicsDbWriteable } from "$lib/cache/relicsDb.js";

    import RelicWrapper from "$lib/components/relics/RelicWrapper.svelte";
    import {
        getRelicswRV,
        sortRelicsByRV,
        filterRelicsBySlot,
    } from "$lib/components/relics/relicConstants.js";
    import SubstatFilter from "./substatFilter.svelte";

    import { subWeightsInventoryWriteable } from "$lib/cache/subWeightsInventory.js";

    import { relicSlotTypeFilterWriteable } from "$lib/cache/relicSlotTypeFilter.js";
    import SlotFilter from "./slotFilter.svelte";

    export let uid;
    let relics = {};
    let relicsScored = {};
    let sortedRelicsByRV = {};
    let relicsFiltered = {};

    function reloadRelics() {
        relics = loadRelicsDb(uid);
        relicsFiltered = filterRelicsBySlot(relics);
        relicsScored = getRelicswRV(relicsFiltered);
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
</script>

<div style="background-color: #000000A0; padding: 10px; text-align: center;">
    <p style="font-weight: 700;  font-size: 20px; margin:0;">Use sliders to set weights</p>
</div>

{#if browser}
    <SubstatFilter />
    <SlotFilter />
    {#key relics}
        <div class="relicsLoopDiv">
            {#each sortedRelicsByRV as [key, relic]}
                <RelicWrapper {relic} />
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
