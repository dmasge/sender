import { outgoing_dmg_js, hit_prob, trim_after_decimal } from '$lib/components/calculators/damage_formulas.js';
import { BuildStatsCalculatorNew, assign_lb_to_build } from '$lib/components/calculators/build_stats_calculator_new.js';
import { lc_dict_by_id } from "$lib/components/calculators/lbcalcs/lightcones.js"


// 1204
export function score_jing_yuan(build, optimizationTarget) {
    let score = 0;
    let spd = 0;
    let lbstats = [];
    let calcDetails = [];
    let breakpoints = ["", "120.1", "124.2", "128.6", "133.34", "140.6"];
    
    
    if (optimizationTarget == "" || (optimizationTarget != "" && !optimizationTarget.includes("FX")))
        if ("23010" == build['lc']['id']) {
            [score, spd, lbstats, calcDetails] = E0S1_23010_BeforeDawn(build, true, false);
            let ctgrname = 'E0S1_' + build['lc']['id'] + "TY";
            build = assign_lb_to_build(build, ctgrname, score, lbstats, spd, breakpoints, calcDetails);
        }   else if ("21027" == build['lc']['id']) {
            [score, spd, lbstats, calcDetails] = E0S5_21027_TheSeriousnessofBreakfast(build, true, false);
            let ctgrname = 'E0S5_' + build['lc']['id'] + "TY";
            build = assign_lb_to_build(build, ctgrname, score, lbstats, spd, breakpoints, calcDetails);
        } else if ("21006" == build['lc']['id']) {
            [score, spd, lbstats, calcDetails] = E0S5_21006_TheBirthoftheSelf(build, true, false);
            let ctgrname = 'E0S5_' + build['lc']['id'] + "TY";
            build = assign_lb_to_build(build, ctgrname, score, lbstats, spd, breakpoints, calcDetails);
        } else if ("21034" == build['lc']['id']) {
            [score, spd, lbstats, calcDetails] = E0S5_21034_TodayIsAnotherPeacefulDay(build, true, false);
            let ctgrname = 'E0S5_' + build['lc']['id'] + "TY";
            build = assign_lb_to_build(build, ctgrname, score, lbstats, spd, breakpoints, calcDetails);
        } else if ("21020" == build['lc']['id']) {
            [score, spd, lbstats, calcDetails] = E0S5_21020_GeniusesRepose(build, true, false);
            let ctgrname = 'E0S5_' + build['lc']['id'] + "TY";
            build = assign_lb_to_build(build, ctgrname, score, lbstats, spd, breakpoints, calcDetails);
        } else if ("23000" == build['lc']['id']) {
            [score, spd, lbstats, calcDetails] = E0S1_23000_NightontheMilkyWay(build, true, false);
            let ctgrname = 'E0S1_' + build['lc']['id'] + "TY";
            build = assign_lb_to_build(build, ctgrname, score, lbstats, spd, breakpoints, calcDetails);
        }

    
    if (optimizationTarget == "" || (optimizationTarget != "" && optimizationTarget.includes("FX")))
        if ("23010" == build['lc']['id']) {
            [score, spd, lbstats, calcDetails] = E0S1_23010_BeforeDawn(build, true, true);
            let ctgrname = 'E0S1_' + build['lc']['id'] + "FXTY";
            build = assign_lb_to_build(build, ctgrname, score, lbstats, spd, breakpoints, calcDetails);
        } else if ("21027" == build['lc']['id']) {
            [score, spd, lbstats, calcDetails] = E0S5_21027_TheSeriousnessofBreakfast(build, true, true);
            let ctgrname = 'E0S5_' + build['lc']['id'] + "FXTY";
            build = assign_lb_to_build(build, ctgrname, score, lbstats, spd, breakpoints, calcDetails);
        } else if ("21006" == build['lc']['id']) {
            [score, spd, lbstats, calcDetails] = E0S5_21006_TheBirthoftheSelf(build, true, true);
            let ctgrname = 'E0S5_' + build['lc']['id'] + "FXTY";
            build = assign_lb_to_build(build, ctgrname, score, lbstats, spd, breakpoints, calcDetails);
        } else if ("21034" == build['lc']['id']) {
            [score, spd, lbstats, calcDetails] = E0S5_21034_TodayIsAnotherPeacefulDay(build, true, true);
            let ctgrname = 'E0S5_' + build['lc']['id'] + "FXTY";
            build = assign_lb_to_build(build, ctgrname, score, lbstats, spd, breakpoints, calcDetails);
        } else if ("21020" == build['lc']['id']) {
            [score, spd, lbstats, calcDetails] = E0S5_21020_GeniusesRepose(build, true, true);
            let ctgrname = 'E0S5_' + build['lc']['id'] + "FXTY";
            build = assign_lb_to_build(build, ctgrname, score, lbstats, spd, breakpoints, calcDetails);
        } else if ("23000" == build['lc']['id']) {
            [score, spd, lbstats, calcDetails] = E0S1_23000_NightontheMilkyWay(build, true, true);
            let ctgrname = 'E0S1_' + build['lc']['id'] + "FXTY";
            build = assign_lb_to_build(build, ctgrname, score, lbstats, spd, breakpoints, calcDetails);
        } 
    return build;
}

let char_base_hp = 1164.24;
let char_base_atk = 698.544;
let char_base_spd = 99;

