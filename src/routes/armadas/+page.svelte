<script>
    import armadaBg from "$lib/assets/armada_bg.png";
</script>

<div style="position: relative;border-bottom-left-radius: 25px;
border-bottom-right-radius: 25px; overflow: hidden;">
    <div id="bgDiv" style="overflow: hidden;">
        <img id="bg" src={armadaBg} alt="Your GIF" />
    </div>

    <div id="aboutDiv" class="Header">
        <p id="header" style=" margin:10px;">
            {"~ SeeleLand Armadas ~"}
        </p>
        <p>HI3 NA SeeleLand <br />ID: 29400</p>
        <p>HI3 SEA SeeleLand <br /> ID: 1000007</p>
        <p>EU Branch <br /> Name: Void_Stars <br /> ID: 31777</p>
        <p>
            BA NA Club <br /> Club Name: SeeleLand <br /> Leader: Seele <br /> ID:
            3007 <br/> Server: NA
        </p>
    </div>
</div>

<style>
    #bg {
        width: 140%;
        margin-top: -16%;
        margin-left: -20%;
    }
    #bgDiv {
        margin-left: 0px;
        height: 64vw;
    }

    #aboutDiv {
        z-index: 1;
        transform: translate(-50%, -50%);
        color: #9600d6;
        background-color: rgb(255, 255, 255, 0.8);
        border-radius: 25px;
        box-shadow: 0 0 10px white;
        justify-content: center;
        text-align: center;

        display: flex;
        align-items: center;
        flex-direction: column;

        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        width: 95%;
    }


    /* p {
        font-family: Arial, sans-serif;
        color: #9600d6;
        margin: 5px;
        margin-top: 15px;
        margin-bottom: 15px;
    } */

    p {
        font-size: 2.5vw;
        margin: 0;
        margin-top: 15px;
        margin-bottom: 15px;
        text-shadow: none;
    }

    @media (max-width: 850px) {
        #bg {
            width: 1440px;
            height: 1440px;
            margin-top: -150px;
            margin-left: 10px;
        }
        #bgDiv {
            height: 800px;
            display: flex;
            justify-content: center;
        }

        p {
            font-size: 25px;
        }
    }
</style>
