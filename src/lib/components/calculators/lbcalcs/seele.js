
import * as damag from '$lib/components/calculators/damage_formulas.js';
import { BuildStatsCalculatorNew, assign_lb_to_build } from '$lib/components/calculators/build_stats_calculator_new.js';
import { lc_dict_by_id } from "$lib/components/calculators/lbcalcs/lightcones.js"
let breakpoints = ["", "160.1", "171.5", "200.1"];

// seele base stats
let char_base_atk = 640.331;
let char_base_spd = 115;

export function score_seele(build, optimizationTarget) {
    let score = 0;
    let spd = 0;
    let lbstats = [];
    let calcDetails = [];
    if (optimizationTarget == "" || (optimizationTarget != "" && !optimizationTarget.includes("FX")))

        if (build['e'] >= 2 && "23001" == build['lc']['id'] && build['lc']['s'] >= 3) {
            breakpoints = ["", "200.1"];
            [score, spd, lbstats, calcDetails] = E2S5_23001_IntheNight(build);
            let ctgrname = 'E2S5_' + build['lc']['id'];
            build = assign_lb_to_build(build, ctgrname, score, lbstats, spd, breakpoints, calcDetails);
        } else if (build['e'] >= 2 && "23001" == build['lc']['id']) {
            breakpoints = ["", "200.1"];
            [score, spd, lbstats, calcDetails] = E2S1_23001_IntheNight(build);
            let ctgrname = 'E2S1_' + build['lc']['id'];
            build = assign_lb_to_build(build, ctgrname, score, lbstats, spd, breakpoints, calcDetails);
        } else if (build['e'] == 1 && "23001" == build['lc']['id']) {
            breakpoints = ["", "160.1", "171.5", "200.1"];
            [score, spd, lbstats, calcDetails] = E1S1_23001_IntheNight(build);
            let ctgrname = 'E1S1_' + build['lc']['id'];
            build = assign_lb_to_build(build, ctgrname, score, lbstats, spd, breakpoints, calcDetails);
        } else if ("23001" == build['lc']['id']) {
            breakpoints = ["", "160.1", "171.5", "200.1"];
            [score, spd, lbstats, calcDetails] = E0S1_23001_IntheNight(build);
            let ctgrname = 'E0S1_' + build['lc']['id'];
            build = assign_lb_to_build(build, ctgrname, score, lbstats, spd, breakpoints, calcDetails);
        } else if ("24001" == build['lc']['id']) {
            breakpoints = ["", "160.1", "171.5", "200.1"];
            [score, spd, lbstats, calcDetails] = E0S5_24001_CruisingintheStellarSea(build);
            let ctgrname = 'E0S5_' + build['lc']['id'];
            build = assign_lb_to_build(build, ctgrname, score, lbstats, spd, breakpoints, calcDetails);
        } else if ("23012" == build['lc']['id']) {
            breakpoints = ["", "160.1", "171.5", "200.1"];
            [score, spd, lbstats, calcDetails] = E0S1_23012_SleepLikeTheDead(build);
            let ctgrname = 'E0S1_' + build['lc']['id'];
            build = assign_lb_to_build(build, ctgrname, score, lbstats, spd, breakpoints, calcDetails);
        } else if ("21010" == build['lc']['id']) {
            breakpoints = ["", "160.1", "171.5", "200.1"];
            [score, spd, lbstats, calcDetails] = E0S5_21010_Swordplay(build);
            let ctgrname = 'E0S5_' + build['lc']['id'];
            build = assign_lb_to_build(build, ctgrname, score, lbstats, spd, breakpoints, calcDetails);
        }

    if (optimizationTarget == "" || (optimizationTarget != "" && optimizationTarget.includes("FX")))
        if (build['e'] >= 2 && "23001" == build['lc']['id'] && build['lc']['s'] >= 3) {
            breakpoints = ["", "200.1"];
            [score, spd, lbstats, calcDetails] = E2S5_23001_IntheNight(build, true);
            let ctgrname = 'E2S5_' + build['lc']['id'] + "FX";
            build = assign_lb_to_build(build, ctgrname, score, lbstats, spd, breakpoints, calcDetails);
        } else if (build['e'] >= 2 && "23001" == build['lc']['id']) {
            breakpoints = ["", "200.1"];
            [score, spd, lbstats, calcDetails] = E2S1_23001_IntheNight(build, true);
            let ctgrname = 'E2S1_' + build['lc']['id'] + "FX";
            build = assign_lb_to_build(build, ctgrname, score, lbstats, spd, breakpoints, calcDetails);
        } else if (build['e'] == 1 && "23001" == build['lc']['id']) {
            breakpoints = ["", "160.1", "171.5", "200.1"];
            [score, spd, lbstats, calcDetails] = E1S1_23001_IntheNight(build, true);
            let ctgrname = 'E1S1_' + build['lc']['id'] + "FX";
            build = assign_lb_to_build(build, ctgrname, score, lbstats, spd, breakpoints, calcDetails);
        } else if ("23001" == build['lc']['id']) {
            breakpoints = ["", "160.1", "171.5", "200.1"];
            [score, spd, lbstats, calcDetails] = E0S1_23001_IntheNight(build, true);
            let ctgrname = 'E0S1_' + build['lc']['id'] + "FX";
            build = assign_lb_to_build(build, ctgrname, score, lbstats, spd, breakpoints, calcDetails);
        } else if ("24001" == build['lc']['id']) {
            breakpoints = ["", "160.1", "171.5", "200.1"];
            [score, spd, lbstats, calcDetails] = E0S5_24001_CruisingintheStellarSea(build, true);
            let ctgrname = 'E0S5_' + build['lc']['id'] + "FX";
            build = assign_lb_to_build(build, ctgrname, score, lbstats, spd, breakpoints, calcDetails);
        } else if ("23012" == build['lc']['id']) {
            breakpoints = ["", "160.1", "171.5", "200.1"];
            [score, spd, lbstats, calcDetails] = E0S1_23012_SleepLikeTheDead(build, true);
            let ctgrname = 'E0S1_' + build['lc']['id'] + "FX";
            build = assign_lb_to_build(build, ctgrname, score, lbstats, spd, breakpoints, calcDetails);
        } else if ("21010" == build['lc']['id']) {
            breakpoints = ["", "160.1", "171.5", "200.1"];
            [score, spd, lbstats, calcDetails] = E0S5_21010_Swordplay(build, true);
            let ctgrname = 'E0S5_' + build['lc']['id'] + "FX";
            build = assign_lb_to_build(build, ctgrname, score, lbstats, spd, breakpoints, calcDetails);
        }


    if (optimizationTarget == "" || (optimizationTarget != "" && optimizationTarget.includes("MONOQ")))
        if (build['e'] >= 2 && "23001" == build['lc']['id'] && build['lc']['s'] >= 3) {
            breakpoints = ["", "200.1"];
            [score, spd, lbstats, calcDetails] = E2S5_23001_IntheNight(build, true, true, true);
            let ctgrname = 'E2S5_' + build['lc']['id'] + "MONOQ";
            build = assign_lb_to_build(build, ctgrname, score, lbstats, spd, breakpoints, calcDetails);
        } else if (build['e'] >= 2 && "23001" == build['lc']['id']) {
            breakpoints = ["", "200.1"];
            [score, spd, lbstats, calcDetails] = E2S1_23001_IntheNight(build, true, true, true);
            let ctgrname = 'E2S1_' + build['lc']['id'] + "MONOQ";
            build = assign_lb_to_build(build, ctgrname, score, lbstats, spd, breakpoints, calcDetails);
        } else if (build['e'] == 1 && "23001" == build['lc']['id']) {
            breakpoints = ["", "160.1", "171.5", "200.1"];
            [score, spd, lbstats, calcDetails] = E1S1_23001_IntheNight(build, true, true, true);
            let ctgrname = 'E1S1_' + build['lc']['id'] + "MONOQ";
            build = assign_lb_to_build(build, ctgrname, score, lbstats, spd, breakpoints, calcDetails);
        } else if ("23001" == build['lc']['id']) {
            breakpoints = ["", "160.1", "171.5", "200.1"];
            [score, spd, lbstats, calcDetails] = E0S1_23001_IntheNight(build, true, true, true);
            let ctgrname = 'E0S1_' + build['lc']['id'] + "MONOQ";
            build = assign_lb_to_build(build, ctgrname, score, lbstats, spd, breakpoints, calcDetails);
        } else if ("24001" == build['lc']['id']) {
            breakpoints = ["", "160.1", "171.5", "200.1"];
            [score, spd, lbstats, calcDetails] = E0S5_24001_CruisingintheStellarSea(build, true, true, true);
            let ctgrname = 'E0S5_' + build['lc']['id'] + "MONOQ";
            build = assign_lb_to_build(build, ctgrname, score, lbstats, spd, breakpoints, calcDetails);
        } else if ("23012" == build['lc']['id']) {
            breakpoints = ["", "160.1", "171.5", "200.1"];
            [score, spd, lbstats, calcDetails] = E0S1_23012_SleepLikeTheDead(build, true, true, true);
            let ctgrname = 'E0S1_' + build['lc']['id'] + "MONOQ";
            build = assign_lb_to_build(build, ctgrname, score, lbstats, spd, breakpoints, calcDetails);
        } else if ("21010" == build['lc']['id']) {
            breakpoints = ["", "160.1", "171.5", "200.1"];
            [score, spd, lbstats, calcDetails] = E0S5_21010_Swordplay(build, true, true, true);
            let ctgrname = 'E0S5_' + build['lc']['id'] + "MONOQ";
            build = assign_lb_to_build(build, ctgrname, score, lbstats, spd, breakpoints, calcDetails);
        }

    if (optimizationTarget == "" || (optimizationTarget != "" && optimizationTarget.includes("FTPMONOQ")))
        if (build['e'] >= 2 && "23001" == build['lc']['id'] && build['lc']['s'] >= 3) {
            breakpoints = ["", "200.1"];
            [score, spd, lbstats, calcDetails] = E2S5_23001_IntheNight(build, true, true, true, true);
            let ctgrname = 'E2S5_' + build['lc']['id'] + "FTPMONOQ";
            build = assign_lb_to_build(build, ctgrname, score, lbstats, spd, breakpoints, calcDetails);
        } else if (build['e'] >= 2 && "23001" == build['lc']['id']) {
            breakpoints = ["", "200.1"];
            [score, spd, lbstats, calcDetails] = E2S1_23001_IntheNight(build, true, true, true, true);
            let ctgrname = 'E2S1_' + build['lc']['id'] + "FTPMONOQ";
            build = assign_lb_to_build(build, ctgrname, score, lbstats, spd, breakpoints, calcDetails);
        } else if (build['e'] == 1 && "23001" == build['lc']['id']) {
            breakpoints = ["", "160.1", "171.5", "200.1"];
            [score, spd, lbstats, calcDetails] = E1S1_23001_IntheNight(build, true, true, true, true);
            let ctgrname = 'E1S1_' + build['lc']['id'] + "FTPMONOQ";
            build = assign_lb_to_build(build, ctgrname, score, lbstats, spd, breakpoints, calcDetails);
        } else if ("23001" == build['lc']['id']) {
            breakpoints = ["", "160.1", "171.5", "200.1"];
            [score, spd, lbstats, calcDetails] = E0S1_23001_IntheNight(build, true, true, true, true);
            let ctgrname = 'E0S1_' + build['lc']['id'] + "FTPMONOQ";
            build = assign_lb_to_build(build, ctgrname, score, lbstats, spd, breakpoints, calcDetails);
        } else if ("24001" == build['lc']['id']) {
            breakpoints = ["", "160.1", "171.5", "200.1"];
            [score, spd, lbstats, calcDetails] = E0S5_24001_CruisingintheStellarSea(build, true, true, true, true);
            let ctgrname = 'E0S5_' + build['lc']['id'] + "FTPMONOQ";
            build = assign_lb_to_build(build, ctgrname, score, lbstats, spd, breakpoints, calcDetails);
        } else if ("23012" == build['lc']['id']) {
            breakpoints = ["", "160.1", "171.5", "200.1"];
            [score, spd, lbstats, calcDetails] = E0S1_23012_SleepLikeTheDead(build, true, true, true, true);
            let ctgrname = 'E0S1_' + build['lc']['id'] + "FTPMONOQ";
            build = assign_lb_to_build(build, ctgrname, score, lbstats, spd, breakpoints, calcDetails);
        } else if ("21010" == build['lc']['id']) {
            breakpoints = ["", "160.1", "171.5", "200.1"];
            [score, spd, lbstats, calcDetails] = E0S5_21010_Swordplay(build, true, true, true, true);
            let ctgrname = 'E0S5_' + build['lc']['id'] + "FTPMONOQ";
            build = assign_lb_to_build(build, ctgrname, score, lbstats, spd, breakpoints, calcDetails);
        }

    for (let key in build.lb) {
        if (key.includes("MONO")) {
            delete build.lb[key];
        }
    }
    return build;
}

