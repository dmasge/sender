<script>
    export let lbStats = [];
    export let header = "";

</script>

<div class="centeringDiv" style="display: flex; justify-content: center;">
    <p class="buildHeaderP" style="text-align: center;"> Standardized stats for {header}</p>
</div>
<div class="centeringDiv" style="margin-top: 5px; margin-bottom: 5px;">
    <div>
        {#each lbStats as stat}
            <p class="statsP">
                <span>{stat[0]}</span>
                <span>{stat[1]}</span>
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
        width: 100px;
    }
    p,
    span {
        margin: 0;
    }
    .buildHeaderP{
        
        text-shadow: none;
    }
    .centeringDiv {
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0;
    }
    @media (max-width: 850px) {
        .statsP {
            font-size: 11px;
        }
        .buildHeaderP {
            font-size: 11px;
        }
    }
</style>
