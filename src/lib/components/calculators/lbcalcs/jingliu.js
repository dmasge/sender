
import * as damag from '$lib/components/calculators/damage_formulas.js';
import { BuildStatsCalculatorNew, assign_lb_to_build } from '$lib/components/calculators/build_stats_calculator_new.js';
import { lc_dict_by_id } from "$lib/components/calculators/lbcalcs/lightcones.js"


// jingliu base stats
let char_base_atk = 679.14;
let char_base_spd = 96;

export function score_jingliu(build) {
    let score = 0;
    let spd = 0;
    let lbstats = [];
    let calcDetails = [];
    let breakpoints = ["", "120.1", "133.4", "142.3", "160.1", "171.5"];

    if ("23014" == build['lc']['id']) {
        [score, spd, lbstats, calcDetails] = E0S1_23014_IShallBeMyOwnSword(build, true);
        let ctgrname = 'E0S1_' + build['lc']['id'] + "PL";
        build = assign_lb_to_build(build, ctgrname, score, lbstats, spd, breakpoints, calcDetails);
    } else if ("24000" == build['lc']['id']){
        [score, spd, lbstats, calcDetails] = E0S5_24000_OntheFallofanAeon(build, true);
        let ctgrname = 'E0S5_' + build['lc']['id'] + "PL";
        build = assign_lb_to_build(build, ctgrname, score, lbstats, spd, breakpoints, calcDetails);
    } else if ("21012" == build['lc']['id']){
        [score, spd, lbstats, calcDetails] = E0S5_21012_ASecretVow(build, true);
        let ctgrname = 'E0S5_' + build['lc']['id'] + "PL";
        build = assign_lb_to_build(build, ctgrname, score, lbstats, spd, breakpoints, calcDetails);
    } else if ("21019" == build['lc']['id']){
        [score, spd, lbstats, calcDetails] = E0S5_21019_UndertheBlueSky(build, true);
        let ctgrname = 'E0S5_' + build['lc']['id'] + "PL";
        build = assign_lb_to_build(build, ctgrname, score, lbstats, spd, breakpoints, calcDetails);
    } else if ("23002" == build['lc']['id']){
        [score, spd, lbstats, calcDetails] = E0S1_23002_SomethingIrreplaceable(build, true);
        let ctgrname = 'E0S1_' + build['lc']['id'] + "PL";
        build = assign_lb_to_build(build, ctgrname, score, lbstats, spd, breakpoints, calcDetails);
    } 

    return build;
}


