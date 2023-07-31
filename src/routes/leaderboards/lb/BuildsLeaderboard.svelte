<script>
    export let ctgr;
    export let charId;
    export let header;
    export let ctgrImg;
    import Pagination from "$lib/components/Pagination.svelte";
    import LbHeader from "$lib/components/LbHeader.svelte";
    import LbEntireCard from "$lib/components/LbEntireCard.svelte";
    import { page } from "$app/stores";
    $: pageN = $page.url.pathname.split("/").pop();
    import { onMount } from "svelte";

    import Bronbike from "$lib/components/Bronbike.svelte";
    
    let jsonData;
    async function getLbData() {
        try {
            console.log("clicked");
            let url = `https://seeleland.azurewebsites.net/api/get_lb_data?k=${charId}&ctgr=${ctgr}&page=${pageN}`;
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

<LbHeader {header} />

{#if jsonData}
    {#each jsonData as build}
        <LbEntireCard {ctgrImg} {header} {build} {ctgr} />
        <hr class="lbHr" />
    {/each}
{:else}
    <Bronbike />
{/if}

<Pagination />

<style>
    .lbHr {
        width: 50vw;
        margin: auto;
        margin-top: 1vw;
    }

    @media (max-width: 850px) {
        hr {
            height: 60px;
        }

        .lbHr {
            height: 0;
        }
    }
</style>
