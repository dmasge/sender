import { outgoing_dmg_2, trim_after_decimal } from '$lib/components/calculators/damage_formulas.js';
import { BuildStatsCalculatorNew, assign_lb_to_build } from '$lib/components/calculators/build_stats_calculator_new.js';
import { lc_dict_by_id } from "$lib/components/calculators/lbcalcs/lightcones.js"

// 1205
let char_base_atk = 543.312;
let char_base_hp = 1358.28;
let char_base_spd = 97;

export function score_blade(build) {
    let score = 0;
    let spd = 0;
    let lbstats = [];
    let calcDetails = [];
    let breakpoints = ["", "120.1", "133.4", "142.3"];

    if ("23009" == build['lc']['id'] &&  build['e'] >= 2 && build['lc']['s'] >= 3){
        [score, spd, lbstats, calcDetails] = E2S5_23009_TheUnreachableSide(build);
        let ctgrname = 'E2S5_' + build['lc']['id'] + "BN";
        build = assign_lb_to_build(build, ctgrname, score, lbstats, spd, breakpoints, calcDetails);
    } else if ("23009" == build['lc']['id'] &&  build['e'] >= 2){
        [score, spd, lbstats, calcDetails] = E2S1_23009_TheUnreachableSide(build);
        let ctgrname = 'E2S1_' + build['lc']['id'] + "BN";
        build = assign_lb_to_build(build, ctgrname, score, lbstats, spd, breakpoints, calcDetails);
    } else if ("23009" == build['lc']['id']){
        [score, spd, lbstats, calcDetails] = E0S1_23009_TheUnreachableSide(build);
        let ctgrname = 'E0S1_' + build['lc']['id'] + "BN";
        build = assign_lb_to_build(build, ctgrname, score, lbstats, spd, breakpoints, calcDetails);
    } else if ("21012" == build['lc']['id']){
        [score, spd, lbstats, calcDetails] = E0S5_21012_ASecretVow(build);
        let ctgrname = 'E0S5_' + build['lc']['id'] + "BN";
        build = assign_lb_to_build(build, ctgrname, score, lbstats, spd, breakpoints, calcDetails);
    } else if ("24000" == build['lc']['id']){
        [score, spd, lbstats, calcDetails] = E0S5_24000_OntheFallofanAeon(build);
        let ctgrname = 'E0S5_' + build['lc']['id'] + "BN";
        build = assign_lb_to_build(build, ctgrname, score, lbstats, spd, breakpoints, calcDetails);
    } else if ("23002" == build['lc']['id']){
        [score, spd, lbstats, calcDetails] = E0S1_23002_SomethingIrreplaceable(build);
        let ctgrname = 'E0S1_' + build['lc']['id'] + "BN";
        build = assign_lb_to_build(build, ctgrname, score, lbstats, spd, breakpoints, calcDetails);
    } 

    return build;
}


function E0S1_23002_SomethingIrreplaceable(build) {
    let lc_base_atk = lc_dict_by_id['23002']['atk'];
    let lc_base_hp = lc_dict_by_id['23002']['hp'];
    let total_base_atk = char_base_atk + lc_base_atk;
    let total_base_hp = char_base_hp + lc_base_hp;

    let lc_atk_p = 24;
    let lc_cd = 0;
    let lc_cr = 0;
    let lc_hp_p = 0;
    let lc_damage_bonus = 24 * 2/4;
    let lc_ult_damage_bonus = 0;
    let lc_skill_damage_bonus = 0;
    let lc_fua_damage_bonus = 0;
    let lc_def_ignore = 0;

    let trace_hp_p = 28;
    let trace_fire = 0;
    let trace_atk_p = 0;
    let trace_cd = 0;
    let trace_cr = 12;
    let trace_res = 10;
    let trace_spd_f = 0;

    let bronya_a6_perma_dmg_bonus = 10;
    let bronya_ult_atk_p = 55;
    let bronya_ult_cd = 225 * 0.16 + 20 + 10;

    let stats = BuildStatsCalculatorNew({
        build:build,
        base_atk : total_base_atk, 
        trace_atk_p:lc_atk_p + trace_atk_p + bronya_ult_atk_p,
        base_hp:total_base_hp,
        trace_hp_p:trace_hp_p + lc_hp_p,
        trace_res_p:trace_res,
        base_spd:char_base_spd, trace_spd_f: trace_spd_f, trace_spd_p:0,
        trace_defshred : lc_def_ignore,
        trace_cr_p:lc_cr + trace_cr,
        trace_cd_p:lc_cd + trace_cd + bronya_ult_cd,
        trace_damage_bonus:lc_damage_bonus + bronya_a6_perma_dmg_bonus,
        trace_fire : trace_fire
    });
    
    // support stuff
    let res_shred = 0;
    let def_ignore = 0 ;
    let sup_damage_bonus = 0; 

    let elemental_dmg = stats.final_wind + stats.damage_bonus + sup_damage_bonus;
    let a6_fua_dmg = 20;
    let basic_dmg_p = elemental_dmg + stats.basicdmg_p + lc_skill_damage_bonus;
    let skill_dmg_p = elemental_dmg + stats.skilldmg_p + lc_skill_damage_bonus;
    let fua_dmg_p   = elemental_dmg + stats.flwupdmg_p + lc_fua_damage_bonus + a6_fua_dmg;
    let ult_dmg_p   = elemental_dmg + stats.ultdmg_p   + lc_ult_damage_bonus;
    

    // 1 targets
    let basic_atk_mult_primary = 40;
    let basic_hp_mult_primary = 100;
    let skill_atk_mult_primary = 0;
    let skill_atk_mult_adj = 0;
    let ult_atk_mult_primary = 40;
    let ult_hp_mult_primary = 100;
    let fua_atk_mult_primary = 44;
    let fua_hp_mult_primary = 110;

    let vuln_due_technique = 0;

    let basic_atk_primary_only_bronya_ult = outgoing_dmg_2({scaling_attribute: stats.final_atk, 
        cr:stats.final_cr, 
        cd:stats.final_cd, 
        skill_multiplier:basic_atk_mult_primary,
        def_ignore_p:stats.defignore_p + def_ignore,
        res_shred:stats.res_ignore + res_shred,
        dmg_bonus_p:basic_dmg_p, 
        vulnerability:vuln_due_technique, enemylvl:95});
    let basic_hp_primary_only_bronya_ult = outgoing_dmg_2({scaling_attribute:stats.final_hp, 
        cr:stats.final_cr, 
        cd:stats.final_cd, 
        skill_multiplier:basic_hp_mult_primary,
        def_ignore_p:stats.defignore_p + def_ignore,
        res_shred:stats.res_ignore + res_shred,
        dmg_bonus_p:basic_dmg_p, 
        vulnerability:vuln_due_technique, enemylvl:95});
    let basic_primary_sum_only_bronya_ult = basic_atk_primary_only_bronya_ult + basic_hp_primary_only_bronya_ult;

    // changing stats to under bronya skill buff
    let bronya_skill_sig_damage_bonus = 66 + 30
    elemental_dmg = stats.final_wind + stats.damage_bonus + sup_damage_bonus + bronya_skill_sig_damage_bonus;
    a6_fua_dmg = 20;
    basic_dmg_p = elemental_dmg + stats.basicdmg_p + lc_skill_damage_bonus;
    skill_dmg_p = elemental_dmg + stats.skilldmg_p + lc_skill_damage_bonus;
    fua_dmg_p   = elemental_dmg + stats.flwupdmg_p + lc_fua_damage_bonus + a6_fua_dmg - bronya_skill_sig_damage_bonus/2; // 50% bronya skill uptime
    ult_dmg_p   = elemental_dmg + stats.ultdmg_p   + lc_ult_damage_bonus;
    let basic_atk_primary = outgoing_dmg_2({scaling_attribute:stats.final_atk, 
                                   cr:stats.final_cr, 
                                   cd:stats.final_cd, 
                                   skill_multiplier:basic_atk_mult_primary,
                                    def_ignore_p:stats.defignore_p + def_ignore,
                                    res_shred:stats.res_ignore + res_shred,
                                    dmg_bonus_p:basic_dmg_p, 
                                    vulnerability:vuln_due_technique, enemylvl:95});
    let basic_hp_primary = outgoing_dmg_2({scaling_attribute:stats.final_hp, 
                                cr:stats.final_cr, 
                                cd:stats.final_cd, 
                                skill_multiplier:basic_hp_mult_primary,
                                def_ignore_p:stats.defignore_p + def_ignore,
                                res_shred:stats.res_ignore + res_shred,
                                dmg_bonus_p:basic_dmg_p, 
                                vulnerability:vuln_due_technique, enemylvl:95});
    let basic_primary_sum = basic_atk_primary + basic_hp_primary;

   
    let fua_atk_primary = outgoing_dmg_2({scaling_attribute:stats.final_atk, 
        cr:stats.final_cr, 
        cd:stats.final_cd, 
        skill_multiplier:fua_atk_mult_primary,
         def_ignore_p:stats.defignore_p + def_ignore,
         res_shred:stats.res_ignore + res_shred,
         dmg_bonus_p:fua_dmg_p, 
         vulnerability:vuln_due_technique, enemylvl:95});
    let fua_hp_primary = outgoing_dmg_2({scaling_attribute:stats.final_hp, 
        cr:stats.final_cr, 
        cd:stats.final_cd, 
        skill_multiplier:fua_hp_mult_primary,
        def_ignore_p:stats.defignore_p + def_ignore,
        res_shred:stats.res_ignore + res_shred,
        dmg_bonus_p:fua_dmg_p, 
        vulnerability:vuln_due_technique, enemylvl:95})
    let fua_primary_sum = fua_atk_primary + fua_hp_primary;

    let ult_atk_primary = outgoing_dmg_2({scaling_attribute:stats.final_atk, 
        cr:stats.final_cr, 
        cd:stats.final_cd, 
        skill_multiplier:ult_atk_mult_primary,
         def_ignore_p:stats.defignore_p + def_ignore,
         res_shred:stats.res_ignore + res_shred,
         dmg_bonus_p:ult_dmg_p, 
         vulnerability:vuln_due_technique, enemylvl:95});
    let ult_hp_primary = outgoing_dmg_2({scaling_attribute:stats.final_hp, 
        cr:stats.final_cr, 
        cd:stats.final_cd, 
        skill_multiplier:ult_hp_mult_primary,
        def_ignore_p:stats.defignore_p + def_ignore,
        res_shred:stats.res_ignore + res_shred,
        dmg_bonus_p:ult_dmg_p, 
        vulnerability:vuln_due_technique, enemylvl:95});
    let ult_hploss_primary = outgoing_dmg_2({scaling_attribute:stats.final_hp*0.9, 
        cr:stats.final_cr, 
        cd:stats.final_cd, 
        skill_multiplier:ult_hp_mult_primary,
        def_ignore_p:stats.defignore_p + def_ignore,
        res_shred:stats.res_ignore + res_shred,
        dmg_bonus_p:ult_dmg_p, 
        vulnerability:vuln_due_technique, enemylvl:95});
    let ult_primary_sum = ult_atk_primary + ult_hp_primary + ult_hploss_primary;
    





    let score = 1 * basic_primary_sum_only_bronya_ult + 2 * basic_primary_sum + fua_primary_sum + ult_primary_sum;

    let stats_display = BuildStatsCalculatorNew({build:build,
        base_atk : total_base_atk, 
        trace_atk_p: lc_atk_p + trace_atk_p,
        base_hp:total_base_hp,
        trace_hp_p:trace_hp_p + lc_hp_p,
        trace_res_p:trace_res,
        base_spd:char_base_spd, trace_spd_f: trace_spd_f, trace_spd_p:0,
        trace_defshred : lc_def_ignore,
        trace_cr_p:lc_cr + trace_cr,
        trace_cd_p:lc_cd + trace_cd,
        trace_damage_bonus:lc_damage_bonus,
        trace_fire : trace_fire,
        count_conditionals: false,
    });
    

    let lbstats = [
        ["HP",  String(Math.floor(stats_display.final_hp))],
        ["ATK",  String(Math.floor(stats_display.final_atk))],
        ["CR",  trim_after_decimal(stats_display.final_cr) + "%"],
        ["CD", trim_after_decimal(stats_display.final_cd) + "%"],
        ["Wind",  trim_after_decimal(stats_display.final_wind)],
        ["SPD", trim_after_decimal(stats_display.final_spd)]
    ];
    
    let calcDetails = [
        ["Bronya is E0S1 w Keel, Sig, and 225 CD", ""],
        ["Bronya ULT uptime", "100%"],
        ["EBasic (Bronya Skill uptime 0%)", String(Math.floor(basic_primary_sum_only_bronya_ult))],
        ["2×EBasic (Bronya Skill uptime 100%)", String(Math.floor(2 * basic_primary_sum))],
        ["FUA  (Bronya Skill uptime 50%)", String(Math.floor(fua_primary_sum))],
        ["ULT  (Bronya Skill uptime 100%)", String(Math.floor(ult_primary_sum))],
    ];
    return [Math.floor(score), stats.final_spd, lbstats, calcDetails];

}


