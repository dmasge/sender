<script>
    import { browser } from "$app/environment";
    import { page } from "$app/stores";
    import { onMount } from "svelte";
    import { deserialize } from "$app/forms";
    import { addRelicsToDbFromBuilds } from "$lib/cache/relicsDb.js";
    import { recentlyVisitedUID } from "$lib/cache.js";
    import {
        toogleBuildHidden,
        buildHideToogleWriteable,
        isBuildHidden,
        countHiddenBuilds,
    } from "$lib/cache/buildHideToogle.js";
    import RelicsParent from "$lib/components/relics/RelicsParent.svelte";
    import Roster from "$lib/components/roster/Roster.svelte";
    import Profile from "./Profile.svelte";
    import RelicsBulkWithToogle from "$lib/components/profile/RelicsBulkWithToogle.svelte";

    import Bronbike from "$lib/components/Bronbike.svelte";
    import RefreshButton from "./RefreshButton.svelte";
    import ProfileToLbButton from "../../../lib/components/profile/ProfileToLbButton.svelte";
    import BuildSuggestions from "../../../lib/components/buildSuggestions/BuildSuggestions.svelte";

    $: uid = $page.url.pathname.split("/").pop();
    export let data;
    let selectedBuildK = "";
    let builds;
    let prevUnixTimestamp;
    let jsonData;
    let pl;
    let showAllBuildschecked = false;
    let screenWidth;

    onMount(() => {});
    if (browser) {
        jsonData = data.jsonData;
        builds = jsonData.filter((i) => i["k"] != "p");
        pl = jsonData.find((i) => i["k"] == "p");
        prevUnixTimestamp = pl["_ts"];

        let visitedProfiles = {};

        onMount(() => {
            if (typeof window !== "undefined") {
                let visits = localStorage.getItem("visits");
                let parsedVisits = visits ? JSON.parse(visits) : {};
                visitedProfiles =
                    typeof parsedVisits === "object" && parsedVisits !== null
                        ? parsedVisits
                        : {};
                visitedProfiles[pl["id"]] = pl["nm"];
                localStorage.setItem("visits", JSON.stringify(visitedProfiles));
                recentlyVisitedUID.update((n) => visitedProfiles);
                addRelicsToDbFromBuilds(pl["id"], builds);

                screenWidth = window.innerWidth;
            }
        });
    }
    async function refreshPlayer(event) {
        event.preventDefault();
        jsonData = false;
        var form = document.getElementById("myForm");
        var formData = new FormData(form);
        fetch(form.action, {
            method: "POST",
            body: formData,
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.text(); // need to use `.text()`
            })
            .then((data) => {
                jsonData = deserialize(data)["data"];
                builds = jsonData.filter((i) => i["k"] != "p");
                addRelicsToDbFromBuilds(pl["id"], builds);
                pl = jsonData.find((i) => i["k"] == "p");
                prevUnixTimestamp = pl["_ts"];
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }

    let buildHighlightsChanged;
    buildHideToogleWriteable.subscribe((value) => {
        buildHighlightsChanged = value;
    });
</script>

{#if browser}
    {#key buildHighlightsChanged}
        {#if !jsonData}
            <Bronbike />
        {:else}
            <div style="display: flex; justify-content: center;">
                <Profile item={jsonData} />
            </div>
            <div>
                <RefreshButton
                    onClick={refreshPlayer}
                    {uid}
                    {prevUnixTimestamp}
                />
            </div>
            <div class="checkbox-container">
                <p style="font-size: 14px;">{"Show hidden builds (" + countHiddenBuilds(builds) + ") "}</p>
                <input
                    type="checkbox"
                    style="scale: 1.5;"
                    bind:checked={showAllBuildschecked}
                />
            </div>
            {#if builds.length > 0}
                <Roster {showAllBuildschecked} {builds} bind:selectedBuildK />
                <div
                    style="display: flex; margin:auto; justify-content: space-between;"
                >
                    {#if screenWidth >= 650}
                        <!-- possible ad -->
                    {/if}
                    <div class="buildsStuff">
                        <ProfileToLbButton />

                        {#each builds as build}
                            {#if selectedBuildK == build["k"]}
                                <BuildSuggestions
                                    uid={pl["id"]}
                                    build={builds.find(
                                        (i) => i["k"] == selectedBuildK,
                                    )}
                                />
                                <RelicsBulkWithToogle
                                    {build}
                                    isOnProfilePage={true}
                                />
                                <div style="display: flex; flex-direction: column; align-items: center;">
                                    <button
                                        on:click={() =>
                                            toogleBuildHidden(build)}
                                    >
                                        {isBuildHidden(build)
                                            ? "Unhide build"
                                            : "Hide build"}
                                    </button>
                                </div>
                                
                            {/if}
                        {/each}
                    </div>

                    {#if screenWidth >= 650}
                        <!-- possible ad -->
                    {/if}
                </div>
                {#if screenWidth <= 650}
                    <!-- possible ad -->
                {/if}
                <RelicsParent uid={pl["id"]} />
            {/if}
        {/if}
    {/key}
{/if}

<style>
    .buildsStuff {
        margin: auto;
    }
    .checkbox-container {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        margin-top: -10px;
    }
</style>
