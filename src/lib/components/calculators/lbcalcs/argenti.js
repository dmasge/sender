import { outgoing_dmg_js, hit_prob, trim_after_decimal } from '$lib/components/calculators/damage_formulas.js';
import { BuildStatsCalculatorNew, assign_lb_to_build } from '$lib/components/calculators/build_stats_calculator_new.js';
import { lc_dict_by_id } from "$lib/components/calculators/lbcalcs/lightcones.js"


// 1302
export function score_argenti(build, optimizationTarget) {
    let score = 0;
    let spd = 0;
    let lbstats = [];
    let calcDetails = [];
    let breakpoints = ["", "120.1", "133.34", "142.9", "160.1", "171.5", "200.1"];


    if (optimizationTarget == "" || (optimizationTarget != "" && !optimizationTarget.includes("HNYA")))
        if ("23018" == build['lc']['id'] && build['e'] >= 4) {
            [score, spd, lbstats, calcDetails] = E6S5_23018_AnInstantBeforeAGaze(build, false);
            let ctgrname = 'E6S5_' + build['lc']['id'] + "TY";
            build = assign_lb_to_build(build, ctgrname, score, lbstats, spd, breakpoints, calcDetails);
        } else if ("23018" == build['lc']['id']) {
            [score, spd, lbstats, calcDetails] = E0S1_23018_AnInstantBeforeAGaze(build, false);
            let ctgrname = 'E0S1_' + build['lc']['id'] + "TY";
            build = assign_lb_to_build(build, ctgrname, score, lbstats, spd, breakpoints, calcDetails);
        } else if ("21034" == build['lc']['id']) {
            [score, spd, lbstats, calcDetails] = E0S5_21034_TodayIsAnotherPeacefulDay(build, false);
            let ctgrname = 'E0S5_' + build['lc']['id'] + "TY";
            build = assign_lb_to_build(build, ctgrname, score, lbstats, spd, breakpoints, calcDetails);
        } else if ("21020" == build['lc']['id']) {
            [score, spd, lbstats, calcDetails] = E0S5_21020_GeniusesRepose(build, false);
            let ctgrname = 'E0S5_' + build['lc']['id'] + "TY";
            build = assign_lb_to_build(build, ctgrname, score, lbstats, spd, breakpoints, calcDetails);
        } else if ("21027" == build['lc']['id']) {
            [score, spd, lbstats, calcDetails] = E0S5_21027_TheSeriousnessofBreakfast(build, false);
            let ctgrname = 'E0S5_' + build['lc']['id'] + "TY";
            build = assign_lb_to_build(build, ctgrname, score, lbstats, spd, breakpoints, calcDetails);
        } else if ("21013" == build['lc']['id']) {
            [score, spd, lbstats, calcDetails] = E0S5_21013_MaketheWorldClamor(build, false);
            let ctgrname = 'E0S5_' + build['lc']['id'] + "TY";
            build = assign_lb_to_build(build, ctgrname, score, lbstats, spd, breakpoints, calcDetails);
        } else if ("23000" == build['lc']['id']) {
            [score, spd, lbstats, calcDetails] = E0S1_23000_NightontheMilkyWay(build, false);
            let ctgrname = 'E0S1_' + build['lc']['id'] + "TY";
            build = assign_lb_to_build(build, ctgrname, score, lbstats, spd, breakpoints, calcDetails);
        } else if ("23010" == build['lc']['id']) {
            [score, spd, lbstats, calcDetails] = E0S1_23010_BeforeDawn(build, false);
            let ctgrname = 'E0S1_' + build['lc']['id'] + "TY";
            build = assign_lb_to_build(build, ctgrname, score, lbstats, spd, breakpoints, calcDetails);
        }

    if (optimizationTarget == "" || (optimizationTarget != "" && optimizationTarget.includes("HNYA")))
        breakpoints = ["", "160.1", "171.5", "200.1"];
        if ("23018" == build['lc']['id'] && build['e'] >= 4) {
            [score, spd, lbstats, calcDetails] = E6S5_23018_AnInstantBeforeAGaze(build, true);
            let ctgrname = 'E6S5_' + build['lc']['id'] + "TYHNYA";
            build = assign_lb_to_build(build, ctgrname, score, lbstats, spd, breakpoints, calcDetails);
        } else if ("23018" == build['lc']['id']) {
            [score, spd, lbstats, calcDetails] = E0S1_23018_AnInstantBeforeAGaze(build, true);
            let ctgrname = 'E0S1_' + build['lc']['id'] + "TYHNYA";
            build = assign_lb_to_build(build, ctgrname, score, lbstats, spd, breakpoints, calcDetails);
        } else if ("21034" == build['lc']['id']) {
            [score, spd, lbstats, calcDetails] = E0S5_21034_TodayIsAnotherPeacefulDay(build, true);
            let ctgrname = 'E0S5_' + build['lc']['id'] + "TYHNYA";
            build = assign_lb_to_build(build, ctgrname, score, lbstats, spd, breakpoints, calcDetails);
        } else if ("21020" == build['lc']['id']) {
            [score, spd, lbstats, calcDetails] = E0S5_21020_GeniusesRepose(build, true);
            let ctgrname = 'E0S5_' + build['lc']['id'] + "TYHNYA";
            build = assign_lb_to_build(build, ctgrname, score, lbstats, spd, breakpoints, calcDetails);
        } else if ("21027" == build['lc']['id']) {
            [score, spd, lbstats, calcDetails] = E0S5_21027_TheSeriousnessofBreakfast(build, true);
            let ctgrname = 'E0S5_' + build['lc']['id'] + "TYHNYA";
            build = assign_lb_to_build(build, ctgrname, score, lbstats, spd, breakpoints, calcDetails);
        } else if ("21013" == build['lc']['id']) {
            [score, spd, lbstats, calcDetails] = E0S5_21013_MaketheWorldClamor(build, true);
            let ctgrname = 'E0S5_' + build['lc']['id'] + "TYHNYA";
            build = assign_lb_to_build(build, ctgrname, score, lbstats, spd, breakpoints, calcDetails);
        } else if ("23000" == build['lc']['id']) {
            [score, spd, lbstats, calcDetails] = E0S1_23000_NightontheMilkyWay(build, true);
            let ctgrname = 'E0S1_' + build['lc']['id'] + "TYHNYA";
            build = assign_lb_to_build(build, ctgrname, score, lbstats, spd, breakpoints, calcDetails);
        } else if ("23010" == build['lc']['id']) {
            [score, spd, lbstats, calcDetails] = E0S1_23010_BeforeDawn(build, true);
            let ctgrname = 'E0S1_' + build['lc']['id'] + "TYHNYA";
            build = assign_lb_to_build(build, ctgrname, score, lbstats, spd, breakpoints, calcDetails);
        }

    return build;
}

let char_base_hp = 1047.816;
let char_base_atk = 737.352;
let char_base_spd = 103;

