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
        <p>#{rank}</p>
    </div>
    <div class="sutffInMiddle">
        <p>{player["nm"]}</p>
        <a href={isAch ? "../../" + player["id"] : "../../../" + player["id"]}>
            <img
                src={starRailRes + player["icn"]}
                alt={player["nm"]}
                class="avatar"
            />
        </a>
        <p style="word-break: break-all;">{player["sig"]}</p>
    </div>
    <div class="centeringDiv">
        <div>
            <img class="ctgrImg" src={ctgrImg} alt={player["nm"]} />

            <p>
                {score}
            </p>
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

    .centeringDiv {
        width: 10%;
    }

    p {
        font-size: 2.5vw;
        margin: 0;
    }
    p {
        font-family: Arial, sans-serif;
        font-size: 1vw;
    }


    .sutffInMiddle {
        width: 65%;
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
        border-left: 3px solid #DEA055;
        border-right: 3px solid #DEA055;
        border-radius: 50%;
    }
    @media (max-width: 850px) {
        .card {
            width: 300px;
        }
        p {
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
