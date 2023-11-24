<script>
    import { starRailRes, extension } from "$lib/constants.js";
    export let key; // category
    let teamMateIds = [];

    if (key.includes("FX")) {
        teamMateIds.push("1208");
    }
    if (key.includes("YK")) {
        teamMateIds.push("1207");
    }
    if (key.includes("PL")) {
        teamMateIds.push("1106");
    }
    if (key.includes("BN")) {
        teamMateIds.push("1101");
    }
    if (key.includes("GNF")) {
        teamMateIds.push("1210");
    }
    if (key.includes("HUO")) {
        teamMateIds.push("1217");
    }
</script>

<div style="display: flex; flex-direction: row;">
    {#each teamMateIds as teamMateId}
        <div style="height: 25px; overflow: hidden; margin:2px; width:{75 / teamMateIds.length + 'px'}">
            <img
                style="scale:2.7; margin-top:{(teamMateIds.length == 2 ? 12.5 : 0) + 'px'};"
                src={starRailRes + "icon/character/" + teamMateId + extension}
                alt={"..."}
            />
        </div>
    {/each}
</div>

<style>
    img {
        height: 23px;
        width: auto;
        margin: 0px;
        padding: 0px;
    }
</style>