function E0S1_23010_BeforeDawn(build, hanya = false) {
    let lc_base_atk = lc_dict_by_id['23010']['atk'];
    let lc_base_hp = lc_dict_by_id['23010']['hp'];
    let total_base_atk = char_base_atk + lc_base_atk;
    let total_base_hp = char_base_hp + lc_base_hp;

    let lc_atk_p = 0;
    let lc_cd = 36;
    let lc_cr = 0;
    let lc_hp_p = 0;
    let lc_damage_bonus = 0; 
    let lc_dot_bonus = 0;
    let lc_ehr = 0;
    let lc_ult_damage_bonus = 18;
    let lc_skill_damage_bonus = 0;
    let lc_fua_damage_bonus = 48;
    let lc_def_ignore = 0;
    let lc_basic_damage_bonus = 0;
    let lc_break_effect = 0;
    let lc_spd_p = 0;

    let trace_hp_p = 10;
    let trace_fire = 0;
    let trace_phys = 14.4
    let trace_atk_p = 28;
    let trace_cd = 0;
    let trace_cr = 0;
    let trace_res = 0;
    let trace_spd_f = 0;
    let trace_spd_p = 0;
    let trace_ehr = 0;
    let trace_def_p = 0;


    let a6_dmg_bonus_half_uptime = 7.5; // originally 15
    let talent_cr = 25;
    let ting_benediction_atk_p = 55; 
    let hanya_spd_f =  hanya ? 42.21 : 0;
    let hanya_atk_p =  hanya ? 69.8 : 0; // 64.8 (ult) + 5 (a2 with 50% uptime) + 
    let hanya_damage_bonus = hanya ? 43 : 0; // talent E6
    let hanya_penacony_phys = hanya ? 10 : 0;
    let stats = BuildStatsCalculatorNew({
        build: build,
        base_atk: total_base_atk,
        trace_atk_p: lc_atk_p + trace_atk_p + ting_benediction_atk_p + hanya_atk_p,
        base_hp: total_base_hp,
        trace_hp_p: trace_hp_p + lc_hp_p,
        trace_def_p: trace_def_p,
        trace_res_p: trace_res,
        trace_ehr_p: trace_ehr + lc_ehr,
        trace_break_effect: lc_break_effect,
        base_spd: char_base_spd, trace_spd_f: trace_spd_f + hanya_spd_f, trace_spd_p: trace_spd_p + lc_spd_p,
        trace_defshred: lc_def_ignore,
        trace_cr_p: lc_cr + trace_cr + talent_cr,
        trace_cd_p: lc_cd + trace_cd + 10, // 10 is from ting keel
        trace_damage_bonus: lc_damage_bonus + a6_dmg_bonus_half_uptime + hanya_damage_bonus,
        trace_fire: trace_fire,
        trace_phys: trace_phys + hanya_penacony_phys,
        The_Ashblazing_Grand_Duke_ATK_p: 0,
    });


    // support stuff
    let res_shred = 0;
    let def_ignore = 0;
    let sup_damage_bonus = 0;
    let ting_ult_damage_bonus = 56;

    let element_type_dmg = stats.phys;
    let elemental_dmg = element_type_dmg + stats.damage_bonus + sup_damage_bonus;
    let basic_dmg_p = elemental_dmg + stats.basicdmg_p + lc_basic_damage_bonus;
    let skill_dmg_p = elemental_dmg + stats.skilldmg_p + lc_skill_damage_bonus;
    let fua_dmg_p = elemental_dmg + stats.flwupdmg_p + lc_fua_damage_bonus;
    let ult_dmg_p = elemental_dmg + stats.ultdmg_p + lc_ult_damage_bonus;
    let dot_dmg_p = elemental_dmg + stats.dot_bonus + lc_dot_bonus;
    

    // 1 targets
    let basic_atk_mult_primary = 0;
    let basic_hp_mult_primary = 0;
    let skill_atk_mult_primary = 120;
    let skill_atk_mult_adj = 0;
    let ult_atk_mult_primary = 280;
    let ult_hp_mult_primary = 0;
    let fua_atk_mult_primary = 0;
    let efua_atk_mult_primary = 0;
    let fua_hp_mult_primary = 0;

    let vuln = 0;

    let skill_primary = outgoing_dmg_js({
        'scaling_attribute': stats.final_atk,
        'cr': stats.final_cr,
        'cd': stats.final_cd,
        'def_ignore_p': stats.defignore_p + def_ignore,
        'res_shred': stats.res_ignore + res_shred,
        'vulnerability': vuln,
        'skill_multiplier': skill_atk_mult_primary,
        'dmg_bonus_p': skill_dmg_p,
        'enemylvl': 95
    });

    let benediction_atk_mult = 64;
    let benediction_dmg_dealt = outgoing_dmg_js({
        'scaling_attribute': stats.final_atk,
        'cr': stats.final_cr,
        'cd': stats.final_cd,
        'def_ignore_p': stats.defignore_p + def_ignore,
        'res_shred': stats.res_ignore + res_shred,
        'vulnerability': vuln,
        'skill_multiplier': benediction_atk_mult,
        'dmg_bonus_p': stats.damage_bonus,
        'enemylvl': 95
    });
    let benediction_dmg_dealt_tingult = outgoing_dmg_js({
        'scaling_attribute': stats.final_atk,
        'cr': stats.final_cr,
        'cd': stats.final_cd,
        'def_ignore_p': stats.defignore_p + def_ignore,
        'res_shred': stats.res_ignore + res_shred,
        'vulnerability': vuln,
        'skill_multiplier': 192, // trice
        'dmg_bonus_p': stats.damage_bonus + ting_ult_damage_bonus,
        'enemylvl': 95
    });

    let skill_primary_tingult = outgoing_dmg_js({
        'scaling_attribute': stats.final_atk,
        'cr': stats.final_cr,
        'cd': stats.final_cd,
        'def_ignore_p': stats.defignore_p + def_ignore,
        'res_shred': stats.res_ignore + res_shred,
        'vulnerability': vuln,
        'skill_multiplier': skill_atk_mult_primary,
        'dmg_bonus_p': skill_dmg_p + ting_ult_damage_bonus,
        'enemylvl': 95
    });

    let ult_primary_tingult = outgoing_dmg_js({
        'scaling_attribute': stats.final_atk,
        'cr': stats.final_cr,
        'cd': stats.final_cd,
        'def_ignore_p': stats.defignore_p + def_ignore,
        'res_shred': stats.res_ignore + res_shred,
        'vulnerability': vuln,
        'skill_multiplier': ult_atk_mult_primary,
        'dmg_bonus_p': ult_dmg_p + ting_ult_damage_bonus,
        'enemylvl': 95
    });

    let ult_extra_mult = 570
    let ult_extra_tingult = outgoing_dmg_js({
        'scaling_attribute': stats.final_atk,
        'cr': stats.final_cr,
        'cd': stats.final_cd,
        'def_ignore_p': stats.defignore_p + def_ignore,
        'res_shred': stats.res_ignore + res_shred,
        'vulnerability': vuln,
        'skill_multiplier': ult_extra_mult,
        'dmg_bonus_p': ult_dmg_p + ting_ult_damage_bonus,
        'enemylvl': 95
    });


    let score = 3 * (skill_primary + 2 * skill_primary_tingult + ult_primary_tingult) + ult_extra_tingult + benediction_dmg_dealt + benediction_dmg_dealt_tingult;
    let stats_display = BuildStatsCalculatorNew({
        build: build,
        base_atk: total_base_atk,
        trace_atk_p: trace_atk_p,
        base_hp: total_base_hp,
        trace_hp_p: trace_hp_p + lc_hp_p,
        trace_res_p: trace_res,
        trace_ehr_p: trace_ehr + lc_ehr,
        trace_break_effect: lc_break_effect,
        base_spd: char_base_spd, trace_spd_f: trace_spd_f, trace_spd_p: trace_spd_p + lc_spd_p,
        trace_defshred: lc_def_ignore,
        trace_cr_p: trace_cr,
        trace_cd_p: trace_cd + lc_cd,
        trace_damage_bonus: lc_damage_bonus,
        trace_fire: trace_fire,
        trace_phys: trace_phys,
        The_Ashblazing_Grand_Duke_ATK_p: 0,
        count_conditionals: false,
    });

    let lbstats = [
        ["ATK", String(Math.floor(stats_display.final_atk))],
        ["CR", trim_after_decimal(stats_display.final_cr) + "%"],
        ["CD", trim_after_decimal(stats_display.final_cd) + "%"],
        ["Phys", trim_after_decimal(stats_display.phys)],
        ["SPD", trim_after_decimal(stats_display.final_spd)]
    ];

    let calcDetails = [
        ['E6S5 Cogs Keel Tingyun', ""],
        ["Apotheosis stacks", "10×"],
        ["Skill (st)", String(Math.floor(skill_primary))],
        ["Benediction", String(Math.floor(benediction_dmg_dealt))],
        ["Skill (st, TY ULT)", String(Math.floor(skill_primary_tingult))],
        ["ULT (180E, st, TY ULT)", String(Math.floor(ult_primary_tingult))],
        ["ULT Extra (TY ULT)", String(Math.floor(ult_extra_tingult))],
        ["Benediction (TY ULT)", String(Math.floor(benediction_dmg_dealt_tingult))],
    ];
    if (hanya) {
        calcDetails.unshift(["E6S5 Cogs Penacony 201SPD Hanya", ""]);
        calcDetails.push(["EFF SPD", trim_after_decimal(stats.final_spd)]);
    }

    return [Math.floor(score), stats.final_spd, lbstats, calcDetails];

}


