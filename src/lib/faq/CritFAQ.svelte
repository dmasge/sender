<script>
    let text1 = "How much critrate is enough? clickme!";
    let text = text1;
    let text2 =
        "Scores are calculated by directly plugging your stats into the formulas of the game itself.";
    text2 +=
        "<br><br>Here's an oversimplification on crits, consider these two builds:";
    text2 += "<br>A: &nbsp&nbsp40CR&nbsp300CD";
    text2 += "<br>B: 100CR 180CD";
    text2 +=
        "<br><br>Average damage increase due crits is calculated as follows:";
    text2 += "<br>A: 0.4 &times; 300 = 120";
    text2 += "<br>B: &nbsp&nbsp&nbsp1 &times; 180 = 180";

    text2 += "<br><br>I hope you agree that 180 > 120.";

    text2 +=
        "<br><br>However, optimizing crits isn't enough to win the leaderboards, there are many other variables. An obvious one for Seele is ATK. Some chars may not care much about crits or there may be other more important stats.";
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
        >{@html text}</button
    >
</div>



<style>
    #critsButton {
        background-color: transparent;
        display: flex;
        font-family: Arial, sans-serif;
        text-shadow: none;
        padding: 0.7vw;
        font-size: 1.2vw;
        text-align: left;
        border: 1px solid #a8f3fff2;
        box-shadow: 0 0 10px #0000006f;
    }
</style>

