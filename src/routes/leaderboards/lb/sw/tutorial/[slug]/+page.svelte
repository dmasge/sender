<script>
    import BuildsLeaderboard from "../../../BuildsLeaderboard.svelte";
    
    let charId = 1006;
    let ctgr = "tutorial";
    let header = "Silver Wolf E0S5 Tutorial";
    import ctgrImg from "$lib/assets/lb/lc/tutorial.png";
</script>


<BuildsLeaderboard {ctgr} {charId} {header} {ctgrImg}></BuildsLeaderboard>

