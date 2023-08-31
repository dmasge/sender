<script>
    export let relics;
    export let build;
    import RelicsBulk from "$lib/components/RelicsBulk.svelte";

    import Rankings from "$lib/components/profile/Rankings.svelte";

    let showBuild = false;
</script>

<div class="tooglableParentDiv">
    <Rankings {build} />
    <div style="display: {showBuild ? 'block' : 'none'}">
        <RelicsBulk {relics} />
    </div>
</div>
<button
    class="toggle-build-button"
    on:click={() => (showBuild = !showBuild)}
>
    {showBuild ? 'Hide' : 'Show'} relics
</button>

<style>
    .tooglableParentDiv {
        background-color: #ffe7bb;
        width: fit-content;
        margin: auto;
        padding: 7px;
        border-radius: 20px;
        box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.2);
        margin-bottom: 5px;
    }

    .toggle-build-button {
        background-color: transparent;
        cursor: pointer;
        display: block;
        margin: 0 auto;
        text-align: center;
        font-size: 1vw;
        outline: none;
    }

    @media (max-width: 850px) {
        .toggle-build-button {
            background-color: transparent;
            cursor: pointer;
            display: block;
            margin: 0 auto;
            text-align: center;
            font-size: 12px;
            outline: none;
            width: 100px;
            height: 20px;
        }
    }
</style>