function E0S1_23000_NightontheMilkyWay(build, hanya = false) {
    let lc_base_atk = lc_dict_by_id['23000']['atk'];
    let lc_base_hp = lc_dict_by_id['23000']['hp'];
    let total_base_atk = char_base_atk + lc_base_atk;
    let total_base_hp = char_base_hp + lc_base_hp;

    let lc_atk_p = 27;
    let lc_cd = 0;
    let lc_cr = 0;
    let lc_hp_p = 0;
    let lc_damage_bonus = 15; // 50% uptime 
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
    let trace_fire = 0;
    let trace_phys = 14.4
    let trace_atk_p = 28;
    let trace_cd = 0;
    let trace_cr = 0;
    let trace_res = 0;
    let trace_spd_f = 0;
    let trace_spd_p = 0;
    let trace_ehr = 0;
    let trace_def_p = 0;


    let a6_dmg_bonus_half_uptime = 7.5; // originally 15
    let talent_cr = 25;
    let ting_benediction_atk_p = 55; 
    let hanya_spd_f =  hanya ? 42.21 : 0;
    let hanya_atk_p =  hanya ? 69.8 : 0; // 64.8 (ult) + 5 (a2 with 50% uptime) + 
    let hanya_damage_bonus = hanya ? 43 : 0; // talent E6
    let hanya_penacony_phys = hanya ? 10 : 0;
    let stats = BuildStatsCalculatorNew({
        build: build,
        base_atk: total_base_atk,
        trace_atk_p: lc_atk_p + trace_atk_p + ting_benediction_atk_p + hanya_atk_p,
        base_hp: total_base_hp,
        trace_hp_p: trace_hp_p + lc_hp_p,
        trace_def_p: trace_def_p,
        trace_res_p: trace_res,
        trace_ehr_p: trace_ehr + lc_ehr,
        trace_break_effect: lc_break_effect,
        base_spd: char_base_spd, trace_spd_f: trace_spd_f + hanya_spd_f, trace_spd_p: trace_spd_p + lc_spd_p,
        trace_defshred: lc_def_ignore,
        trace_cr_p: lc_cr + trace_cr + talent_cr,
        trace_cd_p: lc_cd + trace_cd + 10, // 10 is from ting keel
        trace_damage_bonus: lc_damage_bonus + a6_dmg_bonus_half_uptime + hanya_damage_bonus,
        trace_fire: trace_fire,
        trace_phys: trace_phys + hanya_penacony_phys,
        The_Ashblazing_Grand_Duke_ATK_p: 0,
    });


    // support stuff
    let res_shred = 0;
    let def_ignore = 0;
    let sup_damage_bonus = 0;
    let ting_ult_damage_bonus = 56;

    let element_type_dmg = stats.phys;
    let elemental_dmg = element_type_dmg + stats.damage_bonus + sup_damage_bonus;
    let basic_dmg_p = elemental_dmg + stats.basicdmg_p + lc_basic_damage_bonus;
    let skill_dmg_p = elemental_dmg + stats.skilldmg_p + lc_skill_damage_bonus;
    let fua_dmg_p = elemental_dmg + stats.flwupdmg_p + lc_fua_damage_bonus;
    let ult_dmg_p = elemental_dmg + stats.ultdmg_p + lc_ult_damage_bonus;
    let dot_dmg_p = elemental_dmg + stats.dot_bonus + lc_dot_bonus;
    

    // 1 targets
    let basic_atk_mult_primary = 0;
    let basic_hp_mult_primary = 0;
    let skill_atk_mult_primary = 120;
    let skill_atk_mult_adj = 0;
    let ult_atk_mult_primary = 280;
    let ult_hp_mult_primary = 0;
    let fua_atk_mult_primary = 0;
    let efua_atk_mult_primary = 0;
    let fua_hp_mult_primary = 0;

    let vuln = 0;

    let skill_primary = outgoing_dmg_js({
        'scaling_attribute': stats.final_atk,
        'cr': stats.final_cr,
        'cd': stats.final_cd,
        'def_ignore_p': stats.defignore_p + def_ignore,
        'res_shred': stats.res_ignore + res_shred,
        'vulnerability': vuln,
        'skill_multiplier': skill_atk_mult_primary,
        'dmg_bonus_p': skill_dmg_p,
        'enemylvl': 95
    });

    let benediction_atk_mult = 64;
    let benediction_dmg_dealt = outgoing_dmg_js({
        'scaling_attribute': stats.final_atk,
        'cr': stats.final_cr,
        'cd': stats.final_cd,
        'def_ignore_p': stats.defignore_p + def_ignore,
        'res_shred': stats.res_ignore + res_shred,
        'vulnerability': vuln,
        'skill_multiplier': benediction_atk_mult,
        'dmg_bonus_p': stats.damage_bonus,
        'enemylvl': 95
    });
    let benediction_dmg_dealt_tingult = outgoing_dmg_js({
        'scaling_attribute': stats.final_atk,
        'cr': stats.final_cr,
        'cd': stats.final_cd,
        'def_ignore_p': stats.defignore_p + def_ignore,
        'res_shred': stats.res_ignore + res_shred,
        'vulnerability': vuln,
        'skill_multiplier': 192, // trice
        'dmg_bonus_p': stats.damage_bonus + ting_ult_damage_bonus,
        'enemylvl': 95
    });

    let skill_primary_tingult = outgoing_dmg_js({
        'scaling_attribute': stats.final_atk,
        'cr': stats.final_cr,
        'cd': stats.final_cd,
        'def_ignore_p': stats.defignore_p + def_ignore,
        'res_shred': stats.res_ignore + res_shred,
        'vulnerability': vuln,
        'skill_multiplier': skill_atk_mult_primary,
        'dmg_bonus_p': skill_dmg_p + ting_ult_damage_bonus,
        'enemylvl': 95
    });

    let ult_primary_tingult = outgoing_dmg_js({
        'scaling_attribute': stats.final_atk,
        'cr': stats.final_cr,
        'cd': stats.final_cd,
        'def_ignore_p': stats.defignore_p + def_ignore,
        'res_shred': stats.res_ignore + res_shred,
        'vulnerability': vuln,
        'skill_multiplier': ult_atk_mult_primary,
        'dmg_bonus_p': ult_dmg_p + ting_ult_damage_bonus,
        'enemylvl': 95
    });

    let ult_extra_mult = 570
    let ult_extra_tingult = outgoing_dmg_js({
        'scaling_attribute': stats.final_atk,
        'cr': stats.final_cr,
        'cd': stats.final_cd,
        'def_ignore_p': stats.defignore_p + def_ignore,
        'res_shred': stats.res_ignore + res_shred,
        'vulnerability': vuln,
        'skill_multiplier': ult_extra_mult,
        'dmg_bonus_p': ult_dmg_p + ting_ult_damage_bonus,
        'enemylvl': 95
    });


    let score = 3 * (skill_primary + 2 * skill_primary_tingult + ult_primary_tingult) + ult_extra_tingult + benediction_dmg_dealt + benediction_dmg_dealt_tingult;
    let stats_display = BuildStatsCalculatorNew({
        build: build,
        base_atk: total_base_atk,
        trace_atk_p: trace_atk_p,
        base_hp: total_base_hp,
        trace_hp_p: trace_hp_p + lc_hp_p,
        trace_res_p: trace_res,
        trace_ehr_p: trace_ehr + lc_ehr,
        trace_break_effect: lc_break_effect,
        base_spd: char_base_spd, trace_spd_f: trace_spd_f, trace_spd_p: trace_spd_p + lc_spd_p,
        trace_defshred: lc_def_ignore,
        trace_cr_p: trace_cr,
        trace_cd_p: trace_cd + lc_cd,
        trace_damage_bonus: lc_damage_bonus,
        trace_fire: trace_fire,
        trace_phys: trace_phys,
        The_Ashblazing_Grand_Duke_ATK_p: 0,
        count_conditionals: false,
    });

    let lbstats = [
        ["ATK", String(Math.floor(stats_display.final_atk))],
        ["CR", trim_after_decimal(stats_display.final_cr) + "%"],
        ["CD", trim_after_decimal(stats_display.final_cd) + "%"],
        ["Phys", trim_after_decimal(stats_display.phys)],
        ["SPD", trim_after_decimal(stats_display.final_spd)]
    ];

    let calcDetails = [
        ['E6S5 Cogs Keel Tingyun', ""],
        ["Apotheosis stacks", "10×"],
        ["Skill (st)", String(Math.floor(skill_primary))],
        ["Benediction", String(Math.floor(benediction_dmg_dealt))],
        ["Skill (st, TY ULT)", String(Math.floor(skill_primary_tingult))],
        ["ULT (180E, st, TY ULT)", String(Math.floor(ult_primary_tingult))],
        ["ULT Extra (TY ULT)", String(Math.floor(ult_extra_tingult))],
        ["Benediction (TY ULT)", String(Math.floor(benediction_dmg_dealt_tingult))],
    ];
    if (hanya) {
        calcDetails.unshift(["E6S5 Cogs Penacony 201SPD Hanya", ""]);
        calcDetails.push(["EFF SPD", trim_after_decimal(stats.final_spd)]);
    }

    return [Math.floor(score), stats.final_spd, lbstats, calcDetails];

}


function E0S5_21013_MaketheWorldClamor(build, hanya = false) {
    let lc_base_atk = lc_dict_by_id['21013']['atk'];
    let lc_base_hp = lc_dict_by_id['21013']['hp'];
    let total_base_atk = char_base_atk + lc_base_atk;
    let total_base_hp = char_base_hp + lc_base_hp;

    let lc_atk_p = 0;
    let lc_cd = 0;
    let lc_cr = 0;
    let lc_hp_p = 0;
    let lc_damage_bonus = 0; 
    let lc_dot_bonus = 0;
    let lc_ehr = 0;
    let lc_ult_damage_bonus = 64;
    let lc_skill_damage_bonus = 0;
    let lc_fua_damage_bonus = 0;
    let lc_def_ignore = 0;
    let lc_basic_damage_bonus = 0;
    let lc_break_effect = 0;
    let lc_spd_p = 0;

    let trace_hp_p = 10;
    let trace_fire = 0;
    let trace_phys = 14.4
    let trace_atk_p = 28;
    let trace_cd = 0;
    let trace_cr = 0;
    let trace_res = 0;
    let trace_spd_f = 0;
    let trace_spd_p = 0;
    let trace_ehr = 0;
    let trace_def_p = 0;


    let a6_dmg_bonus_half_uptime = 7.5; // originally 15
    let talent_cr = 25;
    let ting_benediction_atk_p = 55; 
    let hanya_spd_f =  hanya ? 42.21 : 0;
    let hanya_atk_p =  hanya ? 69.8 : 0; // 64.8 (ult) + 5 (a2 with 50% uptime) + 
    let hanya_damage_bonus = hanya ? 43 : 0; // talent E6
    let hanya_penacony_phys = hanya ? 10 : 0;
    let stats = BuildStatsCalculatorNew({
        build: build,
        base_atk: total_base_atk,
        trace_atk_p: lc_atk_p + trace_atk_p + ting_benediction_atk_p + hanya_atk_p,
        base_hp: total_base_hp,
        trace_hp_p: trace_hp_p + lc_hp_p,
        trace_def_p: trace_def_p,
        trace_res_p: trace_res,
        trace_ehr_p: trace_ehr + lc_ehr,
        trace_break_effect: lc_break_effect,
        base_spd: char_base_spd, trace_spd_f: trace_spd_f + hanya_spd_f, trace_spd_p: trace_spd_p + lc_spd_p,
        trace_defshred: lc_def_ignore,
        trace_cr_p: lc_cr + trace_cr + talent_cr,
        trace_cd_p: lc_cd + trace_cd + 10, // 10 is from ting keel
        trace_damage_bonus: lc_damage_bonus + a6_dmg_bonus_half_uptime + hanya_damage_bonus,
        trace_fire: trace_fire,
        trace_phys: trace_phys + hanya_penacony_phys,
        The_Ashblazing_Grand_Duke_ATK_p: 0,
    });


    // support stuff
    let res_shred = 0;
    let def_ignore = 0;
    let sup_damage_bonus = 0;
    let ting_ult_damage_bonus = 56;

    let element_type_dmg = stats.phys;
    let elemental_dmg = element_type_dmg + stats.damage_bonus + sup_damage_bonus;
    let basic_dmg_p = elemental_dmg + stats.basicdmg_p + lc_basic_damage_bonus;
    let skill_dmg_p = elemental_dmg + stats.skilldmg_p + lc_skill_damage_bonus;
    let fua_dmg_p = elemental_dmg + stats.flwupdmg_p + lc_fua_damage_bonus;
    let ult_dmg_p = elemental_dmg + stats.ultdmg_p + lc_ult_damage_bonus;
    let dot_dmg_p = elemental_dmg + stats.dot_bonus + lc_dot_bonus;
    

    // 1 targets
    let basic_atk_mult_primary = 0;
    let basic_hp_mult_primary = 0;
    let skill_atk_mult_primary = 120;
    let skill_atk_mult_adj = 0;
    let ult_atk_mult_primary = 280;
    let ult_hp_mult_primary = 0;
    let fua_atk_mult_primary = 0;
    let efua_atk_mult_primary = 0;
    let fua_hp_mult_primary = 0;

    let vuln = 0;

    let skill_primary = outgoing_dmg_js({
        'scaling_attribute': stats.final_atk,
        'cr': stats.final_cr,
        'cd': stats.final_cd,
        'def_ignore_p': stats.defignore_p + def_ignore,
        'res_shred': stats.res_ignore + res_shred,
        'vulnerability': vuln,
        'skill_multiplier': skill_atk_mult_primary,
        'dmg_bonus_p': skill_dmg_p,
        'enemylvl': 95
    });

    let benediction_atk_mult = 64;
    let benediction_dmg_dealt = outgoing_dmg_js({
        'scaling_attribute': stats.final_atk,
        'cr': stats.final_cr,
        'cd': stats.final_cd,
        'def_ignore_p': stats.defignore_p + def_ignore,
        'res_shred': stats.res_ignore + res_shred,
        'vulnerability': vuln,
        'skill_multiplier': benediction_atk_mult,
        'dmg_bonus_p': stats.damage_bonus,
        'enemylvl': 95
    });
    let benediction_dmg_dealt_tingult = outgoing_dmg_js({
        'scaling_attribute': stats.final_atk,
        'cr': stats.final_cr,
        'cd': stats.final_cd,
        'def_ignore_p': stats.defignore_p + def_ignore,
        'res_shred': stats.res_ignore + res_shred,
        'vulnerability': vuln,
        'skill_multiplier': 192, // trice
        'dmg_bonus_p': stats.damage_bonus + ting_ult_damage_bonus,
        'enemylvl': 95
    });

    let skill_primary_tingult = outgoing_dmg_js({
        'scaling_attribute': stats.final_atk,
        'cr': stats.final_cr,
        'cd': stats.final_cd,
        'def_ignore_p': stats.defignore_p + def_ignore,
        'res_shred': stats.res_ignore + res_shred,
        'vulnerability': vuln,
        'skill_multiplier': skill_atk_mult_primary,
        'dmg_bonus_p': skill_dmg_p + ting_ult_damage_bonus,
        'enemylvl': 95
    });

    let ult_primary_tingult = outgoing_dmg_js({
        'scaling_attribute': stats.final_atk,
        'cr': stats.final_cr,
        'cd': stats.final_cd,
        'def_ignore_p': stats.defignore_p + def_ignore,
        'res_shred': stats.res_ignore + res_shred,
        'vulnerability': vuln,
        'skill_multiplier': ult_atk_mult_primary,
        'dmg_bonus_p': ult_dmg_p + ting_ult_damage_bonus,
        'enemylvl': 95
    });

    let ult_extra_mult = 570
    let ult_extra_tingult = outgoing_dmg_js({
        'scaling_attribute': stats.final_atk,
        'cr': stats.final_cr,
        'cd': stats.final_cd,
        'def_ignore_p': stats.defignore_p + def_ignore,
        'res_shred': stats.res_ignore + res_shred,
        'vulnerability': vuln,
        'skill_multiplier': ult_extra_mult,
        'dmg_bonus_p': ult_dmg_p + ting_ult_damage_bonus,
        'enemylvl': 95
    });


    let score = 3 * (skill_primary + 2 * skill_primary_tingult + ult_primary_tingult) + ult_extra_tingult + benediction_dmg_dealt + benediction_dmg_dealt_tingult;
    let stats_display = BuildStatsCalculatorNew({
        build: build,
        base_atk: total_base_atk,
        trace_atk_p: trace_atk_p,
        base_hp: total_base_hp,
        trace_hp_p: trace_hp_p + lc_hp_p,
        trace_res_p: trace_res,
        trace_ehr_p: trace_ehr + lc_ehr,
        trace_break_effect: lc_break_effect,
        base_spd: char_base_spd, trace_spd_f: trace_spd_f, trace_spd_p: trace_spd_p + lc_spd_p,
        trace_defshred: lc_def_ignore,
        trace_cr_p: trace_cr,
        trace_cd_p: trace_cd + lc_cd,
        trace_damage_bonus: lc_damage_bonus,
        trace_fire: trace_fire,
        trace_phys: trace_phys,
        The_Ashblazing_Grand_Duke_ATK_p: 0,
        count_conditionals: false,
    });

    let lbstats = [
        ["ATK", String(Math.floor(stats_display.final_atk))],
        ["CR", trim_after_decimal(stats_display.final_cr) + "%"],
        ["CD", trim_after_decimal(stats_display.final_cd) + "%"],
        ["Phys", trim_after_decimal(stats_display.phys)],
        ["SPD", trim_after_decimal(stats_display.final_spd)]
    ];

    let calcDetails = [
        ['E6S5 Cogs Keel Tingyun', ""],
        ["Apotheosis stacks", "10×"],
        ["Skill (st)", String(Math.floor(skill_primary))],
        ["Benediction", String(Math.floor(benediction_dmg_dealt))],
        ["Skill (st, TY ULT)", String(Math.floor(skill_primary_tingult))],
        ["ULT (180E, st, TY ULT)", String(Math.floor(ult_primary_tingult))],
        ["ULT Extra (TY ULT)", String(Math.floor(ult_extra_tingult))],
        ["Benediction (TY ULT)", String(Math.floor(benediction_dmg_dealt_tingult))],
    ];
    if (hanya) {
        calcDetails.unshift(["E6S5 Cogs Penacony 201SPD Hanya", ""]);
        calcDetails.push(["EFF SPD", trim_after_decimal(stats.final_spd)]);
    }

    return [Math.floor(score), stats.final_spd, lbstats, calcDetails];

}


