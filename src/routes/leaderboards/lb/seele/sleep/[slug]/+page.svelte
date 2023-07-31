<script>
    import BuildsLeaderboard from "../../../BuildsLeaderboard.svelte";
    
    let charId = 1102;
    let ctgr = "sleep";
    let header = "Seele E1S1 Sleep";
    import ctgrImg from "$lib/assets/lb/lc/sleep.png";
</script>


<BuildsLeaderboard {ctgr} {charId} {header} {ctgrImg}></BuildsLeaderboard>

