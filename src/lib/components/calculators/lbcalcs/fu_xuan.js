
import * as damag from '$lib/components/calculators/damage_formulas.js';
import { BuildStatsCalculatorNew, assign_lb_to_build } from '$lib/components/calculators/build_stats_calculator_new.js';
import { lc_dict_by_id } from "$lib/components/calculators/lbcalcs/lightcones.js"

let breakpoints = ["", "120.1", "133.34", "142.9", "160.1", "171.5", "200.1"];

// fufu base stats
let char_base_atk = 465.696;
let char_base_hp = 1474.704;
let char_base_def = 606.375;
let char_base_spd = 100;

export function score_fuxuan(build) {
    if (!('lb' in build)) build['lb'] = {};
    if (!('lbstats' in build)) build['lbstats'] = [];
    if (!('calcDetails' in build)) build['calcDetails'] = [];
    if (!('effSpd' in build)) build['effSpd'] = {};

    let score = 0;
    let spd = 0;
    let lbstats = [];
    let calcDetails = [];
    if ("23011" === build['lc']['id']) {
        [score, spd, lbstats, calcDetails] = E0S1_23011_sheAlreadyShutHerEyes(build);
        let err_rope = damag.is_using_err_rope(build);
        let ctgrname = 'E0S1_' + (err_rope ? "ERR" : "") + build['lc']['id'];
        build = assign_lb_to_build(build, ctgrname, score, lbstats, spd, breakpoints, calcDetails);
    } else if ("24002" === build['lc']['id']) {
        [score, spd, lbstats, calcDetails] = E0S5_24002_textureOfMemories(build);
        let err_rope = damag.is_using_err_rope(build);
        let ctgrname = 'E0S5_' + (err_rope ? "ERR" : "") + build['lc']['id'];
        build = assign_lb_to_build(build, ctgrname, score, lbstats, spd, breakpoints, calcDetails);
    } else if ("21009" === build['lc']['id']) {
        [score, spd, lbstats, calcDetails] = E0S5_21009_landausChoice(build);
        let err_rope = damag.is_using_err_rope(build);
        let ctgrname = 'E0S5_' + (err_rope ? "ERR" : "") + build['lc']['id'];
        build = assign_lb_to_build(build, ctgrname, score, lbstats, spd, breakpoints, calcDetails);
    } else if ("23005" === build['lc']['id']) {
        [score, spd, lbstats, calcDetails] = E0S1_23005_MomentOfVictory(build);
        let err_rope = damag.is_using_err_rope(build);
        let ctgrname = 'E0S1_' + (err_rope ? "ERR" : "") + build['lc']['id'];
        build = assign_lb_to_build(build, ctgrname, score, lbstats, spd, breakpoints, calcDetails);
    } else if ("21002" === build['lc']['id']) {
        [score, spd, lbstats, calcDetails] = E0S5_21002_DayOneOfMyNewLife(build);
        let err_rope = damag.is_using_err_rope(build);
        let ctgrname = 'E0S5_' + (err_rope ? "ERR" : "") + build['lc']['id'];
        build = assign_lb_to_build(build, ctgrname, score, lbstats, spd, breakpoints, calcDetails);
    }




    return build;
}


