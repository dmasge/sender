<script>
    import { page } from "$app/stores";
    let str = $page.url.pathname;

    let splitStr = str.split("/");
    let charId = splitStr[3];
    let ctgr = splitStr[4];

    function GetEidSuperCategoriesCase(str) {
        switch (str) {
            case "1005":
                if (ctgr.includes("23006")) {
                    return ["E0S1", "E1S1", "E1S5"];
                } else {
                    return [];
                }
            case "1102":
                if (ctgr.includes("23001")) {
                    return ["E0S1", "E1S1", "E2S1", "E2S5"];
                } else {
                    return [];
                }
            case "1205":
                if (ctgr.includes("23009")) {
                    return ["E0S1", "E2S1", "E2S5"];
                } else {
                    return [];
                }
            default:
                return [];
        }
    }
    let teamCategories = GetEidSuperCategoriesCase(charId);

    function getStringUntilSecondUnderline(str) {
        let count = 0;
        for (let i = 0; i < str.length; i++) {
            if (str[i] === "_") {
                count++;
            }
            if (count === 2) {
                return str.substring(0, i);
            }
        }
        return str;
    }

    function replacePattern(str, replacement) {
        const pattern = /E\dS\d/g;
        return str.replace(pattern, replacement);
    }

    function GetUrlBases(teamCategories) {
        if (teamCategories == []) return [];
        let newList = [];
        for (let i = 0; i < teamCategories.length; i++) {
            newList.push(
                "../" +
                    getStringUntilSecondUnderline(
                        replacePattern(ctgr, teamCategories[i])
                    ) +
                    "/"
            );
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

                {#if $page.url.pathname.includes(GetEidSuperCategoriesCase(charId)[i])}
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
        padding: 0px;
    }
</style>