function E2S5_23001_IntheNight(build, fuxuan = false, sw = false, hanabi = false, f2p = false) {
    let lc_base_atk = lc_dict_by_id['23001']['atk'];

    let total_base_atk = char_base_atk + lc_base_atk;
    let skill_dmg_mult = 220;
    let ult_dmg_mult = 425;

    let lc_cr_p = 30;

    let hanabi_skill_cd = hanabi ? (f2p ? 68.3424 : 77.328) : 0; // 240CD,
    let hanabi_s5_cd = hanabi && !f2p ? 56 : 0;
    let hanabi_s5_cr = hanabi && !f2p ? 14 : 0;
    let hanabi_randevouz_dmg_bonus = hanabi && f2p ? 24 : 0;
    let hanabi_penacony_dmg_bonus = (hanabi ? 10 : 0) + hanabi_randevouz_dmg_bonus;
    let hanabi_talent_dmg_bonus = hanabi ? (f2p ? 32 : 48) : 0; // 16*3 talen with ULT
    let hanabi_trace_atk_p = hanabi ? 45 : 0;
    let hanabi_E1_atk_p = hanabi && !f2p ? 40 : 0;
    let hanabi_E2_def_ignore = hanabi && !f2p ? 24 : 0;

    let fuxuan_cr = fuxuan ? 12 : 0;
    let fuxuan_cd = fuxuan && !f2p ? 30 : 0;
    let fuxuan_dmg_bonus = fuxuan ? (f2p ? 10 : 19) : 0; // sig 9, penacony 10

    let sw_penacony_dmg_bonus = sw ? 10 : 0;
    let sw_def_ignore = sw ? 61 : 0; // SW ULT 45 + pearls 16
    let sup_res_shred = sw ? 10 : 0; // SW SKILL
    let stats = BuildStatsCalculatorNew({
        build: build,
        base_atk: total_base_atk,
        base_spd: char_base_spd,
        trace_atk_p: 28 + hanabi_trace_atk_p + hanabi_E1_atk_p,
        trace_cd_p: 24 + fuxuan_cd + hanabi_skill_cd + hanabi_s5_cd,
        trace_spd_p: 50,
        trace_cr_p: lc_cr_p + fuxuan_cr + hanabi_s5_cr,
        trace_defshred: hanabi_E2_def_ignore + sw_def_ignore,
        trace_damage_bonus: sw_penacony_dmg_bonus + hanabi_penacony_dmg_bonus + hanabi_talent_dmg_bonus,
    });
    // support stuff
    let sup_damage_bonus = 0;
    let sup_vuln = 0;


    let elemental_dmg = stats.final_qua + fuxuan_dmg_bonus + stats.damage_bonus;
    let stacks = get_itn_stack_count(stats.final_spd)
    let itn_ult_cd_per_stack = 20
    let itn_skill_dmg_per_stack = 10
    let skill_dmg_p = elemental_dmg + stats.skilldmg_p + itn_skill_dmg_per_stack * stacks;
    let ult_dmg_p = elemental_dmg + stats.ultdmg_p;
    let ult_cd = stats.final_cd + itn_ult_cd_per_stack * stacks;

    let skill_buffed_dmg_abv80 = damag.outgoing_dmg_2({
        scaling_attribute: stats.final_atk,
        cr: stats.final_cr,
        cd: stats.final_cd,
        skill_multiplier: skill_dmg_mult,
        def_ignore_p: stats.defignore_p,
        dmg_bonus_p: skill_dmg_p + 80,
        res_shred: 20 + sup_res_shred,
        enemylvl: 95, 'vulnerability': sup_vuln,
    });
    let ult_buffed_dmg_abv80 = damag.outgoing_dmg_2({
        scaling_attribute: stats.final_atk,
        cr: stats.final_cr,
        cd: ult_cd,
        skill_multiplier: ult_dmg_mult,
        def_ignore_p: stats.defignore_p,
        dmg_bonus_p: ult_dmg_p + 80,
        res_shred: 20 + sup_res_shred,
        enemylvl: 95, 'vulnerability': sup_vuln,
    });

    let skill_buffed_dmg_blv80 = damag.outgoing_dmg_2({
        scaling_attribute: stats.final_atk,
        cr: stats.final_cr + 15,
        cd: stats.final_cd,
        skill_multiplier: skill_dmg_mult,
        def_ignore_p: stats.defignore_p,
        dmg_bonus_p: skill_dmg_p + 80,
        res_shred: 20 + sup_res_shred,
        enemylvl: 95, 'vulnerability': sup_vuln,
    });
    let ult_buffed_dmg_blv80 = damag.outgoing_dmg_2({
        scaling_attribute: stats.final_atk,
        cr: stats.final_cr + 15,
        cd: ult_cd,
        skill_multiplier: ult_dmg_mult,
        def_ignore_p: stats.defignore_p,
        dmg_bonus_p: ult_dmg_p + 80,
        res_shred: 20 + sup_res_shred,
        enemylvl: 95, 'vulnerability': sup_vuln,
    });

    let skill = skill_buffed_dmg_abv80 * 0.2 + skill_buffed_dmg_blv80 * 0.8
    let ult = ult_buffed_dmg_abv80 * 0.2 + ult_buffed_dmg_blv80 * 0.8
    let score = 4 * skill + ult

    let stats_display = BuildStatsCalculatorNew({
        build: build,
        base_atk: total_base_atk,
        base_spd: char_base_spd,
        trace_atk_p: 28,
        trace_cd_p: 24,
        trace_cr_p: lc_cr_p,
        count_conditionals: false,
    });
    let lbstats = [
        ["ATK", String(Math.floor(stats_display.final_atk))],
        ["CR", damag.trim_after_decimal(stats_display.final_cr) + "%"],
        ["CD", damag.trim_after_decimal(stats_display.final_cd) + "%"],
        ["Qua", damag.trim_after_decimal(stats_display.final_qua)],
        ["SPD", damag.trim_after_decimal(stats_display.final_spd)]
    ];
    let calcDetails = [
        ["Skill weighted avg", String(Math.floor(skill))],
        ["Over 80% / under", String(Math.floor(skill_buffed_dmg_abv80)) + ' / ' + String(Math.floor(skill_buffed_dmg_blv80))],
        ["ULT weighted avg", String(Math.floor(ult))],
        ["Over 80% / under", String(Math.floor(ult_buffed_dmg_abv80)) + ' / ' + String(Math.floor(ult_buffed_dmg_blv80))],
        ["SPD After 2 Skill", damag.trim_after_decimal(stats.final_spd)],
    ];
    if (fuxuan) {
        if (f2p) {
            calcDetails.unshift(["E0 Penacony Fu Xuan (no sig)", ""]);
        } else {
            calcDetails.unshift(["E1S1 Sig Penacony Fu Xuan", ""]);
        }
    }
    if (sw) {
        calcDetails.unshift(["E0S5 Pearls Penacony SW (bugs ignored)", ""]);
    }
    if (hanabi) {
        if (f2p) {
            calcDetails.unshift(["E0S5 208CD Randevouz Penacony Hanabi (72% skill uptime, 2/3 ULT uptime)", ""]);
        } else {
            calcDetails.unshift(["E2S5 260CD Sig Penacony Hanabi (72% skill uptime)", ""]);
        }
    }


    return [Math.floor(score), stats.final_spd, lbstats, calcDetails];

}



