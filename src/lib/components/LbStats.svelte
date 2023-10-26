<script>
    export let lbStats = [];
</script>

<!-- <div class="centeringDiv" style="display: flex; justify-content: center;">
    <p class="buildHeaderP" style="text-align: center;"> Standardized stats for {header}</p>

    style="margin-top: 5px; margin-bottom: 5px; background-color: #ffe2ae; border-radius: 10%; padding:10px;"
</div> -->
<div class="RelicParentDiv">
    <p
        class="statsP"
        style="font-size: 10.8px; text-decoration: underline; text-align: center;"
    >
        Out of combat stats
    </p>
    <div>
        {#if lbStats}
            {#each lbStats as stat, i}
                <div
                    style="margin:-3px;
                    padding:3px;"
                >
                    <p class="statsP">
                        <span>{stat[0]}</span>
                        <span>{stat[1]}</span>
                    </p>
                </div>
            {/each}
        {/if}
    </div>
</div>

<style>
    .statsP {
        justify-content: space-between;
        display: flex;
    }

    p {
        margin: 0vw;
        padding: 0vw;
        margin-top: 2px;
        margin-bottom: 2px;
    }

    .RelicParentDiv {
        width: 96px;
    }
    div {
        margin: auto;
        padding: 0vw;
        align-items: center;
        justify-content: center;
    }
</style>
