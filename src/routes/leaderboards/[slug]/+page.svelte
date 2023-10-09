<script>
    import { page } from "$app/stores";
    import Profile from "./Profile.svelte";
    $: uid = $page.url.pathname.split("/").pop();

    import RelicsBulkWithToogle from "$lib/components/profile/RelicsBulkWithToogle.svelte";

    import Bronbike from "$lib/components/Bronbike.svelte";
    import RefreshButton from "./RefreshButton.svelte";

    export let data;

    let selectedBuildK = "";
    let jsonData = data.jsonData;
    let builds = jsonData.filter((i) => i["k"] != "p");
    let pl = jsonData.find((i) => i["k"] == "p");
    $: sortedBuilds = [...builds].sort((a, b) => {
        if (a.lb && !b.lb) {
            return -1;
        } else if (!a.lb && b.lb) {
            return 1;
        } else {
            return 0;
        }
    });
    $: prevUnixTimestamp = pl["_ts"];

    import { onMount } from "svelte";
    import { recentlyVisitedUID } from "$lib/cache.js";

    let visitedProfiles = {};

    import { addRelicsToDbFromBuilds } from "$lib/cache/relicsDb.js";
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

    import { deserialize } from "$app/forms";
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
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }

    import OnStatsFaq from "$lib/faq/OnStatsFAQ.svelte";
    import RelicsParent from "$lib/components/relics/RelicsParent.svelte";
    import Roster from "$lib/components/profile/Roster.svelte";
</script>

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
    <OnStatsFaq />
    <div class="buildsStuff">
        {#each sortedBuilds as build}
            {#if selectedBuildK == build["k"]}
                <RelicsBulkWithToogle {build} />
            {/if}
        {/each}
    </div>
    <RelicsParent uid={pl["id"]} />
{/if}

<style>
    .buildsStuff {
        margin: 0;
    }
</style>
