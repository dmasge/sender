<script>
    
    import RelicsBulkWithToogle from "$lib/components/profile/RelicsBulkWithToogle.svelte";
    export let build;
    let showBuild = false;
</script>

<button
    class="show-build-button"
    on:click={() => (showBuild = true)}
    style="display: {showBuild ? 'none' : 'block'}"
>
    Show stats
</button>

<div class="tooglable" style="display: {showBuild ? 'block' : 'none'}">
    <RelicsBulkWithToogle {build} expanded={true} ></RelicsBulkWithToogle>
</div>

<button
    class="hide-build-button"
    on:click={() => (showBuild = false)}
    style="display: {showBuild ? 'block' : 'none'}"
>
    Hide stats
</button>

<style>
    
   

    .show-build-button,
    .hide-build-button {
        display: block;
        text-align: center;
        font-size: 1vw;
        outline: none;
        margin: auto;
        margin-top: 5px;
        margin-bottom: 7px;
    }

    @media (max-width: 850px) {
        .show-build-button,
        .hide-build-button {
            font-size: 12px;
            outline: none;
            width: 100px;
            height: 20px;
        }
    }
</style>
