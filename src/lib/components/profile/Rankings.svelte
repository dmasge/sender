<script>
    export let build;
    export let redirect;
    import LbStats from "$lib/components/LbStats.svelte";
    import { starRailRes, extension } from "$lib/constants.js";

    import RelicSetDisplay from "$lib/components/RelicSetDisplay.svelte";
    import ScoringDetails from "./ScoringDetails.svelte";

    
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
                    {#if build["lb"] && build["lb"].hasOwnProperty(key)}
                        <ScoringDetails {build} {key}></ScoringDetails>

                        <a
                            href={redirect ? '../../../' + build['id'] : "./lb/" +
                            build["k"] +
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
                                    src={starRailRes +
                                        "icon/light_cone/" +
                                        build["lc"]['id'] +
                                        extension}
                                    alt={"..."}
                                    class="RelicImg"
                                    style="margin-top: 1px;"
                                />
                            </div>
                        </a>
                        {#if build["lbstats"].hasOwnProperty(key)}
                            <LbStats lbStats={build["lbstats"][key]} header={key} />
                        {:else}
                            <LbStats lbStats={build["lbstats"]} header={key} />
                        {/if}
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
