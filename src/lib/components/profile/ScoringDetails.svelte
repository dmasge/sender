<script>
    import { scoringRulesShort } from "$lib/scoringRules.js";

    export let build;
    export let key;

    function capitalizeAndRemoveUnderscores(str) {
        return str
            .split("_")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
    }

    function keyRemap(key) {
        if (key == "unreachable") {
            return "E0S1_unreachable";
        } else if (key == "night") {
            return "E2S1_night";
        } else if (key == "cruising") {
            return "E1S5_cruising";
        } else if (key == "tutorial") {
            return "E0S5_tutorial";
        } else if (key == "tutorial_134") {
            return "E0S5_tutorial_134";
        }  else if (key == "darkness") {
            return "E1S5_darkness";
        }  else if (key == "swordplay") {
            return "E1S5_swordplay";
        }  else if (key == "sleep") {
            return "E1S1_sleep";
        }   else if (key == "rain") {
            return "E0S1_rain";
        }    else if (key == "rain_134") {
            return "E0S1_rain_134";
        }  else if (key == "gn_134") {
            return "E0S5_gn_134";
        }  else if (key == "gn") {
            return "E0S5_gn";
        } else if (key == "resolution_134") {
            return "E0S5_resolution_134";
        } else if (key == "resolution") {
            return "E0S5_resolution";
        } else if (key == "secret") {
            return "E0S5_secret";
        } else if (key == "secret_134") {
            return "E0S5_secret_134";
        } else if (key == "fall_134") {
            return "E0S5_fall_134";
        } else if (key == "fall") {
            return "E0S5_fall";
        } else if (key == "mutual") {
            return "E0S5_mutual";
        } else if (key == "mutual_134") {
            return "E0S5_mutual_134";
        } else if (key == "irreplaceable_134") {
            return "E0S1_irreplaceable_134";
        } else if (key == "irreplaceable") {
            return "E0S1_irreplaceable";
        }     else {
            return key;
        }
    }

    function getTextAfterSecondUnderscore(inputString) {
        inputString = keyRemap(inputString);
        let firstIndex = inputString.indexOf("_");
        if (firstIndex !== -1) {
            let secondIndex = inputString.indexOf("_", firstIndex + 1);
            if (secondIndex !== -1) {
                return inputString.substring(secondIndex + 1);
            }
        }
        return "Base";
    }

    function getTextUntilUnderscore(inputString) {
        let index = inputString.indexOf("_");
        if (index !== -1) {
            return inputString.substring(0, index);
        } else {
            return inputString;
        }
    }
</script>

<div style="margin-top:0px;">
    <p style="font-size: 12px;">
        {"Rank: " +
            build["lb"][key]["rank"] +
            " (" +
            build["lb"][key]["percrank"] +
            ")"}
    </p>
    <p>
        {scoringRulesShort[build["k"]] +
            " = " + build["lb"][key]["sc"]}
    </p>
    <p >
        {"Category: " + getTextAfterSecondUnderscore(key) + " SPD"}
    </p>
    
    <p>
        {"Calculated at: " + capitalizeAndRemoveUnderscores(
            getTextUntilUnderscore(keyRemap(key))) + " (Actual: E" + build["e"] + "S" + build["lc"]["s"] + ")"}
    </p>
</div>

<style>
    p {

        margin: 1px;
    }
</style>
