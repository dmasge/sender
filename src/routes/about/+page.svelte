<script>
    import frensBg from "$lib/assets/seewe_frens-min.png";
    import discordPng from "$lib/assets/discord.png";
    let picSize = 120;
    let picSize2 = 50;
</script>

<div style="position: relative; border-radius: 27px; overflow: hidden;">
    <div id="bgDiv" style="overflow: hidden;">
        <img id="bg" src={frensBg} alt="Your GIF" />
    </div>

    <div id="aboutDiv">
        <p id="header" style=" margin:10px;">
            {"~ About SeeleLand ~"}
        </p>
        <p>
            SeeleLand is a Seele fan community established in 2020.
        </p>
        <p>
            Much like our favorite girl, the land is filled with
            wholesomeness and positivity. It's the home of the sweetest
            Seelemains who treat each other like family.
        </p>
        <p>
            Whether you want to chat, share fanart, play games, or just have
            fun, SeeleLand is the place for you! 
        </p>
        <p>
            It's a peaceful place where you will always feel welcomed and
            accepted.
        </p>

        <div>
            <a class="Header"
                id="seelelandDiscord"
                href={"https://discord.gg/WWEFykz"}
                style="justify-content: center;"
            >
                <div>
                    <div>
                        <img
                            src={discordPng}
                            alt="Home"
                            style="background: transparent; 
                                min-width : {picSize2 * 1.32}px; 
                                min-height : {picSize2}px; 
                                width: {3*1.32}vw;
                                height: 3vw;"
                        />
                    </div>
                    <div class="stroke">
                        {"Join"}
                    </div>
                </div>
            </a>
        </div>
    </div>
</div>

<style>
    #bg {
        width: 140%;
        margin-top: 0%;
        margin-left: -25%;
    }
    #bgDiv {
        margin-left: 0px;
        height: 64vw;
    }

    #aboutDiv {
        z-index: 1;
        transform: translate(-50%, -50%);
        border-radius: 26px;
        color: white;
        background-color: rgb(255, 255, 255, 0.9);

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
    a {
        text-decoration: none;
        text-shadow: none;
        color: white;
        -webkit-text-stroke: 1px black;
    }
    p {
        font-family: Arial, sans-serif;
        color: #9600d6;
        margin: 5px;
        margin-top: 15px;
        margin-bottom: 15px;
        /* text-shadow: 0.1px 0.1px 0.1px #9600d6; */
        font-weight: bold;
        /* -webkit-text-stroke: 0.1px black; */
    }

    a,
    p {
        font-size: 1.7vw;
    }

    @media (max-width: 850px) {
        #bg {
            margin-top: -140px;
            margin-left: -650px;
            width: 4096px;
            height: 2304px;
        }

        #bgDiv {
            height: 800px;
            display: flex;
            justify-content: center;
        }

        a, p {
            font-size: 20px;
        }
    }
</style>
