<script>
    import frensBg from "$lib/assets/seewe_frens-min.png";
    import guoba from "$lib/assets/partners/guoba.png";
    import seelemains from "$lib/assets/partners/seelemains.gif";
    import bronya from "$lib/assets/partners/bronya.png";

    let partners = [
        {
            pic: guoba,
            url: "https://discord.gg/guobafans",
            nm: "https://discord.gg/guobafans",
        },
        {
            pic: bronya,
            url: "https://discord.gg/bronya",
            nm: "https://discord.gg/bronya",
        },
        {
            pic: seelemains,
            url: "https://discord.gg/seelemains",
            nm: "https://discord.gg/seelemains",
        },
    ];
</script>

<div
    style="position: relative; border-bottom-left-radius: 25px;
border-bottom-right-radius: 25px; overflow: hidden;"
>
    <div id="bgDiv" style="overflow: hidden;">
        <img id="bg" src={frensBg} alt="Your GIF" loading="lazy" />
    </div>

    <div id="aboutDiv">
        <p class="Header" style=" margin:5px;">
            {"~ SeeleLand's friends ~"}
        </p>
        <div style="overflow:auto; max-height:520px;">
            {#each partners as partner}
                <a href={partner.url} target="_blank"
                    ><div style="margin-top: 20px;">
                        <img
                            loading="lazy"
                            src={partner.pic}
                            alt="Home"
                            style="width:250px; height: 125px; margin:0;"
                        />
                        <p
                            style=" font-family: Arial, sans-serif; font-size: 20px; margin:0;"
                        >
                            {partner.nm}
                        </p>
                    </div>
                </a>
            {/each}
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

    .Header {
        position: absolute;
        top: 0;
        margin: 10px;
    }

    #aboutDiv {
        z-index: 1;
        transform: translate(-50%, -50%);
        border-bottom-left-radius: 25px;
        border-bottom-right-radius: 25px;
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

        width: 360px;
        height: 600px;
    }

    p {
        font-size: 25px;
        -webkit-text-stroke: 1px black;
        margin: 0;
        margin-top: 15px;
        margin-bottom: 15px;
    }

    a {
        margin: 0;
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

        p {
            font-size: 25px;
        }
    }
</style>
