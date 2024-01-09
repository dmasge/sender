import { outgoing_dmg_js, hit_prob, trim_after_decimal } from '$lib/components/calculators/damage_formulas.js';
import { BuildStatsCalculatorNew, assign_lb_to_build } from '$lib/components/calculators/build_stats_calculator_new.js';
import { lc_dict_by_id, get_itn_stack_count, sltd_eff_cr } from "$lib/components/calculators/lbcalcs/lightcones.js"


// 1209
export function score_yanqing(build, optimizationTarget) {
    let score = 0;
    let spd = 0;
    let lbstats = [];
    let calcDetails = [];
    let breakpoints = ["", "123.5", "133.34", "142.9", "160.1", "171.5"];


    if ("21010" == build['lc']['id']) {
        [score, spd, lbstats, calcDetails] = E0S5_21010_Swordplay(build);
        let ctgrname = 'E0S5_' + build['lc']['id'] + "TYPL";
        build = assign_lb_to_build(build, ctgrname, score, lbstats, spd, breakpoints, calcDetails);
    } else if ("21024" == build['lc']['id']) {
        breakpoints = ["", "142.9", "160.1", "171.5"];
        [score, spd, lbstats, calcDetails] = E0S5_21024_RiverFlowsinSpring(build);
        let ctgrname = 'E0S5_' + build['lc']['id'] + "TYPL";
        build = assign_lb_to_build(build, ctgrname, score, lbstats, spd, breakpoints, calcDetails);
    } else if ("23001" == build['lc']['id']) {
        [score, spd, lbstats, calcDetails] = E0S1_23001_IntheNight(build);
        let ctgrname = 'E0S1_' + build['lc']['id'] + "TYPL";
        build = assign_lb_to_build(build, ctgrname, score, lbstats, spd, breakpoints, calcDetails);
    } else if ("23012" == build['lc']['id']) {
        [score, spd, lbstats, calcDetails] = E0S1_23012_SleepLiketheDead(build);
        let ctgrname = 'E0S1_' + build['lc']['id'] + "TYPL";
        build = assign_lb_to_build(build, ctgrname, score, lbstats, spd, breakpoints, calcDetails);
    } else if ("24001" == build['lc']['id']) {
        [score, spd, lbstats, calcDetails] = E0S5_24001_CruisingintheStellarSea(build);
        let ctgrname = 'E0S5_' + build['lc']['id'] + "TYPL";
        build = assign_lb_to_build(build, ctgrname, score, lbstats, spd, breakpoints, calcDetails);
    }


    return build;
}

let char_base_hp = 892.584;
let char_base_atk = 679.14;
let char_base_spd = 109;

