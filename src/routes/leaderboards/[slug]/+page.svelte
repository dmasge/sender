<script>
    import { browser } from "$app/environment";
    import { page } from "$app/stores";
    import { onMount } from "svelte";
    import { deserialize } from "$app/forms";
    import { addRelicsToDbFromBuilds } from "$lib/cache/relicsDb.js";
    import { recentlyVisitedUID } from "$lib/cache.js";
    import OnStatsFaq from "$lib/faq/OnStatsFAQ.svelte";
    import RelicsParent from "$lib/components/relics/RelicsParent.svelte";
    import Roster from "$lib/components/profile/Roster.svelte";
    import Profile from "./Profile.svelte";
    import RelicsBulkWithToogle from "$lib/components/profile/RelicsBulkWithToogle.svelte";

    import Bronbike from "$lib/components/Bronbike.svelte";
    import RefreshButton from "./RefreshButton.svelte";
    import ProfileToLbButton from "../../../lib/components/profile/ProfileToLbButton.svelte";

    $: uid = $page.url.pathname.split("/").pop();
    export let data;
    let selectedBuildK = "";
    let builds;
    let prevUnixTimestamp;
    let jsonData;
    let pl;
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
</script>

{#if browser}
    {#if !jsonData}
        <Bronbike />
    {:else}
        <div style="display: flex; justify-content: center;">
            <Profile item={jsonData} />
        </div>
        <div>
            <RefreshButton onClick={refreshPlayer} {uid} {prevUnixTimestamp} />
        </div>
        <Roster {builds} bind:selectedBuildK />
        <div class="buildsStuff">
            <ProfileToLbButton />
            {#each builds as build}
                {#if selectedBuildK == build["k"]}
                    <RelicsBulkWithToogle {build} isOnProfilePage={true} />
                {/if}
            {/each}
        </div>
        <RelicsParent uid={pl["id"]} />
    {/if}
{/if}

<style>
    .buildsStuff {
        margin: 0;
    }
</style>
