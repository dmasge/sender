<script>
    import { browser } from "$app/environment";
    import { loadRelicsDb, relicsDbWriteable } from "$lib/cache/relicsDb.js";

    import RelicWrapper from "$lib/components/relics/RelicWrapper.svelte";
    import {
        getRelicswRV,
        sortRelicsByRV,
    } from "$lib/components/relics/relicConstants.js";
    import SubstatFilter from "./substatFilter.svelte";

    import { subWeightsInventoryWriteable } from "$lib/cache/subWeightsInventory.js";

    export let uid;
    let relics = {};
    let relicsScored = {};
    let sortedRelicsByRV = {};

    function reloadRelics() {
        relics = loadRelicsDb(uid);
        relicsScored = getRelicswRV(relics);
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
    }
</script>

<div style="background-color: #000000A0; padding: 10px; text-align: center;">
    <p style="font-weight: 700; font-size: 18px; margin:0;">Relics</p>
</div>

{#if browser}
    <SubstatFilter />
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
        justify-content: space-around;
        /* overflow-x: auto; */
    }
</style>
