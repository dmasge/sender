<script>
    export let text2 = "";
    let text1 = "Scoring rules";
    let text = text1;
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
        background-color: transparent;
        box-shadow: 0 0 10px #0000006f;
    }
    p {
        margin: 0;
    }
</style>
