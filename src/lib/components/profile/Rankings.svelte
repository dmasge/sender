<script>
    export let build;
    export let redirect;
    import { getPicForCtgr } from "$lib/leaderboards.js";
    import LbStats from "$lib/components/LbStats.svelte";
    import { charNamesMap } from "$lib/constants.js";
    import { starRailRes, extension } from "$lib/constants.js";
    import { scoringRulesShort } from "$lib/scoringRules.js"

    import RelicSetDisplay from "$lib/components/RelicSetDisplay.svelte";

    $: charname = charNamesMap[build["k"]];
    let picSize = 5;

    function capitalizeAndRemoveUnderscores(str) {
        return str
            .split("_")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
    }
</script>

<div class="stuffOnTheRight" style="overflow: hidden;">
    <div class="container" style="text-align: center;">
        {#if build["lb"]}
            {#if Object.keys(build["lb"]).length == 0}
                <div style="margin:auto;">
                    <img
                        src={starRailRes + "icon/avatar/" + build["k"] + extension}
                        alt={"..."}
                        class="RelicImg avatar"
                    />
                    <p style="margin-top:0; margin-bottom:0; text-align: center;">
                        Equipped lightcone not supported
                    </p>
                </div>
            {/if}
            {#each Object.entries(build["lb"]) as [key, value]}
                <div>
                    {#if build["lbstats"] && build["lbstats"].hasOwnProperty(key)}
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
                        <p>
                            {"Score = " + scoringRulesShort[build['k']]}
                        </p>

                        <a
                            href={redirect ? '../../../' + build['id'] : "./lb/" +
                            charname.toLowerCase() +
                            "/" +
                            key +
                            "/1"}
                        >
                            <div
                                style="display: flex; justify-content: center;"
                            >
                                <img
                                    src={starRailRes +
                                        "icon/character/" +
                                        build["k"] +
                                        extension}
                                    alt={"..."}
                                    class="RelicImg avatar"
                                />
                                <img
                                    src={getPicForCtgr(key)}
                                    alt={"..."}
                                    class="RelicImg"
                                    style="margin-top: 1px;"
                                />
                            </div>
                        </a>
                        
                        <LbStats lbStats={build["lbstats"][key]} header={key} />
                        
                        <RelicSetDisplay relicSets={build['rs']} />
                    {/if}
                </div>
            {/each}
        {:else}
            <div style="margin:auto;">
                <img
                    src={starRailRes + "icon/avatar/" + build["k"] + extension}
                    alt={"..."}
                    class="RelicImg avatar"
                />
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
        width: 60px;
        height: 60px;
        margin-bottom: -5px;
    }

    .avatar {
        border-radius: 25%;
        scale: 0.9;
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
        
    }
</style>
