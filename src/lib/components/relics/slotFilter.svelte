<script>
    
    import { browser } from "$app/environment";
    let typeToPicDict = {
        1: "https://raw.githubusercontent.com/Sinkira/sinkiresource/main/oyes/relicSlots/IconRelicHead.png",
        2: "https://raw.githubusercontent.com/Sinkira/sinkiresource/main/oyes/relicSlots/IconRelicHands.png",
        3: "https://raw.githubusercontent.com/Sinkira/sinkiresource/main/oyes/relicSlots/IconRelicBody.png",
        4: "https://raw.githubusercontent.com/Sinkira/sinkiresource/main/oyes/relicSlots/IconRelicFoot.png",
        5: "https://raw.githubusercontent.com/Sinkira/sinkiresource/main/oyes/relicSlots/IconRelicNeck.png",
        6: "https://raw.githubusercontent.com/Sinkira/sinkiresource/main/oyes/relicSlots/IconRelicGoods.png",
    };
    import {
        loadrelicSlotTypeFilter,
        saverelicSlotTypeFilter,
    } from "$lib/cache/relicSlotTypeFilter.js";

    let slotFilteredTypes = loadrelicSlotTypeFilter();

    function flipBit(key) {
        slotFilteredTypes[key] = !slotFilteredTypes[key];
        slotFilteredTypes = resetList(slotFilteredTypes);
        saverelicSlotTypeFilter(slotFilteredTypes);
    }
    function resetList(list) {
        if (list.length !== 7) {
            return list;
        }

        for (let i = 0; i < list.length; i++) {
            if (list[i] !== false) {
                return list;
            }
        }

        return [false, true, true, true, true, true, true];
    }
</script>

{#if browser}
    <div
        style="display: flex; margin:auto; justify-content: center; margin-bottom: 5px;"
    >
        {#each Object.entries(typeToPicDict) as [key, val]}
            <div style="padding: 5px;">
                {#if slotFilteredTypes[key]}
                    <button
                        style="padding: 4px; margin:0; border-color: var(--slider-color); background-color: rgba(130, 130, 255, 0.15);"
                        on:click={() => flipBit(key)}
                    >
                        <img src={val} alt="slot" style="width:32px;" />
                    </button>
                {:else}
                    <button
                        style="padding: 4px; margin:0; border-color: transparent"
                        on:click={() => flipBit(key)}
                    >
                        <img src={val} alt="slot" style="width:32px;" />
                    </button>
                {/if}
            </div>
        {/each}
    </div>
{/if}

<style>
</style>
