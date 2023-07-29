<script>
    import LbPlayerCard from "$lib/components/LbPlayerCard.svelte";
    import LbBuildCard from "$lib/components/LbBuildCard.svelte";
    export let ctgrImg;
    export let ctgr;
    export let build;
    export let header;
    $: player = build["player"];
</script>

<LbPlayerCard
    {player}
    rank={build["lb"][ctgr]["rank"]}
    score={build["lb"][ctgr]["sc"]}
    {ctgrImg}
/>
<LbBuildCard {build} {header} {ctgr} />

