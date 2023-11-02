<script>
    import { onMount } from "svelte";
    onMount(() => {
    });
    import InventoryRelic from "$lib/components/relics/inventoryRelic.svelte";
    export let relic;
</script>

<div class="parentDiv">
    <p class="rvP" style="padding: 0 ; margin:1px;">{relic['rv']}</p>
    <InventoryRelic {relic}></InventoryRelic>
</div>

<style>
    .parentDiv {
        background-color: rgba(30, 0, 70, 0.7);
        padding: 6px;
        margin: 2px;
        border: 5px solid rgb(23, 0, 52);
        height: min-content;
        width: min-content;
    }
    .rvP {
        /* color: rgb(130, 130, 255); */
        color: rgb(169, 169, 255);
        font-size: 13px;
    }
</style>
