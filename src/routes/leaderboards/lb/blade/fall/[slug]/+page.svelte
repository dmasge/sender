<script>
    import BuildsLeaderboard from "../../../BuildsLeaderboard.svelte";
    
    let charId = 1205;
    let ctgr = "fall";
    let header = "Blade E0S5 Fall";
    import ctgrImg from "$lib/assets/lb/lc/fall.png";
</script>


<BuildsLeaderboard {ctgr} {charId} {header} {ctgrImg}></BuildsLeaderboard>