function E0S1_23002_SomethingIrreplaceable(build, pela = false) {
    let lc_base_atk = lc_dict_by_id['23002']['atk'];
    let total_base_atk = char_base_atk + lc_base_atk;

    let lc_atk_p = 24;
    let lc_cd = 0;
    let lc_cr = 0;
    let lc_damage_bonus = 0;
    let lc_ult_damage_bonus = 0;
    let lc_skill_damage_bonus = 0;
    let lc_fua_damage_bonus = 0;
    let lc_def_ignore = 0;
    let trace_fire = 0;
    let trace_atk_p = 0;
    let trace_cd = 37.3;
    let trace_spd_f = 9;

    let talent_cr = 50;
    let talent_atk_f = total_base_atk * 1.8;

    
    let stats = BuildStatsCalculatorNew({
        build: build, 
        base_atk :total_base_atk,
        trace_atk_f: talent_atk_f,
        base_spd: char_base_spd,
        trace_defshred : lc_def_ignore,
        trace_spd_f : trace_spd_f,
        trace_cr_p: talent_cr + lc_cr,
        trace_cd_p: lc_cd + trace_cd,
        trace_atk_p:lc_atk_p + trace_atk_p,
        trace_damage_bonus:lc_damage_bonus,
        trace_fire : trace_fire,
        trace_spd_p:0,
    });
    let stats_after_ult_used = BuildStatsCalculatorNew({
        build: build, 
        base_atk :total_base_atk,
        trace_atk_f: talent_atk_f,
        base_spd: char_base_spd,
        trace_defshred : lc_def_ignore,
        trace_spd_f : trace_spd_f,
        trace_cr_p: talent_cr + lc_cr,
        trace_cd_p: lc_cd + trace_cd,
        trace_atk_p:lc_atk_p + trace_atk_p,
        trace_damage_bonus:lc_damage_bonus,
        trace_fire : trace_fire,
        trace_spd_p:0,
        ult_used : true,
    });
    // support stuff
    let res_shred = pela ? 12 : 0;
    let def_ignore = pela ? 56 : 0 ;
    let sup_damage_bonus = pela ? 10 : 0; 

    let elemental_dmg = stats.ice + stats.damage_bonus + sup_damage_bonus;

    let a6_ult_dmg = 20;
    let skill_dmg_p = elemental_dmg + stats.skilldmg_p + lc_skill_damage_bonus; 
    let fua_dmg_p = elemental_dmg + stats.flwupdmg_p + lc_fua_damage_bonus;
    let ult_dmg_p = elemental_dmg + stats.ultdmg_p + lc_ult_damage_bonus + a6_ult_dmg;
    // 3 targets
    let skill_atk_mult_primary = 250;
    let skill_atk_mult_adj = 0;
    let ult_atk_mult = 300;
    let fua_atk_mult = 0;
    let vuln_due_technique = 0;
    

    
    let ult = damag.outgoing_dmg_2({
        scaling_attribute: stats_after_ult_used.final_atk,
        cr: stats_after_ult_used.final_cr,
        cd: stats_after_ult_used.final_cd,
        skill_multiplier: ult_atk_mult,
        def_ignore_p: stats_after_ult_used.defignore_p + def_ignore,
        res_shred: stats_after_ult_used.res_ignore + res_shred,
        dmg_bonus_p : ult_dmg_p,
        enemylvl:90,
        vulnerability : vuln_due_technique
    }) 
    

    let skill_primary = damag.outgoing_dmg_2({
        scaling_attribute: stats.final_atk,
        cr: stats.final_cr,
        cd: stats.final_cd,
        skill_multiplier: skill_atk_mult_primary,
        def_ignore_p: stats.defignore_p + def_ignore,
        res_shred : stats.res_ignore + res_shred,
        dmg_bonus_p : skill_dmg_p,
        enemylvl:90,
        vulnerability : vuln_due_technique
    })

    let skill_primary_after_ult = damag.outgoing_dmg_2({
        scaling_attribute: stats_after_ult_used.final_atk,
        cr: stats_after_ult_used.final_cr,
        cd: stats_after_ult_used.final_cd,
        skill_multiplier: skill_atk_mult_primary,
        def_ignore_p: stats_after_ult_used.defignore_p + def_ignore,
        res_shred : stats_after_ult_used.res_ignore + res_shred,
        dmg_bonus_p : skill_dmg_p,
        enemylvl:90,
        vulnerability : vuln_due_technique
    })

    
    let score = 2 * skill_primary + skill_primary_after_ult + ult;

    let stats_display = BuildStatsCalculatorNew({
        build: build, 
        base_atk :total_base_atk,
        base_spd: char_base_spd,
        trace_spd_f : trace_spd_f,
        trace_cr_p: 0,
        trace_cd_p: lc_cd + trace_cd,
        trace_atk_p: trace_atk_p + lc_atk_p,
        trace_damage_bonus:lc_damage_bonus,
        trace_fire : trace_fire,
        trace_spd_p:0,
        count_conditionals: false,
    });


    let lbstats = [
        ["ATK",  String(Math.floor(stats_display.final_atk))],
        ["CR",  damag.trim_after_decimal(stats_display.final_cr) + "%"],
        ["CD", damag.trim_after_decimal(stats_display.final_cd) + "%"],
        ["Ice",  damag.trim_after_decimal(stats_display.ice)],
        ["SPD", damag.trim_after_decimal(stats_display.final_spd)]
    ];
    let calcDetails = [
        ["E6S5 Penacony Pearls Pela in team", ""],
        ["Targets", "1"],
        ["Enemy weakness", "Ice"],
        ["Enhanced Skill", String(Math.floor(skill_primary))],
        ["ULT", String(Math.floor(ult))],
        ["Enhanced Skill (After ult)", String(Math.floor(skill_primary_after_ult))],
        // ["SPD After 2 Skill", damag.trim_after_decimal(0)],
    ];
    return [Math.floor(score), stats.final_spd, lbstats, calcDetails];

}

