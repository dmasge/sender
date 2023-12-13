import { outgoing_dmg_js, hit_prob, trim_after_decimal } from '$lib/components/calculators/damage_formulas.js';
import { BuildStatsCalculatorNew, assign_lb_to_build } from '$lib/components/calculators/build_stats_calculator_new.js';
import { lc_dict_by_id } from "$lib/components/calculators/lbcalcs/lightcones.js"


// 1008
export function score_arlan(build, optimizationTarget) {
    let score = 0;
    let spd = 0;
    let lbstats = [];
    let calcDetails = [];
    let breakpoints = ["", "120.1", "133.34", "142.9"];

    if ("21012" == build['lc']['id']) {
        [score, spd, lbstats, calcDetails] = E6S5_21012_ASecretVow(build);
        let ctgrname = 'E6S5_' + build['lc']['id'];
        build = assign_lb_to_build(build, ctgrname, score, lbstats, spd, breakpoints, calcDetails);
    } else if ("23009" == build['lc']['id'] && build['lc']['s'] >= 3) {
        [score, spd, lbstats, calcDetails] = E6S5_23009_TheUnreachableSide(build);
        let ctgrname = 'E6S5_' + build['lc']['id'];
        build = assign_lb_to_build(build, ctgrname, score, lbstats, spd, breakpoints, calcDetails);
    } else if ("23009" == build['lc']['id']) {
        [score, spd, lbstats, calcDetails] = E6S1_23009_TheUnreachableSide(build);
        let ctgrname = 'E6S1_' + build['lc']['id'];
        build = assign_lb_to_build(build, ctgrname, score, lbstats, spd, breakpoints, calcDetails);
    } else if ("24000" == build['lc']['id']) {
        [score, spd, lbstats, calcDetails] = E6S5_24000_OntheFallofanAeon(build);
        let ctgrname = 'E6S5_' + build['lc']['id'];
        build = assign_lb_to_build(build, ctgrname, score, lbstats, spd, breakpoints, calcDetails);
    } else if ("21019" == build['lc']['id']) {
        [score, spd, lbstats, calcDetails] = E6S5_21019_UndertheBlueSky(build);
        let ctgrname = 'E6S5_' + build['lc']['id'];
        build = assign_lb_to_build(build, ctgrname, score, lbstats, spd, breakpoints, calcDetails);
    } 
    return build;
}

let char_base_hp = 1199.52;
let char_base_atk = 599.76;
let char_base_spd = 102;



function E6S5_21019_UndertheBlueSky(build) {
    let lc_base_atk = lc_dict_by_id['21019']['atk'];
    let lc_base_hp = lc_dict_by_id['21019']['hp'];
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
    let trace_fire = 0;
    let trace_atk_p = 28;
    let trace_cd = 0;
    let trace_cr = 0;
    let trace_res = 18;
    let trace_spd_f = 0;
    let trace_spd_p = 0 ;
    let trace_ehr = 0;

    let talent_damage_bonus = 63;
    let stats = BuildStatsCalculatorNew({
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
        trace_cr_p: lc_cr + trace_cr,
        trace_cd_p: lc_cd + trace_cd,
        trace_damage_bonus: lc_damage_bonus + talent_damage_bonus,
        trace_fire: trace_fire,
        The_Ashblazing_Grand_Duke_ATK_p: 0,
    });

    // support stuff
    let res_shred = 0;
    let def_ignore = 0;
    let sup_damage_bonus = 0;

    let e6_ULT_dmgbonus = 20;
    let e1_skill_dmgbonus = 10;
    let element_type_dmg = stats.lightn;
    let elemental_dmg = element_type_dmg + stats.damage_bonus + sup_damage_bonus;
    let basic_dmg_p = elemental_dmg + stats.basicdmg_p + lc_basic_damage_bonus;
    let skill_dmg_p = elemental_dmg + stats.skilldmg_p + lc_skill_damage_bonus + e1_skill_dmgbonus;
    let fua_dmg_p   = elemental_dmg + stats.flwupdmg_p + lc_fua_damage_bonus ;
    let ult_dmg_p   = elemental_dmg + stats.ultdmg_p   + lc_ult_damage_bonus + e6_ULT_dmgbonus;
    let dot_dmg_p   = elemental_dmg + stats.dot_bonus  + lc_dot_bonus ;
    
    // 1 targets
    let basic_atk_mult_primary = 0;
    let basic_hp_mult_primary  = 0;
    let skill_atk_mult_primary = 264;
    let skill_atk_mult_adj     = 0;
    let ult_atk_mult_primary   = 345.6;
    let ult_hp_mult_primary    = 0;
    let fua_atk_mult_primary   = 0;
    let efua_atk_mult_primary  = 0;
    let fua_hp_mult_primary    = 0;

    let vuln = 0;

    let skill_primary = outgoing_dmg_js({
        'scaling_attribute' : stats.final_atk, 
                       'cr' : stats.final_cr, 
                       'cd' : stats.final_cd, 
             'def_ignore_p' : stats.defignore_p + def_ignore,
                'res_shred' : stats.res_ignore + res_shred,
            'vulnerability' : vuln, 
         'skill_multiplier' : skill_atk_mult_primary,
              'dmg_bonus_p' : skill_dmg_p, 
                 'enemylvl' : 95});
    let ult_primary = outgoing_dmg_js({
        'scaling_attribute' : stats.final_atk, 
                       'cr' : stats.final_cr, 
                       'cd' : stats.final_cd, 
             'def_ignore_p' : stats.defignore_p + def_ignore,
                'res_shred' : stats.res_ignore + res_shred,
            'vulnerability' : vuln, 
         'skill_multiplier' : ult_atk_mult_primary,
              'dmg_bonus_p' : ult_dmg_p, 
                 'enemylvl' : 95});
        
    let score = 3 * skill_primary + 2 * ult_primary;


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
        trace_damage_bonus: lc_damage_bonus + talent_damage_bonus,
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
        ["Enemy killed recently", ""],
        ["Assumed Talent DMG bonus ", "63%"],
        ["Skill", String(Math.floor(skill_primary))],
        ["ULT", String(Math.floor(ult_primary))],
    ];
    
    return [Math.floor(score), stats.final_spd, lbstats, calcDetails];

}

