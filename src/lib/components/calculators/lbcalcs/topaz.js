import { outgoing_dmg_js, hit_prob, trim_after_decimal } from '$lib/components/calculators/damage_formulas.js';
import { BuildStatsCalculatorNew, assign_lb_to_build } from '$lib/components/calculators/build_stats_calculator_new.js';
import { lc_dict_by_id } from "$lib/components/calculators/lbcalcs/lightcones.js"


// 1112
export function score_topaz(build, optimizationTarget) {
    let score = 0;
    let spd = 0;
    let lbstats = [];
    let calcDetails = [];
    let breakpoints = ["", "120.1", "133.34", "142.9", "160.1", "171.5", "200.1"];


    if (optimizationTarget == "" || (optimizationTarget != "" && !optimizationTarget.includes("FXASTA")))
        if ("23016" == build['lc']['id'] && build['lc']['s'] >= 3) {
            [score, spd, lbstats, calcDetails] = E0S5_23016_WorrisomeBlissful(build);
            let ctgrname = 'E0S5_' + build['lc']['id'];
            build = assign_lb_to_build(build, ctgrname, score, lbstats, spd, breakpoints, calcDetails);
        } else if ("23016" == build['lc']['id']) {
            [score, spd, lbstats, calcDetails] = E0S1_23016_WorrisomeBlissful(build);
            let ctgrname = 'E0S1_' + build['lc']['id'];
            build = assign_lb_to_build(build, ctgrname, score, lbstats, spd, breakpoints, calcDetails);
        } else if ("24001" == build['lc']['id']) {
            [score, spd, lbstats, calcDetails] = E0S5_24001_CruisingintheStellarSea(build);
            let ctgrname = 'E0S5_' + build['lc']['id'];
            build = assign_lb_to_build(build, ctgrname, score, lbstats, spd, breakpoints, calcDetails);
        } else if ("21010" == build['lc']['id']) {
            [score, spd, lbstats, calcDetails] = E0S5_21010_Swordplay(build);
            let ctgrname = 'E0S5_' + build['lc']['id'];
            build = assign_lb_to_build(build, ctgrname, score, lbstats, spd, breakpoints, calcDetails);
        } else if ("23012" == build['lc']['id']) {
            [score, spd, lbstats, calcDetails] = E0S1_23012_Sleeplikethedead(build);
            let ctgrname = 'E0S1_' + build['lc']['id'];
            build = assign_lb_to_build(build, ctgrname, score, lbstats, spd, breakpoints, calcDetails);
        } else if ("21003" == build['lc']['id']) {
            [score, spd, lbstats, calcDetails] = E0S5_21003_OnlySilenceRemains(build);
            let ctgrname = 'E0S5_' + build['lc']['id'];
            build = assign_lb_to_build(build, ctgrname, score, lbstats, spd, breakpoints, calcDetails);
        }

    // Team calcs
    breakpoints = ["", "171.5", "200.1"];
    if (optimizationTarget == "" || (optimizationTarget != "" && optimizationTarget.includes("FXASTA")))
        if ("23016" == build['lc']['id'] && build['lc']['s'] >= 3) {
            [score, spd, lbstats, calcDetails] = E0S5_23016_WorrisomeBlissful(build, true, true);
            let ctgrname = 'E0S5_' + build['lc']['id'] + "FX" + "ASTA";
            build = assign_lb_to_build(build, ctgrname, score, lbstats, spd, breakpoints, calcDetails);
        } else if ("23016" == build['lc']['id']) {
            [score, spd, lbstats, calcDetails] = E0S1_23016_WorrisomeBlissful(build, true, true);
            let ctgrname = 'E0S1_' + build['lc']['id'] + "FX" + "ASTA";
            build = assign_lb_to_build(build, ctgrname, score, lbstats, spd, breakpoints, calcDetails);
        } else if ("24001" == build['lc']['id']) {
            [score, spd, lbstats, calcDetails] = E0S5_24001_CruisingintheStellarSea(build, true, true);
            let ctgrname = 'E0S5_' + build['lc']['id'] + "FX" + "ASTA";
            build = assign_lb_to_build(build, ctgrname, score, lbstats, spd, breakpoints, calcDetails);
        } else if ("21010" == build['lc']['id']) {
            [score, spd, lbstats, calcDetails] = E0S5_21010_Swordplay(build, true, true);
            let ctgrname = 'E0S5_' + build['lc']['id'] + "FX" + "ASTA";
            build = assign_lb_to_build(build, ctgrname, score, lbstats, spd, breakpoints, calcDetails);
        } else if ("23012" == build['lc']['id']) {
            [score, spd, lbstats, calcDetails] = E0S1_23012_Sleeplikethedead(build, true, true);
            let ctgrname = 'E0S1_' + build['lc']['id'] + "FX" + "ASTA";
            build = assign_lb_to_build(build, ctgrname, score, lbstats, spd, breakpoints, calcDetails);
        } else if ("21003" == build['lc']['id']) {
            [score, spd, lbstats, calcDetails] = E0S5_21003_OnlySilenceRemains(build, true, true);
            let ctgrname = 'E0S5_' + build['lc']['id'] + "FX" + "ASTA";
            build = assign_lb_to_build(build, ctgrname, score, lbstats, spd, breakpoints, calcDetails);
        }
    return build;
}

// 1205
let char_base_hp = 931.392;
let char_base_atk = 620.928;
let char_base_spd = 110;

