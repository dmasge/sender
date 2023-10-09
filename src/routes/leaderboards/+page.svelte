<script>
    import LeaderboardsList from "$lib/components/lb/LeaderboardsList.svelte";

    let searchTerm;
</script>

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