function E0S5_21019_UndertheBlueSky(build, pela = false) {
    let lc_base_atk = lc_dict_by_id['21019']['atk'];
    let total_base_atk = char_base_atk + lc_base_atk;

    let lc_atk_p = 32;
    let lc_cd = 0;
    let lc_cr = 24;
    let lc_damage_bonus = 0;
    let lc_ult_damage_bonus = 0;
    let lc_skill_damage_bonus = 0;
    let lc_fua_damage_bonus = 0;
    let lc_def_ignore = 0;
    let trace_fire = 0;
    let trace_atk_p = 0;
    let trace_cd = 37.3;
    let trace_spd_f = 9;

    let talent_cr = 50;
    let talent_atk_f = total_base_atk * 1.8;

    
    let stats = BuildStatsCalculatorNew({
        build: build, 
        base_atk :total_base_atk,
        trace_atk_f: talent_atk_f,
        base_spd: char_base_spd,
        trace_defshred : lc_def_ignore,
        trace_spd_f : trace_spd_f,
        trace_cr_p: talent_cr + lc_cr,
        trace_cd_p: lc_cd + trace_cd,
        trace_atk_p:lc_atk_p + trace_atk_p,
        trace_damage_bonus:lc_damage_bonus,
        trace_fire : trace_fire,
        trace_spd_p:0,
    });
    let stats_after_ult_used = BuildStatsCalculatorNew({
        build: build, 
        base_atk :total_base_atk,
        trace_atk_f: talent_atk_f,
        base_spd: char_base_spd,
        trace_defshred : lc_def_ignore,
        trace_spd_f : trace_spd_f,
        trace_cr_p: talent_cr + lc_cr,
        trace_cd_p: lc_cd + trace_cd,
        trace_atk_p:lc_atk_p + trace_atk_p,
        trace_damage_bonus:lc_damage_bonus,
        trace_fire : trace_fire,
        trace_spd_p:0,
        ult_used : true,
    });
    // support stuff
    let res_shred = pela ? 12 : 0;
    let def_ignore = pela ? 56 : 0 ;
    let sup_damage_bonus = pela ? 10 : 0; 

    let elemental_dmg = stats.ice + stats.damage_bonus + sup_damage_bonus;

    let a6_ult_dmg = 20;
    let skill_dmg_p = elemental_dmg + stats.skilldmg_p + lc_skill_damage_bonus; 
    let fua_dmg_p = elemental_dmg + stats.flwupdmg_p + lc_fua_damage_bonus;
    let ult_dmg_p = elemental_dmg + stats.ultdmg_p + lc_ult_damage_bonus + a6_ult_dmg;
    // 3 targets
    let skill_atk_mult_primary = 250;
    let skill_atk_mult_adj = 0;
    let ult_atk_mult = 300;
    let fua_atk_mult = 0;
    let vuln_due_technique = 0;
    

    
    let ult = damag.outgoing_dmg_2({
        scaling_attribute: stats_after_ult_used.final_atk,
        cr: stats_after_ult_used.final_cr,
        cd: stats_after_ult_used.final_cd,
        skill_multiplier: ult_atk_mult,
        def_ignore_p: stats_after_ult_used.defignore_p + def_ignore,
        res_shred: stats_after_ult_used.res_ignore + res_shred,
        dmg_bonus_p : ult_dmg_p,
        enemylvl:90,
        vulnerability : vuln_due_technique
    }) 
    

    let skill_primary = damag.outgoing_dmg_2({
        scaling_attribute: stats.final_atk,
        cr: stats.final_cr,
        cd: stats.final_cd,
        skill_multiplier: skill_atk_mult_primary,
        def_ignore_p: stats.defignore_p + def_ignore,
        res_shred : stats.res_ignore + res_shred,
        dmg_bonus_p : skill_dmg_p,
        enemylvl:90,
        vulnerability : vuln_due_technique
    })

    let skill_primary_after_ult = damag.outgoing_dmg_2({
        scaling_attribute: stats_after_ult_used.final_atk,
        cr: stats_after_ult_used.final_cr,
        cd: stats_after_ult_used.final_cd,
        skill_multiplier: skill_atk_mult_primary,
        def_ignore_p: stats_after_ult_used.defignore_p + def_ignore,
        res_shred : stats_after_ult_used.res_ignore + res_shred,
        dmg_bonus_p : skill_dmg_p,
        enemylvl:90,
        vulnerability : vuln_due_technique
    })

    
    let score = 2 * skill_primary + skill_primary_after_ult + ult;

    let stats_display = BuildStatsCalculatorNew({
        build: build, 
        base_atk :total_base_atk,
        base_spd: char_base_spd,
        trace_spd_f : trace_spd_f,
        trace_cr_p: 0,
        trace_cd_p: lc_cd + trace_cd,
        trace_atk_p: trace_atk_p + lc_atk_p,
        trace_damage_bonus:lc_damage_bonus,
        trace_fire : trace_fire,
        trace_spd_p:0,
        count_conditionals: false,
    });


    let lbstats = [
        ["ATK",  String(Math.floor(stats_display.final_atk))],
        ["CR",  damag.trim_after_decimal(stats_display.final_cr) + "%"],
        ["CD", damag.trim_after_decimal(stats_display.final_cd) + "%"],
        ["Ice",  damag.trim_after_decimal(stats_display.ice)],
        ["SPD", damag.trim_after_decimal(stats_display.final_spd)]
    ];
    let calcDetails = [
        ["E6S5 Penacony Pearls Pela in team", ""],
        ["Targets", "1"],
        ["Enemy weakness", "Ice"],
        ["Enhanced Skill", String(Math.floor(skill_primary))],
        ["ULT", String(Math.floor(ult))],
        ["Enhanced Skill (After ult)", String(Math.floor(skill_primary_after_ult))],
        // ["SPD After 2 Skill", damag.trim_after_decimal(0)],
    ];
    return [Math.floor(score), stats.final_spd, lbstats, calcDetails];

}


