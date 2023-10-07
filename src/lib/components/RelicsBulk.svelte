<script>
    export let relics;
    export let charId;
    import Relic from "$lib/components/Relic.svelte";
    
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
    }
    hr {
        height: 1px;
    }

</style>
