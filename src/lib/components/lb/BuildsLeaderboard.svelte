<script>
    export let ctgr;
    export let header;
    export let ctgrImg;
    export let jsonData;

    import Pagination from "$lib/components/navigators/Pagination.svelte";
    import LbEntireCard from "$lib/components/LbEntireCard.svelte";

    import Bronbike from "$lib/components/Bronbike.svelte";
    import LbColumnsDesc from "$lib/components/LbColumnsDesc.svelte";

    import { page } from "$app/stores";
    let str = $page.url.pathname;
    let splitStr = str.split("/");
    let charId = splitStr[3];
    let pageN = splitStr[5];

    import LeaderboardsList from "./LeaderboardsList.svelte";

    import SpeedCategorizer from "$lib/components/navigators/SpeedCategorizer.svelte";
    import TeamFilter from "$lib/components/navigators/TeamFilter.svelte";
    
    import GeneralizedDesc from "$lib/faq/Generalized_desc.svelte";
    
    import { scoringRulesDict } from "$lib/scoringRules.js";
    let scoringRules = scoringRulesDict[charId];
</script>


<GeneralizedDesc text2={scoringRules}/>

<LeaderboardsList searchTerm={charId} isOnLeaderboard={true}/>
<SpeedCategorizer />
<TeamFilter></TeamFilter>
<LbColumnsDesc />

{#if jsonData}
    {#if jsonData == "nothing to show here"}
        <p style="text-align: center;">Leaderboard empty or doesn't exist</p>
    {:else}
        {#each jsonData as build, i}
            <LbEntireCard
                {ctgrImg}
                {header}
                {build}
                {ctgr}
                rank={pageN + i - 9}
            />
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
