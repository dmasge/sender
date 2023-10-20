<script>
    import { onMount } from "svelte";
    let showModal = false;
    let imageSrc =
        "https://raw.githubusercontent.com/Sinkira/sinkiresource/main/oyes/breakpoints.webp"; // replace with your image path

    let button;

    onMount(() => {
        window.addEventListener("scroll", () => {
            button.style.position = "fixed";
            button.style.bottom = "0px";
            button.style.left = "0px";
        });
    });
</script>

<button
    style="position: fixed; bottom: 0px; left: 0px; width: 45px; height: 45px;"
    bind:this={button}
    on:click={() => (showModal = true)}
>
    <img
        style="width: auto; height:30px; "
        src="https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/icon/property/IconSpeed.png"
        alt="spd"
    />
</button>

{#if showModal}
    <div
        class="modal"
        role="button"
        on:click={() => (showModal = false)}
        on:keydown={(e) => e.key === "Enter" && (showModal = false)}
        tabindex="0"
    >
        <img src={imageSrc} alt="" />
    </div>
{/if}

<style>
    .modal {
        z-index: 20000;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
    }
    img {
        width: 100%;
        max-width: 500px;
        height: auto;
    }
</style>
