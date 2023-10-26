

import { score_fuxuan } from "$lib/components/calculators/lbcalcs/fu_xuan.js"
import { score_seele } from "$lib/components/calculators/lbcalcs/seele.js"

export function score_build(build) {
    try {
        if (build['k'] === "1208") {
            return score_fuxuan(build);
        } else if (build['k'] === "1102") {
            return score_seele(build);
        }
    } catch (error) {
        console.log(error);
    }

    return build;
}
