<script>
    export let data;
    import ach from "$lib/assets/lb/ach.png";
    import Pagination from "$lib/components/navigators/Pagination.svelte";
    import Bronbike from "$lib/components/Bronbike.svelte";
    import LbHeader from "$lib/components/LbHeader.svelte";
    import LbPlayerCard from "$lib/components/LbPlayerCard.svelte";
    import LbColumnsDesc from "$lib/components/LbColumnsDesc.svelte";
    
</script>

<LbHeader header="Achievements" />
<LbColumnsDesc></LbColumnsDesc>
{#if data.lbData}
    {#each data.lbData as item}
        <LbPlayerCard
            player={item}
            ctgrImg={ach}
            score={item["ach"]}
            rank={item["achrank"]}
            isAch={true}
        />
        <hr class="lbHr" />
    {/each}
{:else}
    <Bronbike />
{/if}

<Pagination />

<style>
    .lbHr {
        width: 50vw;
    }
</style>
