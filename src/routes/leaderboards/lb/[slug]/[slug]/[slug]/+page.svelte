<script>
    import BuildsLeaderboard from "$lib/components/lb/BuildsLeaderboard.svelte";
    import {
        capitalizeAndRemoveUnderscores,
        getPicForCtgr,
    } from "$lib/leaderboards.js";
    import { scoringRulesDict } from "$lib/scoringRules.js";
    import { speedCategoriesCase } from "$lib/speedCategories.js";
    import GeneralizedDesc from "$lib/faq/Generalized_desc.svelte";
    import SpeedCategorizer from '$lib/components/navigators/SpeedCategorizer.svelte';
    
    export let data;
    
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    let page = data.page;
    let charId = data.k;
    let ctgr = data.ctgr;
    let charName = capitalizeFirstLetter(data.charName);
    let  header =
        capitalizeAndRemoveUnderscores(charName) +
        " " +
        capitalizeAndRemoveUnderscores(ctgr);
    let ctgrImg = getPicForCtgr(ctgr);
    let jsonData = data.lbData;
    let scoringRules = scoringRulesDict[data.charName];
    let speedCategories = speedCategoriesCase(data.charName);
</script>

<div style="margin-bottom:-10px;">
    <GeneralizedDesc text2={scoringRules}/>
    <SpeedCategorizer spdCtgrs={speedCategories}></SpeedCategorizer>
</div>

<BuildsLeaderboard
        {ctgr}
        {charId}
        {header}
        {ctgrImg}
        {jsonData}
        {page}
    />