function E0S5_21012_ASecretVow(build, pela = false) {
    let lc_base_atk = lc_dict_by_id['21012']['atk'];
    let total_base_atk = char_base_atk + lc_base_atk;

    let lc_atk_p = 0;
    let lc_cd = 0;
    let lc_damage_bonus = 40; 
    let lc_ult_damage_bonus = 0;
    let lc_skill_damage_bonus = 0;
    let lc_fua_damage_bonus = 0;
    let lc_def_ignore = 0;
    let trace_fire = 0;
    let trace_atk_p = 0;
    let trace_cd = 37.3;
    let trace_spd_f = 9;

    let talent_cr = 50;
    let talent_atk_f = total_base_atk * 1.8;

    
    let stats = BuildStatsCalculatorNew({
        build: build, 
        base_atk :total_base_atk,
        trace_atk_f: talent_atk_f,
        base_spd: char_base_spd,
        trace_defshred : lc_def_ignore,
        trace_spd_f : trace_spd_f,
        trace_cr_p: talent_cr,
        trace_cd_p: lc_cd + trace_cd,
        trace_atk_p:lc_atk_p + trace_atk_p,
        trace_damage_bonus:lc_damage_bonus,
        trace_fire : trace_fire,
        trace_spd_p:0,
    });
    let stats_after_ult_used = BuildStatsCalculatorNew({
        build: build, 
        base_atk :total_base_atk,
        trace_atk_f: talent_atk_f,
        base_spd: char_base_spd,
        trace_defshred : lc_def_ignore,
        trace_spd_f : trace_spd_f,
        trace_cr_p: talent_cr,
        trace_cd_p: lc_cd + trace_cd,
        trace_atk_p:lc_atk_p + trace_atk_p,
        trace_damage_bonus:lc_damage_bonus,
        trace_fire : trace_fire,
        trace_spd_p:0,
        ult_used : true,
    });
    // support stuff
    let res_shred = pela ? 12 : 0;
    let def_ignore = pela ? 56 : 0 ;
    let sup_damage_bonus = pela ? 10 : 0; 

    let elemental_dmg = stats.ice + stats.damage_bonus + sup_damage_bonus;

    let a6_ult_dmg = 20;
    let skill_dmg_p = elemental_dmg + stats.skilldmg_p + lc_skill_damage_bonus; 
    let fua_dmg_p = elemental_dmg + stats.flwupdmg_p + lc_fua_damage_bonus;
    let ult_dmg_p = elemental_dmg + stats.ultdmg_p + lc_ult_damage_bonus + a6_ult_dmg;
    // 3 targets
    let skill_atk_mult_primary = 250;
    let skill_atk_mult_adj = 0;
    let ult_atk_mult = 300;
    let fua_atk_mult = 0;
    let vuln_due_technique = 0;
    

    
    let ult = damag.outgoing_dmg_2({
        scaling_attribute: stats_after_ult_used.final_atk,
        cr: stats_after_ult_used.final_cr,
        cd: stats_after_ult_used.final_cd,
        skill_multiplier: ult_atk_mult,
        def_ignore_p: stats_after_ult_used.defignore_p + def_ignore,
        res_shred: stats_after_ult_used.res_ignore + res_shred,
        dmg_bonus_p : ult_dmg_p,
        enemylvl:90,
        vulnerability : vuln_due_technique
    }) 
    

    let skill_primary = damag.outgoing_dmg_2({
        scaling_attribute: stats.final_atk,
        cr: stats.final_cr,
        cd: stats.final_cd,
        skill_multiplier: skill_atk_mult_primary,
        def_ignore_p: stats.defignore_p + def_ignore,
        res_shred : stats.res_ignore + res_shred,
        dmg_bonus_p : skill_dmg_p,
        enemylvl:90,
        vulnerability : vuln_due_technique
    })

    let skill_primary_after_ult = damag.outgoing_dmg_2({
        scaling_attribute: stats_after_ult_used.final_atk,
        cr: stats_after_ult_used.final_cr,
        cd: stats_after_ult_used.final_cd,
        skill_multiplier: skill_atk_mult_primary,
        def_ignore_p: stats_after_ult_used.defignore_p + def_ignore,
        res_shred : stats_after_ult_used.res_ignore + res_shred,
        dmg_bonus_p : skill_dmg_p,
        enemylvl:90,
        vulnerability : vuln_due_technique
    })

    
    let score = 2 * skill_primary + skill_primary_after_ult + ult;

    let stats_display = BuildStatsCalculatorNew({
        build: build, 
        base_atk :total_base_atk,
        base_spd: char_base_spd,
        trace_spd_f : trace_spd_f,
        trace_cr_p: 0,
        trace_cd_p: lc_cd + trace_cd,
        trace_atk_p: trace_atk_p,
        trace_damage_bonus:lc_damage_bonus,
        trace_fire : trace_fire,
        trace_spd_p:0,
        count_conditionals: false,
    });


    let lbstats = [
        ["ATK",  String(Math.floor(stats_display.final_atk))],
        ["CR",  damag.trim_after_decimal(stats_display.final_cr) + "%"],
        ["CD", damag.trim_after_decimal(stats_display.final_cd) + "%"],
        ["Ice",  damag.trim_after_decimal(stats_display.ice)],
        ["SPD", damag.trim_after_decimal(stats_display.final_spd)]
    ];
    let calcDetails = [
        ["E6S5 Penacony Pearls Pela in team", ""],
        ["Targets", "1"],
        ["Enemy weakness", "Ice"],
        ["Enhanced Skill", String(Math.floor(skill_primary))],
        ["ULT", String(Math.floor(ult))],
        ["Enhanced Skill (After ult)", String(Math.floor(skill_primary_after_ult))],
        // ["SPD After 2 Skill", damag.trim_after_decimal(0)],
    ];
    return [Math.floor(score), stats.final_spd, lbstats, calcDetails];

}


