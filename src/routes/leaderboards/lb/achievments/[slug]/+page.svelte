<script>
    export let data;
    import ach from "$lib/assets/lb/ach.png";
    import Pagination from "$lib/components/Pagination.svelte";

    import Bronbike from "$lib/components/Bronbike.svelte";
    import LbHeader from "$lib/components/LbHeader.svelte";
    $: playerData = data.playerData;
    import { page } from "$app/stores";
    $: pageN = $page.url.pathname.split("/").pop();
    import LbPlayerCard from "$lib/components/LbPlayerCard.svelte";
    import { onMount } from "svelte";
    import LbColumnsDesc from "$lib/components/profile/LbColumnsDesc.svelte";
    let jsonData;
    async function getLbData() {
        try {
            console.log("clicked");
            let url = `https://seeleland.azurewebsites.net/api/get_ach_lb_data?page=${pageN}`;
            let response = await fetch(url);
            jsonData = await response.json();
        } catch (error) {
            console.log(error);
        }
    }
    onMount(() => {
        getLbData();
    });
</script>

<LbHeader header="Achievements" />
<LbColumnsDesc></LbColumnsDesc>
{#if jsonData}
    {#each jsonData as item}
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
