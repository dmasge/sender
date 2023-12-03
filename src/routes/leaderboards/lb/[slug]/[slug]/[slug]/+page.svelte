<script>
    import BuildsLeaderboard from "$lib/components/lb/BuildsLeaderboard.svelte";
    import {
        capitalizeAndRemoveUnderscores,
        getPicForCtgr,
    } from "$lib/leaderboards.js";

    import { browser } from "$app/environment";
    export let data;

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    let pageN = data.page;
    let charId = data.k;
    let ctgr = data.ctgr;
    let charName = capitalizeFirstLetter(data.charName);
    let header =
        capitalizeAndRemoveUnderscores(charName) +
        " " +
        capitalizeAndRemoveUnderscores(ctgr);
    let ctgrImg = getPicForCtgr(ctgr);
    let jsonData = data.lbData;
</script>

{#if browser}
    <BuildsLeaderboard {ctgr} {charId} {header} {ctgrImg} {jsonData} />
{/if}