function E2S1_23001_IntheNight(build, fuxuan = false, sw = false, hanabi = false, f2p = false) {
    let lc_base_atk = lc_dict_by_id['23001']['atk'];

    let total_base_atk = char_base_atk + lc_base_atk;
    let skill_dmg_mult = 220;
    let ult_dmg_mult = 425;


    let lc_cr_p = 18;
    let hanabi_skill_cd = hanabi ? (f2p ? 68.3424 : 73.872) : 0; // 240CD,
    let hanabi_s5_cd = hanabi && !f2p ? 28 : 0;
    let hanabi_s5_cr = hanabi && !f2p ? 10 : 0;
    let hanabi_randevouz_dmg_bonus = hanabi && f2p ? 24 : 0;
    let hanabi_penacony_dmg_bonus = (hanabi ? 10 : 0) + hanabi_randevouz_dmg_bonus;
    let hanabi_talent_dmg_bonus = hanabi ? (f2p ? 32 : 48) : 0; // 16*3 talen with ULT
    let hanabi_trace_atk_p = hanabi ? 45 : 0;
    let hanabi_E1_atk_p = hanabi && !f2p ? 40 : 0;
    let hanabi_E2_def_ignore = hanabi && !f2p ? 24 : 0;

    let fuxuan_cr = fuxuan ? 12 : 0;
    let fuxuan_cd = fuxuan && !f2p ? 30 : 0;
    let fuxuan_dmg_bonus = fuxuan ? (f2p ? 10 : 19) : 0; // sig 9, penacony 10

    let sw_penacony_dmg_bonus = sw ? 10 : 0;
    let sw_def_ignore = sw ? 61 : 0; // SW ULT 45 + pearls 16
    let sup_res_shred = sw ? 10 : 0; // SW SKILL
    let stats = BuildStatsCalculatorNew({
        build: build,
        base_atk: total_base_atk,
        base_spd: char_base_spd,
        trace_atk_p: 28 + hanabi_trace_atk_p + hanabi_E1_atk_p,
        trace_cd_p: 24 + fuxuan_cd + hanabi_skill_cd + hanabi_s5_cd,
        trace_spd_p: 50,
        trace_cr_p: lc_cr_p + fuxuan_cr + hanabi_s5_cr,
        trace_defshred: hanabi_E2_def_ignore + sw_def_ignore,
        trace_damage_bonus: sw_penacony_dmg_bonus + hanabi_penacony_dmg_bonus + hanabi_talent_dmg_bonus,
    });


    let elemental_dmg = stats.final_qua + fuxuan_dmg_bonus + stats.damage_bonus;
    let stacks = get_itn_stack_count(stats.final_spd)
    let itn_ult_cd_per_stack = 12
    let itn_skill_dmg_per_stack = 6
    let skill_dmg_p = elemental_dmg + stats.skilldmg_p + itn_skill_dmg_per_stack * stacks;
    let ult_dmg_p = elemental_dmg + stats.ultdmg_p;
    let ult_cd = stats.final_cd + itn_ult_cd_per_stack * stacks;

    let skill_buffed_dmg_abv80 = damag.outgoing_dmg_2({
        scaling_attribute: stats.final_atk,
        cr: stats.final_cr,
        cd: stats.final_cd,
        skill_multiplier: skill_dmg_mult,
        def_ignore_p: stats.defignore_p,
        dmg_bonus_p: skill_dmg_p + 80,
        res_shred: 20 + sup_res_shred,
        enemylvl: 95
    });
    let ult_buffed_dmg_abv80 = damag.outgoing_dmg_2({
        scaling_attribute: stats.final_atk,
        cr: stats.final_cr,
        cd: ult_cd,
        skill_multiplier: ult_dmg_mult,
        def_ignore_p: stats.defignore_p,
        dmg_bonus_p: ult_dmg_p + 80,
        res_shred: 20 + sup_res_shred,
        enemylvl: 95
    });

    let skill_buffed_dmg_blv80 = damag.outgoing_dmg_2({
        scaling_attribute: stats.final_atk,
        cr: stats.final_cr + 15,
        cd: stats.final_cd,
        skill_multiplier: skill_dmg_mult,
        def_ignore_p: stats.defignore_p,
        dmg_bonus_p: skill_dmg_p + 80,
        res_shred: 20 + sup_res_shred,
        enemylvl: 95
    });
    let ult_buffed_dmg_blv80 = damag.outgoing_dmg_2({
        scaling_attribute: stats.final_atk,
        cr: stats.final_cr + 15,
        cd: ult_cd,
        skill_multiplier: ult_dmg_mult,
        def_ignore_p: stats.defignore_p,
        dmg_bonus_p: ult_dmg_p + 80,
        res_shred: 20 + sup_res_shred,
        enemylvl: 95
    });

    let skill = skill_buffed_dmg_abv80 * 0.2 + skill_buffed_dmg_blv80 * 0.8
    let ult = ult_buffed_dmg_abv80 * 0.2 + ult_buffed_dmg_blv80 * 0.8
    let score = 4 * skill + ult


    let stats_display = BuildStatsCalculatorNew({
        build: build,
        base_atk: total_base_atk,
        base_spd: char_base_spd,
        trace_atk_p: 28,
        trace_cd_p: 24,
        trace_cr_p: lc_cr_p,
        count_conditionals: false,
    });
    let lbstats = [
        ["ATK", String(Math.floor(stats_display.final_atk))],
        ["CR", damag.trim_after_decimal(stats_display.final_cr) + "%"],
        ["CD", damag.trim_after_decimal(stats_display.final_cd) + "%"],
        ["Qua", damag.trim_after_decimal(stats_display.final_qua)],
        ["SPD", damag.trim_after_decimal(stats_display.final_spd)]
    ];
    let calcDetails = [
        ["Skill weighted avg", String(Math.floor(skill))],
        ["Over 80% / under", String(Math.floor(skill_buffed_dmg_abv80)) + ' / ' + String(Math.floor(skill_buffed_dmg_blv80))],
        ["ULT weighted avg", String(Math.floor(ult))],
        ["Over 80% / under", String(Math.floor(ult_buffed_dmg_abv80)) + ' / ' + String(Math.floor(ult_buffed_dmg_blv80))],
        ["SPD After 2 Skill", damag.trim_after_decimal(stats.final_spd)],
    ];
    if (fuxuan) {
        if (f2p) {
            calcDetails.unshift(["E0 Penacony Fu Xuan (no sig)", ""]);
        } else {
            calcDetails.unshift(["E1S1 Sig Penacony Fu Xuan", ""]);
        }
    }
    if (sw) {
        calcDetails.unshift(["E0S5 Pearls Penacony SW (bugs ignored)", ""]);
    }
    if (hanabi) {
        if (f2p) {
            calcDetails.unshift(["E0S5 208CD Randevouz Penacony Hanabi (72% skill uptime, 2/3 ULT uptime)", ""]);
        } else {
            calcDetails.unshift(["E2S1 240CD Sig Penacony Hanabi (72% skill uptime)", ""]);
        }
    }


    return [Math.floor(score), stats.final_spd, lbstats, calcDetails];

}



