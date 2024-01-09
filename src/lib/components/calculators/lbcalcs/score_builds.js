

import { score_fuxuan } from "$lib/components/calculators/lbcalcs/fu_xuan.js"
import { score_seele } from "$lib/components/calculators/lbcalcs/seele.js"
import { score_himeko } from "$lib/components/calculators/lbcalcs/himeko.js"
import { score_jingliu } from "$lib/components/calculators/lbcalcs/jingliu.js"
import { score_blade } from "$lib/components/calculators/lbcalcs/blade.js"
import { score_kafka } from "$lib/components/calculators/lbcalcs/kafka.js"
import { score_topaz } from "$lib/components/calculators/lbcalcs/topaz.js"
import { score_arlan } from "$lib/components/calculators/lbcalcs/arlan.js"
import { score_jing_yuan } from "$lib/components/calculators/lbcalcs/jing_yuan.js"
import { score_argenti } from "$lib/components/calculators/lbcalcs/argenti.js"
import { score_yanqing } from "$lib/components/calculators/lbcalcs/yanqing.js"

export function score_build(build, optimizationTarget = "") {
    try {
        if (build['k'] === "1208") {
            return score_fuxuan(build);
        } else if (build['k'] === "1102") {
            return score_seele(build, optimizationTarget);
        } else if (build['k'] === "1003") {
            return score_himeko(build);
        } else if (build['k'] === "1212") {
            return score_jingliu(build);
        } else if (build['k'] === "1205") {
            return score_blade(build);
        } else if (build['k'] === "1005") {
            return score_kafka(build, optimizationTarget);
        } else if (build['k'] === "1112") {
            return score_topaz(build, optimizationTarget);
        } else if (build['k'] === "1008") {
            return score_arlan(build, optimizationTarget);
        } else if (build['k'] === "1204") {
            return score_jing_yuan(build, optimizationTarget);
        } else if (build['k'] === "1302") {
            return score_argenti(build, optimizationTarget);
        } else if (build['k'] === "1209") {
            return score_yanqing(build, optimizationTarget);
        } 
    } catch (error) {
        console.log(error);
    }

    return build;
}
