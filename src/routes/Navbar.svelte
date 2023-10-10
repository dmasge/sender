<script>
    let picSize = 4.5; // Set the desired width here
    import { page } from "$app/stores";
    import logo from "$lib/assets/logo_compressed_180x180.png";
    import { fade } from "svelte/transition";
    $: routeId = $page.route.id;

    import { onMount } from "svelte";

    let isSmallScreen = false;

    onMount(() => {
        if (window.innerWidth < 850) {
            isSmallScreen = true;
        }

        window.addEventListener("resize", () => {
            if (window.innerWidth < 850) {
                isSmallScreen = true;
            } else {
                isSmallScreen = false;
            }
        });
    });

    const navs = [
        {
            title: "Leaderboards",
            href: "/leaderboards",
        },
        {
            title: "Armadas",
            href: "/armadas",
        },
        {
            title: "About",
            href: "/about",
        },
    ];

    let isOpen = false;
</script>

{#if isSmallScreen}
    <button
        style="position: absolute;
    right: 0;
    z-index: 10001;
    border: none;
    padding:2px;"
        on:click={() => (isOpen = !isOpen)}
    >
        <span class="hamburger-icon">{isOpen ? "✖" : "☰"}</span>
    </button>

    <div>
        <nav>
            <div class="navParentDiv">
                <div
                    style="display: flex; margin:auto; text-align: center; justify-content: center; padding-top:6.5px;"
                >
                    <a
                        class:active={routeId == "/"}
                        href="/"
                        data-sveltekit-preload-data
                        style="display:flex; "
                    >
                        <div
                            style=""
                        >
                            <img
                                src={logo}
                                alt="Home"
                                style=" width : 40px; height : 40px; padding-top:0.4vw; transform: scaleX(-1);"
                            />
                        </div>
                        <p class="Header">SeeleLand</p>
                    </a>
                </div>
            </div>
        </nav>
    </div>
    {#if isOpen}
        <nav transition:fade class="menu">
            <div>
                <div
                    style="display: flex; margin:auto; text-align: center; justify-content: center; padding:7px;"
                >
                    <a
                        on:click={() => (isOpen = false)}
                        class:active={routeId == "/"}
                        href="/"
                        data-sveltekit-preload-data
                        style="display:flex; "
                    >
                        <div
                            style=""
                        >
                            <img
                                src={logo}
                                alt="Home"
                                style=" width : 40px; height : 40px; padding-top:0.4vw; transform: scaleX(-1);"
                            />
                        </div>
                        <p class="Header">SeeleLand</p>
                    </a>
                </div>
                {#each navs as { title, href }}
                    <div
                        style="display: flex; margin:auto; text-align: center; justify-content: center;"
                    >
                        <a
                            on:click={() => (isOpen = false)}
                            {href}
                            class:active={routeId.includes(href)}
                            data-sveltekit-preload-data
                        >
                            <p class="Header">{title}</p>
                        </a>
                    </div>
                {/each}
                <div
                    style="display: flex; margin:auto; text-align: center; justify-content: center;"
                >
                    <a
                        on:click={() => (isOpen = false)}
                        href="https://discord.gg/WWEFykz"
                        data-sveltekit-preload-data
                        target="_blank"
                    >
                        <p class="Header">Discord</p>
                    </a>
                </div>
            </div>
        </nav>
    {/if}
{:else}
    <nav>
        <div class="navParentDiv">
            <div>
                <a
                    class:active={routeId == "/"}
                    href="/"
                    data-sveltekit-preload-data
                    style="display:flex; "
                >
                    <div
                        style="margin-top:-{picSize}vw; margin-bottom:-{picSize}vw;"
                    >
                        <img
                            src={logo}
                            alt="Home"
                            style=" width : {picSize}vw; height : {picSize}vw; padding-top:0.4vw; transform: scaleX(-1);"
                        />
                    </div>
                    <p class="Header">SeeleLand</p>
                </a>
            </div>
            <div class="centeringDiv">
                {#each navs as { title, href }}
                    <a
                        {href}
                        class:active={routeId.includes(href)}
                        data-sveltekit-preload-data
                    >
                        <div class="centeringDiv">
                            <p class="Header">{title}</p>
                        </div>
                    </a>
                {/each}
            </div>
            <div class="centeringDiv">
                <a
                    href="https://discord.gg/WWEFykz"
                    data-sveltekit-preload-data
                    target="_blank"
                >
                    <div class="centeringDiv">
                        <p class="Header">Discord</p>
                    </div>
                </a>
            </div>
        </div>
    </nav>
{/if}

<head>
    <title>SeeleLand</title>
</head>

<style>
    .hamburger-icon {
        font-size: 25px;
        padding: 7px;
        cursor: pointer;
    }

    .menu {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        position: absolute;
        top: 0;
        background-color: #171021;
        z-index: 10000;
        width: 100%;
    }

    img {
        min-width: 30px;
        min-height: 30px;
    }
    .centeringDiv {
        display: flex;
        align-items: center;
        margin: 0;
        height: 100%;
        flex-wrap: wrap;
    }

    .navParentDiv {
        display: flex;
        align-items: center;
        letter-spacing: 0.06em;
        justify-content: space-between;
        flex-wrap: wrap;
    }
    .active,
    nav a:hover {
        background-color: #2b204157;
        margin: 0;
    }

    @media (max-width: 850px) {
        a {
            font-size: 20px;
            height: 35px;
        }
    }

    @media (min-width: 850px) {
        a {
            font-size: 3vw;
        }
    }

    nav a {
        text-decoration: none;
        flex-direction: row;
        align-items: center;
        letter-spacing: 0.06em;
        padding: 0.5vw;
        padding-left: 1vw;
        padding-right: 1vw;
        line-height: 100%;
    }

    nav,
    nav a {
        box-sizing: border-box;
    }

    :root {
        --stroke-width: 0.1vw;
    }
</style>
