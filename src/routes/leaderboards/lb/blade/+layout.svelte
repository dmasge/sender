<script>
    import GeneralizedDesc from "$lib/faq/Generalized_desc.svelte";
    import SpeedCategorizer from '$lib/components/navigators/SpeedCategorizer.svelte';
    let text2 =
        "All Blades are assummed to be max char lvl, trace lvl, cone lvl. (only relics affect score)<br><br>";
    text2 +=
        "Scores are calculated as: ULT(90% HP loss) + 4x Ebasic + 1x Talent. 3 targets";

</script>



<div style="margin-bottom:-10px;">
    <GeneralizedDesc {text2}/>
    
    <SpeedCategorizer ></SpeedCategorizer>
</div>

<slot />
