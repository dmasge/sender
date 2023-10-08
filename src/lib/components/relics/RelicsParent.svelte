<script>
    import { browser } from "$app/environment";
    import { loadRelicsDb, relicsDbWriteable } from "$lib/cache/relicsDb.js";
    import RelicWrapper from "$lib/components/relics/RelicWrapper.svelte";
    export let uid;
    let relics = {};

    if (browser) {
        relics = loadRelicsDb(uid);
        relicsDbWriteable.subscribe((value) => {
            relics = loadRelicsDb(uid);
        });
    }
</script>

<div style="background-color: #000000A0; padding: 10px; text-align: center;">
    <p style="font-weight: 700; font-size: 18px; margin:0;">Relics</p>
</div>

{#if browser}
    {#key relics}
        <div class="relicsLoopDiv">
            {#each Object.entries(relics) as [key, relic]}
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
