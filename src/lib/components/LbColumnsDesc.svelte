<div class="card">
    <div class="centeringDiv">
        <p>Rank</p>
    </div>
    <div class="sutffInMiddle">
        <p>Player</p>
    </div>
    <div class="centeringDiv">
        <div>
            
            <p>
               Score
            </p>
        </div>
    </div>
</div>
<hr class="lbHr" />

<div style="padding-bottom: 15px;"> </div>

<style>
    .card {
        display: flex;
        text-align: center;
        justify-content: space-between;
        width: 50vw;
        margin: auto;
    }

    .centeringDiv {
        width: 10%;
    }

    p {
        font-size: 2.5vw;
        margin: 0;
    }
    p {
        font-family: Arial, sans-serif;
        font-size: 1vw;
    }
   

    .sutffInMiddle {
        width: 70%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .centeringDiv {
        display: flex;
        align-items: center;
        justify-content: center;
    }

   
    @media (max-width: 850px) {
        .card {
            width: 300px;
        }
        p {
            font-size: 20px;
        }
        p {
            font-size: 15px;
        }
    }
    .lbHr {
        width: 70%;
        margin: auto;
        margin-top: 1vw;
        height: 0;
    }

</style>