function E0S5_24000_OntheFallofanAeon(build, pela = false) {
    let lc_base_atk = lc_dict_by_id['24000']['atk'];
    let total_base_atk = char_base_atk + lc_base_atk;

    let lc_atk_p = 64;
    let lc_cd = 0;
    let lc_damage_bonus = 24 * 3/4; // 3/4 uptime
    let lc_ult_damage_bonus = 0;
    let lc_skill_damage_bonus = 0;
    let lc_fua_damage_bonus = 0;
    let lc_def_ignore = 0;
    let trace_fire = 0;
    let trace_atk_p = 0;
    let trace_cd = 37.3;
    let trace_spd_f = 9;

    let talent_cr = 50;
    let talent_atk_f = total_base_atk * 1.8;

    
    let stats = BuildStatsCalculatorNew({
        build: build, 
        base_atk :total_base_atk,
        trace_atk_f: talent_atk_f,
        base_spd: char_base_spd,
        trace_defshred : lc_def_ignore,
        trace_spd_f : trace_spd_f,
        trace_cr_p: talent_cr,
        trace_cd_p: lc_cd + trace_cd,
        trace_atk_p:lc_atk_p + trace_atk_p,
        trace_damage_bonus:lc_damage_bonus,
        trace_fire : trace_fire,
        trace_spd_p:0,
    });
    let stats_after_ult_used = BuildStatsCalculatorNew({
        build: build, 
        base_atk :total_base_atk,
        trace_atk_f: talent_atk_f,
        base_spd: char_base_spd,
        trace_defshred : lc_def_ignore,
        trace_spd_f : trace_spd_f,
        trace_cr_p: talent_cr,
        trace_cd_p: lc_cd + trace_cd,
        trace_atk_p:lc_atk_p + trace_atk_p,
        trace_damage_bonus:lc_damage_bonus,
        trace_fire : trace_fire,
        trace_spd_p:0,
        ult_used : true,
    });
    // support stuff
    let res_shred = pela ? 12 : 0;
    let def_ignore = pela ? 56 : 0 ;
    let sup_damage_bonus = pela ? 10 : 0; 

    let elemental_dmg = stats.ice + stats.damage_bonus + sup_damage_bonus;

    let a6_ult_dmg = 20;
    let skill_dmg_p = elemental_dmg + stats.skilldmg_p + lc_skill_damage_bonus; 
    let fua_dmg_p = elemental_dmg + stats.flwupdmg_p + lc_fua_damage_bonus;
    let ult_dmg_p = elemental_dmg + stats.ultdmg_p + lc_ult_damage_bonus + a6_ult_dmg;
    // 3 targets
    let skill_atk_mult_primary = 250;
    let skill_atk_mult_adj = 0;
    let ult_atk_mult = 300;
    let fua_atk_mult = 0;
    let vuln_due_technique = 0;
    

    
    let ult = damag.outgoing_dmg_2({
        scaling_attribute: stats_after_ult_used.final_atk,
        cr: stats_after_ult_used.final_cr,
        cd: stats_after_ult_used.final_cd,
        skill_multiplier: ult_atk_mult,
        def_ignore_p: stats_after_ult_used.defignore_p + def_ignore,
        res_shred: stats_after_ult_used.res_ignore + res_shred,
        dmg_bonus_p : ult_dmg_p,
        enemylvl:90,
        vulnerability : vuln_due_technique
    }) 
    

    let skill_primary = damag.outgoing_dmg_2({
        scaling_attribute: stats.final_atk,
        cr: stats.final_cr,
        cd: stats.final_cd,
        skill_multiplier: skill_atk_mult_primary,
        def_ignore_p: stats.defignore_p + def_ignore,
        res_shred : stats.res_ignore + res_shred,
        dmg_bonus_p : skill_dmg_p,
        enemylvl:90,
        vulnerability : vuln_due_technique
    })

    let skill_primary_after_ult = damag.outgoing_dmg_2({
        scaling_attribute: stats_after_ult_used.final_atk,
        cr: stats_after_ult_used.final_cr,
        cd: stats_after_ult_used.final_cd,
        skill_multiplier: skill_atk_mult_primary,
        def_ignore_p: stats_after_ult_used.defignore_p + def_ignore,
        res_shred : stats_after_ult_used.res_ignore + res_shred,
        dmg_bonus_p : skill_dmg_p,
        enemylvl:90,
        vulnerability : vuln_due_technique
    })

    
    let score = 2 * skill_primary + skill_primary_after_ult + ult;

    let stats_display = BuildStatsCalculatorNew({
        build: build, 
        base_atk :total_base_atk,
        base_spd: char_base_spd,
        trace_spd_f : trace_spd_f,
        trace_cr_p: 0,
        trace_cd_p: lc_cd + trace_cd,
        trace_atk_p: trace_atk_p,
        trace_damage_bonus:lc_damage_bonus,
        trace_fire : trace_fire,
        trace_spd_p:0,
        count_conditionals: false,
    });


    let lbstats = [
        ["ATK",  String(Math.floor(stats_display.final_atk))],
        ["CR",  damag.trim_after_decimal(stats_display.final_cr) + "%"],
        ["CD", damag.trim_after_decimal(stats_display.final_cd) + "%"],
        ["Ice",  damag.trim_after_decimal(stats_display.ice)],
        ["SPD", damag.trim_after_decimal(stats_display.final_spd)]
    ];
    let calcDetails = [
        ["E6S5 Penacony Pearls Pela in team", ""],
        ["Targets", "1"],
        ["Enemy weakness", "Ice"],
        ["Enhanced Skill", String(Math.floor(skill_primary))],
        ["ULT", String(Math.floor(ult))],
        ["Enhanced Skill (After ult)", String(Math.floor(skill_primary_after_ult))],
        // ["SPD After 2 Skill", damag.trim_after_decimal(0)],
    ];
    return [Math.floor(score), stats.final_spd, lbstats, calcDetails];

}