function E0S5_21027_TheSeriousnessofBreakfast(build, hanya = false) {
    let lc_base_atk = lc_dict_by_id['21027']['atk'];
    let lc_base_hp = lc_dict_by_id['21027']['hp'];
    let total_base_atk = char_base_atk + lc_base_atk;
    let total_base_hp = char_base_hp + lc_base_hp;

    let lc_atk_p = 24;
    let lc_cd = 0;
    let lc_cr = 0;
    let lc_hp_p = 0;
    let lc_damage_bonus = 24; 
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
    let trace_fire = 0;
    let trace_phys = 14.4
    let trace_atk_p = 28;
    let trace_cd = 0;
    let trace_cr = 0;
    let trace_res = 0;
    let trace_spd_f = 0;
    let trace_spd_p = 0;
    let trace_ehr = 0;
    let trace_def_p = 0;


    let a6_dmg_bonus_half_uptime = 7.5; // originally 15
    let talent_cr = 25;
    let ting_benediction_atk_p = 55; 
    let hanya_spd_f =  hanya ? 42.21 : 0;
    let hanya_atk_p =  hanya ? 69.8 : 0; // 64.8 (ult) + 5 (a2 with 50% uptime) + 
    let hanya_damage_bonus = hanya ? 43 : 0; // talent E6
    let hanya_penacony_phys = hanya ? 10 : 0;
    let stats = BuildStatsCalculatorNew({
        build: build,
        base_atk: total_base_atk,
        trace_atk_p: lc_atk_p + trace_atk_p + ting_benediction_atk_p + hanya_atk_p,
        base_hp: total_base_hp,
        trace_hp_p: trace_hp_p + lc_hp_p,
        trace_def_p: trace_def_p,
        trace_res_p: trace_res,
        trace_ehr_p: trace_ehr + lc_ehr,
        trace_break_effect: lc_break_effect,
        base_spd: char_base_spd, trace_spd_f: trace_spd_f + hanya_spd_f, trace_spd_p: trace_spd_p + lc_spd_p,
        trace_defshred: lc_def_ignore,
        trace_cr_p: lc_cr + trace_cr + talent_cr,
        trace_cd_p: lc_cd + trace_cd + 10, // 10 is from ting keel
        trace_damage_bonus: lc_damage_bonus + a6_dmg_bonus_half_uptime + hanya_damage_bonus,
        trace_fire: trace_fire,
        trace_phys: trace_phys + hanya_penacony_phys,
        The_Ashblazing_Grand_Duke_ATK_p: 0,
    });


    // support stuff
    let res_shred = 0;
    let def_ignore = 0;
    let sup_damage_bonus = 0;
    let ting_ult_damage_bonus = 56;

    let element_type_dmg = stats.phys;
    let elemental_dmg = element_type_dmg + stats.damage_bonus + sup_damage_bonus;
    let basic_dmg_p = elemental_dmg + stats.basicdmg_p + lc_basic_damage_bonus;
    let skill_dmg_p = elemental_dmg + stats.skilldmg_p + lc_skill_damage_bonus;
    let fua_dmg_p = elemental_dmg + stats.flwupdmg_p + lc_fua_damage_bonus;
    let ult_dmg_p = elemental_dmg + stats.ultdmg_p + lc_ult_damage_bonus;
    let dot_dmg_p = elemental_dmg + stats.dot_bonus + lc_dot_bonus;
    

    // 1 targets
    let basic_atk_mult_primary = 0;
    let basic_hp_mult_primary = 0;
    let skill_atk_mult_primary = 120;
    let skill_atk_mult_adj = 0;
    let ult_atk_mult_primary = 280;
    let ult_hp_mult_primary = 0;
    let fua_atk_mult_primary = 0;
    let efua_atk_mult_primary = 0;
    let fua_hp_mult_primary = 0;

    let vuln = 0;

    let skill_primary = outgoing_dmg_js({
        'scaling_attribute': stats.final_atk,
        'cr': stats.final_cr,
        'cd': stats.final_cd,
        'def_ignore_p': stats.defignore_p + def_ignore,
        'res_shred': stats.res_ignore + res_shred,
        'vulnerability': vuln,
        'skill_multiplier': skill_atk_mult_primary,
        'dmg_bonus_p': skill_dmg_p,
        'enemylvl': 95
    });

    let benediction_atk_mult = 64;
    let benediction_dmg_dealt = outgoing_dmg_js({
        'scaling_attribute': stats.final_atk,
        'cr': stats.final_cr,
        'cd': stats.final_cd,
        'def_ignore_p': stats.defignore_p + def_ignore,
        'res_shred': stats.res_ignore + res_shred,
        'vulnerability': vuln,
        'skill_multiplier': benediction_atk_mult,
        'dmg_bonus_p': stats.damage_bonus,
        'enemylvl': 95
    });
    let benediction_dmg_dealt_tingult = outgoing_dmg_js({
        'scaling_attribute': stats.final_atk,
        'cr': stats.final_cr,
        'cd': stats.final_cd,
        'def_ignore_p': stats.defignore_p + def_ignore,
        'res_shred': stats.res_ignore + res_shred,
        'vulnerability': vuln,
        'skill_multiplier': 192, // trice
        'dmg_bonus_p': stats.damage_bonus + ting_ult_damage_bonus,
        'enemylvl': 95
    });

    let skill_primary_tingult = outgoing_dmg_js({
        'scaling_attribute': stats.final_atk,
        'cr': stats.final_cr,
        'cd': stats.final_cd,
        'def_ignore_p': stats.defignore_p + def_ignore,
        'res_shred': stats.res_ignore + res_shred,
        'vulnerability': vuln,
        'skill_multiplier': skill_atk_mult_primary,
        'dmg_bonus_p': skill_dmg_p + ting_ult_damage_bonus,
        'enemylvl': 95
    });

    let ult_primary_tingult = outgoing_dmg_js({
        'scaling_attribute': stats.final_atk,
        'cr': stats.final_cr,
        'cd': stats.final_cd,
        'def_ignore_p': stats.defignore_p + def_ignore,
        'res_shred': stats.res_ignore + res_shred,
        'vulnerability': vuln,
        'skill_multiplier': ult_atk_mult_primary,
        'dmg_bonus_p': ult_dmg_p + ting_ult_damage_bonus,
        'enemylvl': 95
    });

    let ult_extra_mult = 570
    let ult_extra_tingult = outgoing_dmg_js({
        'scaling_attribute': stats.final_atk,
        'cr': stats.final_cr,
        'cd': stats.final_cd,
        'def_ignore_p': stats.defignore_p + def_ignore,
        'res_shred': stats.res_ignore + res_shred,
        'vulnerability': vuln,
        'skill_multiplier': ult_extra_mult,
        'dmg_bonus_p': ult_dmg_p + ting_ult_damage_bonus,
        'enemylvl': 95
    });


    let score = 3 * (skill_primary + 2 * skill_primary_tingult + ult_primary_tingult) + ult_extra_tingult + benediction_dmg_dealt + benediction_dmg_dealt_tingult;
    let stats_display = BuildStatsCalculatorNew({
        build: build,
        base_atk: total_base_atk,
        trace_atk_p: trace_atk_p,
        base_hp: total_base_hp,
        trace_hp_p: trace_hp_p + lc_hp_p,
        trace_res_p: trace_res,
        trace_ehr_p: trace_ehr + lc_ehr,
        trace_break_effect: lc_break_effect,
        base_spd: char_base_spd, trace_spd_f: trace_spd_f, trace_spd_p: trace_spd_p + lc_spd_p,
        trace_defshred: lc_def_ignore,
        trace_cr_p: trace_cr,
        trace_cd_p: trace_cd + lc_cd,
        trace_damage_bonus: lc_damage_bonus,
        trace_fire: trace_fire,
        trace_phys: trace_phys,
        The_Ashblazing_Grand_Duke_ATK_p: 0,
        count_conditionals: false,
    });

    let lbstats = [
        ["ATK", String(Math.floor(stats_display.final_atk))],
        ["CR", trim_after_decimal(stats_display.final_cr) + "%"],
        ["CD", trim_after_decimal(stats_display.final_cd) + "%"],
        ["Phys", trim_after_decimal(stats_display.phys)],
        ["SPD", trim_after_decimal(stats_display.final_spd)]
    ];

    let calcDetails = [
        ['E6S5 Cogs Keel Tingyun', ""],
        ["Apotheosis stacks", "10×"],
        ["Skill (st)", String(Math.floor(skill_primary))],
        ["Benediction", String(Math.floor(benediction_dmg_dealt))],
        ["Skill (st, TY ULT)", String(Math.floor(skill_primary_tingult))],
        ["ULT (180E, st, TY ULT)", String(Math.floor(ult_primary_tingult))],
        ["ULT Extra (TY ULT)", String(Math.floor(ult_extra_tingult))],
        ["Benediction (TY ULT)", String(Math.floor(benediction_dmg_dealt_tingult))],
    ];
    if (hanya) {
        calcDetails.unshift(["E6S5 Cogs Penacony 201SPD Hanya", ""]);
        calcDetails.push(["EFF SPD", trim_after_decimal(stats.final_spd)]);
    }

    return [Math.floor(score), stats.final_spd, lbstats, calcDetails];

}

