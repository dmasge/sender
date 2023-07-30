<script>
    export let relics;
    export let relicSets;
    import RelicsBulk from "$lib/components/RelicsBulk.svelte";
    
    import RelicSetDisplay from "$lib/components/RelicSetDisplay.svelte";

    let showBuild = false;
</script>

<button
    class="show-build-button"
    on:click={() => (showBuild = true)}
    style="display: {showBuild ? 'none' : 'block'}"
>
    Show relics
</button>

<div style="display: {showBuild ? 'block' : 'none'}" class="tooglable">
    <RelicSetDisplay {relicSets} ></RelicSetDisplay>
    <RelicsBulk {relics} />
</div>

<button
    class="hide-build-button"
    on:click={() => (showBuild = false)}
    style="display: {showBuild ? 'block' : 'none'}"
>
    Hide relics
</button>

<style>
     .tooglable {
        background-color: rgb(116, 0, 166);
        width: fit-content;
        margin: auto;
        padding: 7px;
        border-radius: 20px;
        box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.2);
        margin-bottom: 5px;
    }
    .show-build-button,
    .hide-build-button {
        background-color: transparent;
        cursor: pointer;
        display: block;
        margin: 0 auto;
        text-align: center;
        font-size: 1vw;
        outline: none;
    }

    @media (max-width: 850px) {
        .show-build-button,
        .hide-build-button {
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