function E6S5_24000_OntheFallofanAeon(build) {
    let lc_base_atk = lc_dict_by_id['24000']['atk'];
    let lc_base_hp = lc_dict_by_id['24000']['hp'];
    let total_base_atk = char_base_atk + lc_base_atk;
    let total_base_hp = char_base_hp + lc_base_hp;

    let lc_atk_p = 64;
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
    let trace_atk_p = 28;
    let trace_cd = 0;
    let trace_cr = 0;
    let trace_res = 18;
    let trace_spd_f = 0;
    let trace_spd_p = 0 ;
    let trace_ehr = 0;

    let talent_damage_bonus = 63;
    let stats = BuildStatsCalculatorNew({
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
        trace_cr_p: lc_cr + trace_cr,
        trace_cd_p: lc_cd + trace_cd,
        trace_damage_bonus: lc_damage_bonus + talent_damage_bonus,
        trace_fire: trace_fire,
        The_Ashblazing_Grand_Duke_ATK_p: 0,
    });

    // support stuff
    let res_shred = 0;
    let def_ignore = 0;
    let sup_damage_bonus = 0;

    let e6_ULT_dmgbonus = 20;
    let e1_skill_dmgbonus = 10;
    let element_type_dmg = stats.lightn;
    let elemental_dmg = element_type_dmg + stats.damage_bonus + sup_damage_bonus;
    let basic_dmg_p = elemental_dmg + stats.basicdmg_p + lc_basic_damage_bonus;
    let skill_dmg_p = elemental_dmg + stats.skilldmg_p + lc_skill_damage_bonus + e1_skill_dmgbonus;
    let fua_dmg_p   = elemental_dmg + stats.flwupdmg_p + lc_fua_damage_bonus ;
    let ult_dmg_p   = elemental_dmg + stats.ultdmg_p   + lc_ult_damage_bonus + e6_ULT_dmgbonus;
    let dot_dmg_p   = elemental_dmg + stats.dot_bonus  + lc_dot_bonus ;
    
    // 1 targets
    let basic_atk_mult_primary = 0;
    let basic_hp_mult_primary  = 0;
    let skill_atk_mult_primary = 264;
    let skill_atk_mult_adj     = 0;
    let ult_atk_mult_primary   = 345.6;
    let ult_hp_mult_primary    = 0;
    let fua_atk_mult_primary   = 0;
    let efua_atk_mult_primary  = 0;
    let fua_hp_mult_primary    = 0;

    let vuln = 0;

    let skill_primary = outgoing_dmg_js({
        'scaling_attribute' : stats.final_atk, 
                       'cr' : stats.final_cr, 
                       'cd' : stats.final_cd, 
             'def_ignore_p' : stats.defignore_p + def_ignore,
                'res_shred' : stats.res_ignore + res_shred,
            'vulnerability' : vuln, 
         'skill_multiplier' : skill_atk_mult_primary,
              'dmg_bonus_p' : skill_dmg_p, 
                 'enemylvl' : 95});
    let ult_primary = outgoing_dmg_js({
        'scaling_attribute' : stats.final_atk, 
                       'cr' : stats.final_cr, 
                       'cd' : stats.final_cd, 
             'def_ignore_p' : stats.defignore_p + def_ignore,
                'res_shred' : stats.res_ignore + res_shred,
            'vulnerability' : vuln, 
         'skill_multiplier' : ult_atk_mult_primary,
              'dmg_bonus_p' : ult_dmg_p, 
                 'enemylvl' : 95});
        
    let score = 3 * skill_primary + 2 * ult_primary;


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
        trace_cr_p: lc_cr + trace_cr,
        trace_cd_p: lc_cd + trace_cd,
        trace_damage_bonus: lc_damage_bonus + talent_damage_bonus,
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
        ["Enemy killed recently", ""],
        ["Assumed Talent DMG bonus ", "63%"],
        ["Skill", String(Math.floor(skill_primary))],
        ["ULT", String(Math.floor(ult_primary))],
    ];
    
    return [Math.floor(score), stats.final_spd, lbstats, calcDetails];

}