function E0S5_24000_OntheFallofanAeon(build) {
    let lc_base_atk = lc_dict_by_id['24000']['atk'];
    let lc_base_hp = lc_dict_by_id['24000']['hp'];
    let total_base_atk = char_base_atk + lc_base_atk;
    let total_base_hp = char_base_hp + lc_base_hp;

    let lc_atk_p = 16 * 4;
    let lc_cd = 0;
    let lc_cr = 0;
    let lc_hp_p = 0;
    let lc_damage_bonus = 24 * 3/4;
    let lc_ult_damage_bonus = 0;
    let lc_skill_damage_bonus = 0;
    let lc_fua_damage_bonus = 0;
    let lc_def_ignore = 0;

    let trace_hp_p = 28;
    let trace_fire = 0;
    let trace_atk_p = 0;
    let trace_cd = 0;
    let trace_cr = 12;
    let trace_res = 10;
    let trace_spd_f = 0;

    let bronya_a6_perma_dmg_bonus = 10;
    let bronya_ult_atk_p = 55;
    let bronya_ult_cd = 225 * 0.16 + 20 + 10;

    let stats = BuildStatsCalculatorNew({
        build:build,
        base_atk : total_base_atk, 
        trace_atk_p:lc_atk_p + trace_atk_p + bronya_ult_atk_p,
        base_hp:total_base_hp,
        trace_hp_p:trace_hp_p + lc_hp_p,
        trace_res_p:trace_res,
        base_spd:char_base_spd, trace_spd_f: trace_spd_f, trace_spd_p:0,
        trace_defshred : lc_def_ignore,
        trace_cr_p:lc_cr + trace_cr,
        trace_cd_p:lc_cd + trace_cd + bronya_ult_cd,
        trace_damage_bonus:lc_damage_bonus + bronya_a6_perma_dmg_bonus,
        trace_fire : trace_fire
    });
    
    // support stuff
    let res_shred = 0;
    let def_ignore = 0 ;
    let sup_damage_bonus = 0; 

    let elemental_dmg = stats.final_wind + stats.damage_bonus + sup_damage_bonus;
    let a6_fua_dmg = 20;
    let basic_dmg_p = elemental_dmg + stats.basicdmg_p + lc_skill_damage_bonus;
    let skill_dmg_p = elemental_dmg + stats.skilldmg_p + lc_skill_damage_bonus;
    let fua_dmg_p   = elemental_dmg + stats.flwupdmg_p + lc_fua_damage_bonus + a6_fua_dmg;
    let ult_dmg_p   = elemental_dmg + stats.ultdmg_p   + lc_ult_damage_bonus;
    

    // 1 targets
    let basic_atk_mult_primary = 40;
    let basic_hp_mult_primary = 100;
    let skill_atk_mult_primary = 0;
    let skill_atk_mult_adj = 0;
    let ult_atk_mult_primary = 40;
    let ult_hp_mult_primary = 100;
    let fua_atk_mult_primary = 44;
    let fua_hp_mult_primary = 110;

    let vuln_due_technique = 0;

    let basic_atk_primary_only_bronya_ult = outgoing_dmg_2({scaling_attribute: stats.final_atk, 
        cr:stats.final_cr, 
        cd:stats.final_cd, 
        skill_multiplier:basic_atk_mult_primary,
        def_ignore_p:stats.defignore_p + def_ignore,
        res_shred:stats.res_ignore + res_shred,
        dmg_bonus_p:basic_dmg_p, 
        vulnerability:vuln_due_technique, enemylvl:95});
    let basic_hp_primary_only_bronya_ult = outgoing_dmg_2({scaling_attribute:stats.final_hp, 
        cr:stats.final_cr, 
        cd:stats.final_cd, 
        skill_multiplier:basic_hp_mult_primary,
        def_ignore_p:stats.defignore_p + def_ignore,
        res_shred:stats.res_ignore + res_shred,
        dmg_bonus_p:basic_dmg_p, 
        vulnerability:vuln_due_technique, enemylvl:95});
    let basic_primary_sum_only_bronya_ult = basic_atk_primary_only_bronya_ult + basic_hp_primary_only_bronya_ult;

    // changing stats to under bronya skill buff
    let bronya_skill_sig_damage_bonus = 66 + 30
    elemental_dmg = stats.final_wind + stats.damage_bonus + sup_damage_bonus + bronya_skill_sig_damage_bonus;
    a6_fua_dmg = 20;
    basic_dmg_p = elemental_dmg + stats.basicdmg_p + lc_skill_damage_bonus;
    skill_dmg_p = elemental_dmg + stats.skilldmg_p + lc_skill_damage_bonus;
    fua_dmg_p   = elemental_dmg + stats.flwupdmg_p + lc_fua_damage_bonus + a6_fua_dmg - bronya_skill_sig_damage_bonus/2; // 50% bronya skill uptime
    ult_dmg_p   = elemental_dmg + stats.ultdmg_p   + lc_ult_damage_bonus;
    let basic_atk_primary = outgoing_dmg_2({scaling_attribute:stats.final_atk, 
                                   cr:stats.final_cr, 
                                   cd:stats.final_cd, 
                                   skill_multiplier:basic_atk_mult_primary,
                                    def_ignore_p:stats.defignore_p + def_ignore,
                                    res_shred:stats.res_ignore + res_shred,
                                    dmg_bonus_p:basic_dmg_p, 
                                    vulnerability:vuln_due_technique, enemylvl:95});
    let basic_hp_primary = outgoing_dmg_2({scaling_attribute:stats.final_hp, 
                                cr:stats.final_cr, 
                                cd:stats.final_cd, 
                                skill_multiplier:basic_hp_mult_primary,
                                def_ignore_p:stats.defignore_p + def_ignore,
                                res_shred:stats.res_ignore + res_shred,
                                dmg_bonus_p:basic_dmg_p, 
                                vulnerability:vuln_due_technique, enemylvl:95});
    let basic_primary_sum = basic_atk_primary + basic_hp_primary;

   
    let fua_atk_primary = outgoing_dmg_2({scaling_attribute:stats.final_atk, 
        cr:stats.final_cr, 
        cd:stats.final_cd, 
        skill_multiplier:fua_atk_mult_primary,
         def_ignore_p:stats.defignore_p + def_ignore,
         res_shred:stats.res_ignore + res_shred,
         dmg_bonus_p:fua_dmg_p, 
         vulnerability:vuln_due_technique, enemylvl:95});
    let fua_hp_primary = outgoing_dmg_2({scaling_attribute:stats.final_hp, 
        cr:stats.final_cr, 
        cd:stats.final_cd, 
        skill_multiplier:fua_hp_mult_primary,
        def_ignore_p:stats.defignore_p + def_ignore,
        res_shred:stats.res_ignore + res_shred,
        dmg_bonus_p:fua_dmg_p, 
        vulnerability:vuln_due_technique, enemylvl:95})
    let fua_primary_sum = fua_atk_primary + fua_hp_primary;

    let ult_atk_primary = outgoing_dmg_2({scaling_attribute:stats.final_atk, 
        cr:stats.final_cr, 
        cd:stats.final_cd, 
        skill_multiplier:ult_atk_mult_primary,
         def_ignore_p:stats.defignore_p + def_ignore,
         res_shred:stats.res_ignore + res_shred,
         dmg_bonus_p:ult_dmg_p, 
         vulnerability:vuln_due_technique, enemylvl:95});
    let ult_hp_primary = outgoing_dmg_2({scaling_attribute:stats.final_hp, 
        cr:stats.final_cr, 
        cd:stats.final_cd, 
        skill_multiplier:ult_hp_mult_primary,
        def_ignore_p:stats.defignore_p + def_ignore,
        res_shred:stats.res_ignore + res_shred,
        dmg_bonus_p:ult_dmg_p, 
        vulnerability:vuln_due_technique, enemylvl:95});
    let ult_hploss_primary = outgoing_dmg_2({scaling_attribute:stats.final_hp*0.9, 
        cr:stats.final_cr, 
        cd:stats.final_cd, 
        skill_multiplier:ult_hp_mult_primary,
        def_ignore_p:stats.defignore_p + def_ignore,
        res_shred:stats.res_ignore + res_shred,
        dmg_bonus_p:ult_dmg_p, 
        vulnerability:vuln_due_technique, enemylvl:95});
    let ult_primary_sum = ult_atk_primary + ult_hp_primary + ult_hploss_primary;
    





    let score = 1 * basic_primary_sum_only_bronya_ult + 2 * basic_primary_sum + fua_primary_sum + ult_primary_sum;

    let stats_display = BuildStatsCalculatorNew({build:build,
        base_atk : total_base_atk, 
        trace_atk_p: trace_atk_p,
        base_hp:total_base_hp,
        trace_hp_p:trace_hp_p + lc_hp_p,
        trace_res_p:trace_res,
        base_spd:char_base_spd, trace_spd_f: trace_spd_f, trace_spd_p:0,
        trace_defshred : lc_def_ignore,
        trace_cr_p:lc_cr + trace_cr,
        trace_cd_p:lc_cd + trace_cd,
        trace_damage_bonus:lc_damage_bonus,
        trace_fire : trace_fire,
        count_conditionals: false,
    });
    

    let lbstats = [
        ["HP",  String(Math.floor(stats_display.final_hp))],
        ["ATK",  String(Math.floor(stats_display.final_atk))],
        ["CR",  trim_after_decimal(stats_display.final_cr) + "%"],
        ["CD", trim_after_decimal(stats_display.final_cd) + "%"],
        ["Wind",  trim_after_decimal(stats_display.final_wind)],
        ["SPD", trim_after_decimal(stats_display.final_spd)]
    ];
    
    let calcDetails = [
        ["Bronya is E0S1 w Keel, Sig, and 225 CD", ""],
        ["Bronya ULT uptime", "100%"],
        ["EBasic (Bronya Skill uptime 0%)", String(Math.floor(basic_primary_sum_only_bronya_ult))],
        ["2×EBasic (Bronya Skill uptime 100%)", String(Math.floor(2 * basic_primary_sum))],
        ["FUA  (Bronya Skill uptime 50%)", String(Math.floor(fua_primary_sum))],
        ["ULT  (Bronya Skill uptime 100%)", String(Math.floor(ult_primary_sum))],
    ];
    return [Math.floor(score), stats.final_spd, lbstats, calcDetails];

}