function E0S1_23000_NightontheMilkyWay(build, ting = false, fuxuan = false) {
    let lc_base_atk = lc_dict_by_id['23000']['atk'];
    let lc_base_hp = lc_dict_by_id['23000']['hp'];
    let total_base_atk = char_base_atk + lc_base_atk;
    let total_base_hp = char_base_hp + lc_base_hp;

    let lc_atk_p = 18;
    let lc_cd = 0;
    let lc_cr = 0;
    let lc_hp_p = 0;
    let lc_damage_bonus = 15; // break every other turn 
    let lc_dot_bonus = 0;
    let lc_ehr = 0;
    let lc_ult_damage_bonus = 0;
    let lc_skill_damage_bonus = 0;
    let lc_fua_damage_bonus = 0;
    let lc_def_ignore = 0;
    let lc_basic_damage_bonus = 0;
    let lc_break_effect = 0;
    let lc_spd_p = 0;

    let trace_hp_p = 0;
    let trace_fire = 0;
    let trace_atk_p = 28;
    let trace_cd = 0;
    let trace_cr = 12;
    let trace_res = 0;
    let trace_spd_f = 0;
    let trace_spd_p = 0;
    let trace_ehr = 0;
    let trace_def_p = 12.5;

    let ting_atk_p = ting ? 55 : 0;
    let fuxuan_cr = fuxuan ? 12 : 0;
    let fuxuan_cd = fuxuan ? 40 : 0; // E1 + Keel
    let fuxuan_dmg_bonus = fuxuan ? 9 : 0; // lightcone
    let The_Ashblazing_Grand_Duke_ATK_p = 48;
    let stats = BuildStatsCalculatorNew({
        build: build,
        base_atk: total_base_atk,
        trace_atk_p: lc_atk_p + trace_atk_p + ting_atk_p,
        base_hp: total_base_hp,
        trace_hp_p: trace_hp_p + lc_hp_p,
        trace_def_p : trace_def_p,
        trace_res_p: trace_res,
        trace_ehr_p: trace_ehr + lc_ehr,
        trace_break_effect: lc_break_effect,
        base_spd: char_base_spd, trace_spd_f: trace_spd_f, trace_spd_p: trace_spd_p + lc_spd_p,
        trace_defshred: lc_def_ignore,
        trace_cr_p: lc_cr + trace_cr + fuxuan_cr,
        trace_cd_p: lc_cd + trace_cd + fuxuan_cd,
        trace_damage_bonus: lc_damage_bonus + fuxuan_dmg_bonus,
        trace_fire: trace_fire,
        The_Ashblazing_Grand_Duke_ATK_p: The_Ashblazing_Grand_Duke_ATK_p,
    });

    let The_Ashblazing_Grand_Duke_ATK_p_fua = 36;
    let stats_fua = BuildStatsCalculatorNew({
        build: build,
        base_atk: total_base_atk,
        trace_atk_p: lc_atk_p + trace_atk_p + ting_atk_p,
        base_hp: total_base_hp,
        trace_hp_p: trace_hp_p + lc_hp_p,
        trace_def_p : trace_def_p,
        trace_res_p: trace_res,
        trace_ehr_p: trace_ehr + lc_ehr,
        trace_break_effect: lc_break_effect,
        base_spd: char_base_spd, trace_spd_f: trace_spd_f, trace_spd_p: trace_spd_p + lc_spd_p,
        trace_defshred: lc_def_ignore,
        trace_cr_p: lc_cr + trace_cr + fuxuan_cr,
        trace_cd_p: lc_cd + trace_cd + fuxuan_cd,
        trace_damage_bonus: lc_damage_bonus + fuxuan_dmg_bonus,
        trace_fire: trace_fire,
        The_Ashblazing_Grand_Duke_ATK_p: The_Ashblazing_Grand_Duke_ATK_p_fua,
    });

    // support stuff
    let res_shred = 0;
    let def_ignore = 0;
    let sup_damage_bonus = 0;

    let ting_penacony = 10;
    let element_type_dmg = stats.lightn;
    let elemental_dmg = element_type_dmg + stats.damage_bonus + sup_damage_bonus + ting_penacony;
    let basic_dmg_p = elemental_dmg + stats.basicdmg_p + lc_basic_damage_bonus;
    let skill_dmg_p = elemental_dmg + stats.skilldmg_p + lc_skill_damage_bonus;
    let fua_dmg_p   = elemental_dmg + stats.flwupdmg_p + lc_fua_damage_bonus;
    let ult_dmg_p   = elemental_dmg + stats.ultdmg_p   + lc_ult_damage_bonus;
    let dot_dmg_p   = elemental_dmg + stats.dot_bonus  + lc_dot_bonus ;
    
    // 1 targets
    let basic_atk_mult_primary = 0;
    let basic_hp_mult_primary  = 0;
    let skill_atk_mult_primary = 100;
    let skill_atk_mult_adj     = 0;
    let ult_atk_mult_primary   = 200;
    let ult_hp_mult_primary    = 0;
    let fua_atk_mult_primary   = 910;
    let efua_atk_mult_primary  = 0;
    let fua_hp_mult_primary    = 0;

    let vuln = 0;
    let cr_bonus_a6 = 10;
    let skill_primary = outgoing_dmg_js({
                'scaling_attribute' : stats.final_atk, 
                               'cr' : stats.final_cr + cr_bonus_a6, 
                               'cd' : stats.final_cd, 
                     'def_ignore_p' : stats.defignore_p + def_ignore,
                        'res_shred' : stats.res_ignore + res_shred,
                    'vulnerability' : vuln, 
                 'skill_multiplier' : skill_atk_mult_primary,
                      'dmg_bonus_p' : skill_dmg_p, 
                         'enemylvl' : 95});
    let skill_primary_ting_ult = outgoing_dmg_js({
                'scaling_attribute' : stats.final_atk, 
                               'cr' : stats.final_cr + cr_bonus_a6, 
                               'cd' : stats.final_cd, 
                     'def_ignore_p' : stats.defignore_p + def_ignore,
                        'res_shred' : stats.res_ignore + res_shred,
                    'vulnerability' : vuln, 
                 'skill_multiplier' : skill_atk_mult_primary,
                      'dmg_bonus_p' : skill_dmg_p + 56, 
                         'enemylvl' : 95});
    let ult_primary_ting_ult = outgoing_dmg_js({
                'scaling_attribute' : stats.final_atk, 
                               'cr' : stats.final_cr + cr_bonus_a6, 
                               'cd' : stats.final_cd, 
                     'def_ignore_p' : stats.defignore_p + def_ignore,
                        'res_shred' : stats.res_ignore + res_shred,
                    'vulnerability' : vuln, 
                 'skill_multiplier' : ult_atk_mult_primary,
                      'dmg_bonus_p' : ult_dmg_p + 56, 
                         'enemylvl' : 95});
    let ll_cd_a2 = 25;
    let fua_primary_ting_ult = outgoing_dmg_js({
                'scaling_attribute' : stats_fua.final_atk, 
                               'cr' : stats_fua.final_cr + cr_bonus_a6, 
                               'cd' : stats_fua.final_cd + ll_cd_a2, 
                     'def_ignore_p' : stats_fua.defignore_p + def_ignore,
                        'res_shred' : stats_fua.res_ignore + res_shred,
                    'vulnerability' : vuln, 
                 'skill_multiplier' : fua_atk_mult_primary,
                      'dmg_bonus_p' : fua_dmg_p + 56,  
                         'enemylvl' : 95});

    let benediction_mult_total_ting_ult = 192;
    let benediction_ting_ult = outgoing_dmg_js({
                'scaling_attribute' : stats.final_atk, 
                               'cr' : stats.final_cr + cr_bonus_a6, 
                               'cd' : stats.final_cd, 
                     'def_ignore_p' : stats.defignore_p + def_ignore,
                        'res_shred' : stats.res_ignore + res_shred,
                    'vulnerability' : vuln, 
                 'skill_multiplier' : benediction_mult_total_ting_ult,
                      'dmg_bonus_p' : elemental_dmg + 56, 
                         'enemylvl' : 95});
    let benediction_mult = 64;
    let benediction = outgoing_dmg_js({
                'scaling_attribute' : stats.final_atk, 
                               'cr' : stats.final_cr + cr_bonus_a6, 
                               'cd' : stats.final_cd, 
                     'def_ignore_p' : stats.defignore_p + def_ignore,
                        'res_shred' : stats.res_ignore + res_shred,
                    'vulnerability' : vuln, 
                 'skill_multiplier' : benediction_mult,
                      'dmg_bonus_p' : elemental_dmg, 
                         'enemylvl' : 95});
    
    
    let score = 2 * skill_primary + 2 * skill_primary_ting_ult + 2 * ult_primary_ting_ult + fua_primary_ting_ult + benediction_ting_ult + benediction;
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
        trace_cd_p: trace_cd,
        trace_damage_bonus: lc_damage_bonus,
        trace_fire: trace_fire,
        The_Ashblazing_Grand_Duke_ATK_p: 0,
        count_conditionals: false,
    });

    let lbstats = [
        ["ATK", String(Math.floor(stats_display.final_atk))],
        ["CR", trim_after_decimal(stats_display.final_cr) + "%"],
        ["CD", trim_after_decimal(stats_display.final_cd) + "%"],
        ["Lightn", trim_after_decimal(stats_display.lightn)],
        ["SPD", trim_after_decimal(stats_display.final_spd)]
    ];

    let calcDetails = [
        ['E6S5 Cogs Penacony TY', ""],
        ['Benediction uptime', "100%"],
        ["Skill (before TY ult)", String(Math.floor(skill_primary))],
        ["Skill (after TY ult)", String(Math.floor(skill_primary_ting_ult))],
        ["ULT (after TY ult)", String(Math.floor(ult_primary_ting_ult))],
        ["10×LL (after TY ult)", String(Math.floor(fua_primary_ting_ult))],
        ["Benediction (before TY ult)", String(Math.floor(benediction))],
        ["Benediction (after TY ult)", String(Math.floor(benediction_ting_ult))]
    ];
    if (fuxuan) {
        calcDetails.unshift(["E1S1 Sig Keel FX", ""]);
    }
    
    return [Math.floor(score), stats.final_spd, lbstats, calcDetails];

}



