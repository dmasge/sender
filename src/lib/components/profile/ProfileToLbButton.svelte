<script>
    import { lbUrlStore } from "$lib/store.js";
    let lbUrl;
    lbUrlStore.subscribe((value) => {
        lbUrl = value;
    });
    import { goto } from "$app/navigation";
</script>

{#if !lbUrl.includes('undefined')}
<button
    style="display: flex; margin:auto; margin-top:7px;"
    on:click={() => goto(lbUrl)}
    ><p style="margin: 2px;">{"Visit leaderboard >"}</p></button
>

{/if}