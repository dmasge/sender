<script>
    import GeneralizedDesc from "$lib/faq/Generalized_desc.svelte";
    import SpeedCategorizer from '$lib/components/navigators/SpeedCategorizer.svelte';
    let text2 =
        "Char, traces, cones are assummed max lvl. (only relics matter here)<br><br>";
    text2 +=
        "Scores are calculated as:  4 * skill + 1 ult + 7 stack ll + 10 stack ll, 3 targets";

</script>



<div style="margin-bottom:-10px;">
    <GeneralizedDesc {text2}/>
    
    <SpeedCategorizer ></SpeedCategorizer>
</div>

<slot />