function E6S5_23009_TheUnreachableSide(build) {
    let lc_base_atk = lc_dict_by_id['23009']['atk'];
    let lc_base_hp = lc_dict_by_id['23009']['hp'];
    let total_base_atk = char_base_atk + lc_base_atk;
    let total_base_hp = char_base_hp + lc_base_hp;

    let lc_atk_p = 0;
    let lc_cd = 0;
    let lc_cr = 30;
    let lc_hp_p = 30;
    let lc_damage_bonus = 40; 
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
    let trace_atk_p = 28;
    let trace_cd = 0;
    let trace_cr = 0;
    let trace_res = 18;
    let trace_spd_f = 0;
    let trace_spd_p = 0 ;
    let trace_ehr = 0;

    let talent_damage_bonus = 63;
    let stats = BuildStatsCalculatorNew({
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
        trace_cr_p: lc_cr + trace_cr,
        trace_cd_p: lc_cd + trace_cd,
        trace_damage_bonus: lc_damage_bonus + talent_damage_bonus,
        trace_fire: trace_fire,
        The_Ashblazing_Grand_Duke_ATK_p: 0,
    });

    // support stuff
    let res_shred = 0;
    let def_ignore = 0;
    let sup_damage_bonus = 0;

    let e6_ULT_dmgbonus = 20;
    let e1_skill_dmgbonus = 10;
    let element_type_dmg = stats.lightn;
    let elemental_dmg = element_type_dmg + stats.damage_bonus + sup_damage_bonus;
    let basic_dmg_p = elemental_dmg + stats.basicdmg_p + lc_basic_damage_bonus;
    let skill_dmg_p = elemental_dmg + stats.skilldmg_p + lc_skill_damage_bonus + e1_skill_dmgbonus;
    let fua_dmg_p   = elemental_dmg + stats.flwupdmg_p + lc_fua_damage_bonus ;
    let ult_dmg_p   = elemental_dmg + stats.ultdmg_p   + lc_ult_damage_bonus + e6_ULT_dmgbonus;
    let dot_dmg_p   = elemental_dmg + stats.dot_bonus  + lc_dot_bonus ;
    
    // 1 targets
    let basic_atk_mult_primary = 0;
    let basic_hp_mult_primary  = 0;
    let skill_atk_mult_primary = 264;
    let skill_atk_mult_adj     = 0;
    let ult_atk_mult_primary   = 345.6;
    let ult_hp_mult_primary    = 0;
    let fua_atk_mult_primary   = 0;
    let efua_atk_mult_primary  = 0;
    let fua_hp_mult_primary    = 0;

    let vuln = 0;

    let skill_primary = outgoing_dmg_js({
        'scaling_attribute' : stats.final_atk, 
                       'cr' : stats.final_cr, 
                       'cd' : stats.final_cd, 
             'def_ignore_p' : stats.defignore_p + def_ignore,
                'res_shred' : stats.res_ignore + res_shred,
            'vulnerability' : vuln, 
         'skill_multiplier' : skill_atk_mult_primary,
              'dmg_bonus_p' : skill_dmg_p, 
                 'enemylvl' : 95});
    let ult_primary = outgoing_dmg_js({
        'scaling_attribute' : stats.final_atk, 
                       'cr' : stats.final_cr, 
                       'cd' : stats.final_cd, 
             'def_ignore_p' : stats.defignore_p + def_ignore,
                'res_shred' : stats.res_ignore + res_shred,
            'vulnerability' : vuln, 
         'skill_multiplier' : ult_atk_mult_primary,
              'dmg_bonus_p' : ult_dmg_p, 
                 'enemylvl' : 95});
        
    let score = 3 * skill_primary + 2 * ult_primary;


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
        trace_cr_p: lc_cr + trace_cr,
        trace_cd_p: lc_cd + trace_cd,
        trace_damage_bonus: lc_damage_bonus + talent_damage_bonus,
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
        ["Assumed Talent DMG bonus ", "63%"],
        ["Skill", String(Math.floor(skill_primary))],
        ["ULT", String(Math.floor(ult_primary))],
    ];
    
    return [Math.floor(score), stats.final_spd, lbstats, calcDetails];

}


