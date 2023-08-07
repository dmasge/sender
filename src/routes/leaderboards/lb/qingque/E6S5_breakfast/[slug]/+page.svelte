<script>
    import BuildsLeaderboard from "../../../BuildsLeaderboard.svelte";
    import { capitalizeAndRemoveUnderscores, getPicForCtgr }  from  "$lib/leaderboards.js"
    import { getIdFromName }  from  "$lib/constants.js"
    import { page } from "$app/stores";
    function extractCharnameFromURL(str) {
        let regex = /\/leaderboards\/lb\/(\w+)\//;
        let match = str.match(regex);
        if (match) {
            return match[1];
        } else {
            return null;
        }
    }
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    let charName = capitalizeFirstLetter(
        extractCharnameFromURL($page.url.pathname)
    );

    function extractCtgr(str) {
        const regex = /\/(\w+_\w+)\/\d+$/;
        const match = str.match(regex);
        if (match) {
            return match[1];
        } else {
            return null;
        }
    }

    let ctgr = extractCtgr($page.url.pathname);
    let charId = getIdFromName(charName);
    let header = charName + " " + capitalizeAndRemoveUnderscores(ctgr);
    let ctgrImg = getPicForCtgr(ctgr)
</script>

<BuildsLeaderboard {ctgr} {charId} {header} {ctgrImg} />
