<script>
    import GeneralizedDesc from "$lib/faq/Generalized_desc.svelte";
    import SpeedCategorizer from '$lib/components/navigators/SpeedCategorizer.svelte';
    let text2 =
        "Char, traces, cones are assummed max lvl. (only relics matter here)<br><br>";
    text2 +=
        "Scores are calculated as: 3 * flwup + 3 * skill + 3 * dot_ult * 0.75 + ult + 3 * dot + 9 * dot_ult, 3 targets <br><br>";

    text2 +=
        "Enemies have no quantum weakness. Dots are scaled by your probability of applying them.";


</script>



<div style="margin-bottom:-10px;">
    <GeneralizedDesc {text2}/>
    
    <SpeedCategorizer spdCtgrs={["Base", "134", "151", "161"]}></SpeedCategorizer>
</div>

<slot />
