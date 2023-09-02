<script>
    export let relic;
    export let charId;
    import { getRelicUrl } from "$lib/iconUrls/avatarIconsUrl.js";
    import { formatStat, abbreviateStat } from "$lib/stores.js";
    import { getSubstatColor, dimSubs } from "$lib/substatColorizer.js";
    let relicSize = 2;
</script>

<div class="RelicParentDiv" style="margin: 0vw;">
    <div
        style="display: flex; justify-content: space-between; 
            background-color: #ffe2ae;
            margin:-4px;
            padding:2px;"
    >
        <img src={getRelicUrl(relic["icn"])} alt={"..."} class="RelicImg" />
        <p class="statsP">
            {abbreviateStat(relic["m"][0]) + " " + formatStat(relic["m"][1])}
        </p>
    </div>
    <div>
        {#each relic["sb"] as sub, i}
            <!-- {@const [index, color] = getSubstatColor(abbreviateStat(sub[0]), sub[1])} -->
            {@const colorFlat = dimSubs(abbreviateStat(sub[0]), charId)}
            <div
                style="background-color: {colorFlat != 'rgba(0, 0, 0, 1)'
                    ? 'transparent'
                    : '#ffe2ae'};
                    margin:-3px;
                    padding:3px;"
            >
                <p class="statsP">
                    <span style="color: {colorFlat};">
                        {abbreviateStat(sub[0]) + " "}
                    </span>
                    <span style="color: {colorFlat};">
                        {formatStat(sub[1])}
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
        font-size: 12px;
    }
    div {
        margin: 0vw;
        padding: 0vw;
        align-items: center;
        justify-content: center;
    }
    p {
        margin: 0vw;
        padding: 0vw;
        margin-top: 3px;
        margin-bottom: 3px;
    }
    .RelicParentDiv {
        width: 95px;
        height: 95px;
        padding-bottom: 5px;
    }

    .RelicImg {
        width: 25px;
        height: 25px;
    }
    @media (max-width: 850px) {
    }
</style>