function E0S5_24001_CruisingintheStellarSea(build) {
    let lc_base_atk = lc_dict_by_id['24001']['atk'];
    let lc_base_hp = lc_dict_by_id['24001']['hp'];
    let total_base_atk = char_base_atk + lc_base_atk;
    let total_base_hp = char_base_hp + lc_base_hp;

    let lc_atk_p = 20;
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
    let trace_fire = 0;
    let trace_phys = 0;
    let trace_ice = 14.4;
    let trace_atk_p = 28;
    let trace_cd = 0;
    let trace_cr = 0;
    let trace_res = 0;
    let trace_spd_f = 0;
    let trace_spd_p = 0;
    let trace_ehr = 0;
    let trace_def_p = 0;

    let a6_spd_p = 10;
    let soulsteel_sync_cr = 20;
    let soulsteel_sync_cd = 30;
    let pela_ehr = 10; // A4
    let pela_keel_cd = 10;
    let ting_keel_cd = 10;
    let ting_skill_atk_p = 55;
    let ting_ult_dmg_bonus = 56;
    let stats = BuildStatsCalculatorNew({
        build: build,
        base_atk: total_base_atk,
        trace_atk_p: lc_atk_p + trace_atk_p + ting_skill_atk_p,
        base_hp: total_base_hp,
        trace_hp_p: trace_hp_p + lc_hp_p,
        trace_def_p: trace_def_p,
        trace_res_p: trace_res,
        trace_ehr_p: trace_ehr + lc_ehr + pela_ehr,
        trace_break_effect: lc_break_effect,
        base_spd: char_base_spd, trace_spd_f: trace_spd_f, trace_spd_p: trace_spd_p + lc_spd_p+a6_spd_p,
        trace_defshred: lc_def_ignore,
        trace_cr_p: lc_cr + trace_cr + soulsteel_sync_cr,
        trace_cd_p: lc_cd + trace_cd + soulsteel_sync_cd + pela_keel_cd + ting_keel_cd, 
        trace_damage_bonus: lc_damage_bonus + ting_ult_dmg_bonus,
        trace_fire: trace_fire,
        trace_phys: trace_phys,
        trace_ice: trace_ice,
        The_Ashblazing_Grand_Duke_ATK_p: 0,
    });

    // support stuff
    let res_shred = 12; // Pela E4
    let def_ignore = 58; // Pela ULT + pearls
    let sup_damage_bonus = 0;

    let element_type_dmg = stats.ice;
    let elemental_dmg = element_type_dmg + stats.damage_bonus + sup_damage_bonus;
    let basic_dmg_p = elemental_dmg + stats.basicdmg_p + lc_basic_damage_bonus;
    let skill_dmg_p = elemental_dmg + stats.skilldmg_p + lc_skill_damage_bonus;
    let fua_dmg_p = elemental_dmg + stats.flwupdmg_p + lc_fua_damage_bonus;
    let ult_dmg_p = elemental_dmg + stats.ultdmg_p + lc_ult_damage_bonus;
    let dot_dmg_p = elemental_dmg + stats.dot_bonus + lc_dot_bonus;
    

    // 1 targets
    let basic_atk_mult_primary = 0;
    let basic_hp_mult_primary = 0;
    let skill_atk_mult_primary = 220;
    let skill_atk_mult_adj = 0;
    let ult_atk_mult_primary = 350;
    let ult_hp_mult_primary = 0;
    let fua_atk_mult_primary = 50;
    let efua_atk_mult_primary = 0;
    let fua_hp_mult_primary = 0;

    let vuln = 0;

    let skill_primary = outgoing_dmg_js({
        'scaling_attribute': stats.final_atk,
        'cr': stats.final_cr + 8,
        'cd': stats.final_cd,
        'def_ignore_p': stats.defignore_p + def_ignore,
        'res_shred': stats.res_ignore + res_shred,
        'vulnerability': vuln,
        'skill_multiplier': skill_atk_mult_primary,
        'dmg_bonus_p': skill_dmg_p,
        'enemylvl': 95
    });
    let fua_primary = outgoing_dmg_js({
        'scaling_attribute': stats.final_atk,
        'cr': stats.final_cr + 8,
        'cd': stats.final_cd,
        'def_ignore_p': stats.defignore_p + def_ignore,
        'res_shred': stats.res_ignore + res_shred,
        'vulnerability': vuln,
        'skill_multiplier': fua_atk_mult_primary,
        'dmg_bonus_p': fua_dmg_p,
        'enemylvl': 95
    });
    let a2 = outgoing_dmg_js({
        'scaling_attribute': stats.final_atk,
        'cr': stats.final_cr + 8,
        'cd': stats.final_cd,
        'def_ignore_p': stats.defignore_p + def_ignore,
        'res_shred': stats.res_ignore + res_shred,
        'vulnerability': vuln,
        'skill_multiplier': 30,
        'dmg_bonus_p': elemental_dmg,
        'enemylvl': 95
    });
    let freeze_additional_dmg = outgoing_dmg_js({
        'scaling_attribute': stats.final_atk,
        'cr': stats.final_cr + 8,
        'cd': stats.final_cd,
        'def_ignore_p': stats.defignore_p + def_ignore,
        'res_shred': stats.res_ignore + res_shred,
        'vulnerability': vuln,
        'skill_multiplier': 50,
        'dmg_bonus_p': elemental_dmg,
        'enemylvl': 95
    });
    let benediction = outgoing_dmg_js({
        'scaling_attribute': stats.final_atk,
        'cr': stats.final_cr + 8,
        'cd': stats.final_cd,
        'def_ignore_p': stats.defignore_p + def_ignore,
        'res_shred': stats.res_ignore + res_shred,
        'vulnerability': vuln,
        'skill_multiplier': 128,
        'dmg_bonus_p': stats.damage_bonus + sup_damage_bonus,
        'enemylvl': 95
    });

    let ult_cr = 60;
    let ult_cd = 50;
    let skill_primary_ult = outgoing_dmg_js({
        'scaling_attribute': stats.final_atk,
        'cr': stats.final_cr + ult_cr,
        'cd': stats.final_cd + ult_cd,
        'def_ignore_p': stats.defignore_p + def_ignore,
        'res_shred': stats.res_ignore + res_shred,
        'vulnerability': vuln,
        'skill_multiplier': skill_atk_mult_primary,
        'dmg_bonus_p': skill_dmg_p,
        'enemylvl': 95
    });
    let ult_primary_ult = outgoing_dmg_js({
        'scaling_attribute': stats.final_atk,
        'cr': stats.final_cr + ult_cr,
        'cd': stats.final_cd + ult_cd,
        'def_ignore_p': stats.defignore_p + def_ignore,
        'res_shred': stats.res_ignore + res_shred,
        'vulnerability': vuln,
        'skill_multiplier': ult_atk_mult_primary,
        'dmg_bonus_p': ult_dmg_p,
        'enemylvl': 95
    });
    let fua_primary_ult = outgoing_dmg_js({
        'scaling_attribute': stats.final_atk,
        'cr': stats.final_cr + ult_cr,
        'cd': stats.final_cd + ult_cd,
        'def_ignore_p': stats.defignore_p + def_ignore,
        'res_shred': stats.res_ignore + res_shred,
        'vulnerability': vuln,
        'skill_multiplier': fua_atk_mult_primary,
        'dmg_bonus_p': fua_dmg_p,
        'enemylvl': 95
    });
    let a2_ult = outgoing_dmg_js({
        'scaling_attribute': stats.final_atk,
        'cr': stats.final_cr + ult_cr,
        'cd': stats.final_cd  + ult_cd,
        'def_ignore_p': stats.defignore_p + def_ignore,
        'res_shred': stats.res_ignore + res_shred,
        'vulnerability': vuln,
        'skill_multiplier': 30,
        'dmg_bonus_p': elemental_dmg,
        'enemylvl': 95
    });
    let freeze_additional_dmg_ult = outgoing_dmg_js({
        'scaling_attribute': stats.final_atk,
        'cr': stats.final_cr + ult_cr,
        'cd': stats.final_cd + ult_cd,
        'def_ignore_p': stats.defignore_p + def_ignore,
        'res_shred': stats.res_ignore + res_shred,
        'vulnerability': vuln,
        'skill_multiplier': 50,
        'dmg_bonus_p': elemental_dmg,
        'enemylvl': 95
    });
    let freeze_total_dmg = (2 * freeze_additional_dmg_ult + freeze_additional_dmg) / 3;
    let freeze_chance = hit_prob(60, stats.final_ehr);
    let benediction_ult = outgoing_dmg_js({
        'scaling_attribute': stats.final_atk,
        'cr': stats.final_cr + ult_cr,
        'cd': stats.final_cd + ult_cd,
        'def_ignore_p': stats.defignore_p + def_ignore,
        'res_shred': stats.res_ignore + res_shred,
        'vulnerability': vuln,
        'skill_multiplier': 192,
        'dmg_bonus_p': stats.damage_bonus + sup_damage_bonus,
        'enemylvl': 95
    });
    let a2_total = a2 + 2 * a2_ult;
    let benediction_total = benediction_ult + benediction;
    let score = skill_primary + skill_primary_ult + ult_primary_ult + fua_primary + fua_primary_ult + a2_total + freeze_total_dmg * freeze_chance + benediction_total;
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
        trace_cr_p: trace_cr + lc_cr,
        trace_cd_p: trace_cd + lc_cd,
        trace_damage_bonus: lc_damage_bonus,
        trace_fire: trace_fire,
        trace_phys: trace_phys,
        trace_ice:trace_ice,
        The_Ashblazing_Grand_Duke_ATK_p: 0,
        count_conditionals: false,
    });

    let lbstats = [
        ["ATK", String(Math.floor(stats_display.final_atk))],
        ["CR", trim_after_decimal(stats_display.final_cr) + "%"],
        ["CD", trim_after_decimal(stats_display.final_cd) + "%"],
        ["Ice", trim_after_decimal(stats_display.ice)],
        ["EHR", trim_after_decimal(stats_display.final_ehr)],
        ["SPD", trim_after_decimal(stats_display.final_spd)]
    ];

    let calcDetails = [
        ['E6S5 Pearls Keel Pela, E6S5 Cogs Keel Tingyun (Soulsteel up all the time, ATK% passive uptime assumed 50%,' + 
        ' CR before ULT averaged to ' + trim_after_decimal(stats.final_cr+8) + ", for set conditionals " + trim_after_decimal(stats.final_cr) + ")", ""],
        ["Skill", String(Math.floor(skill_primary))],
        ['FUA', String(Math.floor(fua_primary))],
        ["ULT", String(Math.floor(ult_primary_ult))],
        ['FUA (after ult)', String(Math.floor(fua_primary_ult))],        
        ["Skill (after ult)", String(Math.floor(skill_primary_ult))],
        ["Benediction", String(Math.floor(benediction_total))],
        ["A2 (before + 2×after ult)", String(Math.floor(a2_total))],
        ["Freeze × Chance", String(Math.floor(freeze_total_dmg)) + " × " + freeze_chance.toFixed(2)],
        ["SPD after A6", trim_after_decimal(stats.final_spd)],
    ];
    

    return [Math.floor(score), stats.final_spd, lbstats, calcDetails];

}