function E0S5_23016_WorrisomeBlissful(build, fuxuan = false, asta = false) {
    let lc_base_atk = lc_dict_by_id['23016']['atk'];
    let lc_base_hp = lc_dict_by_id['23016']['hp'];
    let total_base_atk = char_base_atk + lc_base_atk;
    let total_base_hp = char_base_hp + lc_base_hp;

    let lc_atk_p = 0;
    let lc_cd = 40;
    let lc_cr = 30;
    let lc_hp_p = 0;
    let lc_damage_bonus = 0;
    let lc_dot_bonus = 0;
    let lc_ehr = 0;
    let lc_ult_damage_bonus = 0;
    let lc_skill_damage_bonus = 0;
    let lc_fua_damage_bonus = 50;
    let lc_def_ignore = 0;
    let lc_basic_damage_bonus = 0;
    let lc_break_effect = 0;
    let lc_spd_p = 0;

    let trace_hp_p = 10;
    let trace_fire = 22.4;
    let trace_atk_p = 0;
    let trace_cd = 0;
    let trace_cr = 12;
    let trace_res = 0;
    let trace_spd_f = 0;
    let trace_spd_p = 0;
    let trace_ehr = 0;

    let fuxuan_cr = fuxuan ? 12 : 0;
    let sup_cd = (fuxuan && asta) ? 50 : 0; // asta keel + fx keel + fx E1
    let fuxuan_dmg_bonus = fuxuan ? 9 : 0;
    let asta_spd_f = asta ? 53 : 0;
    let asta_atk_p = asta ? 77 : 0;
    let The_Ashblazing_Grand_Duke_ATK_p = 18;
    let The_Ashblazing_Grand_Duke_ATK_p_efua = 23.4;
    let stats = BuildStatsCalculatorNew({
        build: build,
        base_atk: total_base_atk,
        trace_atk_p: lc_atk_p + trace_atk_p + asta_atk_p,
        base_hp: total_base_hp,
        trace_hp_p: trace_hp_p + lc_hp_p,
        trace_res_p: trace_res,
        trace_ehr_p: trace_ehr + lc_ehr,
        trace_break_effect: lc_break_effect,
        base_spd: char_base_spd, trace_spd_f: trace_spd_f + asta_spd_f, trace_spd_p: trace_spd_p + lc_spd_p,
        trace_defshred: lc_def_ignore,
        trace_cr_p: lc_cr + trace_cr + fuxuan_cr,
        trace_cd_p: lc_cd + trace_cd + sup_cd,
        trace_damage_bonus: lc_damage_bonus + fuxuan_dmg_bonus,
        trace_fire: trace_fire,
        The_Ashblazing_Grand_Duke_ATK_p: The_Ashblazing_Grand_Duke_ATK_p,
    });
    let stats_efua = BuildStatsCalculatorNew({
        build: build,
        base_atk: total_base_atk,
        trace_atk_p: lc_atk_p + trace_atk_p + asta_atk_p,
        base_hp: total_base_hp,
        trace_hp_p: trace_hp_p + lc_hp_p,
        trace_res_p: trace_res,
        trace_ehr_p: trace_ehr + lc_ehr,
        trace_break_effect: lc_break_effect,
        base_spd: char_base_spd, trace_spd_f: trace_spd_f + asta_spd_f, trace_spd_p: trace_spd_p + lc_spd_p,
        trace_defshred: lc_def_ignore,
        trace_cr_p: lc_cr + trace_cr + fuxuan_cr,
        trace_cd_p: lc_cd + trace_cd + sup_cd,
        trace_damage_bonus: lc_damage_bonus + fuxuan_dmg_bonus,
        trace_fire: trace_fire,
        The_Ashblazing_Grand_Duke_ATK_p: The_Ashblazing_Grand_Duke_ATK_p_efua,
    });

    // support stuff
    let res_shred = 0;
    let def_ignore = 0;
    let sup_damage_bonus = 0;

    let a4_fua_dmg_p = 15;
    let asta_fire_dmg_p = asta ? 18 : 0;
    let element_type_dmg = stats.fire + asta_fire_dmg_p;
    let elemental_dmg = element_type_dmg + stats.damage_bonus + sup_damage_bonus;
    let basic_dmg_p = elemental_dmg + stats.basicdmg_p + lc_basic_damage_bonus;
    let skill_dmg_p = elemental_dmg + stats.skilldmg_p + lc_skill_damage_bonus;
    let fua_dmg_p = elemental_dmg + stats.flwupdmg_p + lc_fua_damage_bonus + a4_fua_dmg_p;
    let ult_dmg_p = elemental_dmg + stats.ultdmg_p + lc_ult_damage_bonus;
    let dot_dmg_p = elemental_dmg + stats.dot_bonus + lc_dot_bonus;

    // 1 targets
    let basic_atk_mult_primary = 0;
    let basic_hp_mult_primary = 0;
    let skill_atk_mult_primary = 0;
    let skill_atk_mult_adj = 0;
    let ult_atk_mult_primary = 0;
    let ult_hp_mult_primary = 0;
    let fua_atk_mult_primary = 150;
    let efua_atk_mult_primary = 300;
    let fua_hp_mult_primary = 0;

    let vuln = 50;

    let fua_primary = outgoing_dmg_js({
        'scaling_attribute': stats.final_atk,
        'cr': stats.final_cr,
        'cd': stats.final_cd,
        'skill_multiplier': fua_atk_mult_primary,
        'def_ignore_p': stats.defignore_p + def_ignore,
        'res_shred': stats.res_ignore + res_shred,
        'dmg_bonus_p': fua_dmg_p,
        'vulnerability': vuln,
        'enemylvl': 95
    });

    let efua_primary = outgoing_dmg_js({
        'scaling_attribute': stats_efua.final_atk,
        'cr': stats_efua.final_cr,
        'cd': stats_efua.final_cd + 25,
        'skill_multiplier': efua_atk_mult_primary,
        'def_ignore_p': stats_efua.defignore_p + def_ignore,
        'res_shred': stats_efua.res_ignore + res_shred,
        'dmg_bonus_p': fua_dmg_p,
        'vulnerability': vuln,
        'enemylvl': 95
    });


    let score = 6 * fua_primary + 2 * efua_primary;

    let stats_display = BuildStatsCalculatorNew({
        build: build,
        base_atk: total_base_atk,
        trace_atk_p: lc_atk_p + trace_atk_p,
        base_hp: total_base_hp,
        trace_hp_p: trace_hp_p + lc_hp_p,
        trace_res_p: trace_res,
        trace_ehr_p: trace_ehr + lc_ehr,
        trace_break_effect: lc_break_effect,
        base_spd: char_base_spd, trace_spd_f: trace_spd_f, trace_spd_p: 0,
        trace_defshred: lc_def_ignore,
        trace_cr_p: lc_cr + trace_cr,
        trace_cd_p: trace_cd,
        trace_damage_bonus: lc_damage_bonus,
        trace_fire: trace_fire,
        count_conditionals: false,
    });
    let lbstats = [
        ["ATK", String(Math.floor(stats_display.final_atk))],
        ["CR", trim_after_decimal(stats_display.final_cr) + "%"],
        ["CD", trim_after_decimal(stats_display.final_cd) + "%"],
        ["Fire", trim_after_decimal(stats_display.fire)],
        ["SPD", trim_after_decimal(stats_display.final_spd)]
    ];

    let calcDetails = [
        ["FUA", String(Math.floor(fua_primary))],
        ["Enhanced FUA", String(Math.floor(efua_primary))],
    ];
    if (fuxuan && asta) {
        calcDetails.unshift(["E1S1 Keel Fu Xuan and E6S5 Memories Keel Asta in team", ""]);
        calcDetails.push(["Eff SPD", trim_after_decimal(stats.final_spd)]);
    }
    return [Math.floor(score), stats.final_spd, lbstats, calcDetails];

}

