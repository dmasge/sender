<script>
    export let relicSets;
    import { starRailRes } from "$lib/constants.js";

    function filterJSON(input) {
        let output = [];
        let names = {};
        for (let i = 0; i < input.length; i++) {
            let item = input[i];
            if (names[item.nm] === undefined) {
                names[item.nm] = item;
            } else if (item.cnt > names[item.nm].cnt) {
                names[item.nm] = item;
            }
        }
        for (let key in names) {
            output.push(names[key]);
        }
        return output;
    }

    $: filteredSets = filterJSON(relicSets);
</script>

<div>
    {#each filteredSets as relicSet}
        <div style="display: flex; justify-content: center;">
            <p class="statsP">{relicSet["cnt"]}</p>
            <img
                src={starRailRes + relicSet["icn"]}
                alt={"..."}
                class="RelicImg"
            />
            <p class="statsP">{relicSet["nm"]}</p>
        </div>
    {/each}
</div>


<style>
    p {
        margin: 0;
    }
    .statsP {
        font-family: Arial, sans-serif;
        font-size: 1.1vw;
        text-shadow: none;
        justify-content: space-between;
        display: flex;
    }
    .RelicImg {
        height: 2vw;
        width: 2vw;
        margin: -1px;
    }
    @media (max-width: 850px) {
        .RelicImg {
            width: 18px;
            height: 18px;
        }
        .statsP {
            font-size: 10px;
        }
    }
</style>