function E0S5_21012_ASecretVow(build) {
    let lc_base_atk = lc_dict_by_id['21012']['atk'];
    let lc_base_hp = lc_dict_by_id['21012']['hp'];
    let total_base_atk = char_base_atk + lc_base_atk;
    let total_base_hp = char_base_hp + lc_base_hp;

    let lc_atk_p = 0;
    let lc_cd = 0;
    let lc_cr = 0;
    let lc_hp_p = 0;
    let lc_damage_bonus = 40;
    let lc_ult_damage_bonus = 0;
    let lc_skill_damage_bonus = 0;
    let lc_fua_damage_bonus = 0;
    let lc_def_ignore = 0;

    let trace_hp_p = 28;
    let trace_fire = 0;
    let trace_atk_p = 0;
    let trace_cd = 0;
    let trace_cr = 12;
    let trace_res = 10;
    let trace_spd_f = 0;

    let bronya_a6_perma_dmg_bonus = 10;
    let bronya_ult_atk_p = 55;
    let bronya_ult_cd = 225 * 0.16 + 20 + 10;

    let stats = BuildStatsCalculatorNew({
        build:build,
        base_atk : total_base_atk, 
        trace_atk_p:lc_atk_p + trace_atk_p + bronya_ult_atk_p,
        base_hp:total_base_hp,
        trace_hp_p:trace_hp_p + lc_hp_p,
        trace_res_p:trace_res,
        base_spd:char_base_spd, trace_spd_f: trace_spd_f, trace_spd_p:0,
        trace_defshred : lc_def_ignore,
        trace_cr_p:lc_cr + trace_cr,
        trace_cd_p:lc_cd + trace_cd + bronya_ult_cd,
        trace_damage_bonus:lc_damage_bonus + bronya_a6_perma_dmg_bonus,
        trace_fire : trace_fire
    });
    
    // support stuff
    let res_shred = 0;
    let def_ignore = 0 ;
    let sup_damage_bonus = 0; 

    let elemental_dmg = stats.final_wind + stats.damage_bonus + sup_damage_bonus;
    let a6_fua_dmg = 20;
    let basic_dmg_p = elemental_dmg + stats.basicdmg_p + lc_skill_damage_bonus;
    let skill_dmg_p = elemental_dmg + stats.skilldmg_p + lc_skill_damage_bonus;
    let fua_dmg_p   = elemental_dmg + stats.flwupdmg_p + lc_fua_damage_bonus + a6_fua_dmg;
    let ult_dmg_p   = elemental_dmg + stats.ultdmg_p   + lc_ult_damage_bonus;
    

    // 1 targets
    let basic_atk_mult_primary = 40;
    let basic_hp_mult_primary = 100;
    let skill_atk_mult_primary = 0;
    let skill_atk_mult_adj = 0;
    let ult_atk_mult_primary = 40;
    let ult_hp_mult_primary = 100;
    let fua_atk_mult_primary = 44;
    let fua_hp_mult_primary = 110;

    let vuln_due_technique = 0;

    let basic_atk_primary_only_bronya_ult = outgoing_dmg_2({scaling_attribute: stats.final_atk, 
        cr:stats.final_cr, 
        cd:stats.final_cd, 
        skill_multiplier:basic_atk_mult_primary,
        def_ignore_p:stats.defignore_p + def_ignore,
        res_shred:stats.res_ignore + res_shred,
        dmg_bonus_p:basic_dmg_p, 
        vulnerability:vuln_due_technique, enemylvl:95});
    let basic_hp_primary_only_bronya_ult = outgoing_dmg_2({scaling_attribute:stats.final_hp, 
        cr:stats.final_cr, 
        cd:stats.final_cd, 
        skill_multiplier:basic_hp_mult_primary,
        def_ignore_p:stats.defignore_p + def_ignore,
        res_shred:stats.res_ignore + res_shred,
        dmg_bonus_p:basic_dmg_p, 
        vulnerability:vuln_due_technique, enemylvl:95});
    let basic_primary_sum_only_bronya_ult = basic_atk_primary_only_bronya_ult + basic_hp_primary_only_bronya_ult;

    // changing stats to under bronya skill buff
    let bronya_skill_sig_damage_bonus = 66 + 30
    elemental_dmg = stats.final_wind + stats.damage_bonus + sup_damage_bonus + bronya_skill_sig_damage_bonus;
    a6_fua_dmg = 20;
    basic_dmg_p = elemental_dmg + stats.basicdmg_p + lc_skill_damage_bonus;
    skill_dmg_p = elemental_dmg + stats.skilldmg_p + lc_skill_damage_bonus;
    fua_dmg_p   = elemental_dmg + stats.flwupdmg_p + lc_fua_damage_bonus + a6_fua_dmg - bronya_skill_sig_damage_bonus/2; // 50% bronya skill uptime
    ult_dmg_p   = elemental_dmg + stats.ultdmg_p   + lc_ult_damage_bonus;
    let basic_atk_primary = outgoing_dmg_2({scaling_attribute:stats.final_atk, 
                                   cr:stats.final_cr, 
                                   cd:stats.final_cd, 
                                   skill_multiplier:basic_atk_mult_primary,
                                    def_ignore_p:stats.defignore_p + def_ignore,
                                    res_shred:stats.res_ignore + res_shred,
                                    dmg_bonus_p:basic_dmg_p, 
                                    vulnerability:vuln_due_technique, enemylvl:95});
    let basic_hp_primary = outgoing_dmg_2({scaling_attribute:stats.final_hp, 
                                cr:stats.final_cr, 
                                cd:stats.final_cd, 
                                skill_multiplier:basic_hp_mult_primary,
                                def_ignore_p:stats.defignore_p + def_ignore,
                                res_shred:stats.res_ignore + res_shred,
                                dmg_bonus_p:basic_dmg_p, 
                                vulnerability:vuln_due_technique, enemylvl:95});
    let basic_primary_sum = basic_atk_primary + basic_hp_primary;

   
    let fua_atk_primary = outgoing_dmg_2({scaling_attribute:stats.final_atk, 
        cr:stats.final_cr, 
        cd:stats.final_cd, 
        skill_multiplier:fua_atk_mult_primary,
         def_ignore_p:stats.defignore_p + def_ignore,
         res_shred:stats.res_ignore + res_shred,
         dmg_bonus_p:fua_dmg_p, 
         vulnerability:vuln_due_technique, enemylvl:95});
    let fua_hp_primary = outgoing_dmg_2({scaling_attribute:stats.final_hp, 
        cr:stats.final_cr, 
        cd:stats.final_cd, 
        skill_multiplier:fua_hp_mult_primary,
        def_ignore_p:stats.defignore_p + def_ignore,
        res_shred:stats.res_ignore + res_shred,
        dmg_bonus_p:fua_dmg_p, 
        vulnerability:vuln_due_technique, enemylvl:95})
    let fua_primary_sum = fua_atk_primary + fua_hp_primary;

    let ult_atk_primary = outgoing_dmg_2({scaling_attribute:stats.final_atk, 
        cr:stats.final_cr, 
        cd:stats.final_cd, 
        skill_multiplier:ult_atk_mult_primary,
         def_ignore_p:stats.defignore_p + def_ignore,
         res_shred:stats.res_ignore + res_shred,
         dmg_bonus_p:ult_dmg_p, 
         vulnerability:vuln_due_technique, enemylvl:95});
    let ult_hp_primary = outgoing_dmg_2({scaling_attribute:stats.final_hp, 
        cr:stats.final_cr, 
        cd:stats.final_cd, 
        skill_multiplier:ult_hp_mult_primary,
        def_ignore_p:stats.defignore_p + def_ignore,
        res_shred:stats.res_ignore + res_shred,
        dmg_bonus_p:ult_dmg_p, 
        vulnerability:vuln_due_technique, enemylvl:95});
    let ult_hploss_primary = outgoing_dmg_2({scaling_attribute:stats.final_hp*0.9, 
        cr:stats.final_cr, 
        cd:stats.final_cd, 
        skill_multiplier:ult_hp_mult_primary,
        def_ignore_p:stats.defignore_p + def_ignore,
        res_shred:stats.res_ignore + res_shred,
        dmg_bonus_p:ult_dmg_p, 
        vulnerability:vuln_due_technique, enemylvl:95});
    let ult_primary_sum = ult_atk_primary + ult_hp_primary + ult_hploss_primary;
    





    let score = 1 * basic_primary_sum_only_bronya_ult + 2 * basic_primary_sum + fua_primary_sum + ult_primary_sum;

    let stats_display = BuildStatsCalculatorNew({build:build,
        base_atk : total_base_atk, 
        trace_atk_p:lc_atk_p + trace_atk_p,
        base_hp:total_base_hp,
        trace_hp_p:trace_hp_p + lc_hp_p,
        trace_res_p:trace_res,
        base_spd:char_base_spd, trace_spd_f: trace_spd_f, trace_spd_p:0,
        trace_defshred : lc_def_ignore,
        trace_cr_p:lc_cr + trace_cr,
        trace_cd_p:lc_cd + trace_cd,
        trace_damage_bonus:lc_damage_bonus,
        trace_fire : trace_fire,
        count_conditionals: false,
    });
    

    let lbstats = [
        ["HP",  String(Math.floor(stats_display.final_hp))],
        ["ATK",  String(Math.floor(stats_display.final_atk))],
        ["CR",  trim_after_decimal(stats_display.final_cr) + "%"],
        ["CD", trim_after_decimal(stats_display.final_cd) + "%"],
        ["Wind",  trim_after_decimal(stats_display.final_wind)],
        ["SPD", trim_after_decimal(stats_display.final_spd)]
    ];
    
    let calcDetails = [
        ["Bronya is E0S1 w Keel, Sig, and 225 CD", ""],
        ["Bronya ULT uptime", "100%"],
        ["EBasic (Bronya Skill uptime 0%)", String(Math.floor(basic_primary_sum_only_bronya_ult))],
        ["2×EBasic (Bronya Skill uptime 100%)", String(Math.floor(2 * basic_primary_sum))],
        ["FUA  (Bronya Skill uptime 50%)", String(Math.floor(fua_primary_sum))],
        ["ULT  (Bronya Skill uptime 100%)", String(Math.floor(ult_primary_sum))],
    ];
    return [Math.floor(score), stats.final_spd, lbstats, calcDetails];

}




