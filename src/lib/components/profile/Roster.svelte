<script>
    import { onMount } from "svelte";
    import { starRailRes, extension } from "$lib/constants.js";
    import { is_using_err_rope } from "$lib/components/calculators/damage_formulas.js";
    export let selectedBuildK;
    export let builds = [];
    let sortedBuilds = [];

    function sortBuilds(builds) {
        // Separate items with 'lb' and without 'lb'
        let withLb = builds.filter(
            (item) => item.lb && Object.keys(item.lb).length > 0
        );
        let withoutLb = builds.filter(
            (item) => !item.lb || Object.keys(item.lb).length === 0
        );

        // Sort items with 'lb' by 'percraw' in ascending order
        withLb.sort((a, b) => {
            let firstKeyA = Object.keys(a.lb)[0];
            let firstKeyB = Object.keys(b.lb)[0];
            return a.lb[firstKeyA].percraw - b.lb[firstKeyB].percraw;
        });
        // Concatenate the arrays
        return [...withLb, ...withoutLb];
    }

    function toKNotationFraction(fractionStr) {
        var nums = fractionStr.split("/");
        var num1 = parseFloat(nums[0]);
        var num2 = parseFloat(nums[1]);
        num1 = num1 < 1000 ? num1.toString() : (num1 / 1000).toFixed(1) + "k";
        num2 = num2 < 1000 ? num2.toString() : (num2 / 1000).toFixed(1) + "k";
        return num1 + " / " + num2;
    }

    function getSPD(str) {
        const match = str.match(/_(\d{3})$/);
        return match ? match[1] : "   -";
    }

    onMount(() => {
        // basically first making sure if build
        // ranked on two categories that we're
        // considering the category where rating is better
        builds = builds.map((build) => {
            if (build.hasOwnProperty("lb")) {
                build["lb"] = Object.entries(build["lb"])
                    .sort((a, b) => a[1].percraw - b[1].percraw)
                    .reduce((obj, [key, val]) => {
                        obj[key] = val;
                        return obj;
                    }, {});
            }
            return build;
        });
        sortedBuilds = sortBuilds(builds);
        if (sortBuilds.length > 0) {
            selectedBuildK = sortedBuilds[0]["k"];
        }
    });
</script>

<hr style="margin: 0;" />
<div class="parentDiv">
    <div class="loopDiv">
        {#each sortedBuilds as build}
            <button on:click={() => (selectedBuildK = build["k"])}>
                <div
                    class="loopItemDiv"
                    style="background-color: {build['k'] == selectedBuildK
                        ? '#382b5457'
                        : 'transparent'};"
                >
                    {#if build.hasOwnProperty("lb") && Object.keys(build["lb"]).length > 0}
                        {@const key = Object.keys(build["lb"])[0]}
                        {@const lbItem = build["lb"][key]}
                        {@const breakpoint = getSPD(key)}

                        <p style="padding: 1px;">
                            {lbItem["percrank"].charAt(0).toUpperCase() +
                                lbItem["percrank"].slice(1)}
                        </p>

                        <p style="padding: 1px;">
                            {toKNotationFraction(lbItem["rank"])}
                        </p>
                    {:else}
                        <p>
                            {@html " "}
                        </p>
                        <p>
                            {@html "-"}
                        </p>
                    {/if}

                    <div
                        style="display: flex; justify-content: center; padding-top:5px;padding-bottom:5px;"
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
                                build["lc"]["id"] +
                                extension}
                            alt={"..."}
                            class="RelicImg"
                            style=""
                        />
                    </div>

                    <div style="display: flex; justify-content: space-between;">
                        <p>
                            {"E" + build["e"] + "S" + build["lc"]["s"]}
                        </p>
                        {#if build.hasOwnProperty("lb") && Object.keys(build["lb"]).length > 0}
                            {@const key = Object.keys(build["lb"])[0]}
                            {@const breakpoint = getSPD(key)}
                            {#if is_using_err_rope(build)}
                                <img
                                    style="width: 14px; height:14px; margin-right:-18px; "
                                    src="https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/icon/property/IconEnergyLimit.png"
                                    alt="spd"
                                />
                            {/if}
                            {#if breakpoint != ""}
                                <div style="display: flex;">
                                    <div
                                        style="display: flex; background-color: rgba(0,0,0,0);"
                                    >
                                        <img
                                            style="width: 14px; height:14px; margin-right:-4px; "
                                            src="https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/icon/property/IconSpeed.png"
                                            alt="spd"
                                        />

                                        <p style=" margin-right:-4px;">{breakpoint}</p>
                                    </div>
                                </div>
                            {/if}
                        {/if}
                    </div>
                    <div
                        style="display: flex;
                    justify-content: center; align-items: center;"
                    >
                        {#if build["k"] == selectedBuildK}
                            <div
                                style="background-color: blueviolet; width: 25px; height: 5px; margin: 5px;"
                            />
                        {/if}
                    </div>
                </div>
            </button>
        {/each}
    </div>
</div>
<hr style="margin: 0;" />

<style>
    button {
        border: none;
    }
    p {
        margin: 0;
    }
    .parentDiv {
        background-color: #000000a0;
        text-align: center;
        display: flex;
        justify-content: center; /* align horizontal */
        align-items: center; /* align vertical */
        height: 145px;
    }
    .loopDiv {
        display: flex;
        overflow-y: hidden;
    }
    .loopItemDiv {
        padding-top: 5px;
        padding-bottom: 5px;
        padding-left: 10px;
        padding-right: 10px;
    }

    img {
        width: 40px;
        height: 40px;
    }

    .loopDiv::-webkit-scrollbar {
        height: 10px;
        /* display: none; */
    }
    /* .avatar {
        width: 60px;
        height: 60px;
        border-radius: 25%;
        scale: 0.9;
    } */
</style>
