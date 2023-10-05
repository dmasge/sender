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
        font-size: 12px;
        outline: none;
        margin: auto;
    }

    
</style>
