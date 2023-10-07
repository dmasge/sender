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
        justify-content: center;
    }
    .IndividualProfileDiv {
        padding: 7px;
        margin: 3px;
        display: flex;
        border: 1px solid rgb(133, 86, 0);
        border-radius: 10px;
        align-items: center;
        background-color: rgba(32, 22, 45, 0.503);
        font-size: 12px;
        padding-right: 12px;
    }
    .DeleteButton {
        background-color: transparent;
        border: none;
        font-size: 13px;
        margin: 3px;
        padding: 0;
    }
    .ProfileButton {    
        background-color: transparent;
        border: none;
        font-size: 13px;
        margin: 3px;
        padding: 0;
    }
</style>
