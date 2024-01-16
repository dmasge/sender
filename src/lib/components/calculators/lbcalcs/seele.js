
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
        } else if (build['e'] >= 2 && "23001" === build['lc']['id']) {
            breakpoints = ["", "200.1"];
            [score, spd, lbstats, calcDetails] = E2S1_23001_IntheNight(build);
            let ctgrname = 'E2S1_' + build['lc']['id'];
            build = assign_lb_to_build(build, ctgrname, score, lbstats, spd, breakpoints, calcDetails);
        } else if (build['e'] == 1 && "23001" === build['lc']['id']) {
            breakpoints = ["", "160.1", "171.5", "200.1"];
            [score, spd, lbstats, calcDetails] = E1S1_23001_IntheNight(build);
            let ctgrname = 'E1S1_' + build['lc']['id'];
            build = assign_lb_to_build(build, ctgrname, score, lbstats, spd, breakpoints, calcDetails);
        } else if ("23001" === build['lc']['id']) {
            breakpoints = ["", "160.1", "171.5", "200.1"];
            [score, spd, lbstats, calcDetails] = E0S1_23001_IntheNight(build);
            let ctgrname = 'E0S1_' + build['lc']['id'];
            build = assign_lb_to_build(build, ctgrname, score, lbstats, spd, breakpoints, calcDetails);
        } else if ("24001" === build['lc']['id']) {
            breakpoints = ["", "160.1", "171.5", "200.1"];
            [score, spd, lbstats, calcDetails] = E0S5_24001_CruisingintheStellarSea(build);
            let ctgrname = 'E0S5_' + build['lc']['id'];
            build = assign_lb_to_build(build, ctgrname, score, lbstats, spd, breakpoints, calcDetails);
        } else if ("23012" === build['lc']['id']) {
            breakpoints = ["", "160.1", "171.5", "200.1"];
            [score, spd, lbstats, calcDetails] = E0S1_23012_SleepLikeTheDead(build);
            let ctgrname = 'E0S1_' + build['lc']['id'];
            build = assign_lb_to_build(build, ctgrname, score, lbstats, spd, breakpoints, calcDetails);
        } else if ("21010" === build['lc']['id']) {
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
        } else if (build['e'] >= 2 && "23001" === build['lc']['id']) {
            breakpoints = ["", "200.1"];
            [score, spd, lbstats, calcDetails] = E2S1_23001_IntheNight(build, true);
            let ctgrname = 'E2S1_' + build['lc']['id'] + "FX";
            build = assign_lb_to_build(build, ctgrname, score, lbstats, spd, breakpoints, calcDetails);
        } else if (build['e'] == 1 && "23001" === build['lc']['id']) {
            breakpoints = ["", "160.1", "171.5", "200.1"];
            [score, spd, lbstats, calcDetails] = E1S1_23001_IntheNight(build, true);
            let ctgrname = 'E1S1_' + build['lc']['id'] + "FX";
            build = assign_lb_to_build(build, ctgrname, score, lbstats, spd, breakpoints, calcDetails);
        } else if ("23001" === build['lc']['id']) {
            breakpoints = ["", "160.1", "171.5", "200.1"];
            [score, spd, lbstats, calcDetails] = E0S1_23001_IntheNight(build, true);
            let ctgrname = 'E0S1_' + build['lc']['id'] + "FX";
            build = assign_lb_to_build(build, ctgrname, score, lbstats, spd, breakpoints, calcDetails);
        } else if ("24001" === build['lc']['id']) {
            breakpoints = ["", "160.1", "171.5", "200.1"];
            [score, spd, lbstats, calcDetails] = E0S5_24001_CruisingintheStellarSea(build, true);
            let ctgrname = 'E0S5_' + build['lc']['id'] + "FX";
            build = assign_lb_to_build(build, ctgrname, score, lbstats, spd, breakpoints, calcDetails);
        } else if ("23012" === build['lc']['id']) {
            breakpoints = ["", "160.1", "171.5", "200.1"];
            [score, spd, lbstats, calcDetails] = E0S1_23012_SleepLikeTheDead(build, true);
            let ctgrname = 'E0S1_' + build['lc']['id'] + "FX";
            build = assign_lb_to_build(build, ctgrname, score, lbstats, spd, breakpoints, calcDetails);
        } else if ("21010" === build['lc']['id']) {
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
        } else if (build['e'] >= 2 && "23001" === build['lc']['id']) {
            breakpoints = ["", "200.1"];
            [score, spd, lbstats, calcDetails] = E2S1_23001_IntheNight(build, true, true, true);
            let ctgrname = 'E2S1_' + build['lc']['id'] + "MONOQ";
            build = assign_lb_to_build(build, ctgrname, score, lbstats, spd, breakpoints, calcDetails);
        } else if (build['e'] == 1 && "23001" === build['lc']['id']) {
            breakpoints = ["", "160.1", "171.5", "200.1"];
            [score, spd, lbstats, calcDetails] = E1S1_23001_IntheNight(build, true, true, true);
            let ctgrname = 'E1S1_' + build['lc']['id'] + "MONOQ";
            build = assign_lb_to_build(build, ctgrname, score, lbstats, spd, breakpoints, calcDetails);
        } else if ("23001" === build['lc']['id']) {
            breakpoints = ["", "160.1", "171.5", "200.1"];
            [score, spd, lbstats, calcDetails] = E0S1_23001_IntheNight(build, true, true, true);
            let ctgrname = 'E0S1_' + build['lc']['id'] + "MONOQ";
            build = assign_lb_to_build(build, ctgrname, score, lbstats, spd, breakpoints, calcDetails);
        } else if ("24001" === build['lc']['id']) {
            breakpoints = ["", "160.1", "171.5", "200.1"];
            [score, spd, lbstats, calcDetails] = E0S5_24001_CruisingintheStellarSea(build, true, true, true);
            let ctgrname = 'E0S5_' + build['lc']['id'] + "MONOQ";
            build = assign_lb_to_build(build, ctgrname, score, lbstats, spd, breakpoints, calcDetails);
        } else if ("23012" === build['lc']['id']) {
            breakpoints = ["", "160.1", "171.5", "200.1"];
            [score, spd, lbstats, calcDetails] = E0S1_23012_SleepLikeTheDead(build, true, true, true);
            let ctgrname = 'E0S1_' + build['lc']['id'] + "MONOQ";
            build = assign_lb_to_build(build, ctgrname, score, lbstats, spd, breakpoints, calcDetails);
        } else if ("21010" === build['lc']['id']) {
            breakpoints = ["", "160.1", "171.5", "200.1"];
            [score, spd, lbstats, calcDetails] = E0S5_21010_Swordplay(build, true, true, true);
            let ctgrname = 'E0S5_' + build['lc']['id'] + "MONOQ";
            build = assign_lb_to_build(build, ctgrname, score, lbstats, spd, breakpoints, calcDetails);
        }
    
    return build;
}

