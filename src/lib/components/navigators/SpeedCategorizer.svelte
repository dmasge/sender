<script>
    import { page } from "$app/stores";
    function removeTrailingNumbers(url) {
        return url.replace(/(_\d+)?\/\d+$/, "");
    }
    $: urlBase = removeTrailingNumbers($page.url.pathname);

    export let spdCtgrs = ["Base", "134"];

    function GetUrlBases(spdCtgrs) {
        let newList = [];
        let currUrl = removeTrailingNumbers($page.url.pathname);
        for (let i = 0; i < spdCtgrs.length; i++) {
            if (spdCtgrs[i] === "Base") {
                newList.push(currUrl + "/");
            } else {
                newList.push(currUrl + "_" + spdCtgrs[i] + "/");
            }
        }
        return newList;
    }
    let urls = GetUrlBases(spdCtgrs);
</script>

{#if spdCtgrs != []}
    <div class="parentDiv">
        {#each urls as url, i}
            {@const href = url + "1"}
            <a {href} class:active={$page.url.pathname.includes(href)}>
                <p>{spdCtgrs[i] + " SPD"}</p>
            </a>
        {/each}
    </div>
{/if}

<style>
    a {
        text-decoration: none;
    }
    .parentDiv {
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
    .parentDiv a:not(:last-child) {
        border-right: 1px solid black;
        padding-right: 10px;
        margin-right: 10px;
    }

    .active {
        font-weight: bold;
    }
</style>