function E0S1_23011_sheAlreadyShutHerEyes(build) {
        let lc_base_atk = lc_dict_by_id['23011']['atk'];
        let lc_base_hp = lc_dict_by_id['23011']['hp'];
        let lc_base_def = lc_dict_by_id['23011']['def'];

        let total_base_atk = char_base_atk + lc_base_atk;
        let total_base_hp = char_base_hp + lc_base_hp;
        let total_base_def = char_base_def + lc_base_def;

        // all are p here
        let lc_cr = 0;
        let lc_cd = 0;
        let lc_hp = 24;
        let lc_atk = 0;
        let lc_err = 12;
        let trace_hp = 18;
        let trace_cr = 18.7;
        let trace_cd = 0;
        let trace_atk = 0;
        let trace_res = 10;
        let trace_qua = 0;
        let trace_phys = 0;
        let trace_img = 0;
        let trace_ice = 0;

        let args = {
            build: build, base_hp: total_base_hp, trace_hp_p: trace_hp + lc_hp,
            base_def: total_base_def, base_spd: char_base_spd, trace_err: lc_err,
            trace_res_p: trace_res,
        }
        let stats = BuildStatsCalculatorNew(args);

        let dmg_red_final = 0.82 * (1 - stats.dmg_red_1 / 100);
        let hp_after_skill = stats.final_hp * 1.06;

        let ehp = damag.get_ehp(hp_after_skill, stats.final_def, dmg_red_final)


        // lvl 90 kafka shock is default
        let fu_xuan_dot_resist_chance = damag.chance_to_resist(stats.final_res);

        let heal = (hp_after_skill * 0.05 + 133) * (1 + stats.ohb_p / 100) * 3;

        let score = 0.8 * ehp + 0.2 * ehp * fu_xuan_dot_resist_chance + heal;

        args = {
            build: build, base_hp: total_base_hp, trace_hp_p: trace_hp + lc_hp,
            base_def: total_base_def, base_spd: char_base_spd, trace_err: lc_err,
             count_conditionals: false,
             trace_res_p: trace_res,
        }
        let stats_display = BuildStatsCalculatorNew(args);
        let lbstats = {
            HP : String(Math.floor(stats_display.final_hp)),
            DEF : String(Math.floor(stats_display.final_def)),
            RES : damag.trim_after_decimal(stats_display.final_res) + "%",
            ERR : damag.trim_after_decimal(stats_display.final_err) + "%",
            SPD : damag.trim_after_decimal(stats_display.final_spd),
        }
        let calcDetails = [
            ["EHP", String(Math.floor(ehp))],
            ["Chance to resist lvl 90 Kafka dot", damag.trim_after_decimal(fu_xuan_dot_resist_chance * 100) + "%"],
            ["3 Allies healed", String(Math.floor(heal))]
        ]

        return [Math.floor(score), stats.final_spd, Object.entries(lbstats), calcDetails];
    
}

function E0S5_24002_textureOfMemories(build) {
    let lc_base_atk = lc_dict_by_id['24002']['atk'];
    let lc_base_hp = lc_dict_by_id['24002']['hp'];
    let lc_base_def = lc_dict_by_id['24002']['def'];

    let total_base_atk = char_base_atk + lc_base_atk;
    let total_base_hp  = char_base_hp  + lc_base_hp;
    let total_base_def = char_base_def + lc_base_def;

    // all are p here
    let lc_cr     = 0;
    let lc_cd     = 0;
    let lc_hp     = 0;
    let lc_atk    = 0;
    let lc_res    = 16;
    let lc_err    = 0;
    let trace_hp  = 18;
    let trace_cr  = 18.7;
    let trace_cd  = 0;
    let trace_atk = 0;
    let trace_res = 10;
    let trace_qua = 0;
    let trace_phys= 0;
    let trace_img = 0;
    let trace_ice = 0;

    let args = {
        build: build, base_hp: total_base_hp, trace_hp_p: trace_hp + lc_hp,
        base_def: total_base_def, base_spd: char_base_spd, trace_err: lc_err,
        trace_res_p: trace_res + lc_res,
    }
    let stats = BuildStatsCalculatorNew(args);

    let dmg_red_final = 0.82 * (1 - stats.dmg_red_1 / 100);
    let hp_after_skill = stats.final_hp * 1.06;

    let ehp = damag.get_ehp(hp_after_skill, stats.final_def, dmg_red_final)
    // lvl 90 kafka shock is default
    let fu_xuan_dot_resist_chance = damag.chance_to_resist(stats.final_res);

    let heal = (hp_after_skill * 0.05 + 133) * (1 + stats.ohb_p / 100) * 3;

    let score = 0.8 * ehp + 0.2 * ehp * fu_xuan_dot_resist_chance + heal;

    args = {
        build: build, base_hp: total_base_hp, trace_hp_p: trace_hp + lc_hp,
        base_def: total_base_def, base_spd: char_base_spd, trace_err: lc_err,
         count_conditionals: false,
         trace_res_p: trace_res + lc_res,
    }
    let stats_display = BuildStatsCalculatorNew(args);
    let lbstats = {
        HP : String(Math.floor(stats_display.final_hp)),
        DEF : String(Math.floor(stats_display.final_def)),
        RES : damag.trim_after_decimal(stats_display.final_res) + "%",
        ERR : damag.trim_after_decimal(stats_display.final_err) + "%",
        SPD : damag.trim_after_decimal(stats_display.final_spd),
    }
    let calcDetails = [
        ["EHP (Before shield)", String(Math.floor(ehp))],
        ["Chance to resist lvl 90 Kafka dot", damag.trim_after_decimal(fu_xuan_dot_resist_chance * 100) + "%"],
        ["3 Allies healed", String(Math.floor(heal))]
    ]

    return [Math.floor(score), stats.final_spd, Object.entries(lbstats), calcDetails];

}