function E2S5_23009_TheUnreachableSide(build) {
    let lc_base_atk = lc_dict_by_id['23009']['atk'];
    let lc_base_hp = lc_dict_by_id['23009']['hp'];
    let total_base_atk = char_base_atk + lc_base_atk;
    let total_base_hp = char_base_hp + lc_base_hp;

    let lc_atk_p = 0;
    let lc_cd = 0;
    let lc_cr = 30;
    let lc_hp_p = 30;
    let lc_damage_bonus = 40;
    let lc_ult_damage_bonus = 0;
    let lc_skill_damage_bonus = 0;
    let lc_fua_damage_bonus = 0;
    let lc_def_ignore = 0;

    let trace_hp_p = 28;
    let trace_fire = 0;
    let trace_atk_p = 0;
    let trace_cd = 0;
    let trace_cr = 12;
    let trace_res = 10;
    let trace_spd_f = 0;

    let bronya_a6_perma_dmg_bonus = 10;
    let bronya_ult_atk_p = 55;
    let bronya_ult_cd = 225 * 0.16 + 20 + 10;
    let E2_CR_p = 15

    let stats = BuildStatsCalculatorNew({
        build:build,
        base_atk : total_base_atk, 
        trace_atk_p:lc_atk_p + trace_atk_p + bronya_ult_atk_p,
        base_hp:total_base_hp,
        trace_hp_p:trace_hp_p + lc_hp_p,
        trace_res_p:trace_res,
        base_spd:char_base_spd, trace_spd_f: trace_spd_f, trace_spd_p:0,
        trace_defshred : lc_def_ignore,
        trace_cr_p:lc_cr + trace_cr + E2_CR_p,
        trace_cd_p:lc_cd + trace_cd + bronya_ult_cd,
        trace_damage_bonus:lc_damage_bonus + bronya_a6_perma_dmg_bonus,
        trace_fire : trace_fire
    });
    
    // support stuff
    let res_shred = 0;
    let def_ignore = 0 ;
    let sup_damage_bonus = 0; 

    let elemental_dmg = stats.final_wind + stats.damage_bonus + sup_damage_bonus;
    let a6_fua_dmg = 20;
    let basic_dmg_p = elemental_dmg + stats.basicdmg_p + lc_skill_damage_bonus;
    let skill_dmg_p = elemental_dmg + stats.skilldmg_p + lc_skill_damage_bonus;
    let fua_dmg_p   = elemental_dmg + stats.flwupdmg_p + lc_fua_damage_bonus + a6_fua_dmg;
    let ult_dmg_p   = elemental_dmg + stats.ultdmg_p   + lc_ult_damage_bonus;
    

    // 1 targets
    let basic_atk_mult_primary = 40;
    let basic_hp_mult_primary = 100;
    let skill_atk_mult_primary = 0;
    let skill_atk_mult_adj = 0;
    let ult_atk_mult_primary = 40;
    let ult_hp_mult_primary = 100;
    let fua_atk_mult_primary = 44;
    let fua_hp_mult_primary = 110;

    let vuln_due_technique = 0;

    let basic_atk_primary_only_bronya_ult = outgoing_dmg_2({scaling_attribute: stats.final_atk, 
        cr:stats.final_cr, 
        cd:stats.final_cd, 
        skill_multiplier:basic_atk_mult_primary,
        def_ignore_p:stats.defignore_p + def_ignore,
        res_shred:stats.res_ignore + res_shred,
        dmg_bonus_p:basic_dmg_p, 
        vulnerability:vuln_due_technique, enemylvl:95});
    let basic_hp_primary_only_bronya_ult = outgoing_dmg_2({scaling_attribute:stats.final_hp, 
        cr:stats.final_cr, 
        cd:stats.final_cd, 
        skill_multiplier:basic_hp_mult_primary,
        def_ignore_p:stats.defignore_p + def_ignore,
        res_shred:stats.res_ignore + res_shred,
        dmg_bonus_p:basic_dmg_p, 
        vulnerability:vuln_due_technique, enemylvl:95});
    let basic_primary_sum_only_bronya_ult = basic_atk_primary_only_bronya_ult + basic_hp_primary_only_bronya_ult;

    // changing stats to under bronya skill buff
    let bronya_skill_sig_damage_bonus = 66 + 30
    elemental_dmg = stats.final_wind + stats.damage_bonus + sup_damage_bonus + bronya_skill_sig_damage_bonus;
    a6_fua_dmg = 20;
    basic_dmg_p = elemental_dmg + stats.basicdmg_p + lc_skill_damage_bonus;
    skill_dmg_p = elemental_dmg + stats.skilldmg_p + lc_skill_damage_bonus;
    fua_dmg_p   = elemental_dmg + stats.flwupdmg_p + lc_fua_damage_bonus + a6_fua_dmg - bronya_skill_sig_damage_bonus/2; // 50% bronya skill uptime
    ult_dmg_p   = elemental_dmg + stats.ultdmg_p   + lc_ult_damage_bonus;
    let basic_atk_primary = outgoing_dmg_2({scaling_attribute:stats.final_atk, 
                                   cr:stats.final_cr, 
                                   cd:stats.final_cd, 
                                   skill_multiplier:basic_atk_mult_primary,
                                    def_ignore_p:stats.defignore_p + def_ignore,
                                    res_shred:stats.res_ignore + res_shred,
                                    dmg_bonus_p:basic_dmg_p, 
                                    vulnerability:vuln_due_technique, enemylvl:95});
    let basic_hp_primary = outgoing_dmg_2({scaling_attribute:stats.final_hp, 
                                cr:stats.final_cr, 
                                cd:stats.final_cd, 
                                skill_multiplier:basic_hp_mult_primary,
                                def_ignore_p:stats.defignore_p + def_ignore,
                                res_shred:stats.res_ignore + res_shred,
                                dmg_bonus_p:basic_dmg_p, 
                                vulnerability:vuln_due_technique, enemylvl:95});
    let basic_primary_sum = basic_atk_primary + basic_hp_primary;

   
    let fua_atk_primary = outgoing_dmg_2({scaling_attribute:stats.final_atk, 
        cr:stats.final_cr, 
        cd:stats.final_cd, 
        skill_multiplier:fua_atk_mult_primary,
         def_ignore_p:stats.defignore_p + def_ignore,
         res_shred:stats.res_ignore + res_shred,
         dmg_bonus_p:fua_dmg_p, 
         vulnerability:vuln_due_technique, enemylvl:95});
    let fua_hp_primary = outgoing_dmg_2({scaling_attribute:stats.final_hp, 
        cr:stats.final_cr, 
        cd:stats.final_cd, 
        skill_multiplier:fua_hp_mult_primary,
        def_ignore_p:stats.defignore_p + def_ignore,
        res_shred:stats.res_ignore + res_shred,
        dmg_bonus_p:fua_dmg_p, 
        vulnerability:vuln_due_technique, enemylvl:95})
    let fua_primary_sum = fua_atk_primary + fua_hp_primary;

    let ult_atk_primary = outgoing_dmg_2({scaling_attribute:stats.final_atk, 
        cr:stats.final_cr, 
        cd:stats.final_cd, 
        skill_multiplier:ult_atk_mult_primary,
         def_ignore_p:stats.defignore_p + def_ignore,
         res_shred:stats.res_ignore + res_shred,
         dmg_bonus_p:ult_dmg_p, 
         vulnerability:vuln_due_technique, enemylvl:95});
    let ult_hp_primary = outgoing_dmg_2({scaling_attribute:stats.final_hp, 
        cr:stats.final_cr, 
        cd:stats.final_cd, 
        skill_multiplier:ult_hp_mult_primary,
        def_ignore_p:stats.defignore_p + def_ignore,
        res_shred:stats.res_ignore + res_shred,
        dmg_bonus_p:ult_dmg_p, 
        vulnerability:vuln_due_technique, enemylvl:95});
    let ult_hploss_primary = outgoing_dmg_2({scaling_attribute:stats.final_hp*0.9, 
        cr:stats.final_cr, 
        cd:stats.final_cd, 
        skill_multiplier:ult_hp_mult_primary + 150, // E1
        def_ignore_p:stats.defignore_p + def_ignore,
        res_shred:stats.res_ignore + res_shred,
        dmg_bonus_p:ult_dmg_p, 
        vulnerability:vuln_due_technique, enemylvl:95});
    let ult_primary_sum = ult_atk_primary + ult_hp_primary + ult_hploss_primary;
    





    let score = 1 * basic_primary_sum_only_bronya_ult + 2 * basic_primary_sum + fua_primary_sum + ult_primary_sum;

    let stats_display = BuildStatsCalculatorNew({build:build,
        base_atk : total_base_atk, 
        trace_atk_p:lc_atk_p + trace_atk_p,
        base_hp:total_base_hp,
        trace_hp_p:trace_hp_p + lc_hp_p,
        trace_res_p:trace_res,
        base_spd:char_base_spd, trace_spd_f: trace_spd_f, trace_spd_p:0,
        trace_defshred : lc_def_ignore,
        trace_cr_p:lc_cr + trace_cr,
        trace_cd_p:lc_cd + trace_cd,
        trace_damage_bonus:lc_damage_bonus,
        trace_fire : trace_fire,
        count_conditionals: false,
    });
    

    let lbstats = [
        ["HP",  String(Math.floor(stats_display.final_hp))],
        ["ATK",  String(Math.floor(stats_display.final_atk))],
        ["CR",  trim_after_decimal(stats_display.final_cr) + "%"],
        ["CD", trim_after_decimal(stats_display.final_cd) + "%"],
        ["Wind",  trim_after_decimal(stats_display.final_wind)],
        ["SPD", trim_after_decimal(stats_display.final_spd)]
    ];
    
    let calcDetails = [
        ["Bronya is E0S1 w Keel, Sig, and 225 CD", ""],
        ["Bronya ULT uptime", "100%"],
        ["EBasic (Bronya Skill uptime 0%)", String(Math.floor(basic_primary_sum_only_bronya_ult))],
        ["2×EBasic (Bronya Skill uptime 100%)", String(Math.floor(2 * basic_primary_sum))],
        ["FUA  (Bronya Skill uptime 50%)", String(Math.floor(fua_primary_sum))],
        ["ULT  (Bronya Skill uptime 100%)", String(Math.floor(ult_primary_sum))],
    ];
    return [Math.floor(score), stats.final_spd, lbstats, calcDetails];

}


