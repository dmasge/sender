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
                if (ctgr.includes("E1S1") && ctgr.includes("GNF")) {
                    return ["Base", "134", "143", "161", "172", "201"];
                } else if (ctgr.includes("E1S5") && ctgr.includes("GNF")) {
                    return ["Base", "143", "161", "172", "201"];
                } else if (
                    ctgr.includes("E1S5") ||
                    ctgr.includes("E0S1_23006HUOGNF")
                ) {
                    return ["Base", "134", "143", "161", "172", "201"];
                }
                return ["Base", "121", "134", "143", "161", "172", "201"];
            case "1102":
                if (ctgr.includes("E0") || ctgr.includes("E1")) {
                    return ["Base", "161", "172", "201"];
                } else {
                    return ["Base", "201"];
                }
            case "1112":
                if (ctgr.includes("ASTA")) {
                    return ["Base", "172", "201"];
                }
                return ["Base", "121", "134", "143", "161", "172", "201"];
            case "1205":
                return ["Base", "121", "134", "143"];
            case "1008": // arlan
                return ["Base", "121", "134", "143"];
            case "1003":
                return ["Base", "121", "134", "143"];
            case "1107":
                return ["Base", "121", "134"];

            case "1213":
                return ["Base", "121", "134"];
            case "1209":
                return ["Base", "134", "143"];
            case "1208":
                return ["Base", "121", "134", "143", "161", "172", "201"];
            case "1212":
                return ["Base", "121", "134", "143", "161", "172"];
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
            <div
                style="padding-left:10px; padding-right:4px; padding-bottom: 0;"
            >
                <a style="text-align: center; display:flex;" {href}>
                    <img
                        style="width: 14px; height:14px; margin-top:12px;"
                        src="https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/icon/property/IconSpeed.png"
                        alt="spd"
                    />
                    <p>{speedCategories[i]}</p>
                </a>
                {#if ctgr.includes(speedCategoriesCase(charId)[i]) || ($page.url.pathname.includes(fullctgrRaw + "/") && i == 0)}
                    <div
                        style="display:flex; margin:auto; background-color: blueviolet; width: 25px; height: 4.5px; margin-right:-1px; margin-top:-7px;"
                    />
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
        padding: 0;
    }
</style>