function E6S1_23009_TheUnreachableSide(build) {
    let lc_base_atk = lc_dict_by_id['23009']['atk'];
    let lc_base_hp = lc_dict_by_id['23009']['hp'];
    let total_base_atk = char_base_atk + lc_base_atk;
    let total_base_hp = char_base_hp + lc_base_hp;

    let lc_atk_p = 0;
    let lc_cd = 0;
    let lc_cr = 18;
    let lc_hp_p = 18;
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
    let trace_atk_p = 28;
    let trace_cd = 0;
    let trace_cr = 0;
    let trace_res = 18;
    let trace_spd_f = 0;
    let trace_spd_p = 0 ;
    let trace_ehr = 0;

    let talent_damage_bonus = 63;
    let stats = BuildStatsCalculatorNew({
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
        trace_cr_p: lc_cr + trace_cr,
        trace_cd_p: lc_cd + trace_cd,
        trace_damage_bonus: lc_damage_bonus + talent_damage_bonus,
        trace_fire: trace_fire,
        The_Ashblazing_Grand_Duke_ATK_p: 0,
    });

    // support stuff
    let res_shred = 0;
    let def_ignore = 0;
    let sup_damage_bonus = 0;

    let e6_ULT_dmgbonus = 20;
    let e1_skill_dmgbonus = 10;
    let element_type_dmg = stats.lightn;
    let elemental_dmg = element_type_dmg + stats.damage_bonus + sup_damage_bonus;
    let basic_dmg_p = elemental_dmg + stats.basicdmg_p + lc_basic_damage_bonus;
    let skill_dmg_p = elemental_dmg + stats.skilldmg_p + lc_skill_damage_bonus + e1_skill_dmgbonus;
    let fua_dmg_p   = elemental_dmg + stats.flwupdmg_p + lc_fua_damage_bonus ;
    let ult_dmg_p   = elemental_dmg + stats.ultdmg_p   + lc_ult_damage_bonus + e6_ULT_dmgbonus;
    let dot_dmg_p   = elemental_dmg + stats.dot_bonus  + lc_dot_bonus ;
    
    // 1 targets
    let basic_atk_mult_primary = 0;
    let basic_hp_mult_primary  = 0;
    let skill_atk_mult_primary = 264;
    let skill_atk_mult_adj     = 0;
    let ult_atk_mult_primary   = 345.6;
    let ult_hp_mult_primary    = 0;
    let fua_atk_mult_primary   = 0;
    let efua_atk_mult_primary  = 0;
    let fua_hp_mult_primary    = 0;

    let vuln = 0;

    let skill_primary = outgoing_dmg_js({
        'scaling_attribute' : stats.final_atk, 
                       'cr' : stats.final_cr, 
                       'cd' : stats.final_cd, 
             'def_ignore_p' : stats.defignore_p + def_ignore,
                'res_shred' : stats.res_ignore + res_shred,
            'vulnerability' : vuln, 
         'skill_multiplier' : skill_atk_mult_primary,
              'dmg_bonus_p' : skill_dmg_p, 
                 'enemylvl' : 95});
    let ult_primary = outgoing_dmg_js({
        'scaling_attribute' : stats.final_atk, 
                       'cr' : stats.final_cr, 
                       'cd' : stats.final_cd, 
             'def_ignore_p' : stats.defignore_p + def_ignore,
                'res_shred' : stats.res_ignore + res_shred,
            'vulnerability' : vuln, 
         'skill_multiplier' : ult_atk_mult_primary,
              'dmg_bonus_p' : ult_dmg_p, 
                 'enemylvl' : 95});
        
    let score = 3 * skill_primary + 2 * ult_primary;


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
        trace_cr_p: lc_cr + trace_cr,
        trace_cd_p: lc_cd + trace_cd,
        trace_damage_bonus: lc_damage_bonus + talent_damage_bonus,
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
        ["Assumed Talent DMG bonus ", "63%"],
        ["Skill", String(Math.floor(skill_primary))],
        ["ULT", String(Math.floor(ult_primary))],
    ];
    
    return [Math.floor(score), stats.final_spd, lbstats, calcDetails];

}