function E2S1_23009_TheUnreachableSide(build) {
    let lc_base_atk = lc_dict_by_id['23009']['atk'];
    let lc_base_hp = lc_dict_by_id['23009']['hp'];
    let total_base_atk = char_base_atk + lc_base_atk;
    let total_base_hp = char_base_hp + lc_base_hp;

    let lc_atk_p = 0;
    let lc_cd = 0;
    let lc_cr = 18;
    let lc_hp_p = 18;
    let lc_damage_bonus = 24;
    let lc_ult_damage_bonus = 0;
    let lc_skill_damage_bonus = 0;
    let lc_fua_damage_bonus = 0;
    let lc_def_ignore = 0;

    let trace_hp_p = 28;
    let trace_fire = 0;
    let trace_atk_p = 0;
    let trace_cd = 0;
    let trace_cr = 12;
    let trace_res = 10;
    let trace_spd_f = 0;

    let bronya_a6_perma_dmg_bonus = 10;
    let bronya_ult_atk_p = 55;
    let bronya_ult_cd = 225 * 0.16 + 20 + 10;
    let E2_CR_p = 15

    let stats = BuildStatsCalculatorNew({
        build:build,
        base_atk : total_base_atk, 
        trace_atk_p:lc_atk_p + trace_atk_p + bronya_ult_atk_p,
        base_hp:total_base_hp,
        trace_hp_p:trace_hp_p + lc_hp_p,
        trace_res_p:trace_res,
        base_spd:char_base_spd, trace_spd_f: trace_spd_f, trace_spd_p:0,
        trace_defshred : lc_def_ignore,
        trace_cr_p:lc_cr + trace_cr + E2_CR_p,
        trace_cd_p:lc_cd + trace_cd + bronya_ult_cd,
        trace_damage_bonus:lc_damage_bonus + bronya_a6_perma_dmg_bonus,
        trace_fire : trace_fire
    });
    
    // support stuff
    let res_shred = 0;
    let def_ignore = 0 ;
    let sup_damage_bonus = 0; 

    let elemental_dmg = stats.final_wind + stats.damage_bonus + sup_damage_bonus;
    let a6_fua_dmg = 20;
    let basic_dmg_p = elemental_dmg + stats.basicdmg_p + lc_skill_damage_bonus;
    let skill_dmg_p = elemental_dmg + stats.skilldmg_p + lc_skill_damage_bonus;
    let fua_dmg_p   = elemental_dmg + stats.flwupdmg_p + lc_fua_damage_bonus + a6_fua_dmg;
    let ult_dmg_p   = elemental_dmg + stats.ultdmg_p   + lc_ult_damage_bonus;
    

    // 1 targets
    let basic_atk_mult_primary = 40;
    let basic_hp_mult_primary = 100;
    let skill_atk_mult_primary = 0;
    let skill_atk_mult_adj = 0;
    let ult_atk_mult_primary = 40;
    let ult_hp_mult_primary = 100;
    let fua_atk_mult_primary = 44;
    let fua_hp_mult_primary = 110;

    let vuln_due_technique = 0;

    let basic_atk_primary_only_bronya_ult = outgoing_dmg_2({scaling_attribute: stats.final_atk, 
        cr:stats.final_cr, 
        cd:stats.final_cd, 
        skill_multiplier:basic_atk_mult_primary,
        def_ignore_p:stats.defignore_p + def_ignore,
        res_shred:stats.res_ignore + res_shred,
        dmg_bonus_p:basic_dmg_p, 
        vulnerability:vuln_due_technique, enemylvl:95});
    let basic_hp_primary_only_bronya_ult = outgoing_dmg_2({scaling_attribute:stats.final_hp, 
        cr:stats.final_cr, 
        cd:stats.final_cd, 
        skill_multiplier:basic_hp_mult_primary,
        def_ignore_p:stats.defignore_p + def_ignore,
        res_shred:stats.res_ignore + res_shred,
        dmg_bonus_p:basic_dmg_p, 
        vulnerability:vuln_due_technique, enemylvl:95});
    let basic_primary_sum_only_bronya_ult = basic_atk_primary_only_bronya_ult + basic_hp_primary_only_bronya_ult;

    // changing stats to under bronya skill buff
    let bronya_skill_sig_damage_bonus = 66 + 30
    elemental_dmg = stats.final_wind + stats.damage_bonus + sup_damage_bonus + bronya_skill_sig_damage_bonus;
    a6_fua_dmg = 20;
    basic_dmg_p = elemental_dmg + stats.basicdmg_p + lc_skill_damage_bonus;
    skill_dmg_p = elemental_dmg + stats.skilldmg_p + lc_skill_damage_bonus;
    fua_dmg_p   = elemental_dmg + stats.flwupdmg_p + lc_fua_damage_bonus + a6_fua_dmg - bronya_skill_sig_damage_bonus/2; // 50% bronya skill uptime
    ult_dmg_p   = elemental_dmg + stats.ultdmg_p   + lc_ult_damage_bonus;
    let basic_atk_primary = outgoing_dmg_2({scaling_attribute:stats.final_atk, 
                                   cr:stats.final_cr, 
                                   cd:stats.final_cd, 
                                   skill_multiplier:basic_atk_mult_primary,
                                    def_ignore_p:stats.defignore_p + def_ignore,
                                    res_shred:stats.res_ignore + res_shred,
                                    dmg_bonus_p:basic_dmg_p, 
                                    vulnerability:vuln_due_technique, enemylvl:95});
    let basic_hp_primary = outgoing_dmg_2({scaling_attribute:stats.final_hp, 
                                cr:stats.final_cr, 
                                cd:stats.final_cd, 
                                skill_multiplier:basic_hp_mult_primary,
                                def_ignore_p:stats.defignore_p + def_ignore,
                                res_shred:stats.res_ignore + res_shred,
                                dmg_bonus_p:basic_dmg_p, 
                                vulnerability:vuln_due_technique, enemylvl:95});
    let basic_primary_sum = basic_atk_primary + basic_hp_primary;

   
    let fua_atk_primary = outgoing_dmg_2({scaling_attribute:stats.final_atk, 
        cr:stats.final_cr, 
        cd:stats.final_cd, 
        skill_multiplier:fua_atk_mult_primary,
         def_ignore_p:stats.defignore_p + def_ignore,
         res_shred:stats.res_ignore + res_shred,
         dmg_bonus_p:fua_dmg_p, 
         vulnerability:vuln_due_technique, enemylvl:95});
    let fua_hp_primary = outgoing_dmg_2({scaling_attribute:stats.final_hp, 
        cr:stats.final_cr, 
        cd:stats.final_cd, 
        skill_multiplier:fua_hp_mult_primary,
        def_ignore_p:stats.defignore_p + def_ignore,
        res_shred:stats.res_ignore + res_shred,
        dmg_bonus_p:fua_dmg_p, 
        vulnerability:vuln_due_technique, enemylvl:95})
    let fua_primary_sum = fua_atk_primary + fua_hp_primary;

    let ult_atk_primary = outgoing_dmg_2({scaling_attribute:stats.final_atk, 
        cr:stats.final_cr, 
        cd:stats.final_cd, 
        skill_multiplier:ult_atk_mult_primary,
         def_ignore_p:stats.defignore_p + def_ignore,
         res_shred:stats.res_ignore + res_shred,
         dmg_bonus_p:ult_dmg_p, 
         vulnerability:vuln_due_technique, enemylvl:95});
    let ult_hp_primary = outgoing_dmg_2({scaling_attribute:stats.final_hp, 
        cr:stats.final_cr, 
        cd:stats.final_cd, 
        skill_multiplier:ult_hp_mult_primary,
        def_ignore_p:stats.defignore_p + def_ignore,
        res_shred:stats.res_ignore + res_shred,
        dmg_bonus_p:ult_dmg_p, 
        vulnerability:vuln_due_technique, enemylvl:95});
    let ult_hploss_primary = outgoing_dmg_2({scaling_attribute:stats.final_hp*0.9, 
        cr:stats.final_cr, 
        cd:stats.final_cd, 
        skill_multiplier:ult_hp_mult_primary + 150, // E1
        def_ignore_p:stats.defignore_p + def_ignore,
        res_shred:stats.res_ignore + res_shred,
        dmg_bonus_p:ult_dmg_p, 
        vulnerability:vuln_due_technique, enemylvl:95});
    let ult_primary_sum = ult_atk_primary + ult_hp_primary + ult_hploss_primary;
    





    let score = 1 * basic_primary_sum_only_bronya_ult + 2 * basic_primary_sum + fua_primary_sum + ult_primary_sum;

    let stats_display = BuildStatsCalculatorNew({build:build,
        base_atk : total_base_atk, 
        trace_atk_p:lc_atk_p + trace_atk_p,
        base_hp:total_base_hp,
        trace_hp_p:trace_hp_p + lc_hp_p,
        trace_res_p:trace_res,
        base_spd:char_base_spd, trace_spd_f: trace_spd_f, trace_spd_p:0,
        trace_defshred : lc_def_ignore,
        trace_cr_p:lc_cr + trace_cr,
        trace_cd_p:lc_cd + trace_cd,
        trace_damage_bonus:lc_damage_bonus,
        trace_fire : trace_fire,
        count_conditionals: false,
    });
    

    let lbstats = [
        ["HP",  String(Math.floor(stats_display.final_hp))],
        ["ATK",  String(Math.floor(stats_display.final_atk))],
        ["CR",  trim_after_decimal(stats_display.final_cr) + "%"],
        ["CD", trim_after_decimal(stats_display.final_cd) + "%"],
        ["Wind",  trim_after_decimal(stats_display.final_wind)],
        ["SPD", trim_after_decimal(stats_display.final_spd)]
    ];
    
    let calcDetails = [
        ["Bronya is E0S1 w Keel, Sig, and 225 CD", ""],
        ["Bronya ULT uptime", "100%"],
        ["EBasic (Bronya Skill uptime 0%)", String(Math.floor(basic_primary_sum_only_bronya_ult))],
        ["2×EBasic (Bronya Skill uptime 100%)", String(Math.floor(2 * basic_primary_sum))],
        ["FUA  (Bronya Skill uptime 50%)", String(Math.floor(fua_primary_sum))],
        ["ULT  (Bronya Skill uptime 100%)", String(Math.floor(ult_primary_sum))],
    ];
    return [Math.floor(score), stats.final_spd, lbstats, calcDetails];

}