function E0S1_23012_SleepLiketheDead(build) {
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
    let trace_fire = 0;
    let trace_phys = 0;
    let trace_ice = 14.4;
    let trace_atk_p = 28;
    let trace_cd = 0;
    let trace_cr = 0;
    let trace_res = 0;
    let trace_spd_f = 0;
    let trace_spd_p = 0;
    let trace_ehr = 0;
    let trace_def_p = 0;

    let a6_spd_p = 10;
    let soulsteel_sync_cr = 20;
    let soulsteel_sync_cd = 30;
    let pela_ehr = 10; // A4
    let pela_keel_cd = 10;
    let ting_keel_cd = 10;
    let ting_skill_atk_p = 55;
    let ting_ult_dmg_bonus = 56;
    let stats = BuildStatsCalculatorNew({
        build: build,
        base_atk: total_base_atk,
        trace_atk_p: lc_atk_p + trace_atk_p + ting_skill_atk_p,
        base_hp: total_base_hp,
        trace_hp_p: trace_hp_p + lc_hp_p,
        trace_def_p: trace_def_p,
        trace_res_p: trace_res,
        trace_ehr_p: trace_ehr + lc_ehr + pela_ehr,
        trace_break_effect: lc_break_effect,
        base_spd: char_base_spd, trace_spd_f: trace_spd_f, trace_spd_p: trace_spd_p + lc_spd_p+a6_spd_p,
        trace_defshred: lc_def_ignore,
        trace_cr_p: lc_cr + trace_cr + soulsteel_sync_cr,
        trace_cd_p: lc_cd + trace_cd + soulsteel_sync_cd + pela_keel_cd + ting_keel_cd, 
        trace_damage_bonus: lc_damage_bonus + ting_ult_dmg_bonus,
        trace_fire: trace_fire,
        trace_phys: trace_phys,
        trace_ice: trace_ice,
        The_Ashblazing_Grand_Duke_ATK_p: 0,
    });
    let sltd_cr = sltd_eff_cr(stats.final_cr)/2
    stats = BuildStatsCalculatorNew({
        build: build,
        base_atk: total_base_atk,
        trace_atk_p: lc_atk_p + trace_atk_p + ting_skill_atk_p,
        base_hp: total_base_hp,
        trace_hp_p: trace_hp_p + lc_hp_p,
        trace_def_p: trace_def_p,
        trace_res_p: trace_res,
        trace_ehr_p: trace_ehr + lc_ehr + pela_ehr,
        trace_break_effect: lc_break_effect,
        base_spd: char_base_spd, trace_spd_f: trace_spd_f, trace_spd_p: trace_spd_p + lc_spd_p+a6_spd_p,
        trace_defshred: lc_def_ignore,
        trace_cr_p: lc_cr + trace_cr + soulsteel_sync_cr + sltd_cr,
        trace_cd_p: lc_cd + trace_cd + soulsteel_sync_cd + pela_keel_cd + ting_keel_cd, 
        trace_damage_bonus: lc_damage_bonus + ting_ult_dmg_bonus,
        trace_fire: trace_fire,
        trace_phys: trace_phys,
        trace_ice: trace_ice,
        The_Ashblazing_Grand_Duke_ATK_p: 0,
    });

    // support stuff
    let res_shred = 12; // Pela E4
    let def_ignore = 58; // Pela ULT + pearls
    let sup_damage_bonus = 0;

    let element_type_dmg = stats.ice;
    let elemental_dmg = element_type_dmg + stats.damage_bonus + sup_damage_bonus;
    let basic_dmg_p = elemental_dmg + stats.basicdmg_p + lc_basic_damage_bonus;
    let skill_dmg_p = elemental_dmg + stats.skilldmg_p + lc_skill_damage_bonus;
    let fua_dmg_p = elemental_dmg + stats.flwupdmg_p + lc_fua_damage_bonus;
    let ult_dmg_p = elemental_dmg + stats.ultdmg_p + lc_ult_damage_bonus;
    let dot_dmg_p = elemental_dmg + stats.dot_bonus + lc_dot_bonus;
    

    // 1 targets
    let basic_atk_mult_primary = 0;
    let basic_hp_mult_primary = 0;
    let skill_atk_mult_primary = 220;
    let skill_atk_mult_adj = 0;
    let ult_atk_mult_primary = 350;
    let ult_hp_mult_primary = 0;
    let fua_atk_mult_primary = 50;
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
    let fua_primary = outgoing_dmg_js({
        'scaling_attribute': stats.final_atk,
        'cr': stats.final_cr,
        'cd': stats.final_cd,
        'def_ignore_p': stats.defignore_p + def_ignore,
        'res_shred': stats.res_ignore + res_shred,
        'vulnerability': vuln,
        'skill_multiplier': fua_atk_mult_primary,
        'dmg_bonus_p': fua_dmg_p,
        'enemylvl': 95
    });
    let a2 = outgoing_dmg_js({
        'scaling_attribute': stats.final_atk,
        'cr': stats.final_cr,
        'cd': stats.final_cd,
        'def_ignore_p': stats.defignore_p + def_ignore,
        'res_shred': stats.res_ignore + res_shred,
        'vulnerability': vuln,
        'skill_multiplier': 30,
        'dmg_bonus_p': elemental_dmg,
        'enemylvl': 95
    });
    let freeze_additional_dmg = outgoing_dmg_js({
        'scaling_attribute': stats.final_atk,
        'cr': stats.final_cr,
        'cd': stats.final_cd,
        'def_ignore_p': stats.defignore_p + def_ignore,
        'res_shred': stats.res_ignore + res_shred,
        'vulnerability': vuln,
        'skill_multiplier': 50,
        'dmg_bonus_p': elemental_dmg,
        'enemylvl': 95
    });
    let benediction = outgoing_dmg_js({
        'scaling_attribute': stats.final_atk,
        'cr': stats.final_cr,
        'cd': stats.final_cd,
        'def_ignore_p': stats.defignore_p + def_ignore,
        'res_shred': stats.res_ignore + res_shred,
        'vulnerability': vuln,
        'skill_multiplier': 128,
        'dmg_bonus_p': stats.damage_bonus + sup_damage_bonus,
        'enemylvl': 95
    });

    let ult_cr = 60;
    let ult_cd = 50;
    let skill_primary_ult = outgoing_dmg_js({
        'scaling_attribute': stats.final_atk,
        'cr': stats.final_cr + ult_cr,
        'cd': stats.final_cd + ult_cd,
        'def_ignore_p': stats.defignore_p + def_ignore,
        'res_shred': stats.res_ignore + res_shred,
        'vulnerability': vuln,
        'skill_multiplier': skill_atk_mult_primary,
        'dmg_bonus_p': skill_dmg_p,
        'enemylvl': 95
    });
    let ult_primary_ult = outgoing_dmg_js({
        'scaling_attribute': stats.final_atk,
        'cr': stats.final_cr + ult_cr,
        'cd': stats.final_cd + ult_cd,
        'def_ignore_p': stats.defignore_p + def_ignore,
        'res_shred': stats.res_ignore + res_shred,
        'vulnerability': vuln,
        'skill_multiplier': ult_atk_mult_primary,
        'dmg_bonus_p': ult_dmg_p,
        'enemylvl': 95
    });
    let fua_primary_ult = outgoing_dmg_js({
        'scaling_attribute': stats.final_atk,
        'cr': stats.final_cr + ult_cr,
        'cd': stats.final_cd + ult_cd,
        'def_ignore_p': stats.defignore_p + def_ignore,
        'res_shred': stats.res_ignore + res_shred,
        'vulnerability': vuln,
        'skill_multiplier': fua_atk_mult_primary,
        'dmg_bonus_p': fua_dmg_p,
        'enemylvl': 95
    });
    let a2_ult = outgoing_dmg_js({
        'scaling_attribute': stats.final_atk,
        'cr': stats.final_cr + ult_cr,
        'cd': stats.final_cd  + ult_cd,
        'def_ignore_p': stats.defignore_p + def_ignore,
        'res_shred': stats.res_ignore + res_shred,
        'vulnerability': vuln,
        'skill_multiplier': 30,
        'dmg_bonus_p': elemental_dmg,
        'enemylvl': 95
    });
    let freeze_additional_dmg_ult = outgoing_dmg_js({
        'scaling_attribute': stats.final_atk,
        'cr': stats.final_cr + ult_cr,
        'cd': stats.final_cd + ult_cd,
        'def_ignore_p': stats.defignore_p + def_ignore,
        'res_shred': stats.res_ignore + res_shred,
        'vulnerability': vuln,
        'skill_multiplier': 50,
        'dmg_bonus_p': elemental_dmg,
        'enemylvl': 95
    });
    let freeze_total_dmg = (2 * freeze_additional_dmg_ult + freeze_additional_dmg) / 3;
    let freeze_chance = hit_prob(60, stats.final_ehr);
    let benediction_ult = outgoing_dmg_js({
        'scaling_attribute': stats.final_atk,
        'cr': stats.final_cr + ult_cr,
        'cd': stats.final_cd + ult_cd,
        'def_ignore_p': stats.defignore_p + def_ignore,
        'res_shred': stats.res_ignore + res_shred,
        'vulnerability': vuln,
        'skill_multiplier': 192,
        'dmg_bonus_p': stats.damage_bonus + sup_damage_bonus,
        'enemylvl': 95
    });
    let a2_total = a2 + 2 * a2_ult;
    let benediction_total = benediction_ult + benediction;
    let score = skill_primary + skill_primary_ult + ult_primary_ult + fua_primary + fua_primary_ult + a2_total + freeze_total_dmg * freeze_chance + benediction_total;
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
        trace_ice:trace_ice,
        The_Ashblazing_Grand_Duke_ATK_p: 0,
        count_conditionals: false,
    });

    let lbstats = [
        ["ATK", String(Math.floor(stats_display.final_atk))],
        ["CR", trim_after_decimal(stats_display.final_cr) + "%"],
        ["CD", trim_after_decimal(stats_display.final_cd) + "%"],
        ["Ice", trim_after_decimal(stats_display.ice)],
        ["EHR", trim_after_decimal(stats_display.final_ehr)],
        ["SPD", trim_after_decimal(stats_display.final_spd)]
    ];

    let calcDetails = [
        ['E6S5 Pearls Keel Pela, E6S5 Cogs Keel Tingyun (Soulsteel up all the time)', ""],
        ['CR before ULT averaged to', trim_after_decimal(stats.final_cr)],
        ["Skill", String(Math.floor(skill_primary))],
        ['FUA', String(Math.floor(fua_primary))],
        ["ULT", String(Math.floor(ult_primary_ult))],
        ['FUA (after ult)', String(Math.floor(fua_primary_ult))],        
        ["Skill (after ult)", String(Math.floor(skill_primary_ult))],
        ["Benediction", String(Math.floor(benediction_total))],
        ["A2 (before + 2×after ult)", String(Math.floor(a2_total))],
        ["Freeze × Chance", String(Math.floor(freeze_total_dmg)) + " × " + freeze_chance.toFixed(2)],
        ["SPD after A6", trim_after_decimal(stats.final_spd)],
    ];
    

    return [Math.floor(score), stats.final_spd, lbstats, calcDetails];

}

