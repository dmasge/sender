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
</script>

{#each teamMateIds as teamMateId}
    <div style="height: 20px; overflow: hidden; margin:3px;">
        <img
            style="scale:2.5;"
            src={starRailRes + "icon/character/" + teamMateId + extension}
            alt={"..."}
            class="RelicImg avatar"
        />
    </div>
{/each}

<style>
    img {
        height: 25px;
        width: auto;
        margin: 0px;
        padding: 0px;
    }
</style>