function E1S1_23001_IntheNight(build, fuxuan = false, sw = false, hanabi = false, f2p = false) {
    let lc_base_atk = lc_dict_by_id['23001']['atk'];

    let total_base_atk = char_base_atk + lc_base_atk;
    let skill_dmg_mult = 220;
    let ult_dmg_mult = 425;

    let lc_cr_p = 18;
    let hanabi_skill_cd = hanabi ? (f2p ? 68.3424 : 73.872) : 0; // 240CD,
    let hanabi_s5_cd = hanabi && !f2p ? 28 : 0;
    let hanabi_s5_cr = hanabi && !f2p ? 10 : 0;
    let hanabi_randevouz_dmg_bonus = hanabi && f2p ? 24 : 0;
    let hanabi_penacony_dmg_bonus = (hanabi ? 10 : 0) + hanabi_randevouz_dmg_bonus;
    let hanabi_talent_dmg_bonus = hanabi ? (f2p ? 32 : 48) : 0; // 16*3 talen with ULT
    let hanabi_trace_atk_p = hanabi ? 45 : 0;
    let hanabi_E1_atk_p = hanabi && !f2p ? 40 : 0;
    let hanabi_E2_def_ignore = hanabi && !f2p ? 24 : 0;

    let fuxuan_cr = fuxuan ? 12 : 0;
    let fuxuan_cd = fuxuan && !f2p ? 30 : 0;
    let fuxuan_dmg_bonus = fuxuan ? (f2p ? 10 : 19) : 0; // sig 9, penacony 10

    let sw_penacony_dmg_bonus = sw ? 10 : 0;
    let sw_def_ignore = sw ? 61 : 0; // SW ULT 45 + pearls 16
    let sup_res_shred = sw ? 10 : 0; // SW SKILL
    let stats = BuildStatsCalculatorNew({
        build: build,
        base_atk: total_base_atk,
        base_spd: char_base_spd,
        trace_atk_p: 28 + hanabi_trace_atk_p + hanabi_E1_atk_p,
        trace_cd_p: 24 + fuxuan_cd + hanabi_skill_cd + hanabi_s5_cd,
        trace_spd_p: 25,
        trace_cr_p: lc_cr_p + fuxuan_cr + hanabi_s5_cr,
        trace_defshred: hanabi_E2_def_ignore + sw_def_ignore,
        trace_damage_bonus: sw_penacony_dmg_bonus + hanabi_penacony_dmg_bonus + hanabi_talent_dmg_bonus,
    });


    let elemental_dmg = stats.final_qua + fuxuan_dmg_bonus + stats.damage_bonus;
    let stacks = get_itn_stack_count(stats.final_spd)
    let itn_ult_cd_per_stack = 12
    let itn_skill_dmg_per_stack = 6
    let skill_dmg_p = elemental_dmg + stats.skilldmg_p + itn_skill_dmg_per_stack * stacks;
    let ult_dmg_p = elemental_dmg + stats.ultdmg_p;
    let ult_cd = stats.final_cd + itn_ult_cd_per_stack * stacks;

    let skill_buffed_dmg_abv80 = damag.outgoing_dmg_2({
        scaling_attribute: stats.final_atk,
        cr: stats.final_cr,
        cd: stats.final_cd,
        skill_multiplier: skill_dmg_mult,
        def_ignore_p: stats.defignore_p,
        dmg_bonus_p: skill_dmg_p + 80,
        res_shred: 20 + sup_res_shred,
        enemylvl: 95
    });
    let ult_buffed_dmg_abv80 = damag.outgoing_dmg_2({
        scaling_attribute: stats.final_atk,
        cr: stats.final_cr,
        cd: ult_cd,
        skill_multiplier: ult_dmg_mult,
        def_ignore_p: stats.defignore_p,
        dmg_bonus_p: ult_dmg_p + 80,
        res_shred: 20 + sup_res_shred,
        enemylvl: 95
    });

    let skill_buffed_dmg_blv80 = damag.outgoing_dmg_2({
        scaling_attribute: stats.final_atk,
        cr: stats.final_cr + 15,
        cd: stats.final_cd,
        skill_multiplier: skill_dmg_mult,
        def_ignore_p: stats.defignore_p,
        dmg_bonus_p: skill_dmg_p + 80,
        res_shred: 20 + sup_res_shred,
        enemylvl: 95
    });
    let ult_buffed_dmg_blv80 = damag.outgoing_dmg_2({
        scaling_attribute: stats.final_atk,
        cr: stats.final_cr + 15,
        cd: ult_cd,
        skill_multiplier: ult_dmg_mult,
        def_ignore_p: stats.defignore_p,
        dmg_bonus_p: ult_dmg_p + 80,
        res_shred: 20 + sup_res_shred,
        enemylvl: 95
    });

    let skill = skill_buffed_dmg_abv80 * 0.2 + skill_buffed_dmg_blv80 * 0.8
    let ult = ult_buffed_dmg_abv80 * 0.2 + ult_buffed_dmg_blv80 * 0.8
    let score = 4 * skill + ult;

    let stats_display = BuildStatsCalculatorNew({
        build: build,
        base_atk: total_base_atk,
        base_spd: char_base_spd,
        trace_atk_p: 28,
        trace_cd_p: 24,
        trace_cr_p: lc_cr_p,
        count_conditionals: false,
    });
    let lbstats = [
        ["ATK", String(Math.floor(stats_display.final_atk))],
        ["CR", damag.trim_after_decimal(stats_display.final_cr) + "%"],
        ["CD", damag.trim_after_decimal(stats_display.final_cd) + "%"],
        ["Qua", damag.trim_after_decimal(stats_display.final_qua)],
        ["SPD", damag.trim_after_decimal(stats_display.final_spd)]
    ];
    let calcDetails = [
        ["Skill weighted avg", String(Math.floor(skill))],
        ["Over 80% / under", String(Math.floor(skill_buffed_dmg_abv80)) + ' / ' + String(Math.floor(skill_buffed_dmg_blv80))],
        ["ULT weighted avg", String(Math.floor(ult))],
        ["Over 80% / under", String(Math.floor(ult_buffed_dmg_abv80)) + ' / ' + String(Math.floor(ult_buffed_dmg_blv80))],
        ["Stacks", String(Math.floor(stacks))],
        ["SPD After Skill", damag.trim_after_decimal(stats.final_spd)]
    ];
    if (fuxuan) {
        if (f2p) {
            calcDetails.unshift(["E0 Penacony Fu Xuan (no sig)", ""]);
        } else {
            calcDetails.unshift(["E1S1 Sig Penacony Fu Xuan", ""]);
        }
    }
    if (sw) {
        calcDetails.unshift(["E0S5 Pearls Penacony SW (bugs ignored)", ""]);
    }
    if (hanabi) {
        if (f2p) {
            calcDetails.unshift(["E0S5 208CD Randevouz Penacony Hanabi (72% skill uptime, 2/3 ULT uptime)", ""]);
        } else {
            calcDetails.unshift(["E2S1 240CD Sig Penacony Hanabi (72% skill uptime)", ""]);
        }
    }


    return [Math.floor(score), stats.final_spd, lbstats, calcDetails];

}


