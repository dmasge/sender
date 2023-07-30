<script>
    export let relics;
    import Relic from "$lib/components/Relic.svelte";

</script>

<div class="relicsDiv">
    {#each relics as relic, i}
        <Relic {relic} />
        {#if (i + 1) % 3 !== 0}
            <hr />
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
        width: 32vw;
        margin: auto;
    }

    @media (max-width: 850px) {
       
        .relicsDiv {
            width: 320px;
            height: 150 px;
            margin-bottom: 5px;
        }
        hr {
            height: 60px;
        }
    }
</style>
