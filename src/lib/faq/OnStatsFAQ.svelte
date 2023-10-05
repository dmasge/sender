<script>
    let text1 = "Eidolons, Superimposes and stats in calculations may not reflect your in-game stats for two reasons. Click here to learn more.";
    let text = text1;
    let text2 =
        "Reasons are standardization and categorization. For starters, char lvl, lc, and traces will always be assummed maxed. Builds may be put in different categories due speed or if whaling changes optimal substats distribution (without categorization/standardization whaled builds would always win as scores are evaluated using game's own formulas; not random weighting). For example, Seele's S1 night gives 18% CR whileas S5 30% CR, hence theoretical optimal relics at S1 will be suboptimal at S5 because of excess CR. Similarly, Blade gets 15% CR at E2 and optimal E0 build is suboptimal at E2. If you're E6, but put in E0 (or other) category it means optimal relics at E0 are same as at E6 and thus E6 category was never implemented. But, this may not always be true. Some category may yet to be implemented and unpopular niche builds may not get a separate category. Usually if something is actually popular and changes how optimal build looks it will eventually get a separate category.";
    function toggleText() {
        text = text == text1 ? text2 : text1;
    }
</script>

<div
    id="crits"
    style=" display: flex;
        justify-content: center;
        box-shadow: none;"
>
    <button id="critsButton" on:click={toggleText} on:keydown={() => {}}
        ><p style="text-align: center; width:300px; margin:auto; line-break: auto;">{@html text}</p>
    </button
    >
</div>



<style>
    #critsButton {
        display: flex;
        font-family: Arial, sans-serif;
        text-shadow: none;
        padding: 10px;
        font-size: 1.2vw;
        text-align: left;
        box-shadow: 0 0 10px #0000006f;
    }
</style>

