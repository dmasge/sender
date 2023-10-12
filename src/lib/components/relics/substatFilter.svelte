<script>
    import {
        loadSubWeightsInventory,
        saveSubWeightsInventory,
    } from "$lib/cache/subWeightsInventory.js";
    let subNames = ["HP", "ATK", "DEF", "SPD", "CR", "CD", "EHR", "RES", "BR"];

    let arr = loadSubWeightsInventory();
    function handleSliderChange(e) {
        if (e.target === e.currentTarget) {
            e.preventDefault();
        }
        // rest of your function...
    }
</script>

<div>
    <p style="text-align: center; margin:2px;">Weight and sort by Roll Value</p>
    <div
        style="display: flex; text-align: center; justify-content: center; margin:auto; width:100%;"
    >
        {#each subNames as subName, i}
            <div style=" width:38px;">
                <p style="text-align: center; margin-top:2px;">{arr[i]}</p>
                <div style="padding: 12px;" />
                <div style="display: flex; margin-left:-27px;">
                    <div
                        style="transform: rotate(-90deg);"
                        on:touchmove={(e) => handleSliderChange(e)}
                    >
                        <input
                            on:change={saveSubWeightsInventory(arr)}
                            type="range"
                            bind:value={arr[i]}
                            min="0"
                            max="1"
                            step="0.1"
                        />
                    </div>
                </div>
                <div style="height:25px;" />
                <p style="">{subName}</p>
            </div>
        {/each}
    </div>
</div>

<style>
    :root {
        --slider-color: rgb(130, 130, 255);
    }

    p {
        color: var(--slider-color);
    }
    input {
        width: 80px;
        accent-color: var(--slider-color);
        border: none;
    }

    input[type="range"] {
        appearance: none;
        -webkit-appearance: none;
        height: 1px; /* Adjust this to make the line thinner or thicker */
        accent-color: var(--slider-color);

        background-color: var(--slider-color);
    }

    input[type="range"]::-webkit-slider-thumb {
        -webkit-appearance: none;
        background: var(--slider-color); /* Change this to your desired color */
        color: var(--slider-color);
        accent-color: var(--slider-color);
        border: none;
        height: 15px;
        width: 15px;
        border-radius: 20px;
        background: var(--slider-color);
    }

    input[type="range"]::-moz-range-thumb {
        background: var(--slider-color);
        border: none;
        accent-color: var(--slider-color);
        background-color: var(--slider-color);
        color: var(--slider-color);
    }

    input[type="range"]::-moz-range-track {
        /* Track */
        -moz-appearance: none;
        background: var(--slider-color);
        height: 1px;
    }

    input[type="range"]::-ms-thumb {
        background: var(--slider-color); /* Change this to your desired color */
    }
</style>
