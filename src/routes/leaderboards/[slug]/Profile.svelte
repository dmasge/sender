<script>
    export let item;
    $: player = item.find((i) => i["k"] == "p");
    import { starRailRes } from "$lib/constants.js";
</script>

<div class="card">
    <div class="sutffInMiddle">
        <h2>{player["nm"]}</h2>

        <img
            src={starRailRes + player["icn"]}
            alt={player["nm"]}
            class="avatar"
        />
        <p>{player["sig"]}</p>
        <p>
            {"Achievments: " + player["ach"] + " (" + player["achrank"] + ")"}
        </p>
    </div>
</div>

<style>
    h2 {
        font-size: 2.5vw;
        margin: 0;
        -webkit-text-stroke: 0.1px black;
    }
    p {
        font-family: Arial, sans-serif;
        font-size: 1vw;

        text-shadow: none;
        margin: 0;
    }

    .sutffInMiddle {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .avatar {
        width: 6vw;
        height: 6vw;
        border-left: 3px solid #7cf7ff;
        border-right: 3px solid #7cf7ff;
        border-radius: 50%;
    }
    @media (max-width: 850px) {
        .card {
            width: 300px;
        }
        h2 {
            font-size: 20px;
        }
        p {
            font-size: 15px;
        }
        .avatar {
            width: 70px;
            height: 70px;
        }
    }
</style>
