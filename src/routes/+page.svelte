<script>
    import frensBg from "$lib/assets/seeles.png";
    import discordPng from "$lib/assets/discord.png";
    let picSize = 120;
    let picSize2 = 50;
</script>

<div style="position: relative; border-radius: 27px; overflow: hidden;">
    <div id="bgDiv" style="overflow: hidden;">
        <img
            id="bg"
            style="transform: rotate(-30deg);"
            src={frensBg}
            alt="Your GIF"
        />
    </div>

    <div id="aboutDiv">
        <p id="header" style=" margin:10px;">
            {"~ About SeeleLand ~"}
        </p>
        <p>
            SeeleLand is a Seele fan community established and named after Seele
            in 2020.
        </p>
        <p>
            Much like our favorite girl, the land is filled with
            wholesomeness and positivity. It's the home of the sweetest
            Seelemains who treat each other like family.
        </p>
        <p>
            Whether you want to chat, share fanart, play games, or just have
            fun, SeeleLand is the place for you. There is something for everyone
            here.
        </p>
        <p>
            It's a peaceful place where you will always feel welcomed and
            accepted.
        </p>

        <div>
            <a
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
        width: 220%;
        margin-top: -20%;
        margin-left: -65%;
    }
    #bgDiv {
        margin-left: 0px;
        height: 65vw;
    }

    #aboutDiv {
        z-index: 1;
        transform: translate(-50%, -50%);
        border-radius: 26px;
        color: white;
        background-color: rgb(255, 255, 255, 0.8);

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
        font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
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
    }

    a,
    p {
        font-size: 2vw;
    }

    @media (max-width: 850px) {
        #bg {
            width: 2000px;

            margin-left: -60px;
            scale: 1.2;
        }
        #bgDiv {
            height: 1200px;

            display: flex;
            justify-content: center;
        }
        a,
        p {
            font-size: 20px;
        }
    }
</style>
