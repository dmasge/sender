<script>
    import { goto, preloadData } from "$app/navigation";
    let swallowtail =
        "https://raw.githubusercontent.com/Sinkira/sinkiresource/main/assets/swallowtail_compressed_196x307.webp";

    import Bronbike from "$lib/components/Bronbike.svelte";
    import Mihomo from "./Mihomo.svelte";
    import Enka from "./Enka.svelte";

    let id = "";
    let newURL = "";
    function handleClick() {
        newURL = "/leaderboards/" + id;
        goto(newURL);
        id = "";
    }

    import { navigating } from "$app/stores";

    let isNavigating = false;

    const unsubscribe = navigating.subscribe(($navigating) => {
        if ($navigating) {
            // Navigation has started
            isNavigating = true;
        } else {
            // Navigation has completed
            isNavigating = false;
        }
    });

    import { onMount } from "svelte";
    import ProfilesCache from "./ProfilesCache.svelte";
    let message = "BETA";

    import { loadSubHighlights } from "$lib/cache/subHighlights.js";
    onMount(async () => {
        try {
            message = await fetch(
                "https://raw.githubusercontent.com/Sinkira/sinkiresource/main/message.txt"
            ).then((res) => res.text());
        } catch (error) {
            message = "BETA";
        }

        if (typeof window !== "undefined") {
            let visits = localStorage.getItem("visits");
            let parsedVisits = visits ? JSON.parse(visits) : {};
            visitedProfiles =
                typeof parsedVisits === "object" && parsedVisits !== null
                    ? parsedVisits
                    : {};
            recentlyVisitedUID.update((n) => visitedProfiles);
        }
        loadSubHighlights();
    });

    import { recentlyVisitedUID } from "$lib/cache.js";

    let visitedProfiles = {};
</script>

<div style="text-align: center; color:red;">{message}</div>

<div id="outermost">
    <a href="/leaderboards">
        <img
            src={swallowtail}
            alt="swallowtail"
            style="transform: scaleX(-1);
                     width :60px; height : 94.2px;"
        />
    </a>
    <div class="uid-div" style="display: flex;">
        <input
            class="uid-input"
            style="width:100px; font-size: 16px;"
            bind:value={id}
            on:input={(e) =>
                (id = e.target.value.replace(/\D/g, "").slice(0, 9))}
            placeholder="Enter UID..."
        />
        <button
            class="uid-button"
            on:click={handleClick}
            disabled={id.toString().length !== 9}
        >
            <p style="font-size: 25px; margin:0;">{">"}</p>
        </button>
    </div>
</div>

<ProfilesCache />
{#if isNavigating}
    <Bronbike />
{:else}
    <slot />
{/if}

<div style="background-color: rgba(255, 255, 255, 0.15); width: 100%;">
    <Enka />

    <Mihomo />

    <div style="text-align: center; padding-bottom:20px; ">
        <a style="color: gray;" href="/privacy">Privacy Policy</a>
    </div>
</div>

<style>
    .uid-div {
        border-radius: 10px;
        background-color: rgba(0, 0, 0, 0.814);
        padding-bottom: 8px;
        padding-top: 8px;
        padding-left: 25px;
        padding-right: 12.5px;
        width: 140px;
        height: 30px;
        margin: 15px;
        box-shadow: 0 0 5px rgba(122, 125, 255, 0.822);
    }
    .uid-input {
        background-color: transparent;
        border: none;
        color: white;
        text-align: center;
        padding-right: 10px;
    }
    .uid-button {
        background-color: transparent;
        border: none;
        padding: 0;
        margin: 0;
        padding-right: 10px;
        padding-left: 5px;
    }
    .uid-input:focus {
        outline: none; /* Remove default outline */
        caret-color: white;
    }

    a {
        margin: 0;
        font-family: Arial, sans-serif;
        text-shadow: none;
        color: black;
        margin: auto;
    }

    #outermost {
        margin: auto;
        width: min-content;
        padding-top: 3px;
        justify-content: center;
        display: flex;
        align-items: center;
    }
</style>
