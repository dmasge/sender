<script>
    import { leaderboards } from "$lib/leaderboards.js";
    import veligif from "$lib/assets/seele-honkai-impact.gif";
    let picSize = 6;
</script>

<div>
    {#each leaderboards as leaderboard}
        <div style="display:flex;">
            <div
                style="text-align: center;  width: 75vw; margin: auto; margin-bottom: 0vw; overflow-x: auto;"
            >
                <p>
                    {leaderboard["title"]}
                </p>
                <div
                    style="display:flex; margin:auto; display: flex;
                justify-content: center;
                align-items: center;"
                >
                    {#each leaderboard["info"] as info}
                        <a href={"leaderboards/lb" + info["url"]}>
                            <div>
                                <img
                                    src={info["pic"]}
                                    alt="Home"
                                    style="background: transparent; width : {picSize}vw; height : {picSize}vw;"
                                />
                                <p>{info["desc"]}</p>
                            </div>
                        </a>
                    {/each}
                </div>
                <hr />
            </div>
        </div>
    {/each}
    <div
        style="text-align: center;  width: 75vw; margin: auto; margin-bottom: 0vw; overflow-x: auto;"
    >
        <div style="height: fit-content; padding:10px;">
            <img
                id="veliGif"
                src={veligif}
                alt="Home"
                style="background: transparent; width : {1.5 *
                    picSize}vw; height : {1.5 *
                    picSize *
                    1.14}vw; margin-left:-2vw;"
            />
            <div class = "Header" style="color:white; ">More Leaderboards coming soon!</div>
        </div>
    </div>
</div>

<style>
    .Header{
        font-size: 1.4vw;
    }
    a {
        text-decoration: none;
        text-shadow: none;
        color: #7cf7ff;
    }
    img {
        min-width: 45px;
        min-height: 45px;
    }
    #veliGif {
        min-width: 70px;
        min-height: 80px;
    }
    p {
        font-size: 1.5vw;
        margin: 0;
    }

    @media (max-width: 850px) {
        div {
            font-size: 14px;
        }
        p{
            font-size: 18px;
        }
        .Header{
        font-size: 14px;
    }
    }
</style>
