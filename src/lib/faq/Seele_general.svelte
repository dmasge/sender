<script>
    let text1 = "Scoring rules";
    let text = text1;
    let text2 =
        "Leaderboards are standardized, meaning all Seeles are assummed to be max char lvl, trace lvl, cone lvl. (only relics affect score)<br><br>";
    text2 +=
        "Scores are calculated based on your Seele's average damage for 2x skill + 1x ULT + 2x buffed skill";
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
    <button id="critsButton" on:click={toggleText} on:keydown={() => {}}>
        <div>
            <p style="padding:5px;">{@html text}</p>
        </div>
    </button>
</div>

<style>
    button {
        box-shadow: 0 0 10px #0000006f;
    }
    p {
        margin: 0;
    }
</style>