function E0S1_23001_IntheNight(build, fuxuan = false, sw = false, hanabi = false, f2p = false) {
    let lc_base_atk = lc_dict_by_id['23001']['atk'];

    let total_base_atk = char_base_atk + lc_base_atk;
    let skill_dmg_mult = 220;
    let ult_dmg_mult = 425;

    let lc_cr_p = 18;
    let hanabi_skill_cd = hanabi ? (f2p ? 68.3424 : 73.872) : 0; // 240CD,
    let hanabi_s5_cd = hanabi && !f2p ? 28 : 0;
    let hanabi_s5_cr = hanabi && !f2p ? 10 : 0;
    let hanabi_randevouz_dmg_bonus = hanabi && f2p ? 24 : 0;
    let hanabi_penacony_dmg_bonus = (hanabi ? 10 : 0) + hanabi_randevouz_dmg_bonus;
    let hanabi_talent_dmg_bonus = hanabi ? (f2p ? 32 : 48) : 0; // 16*3 talen with ULT
    let hanabi_trace_atk_p = hanabi ? 45 : 0;
    let hanabi_E1_atk_p = hanabi && !f2p ? 40 : 0;
    let hanabi_E2_def_ignore = hanabi && !f2p ? 24 : 0;

    let fuxuan_cr = fuxuan ? 12 : 0;
    let fuxuan_cd = fuxuan && !f2p ? 30 : 0;
    let fuxuan_dmg_bonus = fuxuan ? (f2p ? 10 : 19) : 0; // sig 9, penacony 10

    let sw_penacony_dmg_bonus = sw ? 10 : 0;
    let sw_def_ignore = sw ? 61 : 0; // SW ULT 45 + pearls 16
    let sup_res_shred = sw ? 10 : 0; // SW SKILL
    let stats = BuildStatsCalculatorNew({
        build: build,
        base_atk: total_base_atk,
        base_spd: char_base_spd,
        trace_atk_p: 28 + hanabi_trace_atk_p + hanabi_E1_atk_p,
        trace_cd_p: 24 + fuxuan_cd + hanabi_skill_cd + hanabi_s5_cd,
        trace_spd_p: 25,
        trace_cr_p: lc_cr_p + fuxuan_cr + hanabi_s5_cr,
        trace_defshred: hanabi_E2_def_ignore + sw_def_ignore,
        trace_damage_bonus: sw_penacony_dmg_bonus + hanabi_penacony_dmg_bonus + hanabi_talent_dmg_bonus,
    });


    let elemental_dmg = stats.final_qua + fuxuan_dmg_bonus + stats.damage_bonus;
    let stacks = get_itn_stack_count(stats.final_spd)
    let itn_ult_cd_per_stack = 12
    let itn_skill_dmg_per_stack = 6
    let skill_dmg_p = elemental_dmg + stats.skilldmg_p + itn_skill_dmg_per_stack * stacks;
    let ult_dmg_p = elemental_dmg + stats.ultdmg_p;
    let ult_cd = stats.final_cd + itn_ult_cd_per_stack * stacks;

    let skill_buffed_dmg = damag.outgoing_dmg_2({
        scaling_attribute: stats.final_atk,
        cr: stats.final_cr,
        cd: stats.final_cd,
        skill_multiplier: skill_dmg_mult,
        def_ignore_p: stats.defignore_p,
        dmg_bonus_p: skill_dmg_p + 80,
        res_shred: 20 + sup_res_shred,
        enemylvl: 95
    });
    let ult_buffed_dmg = damag.outgoing_dmg_2({
        scaling_attribute: stats.final_atk,
        cr: stats.final_cr,
        cd: ult_cd,
        skill_multiplier: ult_dmg_mult,
        def_ignore_p: stats.defignore_p,
        dmg_bonus_p: ult_dmg_p + 80,
        res_shred: 20 + sup_res_shred,
        enemylvl: 95
    })

    let score = 4 * skill_buffed_dmg + ult_buffed_dmg


    let stats_display = BuildStatsCalculatorNew({
        build: build,
        base_atk: total_base_atk,
        base_spd: char_base_spd,
        trace_atk_p: 28,
        trace_cd_p: 24,
        trace_cr_p: lc_cr_p,
        count_conditionals: false,
    });
    let lbstats = [
        ["ATK", String(Math.floor(stats_display.final_atk))],
        ["CR", damag.trim_after_decimal(stats_display.final_cr) + "%"],
        ["CD", damag.trim_after_decimal(stats_display.final_cd) + "%"],
        ["Qua", damag.trim_after_decimal(stats_display.final_qua)],
        ["SPD", damag.trim_after_decimal(stats_display.final_spd)]
    ];
    let calcDetails = [
        ["Skill average", String(Math.floor(skill_buffed_dmg))],
        ["ULT average", String(Math.floor(ult_buffed_dmg))],
        ["Stacks", String(Math.floor(stacks))],
        ["SPD After Skill", damag.trim_after_decimal(stats.final_spd)]
    ];
    if (fuxuan) {
        if (f2p) {
            calcDetails.unshift(["E0 Penacony Fu Xuan (no sig)", ""]);
        } else {
            calcDetails.unshift(["E1S1 Sig Penacony Fu Xuan", ""]);
        }
    }
    if (sw) {
        calcDetails.unshift(["E0S5 Pearls Penacony SW (bugs ignored)", ""]);
    }
    if (hanabi) {
        if (f2p) {
            calcDetails.unshift(["E0S5 208CD Randevouz Penacony Hanabi (72% skill uptime, 2/3 ULT uptime)", ""]);
        } else {
            calcDetails.unshift(["E2S1 240CD Sig Penacony Hanabi (72% skill uptime)", ""]);
        }
    }


    return [Math.floor(score), stats.final_spd, lbstats, calcDetails];

}