function E0S5_21009_landausChoice(build) {
    let lc_base_atk = lc_dict_by_id['21009']['atk'];
    let lc_base_hp = lc_dict_by_id['21009']['hp'];
    let lc_base_def = lc_dict_by_id['21009']['def'];

    let total_base_atk = char_base_atk + lc_base_atk;
    let total_base_hp  = char_base_hp  + lc_base_hp;
    let total_base_def = char_base_def + lc_base_def;

    // all are p here
    let lc_cr     = 0;
    let lc_cd     = 0;
    let lc_hp     = 0;
    let lc_atk    = 0;
    let lc_res    = 0;
    let lc_err    = 0;
    let trace_hp  = 18;
    let trace_cr  = 18.7;
    let trace_cd  = 0;
    let trace_atk = 0;
    let trace_res = 10;
    let trace_qua = 0;
    let trace_phys= 0;
    let trace_img = 0;
    let trace_ice = 0;

    let args = {
        build: build, base_hp: total_base_hp, trace_hp_p: trace_hp + lc_hp,
        base_def: total_base_def, base_spd: char_base_spd, trace_err: lc_err,
        trace_res_p: trace_res + lc_res,
    }
    let stats = BuildStatsCalculatorNew(args);

    let landau_red = 1 - 0.24;

    let dmg_red_final = 0.82 * (1 - stats.dmg_red_1 / 100) * landau_red;
    let hp_after_skill = stats.final_hp * 1.06;

    let ehp = damag.get_ehp(hp_after_skill, stats.final_def, dmg_red_final)
    // lvl 90 kafka shock is default
    let fu_xuan_dot_resist_chance = damag.chance_to_resist(stats.final_res);

    let heal = (hp_after_skill * 0.05 + 133) * (1 + stats.ohb_p / 100) * 3;

    let score = 0.8 * ehp + 0.2 * ehp * fu_xuan_dot_resist_chance + heal;
    args = {
        build: build, base_hp: total_base_hp, trace_hp_p: trace_hp + lc_hp,
        base_def: total_base_def, base_spd: char_base_spd, trace_err: lc_err,
         count_conditionals: false,
         trace_res_p: trace_res,
    }
    let stats_display = BuildStatsCalculatorNew(args);
    let lbstats = {
        HP : String(Math.floor(stats_display.final_hp)),
        DEF : String(Math.floor(stats_display.final_def)),
        RES : damag.trim_after_decimal(stats_display.final_res) + "%",
        ERR : damag.trim_after_decimal(stats_display.final_err) + "%",
        SPD : damag.trim_after_decimal(stats_display.final_spd),
    }
    let calcDetails = [
        ["EHP", String(Math.floor(ehp))],
        ["Chance to resist lvl 90 Kafka dot", damag.trim_after_decimal(fu_xuan_dot_resist_chance * 100) + "%"],
        ["3 Allies healed", String(Math.floor(heal))]
    ]

    return [Math.floor(score), stats.final_spd, Object.entries(lbstats), calcDetails];

}

function E0S1_23005_MomentOfVictory(build) {
    let lc_base_atk = lc_dict_by_id['23005']['atk'];
    let lc_base_hp = lc_dict_by_id['23005']['hp'];
    let lc_base_def = lc_dict_by_id['23005']['def'];

    let total_base_atk = char_base_atk + lc_base_atk;
    let total_base_hp  = char_base_hp  + lc_base_hp;
    let total_base_def = char_base_def + lc_base_def;

    // all are p here
    let lc_cr     = 0;
    let lc_cd     = 0;
    let lc_hp     = 0;
    let lc_atk    = 0;
    let lc_res    = 0;
    let lc_err    = 0;
    let lc_def    = 24;
    let trace_hp  = 18;
    let trace_cr  = 18.7;
    let trace_cd  = 0;
    let trace_atk = 0;
    let trace_res = 10;
    let trace_qua = 0;
    let trace_phys= 0;
    let trace_img = 0;
    let trace_ice = 0;

    let args = {
        build: build, base_hp: total_base_hp, trace_hp_p: trace_hp + lc_hp,
        base_def: total_base_def, base_spd: char_base_spd, trace_err: lc_err,
        trace_res_p: trace_res + lc_res, trace_def_p: lc_def,
    }
    let stats = BuildStatsCalculatorNew(args);

    let dmg_red_final = 0.82 * (1 - stats.dmg_red_1 / 100);
    let hp_after_skill = stats.final_hp * 1.06;

    let ehp = damag.get_ehp(hp_after_skill, stats.final_def, dmg_red_final)
    // lvl 90 kafka shock is default
    let fu_xuan_dot_resist_chance = damag.chance_to_resist(stats.final_res);

    let heal = (hp_after_skill * 0.05 + 133) * (1 + stats.ohb_p / 100) * 3;

    let score = 0.8 * ehp + 0.2 * ehp * fu_xuan_dot_resist_chance + heal;
    args = {
        build: build, base_hp: total_base_hp, trace_hp_p: trace_hp + lc_hp,
        base_def: total_base_def, base_spd: char_base_spd, trace_err: lc_err,
         count_conditionals: false,
         trace_res_p: trace_res,
    }
    let stats_display = BuildStatsCalculatorNew(args);
    let lbstats = {
        HP : String(Math.floor(stats_display.final_hp)),
        DEF : String(Math.floor(stats_display.final_def)),
        RES : damag.trim_after_decimal(stats_display.final_res) + "%",
        ERR : damag.trim_after_decimal(stats_display.final_err) + "%",
        SPD : damag.trim_after_decimal(stats_display.final_spd),
    }
    let calcDetails = [
        ["EHP (before hit)", String(Math.floor(ehp))],
        ["Chance to resist lvl 90 Kafka dot", damag.trim_after_decimal(fu_xuan_dot_resist_chance * 100) + "%"],
        ["3 Allies healed", String(Math.floor(heal))]
    ]

    return [Math.floor(score), stats.final_spd, Object.entries(lbstats), calcDetails];

}


