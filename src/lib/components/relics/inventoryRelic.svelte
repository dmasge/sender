<script>
    export let relic;
    import { getRelicUrl } from "$lib/iconUrls/avatarIconsUrl.js";
    import { formatStat, abbreviateStat, formatSpd } from "$lib/stores.js";
    import {
        subWeightsInventoryWriteable,
        loadSubWeightsInventory,
    } from "$lib/cache/subWeightsInventory.js";

    import { getSubWeightDict } from "$lib/components/relics/relicConstants.js";

    import {
        subHighlightsWriteable,
        getSubAffixBackgroundColor,
        getSubAffixTextColor,
    } from "$lib/cache/subHighlights.js";

    let weights = getSubWeightDict();
    function getSubType(substat) {
        let p = substat[1].includes("%");
        let subType = p ? substat[0] + "%" : substat[0];
        return subType;
    }
    let enka_relic_icn_map = {
        1: "0",
        2: "1",
        3: "2",
        4: "3",
        5: "0",
        6: "1",
    };
    function getIconFromType(relic) {
        let piece_slot_number = relic["t"];
        let setId = relic["set"];
        return setId + "_" + enka_relic_icn_map[piece_slot_number];
    }
</script>

<div class="RelicParentDiv" style="margin: 0vw;">
    <div
        style="display: flex; justify-content: space-between; 
            margin:-4px;
            padding:2px;"
    >
        {#if relic.hasOwnProperty("icn")}
            <img src={getRelicUrl(relic["icn"])} alt={"..."} class="RelicImg" />
        {:else}
            <img
                src={getRelicUrl(getIconFromType(relic))}
                alt={"..."}
                class="RelicImg"
            />
        {/if}

        <p class="statsP">
            {abbreviateStat(relic["m"][0]) + " " + formatStat(relic["m"][1])}
        </p>
    </div>
    <div style="padding-top: 2px" />
    <div>
        {#each relic["sb"] as sub, i}
            {@const subType = getSubType(sub)}
            <div
                style="
                    margin:0;"
            >
                <p
                    class="statsP"
                    style="color: {'rgba(240,240,240,' +
                        (0.3 + weights[subType] * 0.7) +
                        ')'}"
                >
                    <span>
                        {abbreviateStat(sub[0]) + " "}
                    </span>
                    <span style="">
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