function E0S5_21020_GeniusesRepose(build, ting = false, fuxuan = false) {
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

    let trace_hp_p = 0;
    let trace_fire = 0;
    let trace_atk_p = 28;
    let trace_cd = 0;
    let trace_cr = 12;
    let trace_res = 0;
    let trace_spd_f = 0;
    let trace_spd_p = 0;
    let trace_ehr = 0;
    let trace_def_p = 12.5;

    let ting_atk_p = ting ? 55 : 0;
    let fuxuan_cr = fuxuan ? 12 : 0;
    let fuxuan_cd = fuxuan ? 40 : 0; // E1 + Keel
    let fuxuan_dmg_bonus = fuxuan ? 9 : 0; // lightcone
    let The_Ashblazing_Grand_Duke_ATK_p = 48;
    let stats = BuildStatsCalculatorNew({
        build: build,
        base_atk: total_base_atk,
        trace_atk_p: lc_atk_p + trace_atk_p + ting_atk_p,
        base_hp: total_base_hp,
        trace_hp_p: trace_hp_p + lc_hp_p,
        trace_def_p : trace_def_p,
        trace_res_p: trace_res,
        trace_ehr_p: trace_ehr + lc_ehr,
        trace_break_effect: lc_break_effect,
        base_spd: char_base_spd, trace_spd_f: trace_spd_f, trace_spd_p: trace_spd_p + lc_spd_p,
        trace_defshred: lc_def_ignore,
        trace_cr_p: lc_cr + trace_cr + fuxuan_cr,
        trace_cd_p: lc_cd + trace_cd + fuxuan_cd,
        trace_damage_bonus: lc_damage_bonus + fuxuan_dmg_bonus,
        trace_fire: trace_fire,
        The_Ashblazing_Grand_Duke_ATK_p: The_Ashblazing_Grand_Duke_ATK_p,
    });

    let The_Ashblazing_Grand_Duke_ATK_p_fua = 36;
    let stats_fua = BuildStatsCalculatorNew({
        build: build,
        base_atk: total_base_atk,
        trace_atk_p: lc_atk_p + trace_atk_p + ting_atk_p,
        base_hp: total_base_hp,
        trace_hp_p: trace_hp_p + lc_hp_p,
        trace_def_p : trace_def_p,
        trace_res_p: trace_res,
        trace_ehr_p: trace_ehr + lc_ehr,
        trace_break_effect: lc_break_effect,
        base_spd: char_base_spd, trace_spd_f: trace_spd_f, trace_spd_p: trace_spd_p + lc_spd_p,
        trace_defshred: lc_def_ignore,
        trace_cr_p: lc_cr + trace_cr + fuxuan_cr,
        trace_cd_p: lc_cd + trace_cd + fuxuan_cd,
        trace_damage_bonus: lc_damage_bonus + fuxuan_dmg_bonus,
        trace_fire: trace_fire,
        The_Ashblazing_Grand_Duke_ATK_p: The_Ashblazing_Grand_Duke_ATK_p_fua,
    });

    // support stuff
    let res_shred = 0;
    let def_ignore = 0;
    let sup_damage_bonus = 0;

    let ting_penacony = 10;
    let element_type_dmg = stats.lightn;
    let elemental_dmg = element_type_dmg + stats.damage_bonus + sup_damage_bonus + ting_penacony;
    let basic_dmg_p = elemental_dmg + stats.basicdmg_p + lc_basic_damage_bonus;
    let skill_dmg_p = elemental_dmg + stats.skilldmg_p + lc_skill_damage_bonus;
    let fua_dmg_p   = elemental_dmg + stats.flwupdmg_p + lc_fua_damage_bonus;
    let ult_dmg_p   = elemental_dmg + stats.ultdmg_p   + lc_ult_damage_bonus;
    let dot_dmg_p   = elemental_dmg + stats.dot_bonus  + lc_dot_bonus ;
    
    // 1 targets
    let basic_atk_mult_primary = 0;
    let basic_hp_mult_primary  = 0;
    let skill_atk_mult_primary = 100;
    let skill_atk_mult_adj     = 0;
    let ult_atk_mult_primary   = 200;
    let ult_hp_mult_primary    = 0;
    let fua_atk_mult_primary   = 910;
    let efua_atk_mult_primary  = 0;
    let fua_hp_mult_primary    = 0;

    let vuln = 0;
    let cr_bonus_a6 = 10;
    let skill_primary = outgoing_dmg_js({
                'scaling_attribute' : stats.final_atk, 
                               'cr' : stats.final_cr + cr_bonus_a6, 
                               'cd' : stats.final_cd, 
                     'def_ignore_p' : stats.defignore_p + def_ignore,
                        'res_shred' : stats.res_ignore + res_shred,
                    'vulnerability' : vuln, 
                 'skill_multiplier' : skill_atk_mult_primary,
                      'dmg_bonus_p' : skill_dmg_p, 
                         'enemylvl' : 95});
    let skill_primary_ting_ult = outgoing_dmg_js({
                'scaling_attribute' : stats.final_atk, 
                               'cr' : stats.final_cr + cr_bonus_a6, 
                               'cd' : stats.final_cd, 
                     'def_ignore_p' : stats.defignore_p + def_ignore,
                        'res_shred' : stats.res_ignore + res_shred,
                    'vulnerability' : vuln, 
                 'skill_multiplier' : skill_atk_mult_primary,
                      'dmg_bonus_p' : skill_dmg_p + 56, 
                         'enemylvl' : 95});
    let ult_primary_ting_ult = outgoing_dmg_js({
                'scaling_attribute' : stats.final_atk, 
                               'cr' : stats.final_cr + cr_bonus_a6, 
                               'cd' : stats.final_cd, 
                     'def_ignore_p' : stats.defignore_p + def_ignore,
                        'res_shred' : stats.res_ignore + res_shred,
                    'vulnerability' : vuln, 
                 'skill_multiplier' : ult_atk_mult_primary,
                      'dmg_bonus_p' : ult_dmg_p + 56, 
                         'enemylvl' : 95});
    let ll_cd_a2 = 25;
    let fua_primary_ting_ult = outgoing_dmg_js({
                'scaling_attribute' : stats_fua.final_atk, 
                               'cr' : stats_fua.final_cr + cr_bonus_a6, 
                               'cd' : stats_fua.final_cd + ll_cd_a2, 
                     'def_ignore_p' : stats_fua.defignore_p + def_ignore,
                        'res_shred' : stats_fua.res_ignore + res_shred,
                    'vulnerability' : vuln, 
                 'skill_multiplier' : fua_atk_mult_primary,
                      'dmg_bonus_p' : fua_dmg_p + 56,  
                         'enemylvl' : 95});

    let benediction_mult_total_ting_ult = 192;
    let benediction_ting_ult = outgoing_dmg_js({
                'scaling_attribute' : stats.final_atk, 
                               'cr' : stats.final_cr + cr_bonus_a6, 
                               'cd' : stats.final_cd, 
                     'def_ignore_p' : stats.defignore_p + def_ignore,
                        'res_shred' : stats.res_ignore + res_shred,
                    'vulnerability' : vuln, 
                 'skill_multiplier' : benediction_mult_total_ting_ult,
                      'dmg_bonus_p' : elemental_dmg + 56, 
                         'enemylvl' : 95});
    let benediction_mult = 64;
    let benediction = outgoing_dmg_js({
                'scaling_attribute' : stats.final_atk, 
                               'cr' : stats.final_cr + cr_bonus_a6, 
                               'cd' : stats.final_cd, 
                     'def_ignore_p' : stats.defignore_p + def_ignore,
                        'res_shred' : stats.res_ignore + res_shred,
                    'vulnerability' : vuln, 
                 'skill_multiplier' : benediction_mult,
                      'dmg_bonus_p' : elemental_dmg, 
                         'enemylvl' : 95});
    
    
    let score = 2 * skill_primary + 2 * skill_primary_ting_ult + 2 * ult_primary_ting_ult + fua_primary_ting_ult + benediction_ting_ult + benediction;
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
        trace_cd_p: trace_cd,
        trace_damage_bonus: lc_damage_bonus,
        trace_fire: trace_fire,
        The_Ashblazing_Grand_Duke_ATK_p: 0,
        count_conditionals: false,
    });

    let lbstats = [
        ["ATK", String(Math.floor(stats_display.final_atk))],
        ["CR", trim_after_decimal(stats_display.final_cr) + "%"],
        ["CD", trim_after_decimal(stats_display.final_cd) + "%"],
        ["Lightn", trim_after_decimal(stats_display.lightn)],
        ["SPD", trim_after_decimal(stats_display.final_spd)]
    ];

    let calcDetails = [
        ['E6S5 Cogs Penacony TY', ""],
        ['Benediction uptime', "100%"],
        ["Skill (before TY ult)", String(Math.floor(skill_primary))],
        ["Skill (after TY ult)", String(Math.floor(skill_primary_ting_ult))],
        ["ULT (after TY ult)", String(Math.floor(ult_primary_ting_ult))],
        ["10×LL (after TY ult)", String(Math.floor(fua_primary_ting_ult))],
        ["Benediction (before TY ult)", String(Math.floor(benediction))],
        ["Benediction (after TY ult)", String(Math.floor(benediction_ting_ult))]
    ];
    if (fuxuan) {
        calcDetails.unshift(["E1S1 Sig Keel FX", ""]);
    }
    
    return [Math.floor(score), stats.final_spd, lbstats, calcDetails];

}