function E0S1_23001_IntheNight(build) {
    let lc_base_atk = lc_dict_by_id['23001']['atk'];
    let lc_base_hp = lc_dict_by_id['23001']['hp'];
    let total_base_atk = char_base_atk + lc_base_atk;
    let total_base_hp = char_base_hp + lc_base_hp;

    let lc_atk_p = 0;
    let lc_cd = 0;
    let lc_cr = 18;
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
    let trace_phys = 0;
    let trace_ice = 14.4;
    let trace_atk_p = 28;
    let trace_cd = 0;
    let trace_cr = 0;
    let trace_res = 0;
    let trace_spd_f = 0;
    let trace_spd_p = 0;
    let trace_ehr = 0;
    let trace_def_p = 0;

    let a6_spd_p = 10;
    let soulsteel_sync_cr = 20;
    let soulsteel_sync_cd = 30;
    let pela_ehr = 10; // A4
    let pela_keel_cd = 10;
    let ting_keel_cd = 10;
    let ting_skill_atk_p = 55;
    let ting_ult_dmg_bonus = 56;
    let stats = BuildStatsCalculatorNew({
        build: build,
        base_atk: total_base_atk,
        trace_atk_p: lc_atk_p + trace_atk_p + ting_skill_atk_p,
        base_hp: total_base_hp,
        trace_hp_p: trace_hp_p + lc_hp_p,
        trace_def_p: trace_def_p,
        trace_res_p: trace_res,
        trace_ehr_p: trace_ehr + lc_ehr + pela_ehr,
        trace_break_effect: lc_break_effect,
        base_spd: char_base_spd, trace_spd_f: trace_spd_f, trace_spd_p: trace_spd_p + lc_spd_p+a6_spd_p,
        trace_defshred: lc_def_ignore,
        trace_cr_p: lc_cr + trace_cr + soulsteel_sync_cr,
        trace_cd_p: lc_cd + trace_cd + soulsteel_sync_cd + pela_keel_cd + ting_keel_cd, 
        trace_damage_bonus: lc_damage_bonus + ting_ult_dmg_bonus,
        trace_fire: trace_fire,
        trace_phys: trace_phys,
        trace_ice: trace_ice,
        The_Ashblazing_Grand_Duke_ATK_p: 0,
    });
    get_itn_stack_count(stats.final_spd);

    // support stuff
    let res_shred = 12; // Pela E4
    let def_ignore = 58; // Pela ULT + pearls
    let sup_damage_bonus = 0;

    let stacks = get_itn_stack_count(stats.final_spd);
    let itn_ult_cd_per_stack = 12;
    let itn_skill_dmg_per_stack = 6;
    let element_type_dmg = stats.ice;
    let elemental_dmg = element_type_dmg + stats.damage_bonus + sup_damage_bonus;
    let basic_dmg_p = elemental_dmg + stats.basicdmg_p + lc_basic_damage_bonus;
    let skill_dmg_p = elemental_dmg + stats.skilldmg_p + lc_skill_damage_bonus + itn_skill_dmg_per_stack * stacks;
    let fua_dmg_p = elemental_dmg + stats.flwupdmg_p + lc_fua_damage_bonus;
    let ult_dmg_p = elemental_dmg + stats.ultdmg_p + lc_ult_damage_bonus;
    let dot_dmg_p = elemental_dmg + stats.dot_bonus + lc_dot_bonus;
    

    // 1 targets
    let basic_atk_mult_primary = 0;
    let basic_hp_mult_primary = 0;
    let skill_atk_mult_primary = 220;
    let skill_atk_mult_adj = 0;
    let ult_atk_mult_primary = 350;
    let ult_hp_mult_primary = 0;
    let fua_atk_mult_primary = 50;
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
    let fua_primary = outgoing_dmg_js({
        'scaling_attribute': stats.final_atk,
        'cr': stats.final_cr,
        'cd': stats.final_cd,
        'def_ignore_p': stats.defignore_p + def_ignore,
        'res_shred': stats.res_ignore + res_shred,
        'vulnerability': vuln,
        'skill_multiplier': fua_atk_mult_primary,
        'dmg_bonus_p': fua_dmg_p,
        'enemylvl': 95
    });
    let a2 = outgoing_dmg_js({
        'scaling_attribute': stats.final_atk,
        'cr': stats.final_cr,
        'cd': stats.final_cd,
        'def_ignore_p': stats.defignore_p + def_ignore,
        'res_shred': stats.res_ignore + res_shred,
        'vulnerability': vuln,
        'skill_multiplier': 30,
        'dmg_bonus_p': elemental_dmg,
        'enemylvl': 95
    });
    let freeze_additional_dmg = outgoing_dmg_js({
        'scaling_attribute': stats.final_atk,
        'cr': stats.final_cr,
        'cd': stats.final_cd,
        'def_ignore_p': stats.defignore_p + def_ignore,
        'res_shred': stats.res_ignore + res_shred,
        'vulnerability': vuln,
        'skill_multiplier': 50,
        'dmg_bonus_p': elemental_dmg,
        'enemylvl': 95
    });
    let benediction = outgoing_dmg_js({
        'scaling_attribute': stats.final_atk,
        'cr': stats.final_cr,
        'cd': stats.final_cd,
        'def_ignore_p': stats.defignore_p + def_ignore,
        'res_shred': stats.res_ignore + res_shred,
        'vulnerability': vuln,
        'skill_multiplier': 128,
        'dmg_bonus_p': stats.damage_bonus + sup_damage_bonus,
        'enemylvl': 95
    });

    let ult_cr = 60;
    let ult_cd = 50;
    let skill_primary_ult = outgoing_dmg_js({
        'scaling_attribute': stats.final_atk,
        'cr': stats.final_cr + ult_cr,
        'cd': stats.final_cd + ult_cd,
        'def_ignore_p': stats.defignore_p + def_ignore,
        'res_shred': stats.res_ignore + res_shred,
        'vulnerability': vuln,
        'skill_multiplier': skill_atk_mult_primary,
        'dmg_bonus_p': skill_dmg_p,
        'enemylvl': 95
    });

    let itn_cd_for_ult = itn_ult_cd_per_stack * stacks;
    let ult_primary_ult = outgoing_dmg_js({
        'scaling_attribute': stats.final_atk,
        'cr': stats.final_cr + ult_cr,
        'cd': stats.final_cd + ult_cd + itn_cd_for_ult,
        'def_ignore_p': stats.defignore_p + def_ignore,
        'res_shred': stats.res_ignore + res_shred,
        'vulnerability': vuln,
        'skill_multiplier': ult_atk_mult_primary,
        'dmg_bonus_p': ult_dmg_p,
        'enemylvl': 95
    });
    let fua_primary_ult = outgoing_dmg_js({
        'scaling_attribute': stats.final_atk,
        'cr': stats.final_cr + ult_cr,
        'cd': stats.final_cd + ult_cd,
        'def_ignore_p': stats.defignore_p + def_ignore,
        'res_shred': stats.res_ignore + res_shred,
        'vulnerability': vuln,
        'skill_multiplier': fua_atk_mult_primary,
        'dmg_bonus_p': fua_dmg_p,
        'enemylvl': 95
    });
    let a2_ult = outgoing_dmg_js({
        'scaling_attribute': stats.final_atk,
        'cr': stats.final_cr + ult_cr,
        'cd': stats.final_cd  + ult_cd,
        'def_ignore_p': stats.defignore_p + def_ignore,
        'res_shred': stats.res_ignore + res_shred,
        'vulnerability': vuln,
        'skill_multiplier': 30,
        'dmg_bonus_p': elemental_dmg,
        'enemylvl': 95
    });
    let freeze_additional_dmg_ult = outgoing_dmg_js({
        'scaling_attribute': stats.final_atk,
        'cr': stats.final_cr + ult_cr,
        'cd': stats.final_cd + ult_cd,
        'def_ignore_p': stats.defignore_p + def_ignore,
        'res_shred': stats.res_ignore + res_shred,
        'vulnerability': vuln,
        'skill_multiplier': 50,
        'dmg_bonus_p': elemental_dmg,
        'enemylvl': 95
    });
    let freeze_total_dmg = (2 * freeze_additional_dmg_ult + freeze_additional_dmg) / 3;
    let freeze_chance = hit_prob(60, stats.final_ehr);
    let benediction_ult = outgoing_dmg_js({
        'scaling_attribute': stats.final_atk,
        'cr': stats.final_cr + ult_cr,
        'cd': stats.final_cd + ult_cd,
        'def_ignore_p': stats.defignore_p + def_ignore,
        'res_shred': stats.res_ignore + res_shred,
        'vulnerability': vuln,
        'skill_multiplier': 192,
        'dmg_bonus_p': stats.damage_bonus + sup_damage_bonus,
        'enemylvl': 95
    });
    let a2_total = a2 + 2 * a2_ult;
    let benediction_total = benediction_ult + benediction;
    let score = skill_primary + skill_primary_ult + ult_primary_ult + fua_primary + fua_primary_ult + a2_total + freeze_total_dmg * freeze_chance + benediction_total;
    let stats_display = BuildStatsCalculatorNew({
        build: build,
        base_atk: total_base_atk,
        trace_atk_p: trace_atk_p,
        base_hp: total_base_hp,
        trace_hp_p: trace_hp_p + lc_hp_p,
        trace_res_p: trace_res,
        trace_ehr_p: trace_ehr + lc_ehr,
        trace_break_effect: lc_break_effect,
        base_spd: char_base_spd, trace_spd_f: trace_spd_f, trace_spd_p: trace_spd_p,
        trace_defshred: lc_def_ignore,
        trace_cr_p: trace_cr + lc_cr,
        trace_cd_p: trace_cd + lc_cd,
        trace_damage_bonus: lc_damage_bonus,
        trace_fire: trace_fire,
        trace_phys: trace_phys,
        trace_ice:trace_ice,
        The_Ashblazing_Grand_Duke_ATK_p: 0,
        count_conditionals: false,
    });

    let lbstats = [
        ["ATK", String(Math.floor(stats_display.final_atk))],
        ["CR", trim_after_decimal(stats_display.final_cr) + "%"],
        ["CD", trim_after_decimal(stats_display.final_cd) + "%"],
        ["Ice", trim_after_decimal(stats_display.ice)],
        ["EHR", trim_after_decimal(stats_display.final_ehr)],
        ["SPD", trim_after_decimal(stats_display.final_spd)]
    ];

    let calcDetails = [
        ['E6S5 Pearls Keel Pela, E6S5 Cogs Keel Tingyun (Soulsteel up all the time)', ""],
        ["Skill", String(Math.floor(skill_primary))],
        ['FUA', String(Math.floor(fua_primary))],
        ["ULT", String(Math.floor(ult_primary_ult))],
        ['FUA (after ult)', String(Math.floor(fua_primary_ult))],        
        ["Skill (after ult)", String(Math.floor(skill_primary_ult))],
        ["Benediction", String(Math.floor(benediction_total))],
        ["A2 (before + 2×after ult)", String(Math.floor(a2_total))],
        ["Freeze × Chance", String(Math.floor(freeze_total_dmg)) + " × " + freeze_chance.toFixed(2)],
        ['LC Stacks', stacks],
        ["Eff SPD", trim_after_decimal(stats.final_spd)],
    ];
    

    return [Math.floor(score), stats.final_spd, lbstats, calcDetails];

}