function get_itn_stack_count(spd) {
    if (spd >= 160) return 6;
    var remainder_100s = spd % 100;
    var stacks = Math.min(Math.max(Math.floor(remainder_100s / 10), 0), 6);
    return stacks;
}


function E0S5_21010_Swordplay(build, fuxuan = false, sw = false, hanabi = false, f2p = false) {
    let lc_base_atk = lc_dict_by_id['21010']['atk'];

    let total_base_atk = char_base_atk + lc_base_atk;
    let skill_dmg_mult = 220;
    let ult_dmg_mult = 425;

    let lc_atk_p = 0;
    let lc_damage_bonus = 80;
    let lc_cr_p = 0;

    let hanabi_skill_cd = hanabi ? (f2p ? 68.3424 : 73.872) : 0; // 240CD,
    let hanabi_s5_cd = hanabi && !f2p ? 28 : 0;
    let hanabi_s5_cr = hanabi && !f2p ? 10 : 0;
    let hanabi_randevouz_dmg_bonus = hanabi && f2p ? 24 : 0;
    let hanabi_penacony_dmg_bonus = (hanabi ? 10 : 0) + hanabi_randevouz_dmg_bonus;
    let hanabi_talent_dmg_bonus = hanabi ? (f2p ? 32 : 48) : 0; // 16*3 talen with ULT
    let hanabi_trace_atk_p = hanabi ? 45 : 0;
    let hanabi_E1_atk_p = hanabi && !f2p ? 40 : 0;
    let hanabi_E2_def_ignore = hanabi && !f2p ? 24 : 0;

    let fuxuan_cr = fuxuan ? 12 : 0;
    let fuxuan_cd = fuxuan && !f2p ? 30 : 0;
    let fuxuan_dmg_bonus = fuxuan ? (f2p ? 10 : 19) : 0; // sig 9, penacony 10

    let sw_penacony_dmg_bonus = sw ? 10 : 0;
    let sw_def_ignore = sw ? 61 : 0; // SW ULT 45 + pearls 16
    let sup_res_shred = sw ? 10 : 0; // SW SKILL
    let stats = BuildStatsCalculatorNew({
        build: build,
        base_atk: total_base_atk,
        base_spd: char_base_spd,
        trace_atk_p: 28 + hanabi_trace_atk_p + hanabi_E1_atk_p,
        trace_cd_p: 24 + fuxuan_cd + hanabi_skill_cd + hanabi_s5_cd,
        trace_spd_p: 25,
        trace_cr_p: lc_cr_p + fuxuan_cr + hanabi_s5_cr,
        trace_defshred: hanabi_E2_def_ignore + sw_def_ignore,
        trace_damage_bonus: sw_penacony_dmg_bonus + hanabi_penacony_dmg_bonus + hanabi_talent_dmg_bonus + lc_damage_bonus,
    });


    let elemental_dmg = stats.final_qua + fuxuan_dmg_bonus + stats.damage_bonus;
    let skill_dmg_p = elemental_dmg + stats.skilldmg_p
    let ult_dmg_p = elemental_dmg + stats.ultdmg_p;

    let skill_buffed_dmg = damag.outgoing_dmg_2({
        scaling_attribute: stats.final_atk,
        cr: stats.final_cr,
        cd: stats.final_cd,
        skill_multiplier: skill_dmg_mult,
        def_ignore_p: stats.defignore_p,
        dmg_bonus_p: skill_dmg_p + 80,
        res_shred: 20 + sup_res_shred,
        enemylvl: 95
    });
    let ult_buffed_dmg = damag.outgoing_dmg_2({
        scaling_attribute: stats.final_atk,
        cr: stats.final_cr,
        cd: stats.final_cd,
        skill_multiplier: ult_dmg_mult,
        def_ignore_p: stats.defignore_p,
        dmg_bonus_p: ult_dmg_p + 80,
        res_shred: 20 + sup_res_shred,
        enemylvl: 95
    })

    let score = 4 * skill_buffed_dmg + ult_buffed_dmg

    let stats_display = BuildStatsCalculatorNew({
        build: build,
        base_atk: total_base_atk,
        base_spd: char_base_spd,
        trace_atk_p: 28,
        trace_cd_p: 24,
        count_conditionals: false,
    });
    let lbstats = [
        ["ATK", String(Math.floor(stats_display.final_atk))],
        ["CR", damag.trim_after_decimal(stats_display.final_cr) + "%"],
        ["CD", damag.trim_after_decimal(stats_display.final_cd) + "%"],
        ["Qua", damag.trim_after_decimal(stats_display.final_qua)],
        ["SPD", damag.trim_after_decimal(stats_display.final_spd)]
    ];
    let calcDetails = [
        ["Assumes 5 LC stacks", ""],
        ["Skill average", String(Math.floor(skill_buffed_dmg))],
        ["ULT average", String(Math.floor(ult_buffed_dmg))],
        ["SPD After Skill", damag.trim_after_decimal(stats.final_spd)]
    ];
    if (fuxuan) {
        if (f2p) {
            calcDetails.unshift(["E0 Penacony Fu Xuan (no sig)", ""]);
        } else {
            calcDetails.unshift(["E1S1 Sig Penacony Fu Xuan", ""]);
        }
    }
    if (sw) {
        calcDetails.unshift(["E0S5 Pearls Penacony SW (bugs ignored)", ""]);
    }
    if (hanabi) {
        if (f2p) {
            calcDetails.unshift(["E0S5 208CD Randevouz Penacony Hanabi (72% skill uptime, 2/3 ULT uptime)", ""]);
        } else {
            calcDetails.unshift(["E2S1 240CD Sig Penacony Hanabi (72% skill uptime)", ""]);
        }
    }


    return [Math.floor(score), stats.final_spd, lbstats, calcDetails];

}



