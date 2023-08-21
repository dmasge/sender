<script>
    import { onMount } from "svelte";
    import { page } from "$app/stores";
    import Profile from "./Profile.svelte";
    $: uid = $page.url.pathname.split("/").pop();

    import RelicsBulkWithToogle from "$lib/components/profile/RelicsBulkWithToogle.svelte";
    import AvatarCharId from "./AvatarCharId.svelte";

    import Bronbike from "$lib/components/Bronbike.svelte";
    import RefreshButton from "./RefreshButton.svelte";
    let jsonData;
    let builds = {};
    let sortedBuilds = {};
    let prevUnixTimestamp;

    async function refreshPlayer(){
        console.log("refreshing");
        jsonData = false;
        await fetch(
            `https://seeleland.azurewebsites.net/api/upsert_player_data?uid=${uid}`
        );
        getPlayer();
    }

    async function getPlayer() {
        try {
            console.log("loading");
            let url = `https://seeleland.azurewebsites.net/api/get_player_data?uid=${uid}`;
            let response = await fetch(url);
            jsonData = await response.json();
            builds = jsonData.filter((i) => i["k"] != "p");
            let pl = jsonData.find((i) => i["k"] == "p");
            prevUnixTimestamp = pl['_ts'];
            sortedBuilds = [...builds].sort((a, b) => {
                if (a.lb && !b.lb) {
                    return -1;
                } else if (!a.lb && b.lb) {
                    return 1;
                } else {
                    return 0;
                }
            });
        } catch (error) {
            console.log(error);
        }
    }
    onMount(() => {
        getPlayer();
    });
</script>

{#if !jsonData}
    <Bronbike />
{:else}
    <div style="display: flex; justify-content: center;">
        <Profile item={jsonData} />
    </div>
    <div>
        <RefreshButton onClick = {refreshPlayer} {uid} {prevUnixTimestamp}></RefreshButton>
    </div>
    <hr />
    <div class="buildsStuff">
        {#each sortedBuilds as build}
            <div style="margin-bottom: 50px;">
                <AvatarCharId charId={build["k"]} />
                <div class="tooglable" style="margin-bottom:10px;">
                    <RelicsBulkWithToogle {build} relics={build["r"]} relicSets ={build["rs"]}  />
                </div>
                
            </div>
        {/each}
    </div>
{/if}

<style>
    .buildsStuff {
        margin: 0;
    }
   
</style>
