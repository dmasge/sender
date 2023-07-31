<script>
    import BuildsLeaderboard from "../../../BuildsLeaderboard.svelte";

    let charId = 1102;
    let ctgr = "night";
    let header = "Seele E2S1 Night";
    import ctgrImg from "$lib/assets/lb/lc/night.png";
</script>


<BuildsLeaderboard {ctgr} {charId} {header} {ctgrImg}></BuildsLeaderboard>

 