function E0S5_21003_OnlySilenceRemains(build, fuxuan = false, asta = false) {
    let lc_base_atk = lc_dict_by_id['21003']['atk'];
    let lc_base_hp = lc_dict_by_id['21003']['hp'];
    let total_base_atk = char_base_atk + lc_base_atk;
    let total_base_hp = char_base_hp + lc_base_hp;

    let lc_atk_p = 32;
    let lc_cd = 0;
    let lc_cr = 24;
    let lc_hp_p = 0;
    let lc_damage_bonus = 0;
    let lc_dot_bonus = 0;
    let lc_ehr = 0;
    let lc_ult_damage_bonus = 0;
    let lc_skill_damage_bonus = 0;
    let lc_fua_damage_bonus = 0;
    let lc_def_ignore = 0;
    let lc_basic_damage_bonus = 0;
    let lc_break_effect = 0;
    let lc_spd_p = 0;

    let trace_hp_p = 10;
    let trace_fire = 22.4;
    let trace_atk_p = 0;
    let trace_cd = 0;
    let trace_cr = 12;
    let trace_res = 0;
    let trace_spd_f = 0;
    let trace_spd_p = 0;
    let trace_ehr = 0;

    let fuxuan_cr = fuxuan ? 12 : 0;
    let sup_cd = (fuxuan && asta) ? 50 : 0; // asta keel + fx keel + fx E1
    let fuxuan_dmg_bonus = fuxuan ? 9 : 0;
    let asta_spd_f = asta ? 53 : 0;
    let asta_atk_p = asta ? 77 : 0;
    let The_Ashblazing_Grand_Duke_ATK_p = 18;
    let The_Ashblazing_Grand_Duke_ATK_p_efua = 23.4;
    let stats = BuildStatsCalculatorNew({
        build: build,
        base_atk: total_base_atk,
        trace_atk_p: lc_atk_p + trace_atk_p + asta_atk_p,
        base_hp: total_base_hp,
        trace_hp_p: trace_hp_p + lc_hp_p,
        trace_res_p: trace_res,
        trace_ehr_p: trace_ehr + lc_ehr,
        trace_break_effect: lc_break_effect,
        base_spd: char_base_spd, trace_spd_f: trace_spd_f + asta_spd_f, trace_spd_p: trace_spd_p + lc_spd_p,
        trace_defshred: lc_def_ignore,
        trace_cr_p: lc_cr + trace_cr + fuxuan_cr,
        trace_cd_p: lc_cd + trace_cd + sup_cd,
        trace_damage_bonus: lc_damage_bonus + fuxuan_dmg_bonus,
        trace_fire: trace_fire,
        The_Ashblazing_Grand_Duke_ATK_p: The_Ashblazing_Grand_Duke_ATK_p,
    });
    let stats_efua = BuildStatsCalculatorNew({
        build: build,
        base_atk: total_base_atk,
        trace_atk_p: lc_atk_p + trace_atk_p + asta_atk_p,
        base_hp: total_base_hp,
        trace_hp_p: trace_hp_p + lc_hp_p,
        trace_res_p: trace_res,
        trace_ehr_p: trace_ehr + lc_ehr,
        trace_break_effect: lc_break_effect,
        base_spd: char_base_spd, trace_spd_f: trace_spd_f + asta_spd_f, trace_spd_p: trace_spd_p + lc_spd_p,
        trace_defshred: lc_def_ignore,
        trace_cr_p: lc_cr + trace_cr + fuxuan_cr,
        trace_cd_p: lc_cd + trace_cd + sup_cd,
        trace_damage_bonus: lc_damage_bonus + fuxuan_dmg_bonus,
        trace_fire: trace_fire,
        The_Ashblazing_Grand_Duke_ATK_p: The_Ashblazing_Grand_Duke_ATK_p_efua,
    });

    // support stuff
    let res_shred = 0;
    let def_ignore = 0;
    let sup_damage_bonus = 0;

    let a4_fua_dmg_p = 15;
    let asta_fire_dmg_p = asta ? 18 : 0;
    let element_type_dmg = stats.fire + asta_fire_dmg_p;
    let elemental_dmg = element_type_dmg + stats.damage_bonus + sup_damage_bonus;
    let basic_dmg_p = elemental_dmg + stats.basicdmg_p + lc_basic_damage_bonus;
    let skill_dmg_p = elemental_dmg + stats.skilldmg_p + lc_skill_damage_bonus;
    let fua_dmg_p = elemental_dmg + stats.flwupdmg_p + lc_fua_damage_bonus + a4_fua_dmg_p;
    let ult_dmg_p = elemental_dmg + stats.ultdmg_p + lc_ult_damage_bonus;
    let dot_dmg_p = elemental_dmg + stats.dot_bonus + lc_dot_bonus;

    // 1 targets
    let basic_atk_mult_primary = 0;
    let basic_hp_mult_primary = 0;
    let skill_atk_mult_primary = 0;
    let skill_atk_mult_adj = 0;
    let ult_atk_mult_primary = 0;
    let ult_hp_mult_primary = 0;
    let fua_atk_mult_primary = 150;
    let efua_atk_mult_primary = 300;
    let fua_hp_mult_primary = 0;

    let vuln = 50;

    let fua_primary = outgoing_dmg_js({
        'scaling_attribute': stats.final_atk,
        'cr': stats.final_cr,
        'cd': stats.final_cd,
        'skill_multiplier': fua_atk_mult_primary,
        'def_ignore_p': stats.defignore_p + def_ignore,
        'res_shred': stats.res_ignore + res_shred,
        'dmg_bonus_p': fua_dmg_p,
        'vulnerability': vuln,
        'enemylvl': 95
    });

    let efua_primary = outgoing_dmg_js({
        'scaling_attribute': stats_efua.final_atk,
        'cr': stats_efua.final_cr,
        'cd': stats_efua.final_cd + 25,
        'skill_multiplier': efua_atk_mult_primary,
        'def_ignore_p': stats_efua.defignore_p + def_ignore,
        'res_shred': stats_efua.res_ignore + res_shred,
        'dmg_bonus_p': fua_dmg_p,
        'vulnerability': vuln,
        'enemylvl': 95
    });


    let score = 6 * fua_primary + 2 * efua_primary;

    let stats_display = BuildStatsCalculatorNew({
        build: build,
        base_atk: total_base_atk,
        trace_atk_p: lc_atk_p + trace_atk_p,
        base_hp: total_base_hp,
        trace_hp_p: trace_hp_p + lc_hp_p,
        trace_res_p: trace_res,
        trace_ehr_p: trace_ehr + lc_ehr,
        trace_break_effect: lc_break_effect,
        base_spd: char_base_spd, trace_spd_f: trace_spd_f, trace_spd_p: 0,
        trace_defshred: lc_def_ignore,
        trace_cr_p: trace_cr,
        trace_cd_p: lc_cd + trace_cd,
        trace_damage_bonus: lc_damage_bonus,
        trace_fire: trace_fire,
        count_conditionals: false,
    });
    let lbstats = [
        ["ATK", String(Math.floor(stats_display.final_atk))],
        ["CR", trim_after_decimal(stats_display.final_cr) + "%"],
        ["CD", trim_after_decimal(stats_display.final_cd) + "%"],
        ["Fire", trim_after_decimal(stats_display.fire)],
        ["SPD", trim_after_decimal(stats_display.final_spd)]
    ];

    let calcDetails = [
        ["Assumes 2 or less enemies on field", ""],
        ["FUA", String(Math.floor(fua_primary))],
        ["Enhanced FUA", String(Math.floor(efua_primary))],
    ];
    if (fuxuan && asta) {
        calcDetails.unshift(["E1S1 Keel Fu Xuan and E6S5 Memories Keel Asta in team", ""]);
        calcDetails.push(["Eff SPD", trim_after_decimal(stats.final_spd)]);
    }
    return [Math.floor(score), stats.final_spd, lbstats, calcDetails];

}

