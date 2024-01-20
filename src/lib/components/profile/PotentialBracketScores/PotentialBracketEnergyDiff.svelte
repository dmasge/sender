<script>
    export let build;
    export let selectedCategory;
    export let calcBuild;
    export let bracketName;
    let energyChange = 0;
    let baseEnergy = 0;
    let calcEnergy = 0;
    $: energyTextColor = energyChange < 0 ? "red" : "yellow";
    function getEnergyDifferences(build, calcBuild) {
        if (build["k"] == "1208") {
            baseEnergy = getValue(build.lbstats[selectedCategory], "ERR");
            calcEnergy = getValue(calcBuild.lbstats[bracketName], "ERR");
            energyChange = ((calcEnergy / baseEnergy - 1) * 100).toFixed(2);
        }
    }
    function getValue(list, key) {
        for (let i = 0; i < list.length; i++) {
            if (list[i][0] === key) {
                let value = list[i][1];
                // Remove the percentage sign if it exists
                if (value.endsWith("%")) {
                    value = value.slice(0, -1);
                }
                // Convert the string to a number
                return parseFloat(value);
            }
        }
        // Return null if the key was not found
        return null;
    }

    getEnergyDifferences(build, calcBuild);
</script>

{#if energyChange != 0}
    <div style="display: flex; margin:auto; padding-left: 4px;">
        <p style="color: {energyTextColor};">{calcEnergy + "%"}</p>
        <img
            style="width: 14px; height:14px; margin-right:-4.5px; "
            src="https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/icon/property/IconEnergyLimit.png"
            alt="spd"
        />
    </div>
{/if}

<style>
    p {
        margin: 0;
        padding: 0;
    }
</style>