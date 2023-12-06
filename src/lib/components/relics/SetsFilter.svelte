<script>
    import { getRelicUrl } from "$lib/iconUrls/avatarIconsUrl.js";
    import { loadRelicsDb } from "$lib/cache/relicsDb.js";
    import { relicsDbWriteable } from "$lib/cache/relicsDb.js";
    export let uniqueSetsToogle = {};
    export let uid;
    let relics;
    let uniqueSets;
    relicsDbWriteable.subscribe(() => {
        getSets();
    });
    function getSets() {
        relics = loadRelicsDb(uid);
        uniqueSets = Object.values(relics).map((item) => item.set);
        uniqueSets.forEach((set) => { uniqueSetsToogle[set] = uniqueSetsToogle[set] !== undefined ? uniqueSetsToogle[set] : true; });
    }
    function flipBit(key) {
        uniqueSetsToogle[key] = !uniqueSetsToogle[key];
        // Check if all are false
        let allFalse = Object.values(uniqueSetsToogle).every(
            (val) => val === false,
        );
        // If all are false, set all to true
        if (allFalse) {
            for (let key in uniqueSetsToogle) {
                uniqueSetsToogle[key] = true;
            }
        }
    }
    getSets();
</script>

<div class="setsLoopDiv">
    {#each Object.entries(uniqueSetsToogle) as [key, val]}
        <div style="padding: 5px;">
            {#if uniqueSetsToogle[key]}
                <button
                    style="padding: 4px; margin:0; border-color: var(--slider-color); background-color: rgba(130, 130, 255, 0.15);"
                    on:click={() => flipBit(key)}
                >
                    <img
                        src={getRelicUrl(key)}
                        alt="slot"
                        style="width:36px;"
                    />
                </button>
            {:else}
                <button
                    style="padding: 4px; margin:0; border-color: transparent"
                    on:click={() => flipBit(key)}
                >
                    <img
                        src={getRelicUrl(key)}
                        alt="slot"
                        style="width:36px;"
                    />
                </button>
            {/if}
        </div>
    {/each}
</div>

<style>
    .setsLoopDiv {
        margin: 5px;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        /* overflow-x: auto; */
    }
</style>
