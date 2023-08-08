<script>
    import GeneralizedDesc from "$lib/faq/Generalized_desc.svelte";
    import SpeedCategorizer from '$lib/components/navigators/SpeedCategorizer.svelte';
    let text2 =
        "Char, traces, cones are assummed max lvl. (only relics matter)<br><br>";
    text2 +=
        "Scores are calculated as:  2 * e_counter + 2 * counter + 2 * skill + basic # 2 targets";

</script>



<div style="margin-bottom:-10px;">
    <GeneralizedDesc {text2}/>
    
    <SpeedCategorizer ></SpeedCategorizer>
</div>

<slot />
