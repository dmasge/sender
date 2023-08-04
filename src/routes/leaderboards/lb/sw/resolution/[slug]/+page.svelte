<script>
    import BuildsLeaderboard from "../../../BuildsLeaderboard.svelte";
    
    let charId = 1006;
    let ctgr = "resolution";
    let header = "Silver Wolf E0S5 Resolution";
    import ctgrImg from "$lib/assets/lb/lc/resolution.png";
</script>


<BuildsLeaderboard {ctgr} {charId} {header} {ctgrImg}></BuildsLeaderboard>