function E6S5_21012_ASecretVow(build) {
    let lc_base_atk = lc_dict_by_id['21012']['atk'];
    let lc_base_hp = lc_dict_by_id['21012']['hp'];
    let total_base_atk = char_base_atk + lc_base_atk;
    let total_base_hp = char_base_hp + lc_base_hp;

    let lc_atk_p = 0;
    let lc_cd = 0;
    let lc_cr = 0;
    let lc_hp_p = 0;
    let lc_damage_bonus = 80; // assumes enemy has higher HP percentage than arlan
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
    let trace_atk_p = 28;
    let trace_cd = 0;
    let trace_cr = 0;
    let trace_res = 18;
    let trace_spd_f = 0;
    let trace_spd_p = 0 ;
    let trace_ehr = 0;

    let talent_damage_bonus = 63;
    let stats = BuildStatsCalculatorNew({
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
        trace_cr_p: lc_cr + trace_cr,
        trace_cd_p: lc_cd + trace_cd,
        trace_damage_bonus: lc_damage_bonus + talent_damage_bonus,
        trace_fire: trace_fire,
        The_Ashblazing_Grand_Duke_ATK_p: 0,
    });

    // support stuff
    let res_shred = 0;
    let def_ignore = 0;
    let sup_damage_bonus = 0;

    let e6_ULT_dmgbonus = 20;
    let e1_skill_dmgbonus = 10;
    let element_type_dmg = stats.lightn;
    let elemental_dmg = element_type_dmg + stats.damage_bonus + sup_damage_bonus;
    let basic_dmg_p = elemental_dmg + stats.basicdmg_p + lc_basic_damage_bonus;
    let skill_dmg_p = elemental_dmg + stats.skilldmg_p + lc_skill_damage_bonus + e1_skill_dmgbonus;
    let fua_dmg_p   = elemental_dmg + stats.flwupdmg_p + lc_fua_damage_bonus ;
    let ult_dmg_p   = elemental_dmg + stats.ultdmg_p   + lc_ult_damage_bonus + e6_ULT_dmgbonus;
    let dot_dmg_p   = elemental_dmg + stats.dot_bonus  + lc_dot_bonus ;
    
    // 1 targets
    let basic_atk_mult_primary = 0;
    let basic_hp_mult_primary  = 0;
    let skill_atk_mult_primary = 264;
    let skill_atk_mult_adj     = 0;
    let ult_atk_mult_primary   = 345.6;
    let ult_hp_mult_primary    = 0;
    let fua_atk_mult_primary   = 0;
    let efua_atk_mult_primary  = 0;
    let fua_hp_mult_primary    = 0;

    let vuln = 0;

    let skill_primary = outgoing_dmg_js({
        'scaling_attribute' : stats.final_atk, 
                       'cr' : stats.final_cr, 
                       'cd' : stats.final_cd, 
             'def_ignore_p' : stats.defignore_p + def_ignore,
                'res_shred' : stats.res_ignore + res_shred,
            'vulnerability' : vuln, 
         'skill_multiplier' : skill_atk_mult_primary,
              'dmg_bonus_p' : skill_dmg_p, 
                 'enemylvl' : 95});
    let ult_primary = outgoing_dmg_js({
        'scaling_attribute' : stats.final_atk, 
                       'cr' : stats.final_cr, 
                       'cd' : stats.final_cd, 
             'def_ignore_p' : stats.defignore_p + def_ignore,
                'res_shred' : stats.res_ignore + res_shred,
            'vulnerability' : vuln, 
         'skill_multiplier' : ult_atk_mult_primary,
              'dmg_bonus_p' : ult_dmg_p, 
                 'enemylvl' : 95});
        
    let score = 3 * skill_primary + 2 * ult_primary;


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
        trace_cr_p: lc_cr + trace_cr,
        trace_cd_p: lc_cd + trace_cd,
        trace_damage_bonus: lc_damage_bonus + talent_damage_bonus,
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
        ["LC assumes enemy has higher HP%", ""],
        ["Assumed Talent DMG bonus ", "63%"],
        ["Skill", String(Math.floor(skill_primary))],
        ["ULT", String(Math.floor(ult_primary))],
    ];
    
    return [Math.floor(score), stats.final_spd, lbstats, calcDetails];

}