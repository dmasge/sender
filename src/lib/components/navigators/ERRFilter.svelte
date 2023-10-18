<script>
    import { page } from "$app/stores";
    let str = $page.url.pathname;

    let splitStr = str.split("/");
    let charId = splitStr[3];
    let ctgr = splitStr[4];

    function removeSpdPattern(str) {
        return str.replace(/(_+\d{3})+$/, "").replace(/_+$/, "");
    }

    function getRemovedSpdPattern(str) {
        let removed = str.match(/(_+\d{3})+$/);
        if (!removed) {
            removed = str.match(/_+$/);
        }
        return removed ? removed[0] : "";
    }
    function teamCategoriesCase(str) {
        switch (str) {
            case "1208":
                return ["Other Rope", "ERR"];
            default:
                return [];
        }
    }
    let teamCategories = teamCategoriesCase(charId);
    let fullctgrRaw = teamCategories.reduce((ctgr, str) => {
        return ctgr.replace(new RegExp(str, "g"), "");
    }, ctgr);
    let ctgrRaw = removeSpdPattern(fullctgrRaw);

    function removeErrFromString(inputString) {
        // First, remove 'ERR' if it exists
        let cleanedString = inputString.replace("ERR", "");
        return cleanedString;
    }
    function addErrAfterUnderscore(inputString) {
        // First, remove 'ERR' if it exists
        let cleanedString = inputString.replace("ERR", "");

        // Then, find the position of the first underscore
        let position = cleanedString.indexOf("_");

        // If an underscore is found, insert 'ERR' after it
        if (position !== -1) {
            return (
                cleanedString.slice(0, position + 1) +
                "ERR" +
                cleanedString.slice(position + 1)
            );
        } else {
            // If no underscore is found, return the original string
            return cleanedString;
        }
    }

    function GetUrlBases(teamCategories) {
        if (teamCategories == []) return [];
        let newList = [];
        for (let i = 0; i < teamCategories.length; i++) {
            if (teamCategories[i] === "Other Rope") {
                newList.push(
                    "../" +
                        removeErrFromString(ctgrRaw) +
                        getRemovedSpdPattern(fullctgrRaw) +
                        "/"
                );
            } else {
                newList.push(
                    "../" +
                        addErrAfterUnderscore(ctgrRaw) +
                        getRemovedSpdPattern(fullctgrRaw) +
                        "/"
                );
            }
        }
        return newList;
    }

    let urls = GetUrlBases(teamCategories);
</script>

{#if teamCategories != []}
    <div class="parentDiv">
        {#each urls as url, i}
            {@const href = url}
            <div
                style="padding-left:10px; padding-right:10px; padding-bottom: 0;"
            >
                <a href={href + "1"} style="text-align: center;">
                    <p>{teamCategories[i]}</p>
                </a>

                {#if $page.url.pathname.includes(teamCategoriesCase(charId)[i]) || ($page.url.pathname.includes(fullctgrRaw + "/") && i == 0)}
                    <div
                        style="margin:auto; background-color: blueviolet; width: 25px; height: 5px; margin-top:-7px;"
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
        padding: 7x;
        padding-bottom: 10px;
    }
</style>
