<script>
    import BuildsLeaderboard from "../../../BuildsLeaderboard.svelte";
    
    let charId = 1102;
    let ctgr = "cruising";
    let header = "Seele E1S5 Cruising";
    import ctgrImg from "$lib/assets/lb/lc/cruising.png";
</script>


<BuildsLeaderboard {ctgr} {charId} {header} {ctgrImg}></BuildsLeaderboard>