function E0S1_23014_IShallBeMyOwnSword(build, pela = false) {
    let lc_base_atk = lc_dict_by_id['23014']['atk'];
    let total_base_atk = char_base_atk + lc_base_atk;

    let lc_atk_p = 0;
    let lc_cd = 20;
    let lc_damage_bonus = 42;
    let lc_ult_damage_bonus = 0;
    let lc_skill_damage_bonus = 0;
    let lc_fua_damage_bonus = 0;
    let lc_def_ignore = 12;
    let trace_fire = 0;
    let trace_atk_p = 0;
    let trace_cd = 37.3;
    let trace_spd_f = 9;

    let talent_cr = 50;
    let talent_atk_f = total_base_atk * 1.8;

    
    let stats = BuildStatsCalculatorNew({
        build: build, 
        base_atk :total_base_atk,
        trace_atk_f: talent_atk_f,
        base_spd: char_base_spd,
        trace_defshred : lc_def_ignore,
        trace_spd_f : trace_spd_f,
        trace_cr_p: talent_cr,
        trace_cd_p: lc_cd + trace_cd,
        trace_atk_p:lc_atk_p + trace_atk_p,
        trace_damage_bonus:lc_damage_bonus,
        trace_fire : trace_fire,
        trace_spd_p:0,
    });
    let stats_after_ult_used = BuildStatsCalculatorNew({
        build: build, 
        base_atk :total_base_atk,
        trace_atk_f: talent_atk_f,
        base_spd: char_base_spd,
        trace_defshred : lc_def_ignore,
        trace_spd_f : trace_spd_f,
        trace_cr_p: talent_cr,
        trace_cd_p: lc_cd + trace_cd,
        trace_atk_p:lc_atk_p + trace_atk_p,
        trace_damage_bonus:lc_damage_bonus,
        trace_fire : trace_fire,
        trace_spd_p:0,
        ult_used : true,
    });
    // support stuff
    let res_shred = pela ? 12 : 0;
    let def_ignore = pela ? 56 : 0 ;
    let sup_damage_bonus = pela ? 10 : 0; 

    let elemental_dmg = stats.ice + stats.damage_bonus + sup_damage_bonus;

    let a6_ult_dmg = 20;
    let skill_dmg_p = elemental_dmg + stats.skilldmg_p + lc_skill_damage_bonus; 
    let fua_dmg_p = elemental_dmg + stats.flwupdmg_p + lc_fua_damage_bonus;
    let ult_dmg_p = elemental_dmg + stats.ultdmg_p + lc_ult_damage_bonus + a6_ult_dmg;
    // 3 targets
    let skill_atk_mult_primary = 250;
    let skill_atk_mult_adj = 0;
    let ult_atk_mult = 300;
    let fua_atk_mult = 0;
    let vuln_due_technique = 0;
    

    
    let ult = damag.outgoing_dmg_2({
        scaling_attribute: stats_after_ult_used.final_atk,
        cr: stats_after_ult_used.final_cr,
        cd: stats_after_ult_used.final_cd,
        skill_multiplier: ult_atk_mult,
        def_ignore_p: stats_after_ult_used.defignore_p + def_ignore,
        res_shred: stats_after_ult_used.res_ignore + res_shred,
        dmg_bonus_p : ult_dmg_p,
        enemylvl:90,
        vulnerability : vuln_due_technique
    }) 
    

    let skill_primary = damag.outgoing_dmg_2({
        scaling_attribute: stats.final_atk,
        cr: stats.final_cr,
        cd: stats.final_cd,
        skill_multiplier: skill_atk_mult_primary,
        def_ignore_p: stats.defignore_p + def_ignore,
        res_shred : stats.res_ignore + res_shred,
        dmg_bonus_p : skill_dmg_p,
        enemylvl:90,
        vulnerability : vuln_due_technique
    })

    let skill_primary_after_ult = damag.outgoing_dmg_2({
        scaling_attribute: stats_after_ult_used.final_atk,
        cr: stats_after_ult_used.final_cr,
        cd: stats_after_ult_used.final_cd,
        skill_multiplier: skill_atk_mult_primary,
        def_ignore_p: stats_after_ult_used.defignore_p + def_ignore,
        res_shred : stats_after_ult_used.res_ignore + res_shred,
        dmg_bonus_p : skill_dmg_p,
        enemylvl:90,
        vulnerability : vuln_due_technique
    })

    
    let score = 2 * skill_primary + skill_primary_after_ult + ult;

    let stats_display = BuildStatsCalculatorNew({
        build: build, 
        base_atk :total_base_atk,
        base_spd: char_base_spd,
        trace_spd_f : trace_spd_f,
        trace_cr_p: 0,
        trace_cd_p: lc_cd + trace_cd,
        trace_atk_p:lc_atk_p + trace_atk_p,
        trace_damage_bonus:lc_damage_bonus,
        trace_fire : trace_fire,
        trace_spd_p:0,
        count_conditionals: false,
    });


    let lbstats = [
        ["ATK",  String(Math.floor(stats_display.final_atk))],
        ["CR",  damag.trim_after_decimal(stats_display.final_cr) + "%"],
        ["CD", damag.trim_after_decimal(stats_display.final_cd) + "%"],
        ["Ice",  damag.trim_after_decimal(stats_display.ice)],
        ["SPD", damag.trim_after_decimal(stats_display.final_spd)]
    ];
    let calcDetails = [
        ["E6S5 Penacony Pearls Pela in team", ""],
        ["Targets", "1"],
        ["Enemy weakness", "Ice"],
        ["Enhanced Skill", String(Math.floor(skill_primary))],
        ["ULT", String(Math.floor(ult))],
        ["Enhanced Skill (After ult)", String(Math.floor(skill_primary_after_ult))],
        // ["SPD After 2 Skill", damag.trim_after_decimal(0)],
    ];
    return [Math.floor(score), stats.final_spd, lbstats, calcDetails];

}