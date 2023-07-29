<script>
    import { onMount } from "svelte";
    import { page } from "$app/stores";
    import Profile from "./Profile.svelte";
    $: uid = $page.url.pathname.split("/").pop();
    import RelicsBulk from "$lib/components/RelicsBulk.svelte";
    import AvatarCharId from "./AvatarCharId.svelte";
    import Rankings from "./Rankings.svelte";
    import RelicSetDisplay from "$lib/components/RelicSetDisplay.svelte";

    import Bronbike from "$lib/components/Bronbike.svelte";
    let jsonData;
    let builds = {};
    let sortedBuilds = {};
    async function getPlayer(refresh = false) {
        try {
            console.log("clicked");
            if (refresh) {
                console.log("refreshing");
                jsonData = false;
                await fetch(
                    `https://seeleland.azurewebsites.net/api/upsert_player_data?uid=${uid}`
                );
            }
            let url = `https://seeleland.azurewebsites.net/api/get_player_data?uid=${uid}`;
            let response = await fetch(url);
            jsonData = await response.json();
            builds = jsonData.filter((i) => i["k"] != "p");
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
        <div style="width: 100%; display:flex; justify-content: center;">
            <button
                style="text-shadow: none;"
                name="uid"
                value={uid}
                on:click={() => getPlayer(true)}
                >Profile data outdated? click here</button
            >
        </div>
    </div>
    <hr />
    <div class="buildsStuff">
        {#each sortedBuilds as build}
            <div style="margin-bottom: 50px;">
                <AvatarCharId charId={build["k"]} />
                <RelicSetDisplay relicSets={build["rs"]} />
                <RelicsBulk relics={build["r"]} />
                {#if build["lb"]}
                    <Rankings {build} />
                {:else}
                    <div style="margin:auto;">
                        <p style="margin-top:0; text-align: center;">
                            leaderboards for this character coming soon!
                        </p>
                    </div>
                {/if}
            </div>
        {/each}
    </div>
{/if}

<style>
    .buildsStuff {
        margin: 0;
    }
</style>
