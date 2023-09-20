<script>
    export let relicSets;
    import { getRelicUrl } from "$lib/iconUrls/avatarIconsUrl.js";
      
    function filterJSON(input) {
        let output = [];
        let names = {};
        for (let i = 0; i < input.length; i++) {
            let item = input[i];
            if (names[item.id] === undefined) {
                names[item.id] = item;
            } else if (item.cnt > names[item.id].cnt) {
                names[item.id] = item;
            }
        }
        for (let key in names) {
            output.push(names[key]);
        }
        return output;
    }
    function isListOfLists(obj) {
        if (!Array.isArray(obj)) {
            return false;
        }
        for (let i = 0; i < obj.length; i++) {
            if (!Array.isArray(obj[i])) {
                return false;
            }
        }
        return true;
    }
    function convertToAncientFormat(relicSets){
        let output = relicSets;
        if (isListOfLists(relicSets)) {
            output = [];
            for (let i = 0; i < relicSets.length; i++) {
                output.push({'id' : relicSets[i][0], 'cnt' : relicSets[i][1]});
            }
        }
        return output;
    }

    $: filteredSets = filterJSON(convertToAncientFormat(relicSets));
</script>

<div id="parentDiv">
    {#each filteredSets as relicSet}
        <div style="display: flex; justify-content: center; margin: 1px;">
            
            <img
                
                src={getRelicUrl(relicSet["id"])}
                alt={"..."}
                class="RelicImg"
            />
            <p class="statsP">{relicSet["cnt"]}</p>
        </div>
    {/each}
</div>

<style>
    #parentDiv {
        height: fit-content;
        margin-bottom: 5px;
        display: flex;
        justify-content: center;
    }
    p {
        margin: 1px;
    }
    .statsP {
        font-family: Arial, sans-serif;
        text-shadow: none;
        justify-content: space-between;
        padding-top: 20px;
        margin-left: -4px;
        margin-top: -2px;
        display: flex;
    }
    .RelicImg {
        height: 30px;
        width: 30px;
        margin-bottom: 0px;
    }
    @media (max-width: 850px) {
       
    }
</style>
