<script>
    import { selectedCategoryWriteable } from "$lib/components/buildSuggestions/BuildSuggestions.js";
    import { teamCategoriesCase } from "$lib/components/navigators/TeamFilter.js";
    export let build;
    let isRanked = build["lb"] ? Object.keys(build["lb"]).length > 0 : false;
    let entries;
    if (isRanked) {
        build["lb"] = Object.entries(build["lb"])
            .sort((a, b) => a[1].percraw - b[1].percraw)
            .reduce((obj, [key, val]) => {
                obj[key] = val;
                return obj;
            }, {});
        entries = Object.entries(build["lb"]);
    }
    export let selectedCategory;
    $: selectedCategory = entries && entries[0] ? entries[0][0] : undefined;
    $: updateWriteable(selectedCategory);

    function updateWriteable(selectedCategory) {
        if (selectedCategory != undefined && selectedCategory != "undefined") {
            selectedCategoryWriteable.update(() => selectedCategory);
        }
    }
    let brackets = teamCategoriesCase(build["k"]);
    function getBracketName(ctgrRaw) {
        brackets.sort((a, b) => b.length - a.length);

        for (let bracket of brackets) {
            if (ctgrRaw.includes(bracket)) {
                return bracket;
            }
        }
        return "Solo";
    }
</script>

<div class="parentDiv">
    {#if entries && entries.length > 0}
        {#if entries.length > 1}
            {#each entries as entry (entry[0])}
                <button on:click={() => (selectedCategory = entry[0])}>
                    <div class="buttonDiv">
                        <p>{getBracketName(entry[0])}</p>
                    </div>

                    {#if entry[0] == selectedCategory}
                        <div
                            style="margin:auto; background-color: blueviolet; width: 25px; height: 5px; margin-top:2px;"
                        />
                    {:else}
                        <div
                            style="margin:auto; background-color: transparent; width: 25px; height: 5px; margin-top:2px;"
                        />
                    {/if}
                </button>
            {/each}
        {/if}
    {/if}
</div>

<style>
    button {
        border: none;
        background-color: transparent;
    }
    p {
        margin: 0;
    }
    .parentDiv {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        margin: 0;
        margin-bottom: -7px;
    }
</style>