function E2S5_23001_IntheNight(build, fuxuan = false, sw = false, hanabi = false) {
    let lc_base_atk = lc_dict_by_id['23001']['atk'];

    let total_base_atk = char_base_atk + lc_base_atk;
    let skill_dmg_mult = 220;
    let ult_dmg_mult = 425;

    let fuxuan_cr = fuxuan ? 12 : 0;
    let fuxuan_cd = fuxuan ? 30 : 0;
    let fuxuan_dmg_bonus = fuxuan ? (9 + 10) : 0;

    let lc_cr_p = 30;
    let hanabi_skill_cd = hanabi ? 77.328 : 0; // 260CD, rounded transfers 110CD, 80% uptime makes it around 90
    let hanabi_s5_cd = hanabi ? 56 : 0;
    let hanabi_s5_cr = hanabi ? 14 : 0;
    let hanabi_penacony_dmg_bonus = hanabi ? 10 : 0;
    let hanabi_talent_dmg_bonus = hanabi ? 48 : 0; // 16*3 talen with ULT
    let hanabi_trace_atk_p = hanabi ? 45 : 0;
    let hanabi_E1_atk_p = hanabi ? 40 : 0;
    let hanabi_E2_def_ignore = hanabi ? 24 : 0;
    
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
        calcDetails.unshift(["E1S1 Sig Penacony Fu Xuan", ""]);
    }
    if (sw) {
        calcDetails.unshift(["E0S5 Pearls Penacony SW (bugs ignored)", ""]);
    }
    if (hanabi) {
        calcDetails.unshift(["E2S5 260CD Sig Penacony Hanabi (72% skill uptime)", ""]);
    }


    return [Math.floor(score), stats.final_spd, lbstats, calcDetails];

}



