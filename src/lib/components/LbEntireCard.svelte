<script>
    import LbPlayerCard from "$lib/components/LbPlayerCard.svelte";
    import LbBuildCard from "$lib/components/LbBuildCard.svelte";
    export let ctgrImg;
    export let ctgr;
    export let build;
    export let header;
    export let rank;
    $: player = build["player"];
</script>

<LbPlayerCard
    {player}
    {rank}
    score={build["lb"][ctgr]["sc"]}
    {ctgrImg}
    {build}
/>

<LbBuildCard {build} {header} {ctgr} />