function E0S5_21020_GeniusesRepose(build, hanya = false) {
    let lc_base_atk = lc_dict_by_id['21020']['atk'];
    let lc_base_hp = lc_dict_by_id['21020']['hp'];
    let total_base_atk = char_base_atk + lc_base_atk;
    let total_base_hp = char_base_hp + lc_base_hp;

    let lc_atk_p = 32;
    let lc_cd = 48;
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
    let trace_fire = 0;
    let trace_phys = 14.4
    let trace_atk_p = 28;
    let trace_cd = 0;
    let trace_cr = 0;
    let trace_res = 0;
    let trace_spd_f = 0;
    let trace_spd_p = 0;
    let trace_ehr = 0;
    let trace_def_p = 0;


    let a6_dmg_bonus_half_uptime = 7.5; // originally 15
    let talent_cr = 25;
    let ting_benediction_atk_p = 55; 
    let hanya_spd_f =  hanya ? 42.21 : 0;
    let hanya_atk_p =  hanya ? 69.8 : 0; // 64.8 (ult) + 5 (a2 with 50% uptime) + 
    let hanya_damage_bonus = hanya ? 43 : 0; // talent E6
    let hanya_penacony_phys = hanya ? 10 : 0;
    let stats = BuildStatsCalculatorNew({
        build: build,
        base_atk: total_base_atk,
        trace_atk_p: lc_atk_p + trace_atk_p + ting_benediction_atk_p + hanya_atk_p,
        base_hp: total_base_hp,
        trace_hp_p: trace_hp_p + lc_hp_p,
        trace_def_p: trace_def_p,
        trace_res_p: trace_res,
        trace_ehr_p: trace_ehr + lc_ehr,
        trace_break_effect: lc_break_effect,
        base_spd: char_base_spd, trace_spd_f: trace_spd_f + hanya_spd_f, trace_spd_p: trace_spd_p + lc_spd_p,
        trace_defshred: lc_def_ignore,
        trace_cr_p: lc_cr + trace_cr + talent_cr,
        trace_cd_p: lc_cd + trace_cd + 10, // 10 is from ting keel
        trace_damage_bonus: lc_damage_bonus + a6_dmg_bonus_half_uptime + hanya_damage_bonus,
        trace_fire: trace_fire,
        trace_phys: trace_phys + hanya_penacony_phys,
        The_Ashblazing_Grand_Duke_ATK_p: 0,
    });


    // support stuff
    let res_shred = 0;
    let def_ignore = 0;
    let sup_damage_bonus = 0;
    let ting_ult_damage_bonus = 56;

    let element_type_dmg = stats.phys;
    let elemental_dmg = element_type_dmg + stats.damage_bonus + sup_damage_bonus;
    let basic_dmg_p = elemental_dmg + stats.basicdmg_p + lc_basic_damage_bonus;
    let skill_dmg_p = elemental_dmg + stats.skilldmg_p + lc_skill_damage_bonus;
    let fua_dmg_p = elemental_dmg + stats.flwupdmg_p + lc_fua_damage_bonus;
    let ult_dmg_p = elemental_dmg + stats.ultdmg_p + lc_ult_damage_bonus;
    let dot_dmg_p = elemental_dmg + stats.dot_bonus + lc_dot_bonus;
    

    // 1 targets
    let basic_atk_mult_primary = 0;
    let basic_hp_mult_primary = 0;
    let skill_atk_mult_primary = 120;
    let skill_atk_mult_adj = 0;
    let ult_atk_mult_primary = 280;
    let ult_hp_mult_primary = 0;
    let fua_atk_mult_primary = 0;
    let efua_atk_mult_primary = 0;
    let fua_hp_mult_primary = 0;

    let vuln = 0;

    let skill_primary = outgoing_dmg_js({
        'scaling_attribute': stats.final_atk,
        'cr': stats.final_cr,
        'cd': stats.final_cd,
        'def_ignore_p': stats.defignore_p + def_ignore,
        'res_shred': stats.res_ignore + res_shred,
        'vulnerability': vuln,
        'skill_multiplier': skill_atk_mult_primary,
        'dmg_bonus_p': skill_dmg_p,
        'enemylvl': 95
    });

    let benediction_atk_mult = 64;
    let benediction_dmg_dealt = outgoing_dmg_js({
        'scaling_attribute': stats.final_atk,
        'cr': stats.final_cr,
        'cd': stats.final_cd,
        'def_ignore_p': stats.defignore_p + def_ignore,
        'res_shred': stats.res_ignore + res_shred,
        'vulnerability': vuln,
        'skill_multiplier': benediction_atk_mult,
        'dmg_bonus_p': stats.damage_bonus,
        'enemylvl': 95
    });
    let benediction_dmg_dealt_tingult = outgoing_dmg_js({
        'scaling_attribute': stats.final_atk,
        'cr': stats.final_cr,
        'cd': stats.final_cd,
        'def_ignore_p': stats.defignore_p + def_ignore,
        'res_shred': stats.res_ignore + res_shred,
        'vulnerability': vuln,
        'skill_multiplier': 192, // trice
        'dmg_bonus_p': stats.damage_bonus + ting_ult_damage_bonus,
        'enemylvl': 95
    });

    let skill_primary_tingult = outgoing_dmg_js({
        'scaling_attribute': stats.final_atk,
        'cr': stats.final_cr,
        'cd': stats.final_cd,
        'def_ignore_p': stats.defignore_p + def_ignore,
        'res_shred': stats.res_ignore + res_shred,
        'vulnerability': vuln,
        'skill_multiplier': skill_atk_mult_primary,
        'dmg_bonus_p': skill_dmg_p + ting_ult_damage_bonus,
        'enemylvl': 95
    });

    let ult_primary_tingult = outgoing_dmg_js({
        'scaling_attribute': stats.final_atk,
        'cr': stats.final_cr,
        'cd': stats.final_cd,
        'def_ignore_p': stats.defignore_p + def_ignore,
        'res_shred': stats.res_ignore + res_shred,
        'vulnerability': vuln,
        'skill_multiplier': ult_atk_mult_primary,
        'dmg_bonus_p': ult_dmg_p + ting_ult_damage_bonus,
        'enemylvl': 95
    });

    let ult_extra_mult = 570
    let ult_extra_tingult = outgoing_dmg_js({
        'scaling_attribute': stats.final_atk,
        'cr': stats.final_cr,
        'cd': stats.final_cd,
        'def_ignore_p': stats.defignore_p + def_ignore,
        'res_shred': stats.res_ignore + res_shred,
        'vulnerability': vuln,
        'skill_multiplier': ult_extra_mult,
        'dmg_bonus_p': ult_dmg_p + ting_ult_damage_bonus,
        'enemylvl': 95
    });


    let score = 3 * (skill_primary + 2 * skill_primary_tingult + ult_primary_tingult) + ult_extra_tingult + benediction_dmg_dealt + benediction_dmg_dealt_tingult;
    let stats_display = BuildStatsCalculatorNew({
        build: build,
        base_atk: total_base_atk,
        trace_atk_p: trace_atk_p + lc_atk_p,
        base_hp: total_base_hp,
        trace_hp_p: trace_hp_p + lc_hp_p,
        trace_res_p: trace_res,
        trace_ehr_p: trace_ehr + lc_ehr,
        trace_break_effect: lc_break_effect,
        base_spd: char_base_spd, trace_spd_f: trace_spd_f, trace_spd_p: trace_spd_p + lc_spd_p,
        trace_defshred: lc_def_ignore,
        trace_cr_p: trace_cr,
        trace_cd_p: trace_cd, //+ lc_cd,
        trace_damage_bonus: lc_damage_bonus,
        trace_fire: trace_fire,
        trace_phys: trace_phys,
        The_Ashblazing_Grand_Duke_ATK_p: 0,
        count_conditionals: false,
    });

    let lbstats = [
        ["ATK", String(Math.floor(stats_display.final_atk))],
        ["CR", trim_after_decimal(stats_display.final_cr) + "%"],
        ["CD", trim_after_decimal(stats_display.final_cd) + "%"],
        ["Phys", trim_after_decimal(stats_display.phys)],
        ["SPD", trim_after_decimal(stats_display.final_spd)]
    ];

    let calcDetails = [
        ['E6S5 Cogs Keel Tingyun', ""],
        ["Apotheosis stacks", "10×"],
        ["Skill (st)", String(Math.floor(skill_primary))],
        ["Benediction", String(Math.floor(benediction_dmg_dealt))],
        ["Skill (st, TY ULT)", String(Math.floor(skill_primary_tingult))],
        ["ULT (180E, st, TY ULT)", String(Math.floor(ult_primary_tingult))],
        ["ULT Extra (TY ULT)", String(Math.floor(ult_extra_tingult))],
        ["Benediction (TY ULT)", String(Math.floor(benediction_dmg_dealt_tingult))],
    ];
    if (hanya) {
        calcDetails.unshift(["E6S5 Cogs Penacony 201SPD Hanya", ""]);
        calcDetails.push(["EFF SPD", trim_after_decimal(stats.final_spd)]);
    }

    return [Math.floor(score), stats.final_spd, lbstats, calcDetails];

}