function E0S5_24001_CruisingintheStellarSea(build, fuxuan = false, sw = false, hanabi = false, f2p = false) {
    let lc_base_atk = lc_dict_by_id['24001']['atk'];

    let total_base_atk = char_base_atk + lc_base_atk;
    let skill_dmg_mult = 220;
    let ult_dmg_mult = 425;

    let lc_atk_p = 24;
    let lc_cr_p = 16;
    let hanabi_skill_cd = hanabi ? (f2p ? 68.3424 : 73.872) : 0; // 240CD,
    let hanabi_s5_cd = hanabi && !f2p ? 28 : 0;
    let hanabi_s5_cr = hanabi && !f2p ? 10 : 0;
    let hanabi_randevouz_dmg_bonus = hanabi && f2p ? 24 : 0;
    let hanabi_penacony_dmg_bonus = (hanabi ? 10 : 0) + hanabi_randevouz_dmg_bonus;
    let hanabi_talent_dmg_bonus = hanabi ? (f2p ? 32 : 48) : 0; // 16*3 talen with ULT
    let hanabi_trace_atk_p = hanabi ? 45 : 0;
    let hanabi_E1_atk_p = hanabi && !f2p ? 40 : 0;
    let hanabi_E2_def_ignore = hanabi && !f2p ? 24 : 0;

    let fuxuan_cr = fuxuan ? 12 : 0;
    let fuxuan_cd = fuxuan && !f2p ? 30 : 0;
    let fuxuan_dmg_bonus = fuxuan ? (f2p ? 10 : 19) : 0; // sig 9, penacony 10

    let sw_penacony_dmg_bonus = sw ? 10 : 0;
    let sw_def_ignore = sw ? 61 : 0; // SW ULT 45 + pearls 16
    let sup_res_shred = sw ? 10 : 0; // SW SKILL
    let stats = BuildStatsCalculatorNew({
        build: build,
        base_atk: total_base_atk,
        base_spd: char_base_spd,
        trace_atk_p: 28 + hanabi_trace_atk_p + hanabi_E1_atk_p + lc_atk_p,
        trace_cd_p: 24 + fuxuan_cd + hanabi_skill_cd + hanabi_s5_cd,
        trace_spd_p: 25,
        trace_cr_p: lc_cr_p + fuxuan_cr + hanabi_s5_cr,
        trace_defshred: hanabi_E2_def_ignore + sw_def_ignore,
        trace_damage_bonus: sw_penacony_dmg_bonus + hanabi_penacony_dmg_bonus + hanabi_talent_dmg_bonus,
    });


    let elemental_dmg = stats.final_qua + fuxuan_dmg_bonus + stats.damage_bonus;
    let skill_dmg_p = elemental_dmg + stats.skilldmg_p
    let ult_dmg_p = elemental_dmg + stats.ultdmg_p;

    let skill_buffed_dmg_abv50 = damag.outgoing_dmg_2({
        scaling_attribute: stats.final_atk,
        cr: stats.final_cr,
        cd: stats.final_cd,
        skill_multiplier: skill_dmg_mult,
        def_ignore_p: stats.defignore_p,
        dmg_bonus_p: skill_dmg_p + 80,
        res_shred: 20 + sup_res_shred,
        enemylvl: 95
    });
    let ult_buffed_dmg_abv50 = damag.outgoing_dmg_2({
        scaling_attribute: stats.final_atk,
        cr: stats.final_cr,
        cd: stats.final_cd,
        skill_multiplier: ult_dmg_mult,
        def_ignore_p: stats.defignore_p,
        dmg_bonus_p: ult_dmg_p + 80,
        res_shred: 20 + sup_res_shred,
        enemylvl: 95
    })

    let skill_buffed_dmg_blv50 = damag.outgoing_dmg_2({
        scaling_attribute: stats.final_atk,
        cr: stats.final_cr + 16,
        cd: stats.final_cd,
        skill_multiplier: skill_dmg_mult,
        def_ignore_p: stats.defignore_p,
        dmg_bonus_p: skill_dmg_p + 80,
        res_shred: 20 + sup_res_shred,
        enemylvl: 95
    });
    let ult_buffed_dmg_blv50 = damag.outgoing_dmg_2({
        scaling_attribute: stats.final_atk,
        cr: stats.final_cr + 16,
        cd: stats.final_cd,
        skill_multiplier: ult_dmg_mult,
        def_ignore_p: stats.defignore_p,
        dmg_bonus_p: ult_dmg_p + 80,
        res_shred: 20 + sup_res_shred,
        enemylvl: 95
    })

    let skill_avg = (0.55 * skill_buffed_dmg_abv50 + 0.45 * skill_buffed_dmg_blv50)
    let ult_avg = (0.55 * ult_buffed_dmg_abv50 + 0.45 * ult_buffed_dmg_blv50)
    let score = 4 * skill_avg + ult_avg

    let stats_display = BuildStatsCalculatorNew({
        build: build,
        base_atk: total_base_atk,
        base_spd: char_base_spd,
        trace_atk_p: 28,
        trace_cd_p: 24,
        trace_cr_p: 16,
        count_conditionals: false,
    });
    let lbstats = [
        ["ATK", String(Math.floor(stats_display.final_atk))],
        ["CR", damag.trim_after_decimal(stats_display.final_cr) + "%"],
        ["CD", damag.trim_after_decimal(stats_display.final_cd) + "%"],
        ["Qua", damag.trim_after_decimal(stats_display.final_qua)],
        ["SPD", damag.trim_after_decimal(stats_display.final_spd)]
    ];
    let calcDetails = [
        ["LC's ATK uptime", "60%"],
        ["Skill weighted average", String(Math.floor(skill_avg))],
        ["0.55×Over 50% HP + 0.45×Under", "0.55×" + String(Math.floor(skill_buffed_dmg_abv50)) + ' + ' + "0.45×" + String(Math.floor(skill_buffed_dmg_blv50))],
        ["ULT weighted average", String(Math.floor(ult_avg))],
        ["0.55×Over 50% + 0.45×under", "0.55×" + String(Math.floor(ult_buffed_dmg_abv50)) + ' + ' + "0.45×" + String(Math.floor(ult_buffed_dmg_blv50))],

        ["SPD After Skill", damag.trim_after_decimal(stats.final_spd)]
    ];
    if (fuxuan) {
        if (f2p) {
            calcDetails.unshift(["E0 Penacony Fu Xuan (no sig)", ""]);
        } else {
            calcDetails.unshift(["E1S1 Sig Penacony Fu Xuan", ""]);
        }
    }
    if (sw) {
        calcDetails.unshift(["E0S5 Pearls Penacony SW (bugs ignored)", ""]);
    }
    if (hanabi) {
        if (f2p) {
            calcDetails.unshift(["E0S5 208CD Randevouz Penacony Hanabi (72% skill uptime, 2/3 ULT uptime)", ""]);
        } else {
            calcDetails.unshift(["E2S1 240CD Sig Penacony Hanabi (72% skill uptime)", ""]);
        }
    }


    return [Math.floor(score), stats.final_spd, lbstats, calcDetails];

}


