<script>
    import LbCalcDesc from "$lib/components/profile/LbCalcDesc.svelte";
    import LbStats from "$lib/components/LbStats.svelte";
    import RelicSetDisplay from "$lib/components/RelicSetDisplay.svelte";
    import HrefAvatarLc from "$lib/components/profile/HrefAvatarLc.svelte";
    import RelicsBulk from "$lib/components/RelicsBulk.svelte";
    
    import RvSummary from "$lib/components/RVSummary.svelte";
    export let build;
    // export let selectedCategory;
    // export let redirect = false;
</script>



<!-- <div
    style="display: flex; justify-content: space-between; padding-right: 10px; margin-left: 20px; width:280px;"
>
    <div style="margin-left: -16px; margin-right:5.5px;">
        <HrefAvatarLc
            redirect={redirect}
            {build}
            key={selectedCategory}
        />
        <LbStats lbStats={build["lbstats"][selectedCategory]} />
        <RelicSetDisplay relicSets={build['rs']} />
    </div>
    <div
        style="display:flex; flex-direction: column; justify-content: space-evenly;"
    >
        <div style="display: flex; justify-content: end;">
            <LbCalcDesc
                calcDesc={build["calcDetails"][
                    selectedCategory
                ]}
            />
        </div>
    </div>
</div> -->

<RelicsBulk relics={build['r']} charId={build["k"]} />