function E0S5_21034_TodayIsAnotherPeacefulDay(build, hanya = false) {
    let lc_base_atk = lc_dict_by_id['21034']['atk'];
    let lc_base_hp = lc_dict_by_id['21034']['hp'];
    let total_base_atk = char_base_atk + lc_base_atk;
    let total_base_hp = char_base_hp + lc_base_hp;

    let lc_atk_p = 0;
    let lc_cd = 0;
    let lc_cr = 0;
    let lc_hp_p = 0;
    let lc_damage_bonus = 64; 
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
    let trace_fire = 0;
    let trace_phys = 14.4
    let trace_atk_p = 28;
    let trace_cd = 0;
    let trace_cr = 0;
    let trace_res = 0;
    let trace_spd_f = 0;
    let trace_spd_p = 0;
    let trace_ehr = 0;
    let trace_def_p = 0;


    let a6_dmg_bonus_half_uptime = 7.5; // originally 15
    let talent_cr = 25;
    let ting_benediction_atk_p = 55; 
    let hanya_spd_f =  hanya ? 42.21 : 0;
    let hanya_atk_p =  hanya ? 69.8 : 0; // 64.8 (ult) + 5 (a2 with 50% uptime) + 
    let hanya_damage_bonus = hanya ? 43 : 0; // talent E6
    let hanya_penacony_phys = hanya ? 10 : 0;
    let stats = BuildStatsCalculatorNew({
        build: build,
        base_atk: total_base_atk,
        trace_atk_p: lc_atk_p + trace_atk_p + ting_benediction_atk_p + hanya_atk_p,
        base_hp: total_base_hp,
        trace_hp_p: trace_hp_p + lc_hp_p,
        trace_def_p: trace_def_p,
        trace_res_p: trace_res,
        trace_ehr_p: trace_ehr + lc_ehr,
        trace_break_effect: lc_break_effect,
        base_spd: char_base_spd, trace_spd_f: trace_spd_f + hanya_spd_f, trace_spd_p: trace_spd_p + lc_spd_p,
        trace_defshred: lc_def_ignore,
        trace_cr_p: lc_cr + trace_cr + talent_cr,
        trace_cd_p: lc_cd + trace_cd + 10, // 10 is from ting keel
        trace_damage_bonus: lc_damage_bonus + a6_dmg_bonus_half_uptime + hanya_damage_bonus,
        trace_fire: trace_fire,
        trace_phys: trace_phys + hanya_penacony_phys,
        The_Ashblazing_Grand_Duke_ATK_p: 0,
    });


    // support stuff
    let res_shred = 0;
    let def_ignore = 0;
    let sup_damage_bonus = 0;
    let ting_ult_damage_bonus = 56;

    let element_type_dmg = stats.phys;
    let elemental_dmg = element_type_dmg + stats.damage_bonus + sup_damage_bonus;
    let basic_dmg_p = elemental_dmg + stats.basicdmg_p + lc_basic_damage_bonus;
    let skill_dmg_p = elemental_dmg + stats.skilldmg_p + lc_skill_damage_bonus;
    let fua_dmg_p = elemental_dmg + stats.flwupdmg_p + lc_fua_damage_bonus;
    let ult_dmg_p = elemental_dmg + stats.ultdmg_p + lc_ult_damage_bonus;
    let dot_dmg_p = elemental_dmg + stats.dot_bonus + lc_dot_bonus;
    

    // 1 targets
    let basic_atk_mult_primary = 0;
    let basic_hp_mult_primary = 0;
    let skill_atk_mult_primary = 120;
    let skill_atk_mult_adj = 0;
    let ult_atk_mult_primary = 280;
    let ult_hp_mult_primary = 0;
    let fua_atk_mult_primary = 0;
    let efua_atk_mult_primary = 0;
    let fua_hp_mult_primary = 0;

    let vuln = 0;

    let skill_primary = outgoing_dmg_js({
        'scaling_attribute': stats.final_atk,
        'cr': stats.final_cr,
        'cd': stats.final_cd,
        'def_ignore_p': stats.defignore_p + def_ignore,
        'res_shred': stats.res_ignore + res_shred,
        'vulnerability': vuln,
        'skill_multiplier': skill_atk_mult_primary,
        'dmg_bonus_p': skill_dmg_p,
        'enemylvl': 95
    });

    let benediction_atk_mult = 64;
    let benediction_dmg_dealt = outgoing_dmg_js({
        'scaling_attribute': stats.final_atk,
        'cr': stats.final_cr,
        'cd': stats.final_cd,
        'def_ignore_p': stats.defignore_p + def_ignore,
        'res_shred': stats.res_ignore + res_shred,
        'vulnerability': vuln,
        'skill_multiplier': benediction_atk_mult,
        'dmg_bonus_p': stats.damage_bonus,
        'enemylvl': 95
    });
    let benediction_dmg_dealt_tingult = outgoing_dmg_js({
        'scaling_attribute': stats.final_atk,
        'cr': stats.final_cr,
        'cd': stats.final_cd,
        'def_ignore_p': stats.defignore_p + def_ignore,
        'res_shred': stats.res_ignore + res_shred,
        'vulnerability': vuln,
        'skill_multiplier': 192, // trice
        'dmg_bonus_p': stats.damage_bonus + ting_ult_damage_bonus,
        'enemylvl': 95
    });

    let skill_primary_tingult = outgoing_dmg_js({
        'scaling_attribute': stats.final_atk,
        'cr': stats.final_cr,
        'cd': stats.final_cd,
        'def_ignore_p': stats.defignore_p + def_ignore,
        'res_shred': stats.res_ignore + res_shred,
        'vulnerability': vuln,
        'skill_multiplier': skill_atk_mult_primary,
        'dmg_bonus_p': skill_dmg_p + ting_ult_damage_bonus,
        'enemylvl': 95
    });

    let ult_primary_tingult = outgoing_dmg_js({
        'scaling_attribute': stats.final_atk,
        'cr': stats.final_cr,
        'cd': stats.final_cd,
        'def_ignore_p': stats.defignore_p + def_ignore,
        'res_shred': stats.res_ignore + res_shred,
        'vulnerability': vuln,
        'skill_multiplier': ult_atk_mult_primary,
        'dmg_bonus_p': ult_dmg_p + ting_ult_damage_bonus,
        'enemylvl': 95
    });

    let ult_extra_mult = 570
    let ult_extra_tingult = outgoing_dmg_js({
        'scaling_attribute': stats.final_atk,
        'cr': stats.final_cr,
        'cd': stats.final_cd,
        'def_ignore_p': stats.defignore_p + def_ignore,
        'res_shred': stats.res_ignore + res_shred,
        'vulnerability': vuln,
        'skill_multiplier': ult_extra_mult,
        'dmg_bonus_p': ult_dmg_p + ting_ult_damage_bonus,
        'enemylvl': 95
    });


    let score = 3 * (skill_primary + 2 * skill_primary_tingult + ult_primary_tingult) + ult_extra_tingult + benediction_dmg_dealt + benediction_dmg_dealt_tingult;
    let stats_display = BuildStatsCalculatorNew({
        build: build,
        base_atk: total_base_atk,
        trace_atk_p: trace_atk_p,
        base_hp: total_base_hp,
        trace_hp_p: trace_hp_p + lc_hp_p,
        trace_res_p: trace_res,
        trace_ehr_p: trace_ehr + lc_ehr,
        trace_break_effect: lc_break_effect,
        base_spd: char_base_spd, trace_spd_f: trace_spd_f, trace_spd_p: trace_spd_p + lc_spd_p,
        trace_defshred: lc_def_ignore,
        trace_cr_p: trace_cr,
        trace_cd_p: trace_cd + lc_cd,
        trace_damage_bonus: lc_damage_bonus,
        trace_fire: trace_fire,
        trace_phys: trace_phys,
        The_Ashblazing_Grand_Duke_ATK_p: 0,
        count_conditionals: false,
    });

    let lbstats = [
        ["ATK", String(Math.floor(stats_display.final_atk))],
        ["CR", trim_after_decimal(stats_display.final_cr) + "%"],
        ["CD", trim_after_decimal(stats_display.final_cd) + "%"],
        ["Phys", trim_after_decimal(stats_display.phys)],
        ["SPD", trim_after_decimal(stats_display.final_spd)]
    ];

    let calcDetails = [
        ['E6S5 Cogs Keel Tingyun', ""],
        ["Apotheosis stacks", "10×"],
        ["Skill (st)", String(Math.floor(skill_primary))],
        ["Benediction", String(Math.floor(benediction_dmg_dealt))],
        ["Skill (st, TY ULT)", String(Math.floor(skill_primary_tingult))],
        ["ULT (180E, st, TY ULT)", String(Math.floor(ult_primary_tingult))],
        ["ULT Extra (TY ULT)", String(Math.floor(ult_extra_tingult))],
        ["Benediction (TY ULT)", String(Math.floor(benediction_dmg_dealt_tingult))],
    ];
    if (hanya) {
        calcDetails.unshift(["E6S5 Cogs Penacony 201SPD Hanya", ""]);
        calcDetails.push(["EFF SPD", trim_after_decimal(stats.final_spd)]);
    }

    return [Math.floor(score), stats.final_spd, lbstats, calcDetails];

}

