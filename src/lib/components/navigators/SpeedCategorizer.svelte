<script>
    import { page } from "$app/stores";
    let str = $page.url.pathname;

    let splitStr = str.split("/");
    let charId = splitStr[3];
    let ctgr = splitStr[4];

    let speedCategories = speedCategoriesCase(charId);
    function removeSpdPattern(str) {
        return str.replace(/(_+\d{3})+$/, "").replace(/_+$/, "");
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
            case "1208":
                return ["Base", "121", "134", "143", "161", "172", "201"];
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
            <div style="padding-left:10px; padding-right:10px; padding-bottom: 0;">
                <a style="text-align: center;"
                    {href}
                >
                    <p>{speedCategories[i] + " SPD"}</p>
                </a>
                {#if ctgr.includes(speedCategoriesCase(charId)[i]) || ($page.url.pathname.includes(fullctgrRaw + "/") && i == 0)}
                <div style="margin:auto; background-color: blueviolet; width: 25px; height: 5px; margin-top:-7px;">
                </div>
                {/if}
            </div>
        {/each}
    </div>
{/if}

<style>
    a {
        text-decoration: none;
        padding-bottom: 0;
        margin-bottom: 0;
    }
    .parentDiv {
        background-color: #000000a0;
        display: flex;
        margin: auto;
        justify-content: center;
        overflow: hidden;
        padding: 7px;
    }
</style>
