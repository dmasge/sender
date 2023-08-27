<script>
    export let relicSets;
    import { getRelicUrl } from "$lib/iconUrls/avatarIconsUrl.js";
      
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

<div id="parentDiv">
    {#each filteredSets as relicSet}
        <div style="display: flex; justify-content: center; margin: 1px;">
            <p class="statsP">{relicSet["cnt"]}</p>
            <img
                loading="lazy"
                src={getRelicUrl(relicSet["icn"])}
                alt={"..."}
                class="RelicImg"
            />
            <p class="statsP">{relicSet["nm"]}</p>
        </div>
    {/each}
</div>

<style>
    #parentDiv {
        height: fit-content;
        margin-bottom: 5px;
    }
    p {
        margin: 1px;
    }
    .statsP {
        font-family: Arial, sans-serif;
        font-size: 1.2vw;
        text-shadow: none;
        justify-content: space-between;
        display: flex;
    }
    .RelicImg {
        height: 1.7vw;
        width: 1.7vw;
        margin-bottom: 0px;
    }
    @media (max-width: 850px) {
        .RelicImg {
            width: 18px;
            height: 18px;
        }
        .statsP {
            font-size: 12px;
        }
    }
</style>