function E0S5_21034_TodayIsAnotherPeacefulDay(build, ting = false, fuxuan = false) {
    let lc_base_atk = lc_dict_by_id['21034']['atk'];
    let lc_base_hp = lc_dict_by_id['21034']['hp'];
    let total_base_atk = char_base_atk + lc_base_atk;
    let total_base_hp = char_base_hp + lc_base_hp;

    let lc_atk_p = 0;
    let lc_cd = 0;
    let lc_cr = 0;
    let lc_hp_p = 0;
    let lc_damage_bonus = 52; 
    let lc_dot_bonus = 0;
    let lc_ehr = 0;
    let lc_ult_damage_bonus = 0;
    let lc_skill_damage_bonus = 0;
    let lc_fua_damage_bonus = 0;
    let lc_def_ignore = 0;
    let lc_basic_damage_bonus = 0;
    let lc_break_effect = 0;
    let lc_spd_p = 0;

    let trace_hp_p = 0;
    let trace_fire = 0;
    let trace_atk_p = 28;
    let trace_cd = 0;
    let trace_cr = 12;
    let trace_res = 0;
    let trace_spd_f = 0;
    let trace_spd_p = 0;
    let trace_ehr = 0;
    let trace_def_p = 12.5;

    let ting_atk_p = ting ? 55 : 0;
    let fuxuan_cr = fuxuan ? 12 : 0;
    let fuxuan_cd = fuxuan ? 40 : 0; // E1 + Keel
    let fuxuan_dmg_bonus = fuxuan ? 9 : 0; // lightcone
    let The_Ashblazing_Grand_Duke_ATK_p = 48;
    let stats = BuildStatsCalculatorNew({
        build: build,
        base_atk: total_base_atk,
        trace_atk_p: lc_atk_p + trace_atk_p + ting_atk_p,
        base_hp: total_base_hp,
        trace_hp_p: trace_hp_p + lc_hp_p,
        trace_def_p : trace_def_p,
        trace_res_p: trace_res,
        trace_ehr_p: trace_ehr + lc_ehr,
        trace_break_effect: lc_break_effect,
        base_spd: char_base_spd, trace_spd_f: trace_spd_f, trace_spd_p: trace_spd_p + lc_spd_p,
        trace_defshred: lc_def_ignore,
        trace_cr_p: lc_cr + trace_cr + fuxuan_cr,
        trace_cd_p: lc_cd + trace_cd + fuxuan_cd,
        trace_damage_bonus: lc_damage_bonus + fuxuan_dmg_bonus,
        trace_fire: trace_fire,
        The_Ashblazing_Grand_Duke_ATK_p: The_Ashblazing_Grand_Duke_ATK_p,
    });

    let The_Ashblazing_Grand_Duke_ATK_p_fua = 36;
    let stats_fua = BuildStatsCalculatorNew({
        build: build,
        base_atk: total_base_atk,
        trace_atk_p: lc_atk_p + trace_atk_p + ting_atk_p,
        base_hp: total_base_hp,
        trace_hp_p: trace_hp_p + lc_hp_p,
        trace_def_p : trace_def_p,
        trace_res_p: trace_res,
        trace_ehr_p: trace_ehr + lc_ehr,
        trace_break_effect: lc_break_effect,
        base_spd: char_base_spd, trace_spd_f: trace_spd_f, trace_spd_p: trace_spd_p + lc_spd_p,
        trace_defshred: lc_def_ignore,
        trace_cr_p: lc_cr + trace_cr + fuxuan_cr,
        trace_cd_p: lc_cd + trace_cd + fuxuan_cd,
        trace_damage_bonus: lc_damage_bonus + fuxuan_dmg_bonus,
        trace_fire: trace_fire,
        The_Ashblazing_Grand_Duke_ATK_p: The_Ashblazing_Grand_Duke_ATK_p_fua,
    });

    // support stuff
    let res_shred = 0;
    let def_ignore = 0;
    let sup_damage_bonus = 0;

    let ting_penacony = 10;
    let element_type_dmg = stats.lightn;
    let elemental_dmg = element_type_dmg + stats.damage_bonus + sup_damage_bonus + ting_penacony;
    let basic_dmg_p = elemental_dmg + stats.basicdmg_p + lc_basic_damage_bonus;
    let skill_dmg_p = elemental_dmg + stats.skilldmg_p + lc_skill_damage_bonus;
    let fua_dmg_p   = elemental_dmg + stats.flwupdmg_p + lc_fua_damage_bonus;
    let ult_dmg_p   = elemental_dmg + stats.ultdmg_p   + lc_ult_damage_bonus;
    let dot_dmg_p   = elemental_dmg + stats.dot_bonus  + lc_dot_bonus ;
    
    // 1 targets
    let basic_atk_mult_primary = 0;
    let basic_hp_mult_primary  = 0;
    let skill_atk_mult_primary = 100;
    let skill_atk_mult_adj     = 0;
    let ult_atk_mult_primary   = 200;
    let ult_hp_mult_primary    = 0;
    let fua_atk_mult_primary   = 910;
    let efua_atk_mult_primary  = 0;
    let fua_hp_mult_primary    = 0;

    let vuln = 0;
    let cr_bonus_a6 = 10;
    let skill_primary = outgoing_dmg_js({
                'scaling_attribute' : stats.final_atk, 
                               'cr' : stats.final_cr + cr_bonus_a6, 
                               'cd' : stats.final_cd, 
                     'def_ignore_p' : stats.defignore_p + def_ignore,
                        'res_shred' : stats.res_ignore + res_shred,
                    'vulnerability' : vuln, 
                 'skill_multiplier' : skill_atk_mult_primary,
                      'dmg_bonus_p' : skill_dmg_p, 
                         'enemylvl' : 95});
    let skill_primary_ting_ult = outgoing_dmg_js({
                'scaling_attribute' : stats.final_atk, 
                               'cr' : stats.final_cr + cr_bonus_a6, 
                               'cd' : stats.final_cd, 
                     'def_ignore_p' : stats.defignore_p + def_ignore,
                        'res_shred' : stats.res_ignore + res_shred,
                    'vulnerability' : vuln, 
                 'skill_multiplier' : skill_atk_mult_primary,
                      'dmg_bonus_p' : skill_dmg_p + 56, 
                         'enemylvl' : 95});
    let ult_primary_ting_ult = outgoing_dmg_js({
                'scaling_attribute' : stats.final_atk, 
                               'cr' : stats.final_cr + cr_bonus_a6, 
                               'cd' : stats.final_cd, 
                     'def_ignore_p' : stats.defignore_p + def_ignore,
                        'res_shred' : stats.res_ignore + res_shred,
                    'vulnerability' : vuln, 
                 'skill_multiplier' : ult_atk_mult_primary,
                      'dmg_bonus_p' : ult_dmg_p + 56, 
                         'enemylvl' : 95});
    let ll_cd_a2 = 25;
    let fua_primary_ting_ult = outgoing_dmg_js({
                'scaling_attribute' : stats_fua.final_atk, 
                               'cr' : stats_fua.final_cr + cr_bonus_a6, 
                               'cd' : stats_fua.final_cd + ll_cd_a2, 
                     'def_ignore_p' : stats_fua.defignore_p + def_ignore,
                        'res_shred' : stats_fua.res_ignore + res_shred,
                    'vulnerability' : vuln, 
                 'skill_multiplier' : fua_atk_mult_primary,
                      'dmg_bonus_p' : fua_dmg_p + 56,  
                         'enemylvl' : 95});

    let benediction_mult_total_ting_ult = 192;
    let benediction_ting_ult = outgoing_dmg_js({
                'scaling_attribute' : stats.final_atk, 
                               'cr' : stats.final_cr + cr_bonus_a6, 
                               'cd' : stats.final_cd, 
                     'def_ignore_p' : stats.defignore_p + def_ignore,
                        'res_shred' : stats.res_ignore + res_shred,
                    'vulnerability' : vuln, 
                 'skill_multiplier' : benediction_mult_total_ting_ult,
                      'dmg_bonus_p' : elemental_dmg + 56, 
                         'enemylvl' : 95});
    let benediction_mult = 64;
    let benediction = outgoing_dmg_js({
                'scaling_attribute' : stats.final_atk, 
                               'cr' : stats.final_cr + cr_bonus_a6, 
                               'cd' : stats.final_cd, 
                     'def_ignore_p' : stats.defignore_p + def_ignore,
                        'res_shred' : stats.res_ignore + res_shred,
                    'vulnerability' : vuln, 
                 'skill_multiplier' : benediction_mult,
                      'dmg_bonus_p' : elemental_dmg, 
                         'enemylvl' : 95});
    
    
    let score = 2 * skill_primary + 2 * skill_primary_ting_ult + 2 * ult_primary_ting_ult + fua_primary_ting_ult + benediction_ting_ult + benediction;
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
        trace_cd_p: lc_cd + trace_cd,
        trace_damage_bonus: lc_damage_bonus,
        trace_fire: trace_fire,
        The_Ashblazing_Grand_Duke_ATK_p: 0,
        count_conditionals: false,
    });

    let lbstats = [
        ["ATK", String(Math.floor(stats_display.final_atk))],
        ["CR", trim_after_decimal(stats_display.final_cr) + "%"],
        ["CD", trim_after_decimal(stats_display.final_cd) + "%"],
        ["Lightn", trim_after_decimal(stats_display.lightn)],
        ["SPD", trim_after_decimal(stats_display.final_spd)]
    ];

    let calcDetails = [
        ['E6S5 Cogs Penacony TY', ""],
        ['Benediction uptime', "100%"],
        ["Skill (before TY ult)", String(Math.floor(skill_primary))],
        ["Skill (after TY ult)", String(Math.floor(skill_primary_ting_ult))],
        ["ULT (after TY ult)", String(Math.floor(ult_primary_ting_ult))],
        ["10×LL (after TY ult)", String(Math.floor(fua_primary_ting_ult))],
        ["Benediction (before TY ult)", String(Math.floor(benediction))],
        ["Benediction (after TY ult)", String(Math.floor(benediction_ting_ult))]
    ];
    if (fuxuan) {
        calcDetails.unshift(["E1S1 Sig Keel FX", ""]);
    }
    
    return [Math.floor(score), stats.final_spd, lbstats, calcDetails];

}


