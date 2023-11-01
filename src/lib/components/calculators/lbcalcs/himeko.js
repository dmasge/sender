
import * as damag from '$lib/components/calculators/damage_formulas.js';
import { BuildStatsCalculatorNew, assign_lb_to_build } from '$lib/components/calculators/build_stats_calculator_new.js';
import { lc_dict_by_id } from "$lib/components/calculators/lbcalcs/lightcones.js"


// seele base stats
let char_base_atk = 756.756;
let char_base_spd = 96;

export function score_himeko(build) {
    let score = 0;
    let spd = 0;
    let lbstats = [];
    let calcDetails = [];
    let breakpoints = ["", "120.1", "133.4", "142.3"];

    if ("21027" == build['lc']['id']) {
        [score, spd, lbstats, calcDetails] = E0S5_21027_TheSeriousnessofBreakfast(build);
        let ctgrname = 'E0S5_' + build['lc']['id'];
        build = assign_lb_to_build(build, ctgrname, score, lbstats, spd, breakpoints, calcDetails);
    } else if ("23000" == build['lc']['id']) {
        [score, spd, lbstats, calcDetails] = E0S1_23000_NightontheMilkyWay(build);
        let ctgrname = 'E0S1_' + build['lc']['id'];
        build = assign_lb_to_build(build, ctgrname, score, lbstats, spd, breakpoints, calcDetails);
    } else if ("21013" == build['lc']['id']) {
        [score, spd, lbstats, calcDetails] = E0S5_21013_MaketheWorldClamor(build);
        let ctgrname = 'E0S5_' + build['lc']['id'];
        build = assign_lb_to_build(build, ctgrname, score, lbstats, spd, breakpoints, calcDetails);
    } else if ("21020" == build['lc']['id']) {
        [score, spd, lbstats, calcDetails] = E0S5_21020_GeniusesRepose(build);
        let ctgrname = 'E0S5_' + build['lc']['id'];
        build = assign_lb_to_build(build, ctgrname, score, lbstats, spd, breakpoints, calcDetails);
    } else if ("21006" == build['lc']['id']) {
        [score, spd, lbstats, calcDetails] = E0S5_21006_TheBirthoftheSelf(build);
        let ctgrname = 'E0S5_' + build['lc']['id'];
        build = assign_lb_to_build(build, ctgrname, score, lbstats, spd, breakpoints, calcDetails);
    } else if ("23010" == build['lc']['id']) {
        [score, spd, lbstats, calcDetails] = E0S1_23010_BeforeDawn(build);
        let ctgrname = 'E0S1_' + build['lc']['id'];
        build = assign_lb_to_build(build, ctgrname, score, lbstats, spd, breakpoints, calcDetails);
    } else if ("21034" == build['lc']['id']) {
        [score, spd, lbstats, calcDetails] = E0S5_21034_TodayIsAnotherPeacefulDay(build);
        let ctgrname = 'E0S5_' + build['lc']['id'];
        build = assign_lb_to_build(build, ctgrname, score, lbstats, spd, breakpoints, calcDetails);
    } 

    return build;
}