function E0S5_21024_RiverFlowsinSpring(build) {
    let lc_base_atk = lc_dict_by_id['21024']['atk'];
    let lc_base_hp = lc_dict_by_id['21024']['hp'];
    let total_base_atk = char_base_atk + lc_base_atk;
    let total_base_hp = char_base_hp + lc_base_hp;

    let lc_atk_p = 0;
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
    let lc_spd_p = 12;

    let trace_hp_p = 10;
    let trace_fire = 0;
    let trace_phys = 0;
    let trace_ice = 14.4;
    let trace_atk_p = 28;
    let trace_cd = 0;
    let trace_cr = 0;
    let trace_res = 0;
    let trace_spd_f = 0;
    let trace_spd_p = 0;
    let trace_ehr = 0;
    let trace_def_p = 0;

    let a6_spd_p = 10;
    let soulsteel_sync_cr = 20;
    let soulsteel_sync_cd = 30;
    let pela_ehr = 10; // A4
    let pela_keel_cd = 10;
    let ting_keel_cd = 10;
    let ting_skill_atk_p = 55;
    let ting_ult_dmg_bonus = 56;
    let stats = BuildStatsCalculatorNew({
        build: build,
        base_atk: total_base_atk,
        trace_atk_p: lc_atk_p + trace_atk_p + ting_skill_atk_p,
        base_hp: total_base_hp,
        trace_hp_p: trace_hp_p + lc_hp_p,
        trace_def_p: trace_def_p,
        trace_res_p: trace_res,
        trace_ehr_p: trace_ehr + lc_ehr + pela_ehr,
        trace_break_effect: lc_break_effect,
        base_spd: char_base_spd, trace_spd_f: trace_spd_f, trace_spd_p: trace_spd_p + lc_spd_p+a6_spd_p,
        trace_defshred: lc_def_ignore,
        trace_cr_p: lc_cr + trace_cr + soulsteel_sync_cr,
        trace_cd_p: lc_cd + trace_cd + soulsteel_sync_cd + pela_keel_cd + ting_keel_cd, 
        trace_damage_bonus: lc_damage_bonus + ting_ult_dmg_bonus,
        trace_fire: trace_fire,
        trace_phys: trace_phys,
        trace_ice: trace_ice,
        The_Ashblazing_Grand_Duke_ATK_p: 0,
    });

    // support stuff
    let res_shred = 12; // Pela E4
    let def_ignore = 58; // Pela ULT + pearls
    let sup_damage_bonus = 0;

    let element_type_dmg = stats.ice;
    let elemental_dmg = element_type_dmg + stats.damage_bonus + sup_damage_bonus;
    let basic_dmg_p = elemental_dmg + stats.basicdmg_p + lc_basic_damage_bonus;
    let skill_dmg_p = elemental_dmg + stats.skilldmg_p + lc_skill_damage_bonus;
    let fua_dmg_p = elemental_dmg + stats.flwupdmg_p + lc_fua_damage_bonus;
    let ult_dmg_p = elemental_dmg + stats.ultdmg_p + lc_ult_damage_bonus;
    let dot_dmg_p = elemental_dmg + stats.dot_bonus + lc_dot_bonus;
    

    // 1 targets
    let basic_atk_mult_primary = 0;
    let basic_hp_mult_primary = 0;
    let skill_atk_mult_primary = 220;
    let skill_atk_mult_adj = 0;
    let ult_atk_mult_primary = 350;
    let ult_hp_mult_primary = 0;
    let fua_atk_mult_primary = 50;
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
    let fua_primary = outgoing_dmg_js({
        'scaling_attribute': stats.final_atk,
        'cr': stats.final_cr,
        'cd': stats.final_cd,
        'def_ignore_p': stats.defignore_p + def_ignore,
        'res_shred': stats.res_ignore + res_shred,
        'vulnerability': vuln,
        'skill_multiplier': fua_atk_mult_primary,
        'dmg_bonus_p': fua_dmg_p,
        'enemylvl': 95
    });
    let a2 = outgoing_dmg_js({
        'scaling_attribute': stats.final_atk,
        'cr': stats.final_cr,
        'cd': stats.final_cd,
        'def_ignore_p': stats.defignore_p + def_ignore,
        'res_shred': stats.res_ignore + res_shred,
        'vulnerability': vuln,
        'skill_multiplier': 30,
        'dmg_bonus_p': elemental_dmg,
        'enemylvl': 95
    });
    let freeze_additional_dmg = outgoing_dmg_js({
        'scaling_attribute': stats.final_atk,
        'cr': stats.final_cr,
        'cd': stats.final_cd,
        'def_ignore_p': stats.defignore_p + def_ignore,
        'res_shred': stats.res_ignore + res_shred,
        'vulnerability': vuln,
        'skill_multiplier': 50,
        'dmg_bonus_p': elemental_dmg,
        'enemylvl': 95
    });
    let benediction = outgoing_dmg_js({
        'scaling_attribute': stats.final_atk,
        'cr': stats.final_cr,
        'cd': stats.final_cd,
        'def_ignore_p': stats.defignore_p + def_ignore,
        'res_shred': stats.res_ignore + res_shred,
        'vulnerability': vuln,
        'skill_multiplier': 128,
        'dmg_bonus_p': stats.damage_bonus + sup_damage_bonus,
        'enemylvl': 95
    });

    let ult_cr = 60;
    let ult_cd = 50;
    let skill_primary_ult = outgoing_dmg_js({
        'scaling_attribute': stats.final_atk,
        'cr': stats.final_cr + ult_cr,
        'cd': stats.final_cd + ult_cd,
        'def_ignore_p': stats.defignore_p + def_ignore,
        'res_shred': stats.res_ignore + res_shred,
        'vulnerability': vuln,
        'skill_multiplier': skill_atk_mult_primary,
        'dmg_bonus_p': skill_dmg_p,
        'enemylvl': 95
    });
    let ult_primary_ult = outgoing_dmg_js({
        'scaling_attribute': stats.final_atk,
        'cr': stats.final_cr + ult_cr,
        'cd': stats.final_cd + ult_cd,
        'def_ignore_p': stats.defignore_p + def_ignore,
        'res_shred': stats.res_ignore + res_shred,
        'vulnerability': vuln,
        'skill_multiplier': ult_atk_mult_primary,
        'dmg_bonus_p': ult_dmg_p,
        'enemylvl': 95
    });
    let fua_primary_ult = outgoing_dmg_js({
        'scaling_attribute': stats.final_atk,
        'cr': stats.final_cr + ult_cr,
        'cd': stats.final_cd + ult_cd,
        'def_ignore_p': stats.defignore_p + def_ignore,
        'res_shred': stats.res_ignore + res_shred,
        'vulnerability': vuln,
        'skill_multiplier': fua_atk_mult_primary,
        'dmg_bonus_p': fua_dmg_p,
        'enemylvl': 95
    });
    let a2_ult = outgoing_dmg_js({
        'scaling_attribute': stats.final_atk,
        'cr': stats.final_cr + ult_cr,
        'cd': stats.final_cd  + ult_cd,
        'def_ignore_p': stats.defignore_p + def_ignore,
        'res_shred': stats.res_ignore + res_shred,
        'vulnerability': vuln,
        'skill_multiplier': 30,
        'dmg_bonus_p': elemental_dmg,
        'enemylvl': 95
    });
    let freeze_additional_dmg_ult = outgoing_dmg_js({
        'scaling_attribute': stats.final_atk,
        'cr': stats.final_cr + ult_cr,
        'cd': stats.final_cd + ult_cd,
        'def_ignore_p': stats.defignore_p + def_ignore,
        'res_shred': stats.res_ignore + res_shred,
        'vulnerability': vuln,
        'skill_multiplier': 50,
        'dmg_bonus_p': elemental_dmg,
        'enemylvl': 95
    });
    let freeze_total_dmg = (2 * freeze_additional_dmg_ult + freeze_additional_dmg) / 3;
    let freeze_chance = hit_prob(60, stats.final_ehr);
    let benediction_ult = outgoing_dmg_js({
        'scaling_attribute': stats.final_atk,
        'cr': stats.final_cr + ult_cr,
        'cd': stats.final_cd + ult_cd,
        'def_ignore_p': stats.defignore_p + def_ignore,
        'res_shred': stats.res_ignore + res_shred,
        'vulnerability': vuln,
        'skill_multiplier': 192,
        'dmg_bonus_p': stats.damage_bonus + sup_damage_bonus,
        'enemylvl': 95
    });
    let a2_total = a2 + 2 * a2_ult;
    let benediction_total = benediction_ult + benediction;
    let score = skill_primary + skill_primary_ult + ult_primary_ult + fua_primary + fua_primary_ult + a2_total + freeze_total_dmg * freeze_chance + benediction_total;
    let stats_display = BuildStatsCalculatorNew({
        build: build,
        base_atk: total_base_atk,
        trace_atk_p: trace_atk_p,
        base_hp: total_base_hp,
        trace_hp_p: trace_hp_p + lc_hp_p,
        trace_res_p: trace_res,
        trace_ehr_p: trace_ehr + lc_ehr,
        trace_break_effect: lc_break_effect,
        base_spd: char_base_spd, trace_spd_f: trace_spd_f, trace_spd_p: trace_spd_p,
        trace_defshred: lc_def_ignore,
        trace_cr_p: trace_cr,
        trace_cd_p: trace_cd + lc_cd,
        trace_damage_bonus: lc_damage_bonus,
        trace_fire: trace_fire,
        trace_phys: trace_phys,
        trace_ice:trace_ice,
        The_Ashblazing_Grand_Duke_ATK_p: 0,
        count_conditionals: false,
    });

    let lbstats = [
        ["ATK", String(Math.floor(stats_display.final_atk))],
        ["CR", trim_after_decimal(stats_display.final_cr) + "%"],
        ["CD", trim_after_decimal(stats_display.final_cd) + "%"],
        ["Ice", trim_after_decimal(stats_display.ice)],
        ["EHR", trim_after_decimal(stats_display.final_ehr)],
        ["SPD", trim_after_decimal(stats_display.final_spd)]
    ];

    let calcDetails = [
        ['E6S5 Pearls Keel Pela, E6S5 Cogs Keel Tingyun (Soulsteel up all the time)', ""],
        ["Skill", String(Math.floor(skill_primary))],
        ['FUA', String(Math.floor(fua_primary))],
        ["ULT", String(Math.floor(ult_primary_ult))],
        ['FUA (after ult)', String(Math.floor(fua_primary_ult))],        
        ["Skill (after ult)", String(Math.floor(skill_primary_ult))],
        ["Benediction", String(Math.floor(benediction_total))],
        ["A2 (before + 2×after ult)", String(Math.floor(a2_total))],
        ["Freeze × Chance", String(Math.floor(freeze_total_dmg)) + " × " + freeze_chance.toFixed(2)],
        ["Eff SPD", trim_after_decimal(stats.final_spd)],
    ];
    

    return [Math.floor(score), stats.final_spd, lbstats, calcDetails];

}

