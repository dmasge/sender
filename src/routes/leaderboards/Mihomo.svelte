<script>
    let elyDark = "https://raw.githubusercontent.com/Sinkira/sinkiresource/main/mihomo/ElyDark_cropped_99_Quality.webp";
    let mihomoBlack = "https://raw.githubusercontent.com/Sinkira/sinkiresource/main/mihomo/ElysiaRealm_black.webp";
      
    let mihomoFontSize = 1.5;
</script>

<!-- <hr id="mihomoHr" /> -->
<div style="width: 205px; margin:auto; scale:0.7;">
    <a
        id="mihomoA"
        href={"https://discord.gg/uDKkDUCdbX"}
        style="font-size: {mihomoFontSize}vw; display: flex; justify-content: center;"
    >
        <div>
            <div id="mihomoDiv">
                <div class="Header">{"and "}</div>

                <img
                    
                    class="mihomoLogo"
                    src={mihomoBlack}
                    alt="Home"
                    style="background: transparent; "
                />
                <div class="Header">{"MiHoMo"}</div>
            </div>
            <!-- <div
                class="ElyDiv"
                style="height: 99px; width: 244px; box-shadow: 0 0 20px #000000;"
            >
                <img
                    
                    src={elyDark}
                    alt="Elysia"
                    style="scale: 0.3125; margin-left:-270px; margin-right:-270px; margin-top:-110px; width: 250; height: 100"
                />
            </div> -->
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

    /* #mihomoHr {
        border-color: #000000;
        box-shadow: none;
        margin: 0;
    } */

    #mihomoDiv {
        display: flex;
        color: rgb(119, 119, 119);

        font-size: 19px;
        align-items: center;
        justify-content: center;
    }

    .Header {
        font-size: 17px;
        text-shadow: none;
    }

    .mihomoLogo {
        width: 50px;
        height: 50px;
    }

    /* .ElyDiv {
        position: relative;
    }

    .ElyDiv:after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 10px;
        box-shadow: 0px 10px 10px -5px black;
    } */

    @media (max-width: 850px) {
    }
</style>