function E0S1_23012_Sleeplikethedead(build, fuxuan = false, asta = false) {
    let lc_base_atk = lc_dict_by_id['23012']['atk'];
    let lc_base_hp = lc_dict_by_id['23012']['hp'];
    let total_base_atk = char_base_atk + lc_base_atk;
    let total_base_hp = char_base_hp + lc_base_hp;

    let lc_atk_p = 0;
    let lc_cd = 30;
    let lc_cr = 0;
    let lc_hp_p = 0;
    let lc_damage_bonus = 0;
    let lc_dot_bonus = 0;
    let lc_ehr = 0;
    let lc_ult_damage_bonus = 0;
    let lc_skill_damage_bonus = 0;
    let lc_fua_damage_bonus = 0;
    let lc_def_ignore = 0;
    let lc_basic_damage_bonus = 0;
    let lc_break_effect = 0;
    let lc_spd_p = 0;

    let trace_hp_p = 10;
    let trace_fire = 22.4;
    let trace_atk_p = 0;
    let trace_cd = 0;
    let trace_cr = 12;
    let trace_res = 0;
    let trace_spd_f = 0;
    let trace_spd_p = 0;
    let trace_ehr = 0;

    let fuxuan_cr = fuxuan ? 12 : 0;
    let sup_cd = (fuxuan && asta) ? 50 : 0; // asta keel + fx keel + fx E1
    let fuxuan_dmg_bonus = fuxuan ? 9 : 0;
    let asta_spd_f = asta ? 53 : 0;
    let asta_atk_p = asta ? 77 : 0;
    let The_Ashblazing_Grand_Duke_ATK_p = 18;
    let The_Ashblazing_Grand_Duke_ATK_p_efua = 23.4;
    let stats = BuildStatsCalculatorNew({
        build: build,
        base_atk: total_base_atk,
        trace_atk_p: lc_atk_p + trace_atk_p + asta_atk_p,
        base_hp: total_base_hp,
        trace_hp_p: trace_hp_p + lc_hp_p,
        trace_res_p: trace_res,
        trace_ehr_p: trace_ehr + lc_ehr,
        trace_break_effect: lc_break_effect,
        base_spd: char_base_spd, trace_spd_f: trace_spd_f + asta_spd_f, trace_spd_p: trace_spd_p + lc_spd_p,
        trace_defshred: lc_def_ignore,
        trace_cr_p: lc_cr + trace_cr + fuxuan_cr,
        trace_cd_p: lc_cd + trace_cd + sup_cd,
        trace_damage_bonus: lc_damage_bonus + fuxuan_dmg_bonus,
        trace_fire: trace_fire,
        The_Ashblazing_Grand_Duke_ATK_p: The_Ashblazing_Grand_Duke_ATK_p,
    });
    let sltd_cr = sltd_eff_cr(stats.final_cr)
    stats = BuildStatsCalculatorNew({
        build: build,
        base_atk: total_base_atk,
        trace_atk_p: lc_atk_p + trace_atk_p + asta_atk_p,
        base_hp: total_base_hp,
        trace_hp_p: trace_hp_p + lc_hp_p,
        trace_res_p: trace_res,
        trace_ehr_p: trace_ehr + lc_ehr,
        trace_break_effect: lc_break_effect,
        base_spd: char_base_spd, trace_spd_f: trace_spd_f + asta_spd_f, trace_spd_p: trace_spd_p + lc_spd_p,
        trace_defshred: lc_def_ignore,
        trace_cr_p: lc_cr + trace_cr + fuxuan_cr + sltd_cr,
        trace_cd_p: lc_cd + trace_cd + sup_cd,
        trace_damage_bonus: lc_damage_bonus + fuxuan_dmg_bonus,
        trace_fire: trace_fire,
        The_Ashblazing_Grand_Duke_ATK_p: The_Ashblazing_Grand_Duke_ATK_p,
    });
    let stats_efua = BuildStatsCalculatorNew({
        build: build,
        base_atk: total_base_atk,
        trace_atk_p: lc_atk_p + trace_atk_p + asta_atk_p,
        base_hp: total_base_hp,
        trace_hp_p: trace_hp_p + lc_hp_p,
        trace_res_p: trace_res,
        trace_ehr_p: trace_ehr + lc_ehr,
        trace_break_effect: lc_break_effect,
        base_spd: char_base_spd, trace_spd_f: trace_spd_f + asta_spd_f, trace_spd_p: trace_spd_p + lc_spd_p,
        trace_defshred: lc_def_ignore,
        trace_cr_p: lc_cr + trace_cr + fuxuan_cr + sltd_cr,
        trace_cd_p: lc_cd + trace_cd + sup_cd,
        trace_damage_bonus: lc_damage_bonus + fuxuan_dmg_bonus,
        trace_fire: trace_fire,
        The_Ashblazing_Grand_Duke_ATK_p: The_Ashblazing_Grand_Duke_ATK_p_efua,
    });

    // support stuff
    let res_shred = 0;
    let def_ignore = 0;
    let sup_damage_bonus = 0;

    let a4_fua_dmg_p = 15;
    let asta_fire_dmg_p = asta ? 18 : 0;
    let element_type_dmg = stats.fire + asta_fire_dmg_p;
    let elemental_dmg = element_type_dmg + stats.damage_bonus + sup_damage_bonus;
    let basic_dmg_p = elemental_dmg + stats.basicdmg_p + lc_basic_damage_bonus;
    let skill_dmg_p = elemental_dmg + stats.skilldmg_p + lc_skill_damage_bonus;
    let fua_dmg_p = elemental_dmg + stats.flwupdmg_p + lc_fua_damage_bonus + a4_fua_dmg_p;
    let ult_dmg_p = elemental_dmg + stats.ultdmg_p + lc_ult_damage_bonus;
    let dot_dmg_p = elemental_dmg + stats.dot_bonus + lc_dot_bonus;

    // 1 targets
    let basic_atk_mult_primary = 0;
    let basic_hp_mult_primary = 0;
    let skill_atk_mult_primary = 0;
    let skill_atk_mult_adj = 0;
    let ult_atk_mult_primary = 0;
    let ult_hp_mult_primary = 0;
    let fua_atk_mult_primary = 150;
    let efua_atk_mult_primary = 300;
    let fua_hp_mult_primary = 0;

    let vuln = 50;

    let fua_primary = outgoing_dmg_js({
        'scaling_attribute': stats.final_atk,
        'cr': stats.final_cr,
        'cd': stats.final_cd,
        'skill_multiplier': fua_atk_mult_primary,
        'def_ignore_p': stats.defignore_p + def_ignore,
        'res_shred': stats.res_ignore + res_shred,
        'dmg_bonus_p': fua_dmg_p,
        'vulnerability': vuln,
        'enemylvl': 95
    });

    let efua_primary = outgoing_dmg_js({
        'scaling_attribute': stats_efua.final_atk,
        'cr': stats_efua.final_cr,
        'cd': stats_efua.final_cd + 25,
        'skill_multiplier': efua_atk_mult_primary,
        'def_ignore_p': stats_efua.defignore_p + def_ignore,
        'res_shred': stats_efua.res_ignore + res_shred,
        'dmg_bonus_p': fua_dmg_p,
        'vulnerability': vuln,
        'enemylvl': 95
    });


    let score = 6 * fua_primary + 2 * efua_primary;

    let stats_display = BuildStatsCalculatorNew({
        build: build,
        base_atk: total_base_atk,
        trace_atk_p: lc_atk_p + trace_atk_p,
        base_hp: total_base_hp,
        trace_hp_p: trace_hp_p + lc_hp_p,
        trace_res_p: trace_res,
        trace_ehr_p: trace_ehr + lc_ehr,
        trace_break_effect: lc_break_effect,
        base_spd: char_base_spd, trace_spd_f: trace_spd_f, trace_spd_p: 0,
        trace_defshred: lc_def_ignore,
        trace_cr_p: lc_cr + trace_cr,
        trace_cd_p: lc_cd + trace_cd,
        trace_damage_bonus: lc_damage_bonus,
        trace_fire: trace_fire,
        count_conditionals: false,
    });
    let lbstats = [
        ["ATK", String(Math.floor(stats_display.final_atk))],
        ["CR", trim_after_decimal(stats_display.final_cr) + "%"],
        ["CD", trim_after_decimal(stats_display.final_cd) + "%"],
        ["Fire", trim_after_decimal(stats_display.fire)],
        ["SPD", trim_after_decimal(stats_display.final_spd)]
    ];

    let calcDetails = [
        ["Eff CR", trim_after_decimal(stats.final_cr) + "%"],
        ["FUA", String(Math.floor(fua_primary))],
        ["Enhanced FUA", String(Math.floor(efua_primary))],
    ];
    if (fuxuan && asta) {
        calcDetails.unshift(["E1S1 Keel Fu Xuan and E6S5 Memories Keel Asta in team", ""]);
        calcDetails.push(["Eff SPD", trim_after_decimal(stats.final_spd)]);
    }
    return [Math.floor(score), stats.final_spd, lbstats, calcDetails];

}
function sltd_eff_cr(cr) {
    cr = Math.min(Math.max(cr, 5), 100);
    let x = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100];
    let y = [27, 26.5, 26, 25.5, 25, 24, 23, 22, 21, 19, 18, 16, 14, 11, 8, 5, 3, 1, 0.5, 0];
    for (let i = 0; i < x.length - 1; i++) {
        if (x[i] <= cr && cr <= x[i + 1]) {
            let slope = (y[i + 1] - y[i]) / (x[i + 1] - x[i]);
            let cr_b4_resurg = (y[i] + slope * (cr - x[i]));
            return cr_b4_resurg;
        }
    }
    return 0;
}


