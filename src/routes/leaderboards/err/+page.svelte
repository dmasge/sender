<script>
    import thonk from "$lib/assets/thonk.png";
    let thonkSize = 20;
</script>

<div style="text-align: center; ">
    <div
        style="display: flex;
        justify-content: center;
        align-items: center;"
    >
        <p style="width: {2 * thonkSize * 1.168}vw;">
            Looks like some kind of error occurred. If this keeps happening you can ask in our discord.
        </p>
    </div>

    <div style="display: flex; justify-content: center;">
        <img
            style="width : {thonkSize}vw; height : {thonkSize * 1.168}vw;"
            src={thonk}
            alt="Your GIF"
        />
    </div>
</div>
