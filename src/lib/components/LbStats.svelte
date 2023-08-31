<script>
    export let lbStats = [];
    export const header = "";

</script>

<!-- <div class="centeringDiv" style="display: flex; justify-content: center;">
    <p class="buildHeaderP" style="text-align: center;"> Standardized stats for {header}</p>
</div> -->
<div class="RelicParentDiv" style="margin-top: 5px; margin-bottom: 5px;">
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
        width: 9vw;
    }
    div {
        margin: auto;
        padding: 0vw;
        align-items: center;
        justify-content: center;
    }

    @media (max-width: 850px) {
        .RelicParentDiv {
            width: 100px;
        }
      
    }
</style>