function E0S1_23012_SleepLikeTheDead(build, fuxuan = false, sw = false, hanabi = false, f2p = false) {
    let lc_base_atk = lc_dict_by_id['23012']['atk'];

    let total_base_atk = char_base_atk + lc_base_atk;
    let skill_dmg_mult = 220;
    let ult_dmg_mult = 425;

    let hanabi_skill_cd = hanabi ? (f2p ? 68.3424 : 73.872) : 0; // 240CD,
    let hanabi_s5_cd = hanabi && !f2p ? 28 : 0;
    let hanabi_s5_cr = hanabi && !f2p ? 10 : 0;
    let hanabi_randevouz_dmg_bonus = hanabi && f2p ? 24 : 0;
    let hanabi_penacony_dmg_bonus = (hanabi ? 10 : 0) + hanabi_randevouz_dmg_bonus;
    let hanabi_talent_dmg_bonus = hanabi ? (f2p ? 32 : 48) : 0; // 16*3 talen with ULT
    let hanabi_trace_atk_p = hanabi ? 45 : 0;
    let hanabi_E1_atk_p = hanabi && !f2p ? 40 : 0;
    let hanabi_E2_def_ignore = hanabi && !f2p ? 24 : 0;

    let fuxuan_cr = fuxuan ? 12 : 0;
    let fuxuan_cd = fuxuan && !f2p ? 30 : 0;
    let fuxuan_dmg_bonus = fuxuan ? (f2p ? 10 : 19) : 0; // sig 9, penacony 10

    let sw_penacony_dmg_bonus = sw ? 10 : 0;
    let sw_def_ignore = sw ? 61 : 0; // SW ULT 45 + pearls 16
    let sup_res_shred = sw ? 10 : 0; // SW SKILL
    let stats_sltd_off = BuildStatsCalculatorNew({
        build: build,
        base_atk: total_base_atk,
        base_spd: char_base_spd,
        trace_atk_p: 28 + hanabi_trace_atk_p + hanabi_E1_atk_p,
        trace_cd_p: 24 + fuxuan_cd + hanabi_skill_cd + hanabi_s5_cd,
        trace_spd_p: 25,
        trace_cr_p: fuxuan_cr + hanabi_s5_cr,
        trace_defshred: hanabi_E2_def_ignore + sw_def_ignore,
        trace_damage_bonus: sw_penacony_dmg_bonus + hanabi_penacony_dmg_bonus + hanabi_talent_dmg_bonus,
    });
    let sltd_cr = 36;
    let stats_sltd_on = BuildStatsCalculatorNew({
        build: build,
        base_atk: total_base_atk,
        base_spd: char_base_spd,
        trace_atk_p: 28 + hanabi_trace_atk_p + hanabi_E1_atk_p,
        trace_cd_p: 24 + fuxuan_cd + hanabi_skill_cd + hanabi_s5_cd,
        trace_spd_p: 25,
        trace_cr_p: fuxuan_cr + hanabi_s5_cr + sltd_cr,
        trace_defshred: hanabi_E2_def_ignore + sw_def_ignore,
        trace_damage_bonus: sw_penacony_dmg_bonus + hanabi_penacony_dmg_bonus + hanabi_talent_dmg_bonus,
    });

    let elemental_dmg = stats_sltd_on.final_qua + fuxuan_dmg_bonus + stats_sltd_on.damage_bonus;
    let skill_dmg_p = elemental_dmg + stats_sltd_on.skilldmg_p
    let ult_dmg_p = elemental_dmg + stats_sltd_on.ultdmg_p;

    let skill_sltd_off = damag.outgoing_dmg_2({
        scaling_attribute: stats_sltd_off.final_atk,
        cr: stats_sltd_off.final_cr,
        cd: stats_sltd_off.final_cd,
        skill_multiplier: skill_dmg_mult,
        def_ignore_p: stats_sltd_off.defignore_p,
        dmg_bonus_p: skill_dmg_p + 80,
        res_shred: 20 + sup_res_shred,
        enemylvl: 95
    });
    let skill_sltd_on = damag.outgoing_dmg_2({
        scaling_attribute: stats_sltd_on.final_atk,
        cr: stats_sltd_on.final_cr,
        cd: stats_sltd_on.final_cd,
        skill_multiplier: skill_dmg_mult,
        def_ignore_p: stats_sltd_on.defignore_p,
        dmg_bonus_p: skill_dmg_p + 80,
        res_shred: 20 + sup_res_shred,
        enemylvl: 95
    });
    let skill_mid_attack = 0.3 * skill_sltd_off + 0.7 * skill_sltd_on;
    let skill_avg = (skill_sltd_off + skill_sltd_on + skill_mid_attack) / 3;

    let ult_sltd_on = damag.outgoing_dmg_2({
        scaling_attribute: stats_sltd_on.final_atk,
        cr: stats_sltd_on.final_cr,
        cd: stats_sltd_on.final_cd,
        skill_multiplier: ult_dmg_mult,
        def_ignore_p: stats_sltd_on.defignore_p,
        dmg_bonus_p: ult_dmg_p + 80,
        res_shred: 20 + sup_res_shred,
        enemylvl: 95
    });
    let ult_sltd_off = damag.outgoing_dmg_2({
        scaling_attribute: stats_sltd_off.final_atk,
        cr: stats_sltd_off.final_cr,
        cd: stats_sltd_off.final_cd,
        skill_multiplier: ult_dmg_mult,
        def_ignore_p: stats_sltd_off.defignore_p,
        dmg_bonus_p: ult_dmg_p + 80,
        res_shred: 20 + sup_res_shred,
        enemylvl: 95
    });
    let ult = 1/3 * ult_sltd_off + 2/3 * ult_sltd_on;
    let score = 4 * skill_avg + ult;


    let stats_display = BuildStatsCalculatorNew({
        build: build,
        base_atk: total_base_atk,
        base_spd: char_base_spd,
        trace_atk_p: 28,
        trace_cd_p: 24 + 30,
        count_conditionals: false,
    });
    let lbstats = [
        ["ATK", String(Math.floor(stats_display.final_atk))],
        ["CR", damag.trim_after_decimal(stats_display.final_cr) + "%"],
        ["CD", damag.trim_after_decimal(stats_display.final_cd) + "%"],
        ["Qua", damag.trim_after_decimal(stats_display.final_qua)],
        ["SPD", damag.trim_after_decimal(stats_display.final_spd)]
    ];

    let calcDetails = [
        ["Skill (sltd ON after 2 hits)", String(Math.floor(skill_mid_attack))],
        ["Skill (sltd ON)", String(Math.floor(skill_sltd_on))],
        ["Skill (sltd OFF)", String(Math.floor(skill_sltd_off))],
        ["Skill avg", String(Math.floor(skill_avg))],
        ["ULT avg (2/3 sltd uptime)", String(Math.floor(ult))],
        ["SPD After Skill", damag.trim_after_decimal(stats_sltd_on.final_spd)]
    ];
    if (fuxuan) {
        if (f2p) {
            calcDetails.unshift(["E0 Penacony Fu Xuan (no sig)", ""]);
        } else {
            calcDetails.unshift(["E1S1 Sig Penacony Fu Xuan", ""]);
        }
    }
    if (sw) {
        calcDetails.unshift(["E0S5 Pearls Penacony SW (bugs ignored)", ""]);
    }
    if (hanabi) {
        if (f2p) {
            calcDetails.unshift(["E0S5 208CD Randevouz Penacony Hanabi (72% skill uptime, 2/3 ULT uptime)", ""]);
        } else {
            calcDetails.unshift(["E2S1 240CD Sig Penacony Hanabi (72% skill uptime)", ""]);
        }
    }


    return [Math.floor(score), stats_sltd_on.final_spd, lbstats, calcDetails];

}