function E0S5_21034_TodayIsAnotherPeacefulDay(build,) {
    let lc_base_atk = lc_dict_by_id['21034']['atk'];

    let total_base_atk = char_base_atk + lc_base_atk;

    let lc_atk_p = 0;
    let lc_cd = 0;
    let lc_damage_bonus = 48;
    let lc_ult_damage_bonus = 0;
    let lc_skill_damage_bonus = 0;
    let lc_fua_damage_bonus = 0;
    let trace_fire = 22.4;
    let trace_atk_p = 18;

    let a6_cr = 15; // shows up in combat only and can activate sets
    let stats = BuildStatsCalculatorNew({
        build: build, 
        base_atk :total_base_atk,
        base_spd: char_base_spd,
        trace_cr_p: a6_cr,
        trace_cd_p: lc_cd,
        trace_atk_p:lc_atk_p + trace_atk_p,
        trace_damage_bonus:lc_damage_bonus,
        trace_fire : trace_fire,
        trace_spd_p:0,
    });
    
    let elemental_dmg = stats.fire + stats.damage_bonus;

    let a4 = 20; // damage bonus to skill
    let skill_dmg_p = elemental_dmg + stats.skilldmg_p + a4 + lc_skill_damage_bonus; 
    let fua_dmg_p = elemental_dmg + stats.flwupdmg_p + lc_fua_damage_bonus;
    let ult_dmg_p = elemental_dmg + stats.ultdmg_p + lc_ult_damage_bonus;
    // 3 targets
    let skill_atk_mult_primary = 200;
    let skill_atk_mult_adj = 80;
    let ult_atk_mult = 230;
    let fua_atk_mult = 140;
    let vuln_due_technique = 10;
    

    let fua = damag.outgoing_dmg_2({
        scaling_attribute: stats.final_atk,
        cr: stats.final_cr,
        cd: stats.final_cd,
        skill_multiplier: fua_atk_mult,
        def_ignore_p: stats.defignore_p,
        dmg_bonus_p : fua_dmg_p,
        res_shred : 0,
        enemylvl:90,
        vulnerability : vuln_due_technique
    });

    
    let ult = damag.outgoing_dmg_2({
        scaling_attribute: stats.final_atk,
        cr: stats.final_cr,
        cd: stats.final_cd,
        skill_multiplier: ult_atk_mult,
        def_ignore_p: stats.defignore_p,
        dmg_bonus_p : ult_dmg_p,
        res_shred : 0,
        enemylvl:90,
        vulnerability : vuln_due_technique
    })

    let skill_primary = damag.outgoing_dmg_2({
        scaling_attribute: stats.final_atk,
        cr: stats.final_cr,
        cd: stats.final_cd,
        skill_multiplier: skill_atk_mult_primary,
        def_ignore_p: stats.defignore_p,
        dmg_bonus_p : skill_dmg_p,
        res_shred : 0,
        enemylvl:90,
        vulnerability : vuln_due_technique
    })

    let skill_adj = damag.outgoing_dmg_2({
        scaling_attribute: stats.final_atk,
        cr: stats.final_cr,
        cd: stats.final_cd,
        skill_multiplier: skill_atk_mult_adj,
        def_ignore_p: stats.defignore_p,
        dmg_bonus_p : skill_dmg_p,
        res_shred : 0,
        enemylvl:90,
        vulnerability : vuln_due_technique
    })

    let score = 2 * (3 * fua) + 3 * ult + 3 * (2 * skill_adj) + 3 * skill_primary;

    let stats_display = BuildStatsCalculatorNew({
        build: build, 
        base_atk :total_base_atk,
        base_spd: char_base_spd,
        trace_cr_p: 0,
        trace_cd_p: lc_cd,
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
        ["Fire",  damag.trim_after_decimal(stats_display.fire)],
        ["SPD", damag.trim_after_decimal(stats_display.final_spd)]
    ];
    let calcDetails = [
        ["Targets", "3"],
        ["Fua (st)", String(Math.floor(fua))],
        ["ULT (st)", String(Math.floor(ult))],
        ["Skill (primary)", String(Math.floor(skill_primary))],
        ["Skill (adj)", String(Math.floor(skill_adj))],
        // ["SPD After 2 Skill", damag.trim_after_decimal(0)],
    ];
    return [Math.floor(score), stats.final_spd, lbstats, calcDetails];

}


function E0S1_23010_BeforeDawn(build,) {
    let lc_base_atk = lc_dict_by_id['23010']['atk'];

    let total_base_atk = char_base_atk + lc_base_atk;

    let lc_atk_p = 0;
    let lc_cd = 36;
    let lc_damage_bonus = 0;
    let lc_ult_damage_bonus = 18;
    let lc_skill_damage_bonus = 18;
    let lc_fua_damage_bonus = 48;
    let trace_fire = 22.4;
    let trace_atk_p = 18;

    let a6_cr = 15; // shows up in combat only and can activate sets
    let stats = BuildStatsCalculatorNew({
        build: build, 
        base_atk :total_base_atk,
        base_spd: char_base_spd,
        trace_cr_p: a6_cr,
        trace_cd_p: lc_cd,
        trace_atk_p:lc_atk_p + trace_atk_p,
        trace_damage_bonus:lc_damage_bonus,
        trace_fire : trace_fire,
        trace_spd_p:0,
    });
    
    let elemental_dmg = stats.fire + stats.damage_bonus;

    let a4 = 20; // damage bonus to skill
    let skill_dmg_p = elemental_dmg + stats.skilldmg_p + a4 + lc_skill_damage_bonus; 
    let fua_dmg_p = elemental_dmg + stats.flwupdmg_p + lc_fua_damage_bonus;
    let ult_dmg_p = elemental_dmg + stats.ultdmg_p + lc_ult_damage_bonus;
    // 3 targets
    let skill_atk_mult_primary = 200;
    let skill_atk_mult_adj = 80;
    let ult_atk_mult = 230;
    let fua_atk_mult = 140;
    let vuln_due_technique = 10;
    

    let fua = damag.outgoing_dmg_2({
        scaling_attribute: stats.final_atk,
        cr: stats.final_cr,
        cd: stats.final_cd,
        skill_multiplier: fua_atk_mult,
        def_ignore_p: stats.defignore_p,
        dmg_bonus_p : fua_dmg_p,
        res_shred : 0,
        enemylvl:90,
        vulnerability : vuln_due_technique
    });

    
    let ult = damag.outgoing_dmg_2({
        scaling_attribute: stats.final_atk,
        cr: stats.final_cr,
        cd: stats.final_cd,
        skill_multiplier: ult_atk_mult,
        def_ignore_p: stats.defignore_p,
        dmg_bonus_p : ult_dmg_p,
        res_shred : 0,
        enemylvl:90,
        vulnerability : vuln_due_technique
    })

    let skill_primary = damag.outgoing_dmg_2({
        scaling_attribute: stats.final_atk,
        cr: stats.final_cr,
        cd: stats.final_cd,
        skill_multiplier: skill_atk_mult_primary,
        def_ignore_p: stats.defignore_p,
        dmg_bonus_p : skill_dmg_p,
        res_shred : 0,
        enemylvl:90,
        vulnerability : vuln_due_technique
    })

    let skill_adj = damag.outgoing_dmg_2({
        scaling_attribute: stats.final_atk,
        cr: stats.final_cr,
        cd: stats.final_cd,
        skill_multiplier: skill_atk_mult_adj,
        def_ignore_p: stats.defignore_p,
        dmg_bonus_p : skill_dmg_p,
        res_shred : 0,
        enemylvl:90,
        vulnerability : vuln_due_technique
    })

    let score = 2 * (3 * fua) + 3 * ult + 3 * (2 * skill_adj) + 3 * skill_primary;

    let stats_display = BuildStatsCalculatorNew({
        build: build, 
        base_atk :total_base_atk,
        base_spd: char_base_spd,
        trace_cr_p: 0,
        trace_cd_p: lc_cd,
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
        ["Fire",  damag.trim_after_decimal(stats_display.fire)],
        ["SPD", damag.trim_after_decimal(stats_display.final_spd)]
    ];
    let calcDetails = [
        ["Targets", "3"],
        ["Fua (st)", String(Math.floor(fua))],
        ["ULT (st)", String(Math.floor(ult))],
        ["Skill (primary)", String(Math.floor(skill_primary))],
        ["Skill (adj)", String(Math.floor(skill_adj))],
        // ["SPD After 2 Skill", damag.trim_after_decimal(0)],
    ];
    return [Math.floor(score), stats.final_spd, lbstats, calcDetails];

}


function E0S5_21006_TheBirthoftheSelf(build,) {
    let lc_base_atk = lc_dict_by_id['21006']['atk'];

    let total_base_atk = char_base_atk + lc_base_atk;

    let lc_atk_p = 0;
    let lc_cd = 0;
    let lc_damage_bonus = 0;
    let lc_ult_damage_bonus = 0;
    let lc_fua_damage_bonus = 72;
    let trace_fire = 22.4;
    let trace_atk_p = 18;

    let a6_cr = 15; // shows up in combat only and can activate sets
    let stats = BuildStatsCalculatorNew({
        build: build, 
        base_atk :total_base_atk,
        base_spd: char_base_spd,
        trace_cr_p: a6_cr,
        trace_cd_p: lc_cd,
        trace_atk_p:lc_atk_p + trace_atk_p,
        trace_damage_bonus:lc_damage_bonus,
        trace_fire : trace_fire,
        trace_spd_p:0,
    });
    
    let elemental_dmg = stats.fire + stats.damage_bonus;

    let a4 = 20; // damage bonus to skill
    let skill_dmg_p = elemental_dmg + stats.skilldmg_p + a4; 
    let fua_dmg_p = elemental_dmg + stats.flwupdmg_p + lc_fua_damage_bonus;
    let ult_dmg_p = elemental_dmg + stats.ultdmg_p + lc_ult_damage_bonus;
    // 3 targets
    let skill_atk_mult_primary = 200;
    let skill_atk_mult_adj = 80;
    let ult_atk_mult = 230;
    let fua_atk_mult = 140;
    let vuln_due_technique = 10;
    

    let fua = damag.outgoing_dmg_2({
        scaling_attribute: stats.final_atk,
        cr: stats.final_cr,
        cd: stats.final_cd,
        skill_multiplier: fua_atk_mult,
        def_ignore_p: stats.defignore_p,
        dmg_bonus_p : fua_dmg_p,
        res_shred : 0,
        enemylvl:90,
        vulnerability : vuln_due_technique
    });

    
    let ult = damag.outgoing_dmg_2({
        scaling_attribute: stats.final_atk,
        cr: stats.final_cr,
        cd: stats.final_cd,
        skill_multiplier: ult_atk_mult,
        def_ignore_p: stats.defignore_p,
        dmg_bonus_p : ult_dmg_p,
        res_shred : 0,
        enemylvl:90,
        vulnerability : vuln_due_technique
    })

    let skill_primary = damag.outgoing_dmg_2({
        scaling_attribute: stats.final_atk,
        cr: stats.final_cr,
        cd: stats.final_cd,
        skill_multiplier: skill_atk_mult_primary,
        def_ignore_p: stats.defignore_p,
        dmg_bonus_p : skill_dmg_p,
        res_shred : 0,
        enemylvl:90,
        vulnerability : vuln_due_technique
    })

    let skill_adj = damag.outgoing_dmg_2({
        scaling_attribute: stats.final_atk,
        cr: stats.final_cr,
        cd: stats.final_cd,
        skill_multiplier: skill_atk_mult_adj,
        def_ignore_p: stats.defignore_p,
        dmg_bonus_p : skill_dmg_p,
        res_shred : 0,
        enemylvl:90,
        vulnerability : vuln_due_technique
    })

    let score = 2 * (3 * fua) + 3 * ult + 3 * (2 * skill_adj) + 3 * skill_primary;

    let stats_display = BuildStatsCalculatorNew({
        build: build, 
        base_atk :total_base_atk,
        base_spd: char_base_spd,
        trace_cr_p: 0,
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
        ["Fire",  damag.trim_after_decimal(stats_display.fire)],
        ["SPD", damag.trim_after_decimal(stats_display.final_spd)]
    ];
    let calcDetails = [
        ["Targets", "3"],
        ["Fua (st)", String(Math.floor(fua))],
        ["ULT (st)", String(Math.floor(ult))],
        ["Skill (primary)", String(Math.floor(skill_primary))],
        ["Skill (adj)", String(Math.floor(skill_adj))],
        // ["SPD After 2 Skill", damag.trim_after_decimal(0)],
    ];
    return [Math.floor(score), stats.final_spd, lbstats, calcDetails];

}

function E0S5_21020_GeniusesRepose(build,) {
    let lc_base_atk = lc_dict_by_id['21020']['atk'];

    let total_base_atk = char_base_atk + lc_base_atk;

    let lc_atk_p = 32;
    let lc_cd = 48;
    let lc_damage_bonus = 0;
    let lc_ult_damage_bonus = 0;
    let trace_fire = 22.4;
    let trace_atk_p = 18;

    let a6_cr = 15; // shows up in combat only and can activate sets
    let stats = BuildStatsCalculatorNew({
        build: build, 
        base_atk :total_base_atk,
        base_spd: char_base_spd,
        trace_cr_p: a6_cr,
        trace_cd_p: lc_cd,
        trace_atk_p:lc_atk_p + trace_atk_p,
        trace_damage_bonus:lc_damage_bonus,
        trace_fire : trace_fire,
        trace_spd_p:0,
    });
    
    let elemental_dmg = stats.fire + stats.damage_bonus;

    let a4 = 20; // damage bonus to skill
    let skill_dmg_p = elemental_dmg + stats.skilldmg_p + a4; 
    let fua_dmg_p = elemental_dmg + stats.flwupdmg_p;
    let ult_dmg_p = elemental_dmg + stats.ultdmg_p + lc_ult_damage_bonus;
    // 3 targets
    let skill_atk_mult_primary = 200;
    let skill_atk_mult_adj = 80;
    let ult_atk_mult = 230;
    let fua_atk_mult = 140;
    let vuln_due_technique = 10;
    

    let fua = damag.outgoing_dmg_2({
        scaling_attribute: stats.final_atk,
        cr: stats.final_cr,
        cd: stats.final_cd,
        skill_multiplier: fua_atk_mult,
        def_ignore_p: stats.defignore_p,
        dmg_bonus_p : fua_dmg_p,
        res_shred : 0,
        enemylvl:90,
        vulnerability : vuln_due_technique
    });

    
    let ult = damag.outgoing_dmg_2({
        scaling_attribute: stats.final_atk,
        cr: stats.final_cr,
        cd: stats.final_cd,
        skill_multiplier: ult_atk_mult,
        def_ignore_p: stats.defignore_p,
        dmg_bonus_p : ult_dmg_p,
        res_shred : 0,
        enemylvl:90,
        vulnerability : vuln_due_technique
    })

    let skill_primary = damag.outgoing_dmg_2({
        scaling_attribute: stats.final_atk,
        cr: stats.final_cr,
        cd: stats.final_cd,
        skill_multiplier: skill_atk_mult_primary,
        def_ignore_p: stats.defignore_p,
        dmg_bonus_p : skill_dmg_p,
        res_shred : 0,
        enemylvl:90,
        vulnerability : vuln_due_technique
    })

    let skill_adj = damag.outgoing_dmg_2({
        scaling_attribute: stats.final_atk,
        cr: stats.final_cr,
        cd: stats.final_cd,
        skill_multiplier: skill_atk_mult_adj,
        def_ignore_p: stats.defignore_p,
        dmg_bonus_p : skill_dmg_p,
        res_shred : 0,
        enemylvl:90,
        vulnerability : vuln_due_technique
    })

    let score = 2 * (3 * fua) + 3 * ult + 3 * (2 * skill_adj) + 3 * skill_primary;

    let stats_display = BuildStatsCalculatorNew({
        build: build, 
        base_atk :total_base_atk,
        base_spd: char_base_spd,
        trace_cr_p: 0,
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
        ["Fire",  damag.trim_after_decimal(stats_display.fire)],
        ["SPD", damag.trim_after_decimal(stats_display.final_spd)]
    ];
    let calcDetails = [
        ["Targets", "3"],
        ["Fua (st)", String(Math.floor(fua))],
        ["ULT (st)", String(Math.floor(ult))],
        ["Skill (primary)", String(Math.floor(skill_primary))],
        ["Skill (adj)", String(Math.floor(skill_adj))],
        // ["SPD After 2 Skill", damag.trim_after_decimal(0)],
    ];
    return [Math.floor(score), stats.final_spd, lbstats, calcDetails];

}

function E0S5_21013_MaketheWorldClamor(build,) {
    let lc_base_atk = lc_dict_by_id['21013']['atk'];

    let total_base_atk = char_base_atk + lc_base_atk;

    let lc_atk_p = 0;
    let lc_damage_bonus = 0;
    let lc_ult_damage_bonus = 64;
    let trace_fire = 22.4;
    let trace_atk_p = 18;

    let a6_cr = 15; // shows up in combat only and can activate sets
    let stats = BuildStatsCalculatorNew({
        build: build, 
        base_atk :total_base_atk,
        base_spd: char_base_spd,
        trace_cr_p: a6_cr,
        trace_atk_p:lc_atk_p + trace_atk_p,
        trace_damage_bonus:lc_damage_bonus,
        trace_fire : trace_fire,
        trace_spd_p:0,
    });
    
    let elemental_dmg = stats.fire + stats.damage_bonus;

    let a4 = 20; // damage bonus to skill
    let skill_dmg_p = elemental_dmg + stats.skilldmg_p + a4; 
    let fua_dmg_p = elemental_dmg + stats.flwupdmg_p;
    let ult_dmg_p = elemental_dmg + stats.ultdmg_p + lc_ult_damage_bonus;
    // 3 targets
    let skill_atk_mult_primary = 200;
    let skill_atk_mult_adj = 80;
    let ult_atk_mult = 230;
    let fua_atk_mult = 140;
    let vuln_due_technique = 10;
    

    let fua = damag.outgoing_dmg_2({
        scaling_attribute: stats.final_atk,
        cr: stats.final_cr,
        cd: stats.final_cd,
        skill_multiplier: fua_atk_mult,
        def_ignore_p: stats.defignore_p,
        dmg_bonus_p : fua_dmg_p,
        res_shred : 0,
        enemylvl:90,
        vulnerability : vuln_due_technique
    });

    
    let ult = damag.outgoing_dmg_2({
        scaling_attribute: stats.final_atk,
        cr: stats.final_cr,
        cd: stats.final_cd,
        skill_multiplier: ult_atk_mult,
        def_ignore_p: stats.defignore_p,
        dmg_bonus_p : ult_dmg_p,
        res_shred : 0,
        enemylvl:90,
        vulnerability : vuln_due_technique
    })

    let skill_primary = damag.outgoing_dmg_2({
        scaling_attribute: stats.final_atk,
        cr: stats.final_cr,
        cd: stats.final_cd,
        skill_multiplier: skill_atk_mult_primary,
        def_ignore_p: stats.defignore_p,
        dmg_bonus_p : skill_dmg_p,
        res_shred : 0,
        enemylvl:90,
        vulnerability : vuln_due_technique
    })

    let skill_adj = damag.outgoing_dmg_2({
        scaling_attribute: stats.final_atk,
        cr: stats.final_cr,
        cd: stats.final_cd,
        skill_multiplier: skill_atk_mult_adj,
        def_ignore_p: stats.defignore_p,
        dmg_bonus_p : skill_dmg_p,
        res_shred : 0,
        enemylvl:90,
        vulnerability : vuln_due_technique
    })

    let score = 2 * (3 * fua) + 3 * ult + 3 * (2 * skill_adj) + 3 * skill_primary;

    let stats_display = BuildStatsCalculatorNew({
        build: build, 
        base_atk :total_base_atk,
        base_spd: char_base_spd,
        trace_cr_p: 0,
        trace_atk_p:trace_atk_p,
        trace_damage_bonus:lc_damage_bonus,
        trace_fire : trace_fire,
        trace_spd_p:0,
        count_conditionals: false,
    });


    let lbstats = [
        ["ATK",  String(Math.floor(stats_display.final_atk))],
        ["CR",  damag.trim_after_decimal(stats_display.final_cr) + "%"],
        ["CD", damag.trim_after_decimal(stats_display.final_cd) + "%"],
        ["Fire",  damag.trim_after_decimal(stats_display.fire)],
        ["SPD", damag.trim_after_decimal(stats_display.final_spd)]
    ];
    let calcDetails = [
        ["Targets", "3"],
        ["Fua (st)", String(Math.floor(fua))],
        ["ULT (st)", String(Math.floor(ult))],
        ["Skill (primary)", String(Math.floor(skill_primary))],
        ["Skill (adj)", String(Math.floor(skill_adj))],
        // ["SPD After 2 Skill", damag.trim_after_decimal(0)],
    ];
    return [Math.floor(score), stats.final_spd, lbstats, calcDetails];

}


function E0S1_23000_NightontheMilkyWay(build,) {
    let lc_base_atk = lc_dict_by_id['23000']['atk'];

    let total_base_atk = char_base_atk + lc_base_atk;

    let lc_atk_p = 27;
    let lc_damage_bonus = 30;
    let trace_fire = 22.4;
    let trace_atk_p = 18;

    let a6_cr = 15; // shows up in combat only and can activate sets
    let stats = BuildStatsCalculatorNew({
        build: build, 
        base_atk :total_base_atk,
        base_spd: char_base_spd,
        trace_cr_p: a6_cr,
        trace_atk_p:lc_atk_p + trace_atk_p,
        trace_damage_bonus:lc_damage_bonus,
        trace_fire : trace_fire,
        trace_spd_p:0,
    });
    
    let elemental_dmg = stats.fire + stats.damage_bonus;

    let a4 = 20; // damage bonus to skill
    let skill_dmg_p = elemental_dmg + stats.skilldmg_p + a4; 
    let fua_dmg_p = elemental_dmg + stats.flwupdmg_p;
    let ult_dmg_p = elemental_dmg + stats.ultdmg_p;
    // 3 targets
    let skill_atk_mult_primary = 200;
    let skill_atk_mult_adj = 80;
    let ult_atk_mult = 230;
    let fua_atk_mult = 140;
    let vuln_due_technique = 10;
    

    let fua = damag.outgoing_dmg_2({
        scaling_attribute: stats.final_atk,
        cr: stats.final_cr,
        cd: stats.final_cd,
        skill_multiplier: fua_atk_mult,
        def_ignore_p: stats.defignore_p,
        dmg_bonus_p : fua_dmg_p,
        res_shred : 0,
        enemylvl:90,
        vulnerability : vuln_due_technique
    });

    
    let ult = damag.outgoing_dmg_2({
        scaling_attribute: stats.final_atk,
        cr: stats.final_cr,
        cd: stats.final_cd,
        skill_multiplier: ult_atk_mult,
        def_ignore_p: stats.defignore_p,
        dmg_bonus_p : ult_dmg_p,
        res_shred : 0,
        enemylvl:90,
        vulnerability : vuln_due_technique
    })

    let skill_primary = damag.outgoing_dmg_2({
        scaling_attribute: stats.final_atk,
        cr: stats.final_cr,
        cd: stats.final_cd,
        skill_multiplier: skill_atk_mult_primary,
        def_ignore_p: stats.defignore_p,
        dmg_bonus_p : skill_dmg_p,
        res_shred : 0,
        enemylvl:90,
        vulnerability : vuln_due_technique
    })

    let skill_adj = damag.outgoing_dmg_2({
        scaling_attribute: stats.final_atk,
        cr: stats.final_cr,
        cd: stats.final_cd,
        skill_multiplier: skill_atk_mult_adj,
        def_ignore_p: stats.defignore_p,
        dmg_bonus_p : skill_dmg_p,
        res_shred : 0,
        enemylvl:90,
        vulnerability : vuln_due_technique
    })

    let score = 2 * (3 * fua) + 3 * ult + 3 * (2 * skill_adj) + 3 * skill_primary;

    let stats_display = BuildStatsCalculatorNew({
        build: build, 
        base_atk :total_base_atk,
        base_spd: char_base_spd,
        trace_cr_p: 0,
        trace_atk_p:trace_atk_p,
        trace_damage_bonus:lc_damage_bonus,
        trace_fire : trace_fire,
        trace_spd_p:0,
        count_conditionals: false,
    });


    let lbstats = [
        ["ATK",  String(Math.floor(stats_display.final_atk))],
        ["CR",  damag.trim_after_decimal(stats_display.final_cr) + "%"],
        ["CD", damag.trim_after_decimal(stats_display.final_cd) + "%"],
        ["Fire",  damag.trim_after_decimal(stats_display.fire)],
        ["SPD", damag.trim_after_decimal(stats_display.final_spd)]
    ];
    let calcDetails = [
        ["Targets", "3"],
        ["Fua (st)", String(Math.floor(fua))],
        ["ULT (st)", String(Math.floor(ult))],
        ["Skill (primary)", String(Math.floor(skill_primary))],
        ["Skill (adj)", String(Math.floor(skill_adj))],
        // ["SPD After 2 Skill", damag.trim_after_decimal(0)],
    ];
    return [Math.floor(score), stats.final_spd, lbstats, calcDetails];

}


function E0S5_21027_TheSeriousnessofBreakfast(build,) {
    let lc_base_atk = lc_dict_by_id['21027']['atk'];

    let total_base_atk = char_base_atk + lc_base_atk;

    let lc_atk_p = 24;
    let lc_damage_bonus = 24;
    let trace_fire = 22.4;
    let trace_atk_p = 18;

    let a6_cr = 15; // shows up in combat only and can activate sets
    let stats = BuildStatsCalculatorNew({
        build: build, 
        base_atk :total_base_atk,
        base_spd: char_base_spd,
        trace_cr_p: a6_cr,
        trace_atk_p:lc_atk_p + trace_atk_p,
        trace_damage_bonus:lc_damage_bonus,
        trace_fire : trace_fire,
        trace_spd_p:0,
    });
    
    let elemental_dmg = stats.fire + stats.damage_bonus;

    let a4 = 20; // damage bonus to skill
    let skill_dmg_p = elemental_dmg + stats.skilldmg_p + a4; 
    let fua_dmg_p = elemental_dmg + stats.flwupdmg_p;
    let ult_dmg_p = elemental_dmg + stats.ultdmg_p;
    // 3 targets
    let skill_atk_mult_primary = 200;
    let skill_atk_mult_adj = 80;
    let ult_atk_mult = 230;
    let fua_atk_mult = 140;
    let vuln_due_technique = 10;
    

    let fua = damag.outgoing_dmg_2({
        scaling_attribute: stats.final_atk,
        cr: stats.final_cr,
        cd: stats.final_cd,
        skill_multiplier: fua_atk_mult,
        def_ignore_p: stats.defignore_p,
        dmg_bonus_p : fua_dmg_p,
        res_shred : 0,
        enemylvl:90,
        vulnerability : vuln_due_technique
    });

    
    let ult = damag.outgoing_dmg_2({
        scaling_attribute: stats.final_atk,
        cr: stats.final_cr,
        cd: stats.final_cd,
        skill_multiplier: ult_atk_mult,
        def_ignore_p: stats.defignore_p,
        dmg_bonus_p : ult_dmg_p,
        res_shred : 0,
        enemylvl:90,
        vulnerability : vuln_due_technique
    })

    let skill_primary = damag.outgoing_dmg_2({
        scaling_attribute: stats.final_atk,
        cr: stats.final_cr,
        cd: stats.final_cd,
        skill_multiplier: skill_atk_mult_primary,
        def_ignore_p: stats.defignore_p,
        dmg_bonus_p : skill_dmg_p,
        res_shred : 0,
        enemylvl:90,
        vulnerability : vuln_due_technique
    })

    let skill_adj = damag.outgoing_dmg_2({
        scaling_attribute: stats.final_atk,
        cr: stats.final_cr,
        cd: stats.final_cd,
        skill_multiplier: skill_atk_mult_adj,
        def_ignore_p: stats.defignore_p,
        dmg_bonus_p : skill_dmg_p,
        res_shred : 0,
        enemylvl:90,
        vulnerability : vuln_due_technique
    })

    let score = 2 * (3 * fua) + 3 * ult + 3 * (2 * skill_adj) + 3 * skill_primary;

    let stats_display = BuildStatsCalculatorNew({
        build: build, 
        base_atk :total_base_atk,
        base_spd: char_base_spd,
        trace_cr_p: 0,
        trace_atk_p:trace_atk_p,
        trace_damage_bonus:lc_damage_bonus,
        trace_fire : trace_fire,
        trace_spd_p:0,
        count_conditionals: false,
    });


    let lbstats = [
        ["ATK",  String(Math.floor(stats_display.final_atk))],
        ["CR",  damag.trim_after_decimal(stats_display.final_cr) + "%"],
        ["CD", damag.trim_after_decimal(stats_display.final_cd) + "%"],
        ["Fire",  damag.trim_after_decimal(stats_display.fire)],
        ["SPD", damag.trim_after_decimal(stats_display.final_spd)]
    ];
    let calcDetails = [
        ["Targets", "3"],
        ["Fua (st)", String(Math.floor(fua))],
        ["ULT (st)", String(Math.floor(ult))],
        ["Skill (primary)", String(Math.floor(skill_primary))],
        ["Skill (adj)", String(Math.floor(skill_adj))],
        // ["SPD After 2 Skill", damag.trim_after_decimal(0)],
    ];
    return [Math.floor(score), stats.final_spd, lbstats, calcDetails];

}

