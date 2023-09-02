<script>
    export let relics;
    export let charId;
    import Relic from "$lib/components/Relic.svelte";
</script>

<div class="relicsDiv">
    {#each relics as relic, i}
        <Relic {relic} {charId} />
        {#if (i + 1) % 3 !== 0}
            <hr style="border:none;"/>
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
        padding:15px;
        width: 345px;
        height: 270px;
        margin-bottom: -15px;
    }
    hr {
        height: 1px;
    }

    @media (max-width: 850px) {
        .relicsDiv {
        width: 310px;
        padding:5px;
    }
    }
</style>