function E2S1_23001_IntheNight(build, fuxuan = false, sw = false, hanabi = false) {
    let lc_base_atk = lc_dict_by_id['23001']['atk'];

    let total_base_atk = char_base_atk + lc_base_atk;
    let skill_dmg_mult = 220;
    let ult_dmg_mult = 425;

    let fuxuan_cr = fuxuan ? 12 : 0;
    let fuxuan_cd = fuxuan ? 30 : 0;
    let fuxuan_dmg_bonus = fuxuan ? (9 + 10) : 0;

    let lc_cr_p = 18;
    let hanabi_skill_cd = hanabi ? 73.872 : 0; // 240CD,
    let hanabi_s5_cd = hanabi ? 28 : 0;
    let hanabi_s5_cr = hanabi ? 10 : 0;
    let hanabi_penacony_dmg_bonus = hanabi ? 10 : 0;
    let hanabi_talent_dmg_bonus = hanabi ? 48 : 0; // 16*3 talen with ULT
    let hanabi_trace_atk_p = hanabi ? 45 : 0;
    let hanabi_E1_atk_p = hanabi ? 40 : 0;
    let hanabi_E2_def_ignore = hanabi ? 24 : 0;
    
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
        calcDetails.unshift(["E1S1 Sig Penacony Fu Xuan", ""]);
    }
    if (sw) {
        calcDetails.unshift(["E0S5 Pearls Penacony SW (bugs ignored)", ""]);
    }
    if (hanabi) {
        calcDetails.unshift(["E2S1 240CD Sig Penacony Hanabi (72% skill uptime)", ""]);
    }


    return [Math.floor(score), stats.final_spd, lbstats, calcDetails];

}



function E1S1_23001_IntheNight(build, fuxuan = false, sw = false, hanabi = false) {
    let lc_base_atk = lc_dict_by_id['23001']['atk'];

    let total_base_atk = char_base_atk + lc_base_atk;
    let skill_dmg_mult = 220;
    let ult_dmg_mult = 425;

    let fuxuan_cr = fuxuan ? 12 : 0;
    let fuxuan_cd = fuxuan ? 30 : 0;
    let fuxuan_dmg_bonus = fuxuan ? (9 + 10) : 0;

    let lc_cr_p = 18;
    let hanabi_skill_cd = hanabi ? 73.872 : 0; // 240CD,
    let hanabi_s5_cd = hanabi ? 28 : 0;
    let hanabi_s5_cr = hanabi ? 10 : 0;
    let hanabi_penacony_dmg_bonus = hanabi ? 10 : 0;
    let hanabi_talent_dmg_bonus = hanabi ? 48 : 0; // 16*3 talen with ULT
    let hanabi_trace_atk_p = hanabi ? 45 : 0;
    let hanabi_E1_atk_p = hanabi ? 40 : 0;
    let hanabi_E2_def_ignore = hanabi ? 24 : 0;
    
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
        calcDetails.unshift(["E1S1 Sig Penacony Fu Xuan", ""]);
    }
    if (sw) {
        calcDetails.unshift(["E0S5 Pearls Penacony SW (bugs ignored)", ""]);
    }
    if (hanabi) {
        calcDetails.unshift(["E2S1 240CD Sig Penacony Hanabi (72% skill uptime)", ""]);
    }


    return [Math.floor(score), stats.final_spd, lbstats, calcDetails];

}