function E0S5_21006_TheBirthoftheSelf(build, ting = false, fuxuan = false) {
    let lc_base_atk = lc_dict_by_id['21006']['atk'];
    let lc_base_hp = lc_dict_by_id['21006']['hp'];
    let total_base_atk = char_base_atk + lc_base_atk;
    let total_base_hp = char_base_hp + lc_base_hp;

    let lc_atk_p = 0;
    let lc_cd = 0;
    let lc_cr = 0;
    let lc_hp_p = 0;
    let lc_damage_bonus = 0; 
    let lc_dot_bonus = 0;
    let lc_ehr = 0;
    let lc_ult_damage_bonus = 0;
    let lc_skill_damage_bonus = 0;
    let lc_fua_damage_bonus = 72; // 48 default + 24 coz halftime under 50% hp
    let lc_def_ignore = 0;
    let lc_basic_damage_bonus = 0;
    let lc_break_effect = 0;
    let lc_spd_p = 0;

    let trace_hp_p = 0;
    let trace_fire = 0;
    let trace_atk_p = 28;
    let trace_cd = 0;
    let trace_cr = 12;
    let trace_res = 0;
    let trace_spd_f = 0;
    let trace_spd_p = 0;
    let trace_ehr = 0;
    let trace_def_p = 12.5;

    let ting_atk_p = ting ? 55 : 0;
    let fuxuan_cr = fuxuan ? 12 : 0;
    let fuxuan_cd = fuxuan ? 40 : 0; // E1 + Keel
    let fuxuan_dmg_bonus = fuxuan ? 9 : 0; // lightcone
    let The_Ashblazing_Grand_Duke_ATK_p = 48;
    let stats = BuildStatsCalculatorNew({
        build: build,
        base_atk: total_base_atk,
        trace_atk_p: lc_atk_p + trace_atk_p + ting_atk_p,
        base_hp: total_base_hp,
        trace_hp_p: trace_hp_p + lc_hp_p,
        trace_def_p : trace_def_p,
        trace_res_p: trace_res,
        trace_ehr_p: trace_ehr + lc_ehr,
        trace_break_effect: lc_break_effect,
        base_spd: char_base_spd, trace_spd_f: trace_spd_f, trace_spd_p: trace_spd_p + lc_spd_p,
        trace_defshred: lc_def_ignore,
        trace_cr_p: lc_cr + trace_cr + fuxuan_cr,
        trace_cd_p: lc_cd + trace_cd + fuxuan_cd,
        trace_damage_bonus: lc_damage_bonus + fuxuan_dmg_bonus,
        trace_fire: trace_fire,
        The_Ashblazing_Grand_Duke_ATK_p: The_Ashblazing_Grand_Duke_ATK_p,
    });

    let The_Ashblazing_Grand_Duke_ATK_p_fua = 36;
    let stats_fua = BuildStatsCalculatorNew({
        build: build,
        base_atk: total_base_atk,
        trace_atk_p: lc_atk_p + trace_atk_p + ting_atk_p,
        base_hp: total_base_hp,
        trace_hp_p: trace_hp_p + lc_hp_p,
        trace_def_p : trace_def_p,
        trace_res_p: trace_res,
        trace_ehr_p: trace_ehr + lc_ehr,
        trace_break_effect: lc_break_effect,
        base_spd: char_base_spd, trace_spd_f: trace_spd_f, trace_spd_p: trace_spd_p + lc_spd_p,
        trace_defshred: lc_def_ignore,
        trace_cr_p: lc_cr + trace_cr + fuxuan_cr,
        trace_cd_p: lc_cd + trace_cd + fuxuan_cd,
        trace_damage_bonus: lc_damage_bonus + fuxuan_dmg_bonus,
        trace_fire: trace_fire,
        The_Ashblazing_Grand_Duke_ATK_p: The_Ashblazing_Grand_Duke_ATK_p_fua,
    });

    // support stuff
    let res_shred = 0;
    let def_ignore = 0;
    let sup_damage_bonus = 0;

    let ting_penacony = 10;
    let element_type_dmg = stats.lightn;
    let elemental_dmg = element_type_dmg + stats.damage_bonus + sup_damage_bonus + ting_penacony;
    let basic_dmg_p = elemental_dmg + stats.basicdmg_p + lc_basic_damage_bonus;
    let skill_dmg_p = elemental_dmg + stats.skilldmg_p + lc_skill_damage_bonus;
    let fua_dmg_p   = elemental_dmg + stats.flwupdmg_p + lc_fua_damage_bonus;
    let ult_dmg_p   = elemental_dmg + stats.ultdmg_p   + lc_ult_damage_bonus;
    let dot_dmg_p   = elemental_dmg + stats.dot_bonus  + lc_dot_bonus ;
    
    // 1 targets
    let basic_atk_mult_primary = 0;
    let basic_hp_mult_primary  = 0;
    let skill_atk_mult_primary = 100;
    let skill_atk_mult_adj     = 0;
    let ult_atk_mult_primary   = 200;
    let ult_hp_mult_primary    = 0;
    let fua_atk_mult_primary   = 910;
    let efua_atk_mult_primary  = 0;
    let fua_hp_mult_primary    = 0;

    let vuln = 0;
    let cr_bonus_a6 = 10;
    let skill_primary = outgoing_dmg_js({
                'scaling_attribute' : stats.final_atk, 
                               'cr' : stats.final_cr + cr_bonus_a6, 
                               'cd' : stats.final_cd, 
                     'def_ignore_p' : stats.defignore_p + def_ignore,
                        'res_shred' : stats.res_ignore + res_shred,
                    'vulnerability' : vuln, 
                 'skill_multiplier' : skill_atk_mult_primary,
                      'dmg_bonus_p' : skill_dmg_p, 
                         'enemylvl' : 95});
    let skill_primary_ting_ult = outgoing_dmg_js({
                'scaling_attribute' : stats.final_atk, 
                               'cr' : stats.final_cr + cr_bonus_a6, 
                               'cd' : stats.final_cd, 
                     'def_ignore_p' : stats.defignore_p + def_ignore,
                        'res_shred' : stats.res_ignore + res_shred,
                    'vulnerability' : vuln, 
                 'skill_multiplier' : skill_atk_mult_primary,
                      'dmg_bonus_p' : skill_dmg_p + 56, 
                         'enemylvl' : 95});
    let ult_primary_ting_ult = outgoing_dmg_js({
                'scaling_attribute' : stats.final_atk, 
                               'cr' : stats.final_cr + cr_bonus_a6, 
                               'cd' : stats.final_cd, 
                     'def_ignore_p' : stats.defignore_p + def_ignore,
                        'res_shred' : stats.res_ignore + res_shred,
                    'vulnerability' : vuln, 
                 'skill_multiplier' : ult_atk_mult_primary,
                      'dmg_bonus_p' : ult_dmg_p + 56, 
                         'enemylvl' : 95});
    let ll_cd_a2 = 25;
    let fua_primary_ting_ult = outgoing_dmg_js({
                'scaling_attribute' : stats_fua.final_atk, 
                               'cr' : stats_fua.final_cr + cr_bonus_a6, 
                               'cd' : stats_fua.final_cd + ll_cd_a2, 
                     'def_ignore_p' : stats_fua.defignore_p + def_ignore,
                        'res_shred' : stats_fua.res_ignore + res_shred,
                    'vulnerability' : vuln, 
                 'skill_multiplier' : fua_atk_mult_primary,
                      'dmg_bonus_p' : fua_dmg_p + 56,  
                         'enemylvl' : 95});

    let benediction_mult_total_ting_ult = 192;
    let benediction_ting_ult = outgoing_dmg_js({
                'scaling_attribute' : stats.final_atk, 
                               'cr' : stats.final_cr + cr_bonus_a6, 
                               'cd' : stats.final_cd, 
                     'def_ignore_p' : stats.defignore_p + def_ignore,
                        'res_shred' : stats.res_ignore + res_shred,
                    'vulnerability' : vuln, 
                 'skill_multiplier' : benediction_mult_total_ting_ult,
                      'dmg_bonus_p' : elemental_dmg + 56, 
                         'enemylvl' : 95});
    let benediction_mult = 64;
    let benediction = outgoing_dmg_js({
                'scaling_attribute' : stats.final_atk, 
                               'cr' : stats.final_cr + cr_bonus_a6, 
                               'cd' : stats.final_cd, 
                     'def_ignore_p' : stats.defignore_p + def_ignore,
                        'res_shred' : stats.res_ignore + res_shred,
                    'vulnerability' : vuln, 
                 'skill_multiplier' : benediction_mult,
                      'dmg_bonus_p' : elemental_dmg, 
                         'enemylvl' : 95});
    
    
    let score = 2 * skill_primary + 2 * skill_primary_ting_ult + 2 * ult_primary_ting_ult + fua_primary_ting_ult + benediction_ting_ult + benediction;
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
        trace_cd_p: lc_cd + trace_cd,
        trace_damage_bonus: lc_damage_bonus,
        trace_fire: trace_fire,
        The_Ashblazing_Grand_Duke_ATK_p: 0,
        count_conditionals: false,
    });

    let lbstats = [
        ["ATK", String(Math.floor(stats_display.final_atk))],
        ["CR", trim_after_decimal(stats_display.final_cr) + "%"],
        ["CD", trim_after_decimal(stats_display.final_cd) + "%"],
        ["Lightn", trim_after_decimal(stats_display.lightn)],
        ["SPD", trim_after_decimal(stats_display.final_spd)]
    ];

    let calcDetails = [
        ['E6S5 Cogs Penacony TY', ""],
        ['Benediction uptime', "100%"],
        ["Skill (before TY ult)", String(Math.floor(skill_primary))],
        ["Skill (after TY ult)", String(Math.floor(skill_primary_ting_ult))],
        ["ULT (after TY ult)", String(Math.floor(ult_primary_ting_ult))],
        ["10×LL (after TY ult)", String(Math.floor(fua_primary_ting_ult))],
        ["Benediction (before TY ult)", String(Math.floor(benediction))],
        ["Benediction (after TY ult)", String(Math.floor(benediction_ting_ult))]
    ];
    if (fuxuan) {
        calcDetails.unshift(["E1S1 Sig Keel FX", ""]);
    }
    
    return [Math.floor(score), stats.final_spd, lbstats, calcDetails];

}

