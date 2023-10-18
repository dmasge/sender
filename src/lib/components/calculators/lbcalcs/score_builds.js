

import { score_fuxuan } from "$lib/components/calculators/lbcalcs/fu_xuan.js"

export function score_build(build) {
    try {
        if (build['k'] === "1208") {
            return score_fuxuan(build);
        }
    } catch (error) {
        console.log(error);
    }

    return build;
}