function E0S1_23009_TheUnreachableSide(build) {
    let lc_base_atk = lc_dict_by_id['23009']['atk'];
    let lc_base_hp = lc_dict_by_id['23009']['hp'];
    let total_base_atk = char_base_atk + lc_base_atk;
    let total_base_hp = char_base_hp + lc_base_hp;

    let lc_atk_p = 0;
    let lc_cd = 0;
    let lc_cr = 18;
    let lc_hp_p = 18;
    let lc_damage_bonus = 24;
    let lc_ult_damage_bonus = 0;
    let lc_skill_damage_bonus = 0;
    let lc_fua_damage_bonus = 0;
    let lc_def_ignore = 0;

    let trace_hp_p = 28;
    let trace_fire = 0;
    let trace_atk_p = 0;
    let trace_cd = 0;
    let trace_cr = 12;
    let trace_res = 10;
    let trace_spd_f = 0;

    let bronya_a6_perma_dmg_bonus = 10;
    let bronya_ult_atk_p = 55;
    let bronya_ult_cd = 225 * 0.16 + 20 + 10;

    let stats = BuildStatsCalculatorNew({
        build:build,
        base_atk : total_base_atk, 
        trace_atk_p:lc_atk_p + trace_atk_p + bronya_ult_atk_p,
        base_hp:total_base_hp,
        trace_hp_p:trace_hp_p + lc_hp_p,
        trace_res_p:trace_res,
        base_spd:char_base_spd, trace_spd_f: trace_spd_f, trace_spd_p:0,
        trace_defshred : lc_def_ignore,
        trace_cr_p:lc_cr + trace_cr,
        trace_cd_p:lc_cd + trace_cd + bronya_ult_cd,
        trace_damage_bonus:lc_damage_bonus + bronya_a6_perma_dmg_bonus,
        trace_fire : trace_fire
    });
    
    // support stuff
    let res_shred = 0;
    let def_ignore = 0 ;
    let sup_damage_bonus = 0; 

    let elemental_dmg = stats.final_wind + stats.damage_bonus + sup_damage_bonus;
    let a6_fua_dmg = 20;
    let basic_dmg_p = elemental_dmg + stats.basicdmg_p + lc_skill_damage_bonus;
    let skill_dmg_p = elemental_dmg + stats.skilldmg_p + lc_skill_damage_bonus;
    let fua_dmg_p   = elemental_dmg + stats.flwupdmg_p + lc_fua_damage_bonus + a6_fua_dmg;
    let ult_dmg_p   = elemental_dmg + stats.ultdmg_p   + lc_ult_damage_bonus;
    

    // 1 targets
    let basic_atk_mult_primary = 40;
    let basic_hp_mult_primary = 100;
    let skill_atk_mult_primary = 0;
    let skill_atk_mult_adj = 0;
    let ult_atk_mult_primary = 40;
    let ult_hp_mult_primary = 100;
    let fua_atk_mult_primary = 44;
    let fua_hp_mult_primary = 110;

    let vuln_due_technique = 0;

    let basic_atk_primary_only_bronya_ult = outgoing_dmg_2({scaling_attribute: stats.final_atk, 
        cr:stats.final_cr, 
        cd:stats.final_cd, 
        skill_multiplier:basic_atk_mult_primary,
        def_ignore_p:stats.defignore_p + def_ignore,
        res_shred:stats.res_ignore + res_shred,
        dmg_bonus_p:basic_dmg_p, 
        vulnerability:vuln_due_technique, enemylvl:95});
    let basic_hp_primary_only_bronya_ult = outgoing_dmg_2({scaling_attribute:stats.final_hp, 
        cr:stats.final_cr, 
        cd:stats.final_cd, 
        skill_multiplier:basic_hp_mult_primary,
        def_ignore_p:stats.defignore_p + def_ignore,
        res_shred:stats.res_ignore + res_shred,
        dmg_bonus_p:basic_dmg_p, 
        vulnerability:vuln_due_technique, enemylvl:95});
    let basic_primary_sum_only_bronya_ult = basic_atk_primary_only_bronya_ult + basic_hp_primary_only_bronya_ult;

    // changing stats to under bronya skill buff
    let bronya_skill_sig_damage_bonus = 66 + 30
    elemental_dmg = stats.final_wind + stats.damage_bonus + sup_damage_bonus + bronya_skill_sig_damage_bonus;
    a6_fua_dmg = 20;
    basic_dmg_p = elemental_dmg + stats.basicdmg_p + lc_skill_damage_bonus;
    skill_dmg_p = elemental_dmg + stats.skilldmg_p + lc_skill_damage_bonus;
    fua_dmg_p   = elemental_dmg + stats.flwupdmg_p + lc_fua_damage_bonus + a6_fua_dmg - bronya_skill_sig_damage_bonus/2; // 50% bronya skill uptime
    ult_dmg_p   = elemental_dmg + stats.ultdmg_p   + lc_ult_damage_bonus;
    let basic_atk_primary = outgoing_dmg_2({scaling_attribute:stats.final_atk, 
                                   cr:stats.final_cr, 
                                   cd:stats.final_cd, 
                                   skill_multiplier:basic_atk_mult_primary,
                                    def_ignore_p:stats.defignore_p + def_ignore,
                                    res_shred:stats.res_ignore + res_shred,
                                    dmg_bonus_p:basic_dmg_p, 
                                    vulnerability:vuln_due_technique, enemylvl:95});
    let basic_hp_primary = outgoing_dmg_2({scaling_attribute:stats.final_hp, 
                                cr:stats.final_cr, 
                                cd:stats.final_cd, 
                                skill_multiplier:basic_hp_mult_primary,
                                def_ignore_p:stats.defignore_p + def_ignore,
                                res_shred:stats.res_ignore + res_shred,
                                dmg_bonus_p:basic_dmg_p, 
                                vulnerability:vuln_due_technique, enemylvl:95});
    let basic_primary_sum = basic_atk_primary + basic_hp_primary;

   
    let fua_atk_primary = outgoing_dmg_2({scaling_attribute:stats.final_atk, 
        cr:stats.final_cr, 
        cd:stats.final_cd, 
        skill_multiplier:fua_atk_mult_primary,
         def_ignore_p:stats.defignore_p + def_ignore,
         res_shred:stats.res_ignore + res_shred,
         dmg_bonus_p:fua_dmg_p, 
         vulnerability:vuln_due_technique, enemylvl:95});
    let fua_hp_primary = outgoing_dmg_2({scaling_attribute:stats.final_hp, 
        cr:stats.final_cr, 
        cd:stats.final_cd, 
        skill_multiplier:fua_hp_mult_primary,
        def_ignore_p:stats.defignore_p + def_ignore,
        res_shred:stats.res_ignore + res_shred,
        dmg_bonus_p:fua_dmg_p, 
        vulnerability:vuln_due_technique, enemylvl:95})
    let fua_primary_sum = fua_atk_primary + fua_hp_primary;

    let ult_atk_primary = outgoing_dmg_2({scaling_attribute:stats.final_atk, 
        cr:stats.final_cr, 
        cd:stats.final_cd, 
        skill_multiplier:ult_atk_mult_primary,
         def_ignore_p:stats.defignore_p + def_ignore,
         res_shred:stats.res_ignore + res_shred,
         dmg_bonus_p:ult_dmg_p, 
         vulnerability:vuln_due_technique, enemylvl:95});
    let ult_hp_primary = outgoing_dmg_2({scaling_attribute:stats.final_hp, 
        cr:stats.final_cr, 
        cd:stats.final_cd, 
        skill_multiplier:ult_hp_mult_primary,
        def_ignore_p:stats.defignore_p + def_ignore,
        res_shred:stats.res_ignore + res_shred,
        dmg_bonus_p:ult_dmg_p, 
        vulnerability:vuln_due_technique, enemylvl:95});
    let ult_hploss_primary = outgoing_dmg_2({scaling_attribute:stats.final_hp*0.9, 
        cr:stats.final_cr, 
        cd:stats.final_cd, 
        skill_multiplier:ult_hp_mult_primary,
        def_ignore_p:stats.defignore_p + def_ignore,
        res_shred:stats.res_ignore + res_shred,
        dmg_bonus_p:ult_dmg_p, 
        vulnerability:vuln_due_technique, enemylvl:95});
    let ult_primary_sum = ult_atk_primary + ult_hp_primary + ult_hploss_primary;
    





    let score = 1 * basic_primary_sum_only_bronya_ult + 2 * basic_primary_sum + fua_primary_sum + ult_primary_sum;

    let stats_display = BuildStatsCalculatorNew({build:build,
        base_atk : total_base_atk, 
        trace_atk_p:lc_atk_p + trace_atk_p,
        base_hp:total_base_hp,
        trace_hp_p:trace_hp_p + lc_hp_p,
        trace_res_p:trace_res,
        base_spd:char_base_spd, trace_spd_f: trace_spd_f, trace_spd_p:0,
        trace_defshred : lc_def_ignore,
        trace_cr_p:lc_cr + trace_cr,
        trace_cd_p:lc_cd + trace_cd,
        trace_damage_bonus:lc_damage_bonus,
        trace_fire : trace_fire,
        count_conditionals: false,
    });
    

    let lbstats = [
        ["HP",  String(Math.floor(stats_display.final_hp))],
        ["ATK",  String(Math.floor(stats_display.final_atk))],
        ["CR",  trim_after_decimal(stats_display.final_cr) + "%"],
        ["CD", trim_after_decimal(stats_display.final_cd) + "%"],
        ["Wind",  trim_after_decimal(stats_display.final_wind)],
        ["SPD", trim_after_decimal(stats_display.final_spd)]
    ];
    
    let calcDetails = [
        ["Bronya is E0S1 w Keel, Sig, and 225 CD", ""],
        ["Bronya ULT uptime", "100%"],
        ["EBasic (Bronya Skill uptime 0%)", String(Math.floor(basic_primary_sum_only_bronya_ult))],
        ["2×EBasic (Bronya Skill uptime 100%)", String(Math.floor(2 * basic_primary_sum))],
        ["FUA  (Bronya Skill uptime 50%)", String(Math.floor(fua_primary_sum))],
        ["ULT  (Bronya Skill uptime 100%)", String(Math.floor(ult_primary_sum))],
    ];
    return [Math.floor(score), stats.final_spd, lbstats, calcDetails];

}