function E0S5_21027_TheSeriousnessofBreakfast(build, ting = false, fuxuan = false) {
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

    let trace_hp_p = 0;
    let trace_fire = 0;
    let trace_atk_p = 28;
    let trace_cd = 0;
    let trace_cr = 12;
    let trace_res = 0;
    let trace_spd_f = 0;
    let trace_spd_p = 0;
    let trace_ehr = 0;
    let trace_def_p = 12.5;

    let ting_atk_p = ting ? 55 : 0;
    let fuxuan_cr = fuxuan ? 12 : 0;
    let fuxuan_cd = fuxuan ? 40 : 0; // E1 + Keel
    let fuxuan_dmg_bonus = fuxuan ? 9 : 0; // lightcone
    let The_Ashblazing_Grand_Duke_ATK_p = 48;
    let stats = BuildStatsCalculatorNew({
        build: build,
        base_atk: total_base_atk,
        trace_atk_p: lc_atk_p + trace_atk_p + ting_atk_p,
        base_hp: total_base_hp,
        trace_hp_p: trace_hp_p + lc_hp_p,
        trace_def_p : trace_def_p,
        trace_res_p: trace_res,
        trace_ehr_p: trace_ehr + lc_ehr,
        trace_break_effect: lc_break_effect,
        base_spd: char_base_spd, trace_spd_f: trace_spd_f, trace_spd_p: trace_spd_p + lc_spd_p,
        trace_defshred: lc_def_ignore,
        trace_cr_p: lc_cr + trace_cr + fuxuan_cr,
        trace_cd_p: lc_cd + trace_cd + fuxuan_cd,
        trace_damage_bonus: lc_damage_bonus + fuxuan_dmg_bonus,
        trace_fire: trace_fire,
        The_Ashblazing_Grand_Duke_ATK_p: The_Ashblazing_Grand_Duke_ATK_p,
    });

    let The_Ashblazing_Grand_Duke_ATK_p_fua = 36;
    let stats_fua = BuildStatsCalculatorNew({
        build: build,
        base_atk: total_base_atk,
        trace_atk_p: lc_atk_p + trace_atk_p + ting_atk_p,
        base_hp: total_base_hp,
        trace_hp_p: trace_hp_p + lc_hp_p,
        trace_def_p : trace_def_p,
        trace_res_p: trace_res,
        trace_ehr_p: trace_ehr + lc_ehr,
        trace_break_effect: lc_break_effect,
        base_spd: char_base_spd, trace_spd_f: trace_spd_f, trace_spd_p: trace_spd_p + lc_spd_p,
        trace_defshred: lc_def_ignore,
        trace_cr_p: lc_cr + trace_cr + fuxuan_cr,
        trace_cd_p: lc_cd + trace_cd + fuxuan_cd,
        trace_damage_bonus: lc_damage_bonus + fuxuan_dmg_bonus,
        trace_fire: trace_fire,
        The_Ashblazing_Grand_Duke_ATK_p: The_Ashblazing_Grand_Duke_ATK_p_fua,
    });

    // support stuff
    let res_shred = 0;
    let def_ignore = 0;
    let sup_damage_bonus = 0;

    let ting_penacony = 10;
    let element_type_dmg = stats.lightn;
    let elemental_dmg = element_type_dmg + stats.damage_bonus + sup_damage_bonus + ting_penacony;
    let basic_dmg_p = elemental_dmg + stats.basicdmg_p + lc_basic_damage_bonus;
    let skill_dmg_p = elemental_dmg + stats.skilldmg_p + lc_skill_damage_bonus;
    let fua_dmg_p   = elemental_dmg + stats.flwupdmg_p + lc_fua_damage_bonus;
    let ult_dmg_p   = elemental_dmg + stats.ultdmg_p   + lc_ult_damage_bonus;
    let dot_dmg_p   = elemental_dmg + stats.dot_bonus  + lc_dot_bonus ;
    
    // 1 targets
    let basic_atk_mult_primary = 0;
    let basic_hp_mult_primary  = 0;
    let skill_atk_mult_primary = 100;
    let skill_atk_mult_adj     = 0;
    let ult_atk_mult_primary   = 200;
    let ult_hp_mult_primary    = 0;
    let fua_atk_mult_primary   = 910;
    let efua_atk_mult_primary  = 0;
    let fua_hp_mult_primary    = 0;

    let vuln = 0;
    let cr_bonus_a6 = 10;
    let skill_primary = outgoing_dmg_js({
                'scaling_attribute' : stats.final_atk, 
                               'cr' : stats.final_cr + cr_bonus_a6, 
                               'cd' : stats.final_cd, 
                     'def_ignore_p' : stats.defignore_p + def_ignore,
                        'res_shred' : stats.res_ignore + res_shred,
                    'vulnerability' : vuln, 
                 'skill_multiplier' : skill_atk_mult_primary,
                      'dmg_bonus_p' : skill_dmg_p, 
                         'enemylvl' : 95});
    let skill_primary_ting_ult = outgoing_dmg_js({
                'scaling_attribute' : stats.final_atk, 
                               'cr' : stats.final_cr + cr_bonus_a6, 
                               'cd' : stats.final_cd, 
                     'def_ignore_p' : stats.defignore_p + def_ignore,
                        'res_shred' : stats.res_ignore + res_shred,
                    'vulnerability' : vuln, 
                 'skill_multiplier' : skill_atk_mult_primary,
                      'dmg_bonus_p' : skill_dmg_p + 56, 
                         'enemylvl' : 95});
    let ult_primary_ting_ult = outgoing_dmg_js({
                'scaling_attribute' : stats.final_atk, 
                               'cr' : stats.final_cr + cr_bonus_a6, 
                               'cd' : stats.final_cd, 
                     'def_ignore_p' : stats.defignore_p + def_ignore,
                        'res_shred' : stats.res_ignore + res_shred,
                    'vulnerability' : vuln, 
                 'skill_multiplier' : ult_atk_mult_primary,
                      'dmg_bonus_p' : ult_dmg_p + 56, 
                         'enemylvl' : 95});
    let ll_cd_a2 = 25;
    let fua_primary_ting_ult = outgoing_dmg_js({
                'scaling_attribute' : stats_fua.final_atk, 
                               'cr' : stats_fua.final_cr + cr_bonus_a6, 
                               'cd' : stats_fua.final_cd + ll_cd_a2, 
                     'def_ignore_p' : stats_fua.defignore_p + def_ignore,
                        'res_shred' : stats_fua.res_ignore + res_shred,
                    'vulnerability' : vuln, 
                 'skill_multiplier' : fua_atk_mult_primary,
                      'dmg_bonus_p' : fua_dmg_p + 56,  
                         'enemylvl' : 95});

    let benediction_mult_total_ting_ult = 192;
    let benediction_ting_ult = outgoing_dmg_js({
                'scaling_attribute' : stats.final_atk, 
                               'cr' : stats.final_cr + cr_bonus_a6, 
                               'cd' : stats.final_cd, 
                     'def_ignore_p' : stats.defignore_p + def_ignore,
                        'res_shred' : stats.res_ignore + res_shred,
                    'vulnerability' : vuln, 
                 'skill_multiplier' : benediction_mult_total_ting_ult,
                      'dmg_bonus_p' : elemental_dmg + 56, 
                         'enemylvl' : 95});
    let benediction_mult = 64;
    let benediction = outgoing_dmg_js({
                'scaling_attribute' : stats.final_atk, 
                               'cr' : stats.final_cr + cr_bonus_a6, 
                               'cd' : stats.final_cd, 
                     'def_ignore_p' : stats.defignore_p + def_ignore,
                        'res_shred' : stats.res_ignore + res_shred,
                    'vulnerability' : vuln, 
                 'skill_multiplier' : benediction_mult,
                      'dmg_bonus_p' : elemental_dmg, 
                         'enemylvl' : 95});
    
    
    let score = 2 * skill_primary + 2 * skill_primary_ting_ult + 2 * ult_primary_ting_ult + fua_primary_ting_ult + benediction_ting_ult + benediction;
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
        trace_cd_p: lc_cd + trace_cd,
        trace_damage_bonus: lc_damage_bonus,
        trace_fire: trace_fire,
        The_Ashblazing_Grand_Duke_ATK_p: 0,
        count_conditionals: false,
    });

    let lbstats = [
        ["ATK", String(Math.floor(stats_display.final_atk))],
        ["CR", trim_after_decimal(stats_display.final_cr) + "%"],
        ["CD", trim_after_decimal(stats_display.final_cd) + "%"],
        ["Lightn", trim_after_decimal(stats_display.lightn)],
        ["SPD", trim_after_decimal(stats_display.final_spd)]
    ];

    let calcDetails = [
        ['E6S5 Cogs Penacony TY', ""],
        ['Benediction uptime', "100%"],
        ["Skill (before TY ult)", String(Math.floor(skill_primary))],
        ["Skill (after TY ult)", String(Math.floor(skill_primary_ting_ult))],
        ["ULT (after TY ult)", String(Math.floor(ult_primary_ting_ult))],
        ["10×LL (after TY ult)", String(Math.floor(fua_primary_ting_ult))],
        ["Benediction (before TY ult)", String(Math.floor(benediction))],
        ["Benediction (after TY ult)", String(Math.floor(benediction_ting_ult))]
    ];
    if (fuxuan) {
        calcDetails.unshift(["E1S1 Sig Keel FX", ""]);
    }
    
    return [Math.floor(score), stats.final_spd, lbstats, calcDetails];

}

