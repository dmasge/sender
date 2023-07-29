<script>
    export let player;
    export let ctgrImg;
    export let score;
    export let rank;
    export let isAch = false;
    import { starRailRes } from "$lib/constants.js";
</script>

<div class="card">
    <div class="centeringDiv">
        <h2>#{rank}</h2>
    </div>
    <div class="sutffInMiddle">
        <h2>{player["nm"]}</h2>
        <a href={isAch ? "../../" + player["id"] : "../../../" + player["id"]}>
            <img
                src={starRailRes + player["icn"]}
                alt={player["nm"]}
                class="avatar"
            />
        </a>
        <p>{player["sig"]}</p>
    </div>
    <div class="centeringDiv">
        <div>
            <img class="ctgrImg" src={ctgrImg} alt={player["nm"]} />

            <h2>
                {score}
            </h2>
        </div>
    </div>
</div>

<style>
    .card {
        display: flex;
        text-align: center;
        justify-content: space-between;
        width: 50vw;
        margin: auto;
    }

    .centeringDiv,
    .sutffInMiddle {
        width: 33.33%;
    }

    h2 {
        font-size: 2.5vw;
        margin: 0;
        -webkit-text-stroke: 0.1px black;
    }
    p {
        font-family: Arial, sans-serif;
        font-size: 1vw;

        text-shadow: none;
    }

    .sutffInMiddle {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .centeringDiv {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .ctgrImg {
        width: 5vw;
        height: 5vw;
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
            margin-bottom: -10px;
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
        .ctgrImg {
            width: 40px;
            height: 40px;
        }
    }
</style>
