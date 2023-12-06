<script>
    import { onMount } from "svelte";
    import {
        isRelicLocked,
        toogleRelicLock,
        relicsDbLockWriteable,
    } from "$lib/cache/relicsDbLock.js";
    import { removeRelicFromDb } from "$lib/cache/relicsDb.js";
    let locked = false;
    onMount(() => {
        locked = isRelicLocked(uid, key);
    });
    import InventoryRelic from "$lib/components/relics/inventoryRelic.svelte";

    export let relic;
    export let key;
    export let uid;

    function toggleLock(uid, key) {
        locked = toogleRelicLock(uid, key);
    }

    relicsDbLockWriteable.subscribe(() => {
        locked = isRelicLocked(uid, key);
    });
    function RemoveRelicClicked(uid, key) {
        let isUserSure = confirm("Are you sure you want to remove this relic?");
        if (isUserSure) {
            removeRelicFromDb(uid, key);
        } else {
            // Don't perform the operation
        }
    }
</script>

<div
    class="parentDiv"
    style="border: {locked
        ? '5px solid rgb(99, 0, 0)'
        : '5px solid rgb(23, 0, 52)'}"
>
    <div
        style="display: flex; justify-content: space-between;align-items: center;"
    >
        <p class="rvP" style="padding: 0 ; margin:1px;">{relic["rv"]}</p>
        <button
            style="font-size: 14px; width:35px; height:35px;"
            on:click={() => toggleLock(uid, key)}
        >
            {#if locked == true}
                🔐
            {:else}
                🔓
            {/if}
        </button>
    </div>
    <InventoryRelic {relic} />
    <div style="text-align: right; padding-top:3px;">
        <button
            on:click={RemoveRelicClicked(uid, key)}>❌</button
        >
    </div>
</div>

<style>
    .parentDiv {
        background-color: rgba(30, 0, 70, 0.7);
        padding: 6px;
        margin: 2px;
        /* border: 5px solid rgb(23, 0, 52); */
        border: 5px solid rgb(0, 99, 45);
        height: min-content;
        width: min-content;
    }
    .rvP {
        /* color: rgb(130, 130, 255); */
        color: rgb(169, 169, 255);
        font-size: 13px;
    }
</style>