function E0S1_23010_BeforeDawn(build, ting = false, fuxuan = false) {
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
    let lc_skill_damage_bonus = 18;
    let lc_fua_damage_bonus = 48;
    let lc_def_ignore = 0;
    let lc_basic_damage_bonus = 0;
    let lc_break_effect = 0;
    let lc_spd_p = 0;

    let trace_hp_p = 0;
    let trace_fire = 0;
    let trace_atk_p = 28;
    let trace_cd = 0;
    let trace_cr = 12;
    let trace_res = 0;
    let trace_spd_f = 0;
    let trace_spd_p = 0;
    let trace_ehr = 0;
    let trace_def_p = 12.5;

    let ting_atk_p = ting ? 55 : 0;
    let fuxuan_cr = fuxuan ? 12 : 0;
    let fuxuan_cd = fuxuan ? 40 : 0; // E1 + Keel
    let fuxuan_dmg_bonus = fuxuan ? 9 : 0; // lightcone
    let The_Ashblazing_Grand_Duke_ATK_p = 48;
    let stats = BuildStatsCalculatorNew({
        build: build,
        base_atk: total_base_atk,
        trace_atk_p: lc_atk_p + trace_atk_p + ting_atk_p,
        base_hp: total_base_hp,
        trace_hp_p: trace_hp_p + lc_hp_p,
        trace_def_p : trace_def_p,
        trace_res_p: trace_res,
        trace_ehr_p: trace_ehr + lc_ehr,
        trace_break_effect: lc_break_effect,
        base_spd: char_base_spd, trace_spd_f: trace_spd_f, trace_spd_p: trace_spd_p + lc_spd_p,
        trace_defshred: lc_def_ignore,
        trace_cr_p: lc_cr + trace_cr + fuxuan_cr,
        trace_cd_p: lc_cd + trace_cd + fuxuan_cd,
        trace_damage_bonus: lc_damage_bonus + fuxuan_dmg_bonus,
        trace_fire: trace_fire,
        The_Ashblazing_Grand_Duke_ATK_p: The_Ashblazing_Grand_Duke_ATK_p,
    });

    let The_Ashblazing_Grand_Duke_ATK_p_fua = 36;
    let stats_fua = BuildStatsCalculatorNew({
        build: build,
        base_atk: total_base_atk,
        trace_atk_p: lc_atk_p + trace_atk_p + ting_atk_p,
        base_hp: total_base_hp,
        trace_hp_p: trace_hp_p + lc_hp_p,
        trace_def_p : trace_def_p,
        trace_res_p: trace_res,
        trace_ehr_p: trace_ehr + lc_ehr,
        trace_break_effect: lc_break_effect,
        base_spd: char_base_spd, trace_spd_f: trace_spd_f, trace_spd_p: trace_spd_p + lc_spd_p,
        trace_defshred: lc_def_ignore,
        trace_cr_p: lc_cr + trace_cr + fuxuan_cr,
        trace_cd_p: lc_cd + trace_cd + fuxuan_cd,
        trace_damage_bonus: lc_damage_bonus + fuxuan_dmg_bonus,
        trace_fire: trace_fire,
        The_Ashblazing_Grand_Duke_ATK_p: The_Ashblazing_Grand_Duke_ATK_p_fua,
    });

    // support stuff
    let res_shred = 0;
    let def_ignore = 0;
    let sup_damage_bonus = 0;

    let ting_penacony = 10;
    let element_type_dmg = stats.lightn;
    let elemental_dmg = element_type_dmg + stats.damage_bonus + sup_damage_bonus + ting_penacony;
    let basic_dmg_p = elemental_dmg + stats.basicdmg_p + lc_basic_damage_bonus;
    let skill_dmg_p = elemental_dmg + stats.skilldmg_p + lc_skill_damage_bonus;
    let fua_dmg_p   = elemental_dmg + stats.flwupdmg_p + lc_fua_damage_bonus;
    let ult_dmg_p   = elemental_dmg + stats.ultdmg_p   + lc_ult_damage_bonus;
    let dot_dmg_p   = elemental_dmg + stats.dot_bonus  + lc_dot_bonus ;
    
    // 1 targets
    let basic_atk_mult_primary = 0;
    let basic_hp_mult_primary  = 0;
    let skill_atk_mult_primary = 100;
    let skill_atk_mult_adj     = 0;
    let ult_atk_mult_primary   = 200;
    let ult_hp_mult_primary    = 0;
    let fua_atk_mult_primary   = 910;
    let efua_atk_mult_primary  = 0;
    let fua_hp_mult_primary    = 0;

    let vuln = 0;
    let cr_bonus_a6 = 10;
    let skill_primary = outgoing_dmg_js({
                'scaling_attribute' : stats.final_atk, 
                               'cr' : stats.final_cr + cr_bonus_a6, 
                               'cd' : stats.final_cd, 
                     'def_ignore_p' : stats.defignore_p + def_ignore,
                        'res_shred' : stats.res_ignore + res_shred,
                    'vulnerability' : vuln, 
                 'skill_multiplier' : skill_atk_mult_primary,
                      'dmg_bonus_p' : skill_dmg_p, 
                         'enemylvl' : 95});
    let skill_primary_ting_ult = outgoing_dmg_js({
                'scaling_attribute' : stats.final_atk, 
                               'cr' : stats.final_cr + cr_bonus_a6, 
                               'cd' : stats.final_cd, 
                     'def_ignore_p' : stats.defignore_p + def_ignore,
                        'res_shred' : stats.res_ignore + res_shred,
                    'vulnerability' : vuln, 
                 'skill_multiplier' : skill_atk_mult_primary,
                      'dmg_bonus_p' : skill_dmg_p + 56, 
                         'enemylvl' : 95});
    let ult_primary_ting_ult = outgoing_dmg_js({
                'scaling_attribute' : stats.final_atk, 
                               'cr' : stats.final_cr + cr_bonus_a6, 
                               'cd' : stats.final_cd, 
                     'def_ignore_p' : stats.defignore_p + def_ignore,
                        'res_shred' : stats.res_ignore + res_shred,
                    'vulnerability' : vuln, 
                 'skill_multiplier' : ult_atk_mult_primary,
                      'dmg_bonus_p' : ult_dmg_p + 56, 
                         'enemylvl' : 95});
    let ll_cd_a2 = 25;
    let fua_primary_ting_ult = outgoing_dmg_js({
                'scaling_attribute' : stats_fua.final_atk, 
                               'cr' : stats_fua.final_cr + cr_bonus_a6, 
                               'cd' : stats_fua.final_cd + ll_cd_a2, 
                     'def_ignore_p' : stats_fua.defignore_p + def_ignore,
                        'res_shred' : stats_fua.res_ignore + res_shred,
                    'vulnerability' : vuln, 
                 'skill_multiplier' : fua_atk_mult_primary,
                      'dmg_bonus_p' : fua_dmg_p + 56,  
                         'enemylvl' : 95});

    let benediction_mult_total_ting_ult = 192;
    let benediction_ting_ult = outgoing_dmg_js({
                'scaling_attribute' : stats.final_atk, 
                               'cr' : stats.final_cr + cr_bonus_a6, 
                               'cd' : stats.final_cd, 
                     'def_ignore_p' : stats.defignore_p + def_ignore,
                        'res_shred' : stats.res_ignore + res_shred,
                    'vulnerability' : vuln, 
                 'skill_multiplier' : benediction_mult_total_ting_ult,
                      'dmg_bonus_p' : elemental_dmg + 56, 
                         'enemylvl' : 95});
    let benediction_mult = 64;
    let benediction = outgoing_dmg_js({
                'scaling_attribute' : stats.final_atk, 
                               'cr' : stats.final_cr + cr_bonus_a6, 
                               'cd' : stats.final_cd, 
                     'def_ignore_p' : stats.defignore_p + def_ignore,
                        'res_shred' : stats.res_ignore + res_shred,
                    'vulnerability' : vuln, 
                 'skill_multiplier' : benediction_mult,
                      'dmg_bonus_p' : elemental_dmg, 
                         'enemylvl' : 95});
    
    
    let score = 2 * skill_primary + 2 * skill_primary_ting_ult + 2 * ult_primary_ting_ult + fua_primary_ting_ult + benediction_ting_ult + benediction;
    let stats_display = BuildStatsCalculatorNew({
        build: build,
        base_atk: total_base_atk,
        trace_atk_p: lc_atk_p + trace_atk_p,
        base_hp: total_base_hp,
        trace_hp_p: trace_hp_p + lc_hp_p,
        trace_res_p: trace_res,
        trace_ehr_p: trace_ehr + lc_ehr,
        trace_break_effect: lc_break_effect,
        base_spd: char_base_spd, trace_spd_f: trace_spd_f, trace_spd_p: trace_spd_p + lc_spd_p,
        trace_defshred: lc_def_ignore,
        trace_cr_p: trace_cr,
        trace_cd_p: lc_cd + trace_cd,
        trace_damage_bonus: lc_damage_bonus,
        trace_fire: trace_fire,
        The_Ashblazing_Grand_Duke_ATK_p: 0,
        count_conditionals: false,
    });

    let lbstats = [
        ["ATK", String(Math.floor(stats_display.final_atk))],
        ["CR", trim_after_decimal(stats_display.final_cr) + "%"],
        ["CD", trim_after_decimal(stats_display.final_cd) + "%"],
        ["Lightn", trim_after_decimal(stats_display.lightn)],
        ["SPD", trim_after_decimal(stats_display.final_spd)]
    ];

    let calcDetails = [
        ['E6S5 Cogs Penacony TY', ""],
        ['Benediction uptime', "100%"],
        ["Skill (before TY ult)", String(Math.floor(skill_primary))],
        ["Skill (after TY ult)", String(Math.floor(skill_primary_ting_ult))],
        ["ULT (after TY ult)", String(Math.floor(ult_primary_ting_ult))],
        ["10×LL (after TY ult)", String(Math.floor(fua_primary_ting_ult))],
        ["Benediction (before TY ult)", String(Math.floor(benediction))],
        ["Benediction (after TY ult)", String(Math.floor(benediction_ting_ult))]
    ];
    if (fuxuan) {
        calcDetails.unshift(["E1S1 Sig Keel FX", ""]);
    }
    
    return [Math.floor(score), stats.final_spd, lbstats, calcDetails];

}

