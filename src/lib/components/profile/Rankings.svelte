<script>
    export let build;
    import { selectedCategoryWriteable } from "$lib/components/buildSuggestions/BuildSuggestions.js";
    import ScoringDetails from "$lib/components/profile/ScoringDetails.svelte";

    let isRanked = build["lb"] ? Object.keys(build["lb"]).length > 0 : false;

    export let selectedCategory;
    let index; // start from the first item
    let entries;
    if (isRanked) {
        index = 0; // start from the first item
        build["lb"] = Object.entries(build["lb"])
            .sort((a, b) => a[1].percraw - b[1].percraw)
            .reduce((obj, [key, val]) => {
                obj[key] = val;
                return obj;
            }, {});
        entries = Object.entries(build["lb"]);
    }

    $: selectedCategory =
        entries && entries[index] ? entries[index][0] : undefined;
    $: updateWriteable(selectedCategory);

    function updateWriteable(selectedCategory) {
        if (selectedCategory != undefined && selectedCategory != "undefined") {
            selectedCategoryWriteable.update(() => selectedCategory);
        }
    }
    
    import LbRankDisplay from "$lib/components/profile/LbRankDisplay.svelte";

    import { isBuildNewFormat } from "$lib/components/profile/temp.js";
</script>

<div class="container" style="text-align: center; overflow: hidden;">
    {#if isRanked}
        <div>
            {#if entries && entries.length > 0}
                <div style="display: flex;">
                    {#if entries.length > 1}
                        <button
                            on:click={() =>
                                (index =
                                    (index - 1 + entries.length) %
                                    entries.length)}>{"⇦"}</button
                        >
                    {/if}

                    {#if isBuildNewFormat(build)}
                        <LbRankDisplay {build} key={selectedCategory} />
                    {:else}
                        <ScoringDetails {build} key={entries[index][0]} />
                    {/if}

                    {#if entries.length > 1}
                        <button
                            on:click={() =>
                                (index = (index + 1) % entries.length)}
                            >{"⇨"}</button
                        >
                    {/if}
                </div>
            {/if}
        </div>
    {:else if !build.hasOwnProperty("lb")}
        <div style="margin:auto;">
            <p style="margin-top:0; margin-bottom:0; text-align: center;">
                leaderboards for this character coming soon!
            </p>
        </div>
    {:else}
        <div style="margin:auto;">
            {#if isBuildNewFormat(build)}
                <LbRankDisplay {build} key={selectedCategory} />
            {/if}
            <p style="margin-top:0; margin-bottom:0; text-align: center;">
                Equipped lightcone not supported
            </p>
        </div>
    {/if}
</div>

<style>
    .container {
        display: flex;
        overflow-x: auto;
        max-width: 100%;
        justify-content: center;
    }
    p {
        margin: 3px;
    }
    button {
        border-color: transparent;
        font-size: 20px;
        padding: 1px;
    }

    @media (max-width: 850px) {
        p {
            font-size: 11px;
        }
    }
</style>
