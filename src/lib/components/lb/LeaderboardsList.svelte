<script>
    import { leaderboards } from "$lib/leaderboards.js";
    import veligif from "$lib/assets/seele-honkai-impact.gif";
    let picSize = 6;
    export let searchTerm = "";
    export let isOnLeaderboard = false;
</script>


<div>
    {#each leaderboards as leaderboard}
        {#if leaderboard["title"]
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) || leaderboard["charId"]
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) || searchTerm == ""}
            <div style="display:flex;">
                <div style="text-align: center; width:100%; margin: auto; ">
                    <div>
                        <div
                            style="overflow-x: auto; overflow-y: hidden; white-space: nowrap; text-align: center; position:relative; "
                        >
                            {#if leaderboard["title"] != "Achievements"}
                                <img
                                    style=""
                                    class="image_preview_container"
                                    src={"https://api.hakush.in/hsr/UI/avatardrawcard/" +
                                        leaderboard["charId"] +
                                        ".webp"}
                                    alt="Home"
                                />
                            {/if}
                            <div
                                style="display: flex; flex-direction: column; justify-content: flex-end;"
                            >
                                <div
                                    style="background-color: #000000A0; padding-top: 10px;"
                                >
                                    {#each leaderboard["info"] as info}
                                        <div style="display: inline-block;">
                                            <a
                                                href={!isOnLeaderboard
                                                    ? "leaderboards/lb" +
                                                      info["url"]
                                                    : "../../../../leaderboards/lb" +
                                                      info["url"]}
                                            >
                                                <div>
                                                    <img
                                                        class="lc-image"
                                                        src={info["pic"]}
                                                        alt="Home"
                                                        style="background: transparent;"
                                                    />
                                                    <p class="desc">
                                                        {info["desc"]}
                                                    </p>
                                                </div>
                                            </a>
                                        </div>
                                    {/each}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        {/if}
    {/each}
    {#if !isOnLeaderboard}
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
                <div class="Header">More Leaderboards coming soon!</div>
            </div>
        </div>
    {/if}
</div>

<style>
    .image_preview_container {
        width: 340px;
        height: 340px;
        margin-left: -50px;
        margin-right: -50px;
        margin-bottom: -120px;
        margin-top: -25px;
    }
    .Header {
        font-size: 20px;
        color: rgb(255, 255, 255);
    }
    a {
        text-decoration: none;
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
    .desc {
        font-size: 1vw;
        margin-top: -7px;
    }

    .lc-image {
        width: 62px;
        height: 62px;
    }

    @media (max-width: 850px) {
        .lc-image {
            width: 48px;
            height: 48px;
        }
        div {
            font-size: 14px;
        }
        p {
            font-size: 20px;
        }
        .desc {
            font-size: 12px;
        }
    }
</style>