function E0S1_23001_IntheNight(build, fuxuan = false, sw = false, hanabi = false) {
    let lc_base_atk = lc_dict_by_id['23001']['atk'];

    let total_base_atk = char_base_atk + lc_base_atk;
    let skill_dmg_mult = 220;
    let ult_dmg_mult = 425;

    let fuxuan_cr = fuxuan ? 12 : 0;
    let fuxuan_cd = fuxuan ? 30 : 0;
    let fuxuan_dmg_bonus = fuxuan ? (9 + 10) : 0;

    let lc_cr_p = 18;
    let hanabi_skill_cd = hanabi ? 73.872 : 0; // 240CD,
    let hanabi_s5_cd = hanabi ? 28 : 0;
    let hanabi_s5_cr = hanabi ? 10 : 0;
    let hanabi_penacony_dmg_bonus = hanabi ? 10 : 0;
    let hanabi_talent_dmg_bonus = hanabi ? 48 : 0; // 16*3 talen with ULT
    let hanabi_trace_atk_p = hanabi ? 45 : 0;
    let hanabi_E1_atk_p = hanabi ? 40 : 0;
    let hanabi_E2_def_ignore = hanabi ? 24 : 0;
    
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
        res_shred: 20+sup_res_shred,
        enemylvl: 95
    });
    let ult_buffed_dmg = damag.outgoing_dmg_2({
        scaling_attribute: stats.final_atk,
        cr: stats.final_cr,
        cd: ult_cd,
        skill_multiplier: ult_dmg_mult,
        def_ignore_p: stats.defignore_p,
        dmg_bonus_p: ult_dmg_p + 80,
        res_shred: 20+sup_res_shred,
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
        calcDetails.unshift(["E1S1 Sig Penacony Fu Xuan", ""]);
    }
    if (sw) {
        calcDetails.unshift(["E0S5 Pearls Penacony SW (bugs ignored)", ""]);
    }
    if (hanabi) {
        calcDetails.unshift(["E2S1 240CD Sig Penacony Hanabi (72% skill uptime)", ""]);
    }


    return [Math.floor(score), stats.final_spd, lbstats, calcDetails];

}


function get_itn_stack_count(spd) {
    if (spd >= 160) return 6;
    var remainder_100s = spd % 100;
    var stacks = Math.min(Math.max(Math.floor(remainder_100s / 10), 0), 6);
    return stacks;
}


function E0S5_21010_Swordplay(build, fuxuan = false, sw = false, hanabi = false) {
    let lc_base_atk = lc_dict_by_id['21010']['atk'];

    let total_base_atk = char_base_atk + lc_base_atk;
    let skill_dmg_mult = 220;
    let ult_dmg_mult = 425;

    let fuxuan_cr = fuxuan ? 12 : 0;
    let fuxuan_cd = fuxuan ? 30 : 0;
    let fuxuan_dmg_bonus = fuxuan ? (9 + 10) : 0;

    let lc_atk_p = 0;
    let lc_damage_bonus = 80;
    let lc_cr_p = 0;
    let hanabi_skill_cd = hanabi ? 73.872 : 0; // 240CD,
    let hanabi_s5_cd = hanabi ? 28 : 0;
    let hanabi_s5_cr = hanabi ? 10 : 0;
    let hanabi_penacony_dmg_bonus = hanabi ? 10 : 0;
    let hanabi_talent_dmg_bonus = hanabi ? 48 : 0; // 16*3 talen with ULT
    let hanabi_trace_atk_p = hanabi ? 45 : 0;
    let hanabi_E1_atk_p = hanabi ? 40 : 0;
    let hanabi_E2_def_ignore = hanabi ? 24 : 0;
    
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
        res_shred: 20+sup_res_shred,
        enemylvl: 95
    });
    let ult_buffed_dmg = damag.outgoing_dmg_2({
        scaling_attribute: stats.final_atk,
        cr: stats.final_cr,
        cd: stats.final_cd,
        skill_multiplier: ult_dmg_mult,
        def_ignore_p: stats.defignore_p,
        dmg_bonus_p: ult_dmg_p + 80,
        res_shred: 20+sup_res_shred,
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
        calcDetails.unshift(["E1S1 Sig Penacony Fu Xuan", ""]);
    }
    if (sw) {
        calcDetails.unshift(["E0S5 Pearls Penacony SW (bugs ignored)", ""]);
    }
    if (hanabi) {
        calcDetails.unshift(["E2S1 240CD Sig Penacony Hanabi (72% skill uptime)", ""]);
    }


    return [Math.floor(score), stats.final_spd, lbstats, calcDetails];

}