function E0S5_21010_Swordplay(build, fuxuan = false, asta = false) {
    let lc_base_atk = lc_dict_by_id['21010']['atk'];
    let lc_base_hp = lc_dict_by_id['21010']['hp'];
    let total_base_atk = char_base_atk + lc_base_atk;
    let total_base_hp = char_base_hp + lc_base_hp;

    let lc_atk_p = 0;
    let lc_cd = 0;
    let lc_cr = 0;
    let lc_hp_p = 0;
    let lc_damage_bonus = 80;
    let lc_dot_bonus = 0;
    let lc_ehr = 0;
    let lc_ult_damage_bonus = 0;
    let lc_skill_damage_bonus = 0;
    let lc_fua_damage_bonus = 0;
    let lc_def_ignore = 0;
    let lc_basic_damage_bonus = 0;
    let lc_break_effect = 0;
    let lc_spd_p = 0;

    let trace_hp_p = 10;
    let trace_fire = 22.4;
    let trace_atk_p = 0;
    let trace_cd = 0;
    let trace_cr = 12;
    let trace_res = 0;
    let trace_spd_f = 0;
    let trace_spd_p = 0;
    let trace_ehr = 0;

    let fuxuan_cr = fuxuan ? 12 : 0;
    let sup_cd = (fuxuan && asta) ? 50 : 0; // asta keel + fx keel + fx E1
    let fuxuan_dmg_bonus = fuxuan ? 9 : 0;
    let asta_spd_f = asta ? 53 : 0;
    let asta_atk_p = asta ? 77 : 0;
    let The_Ashblazing_Grand_Duke_ATK_p = 18;
    let The_Ashblazing_Grand_Duke_ATK_p_efua = 23.4;
    let stats = BuildStatsCalculatorNew({
        build: build,
        base_atk: total_base_atk,
        trace_atk_p: lc_atk_p + trace_atk_p + asta_atk_p,
        base_hp: total_base_hp,
        trace_hp_p: trace_hp_p + lc_hp_p,
        trace_res_p: trace_res,
        trace_ehr_p: trace_ehr + lc_ehr,
        trace_break_effect: lc_break_effect,
        base_spd: char_base_spd, trace_spd_f: trace_spd_f + asta_spd_f, trace_spd_p: trace_spd_p + lc_spd_p,
        trace_defshred: lc_def_ignore,
        trace_cr_p: lc_cr + trace_cr + fuxuan_cr,
        trace_cd_p: lc_cd + trace_cd + sup_cd,
        trace_damage_bonus: lc_damage_bonus + fuxuan_dmg_bonus,
        trace_fire: trace_fire,
        The_Ashblazing_Grand_Duke_ATK_p: The_Ashblazing_Grand_Duke_ATK_p,
    });
    let stats_efua = BuildStatsCalculatorNew({
        build: build,
        base_atk: total_base_atk,
        trace_atk_p: lc_atk_p + trace_atk_p + asta_atk_p,
        base_hp: total_base_hp,
        trace_hp_p: trace_hp_p + lc_hp_p,
        trace_res_p: trace_res,
        trace_ehr_p: trace_ehr + lc_ehr,
        trace_break_effect: lc_break_effect,
        base_spd: char_base_spd, trace_spd_f: trace_spd_f + asta_spd_f, trace_spd_p: trace_spd_p + lc_spd_p,
        trace_defshred: lc_def_ignore,
        trace_cr_p: lc_cr + trace_cr + fuxuan_cr,
        trace_cd_p: lc_cd + trace_cd + sup_cd,
        trace_damage_bonus: lc_damage_bonus + fuxuan_dmg_bonus,
        trace_fire: trace_fire,
        The_Ashblazing_Grand_Duke_ATK_p: The_Ashblazing_Grand_Duke_ATK_p_efua,
    });

    // support stuff
    let res_shred = 0;
    let def_ignore = 0;
    let sup_damage_bonus = 0;

    let a4_fua_dmg_p = 15;
    let asta_fire_dmg_p = asta ? 18 : 0;
    let element_type_dmg = stats.fire + asta_fire_dmg_p;
    let elemental_dmg = element_type_dmg + stats.damage_bonus + sup_damage_bonus;
    let basic_dmg_p = elemental_dmg + stats.basicdmg_p + lc_basic_damage_bonus;
    let skill_dmg_p = elemental_dmg + stats.skilldmg_p + lc_skill_damage_bonus;
    let fua_dmg_p = elemental_dmg + stats.flwupdmg_p + lc_fua_damage_bonus + a4_fua_dmg_p;
    let ult_dmg_p = elemental_dmg + stats.ultdmg_p + lc_ult_damage_bonus;
    let dot_dmg_p = elemental_dmg + stats.dot_bonus + lc_dot_bonus;

    // 1 targets
    let basic_atk_mult_primary = 0;
    let basic_hp_mult_primary = 0;
    let skill_atk_mult_primary = 0;
    let skill_atk_mult_adj = 0;
    let ult_atk_mult_primary = 0;
    let ult_hp_mult_primary = 0;
    let fua_atk_mult_primary = 150;
    let efua_atk_mult_primary = 300;
    let fua_hp_mult_primary = 0;

    let vuln = 50;

    let fua_primary = outgoing_dmg_js({
        'scaling_attribute': stats.final_atk,
        'cr': stats.final_cr,
        'cd': stats.final_cd,
        'skill_multiplier': fua_atk_mult_primary,
        'def_ignore_p': stats.defignore_p + def_ignore,
        'res_shred': stats.res_ignore + res_shred,
        'dmg_bonus_p': fua_dmg_p,
        'vulnerability': vuln,
        'enemylvl': 95
    });

    let efua_primary = outgoing_dmg_js({
        'scaling_attribute': stats_efua.final_atk,
        'cr': stats_efua.final_cr,
        'cd': stats_efua.final_cd + 25,
        'skill_multiplier': efua_atk_mult_primary,
        'def_ignore_p': stats_efua.defignore_p + def_ignore,
        'res_shred': stats_efua.res_ignore + res_shred,
        'dmg_bonus_p': fua_dmg_p,
        'vulnerability': vuln,
        'enemylvl': 95
    });


    let score = 6 * fua_primary + 2 * efua_primary;

    let stats_display = BuildStatsCalculatorNew({
        build: build,
        base_atk: total_base_atk,
        trace_atk_p: lc_atk_p + trace_atk_p,
        base_hp: total_base_hp,
        trace_hp_p: trace_hp_p + lc_hp_p,
        trace_res_p: trace_res,
        trace_ehr_p: trace_ehr + lc_ehr,
        trace_break_effect: lc_break_effect,
        base_spd: char_base_spd, trace_spd_f: trace_spd_f, trace_spd_p: 0,
        trace_defshred: lc_def_ignore,
        trace_cr_p: lc_cr + trace_cr,
        trace_cd_p: lc_cd + trace_cd,
        trace_damage_bonus: lc_damage_bonus,
        trace_fire: trace_fire,
        count_conditionals: false,
    });
    let lbstats = [
        ["ATK", String(Math.floor(stats_display.final_atk))],
        ["CR", trim_after_decimal(stats_display.final_cr) + "%"],
        ["CD", trim_after_decimal(stats_display.final_cd) + "%"],
        ["Fire", trim_after_decimal(stats_display.fire)],
        ["SPD", trim_after_decimal(stats_display.final_spd)]
    ];

    let calcDetails = [
        ["LC stacks", "5"],
        ["FUA", String(Math.floor(fua_primary))],
        ["Enhanced FUA", String(Math.floor(efua_primary))],
    ];
    if (fuxuan && asta) {
        calcDetails.unshift(["E1S1 Keel Fu Xuan and E6S5 Memories Keel Asta in team", ""]);
        calcDetails.push(["Eff SPD", trim_after_decimal(stats.final_spd)]);
    }
    return [Math.floor(score), stats.final_spd, lbstats, calcDetails];

}

