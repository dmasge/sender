<script>
    import BuildsLeaderboard from "../../../BuildsLeaderboard.svelte";
    
    let charId = 1006;
    let ctgr = "resolution_134";
    let header = "Silver Wolf E0S5 Resolution 134SPD";
    import ctgrImg from "$lib/assets/lb/lc/resolution_134.png";
</script>


<BuildsLeaderboard {ctgr} {charId} {header} {ctgrImg}></BuildsLeaderboard>

