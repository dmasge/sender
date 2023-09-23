<script>
    export let redirect;
    export let build;

    import { starRailRes, extension } from "$lib/constants.js";
    export let key;
</script>

<a
    href={redirect
        ? "../../../" + build["id"]
        : "./lb/" + build["k"] + "/" + key + "/1"}
    style="pointer-events: {key ? "all" : "none"}"
>
    <div style="display: flex; justify-content: center;">
        <img
            src={starRailRes + "icon/character/" + build["k"] + extension}
            alt={"..."}
            class="RelicImg avatar"
        />
        <img
            src={starRailRes +
                "icon/light_cone/" +
                build["lc"]["id"] +
                extension}
            alt={"..."}
            class="RelicImg"
            style="margin-top: 1px;"
        />
    </div>
</a>

<style>
    img {
        width: 60px;
        height: 60px;
        margin-bottom: -5px;
    }

    .avatar {
        width: 60px;
        height: 60px;
        border-radius: 25%;
        scale: 0.9;
    }
   
</style>
