<script>
    import { page } from "$app/stores";
    let str = $page.url.pathname;

    let splitStr = str.split("/");
    let charId = splitStr[3];
    let ctgr = splitStr[4];

    function removeSpdPattern(str) {
        return str.replace(/(_+\d{3})+$/, '').replace(/_+$/, "");;
    }

    function teamCategoriesCase(str) {
        switch (str) {
            case "1213":
                return ["Solo", "YK"];
            default:
                return [];
        }
    }
    let teamCategories = teamCategoriesCase(charId);
    let fullctgrRaw = teamCategories.reduce((ctgr, str) => {
            return ctgr.replace(new RegExp(str, "g"), "");
        }, ctgr);
    let ctgrRaw = removeSpdPattern(fullctgrRaw);

    function GetUrlBases(teamCategories) {
        if (teamCategories == []) return [];
        let newList = [];
        for (let i = 0; i < teamCategories.length; i++) {
            if (teamCategories[i] === "Solo") {
                newList.push("../" + ctgrRaw + "/");
            } else {
                newList.push("../" + ctgrRaw + teamCategories[i] + "/");
            }
        }
        return newList;
    }

    let urls = GetUrlBases(teamCategories);
</script>

{#if teamCategories != []}
    <div class="parentDiv">
        {#each urls as url, i}
            {@const href = url }
            <a href={href + "1"} class:active={$page.url.pathname.includes(teamCategoriesCase(charId)[i]) 
                || ($page.url.pathname.includes(fullctgrRaw + "/") && i == 0)}>
                <p>{teamCategories[i]}</p>
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