function E0S5_21010_Swordplay(build) {
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
    let trace_fire = 0;
    let trace_phys = 0;
    let trace_ice = 14.4;
    let trace_atk_p = 28;
    let trace_cd = 0;
    let trace_cr = 0;
    let trace_res = 0;
    let trace_spd_f = 0;
    let trace_spd_p = 0;
    let trace_ehr = 0;
    let trace_def_p = 0;

    let a6_spd_p = 10;
    let soulsteel_sync_cr = 20;
    let soulsteel_sync_cd = 30;
    let pela_ehr = 10; // A4
    let pela_keel_cd = 10;
    let ting_keel_cd = 10;
    let ting_skill_atk_p = 55;
    let ting_ult_dmg_bonus = 56;
    let stats = BuildStatsCalculatorNew({
        build: build,
        base_atk: total_base_atk,
        trace_atk_p: lc_atk_p + trace_atk_p + ting_skill_atk_p,
        base_hp: total_base_hp,
        trace_hp_p: trace_hp_p + lc_hp_p,
        trace_def_p: trace_def_p,
        trace_res_p: trace_res,
        trace_ehr_p: trace_ehr + lc_ehr + pela_ehr,
        trace_break_effect: lc_break_effect,
        base_spd: char_base_spd, trace_spd_f: trace_spd_f, trace_spd_p: trace_spd_p + lc_spd_p+a6_spd_p,
        trace_defshred: lc_def_ignore,
        trace_cr_p: lc_cr + trace_cr + soulsteel_sync_cr,
        trace_cd_p: lc_cd + trace_cd + soulsteel_sync_cd + pela_keel_cd + ting_keel_cd, 
        trace_damage_bonus: lc_damage_bonus + ting_ult_dmg_bonus,
        trace_fire: trace_fire,
        trace_phys: trace_phys,
        trace_ice: trace_ice,
        The_Ashblazing_Grand_Duke_ATK_p: 0,
    });

    // support stuff
    let res_shred = 12; // Pela E4
    let def_ignore = 58; // Pela ULT + pearls
    let sup_damage_bonus = 0;

    let element_type_dmg = stats.ice;
    let elemental_dmg = element_type_dmg + stats.damage_bonus + sup_damage_bonus;
    let basic_dmg_p = elemental_dmg + stats.basicdmg_p + lc_basic_damage_bonus;
    let skill_dmg_p = elemental_dmg + stats.skilldmg_p + lc_skill_damage_bonus;
    let fua_dmg_p = elemental_dmg + stats.flwupdmg_p + lc_fua_damage_bonus;
    let ult_dmg_p = elemental_dmg + stats.ultdmg_p + lc_ult_damage_bonus;
    let dot_dmg_p = elemental_dmg + stats.dot_bonus + lc_dot_bonus;
    

    // 1 targets
    let basic_atk_mult_primary = 0;
    let basic_hp_mult_primary = 0;
    let skill_atk_mult_primary = 220;
    let skill_atk_mult_adj = 0;
    let ult_atk_mult_primary = 350;
    let ult_hp_mult_primary = 0;
    let fua_atk_mult_primary = 50;
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
    let fua_primary = outgoing_dmg_js({
        'scaling_attribute': stats.final_atk,
        'cr': stats.final_cr,
        'cd': stats.final_cd,
        'def_ignore_p': stats.defignore_p + def_ignore,
        'res_shred': stats.res_ignore + res_shred,
        'vulnerability': vuln,
        'skill_multiplier': fua_atk_mult_primary,
        'dmg_bonus_p': fua_dmg_p,
        'enemylvl': 95
    });
    let a2 = outgoing_dmg_js({
        'scaling_attribute': stats.final_atk,
        'cr': stats.final_cr,
        'cd': stats.final_cd,
        'def_ignore_p': stats.defignore_p + def_ignore,
        'res_shred': stats.res_ignore + res_shred,
        'vulnerability': vuln,
        'skill_multiplier': 30,
        'dmg_bonus_p': elemental_dmg,
        'enemylvl': 95
    });
    let freeze_additional_dmg = outgoing_dmg_js({
        'scaling_attribute': stats.final_atk,
        'cr': stats.final_cr,
        'cd': stats.final_cd,
        'def_ignore_p': stats.defignore_p + def_ignore,
        'res_shred': stats.res_ignore + res_shred,
        'vulnerability': vuln,
        'skill_multiplier': 50,
        'dmg_bonus_p': elemental_dmg,
        'enemylvl': 95
    });
    let benediction = outgoing_dmg_js({
        'scaling_attribute': stats.final_atk,
        'cr': stats.final_cr,
        'cd': stats.final_cd,
        'def_ignore_p': stats.defignore_p + def_ignore,
        'res_shred': stats.res_ignore + res_shred,
        'vulnerability': vuln,
        'skill_multiplier': 128,
        'dmg_bonus_p': stats.damage_bonus + sup_damage_bonus,
        'enemylvl': 95
    });

    let ult_cr = 60;
    let ult_cd = 50;
    let skill_primary_ult = outgoing_dmg_js({
        'scaling_attribute': stats.final_atk,
        'cr': stats.final_cr + ult_cr,
        'cd': stats.final_cd + ult_cd,
        'def_ignore_p': stats.defignore_p + def_ignore,
        'res_shred': stats.res_ignore + res_shred,
        'vulnerability': vuln,
        'skill_multiplier': skill_atk_mult_primary,
        'dmg_bonus_p': skill_dmg_p,
        'enemylvl': 95
    });
    let ult_primary_ult = outgoing_dmg_js({
        'scaling_attribute': stats.final_atk,
        'cr': stats.final_cr + ult_cr,
        'cd': stats.final_cd + ult_cd,
        'def_ignore_p': stats.defignore_p + def_ignore,
        'res_shred': stats.res_ignore + res_shred,
        'vulnerability': vuln,
        'skill_multiplier': ult_atk_mult_primary,
        'dmg_bonus_p': ult_dmg_p,
        'enemylvl': 95
    });
    let fua_primary_ult = outgoing_dmg_js({
        'scaling_attribute': stats.final_atk,
        'cr': stats.final_cr + ult_cr,
        'cd': stats.final_cd + ult_cd,
        'def_ignore_p': stats.defignore_p + def_ignore,
        'res_shred': stats.res_ignore + res_shred,
        'vulnerability': vuln,
        'skill_multiplier': fua_atk_mult_primary,
        'dmg_bonus_p': fua_dmg_p,
        'enemylvl': 95
    });
    let a2_ult = outgoing_dmg_js({
        'scaling_attribute': stats.final_atk,
        'cr': stats.final_cr + ult_cr,
        'cd': stats.final_cd  + ult_cd,
        'def_ignore_p': stats.defignore_p + def_ignore,
        'res_shred': stats.res_ignore + res_shred,
        'vulnerability': vuln,
        'skill_multiplier': 30,
        'dmg_bonus_p': elemental_dmg,
        'enemylvl': 95
    });
    let freeze_additional_dmg_ult = outgoing_dmg_js({
        'scaling_attribute': stats.final_atk,
        'cr': stats.final_cr + ult_cr,
        'cd': stats.final_cd + ult_cd,
        'def_ignore_p': stats.defignore_p + def_ignore,
        'res_shred': stats.res_ignore + res_shred,
        'vulnerability': vuln,
        'skill_multiplier': 50,
        'dmg_bonus_p': elemental_dmg,
        'enemylvl': 95
    });
    let freeze_total_dmg = (2 * freeze_additional_dmg_ult + freeze_additional_dmg) / 3;
    let freeze_chance = hit_prob(60, stats.final_ehr);
    let benediction_ult = outgoing_dmg_js({
        'scaling_attribute': stats.final_atk,
        'cr': stats.final_cr + ult_cr,
        'cd': stats.final_cd + ult_cd,
        'def_ignore_p': stats.defignore_p + def_ignore,
        'res_shred': stats.res_ignore + res_shred,
        'vulnerability': vuln,
        'skill_multiplier': 192,
        'dmg_bonus_p': stats.damage_bonus + sup_damage_bonus,
        'enemylvl': 95
    });
    let a2_total = a2 + 2 * a2_ult;
    let benediction_total = benediction_ult + benediction;
    let score = skill_primary + skill_primary_ult + ult_primary_ult + fua_primary + fua_primary_ult + a2_total + freeze_total_dmg * freeze_chance + benediction_total;
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
        trace_ice:trace_ice,
        The_Ashblazing_Grand_Duke_ATK_p: 0,
        count_conditionals: false,
    });

    let lbstats = [
        ["ATK", String(Math.floor(stats_display.final_atk))],
        ["CR", trim_after_decimal(stats_display.final_cr) + "%"],
        ["CD", trim_after_decimal(stats_display.final_cd) + "%"],
        ["Ice", trim_after_decimal(stats_display.ice)],
        ["EHR", trim_after_decimal(stats_display.final_ehr)],
        ["SPD", trim_after_decimal(stats_display.final_spd)]
    ];

    let calcDetails = [
        ['E6S5 Pearls Keel Pela, E6S5 Cogs Keel Tingyun (Soulsteel up all the time, LC at max stacks)', ""],
        ["Skill", String(Math.floor(skill_primary))],
        ['FUA', String(Math.floor(fua_primary))],
        ["ULT", String(Math.floor(ult_primary_ult))],
        ['FUA (after ult)', String(Math.floor(fua_primary_ult))],        
        ["Skill (after ult)", String(Math.floor(skill_primary_ult))],
        ["Benediction", String(Math.floor(benediction_total))],
        ["A2 (before + 2×after ult)", String(Math.floor(a2_total))],
        ["Freeze × Chance", String(Math.floor(freeze_total_dmg)) + " × " + freeze_chance.toFixed(2)],
        ["SPD after A6", trim_after_decimal(stats.final_spd)],
    ];
    

    return [Math.floor(score), stats.final_spd, lbstats, calcDetails];

}