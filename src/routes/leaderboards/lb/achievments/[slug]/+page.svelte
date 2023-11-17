<script>
    export let data;
    import ach from "$lib/assets/lb/ach.png";
    import Pagination from "$lib/components/navigators/Pagination.svelte";
    import Bronbike from "$lib/components/Bronbike.svelte";
    import LbPlayerCard from "$lib/components/LbPlayerCard.svelte";
</script>

<p class="Header">{"Achievements"}</p>
{#if data.lbData}
    {#each data.lbData as item}
        <div style="padding-top:20px; padding-bottom:20px;">
            <LbPlayerCard
                player={item}
                ctgrImg={ach}
                score={item["ach"]}
                rank={item["achrank"]}
                isAch={true}
            />
        </div>
    {/each}
{:else}
    <Bronbike />
{/if}

<Pagination />

<style>
    p {
        text-align: center;
        font-size: 30px;
        padding-top: 20px;
        padding-bottom: 20px;
    }
</style>
