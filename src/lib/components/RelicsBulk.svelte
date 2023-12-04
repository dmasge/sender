<script>
    export let relics;
    export let charId;
    import Relic from "$lib/components/Relic.svelte";
    if (relics.every(relic => 't' in relic)) {
        // If all objects have the 't' field, sort relics in ascending order based on 't' field
        relics = relics.sort((a, b) => a.t - b.t);
    }
</script>

<div class="relicsDiv">
    {#each relics as relic, i}
        <Relic {relic} {charId} />
        {#if (i + 1) % 3 !== 0}
            <hr style="border:none;" />
        {/if}
    {/each}
    
</div>

<style>
    /* .centeringDiv {
        display: flex;
        align-items: center;
        justify-content: center;
    } */
    
    
    .relicsDiv {
        display: flex;
        flex-wrap: wrap;
        margin: auto;
        width: 330px;
        height: 180px;
        justify-content:center; align-items:center; margin:auto;
    }
    hr {
        height: 1px;
        margin-left: 1px;
        margin-right: 17px;
    }

</style>