function E0S5_24001_CruisingintheStellarSea(build, fuxuan = false, sw = false, hanabi = false) {
    let lc_base_atk = lc_dict_by_id['24001']['atk'];

    let total_base_atk = char_base_atk + lc_base_atk;
    let skill_dmg_mult = 220;
    let ult_dmg_mult = 425;

    let fuxuan_cr = fuxuan ? 12 : 0;
    let fuxuan_cd = fuxuan ? 30 : 0;
    let fuxuan_dmg_bonus = fuxuan ? (9 + 10) : 0;

    let lc_atk_p = 40;
    let lc_cr_p = 16;
    let hanabi_skill_cd = hanabi ? 73.872 : 0; // 240CD,
    let hanabi_s5_cd = hanabi ? 28 : 0;
    let hanabi_s5_cr = hanabi ? 10 : 0;
    let hanabi_penacony_dmg_bonus = hanabi ? 10 : 0;
    let hanabi_talent_dmg_bonus = hanabi ? 48 : 0; // 16*3 talen with ULT
    let hanabi_trace_atk_p = hanabi ? 45 : 0;
    let hanabi_E1_atk_p = hanabi ? 40 : 0;
    let hanabi_E2_def_ignore = hanabi ? 24 : 0;
    
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
        res_shred: 20+sup_res_shred,
        enemylvl: 95
    });
    let ult_buffed_dmg_abv50 = damag.outgoing_dmg_2({
        scaling_attribute: stats.final_atk,
        cr: stats.final_cr,
        cd: stats.final_cd,
        skill_multiplier: ult_dmg_mult,
        def_ignore_p: stats.defignore_p,
        dmg_bonus_p: ult_dmg_p + 80,
        res_shred: 20+sup_res_shred,
        enemylvl: 95
    })

    let skill_buffed_dmg_blv50 = damag.outgoing_dmg_2({
        scaling_attribute: stats.final_atk,
        cr: stats.final_cr + 16,
        cd: stats.final_cd,
        skill_multiplier: skill_dmg_mult,
        def_ignore_p: stats.defignore_p,
        dmg_bonus_p: skill_dmg_p + 80,
        res_shred: 20+sup_res_shred,
        enemylvl: 95
    });
    let ult_buffed_dmg_blv50 = damag.outgoing_dmg_2({
        scaling_attribute: stats.final_atk,
        cr: stats.final_cr + 16,
        cd: stats.final_cd,
        skill_multiplier: ult_dmg_mult,
        def_ignore_p: stats.defignore_p,
        dmg_bonus_p: ult_dmg_p + 80,
        res_shred: 20+sup_res_shred,
        enemylvl: 95
    })

    let skill_avg = (skill_buffed_dmg_abv50 + skill_buffed_dmg_blv50) / 2
    let ult_avg = (ult_buffed_dmg_abv50 + ult_buffed_dmg_blv50) / 2
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
        ["ATK uptime", "100%"],
        ["Skill average", String(Math.floor(skill_avg))],
        ["Over 50% / under", String(Math.floor(skill_buffed_dmg_abv50)) + ' / ' + String(Math.floor(skill_buffed_dmg_blv50))],
        ["ULT average", String(Math.floor(ult_avg))],
        ["Over 50% / under", String(Math.floor(ult_buffed_dmg_abv50)) + ' / ' + String(Math.floor(ult_buffed_dmg_blv50))],

        ["SPD After Skill", damag.trim_after_decimal(stats.final_spd)]
    ];
    if (fuxuan) {
        calcDetails.unshift(["E1S1 Sig Penacony Fu Xuan", ""]);
    }
    if (sw) {
        calcDetails.unshift(["E0S5 Pearls Penacony SW (bugs ignored)", ""]);
    }
    if (hanabi) {
        calcDetails.unshift(["E2S1 240CD Sig Penacony Hanabi (72% skill uptime)", ""]);
    }


    return [Math.floor(score), stats.final_spd, lbstats, calcDetails];

}