function E0S1_23018_AnInstantBeforeAGaze(build, hanya = false) {
    let lc_base_atk = lc_dict_by_id['23018']['atk'];
    let lc_base_hp = lc_dict_by_id['23018']['hp'];
    let total_base_atk = char_base_atk + lc_base_atk;
    let total_base_hp = char_base_hp + lc_base_hp;

    let lc_atk_p = 0;
    let lc_cd = 36;
    let lc_cr = 0;
    let lc_hp_p = 0;
    let lc_damage_bonus = 0; 
    let lc_dot_bonus = 0;
    let lc_ehr = 0;
    let lc_ult_damage_bonus = 64.8;
    let lc_skill_damage_bonus = 0;
    let lc_fua_damage_bonus = 0;
    let lc_def_ignore = 0;
    let lc_basic_damage_bonus = 0;
    let lc_break_effect = 0;
    let lc_spd_p = 0;

    let trace_hp_p = 10;
    let trace_fire = 0;
    let trace_phys = 14.4
    let trace_atk_p = 28;
    let trace_cd = 0;
    let trace_cr = 0;
    let trace_res = 0;
    let trace_spd_f = 0;
    let trace_spd_p = 0;
    let trace_ehr = 0;
    let trace_def_p = 0;


    let a6_dmg_bonus_half_uptime = 7.5; // originally 15
    let talent_cr = 25;
    let ting_benediction_atk_p = 55; 
    let hanya_spd_f =  hanya ? 42.21 : 0;
    let hanya_atk_p =  hanya ? 69.8 : 0; // 64.8 (ult) + 5 (a2 with 50% uptime) + 
    let hanya_damage_bonus = hanya ? 43 : 0; // talent E6
    let hanya_penacony_phys = hanya ? 10 : 0;
    let stats = BuildStatsCalculatorNew({
        build: build,
        base_atk: total_base_atk,
        trace_atk_p: lc_atk_p + trace_atk_p + ting_benediction_atk_p + hanya_atk_p,
        base_hp: total_base_hp,
        trace_hp_p: trace_hp_p + lc_hp_p,
        trace_def_p: trace_def_p,
        trace_res_p: trace_res,
        trace_ehr_p: trace_ehr + lc_ehr,
        trace_break_effect: lc_break_effect,
        base_spd: char_base_spd, trace_spd_f: trace_spd_f + hanya_spd_f, trace_spd_p: trace_spd_p + lc_spd_p,
        trace_defshred: lc_def_ignore,
        trace_cr_p: lc_cr + trace_cr + talent_cr,
        trace_cd_p: lc_cd + trace_cd + 10, // 10 is from ting keel
        trace_damage_bonus: lc_damage_bonus + a6_dmg_bonus_half_uptime + hanya_damage_bonus,
        trace_fire: trace_fire,
        trace_phys: trace_phys + hanya_penacony_phys,
        The_Ashblazing_Grand_Duke_ATK_p: 0,
    });


    // support stuff
    let res_shred = 0;
    let def_ignore = 0;
    let sup_damage_bonus = 0;
    let ting_ult_damage_bonus = 56;

    let element_type_dmg = stats.phys;
    let elemental_dmg = element_type_dmg + stats.damage_bonus + sup_damage_bonus;
    let basic_dmg_p = elemental_dmg + stats.basicdmg_p + lc_basic_damage_bonus;
    let skill_dmg_p = elemental_dmg + stats.skilldmg_p + lc_skill_damage_bonus;
    let fua_dmg_p = elemental_dmg + stats.flwupdmg_p + lc_fua_damage_bonus;
    let ult_dmg_p = elemental_dmg + stats.ultdmg_p + lc_ult_damage_bonus;
    let dot_dmg_p = elemental_dmg + stats.dot_bonus + lc_dot_bonus;
    

    // 1 targets
    let basic_atk_mult_primary = 0;
    let basic_hp_mult_primary = 0;
    let skill_atk_mult_primary = 120;
    let skill_atk_mult_adj = 0;
    let ult_atk_mult_primary = 280;
    let ult_hp_mult_primary = 0;
    let fua_atk_mult_primary = 0;
    let efua_atk_mult_primary = 0;
    let fua_hp_mult_primary = 0;

    let vuln = 0;

    let skill_primary = outgoing_dmg_js({
        'scaling_attribute': stats.final_atk,
        'cr': stats.final_cr,
        'cd': stats.final_cd,
        'def_ignore_p': stats.defignore_p + def_ignore,
        'res_shred': stats.res_ignore + res_shred,
        'vulnerability': vuln,
        'skill_multiplier': skill_atk_mult_primary,
        'dmg_bonus_p': skill_dmg_p,
        'enemylvl': 95
    });

    let benediction_atk_mult = 64;
    let benediction_dmg_dealt = outgoing_dmg_js({
        'scaling_attribute': stats.final_atk,
        'cr': stats.final_cr,
        'cd': stats.final_cd,
        'def_ignore_p': stats.defignore_p + def_ignore,
        'res_shred': stats.res_ignore + res_shred,
        'vulnerability': vuln,
        'skill_multiplier': benediction_atk_mult,
        'dmg_bonus_p': stats.damage_bonus,
        'enemylvl': 95
    });
    let benediction_dmg_dealt_tingult = outgoing_dmg_js({
        'scaling_attribute': stats.final_atk,
        'cr': stats.final_cr,
        'cd': stats.final_cd,
        'def_ignore_p': stats.defignore_p + def_ignore,
        'res_shred': stats.res_ignore + res_shred,
        'vulnerability': vuln,
        'skill_multiplier': 192, // trice
        'dmg_bonus_p': stats.damage_bonus + ting_ult_damage_bonus,
        'enemylvl': 95
    });

    let skill_primary_tingult = outgoing_dmg_js({
        'scaling_attribute': stats.final_atk,
        'cr': stats.final_cr,
        'cd': stats.final_cd,
        'def_ignore_p': stats.defignore_p + def_ignore,
        'res_shred': stats.res_ignore + res_shred,
        'vulnerability': vuln,
        'skill_multiplier': skill_atk_mult_primary,
        'dmg_bonus_p': skill_dmg_p + ting_ult_damage_bonus,
        'enemylvl': 95
    });

    let ult_primary_tingult = outgoing_dmg_js({
        'scaling_attribute': stats.final_atk,
        'cr': stats.final_cr,
        'cd': stats.final_cd,
        'def_ignore_p': stats.defignore_p + def_ignore,
        'res_shred': stats.res_ignore + res_shred,
        'vulnerability': vuln,
        'skill_multiplier': ult_atk_mult_primary,
        'dmg_bonus_p': ult_dmg_p + ting_ult_damage_bonus,
        'enemylvl': 95
    });

    let ult_extra_mult = 570
    let ult_extra_tingult = outgoing_dmg_js({
        'scaling_attribute': stats.final_atk,
        'cr': stats.final_cr,
        'cd': stats.final_cd,
        'def_ignore_p': stats.defignore_p + def_ignore,
        'res_shred': stats.res_ignore + res_shred,
        'vulnerability': vuln,
        'skill_multiplier': ult_extra_mult,
        'dmg_bonus_p': ult_dmg_p + ting_ult_damage_bonus,
        'enemylvl': 95
    });


    let score = 3 * (skill_primary + 2 * skill_primary_tingult + ult_primary_tingult) + ult_extra_tingult + benediction_dmg_dealt + benediction_dmg_dealt_tingult;
    let stats_display = BuildStatsCalculatorNew({
        build: build,
        base_atk: total_base_atk,
        trace_atk_p: trace_atk_p,
        base_hp: total_base_hp,
        trace_hp_p: trace_hp_p + lc_hp_p,
        trace_res_p: trace_res,
        trace_ehr_p: trace_ehr + lc_ehr,
        trace_break_effect: lc_break_effect,
        base_spd: char_base_spd, trace_spd_f: trace_spd_f, trace_spd_p: trace_spd_p + lc_spd_p,
        trace_defshred: lc_def_ignore,
        trace_cr_p: trace_cr,
        trace_cd_p: trace_cd + lc_cd,
        trace_damage_bonus: lc_damage_bonus,
        trace_fire: trace_fire,
        trace_phys: trace_phys,
        The_Ashblazing_Grand_Duke_ATK_p: 0,
        count_conditionals: false,
    });

    let lbstats = [
        ["ATK", String(Math.floor(stats_display.final_atk))],
        ["CR", trim_after_decimal(stats_display.final_cr) + "%"],
        ["CD", trim_after_decimal(stats_display.final_cd) + "%"],
        ["Phys", trim_after_decimal(stats_display.phys)],
        ["SPD", trim_after_decimal(stats_display.final_spd)]
    ];

    let calcDetails = [
        ['E6S5 Cogs Keel Tingyun', ""],
        ["Apotheosis stacks", "10×"],
        ["Skill (st)", String(Math.floor(skill_primary))],
        ["Benediction", String(Math.floor(benediction_dmg_dealt))],
        ["Skill (st, TY ULT)", String(Math.floor(skill_primary_tingult))],
        ["ULT (180E, st, TY ULT)", String(Math.floor(ult_primary_tingult))],
        ["ULT Extra (TY ULT)", String(Math.floor(ult_extra_tingult))],
        ["Benediction (TY ULT)", String(Math.floor(benediction_dmg_dealt_tingult))],
    ];
    if (hanya) {
        calcDetails.unshift(["E6S5 Cogs Penacony 201SPD Hanya", ""]);
        calcDetails.push(["EFF SPD", trim_after_decimal(stats.final_spd)]);
    }

    return [Math.floor(score), stats.final_spd, lbstats, calcDetails];

}


