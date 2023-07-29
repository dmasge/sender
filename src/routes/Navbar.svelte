<script>
    let picSize = 4.5; // Set the desired width here
    import { page } from "$app/stores";
    import logo from "$lib/assets/logo.png";
    $: routeId = $page.route.id;

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
</script>

<head>
    <title>SeeleLand</title>
</head>
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
                    <p class="Header">{title}</p>
                </a>
            {/each}
        </div>
        <div class="centeringDiv">
            <a
                href="https://discord.gg/WWEFykz"
                data-sveltekit-preload-data
                target="_blank"><p class="Header">Discord</p></a
            >
        </div>
    </div>
</nav>

<style>
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
        background-color: #b300ff;
        letter-spacing: 0.06em;
        justify-content: space-between;
        flex-wrap: wrap;
    }

    @media (max-width: 650px) {
        a {
            font-size: 20px;
        }
    }

    /* @media (min-width: 600px) and (max-width: 650px) {
        a {
            font-size: 3vw;
        }
    } */

    @media (min-width: 650px) {
        a {
            font-size: 3vw;
        }
    }

    nav a {
        text-decoration: none;
        flex-direction: row;
        align-items: center;
        letter-spacing: 0.06em;
        color: #7cf7ff;
        padding: 0.5vw;
        padding-left: 1vw;
        padding-right: 1vw;
        line-height: 100%;
    }

    .active,
    nav a:hover {
        background-color: #9600d6;
        margin: 0;
    }
    nav,
    nav a {
        box-sizing: border-box;
    }

    :root {
        --stroke-width: 0.1vw;
    }
    nav a {
        -webkit-text-stroke: 0.1px black;
    }
</style>
