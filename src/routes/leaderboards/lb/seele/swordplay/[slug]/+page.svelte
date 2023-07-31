<script>
    import BuildsLeaderboard from "../../../BuildsLeaderboard.svelte";
    
    let charId = 1102;
    let ctgr = "swordplay";
    let header = "Seele E1S5 Swordplay";
    import ctgrImg from "$lib/assets/lb/lc/swordplay.png";
</script>


<BuildsLeaderboard {ctgr} {charId} {header} {ctgrImg}></BuildsLeaderboard>

