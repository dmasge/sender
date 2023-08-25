<script>
    export let ctgr;
    export let header;
    export let ctgrImg;
    import Pagination from "$lib/components/navigators/Pagination.svelte";
    import LbHeader from "$lib/components/LbHeader.svelte";
    import LbEntireCard from "$lib/components/LbEntireCard.svelte";

    import Bronbike from "$lib/components/Bronbike.svelte";
    import LbColumnsDesc from "$lib/components/LbColumnsDesc.svelte";

    export let jsonData;
</script>

<LbHeader {header} />

<LbColumnsDesc />

{#if jsonData}
    {#if (jsonData == "nothing to show here")}
        <p style="text-align: center;">Leaderboard empty or doesn't exist</p>
    {:else}
        {#each jsonData as build}
            <LbEntireCard {ctgrImg} {header} {build} {ctgr} />
            <hr class="lbHr" />
        {/each}

    {/if}
{:else}
    <Bronbike />
{/if}
<Pagination />

<style>
    .lbHr {
        width: 70%;
        margin: auto;
        margin-top: 1vw;
        height: 0px;
    }

</style>
