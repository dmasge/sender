<script>
    import BuildsLeaderboard from "../../../BuildsLeaderboard.svelte";
    
    let charId = 1102;
    let ctgr = "darkness";
    let header = "Seele E1S5 Darkness";
    import ctgrImg from "$lib/assets/lb/lc/darkness.png";
</script>


<BuildsLeaderboard {ctgr} {charId} {header} {ctgrImg}></BuildsLeaderboard>

