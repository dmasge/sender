<script>
    export let header;
</script>


<div style="font-size: 3vw; margin: 1px; padding: 1px;" class="centeringDiv">
    <h3>{header}</h3>
</div>

<style>
    .centeringDiv {
            display: flex;
            align-items: center;
            justify-content: center;
        }
    h3{
        
        -webkit-text-stroke: 0.1px black;
    }
    @media (max-width: 850px) {
        
        h3{
            font-size: 25px;
        }
    }
</style>