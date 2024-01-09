<script>
    import LeaderboardsList from "$lib/components/lb/LeaderboardsList.svelte";
    import { onMount } from "svelte";

    let title = "Honkai Star Rail Leaderboard Rankings";
    let description =
        "Rank your Honkai Star Rail builds on character relic leaderboard. Join our Honkai Star Rail Discord server for updates.";
    let keywords =
        "Honkai Star Rail, HSR, build leaderboard, character leaderboard, relic leaderboard, HSR relic leaderboard, HSR build rank, HSR build rating, Honkai Star Rail ranking relic, Honkai Star Rail ranking build, Honkai Star Rail account ranking, Honkai Star Rail discord server";

    onMount(() => {
        document.title = title;
        document
            .querySelector('meta[name="description"]')
            .setAttribute("content", description);
        document
            .querySelector('meta[name="keywords"]')
            .setAttribute("content", keywords);
    });

    let searchTerm;
</script>

<svelte:head>
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta name="keywords" content={keywords} />
</svelte:head>

<div
    style="display:flex; justify-content: center;
align-items: center; margin:auto;"
>
    <div class="uid-div" style="display: flex;">
        <input
            class="uid-input"
            style="width:150px; font-size: 16px;"
            bind:value={searchTerm}
            placeholder="Leaderboard search"
        />
    </div>
</div>
<LeaderboardsList {searchTerm} />

<style>
    .uid-div {
        justify-content: center;
        align-items: center;
        border-radius: 10px;
        background-color: rgba(0, 0, 0, 0.814);
        padding-bottom: 8px;
        padding-top: 8px;
        padding-left: 25px;
        padding-right: 12.5px;
        width: 150px;
        height: 30px;
        margin: 15px;
        box-shadow: 0 0 2px rgba(255, 255, 255, 0.822);
    }
    .uid-input {
        background-color: transparent;
        border: none;
        color: white;
        text-align: center;
        padding-right: 20px;
    }
    .uid-input:focus {
        outline: none; /* Remove default outline */
        caret-color: white;
    }
</style>
