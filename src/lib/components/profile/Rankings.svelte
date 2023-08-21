<script>
    export let build;
    import { getPicForCtgr } from "$lib/leaderboards.js";
    import LbStats from "$lib/components/LbStats.svelte";
    import { charNamesMap } from "$lib/constants.js";

    $: charname = charNamesMap[build["k"]];
    let picSize = 5;

    function capitalizeAndRemoveUnderscores(str) {
        return str
            .split("_")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
    }
</script>

<div class="stuffOnTheRight" style="overflow: hidden; margin-top:-5px;">
    <div class="container" style="text-align: center;">
        {#if build["lb"]}
            {#if Object.keys(build["lb"]).length == 0}
                <p>"{build["lc"]["nm"]}" is not supported at the moment.</p>
            {/if}
            {#each Object.entries(build["lb"]) as [key, value]}
                <div>
                    {#if build["lbstats"] && build["lbstats"].hasOwnProperty(key)}
                        <a
                            href={"./lb/" +
                                charname.toLowerCase() +
                                "/" +
                                key +
                                "/1"}
                        >
                            <img
                                src={getPicForCtgr(key)}
                                alt={"..."}
                                class="RelicImg"
                            />
                        </a>
                        <p>
                            {"Rank: " +
                                value["rank"] +
                                " (" +
                                value["percrank"] +
                                ")"}
                        </p>
                        <p>
                            {"Score: " +
                                value["sc"] +
                                " (" +
                                capitalizeAndRemoveUnderscores(key) +
                                ")"}
                        </p>

                        <LbStats lbStats={build["lbstats"][key]} header={key} />
                    {/if}
                </div>
            {/each}
        {:else}
            <div style="margin:auto;">
                <p style="margin-top:0; margin-bottom:0; text-align: center;">
                    leaderboards for this character coming soon!
                </p>
            </div>
        {/if}
        
    </div>
</div>

<style>
    .container {
        display: flex;
        overflow-x: auto;
        max-width: 100%;
        justify-content: center;
    }
    img {
        width: 5vw;
        height: 5vw;
        margin-bottom: -5px;
    }

    .stuffOnTheRight {
        margin-left: 3vw;
        margin-right: 5vw;
        width: fit-content;
        margin: auto;
        margin-top: 5px;
    }

    p {
        margin: 3px;
    }
    @media (max-width: 850px) {
        p {
            font-size: 11px;
        }
        img {
            width: 50px;
            height: 50px;
        }
    }
</style>