function E6S5_23018_AnInstantBeforeAGaze(build, hanya = false) {
    let lc_base_atk = lc_dict_by_id['23018']['atk'];
    let lc_base_hp = lc_dict_by_id['23018']['hp'];
    let total_base_atk = char_base_atk + lc_base_atk;
    let total_base_hp = char_base_hp + lc_base_hp;

    let lc_atk_p = 0;
    let lc_cd = 60;
    let lc_cr = 0;
    let lc_hp_p = 0;
    let lc_damage_bonus = 0; 
    let lc_dot_bonus = 0;
    let lc_ehr = 0;
    let lc_ult_damage_bonus = 108;
    let lc_skill_damage_bonus = 0;
    let lc_fua_damage_bonus = 0;
    let lc_def_ignore = 0;
    let lc_basic_damage_bonus = 0;
    let lc_break_effect = 0;
    let lc_spd_p = 0;

    let trace_hp_p = 10;
    let trace_fire = 0;
    let trace_phys = 14.4
    let trace_atk_p = 28;
    let trace_cd = 0;
    let trace_cr = 0;
    let trace_res = 0;
    let trace_spd_f = 0;
    let trace_spd_p = 0;
    let trace_ehr = 0;
    let trace_def_p = 0;


    let a6_dmg_bonus_half_uptime = 7.5; // originally 15
    let talent_cr = 33.6;
    let ting_benediction_atk_p = 55; 
    let hanya_spd_f =  hanya ? 42.21 : 0;
    let hanya_atk_p =  hanya ? 69.8 : 0; // 64.8 (ult) + 5 (a2 with 50% uptime) + 
    let hanya_damage_bonus = hanya ? 43 : 0; // talent E6
    let hanya_penacony_phys = hanya ? 10 : 0;
    let stats = BuildStatsCalculatorNew({
        build: build,
        base_atk: total_base_atk,
        trace_atk_p: lc_atk_p + trace_atk_p + ting_benediction_atk_p + hanya_atk_p,
        base_hp: total_base_hp,
        trace_hp_p: trace_hp_p + lc_hp_p,
        trace_def_p: trace_def_p,
        trace_res_p: trace_res,
        trace_ehr_p: trace_ehr + lc_ehr,
        trace_break_effect: lc_break_effect,
        base_spd: char_base_spd, trace_spd_f: trace_spd_f + hanya_spd_f, trace_spd_p: trace_spd_p + lc_spd_p,
        trace_defshred: lc_def_ignore,
        trace_cr_p: lc_cr + trace_cr + talent_cr,
        trace_cd_p: lc_cd + trace_cd + 10 + 48, // 10 is from ting keel 48 is E1 E4
        trace_damage_bonus: lc_damage_bonus + a6_dmg_bonus_half_uptime + hanya_damage_bonus,
        trace_fire: trace_fire,
        trace_phys: trace_phys + hanya_penacony_phys,
        The_Ashblazing_Grand_Duke_ATK_p: 0,
    });


    // support stuff
    let res_shred = 0;
    let def_ignore = 0;
    let sup_damage_bonus = 0;
    let ting_ult_damage_bonus = 56;

    let element_type_dmg = stats.phys;
    let elemental_dmg = element_type_dmg + stats.damage_bonus + sup_damage_bonus;
    let basic_dmg_p = elemental_dmg + stats.basicdmg_p + lc_basic_damage_bonus;
    let skill_dmg_p = elemental_dmg + stats.skilldmg_p + lc_skill_damage_bonus;
    let fua_dmg_p = elemental_dmg + stats.flwupdmg_p + lc_fua_damage_bonus;
    let ult_dmg_p = elemental_dmg + stats.ultdmg_p + lc_ult_damage_bonus;
    let dot_dmg_p = elemental_dmg + stats.dot_bonus + lc_dot_bonus;
    

    // 1 targets
    let basic_atk_mult_primary = 0;
    let basic_hp_mult_primary = 0;
    let skill_atk_mult_primary = 132;
    let skill_atk_mult_adj = 0;
    let ult_atk_mult_primary = 302.4;
    let ult_hp_mult_primary = 0;
    let fua_atk_mult_primary = 0;
    let efua_atk_mult_primary = 0;
    let fua_hp_mult_primary = 0;

    let vuln = 0;

    let skill_primary = outgoing_dmg_js({
        'scaling_attribute': stats.final_atk,
        'cr': stats.final_cr,
        'cd': stats.final_cd,
        'def_ignore_p': stats.defignore_p + def_ignore,
        'res_shred': stats.res_ignore + res_shred,
        'vulnerability': vuln,
        'skill_multiplier': skill_atk_mult_primary,
        'dmg_bonus_p': skill_dmg_p,
        'enemylvl': 95
    });

    let benediction_atk_mult = 64;
    let benediction_dmg_dealt = outgoing_dmg_js({
        'scaling_attribute': stats.final_atk,
        'cr': stats.final_cr,
        'cd': stats.final_cd,
        'def_ignore_p': stats.defignore_p + def_ignore,
        'res_shred': stats.res_ignore + res_shred,
        'vulnerability': vuln,
        'skill_multiplier': benediction_atk_mult,
        'dmg_bonus_p': stats.damage_bonus,
        'enemylvl': 95
    });
    let benediction_dmg_dealt_tingult = outgoing_dmg_js({
        'scaling_attribute': stats.final_atk + total_base_atk * 0.4,
        'cr': stats.final_cr,
        'cd': stats.final_cd,
        'def_ignore_p': stats.defignore_p + def_ignore,
        'res_shred': stats.res_ignore + res_shred,
        'vulnerability': vuln,
        'skill_multiplier': 192, // trice
        'dmg_bonus_p': stats.damage_bonus + ting_ult_damage_bonus,
        'enemylvl': 95
    });

    let skill_primary_tingult = outgoing_dmg_js({
        'scaling_attribute': stats.final_atk + total_base_atk * 0.4,
        'cr': stats.final_cr,
        'cd': stats.final_cd,
        'def_ignore_p': stats.defignore_p + def_ignore,
        'res_shred': stats.res_ignore + res_shred,
        'vulnerability': vuln,
        'skill_multiplier': skill_atk_mult_primary,
        'dmg_bonus_p': skill_dmg_p + ting_ult_damage_bonus,
        'enemylvl': 95
    });

    let ult_primary_tingult = outgoing_dmg_js({
        'scaling_attribute': stats.final_atk + total_base_atk * 0.4,
        'cr': stats.final_cr,
        'cd': stats.final_cd,
        'def_ignore_p': stats.defignore_p + def_ignore + 30,
        'res_shred': stats.res_ignore + res_shred,
        'vulnerability': vuln,
        'skill_multiplier': ult_atk_mult_primary,
        'dmg_bonus_p': ult_dmg_p + ting_ult_damage_bonus,
        'enemylvl': 95
    });

    let ult_extra_mult = 615.6
    let ult_extra_tingult = outgoing_dmg_js({
        'scaling_attribute': stats.final_atk + total_base_atk * 0.4,
        'cr': stats.final_cr,
        'cd': stats.final_cd,
        'def_ignore_p': stats.defignore_p + def_ignore + 30,
        'res_shred': stats.res_ignore + res_shred,
        'vulnerability': vuln,
        'skill_multiplier': ult_extra_mult,
        'dmg_bonus_p': ult_dmg_p + ting_ult_damage_bonus,
        'enemylvl': 95
    });


    let score = 3 * (skill_primary + 2 * skill_primary_tingult + ult_primary_tingult) + ult_extra_tingult + benediction_dmg_dealt + benediction_dmg_dealt_tingult;
    let stats_display = BuildStatsCalculatorNew({
        build: build,
        base_atk: total_base_atk,
        trace_atk_p: trace_atk_p,
        base_hp: total_base_hp,
        trace_hp_p: trace_hp_p + lc_hp_p,
        trace_res_p: trace_res,
        trace_ehr_p: trace_ehr + lc_ehr,
        trace_break_effect: lc_break_effect,
        base_spd: char_base_spd, trace_spd_f: trace_spd_f, trace_spd_p: trace_spd_p + lc_spd_p,
        trace_defshred: lc_def_ignore,
        trace_cr_p: trace_cr,
        trace_cd_p: trace_cd + lc_cd,
        trace_damage_bonus: lc_damage_bonus,
        trace_fire: trace_fire,
        trace_phys: trace_phys,
        The_Ashblazing_Grand_Duke_ATK_p: 0,
        count_conditionals: false,
    });

    let lbstats = [
        ["ATK", String(Math.floor(stats_display.final_atk))],
        ["CR", trim_after_decimal(stats_display.final_cr) + "%"],
        ["CD", trim_after_decimal(stats_display.final_cd) + "%"],
        ["Phys", trim_after_decimal(stats_display.phys)],
        ["SPD", trim_after_decimal(stats_display.final_spd)]
    ];

    let calcDetails = [
        ['E6S5 Cogs Keel Tingyun', ""],
        ["Apotheosis stacks", "12×"],
        ["Skill (st)", String(Math.floor(skill_primary))],
        ["Benediction", String(Math.floor(benediction_dmg_dealt))],
        ["Skill (st, TY ULT)", String(Math.floor(skill_primary_tingult))],
        ["ULT (180E, st, TY ULT)", String(Math.floor(ult_primary_tingult))],
        ["ULT Extra (TY ULT)", String(Math.floor(ult_extra_tingult))],
        ["Benediction (TY ULT)", String(Math.floor(benediction_dmg_dealt_tingult))],
    ];
    if (hanya) {
        calcDetails.unshift(["E6S5 Cogs Penacony 201SPD Hanya", ""]);
        calcDetails.push(["EFF SPD", trim_after_decimal(stats.final_spd)]);
    }

    return [Math.floor(score), stats.final_spd, lbstats, calcDetails];

}