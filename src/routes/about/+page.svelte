<script>
    import frensBg from "$lib/assets/seewe_frens-min.png";
    import discordPng from "$lib/assets/discord.png";
    let picSize = 120;
    let picSize2 = 50;
</script>

<div style="position: relative;border-bottom-left-radius: 25px;
border-bottom-right-radius: 25px; overflow: hidden;">
    <div id="bgDiv" style="overflow: hidden;">
        <img id="bg" src={frensBg} alt="Your GIF" />
    </div>

    <div id="aboutDiv">
        <p id="header" style=" margin:10px;">
            {"~ About SeeleLand ~"}
        </p>
        <p>SeeleLand is a Seele fan community established in 2020.</p>
        <p>
            Much like our favorite girl, the land is filled with wholesomeness
            and positivity. It's the home of the sweetest Seelemains who treat
            each other like family.
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
            <a
                class="Header"
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
                                width: {3 * 1.32}vw;
                                height: 3vw;"
                        />
                    </div>
                    <p style="margin-top: 0;">
                        {"Join"}
                    </p>
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
        color: white;
        background-color: rgb(255, 255, 255, 0.9);
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
    a {
        text-decoration: none;
    }
    /* p {
        text-shadow: none;
        font-family: Arial, sans-serif;
        color: #9600d6;
        margin-top: 15px;
        margin-bottom: 15px;
        
        font-weight: bold;
    } */

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

        a,
        p {
            font-size: 20px;
        }
    }
</style>
