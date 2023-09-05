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
                <div
                    style="text-align: center;  width: 75vw; margin: auto; margin-bottom: 0vw; "
                >
                    <p>
                        {leaderboard["title"]}
                    </p>
                    <div>
                        <div
                            style="overflow-x: auto; white-space: nowrap; text-align: center;"
                        >
                            {#each leaderboard["info"] as info}
                                <div style="display: inline-block;">
                                    <a href={!isOnLeaderboard ? ("leaderboards/lb" + info["url"]) : ("../../../../leaderboards/lb" + info["url"])}>
                                        <div>
                                            <img
                                                src={info["pic"]}
                                                alt="Home"
                                                style="background: transparent; width : {picSize}vw; height : {picSize}vw;"
                                            />
                                            <p class="desc">{info["desc"]}</p>
                                        </div>
                                    </a>
                                </div>
                            {/each}
                        </div>
                    </div>
                    {#if !isOnLeaderboard}
                    <hr />
                    {/if}
                </div>
            </div>
        {/if}
    {/each}
    {#if searchTerm == ""}
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
    .Header {
        font-size: 1.4vw;
        color: black;
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

    @media (max-width: 850px) {
        div {
            font-size: 14px;
        }
        p {
            font-size: 18px;
        }
        .desc {
            font-size: 10px;
        }
        .Header {
            font-size: 14px;
        }
    }
</style>
