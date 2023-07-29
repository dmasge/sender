<script>
    export let relic;

    import { formatStat, abbreviateStat } from "$lib/stores.js";

    import { starRailRes } from "$lib/constants.js";

    let relicSize = 2;
</script>

<div class="RelicParentDiv" style="margin: 0vw;">
    <div style="display: flex">
        <img src={starRailRes + relic["icn"]} alt={"..."} class="RelicImg" />
        <p class="statsP">
            {abbreviateStat(relic["m"][0]) + " " + formatStat(relic["m"][1])}
        </p>
    </div>
    <div>
        {#each relic["sb"] as sub}
            <p class="statsP">
                <span>{abbreviateStat(sub[0])}</span>
                <span>{formatStat(sub[1])}</span>
            </p>
        {/each}
    </div>
</div>

<style>
    .statsP {
        font-family: Arial, sans-serif;
        font-size: 1.1vw;
        text-shadow: none;
        justify-content: space-between;
        display: flex;
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
    }
    .RelicParentDiv {
        width: 9vw;
    }

    .RelicImg {
        height: 2.1vw;
        width: 2.1vw;
        margin: -1px;
    }
    @media (max-width: 850px) {
        .RelicParentDiv {
            width: 100px;
            height: 80px;
        }

        .statsP {
            font-size: 11px;
        }
        .RelicImg {
            width: 25px;
            height: 25px;
        }
    }
</style>
