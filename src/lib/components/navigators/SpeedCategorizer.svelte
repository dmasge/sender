<script>
    import { page } from "$app/stores";
    let str = $page.url.pathname;

    let splitStr = str.split("/");
    let charId = splitStr[3];
    let ctgr = splitStr[4];

    let speedCategories = speedCategoriesCase(charId);
    function removeSpdPattern(str) {
        return str.replace(/(_+\d{3})+$/, '').replace(/_+$/, "");;
    }

    let fullctgrRaw = speedCategories.reduce((ctgr, str) => {
        return ctgr.replace(new RegExp(str, "g"), "");
    }, ctgr);
    let ctgrRaw = removeSpdPattern(fullctgrRaw);

    function GetUrlBases(spdCtgrs) {
        let newList = [];
        let currUrl = removeSpdPattern($page.url.pathname);
        for (let i = 0; i < spdCtgrs.length; i++) {
            if (spdCtgrs[i] === "Base") {
                newList.push("../" + ctgrRaw + "/");
            } else {
                newList.push("../" + ctgrRaw + "_" + spdCtgrs[i] + "/");
            }
        }
        return newList;
    }

    function speedCategoriesCase(str) {
        switch (str) {
            case "1005":
                return ["Base", "134", "151", "161"];
            case "1102":
                return ["Base", "201"];
            case "1107":
                return ["Base", "121", "134"];
            case "1213":
                return ["Base", "121", "134"];
            case "1209":
                return ["Base", "134", "143"];
            default:
                return ["Base", "134"];
        }
    }

    let urls = GetUrlBases(speedCategories);
</script>

{#if speedCategories != []}
    <div class="parentDiv">
        {#each urls as url, i}
            {@const href = url + "1"}
            <a {href} class:active={ctgr.includes(speedCategoriesCase(charId)[i]) 
                || ($page.url.pathname.includes(fullctgrRaw + "/") && i == 0)}>
                <p>{speedCategories[i] + " SPD"}</p>
            </a>
        {/each}
    </div>
{/if}

<style>
    a {
        text-decoration: none;
        margin: 10px;
        margin-top: 3px;
        margin-bottom: 3px;
    }
    .parentDiv {
        background-color: rgba(134, 134, 255, 0.147);
        display: flex;
        margin: auto;
        border: 1px solid black;
        border-radius: 25px;
        width: fit-content;
        padding-left: 1.3vw;
        padding-right: 1.3vw;
        margin-bottom: 10px;
        overflow: hidden;
    }
    .active {
        font-weight: bold;
    }
</style>