function E0S5_24001_CruisingintheStellarSea(build, fuxuan = false, asta = false) {
    let lc_base_atk = lc_dict_by_id['24001']['atk'];
    let lc_base_hp = lc_dict_by_id['24001']['hp'];
    let total_base_atk = char_base_atk + lc_base_atk;
    let total_base_hp = char_base_hp + lc_base_hp;

    let lc_atk_p = 40;
    let lc_cd = 0;
    let lc_cr = 16;
    let lc_hp_p = 0;
    let lc_damage_bonus = 0;
    let lc_dot_bonus = 0;
    let lc_ehr = 0;
    let lc_ult_damage_bonus = 0;
    let lc_skill_damage_bonus = 0;
    let lc_fua_damage_bonus = 0;
    let lc_def_ignore = 0;
    let lc_basic_damage_bonus = 0;
    let lc_break_effect = 0;
    let lc_spd_p = 0;

    let trace_hp_p = 10;
    let trace_fire = 22.4;
    let trace_atk_p = 0;
    let trace_cd = 0;
    let trace_cr = 12;
    let trace_res = 0;
    let trace_spd_f = 0;
    let trace_spd_p = 0;
    let trace_ehr = 0;

    let fuxuan_cr = fuxuan ? 12 : 0;
    let sup_cd = (fuxuan && asta) ? 50 : 0; // asta keel + fx keel + fx E1
    let fuxuan_dmg_bonus = fuxuan ? 9 : 0;
    let asta_spd_f = asta ? 53 : 0;
    let asta_atk_p = asta ? 77 : 0;
    let The_Ashblazing_Grand_Duke_ATK_p = 18;
    let The_Ashblazing_Grand_Duke_ATK_p_efua = 23.4;
    let stats = BuildStatsCalculatorNew({
        build: build,
        base_atk: total_base_atk,
        trace_atk_p: lc_atk_p + trace_atk_p + asta_atk_p,
        base_hp: total_base_hp,
        trace_hp_p: trace_hp_p + lc_hp_p,
        trace_res_p: trace_res,
        trace_ehr_p: trace_ehr + lc_ehr,
        trace_break_effect: lc_break_effect,
        base_spd: char_base_spd, trace_spd_f: trace_spd_f + asta_spd_f, trace_spd_p: trace_spd_p + lc_spd_p,
        trace_defshred: lc_def_ignore,
        trace_cr_p: lc_cr + trace_cr + fuxuan_cr,
        trace_cd_p: lc_cd + trace_cd + sup_cd,
        trace_damage_bonus: lc_damage_bonus + fuxuan_dmg_bonus,
        trace_fire: trace_fire,
        The_Ashblazing_Grand_Duke_ATK_p: The_Ashblazing_Grand_Duke_ATK_p,
    });
    let stats_efua = BuildStatsCalculatorNew({
        build: build,
        base_atk: total_base_atk,
        trace_atk_p: lc_atk_p + trace_atk_p + asta_atk_p,
        base_hp: total_base_hp,
        trace_hp_p: trace_hp_p + lc_hp_p,
        trace_res_p: trace_res,
        trace_ehr_p: trace_ehr + lc_ehr,
        trace_break_effect: lc_break_effect,
        base_spd: char_base_spd, trace_spd_f: trace_spd_f + asta_spd_f, trace_spd_p: trace_spd_p + lc_spd_p,
        trace_defshred: lc_def_ignore,
        trace_cr_p: lc_cr + trace_cr + fuxuan_cr,
        trace_cd_p: lc_cd + trace_cd + sup_cd,
        trace_damage_bonus: lc_damage_bonus + fuxuan_dmg_bonus,
        trace_fire: trace_fire,
        The_Ashblazing_Grand_Duke_ATK_p: The_Ashblazing_Grand_Duke_ATK_p_efua,
    });

    // support stuff
    let res_shred = 0;
    let def_ignore = 0;
    let sup_damage_bonus = 0;

    let a4_fua_dmg_p = 15;
    let asta_fire_dmg_p = asta ? 18 : 0;
    let element_type_dmg = stats.fire + asta_fire_dmg_p;
    let elemental_dmg = element_type_dmg + stats.damage_bonus + sup_damage_bonus;
    let basic_dmg_p = elemental_dmg + stats.basicdmg_p + lc_basic_damage_bonus;
    let skill_dmg_p = elemental_dmg + stats.skilldmg_p + lc_skill_damage_bonus;
    let fua_dmg_p = elemental_dmg + stats.flwupdmg_p + lc_fua_damage_bonus + a4_fua_dmg_p;
    let ult_dmg_p = elemental_dmg + stats.ultdmg_p + lc_ult_damage_bonus;
    let dot_dmg_p = elemental_dmg + stats.dot_bonus + lc_dot_bonus;

    // 1 targets
    let basic_atk_mult_primary = 0;
    let basic_hp_mult_primary = 0;
    let skill_atk_mult_primary = 0;
    let skill_atk_mult_adj = 0;
    let ult_atk_mult_primary = 0;
    let ult_hp_mult_primary = 0;
    let fua_atk_mult_primary = 150;
    let efua_atk_mult_primary = 300;
    let fua_hp_mult_primary = 0;

    let vuln = 50;

    let fua_primary_above_50 = outgoing_dmg_js({
        'scaling_attribute': stats.final_atk,
        'cr': stats.final_cr,
        'cd': stats.final_cd,
        'skill_multiplier': fua_atk_mult_primary,
        'def_ignore_p': stats.defignore_p + def_ignore,
        'res_shred': stats.res_ignore + res_shred,
        'dmg_bonus_p': fua_dmg_p,
        'vulnerability': vuln,
        'enemylvl': 95
    });
    let fua_primary_below_50 = outgoing_dmg_js({
        'scaling_attribute': stats.final_atk,
        'cr': stats.final_cr + 16,
        'cd': stats.final_cd,
        'skill_multiplier': fua_atk_mult_primary,
        'def_ignore_p': stats.defignore_p + def_ignore,
        'res_shred': stats.res_ignore + res_shred,
        'dmg_bonus_p': fua_dmg_p,
        'vulnerability': vuln,
        'enemylvl': 95
    });

    let efua_primary_above_50 = outgoing_dmg_js({
        'scaling_attribute': stats_efua.final_atk,
        'cr': stats_efua.final_cr,
        'cd': stats_efua.final_cd + 25,
        'skill_multiplier': efua_atk_mult_primary,
        'def_ignore_p': stats_efua.defignore_p + def_ignore,
        'res_shred': stats_efua.res_ignore + res_shred,
        'dmg_bonus_p': fua_dmg_p,
        'vulnerability': vuln,
        'enemylvl': 95
    })
    let efua_primary_below_50 = outgoing_dmg_js({
        'scaling_attribute': stats_efua.final_atk,
        'cr': stats_efua.final_cr + 16,
        'cd': stats_efua.final_cd + 25,
        'skill_multiplier': efua_atk_mult_primary,
        'def_ignore_p': stats_efua.defignore_p + def_ignore,
        'res_shred': stats_efua.res_ignore + res_shred,
        'dmg_bonus_p': fua_dmg_p,
        'vulnerability': vuln,
        'enemylvl': 95
    })


    let score = 3 * (fua_primary_above_50 + fua_primary_below_50) + (efua_primary_above_50 + efua_primary_below_50)

    let stats_display = BuildStatsCalculatorNew({
        build: build,
        base_atk: total_base_atk,
        trace_atk_p: trace_atk_p,
        base_hp: total_base_hp,
        trace_hp_p: trace_hp_p + lc_hp_p,
        trace_res_p: trace_res,
        trace_ehr_p: trace_ehr + lc_ehr,
        trace_break_effect: lc_break_effect,
        base_spd: char_base_spd, trace_spd_f: trace_spd_f, trace_spd_p: 0,
        trace_defshred: lc_def_ignore,
        trace_cr_p: lc_cr + trace_cr,
        trace_cd_p: lc_cd + trace_cd,
        trace_damage_bonus: lc_damage_bonus,
        trace_fire: trace_fire,
        count_conditionals: false,
    });
    let lbstats = [
        ["ATK", String(Math.floor(stats_display.final_atk))],
        ["CR", trim_after_decimal(stats_display.final_cr) + "%"],
        ["CD", trim_after_decimal(stats_display.final_cd) + "%"],
        ["Fire", trim_after_decimal(stats_display.fire)],
        ["SPD", trim_after_decimal(stats_display.final_spd)]
    ];

    let calcDetails = [
        ["Boat passive uptime", "100%"],
        ["FUA Average", String(Math.floor((fua_primary_above_50 + fua_primary_below_50) / 2))],
        ["Over 50% / Under", String(Math.floor(fua_primary_above_50)) + " / " + String(Math.floor(fua_primary_below_50))],
        ["EFUA Average", String(Math.floor((efua_primary_above_50 + efua_primary_below_50) / 2))],
        ["Over 50% / Under", String(Math.floor(efua_primary_above_50)) + " / " + String(Math.floor(efua_primary_below_50))],

    ];
    if (fuxuan && asta) {
        calcDetails.unshift(["E1S1 Keel Fu Xuan and E6S5 Memories Keel Asta in team", ""]);
        calcDetails.push(["Eff SPD", trim_after_decimal(stats.final_spd)]);
    }
    return [Math.floor(score), stats.final_spd, lbstats, calcDetails];

}