function E0S1_23012_SleepLikeTheDead(build, fuxuan = false, sw = false, hanabi = false) {
    let lc_base_atk = lc_dict_by_id['23012']['atk'];

    let total_base_atk = char_base_atk + lc_base_atk;
    let skill_dmg_mult = 220;
    let ult_dmg_mult = 425;

    let fuxuan_cr = fuxuan ? 12 : 0;
    let fuxuan_cd = fuxuan ? 30 : 0;
    let fuxuan_dmg_bonus = fuxuan ? (9 + 10) : 0;

    let hanabi_skill_cd = hanabi ? 73.872 : 0; // 240CD,
    let hanabi_s5_cd = hanabi ? 28 : 0;
    let hanabi_s5_cr = hanabi ? 10 : 0;
    let hanabi_penacony_dmg_bonus = hanabi ? 10 : 0;
    let hanabi_talent_dmg_bonus = hanabi ? 48 : 0; // 16*3 talen with ULT
    let hanabi_trace_atk_p = hanabi ? 45 : 0;
    let hanabi_E1_atk_p = hanabi ? 40 : 0;
    let hanabi_E2_def_ignore = hanabi ? 24 : 0;
    
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
        trace_cr_p: fuxuan_cr + hanabi_s5_cr,
        trace_defshred: hanabi_E2_def_ignore + sw_def_ignore,
        trace_damage_bonus: sw_penacony_dmg_bonus + hanabi_penacony_dmg_bonus + hanabi_talent_dmg_bonus,
    });
    let sltd_cr = sltd_eff_uptime_w_resurgence(stats.final_cr)
    stats = BuildStatsCalculatorNew({
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

    let elemental_dmg = stats.final_qua + fuxuan_dmg_bonus + stats.damage_bonus;
    let skill_dmg_p = elemental_dmg + stats.skilldmg_p
    let ult_dmg_p = elemental_dmg + stats.ultdmg_p;
    let cr_avg = stats.final_cr;

    let skill = damag.outgoing_dmg_2({
        scaling_attribute: stats.final_atk,
        cr: cr_avg,
        cd: stats.final_cd,
        skill_multiplier: skill_dmg_mult,
        def_ignore_p: stats.defignore_p,
        dmg_bonus_p: skill_dmg_p + 80,
        res_shred: 20 + sup_res_shred,
        enemylvl: 95
    });
    let ult = damag.outgoing_dmg_2({
        scaling_attribute: stats.final_atk,
        cr: cr_avg,
        cd: stats.final_cd,
        skill_multiplier: ult_dmg_mult,
        def_ignore_p: stats.defignore_p,
        dmg_bonus_p: ult_dmg_p + 80,
        res_shred: 20 + sup_res_shred,
        enemylvl: 95
    })
    let score = 4 * skill + ult;


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
        ["Avg CR w Resurgence", damag.trim_after_decimal(cr_avg) + "%"],
        ["Skill avg", String(Math.floor(skill))],
        ["ULT avg", String(Math.floor(ult))],
        ["SPD After Skill", damag.trim_after_decimal(stats.final_spd)]
    ];
    if (fuxuan) {
        calcDetails.unshift(["E1S1 Sig Penacony Fu Xuan", ""]);
    }
    if (sw) {
        calcDetails.unshift(["E0S5 Pearls Penacony SW (bugs ignored)", ""]);
    }
    if (hanabi) {
        calcDetails.unshift(["E2S1 240CD Sig Penacony Hanabi (72% skill uptime)", ""]);
    }


    return [Math.floor(score), stats.final_spd, lbstats, calcDetails];

}



function sltd_eff_uptime_w_resurgence(cr) {
    cr = Math.min(Math.max(cr, 5), 100);
    let x = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100];
    let y = [27, 26.5, 26, 25.5, 25, 24, 23, 22, 21, 19, 18, 16, 14, 11, 8, 5, 3, 1, 0.5, 0];
    for (let i = 0; i < x.length - 1; i++) {
        if (x[i] <= cr && cr <= x[i + 1]) {
            let slope = (y[i + 1] - y[i]) / (x[i + 1] - x[i]);
            let cr_b4_resurg = (y[i] + slope * (cr - x[i]));
            let sltd_uptime = 2 / 3;
            let prob_resurgence_during_uptime = 2 / 3;
            let cr_w_resurg = cr_b4_resurg * 3 / 4 + (cr_b4_resurg + cr_b4_resurg * sltd_uptime * prob_resurgence_during_uptime) * 1 / 4;
            return cr_w_resurg;
        }
    }
    return 0;
}

