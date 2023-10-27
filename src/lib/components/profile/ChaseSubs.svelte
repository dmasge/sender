<script>
    import { score_build } from "$lib/components/calculators/lbcalcs/score_builds.js";

    export let build;
    export let selectedCategory;

    let substatsMax = {
        HP: 42.34,
        ATK: 21.17,
        DEF: 21.17,
        "HP%": 4.32,
        "ATK%": 4.32,
        "DEF%": 5.4,
        SPD: 2.6,
        "CR%": 3.24,
        "CD%": 6.48,
        "EHR%": 4.32,
        "RES%": 4.32,
        "BR%": 6.48,
        "Break%": 6.48,
    };

    let possibleRelics = [
        {
            m: ["HP", "42"],
            sb: [],
        },
        {
            m: ["ATK", "21"],
            sb: [],
        },
        {
            m: ["DEF", "21"],
            sb: [],
        },
        {
            m: ["HP", "4.32%"],
            sb: [],
        },
        {
            m: ["ATK", "4.32%"],
            sb: [],
        },
        {
            m: ["DEF", "5.4%"],
            sb: [],
        },
        {
            m: ["SPD", "2.6"],
            sb: [],
        },
        {
            m: ["CR", "3.24%"],
            sb: [],
        },
        {
            m: ["CD", "6.48%"],
            sb: [],
        },
        {
            m: ["EHR", "4.32%"],
            sb: [],
        },
        {
            m: ["RES", "4.32%"],
            sb: [],
        },
        {
            m: ["BR", "6.48%"],
            sb: [],
        },
    ];

    function removeCircular(ref) {
        const seen = new Map();
        const detect = (obj) => {
            seen.set(obj, true);
            for (let [key, value] of Object.entries(obj)) {
                if (typeof value === "object" && value !== null) {
                    if (seen.has(value)) {
                        delete obj[key];
                    } else {
                        detect(value);
                    }
                }
            }
        };
        detect(ref);
    }

    let chaseSubs = {};
    function test() {
        try {
            removeCircular(build);

            for (let newRelic of possibleRelics) {
                let buildCopy = JSON.parse(JSON.stringify(build));
                buildCopy["r"].push(newRelic);
                buildCopy = score_build(buildCopy);

                for (let key of Object.keys(buildCopy["frontScore"])) {
                    if (!(key in chaseSubs)) chaseSubs[key] = [];
                    chaseSubs[key].push([
                        newRelic["m"],
                        buildCopy["frontScore"][key],
                        build["frontScore"][key],
                    ]);
                }
            }

            for (let key of Object.keys(chaseSubs)) {
                chaseSubs[key].sort(function (a, b) {
                    return b[1] - a[1];
                });
                chaseSubs[key] = chaseSubs[key].filter(function (item) {
                    return item[1] !== item[2];
                });
            }
        } catch (error) {
            console.log(error);
        }
    }
    test();
</script>

<div style="background-color: rgba(0,0,0,0.3); padding:10px; border-radius: 5px; padding-top:5px;">
<p style="text-align: center; margin:3px;">Substat Priority</p>

<div style="display: flex; justify-content: space-between; width: 280px; margin:auto;">
        <p class="statsP" style="width:120px; padding-left:0px;">
            Potential New Substat
        </p>

        <p class="statsP" style="width:120px;">
            Potential New Score
        </p>
</div>
{#each chaseSubs[selectedCategory] as substatItem}
    <div style="display: flex; justify-content: space-between; width: 250px; margin:auto;">
        <p class="statsP" style="">
            <span>
                {substatItem[0][0] + " "}
            </span>
            <span>
                {"+" + substatItem[0][1] + " "}
            </span>
        </p>

        <p class="statsP" style="width:100px;">
            <span>
                {substatItem[1] + " "}
            </span>
            <span style="">
                {"(+" +
                    ((substatItem[1] / substatItem[2] - 1) * 100).toFixed(2) +
                    "%)"}
            </span>
        </p>
    </div>
{/each}
</div>

<style>
    .statsP {
        width: 75px;
        justify-content: space-between;
        display: flex;
        font-size: 11.8px;
        margin: 2px;
        padding: 2px;
    }
    p {
        color: chartreuse;
        font-size: 12px;
    }
</style>
