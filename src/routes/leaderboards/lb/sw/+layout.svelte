<script>
    import GeneralizedDesc from "$lib/faq/Generalized_desc.svelte";
    import SpeedCategorizer from "$lib/components/navigators/SpeedCategorizer.svelte";
    let text2 =
        "All SW are assummed to be max char lvl, trace lvl, cone lvl. (only relics affect score)<br><br>";
    text2 +=
        "Scores are calculated as: (2x (Ult + skill + 2x basic) + break + (skill + 2x basic) + 5entanglement) * (prob landing weakness)";
</script>

<div style="margin-bottom:-10px;">
    <GeneralizedDesc {text2}/>
    <SpeedCategorizer></SpeedCategorizer>
</div>

<slot />
