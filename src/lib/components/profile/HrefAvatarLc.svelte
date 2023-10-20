<script>
    export let redirect;
    export let build;

    import { starRailRes, extension } from "$lib/constants.js";
    import { lbUrlStore } from "$lib/store.js"
    export let key;
    export let lbUrl;
    $: lbUrl = redirect
            ? "../../../" + build["id"]
            : "./lb/" + build["k"] + "/" + key + "/1";
    $: lbUrlStore.set(lbUrl);
</script>

<div style="position: relative; width: fit-content; margin:auto;">
    <a
        href={lbUrl}
        style="pointer-events: {key ? 'all' : 'none'}"
    >
        <p style="position: absolute; font-size: 10px; z-index: 10005; border-radius: 2px; background-color: rgba(30, 0, 70, 1); padding:2px; margin-left:2px;  margin-top:39px;">{"E" + build['e']}</p>
        
        <p style="position: absolute; font-size: 10px; z-index: 10005; border-radius: 2px; background-color: rgba(30, 0, 70, 1); padding:2px; margin-left:60px; margin-top:39px;">{"S" + build['lc']['s']}</p>
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
</div>

<style>
    :root {
        --CardAvatarLcSize: 56px;
    }

    a {
        margin: 0;
        padding: 0;
        z-index: 10010;
    }

    img {
        width: var(--CardAvatarLcSize);
        height: var(--CardAvatarLcSize);
        margin-bottom: -5px;
    }

    .avatar {
        width: var(--CardAvatarLcSize);
        height: var(--CardAvatarLcSize);
        border-radius: 25%;
        scale: 0.9;
    }
</style>
