<script>
    import BuildsLeaderboard from "../../../BuildsLeaderboard.svelte";
    import { getPicForCtgr, capitalizeAndRemoveUnderscores } from "$lib/leaderboards.js";
    
    let charId = 1205;
    let ctgr = "fall_134";
    let header = "Blade E0S5 " + capitalizeAndRemoveUnderscores(ctgr);
</script>


<BuildsLeaderboard {ctgr} {charId} {header} ctgrImg={getPicForCtgr(ctgr)}></BuildsLeaderboard>

