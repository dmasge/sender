<script>
    import { goto, preloadData } from "$app/navigation";
    let swallowtail = "https://raw.githubusercontent.com/Sinkira/sinkiresource/main/assets/swallowtail_compressed_196x307.webp";

    import Bronbike from "$lib/components/Bronbike.svelte";
    import Mihomo from "./Mihomo.svelte";

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
</script>

<div style="text-align: center; color:red;">BETA</div>

<div id="outermost">
    <div
        class="CenteringDiv"
        style="display: flex; margin: 0 auto; justify-content: center;"
    >
        <a href="/leaderboards">
            <img
                loading="lazy"
                src={swallowtail}
                alt="swallowtail"
                style="transform: scaleX(-1);
                     width :60px; height : 94.2px;"
            />
        </a>
        <div style="padding: 1vw; ">
            <p style="margin-bottom: 6px;" class="Header">
                Want to see your ranks?
            </p>
            <div style="display: flex;">
                <label for="uidInput" class="Header" style=" margin-top: 2px;margin-right: 0px;">
                    Enter UID:
                </label>
                <input
                    id = "uidInput"
                    style="width:80px; font-size: 16px;"
                    bind:value={id}
                    on:input={(e) =>
                        (id = e.target.value.replace(/\D/g, "").slice(0, 9))}
                />
                <button
                    on:click={handleClick}
                    disabled={id.toString().length !== 9}
                >
                    <p>Go!</p>
                </button>
            </div>

            <a href="/privacy">Privacy Policy</a>
        </div>
    </div>

    <!-- <CritFaq /> -->
</div>
<hr />
{#if isNavigating}
    <Bronbike />
{:else}
    <slot />
{/if}

<div style="margin:3vw" />
<Mihomo />

<style>
    a {
        margin: 0;
        font-family: Arial, sans-serif;
        text-shadow: none;
    }
    p {
        margin: 0;
    }
    button {
        margin-top: 2px;
        background-color: transparent;
    }

    #outermost {
        margin: auto;
        width: 100%;
        padding-top: 3px;
        justify-content: center;
    }
    @media (max-width: 850px) {
        input {
            height: 17px;
            width: 17px;
            font-size: 10;
        }
        .Header {
            font-size: 14px;
        }
        button {
            height: 20px;
        }
    }
</style>
