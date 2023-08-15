<script>
    import BuildsLeaderboard from "../../../BuildsLeaderboard.svelte";
    
    let charId = 1006;
    let ctgr = "gn_134";
    let header = "Silver Wolf E0S5 GN 134SPD";
    import ctgrImg from "$lib/assets/lb/lc/gn.png";
</script>


<BuildsLeaderboard {ctgr} {charId} {header} {ctgrImg}></BuildsLeaderboard>

