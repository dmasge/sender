<script>
    import BuildsLeaderboard from "../../../BuildsLeaderboard.svelte";
    
    let charId = 1006;
    let ctgr = "rain";
    let header = "Silver Wolf E0S1 Rain";
    import ctgrImg from "$lib/assets/lb/lc/rain.png";
</script>


<BuildsLeaderboard {ctgr} {charId} {header} {ctgrImg}></BuildsLeaderboard>