function E0S5_21002_DayOneOfMyNewLife(build) {
    let lc_base_atk = lc_dict_by_id['21002']['atk'];
    let lc_base_hp = lc_dict_by_id['21002']['hp'];
    let lc_base_def = lc_dict_by_id['21002']['def'];

    let total_base_atk = char_base_atk + lc_base_atk;
    let total_base_hp  = char_base_hp  + lc_base_hp;
    let total_base_def = char_base_def + lc_base_def;

    // all are p here
    let lc_cr     = 0;
    let lc_cd     = 0;
    let lc_hp     = 0;
    let lc_atk    = 0;
    let lc_res    = 0;
    let lc_err    = 0;
    let lc_def    = 24;
    let trace_hp  = 18;
    let trace_cr  = 18.7;
    let trace_cd  = 0;
    let trace_atk = 0;
    let trace_res = 10;
    let trace_qua = 0;
    let trace_phys= 0;
    let trace_img = 0;
    let trace_ice = 0;

    let args = {
        build: build, base_hp: total_base_hp, trace_hp_p: trace_hp + lc_hp,
        base_def: total_base_def, base_spd: char_base_spd, trace_err: lc_err,
        trace_res_p: trace_res + lc_res, trace_def_p: lc_def,
    }
    let stats = BuildStatsCalculatorNew(args);

    let day_one_red = 0.88;
    let dmg_red_final = 0.82 * (1 - stats.dmg_red_1 / 100) * day_one_red;
    let hp_after_skill = stats.final_hp * 1.06;

    let ehp = damag.get_ehp(hp_after_skill, stats.final_def, dmg_red_final)
    // lvl 90 kafka shock is default
    let fu_xuan_dot_resist_chance = damag.chance_to_resist(stats.final_res);

    let heal = (hp_after_skill * 0.05 + 133) * (1 + stats.ohb_p / 100) * 3;

    let score = 0.8 * ehp + 0.2 * ehp * fu_xuan_dot_resist_chance + heal;
    args = {
        build: build, base_hp: total_base_hp, trace_hp_p: trace_hp + lc_hp,
        base_def: total_base_def, base_spd: char_base_spd, trace_err: lc_err,
         count_conditionals: false,
         trace_res_p: trace_res, trace_def_p: lc_def,
    }
    let stats_display = BuildStatsCalculatorNew(args);
    let lbstats = {
        HP : String(Math.floor(stats_display.final_hp)),
        DEF : String(Math.floor(stats_display.final_def)),
        RES : damag.trim_after_decimal(stats_display.final_res) + "%",
        ERR : damag.trim_after_decimal(stats_display.final_err) + "%",
        SPD : damag.trim_after_decimal(stats_display.final_spd),
    }
    let calcDetails = [
        ["EHP", String(Math.floor(ehp))],
        ["Chance to resist lvl 90 Kafka dot", damag.trim_after_decimal(fu_xuan_dot_resist_chance * 100) + "%"],
        ["3 Allies healed", String(Math.floor(heal))]
    ]

    return [Math.floor(score), stats.final_spd, Object.entries(lbstats), calcDetails];

}




