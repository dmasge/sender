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
    import ErrFilter from "$lib/components/navigators/ERRFilter.svelte";

    import { browser } from "$app/environment";
    import EidSuperNav from "$lib/components/navigators/EidSuperNav.svelte";

    import { isCharIdNewFormat } from "$lib/components/profile/temp.js";
    let scoringRules = scoringRulesDict[charId];
</script>

{#if browser}
    <div>
        <LeaderboardsList searchTerm={charId} isOnLeaderboard={true} />
    </div>
    <SpeedCategorizer />
    <ErrFilter />
    <EidSuperNav />
    <TeamFilter />
    <div class="sepDiv" />
    {#if !isCharIdNewFormat(charId)}
        <GeneralizedDesc text2={scoringRules} />
    {/if}
    <LbColumnsDesc />
    {#if jsonData}
        {#if jsonData == "nothing to show here"}
            <p style="text-align: center;">
                Leaderboard empty or doesn't exist
            </p>
        {:else}
            {#each jsonData as build, i}
                <div style="padding-top:20px; padding-bottom:20px;">
                    <LbEntireCard
                        {ctgrImg}
                        {header}
                        {build}
                        {ctgr}
                        rank={pageN + i - 9}
                    />
                </div>
                {#if i == 4}
                     <!-- possible ad -->
                {/if}
            {/each}
        {/if}
    {:else}
        <Bronbike />
    {/if}
    <Pagination />
{/if}

<style>
    .sepDiv {
        background-color: #000000a0;
        display: flex;
        margin: auto;
        justify-content: center;
        overflow: hidden;
        padding: 7px;
        margin-bottom: 12px;
    }
    /* .lbHr {
        width: 70%;
        margin: auto;
        margin-top: 1vw;
        height: 0px;
    } */
</style>
