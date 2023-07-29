<script>
    import elyDark from "$lib/assets/mihomo/ElyDark.png";
    import mihomo from "$lib/assets/mihomo/ElysiaRealm.png";

    import mihomoPink from "$lib/assets/mihomo/ElysiaRealm_pink.png";

    import mihomoBlack from "$lib/assets/mihomo/ElysiaRealm_black.png";

    let mihomoEly = 23;
    let mihomoFontSize = 1.5;
    let mihomoLogoSize = 4;
</script>

<hr id="mihomoHr" />
<div style="width: 205px; margin:auto; scale:0.7;">
    <a
        id="mihomoA"
        href={"https://discord.gg/uDKkDUCdbX"}
        style="font-size: {mihomoFontSize}vw; display: flex; justify-content: center;"
    >
        <div>
            <div id="mihomoDiv">
                <div class="Header">{"Powered By "}</div>

                <img class="mihomoLogo"
                    src={mihomoBlack}
                    alt="Home"
                    style="background: transparent; "
                />
                <div class="Header">{"MiHoMo"}</div>
            </div>
            <div
                style="overflow: hidden; margin-bottom: 1vw; height: 100px; width: 245px; 
        box-shadow: 0 0 40px #000;"
            >
                <img
                    id="elyImg"
                    src={elyDark}
                    alt="Home"
                    style="background: transparent; height : 200px; scale:1.7;"
                />
            </div>
        </div>
    </a>
</div>

<style>
    a {
        text-decoration: none;
        font-family: Arial, sans-serif;
        text-shadow: none;
        color: #7cf7ff;
    }

    #mihomoA {
        color: black;
    }

    #mihomoHr {
        border-color: #000000;
        box-shadow: none;
        margin: 0;
    }

    #mihomoDiv {
        display: flex;
        color: black;
        
        font-size: 19px;
        align-items: center;
        justify-content: center;
    }


    .Header {
        font-size:1vw;
    }
    #elyImg {
        margin-top: 45px;
        margin-left: -50px;
    }

    .mihomoLogo {
        width: 4vw;
        height: 4vw;
    }
    @media (max-width: 850px) {
        
        .Header{
            font-size: 11px;
        }
        .mihomoLogo {
            width: 50px;
            height: 50px;
        }
    }
</style>
