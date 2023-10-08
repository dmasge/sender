<script>
    import Relic from "$lib/components/Relic.svelte";
    export let relic;
</script>

<div class="parentDiv">
<Relic {relic}></Relic>

</div>

<style>
    .parentDiv {
        background-color: rgba(30, 0, 70, 0.7);
        padding: 6px;
        margin: 2px;
        border: 5px solid rgb(23, 0, 52);
        height: min-content;
        width: min-content;
    }
</style>