function E0S1_23016_WorrisomeBlissful(build, fuxuan = false, asta = false) {
    let lc_base_atk = lc_dict_by_id['23016']['atk'];
    let lc_base_hp = lc_dict_by_id['23016']['hp'];
    let total_base_atk = char_base_atk + lc_base_atk;
    let total_base_hp = char_base_hp + lc_base_hp;

    let lc_atk_p = 0;
    let lc_cd = 24;
    let lc_cr = 18;
    let lc_hp_p = 0;
    let lc_damage_bonus = 0;
    let lc_dot_bonus = 0;
    let lc_ehr = 0;
    let lc_ult_damage_bonus = 0;
    let lc_skill_damage_bonus = 0;
    let lc_fua_damage_bonus = 30;
    let lc_def_ignore = 0;
    let lc_basic_damage_bonus = 0;
    let lc_break_effect = 0;
    let lc_spd_p = 0;

    let trace_hp_p = 10;
    let trace_fire = 22.4;
    let trace_atk_p = 0;
    let trace_cd = 0;
    let trace_cr = 12;
    let trace_res = 0;
    let trace_spd_f = 0;
    let trace_spd_p = 0;
    let trace_ehr = 0;

    let fuxuan_cr = fuxuan ? 12 : 0;
    let sup_cd = (fuxuan && asta) ? 50 : 0; // asta keel + fx keel + fx E1
    let fuxuan_dmg_bonus = fuxuan ? 9 : 0;
    let asta_spd_f = asta ? 53 : 0;
    let asta_atk_p = asta ? 77 : 0;
    let The_Ashblazing_Grand_Duke_ATK_p = 18;
    let The_Ashblazing_Grand_Duke_ATK_p_efua = 23.4;
    let stats = BuildStatsCalculatorNew({
        build: build,
        base_atk: total_base_atk,
        trace_atk_p: lc_atk_p + trace_atk_p + asta_atk_p,
        base_hp: total_base_hp,
        trace_hp_p: trace_hp_p + lc_hp_p,
        trace_res_p: trace_res,
        trace_ehr_p: trace_ehr + lc_ehr,
        trace_break_effect: lc_break_effect,
        base_spd: char_base_spd, trace_spd_f: trace_spd_f + asta_spd_f, trace_spd_p: trace_spd_p + lc_spd_p,
        trace_defshred: lc_def_ignore,
        trace_cr_p: lc_cr + trace_cr + fuxuan_cr,
        trace_cd_p: lc_cd + trace_cd + sup_cd,
        trace_damage_bonus: lc_damage_bonus + fuxuan_dmg_bonus,
        trace_fire: trace_fire,
        The_Ashblazing_Grand_Duke_ATK_p: The_Ashblazing_Grand_Duke_ATK_p,
    });
    let stats_efua = BuildStatsCalculatorNew({
        build: build,
        base_atk: total_base_atk,
        trace_atk_p: lc_atk_p + trace_atk_p + asta_atk_p,
        base_hp: total_base_hp,
        trace_hp_p: trace_hp_p + lc_hp_p,
        trace_res_p: trace_res,
        trace_ehr_p: trace_ehr + lc_ehr,
        trace_break_effect: lc_break_effect,
        base_spd: char_base_spd, trace_spd_f: trace_spd_f + asta_spd_f, trace_spd_p: trace_spd_p + lc_spd_p,
        trace_defshred: lc_def_ignore,
        trace_cr_p: lc_cr + trace_cr + fuxuan_cr,
        trace_cd_p: lc_cd + trace_cd + sup_cd,
        trace_damage_bonus: lc_damage_bonus + fuxuan_dmg_bonus,
        trace_fire: trace_fire,
        The_Ashblazing_Grand_Duke_ATK_p: The_Ashblazing_Grand_Duke_ATK_p_efua,
    });

    // support stuff
    let res_shred = 0;
    let def_ignore = 0;
    let sup_damage_bonus = 0;

    let a4_fua_dmg_p = 15;
    let asta_fire_dmg_p = asta ? 18 : 0;
    let element_type_dmg = stats.fire + asta_fire_dmg_p;
    let elemental_dmg = element_type_dmg + stats.damage_bonus + sup_damage_bonus;
    let basic_dmg_p = elemental_dmg + stats.basicdmg_p + lc_basic_damage_bonus;
    let skill_dmg_p = elemental_dmg + stats.skilldmg_p + lc_skill_damage_bonus;
    let fua_dmg_p = elemental_dmg + stats.flwupdmg_p + lc_fua_damage_bonus + a4_fua_dmg_p;
    let ult_dmg_p = elemental_dmg + stats.ultdmg_p + lc_ult_damage_bonus;
    let dot_dmg_p = elemental_dmg + stats.dot_bonus + lc_dot_bonus;

    // 1 targets
    let basic_atk_mult_primary = 0;
    let basic_hp_mult_primary = 0;
    let skill_atk_mult_primary = 0;
    let skill_atk_mult_adj = 0;
    let ult_atk_mult_primary = 0;
    let ult_hp_mult_primary = 0;
    let fua_atk_mult_primary = 150;
    let efua_atk_mult_primary = 300;
    let fua_hp_mult_primary = 0;

    let vuln = 50;

    let fua_primary = outgoing_dmg_js({
        'scaling_attribute': stats.final_atk,
        'cr': stats.final_cr,
        'cd': stats.final_cd,
        'skill_multiplier': fua_atk_mult_primary,
        'def_ignore_p': stats.defignore_p + def_ignore,
        'res_shred': stats.res_ignore + res_shred,
        'dmg_bonus_p': fua_dmg_p,
        'vulnerability': vuln,
        'enemylvl': 95
    });

    let efua_primary = outgoing_dmg_js({
        'scaling_attribute': stats_efua.final_atk,
        'cr': stats_efua.final_cr,
        'cd': stats_efua.final_cd + 25,
        'skill_multiplier': efua_atk_mult_primary,
        'def_ignore_p': stats_efua.defignore_p + def_ignore,
        'res_shred': stats_efua.res_ignore + res_shred,
        'dmg_bonus_p': fua_dmg_p,
        'vulnerability': vuln,
        'enemylvl': 95
    });


    let score = 6 * fua_primary + 2 * efua_primary;

    let stats_display = BuildStatsCalculatorNew({
        build: build,
        base_atk: total_base_atk,
        trace_atk_p: lc_atk_p + trace_atk_p,
        base_hp: total_base_hp,
        trace_hp_p: trace_hp_p + lc_hp_p,
        trace_res_p: trace_res,
        trace_ehr_p: trace_ehr + lc_ehr,
        trace_break_effect: lc_break_effect,
        base_spd: char_base_spd, trace_spd_f: trace_spd_f, trace_spd_p: 0,
        trace_defshred: lc_def_ignore,
        trace_cr_p: lc_cr + trace_cr,
        trace_cd_p: lc_cd + trace_cd,
        trace_damage_bonus: lc_damage_bonus,
        trace_fire: trace_fire,
        count_conditionals: false,
    });
    let lbstats = [
        ["ATK", String(Math.floor(stats_display.final_atk))],
        ["CR", trim_after_decimal(stats_display.final_cr) + "%"],
        ["CD", trim_after_decimal(stats_display.final_cd) + "%"],
        ["Fire", trim_after_decimal(stats_display.fire)],
        ["SPD", trim_after_decimal(stats_display.final_spd)]
    ];

    let calcDetails = [
        ["FUA", String(Math.floor(fua_primary))],
        ["Enhanced FUA", String(Math.floor(efua_primary))],
    ];
    if (fuxuan && asta) {
        calcDetails.unshift(["E1S1 Keel Fu Xuan and E6S5 Memories Keel Asta in team", ""]);
        calcDetails.push(["Eff SPD", trim_after_decimal(stats.final_spd)]);
    }
    return [Math.floor(score), stats.final_spd, lbstats, calcDetails];

}
