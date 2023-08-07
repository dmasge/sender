<script>
    import GeneralizedDesc from "$lib/faq/Generalized_desc.svelte";
    import SpeedCategorizer from '$lib/components/navigators/SpeedCategorizer.svelte';
    let text2 =
        "All QQ are assummed to be max char lvl, trace lvl, cone lvl. (only relics affect score)<br><br>";
    text2 +=
        "Scores are calculated as:  ult_dmg + e_basic_atk + 0.24 * autarky. 3 targets";

</script>



<div style="margin-bottom:-10px;">
    <GeneralizedDesc {text2}/>
    
    <SpeedCategorizer ></SpeedCategorizer>
</div>

<slot />
