<script>
    export let header;
</script>


<div style="font-size: 3vw; margin: 1px; margin-bottom:20px; padding: 1px;" class="centeringDiv">
    <h3  class = "Header">{header}</h3>
</div>

<style>
    .centeringDiv {
            display: flex;
            align-items: center;
            justify-content: center;
        }
    @media (max-width: 850px) {
        
        h3{
            font-size: 25px;
        }
    }
</style>