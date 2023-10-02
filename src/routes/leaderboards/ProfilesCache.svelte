<script>
    import { recentlyVisitedUID } from "$lib/cache.js";
    import { goto } from "$app/navigation";

    let visits;
    recentlyVisitedUID.subscribe((value) => {
        visits = value;
    });

    function DeleteButtonClicked(key) {
        let visitedProfiles = {};
        let visits = localStorage.getItem("visits");
        let parsedVisits = visits ? JSON.parse(visits) : {};
        visitedProfiles =
            typeof parsedVisits === "object" && parsedVisits !== null
                ? parsedVisits
                : {};
        delete visitedProfiles[key];
        localStorage.setItem("visits", JSON.stringify(visitedProfiles));
        recentlyVisitedUID.update((n) => visitedProfiles);
    }

    function ProfileButtonClicked(key){
        goto("/leaderboards/" + key);
    }
</script>

<div class="ProfileCacheDiv">
    {#each Object.entries(visits) as [key, value]}
        <div class="IndividualProfileDiv">
            <button class="ProfileButton" on:click={ProfileButtonClicked(key)}>
                {value}
            </button>
            <button class="DeleteButton" on:click={DeleteButtonClicked(key)}>
                ❌
            </button>
        </div>
    {/each}
</div>

<style>
    .ProfileCacheDiv {
        display: flex;
        flex-wrap: wrap;
    }
    .IndividualProfileDiv {
        padding: 7px;
        margin: 3px;
        display: flex;
        border: 1px solid #00758af2;
        border-radius: 10px;
        align-items: center;
        background-color: rgba(134, 134, 255, 0.147);
        font-size: 12px;
        padding-right: 12px;
    }
    .DeleteButton {
        border: none;
        font-size: 13px;
        margin: 3px;
        padding: 0;
    }
    .ProfileButton {
        border: none;
        font-size: 13px;
        margin: 3px;
        padding: 0;
    }
</style>
