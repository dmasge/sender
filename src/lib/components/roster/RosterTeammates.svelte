<script>
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
    if (key.includes("ASTA")) {
        teamMateIds.push("1009");
    }
    if (key.includes("TY")) {
        teamMateIds.push("1202");
    }
    if (key.includes("HNYA")) {
        teamMateIds.push("1215");
    }
    if (key.includes("MONOQ")) {
        teamMateIds.push("1306");
        teamMateIds.push("1006");
        teamMateIds.push("1208");
    }

    let picUrlBase = "https://api.hakush.in/hsr/UI/avatarshopicon/";
    let extension = ".webp";
</script>

<div style="display: flex; flex-direction: row; width:100px;">
    {#each teamMateIds as teamMateId}
        <div style="height: 25px; overflow: hidden; margin:2px; width:{100 / teamMateIds.length + 'px'}">
            <img
                style="scale:{(teamMateIds.length == 2 ? 4 : 4)}; margin-top:{20 + 'px'};"
                src={picUrlBase + teamMateId + extension}
                alt={"..."}
            />
        </div>
    {/each}
</div>

<style>
    img {
        height: 25px;
        width: auto;
        margin: 0px;
        padding: 0px;
    }
</style>
