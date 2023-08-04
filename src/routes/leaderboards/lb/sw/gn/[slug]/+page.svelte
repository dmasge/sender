<script>
    import BuildsLeaderboard from "../../../BuildsLeaderboard.svelte";
    
    let charId = 1006;
    let ctgr = "gn";
    let header = "Silver Wolf E0S5 GN";
    import ctgrImg from "$lib/assets/lb/lc/gn.png";
</script>


<BuildsLeaderboard {ctgr} {charId} {header} {ctgrImg}></BuildsLeaderboard>

