<script>
    export let relic;
    export let charId;
    import { getRelicUrl } from "$lib/iconUrls/avatarIconsUrl.js";
    import { formatStat, abbreviateStat, formatSpd } from "$lib/stores.js";
    let relicSize = 2;

    import {
        subHighlightsWriteable,
        getSubAffixBackgroundColor,
        getSubAffixTextColor,
    } from "$lib/cache/subHighlights.js";

    let subHighlights;
    subHighlightsWriteable.subscribe((value) => {
        subHighlights = value;
    });

    function getSubType(substat){
        let p = substat[1].includes("%");
        let subType = p ? substat[0] + "%" : substat[0];
        return subType;
    }
</script>

{#key subHighlights}
    <div class="RelicParentDiv" style="margin: 0vw;">
        <div
            style="display: flex; justify-content: space-between; 
            margin:-4px;
            padding:2px;"
        >
            <img src={getRelicUrl(relic["icn"])} alt={"..."} class="RelicImg" />
            <p class="statsP">
                {abbreviateStat(relic["m"][0]) +
                    " " +
                    formatStat(relic["m"][1])}
            </p>
        </div>
        <div>
            {#each relic["sb"] as sub, i}
                <!-- {@const [index, color] = getSubstatColor(abbreviateStat(sub[0]), sub[1])} -->
                {@const subType = getSubType(sub)}
                <div
                    style="background-color: {getSubAffixBackgroundColor(charId, subType)};
                    margin:0;"
                >
                    <p class="statsP">
                        <span style="color: {getSubAffixTextColor(charId, subType)};">
                            {abbreviateStat(sub[0]) + " "}
                        </span>
                        <span style="color: {getSubAffixTextColor(charId, subType)};">
                            {#if abbreviateStat(sub[0]) != "SPD"}
                                {formatStat(sub[1])}
                            {:else}
                                {formatSpd(sub[1])}
                            {/if}
                        </span>
                    </p>
                </div>
            {/each}
        </div>
    </div>
{/key}

<style>
    .statsP {
        justify-content: space-between;
        display: flex;
        font-size: 11.8px;
        margin: 0;
    }
    div {
        margin: 0vw;
        padding: 0vw;
        align-items: center;
        justify-content: center;
    }
    .RelicParentDiv {
        width: 90px;
    }

    .RelicImg {
        width: 25px;
        height: 25px;
    }
    @media (max-width: 850px) {
    }
</style>
