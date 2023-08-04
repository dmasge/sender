<script>
    import BuildsLeaderboard from "../../../BuildsLeaderboard.svelte";
    
    let charId = 1006;
    let ctgr = "rain_134";
    let header = "Silver Wolf E0S1 Rain 134SPD";
    import ctgrImg from "$lib/assets/lb/lc/rain_134.png";
</script>


<BuildsLeaderboard {ctgr} {charId} {header} {ctgrImg}></BuildsLeaderboard>

