<script>
    export let lbStats = [];
</script>

<!-- <div class="centeringDiv" style="display: flex; justify-content: center;">
    <p class="buildHeaderP" style="text-align: center;"> Standardized stats for {header}</p>

    style="margin-top: 5px; margin-bottom: 5px; background-color: #ffe2ae; border-radius: 10%; padding:10px;"
</div> -->
    <div class="parentDiv">
        <p style="text-decoration: underline; text-align: center;">Addendum</p>
    <div>
        {#each lbStats as stat, i}
            <div
                style="margin:-3px;
                    padding:3px;"
            >
                <div class="statsP">
                    <p style="width: 65%;">{stat[0]}</p>
                    <p style="width: 35%; text-align: right;">{stat[1]}</p>
                </div>
            </div>
        {/each}
    </div>
</div>

<style>
    .statsP {
        justify-content: space-between;
        display: flex;
        font-size: 10px;
        align-items: center;
    }

    p {
        margin: 0;
        padding: 0;
        margin-top: 2px;
        margin-bottom: 2px;
        font-size: 11px;
    }

    .parentDiv {
        width: 200px;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        padding-bottom: 10px;
        padding-right: 3px;
    }
    div {
        margin: 0;
        padding: 0;
    }
</style>
