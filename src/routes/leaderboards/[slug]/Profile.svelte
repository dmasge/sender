<script>
    import { getAvatarUrl } from "$lib/iconUrls/avatarIconsUrl.js";
    export let item;
    import { goto } from '$app/navigation';
    $: player = item.find((i) => i["k"] == "p");
    //let avatarUrl = ;
</script>

<div class="card">
    <div class="sutffInMiddle">
        <p>{player["nm"]}</p>

        <img
            src={getAvatarUrl(player["icn"])}
            alt={player["nm"]}
            class="avatar"
        />
        <p style="word-break: break-all; ">{player["sig"]}</p>
        <button on:click={() => goto('lb/achievments/1')}>
            <p>
                {"Achievments: " +
                    player["ach"] +
                    " (" +
                    player["achrank"] +
                    ")"}
            </p>
        </button>
    </div>
</div>

<style>
    p {
        margin: 0;
    }

    .sutffInMiddle {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .avatar {
        width: 80px;
        height: 80px;
        border-left: 3px solid #dea055;
        border-right: 3px solid #dea055;
        border-radius: 50%;
    }
    @media (max-width: 850px) {
        .card {
            width: 300px;
        }
        p {
            font-size: 11px;
        }
    }
</style>
