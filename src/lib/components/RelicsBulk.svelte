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
        height: 18vw;
        margin-left: 4px;
        margin-right: 4px;
        margin-bottom: -1vw;
    }
    hr {
        height: 7vw;
    }

    @media (max-width: 850px) {
        .relicsDiv {
            width: 320px;
            height: 195px;
            margin-bottom: 0px;
        }
        hr {
            height: 75px;
        }
    }
</style>
