import { outgoing_dmg_js, hit_prob, trim_after_decimal } from '$lib/components/calculators/damage_formulas.js';
import { BuildStatsCalculatorNew, assign_lb_to_build } from '$lib/components/calculators/build_stats_calculator_new.js';
import { lc_dict_by_id } from "$lib/components/calculators/lbcalcs/lightcones.js"

// 1205
let char_base_hp = 1086.624;
let char_base_atk = 679.14;
let char_base_spd = 100;

export function score_kafka(build, optimizationTarget) {
    let score = 0;
    let spd = 0;
    let lbstats = [];
    let calcDetails = [];
    let breakpoints = ["", "120.1", "133.34", "142.9", "160.1", "171.5", "200.1"];

    if (optimizationTarget == "" || (optimizationTarget != "" && !optimizationTarget.includes("HUOGNF")))
        if ("23006" == build['lc']['id'] && build['e'] >= 1 && build['lc']['s'] >= 3) {
            breakpoints = ["", "133.34", "142.9", "160.1", "171.5", "200.1"];
            [score, spd, lbstats, calcDetails] = E1S5_23006_PatienceIsAllYouNeed(build);
            let ctgrname = 'E1S5_' + build['lc']['id'];
            build = assign_lb_to_build(build, ctgrname, score, lbstats, spd, breakpoints, calcDetails);
        } else if ("23006" == build['lc']['id'] && build['e'] >= 1) {
            [score, spd, lbstats, calcDetails] = E1S1_23006_PatienceIsAllYouNeed(build);
            let ctgrname = 'E1S1_' + build['lc']['id'];
            build = assign_lb_to_build(build, ctgrname, score, lbstats, spd, breakpoints, calcDetails);
        } else if ("23006" == build['lc']['id']) {
            [score, spd, lbstats, calcDetails] = E0S1_23006_PatienceIsAllYouNeed(build);
            let ctgrname = 'E0S1_' + build['lc']['id'];
            build = assign_lb_to_build(build, ctgrname, score, lbstats, spd, breakpoints, calcDetails);
            [score, spd, lbstats, calcDetails] = E0S1_23006_PatienceIsAllYouNeed(build, true, true);
        } else if ("21001" == build['lc']['id']) {
            [score, spd, lbstats, calcDetails] = E0S5_21001_GoodNightandSleepWell(build);
            let ctgrname = 'E0S5_' + build['lc']['id'];
            build = assign_lb_to_build(build, ctgrname, score, lbstats, spd, breakpoints, calcDetails);
        } else if ("21022" == build['lc']['id']) {
            [score, spd, lbstats, calcDetails] = E0S5_21022_Fermata(build);
            let ctgrname = 'E0S5_' + build['lc']['id'];
            build = assign_lb_to_build(build, ctgrname, score, lbstats, spd, breakpoints, calcDetails);
        } else if ("21008" == build['lc']['id']) {
            [score, spd, lbstats, calcDetails] = E0S5_21008_EyesofthePrey(build);
            let ctgrname = 'E0S5_' + build['lc']['id'];
            build = assign_lb_to_build(build, ctgrname, score, lbstats, spd, breakpoints, calcDetails);
        } else if ("24003" == build['lc']['id']) {
            [score, spd, lbstats, calcDetails] = E0S5_24003_SolitaryHealing(build);
            let ctgrname = 'E0S5_' + build['lc']['id'];
            build = assign_lb_to_build(build, ctgrname, score, lbstats, spd, breakpoints, calcDetails);
        } else if ("23004" == build['lc']['id']) {
            [score, spd, lbstats, calcDetails] = E0S1_23004_IntheNameoftheWorld(build);
            let ctgrname = 'E0S1_' + build['lc']['id'];
            build = assign_lb_to_build(build, ctgrname, score, lbstats, spd, breakpoints, calcDetails);
        }

    if (optimizationTarget == "" || (optimizationTarget != "" && optimizationTarget.includes("HUOGNF")))
        if ("23006" == build['lc']['id'] && build['e'] >= 1 && build['lc']['s'] >= 3) {
            breakpoints = ["", "142.9", "160.1", "171.5", "200.1"];
            [score, spd, lbstats, calcDetails] = E1S5_23006_PatienceIsAllYouNeed(build, true, true);
            let ctgrname = 'E1S5_' + build['lc']['id'] + "HUOGNF";
            build = assign_lb_to_build(build, ctgrname, score, lbstats, spd, breakpoints, calcDetails);
        } else if ("23006" == build['lc']['id'] && build['e'] >= 1) {
            breakpoints = ["", "133.34", "142.9", "160.1", "171.5", "200.1"];
            [score, spd, lbstats, calcDetails] = E1S1_23006_PatienceIsAllYouNeed(build, true, true);
            let ctgrname = 'E1S1_' + build['lc']['id'] + "HUOGNF";
            build = assign_lb_to_build(build, ctgrname, score, lbstats, spd, breakpoints, calcDetails);
        } else if ("23006" == build['lc']['id']) {
            [score, spd, lbstats, calcDetails] = E0S1_23006_PatienceIsAllYouNeed(build, true, true);
            breakpoints = ["", "133.34", "142.9", "160.1", "171.5", "200.1"];
            let ctgrname = 'E0S1_' + build['lc']['id'] + "HUOGNF";
            build = assign_lb_to_build(build, ctgrname, score, lbstats, spd, breakpoints, calcDetails);
        } else if ("21001" == build['lc']['id']) {
            [score, spd, lbstats, calcDetails] = E0S5_21001_GoodNightandSleepWell(build, true, true);
            let ctgrname = 'E0S5_' + build['lc']['id'] + "HUOGNF";
            build = assign_lb_to_build(build, ctgrname, score, lbstats, spd, breakpoints, calcDetails);
        } else if ("21022" == build['lc']['id']) {
            [score, spd, lbstats, calcDetails] = E0S5_21022_Fermata(build, true, true);
            let ctgrname = 'E0S5_' + build['lc']['id'] + "HUOGNF";
            build = assign_lb_to_build(build, ctgrname, score, lbstats, spd, breakpoints, calcDetails);
        } else if ("21008" == build['lc']['id']) {
            [score, spd, lbstats, calcDetails] = E0S5_21008_EyesofthePrey(build, true, true);
            let ctgrname = 'E0S5_' + build['lc']['id'] + "HUOGNF";
            build = assign_lb_to_build(build, ctgrname, score, lbstats, spd, breakpoints, calcDetails);
        } else if ("24003" == build['lc']['id']) {
            [score, spd, lbstats, calcDetails] = E0S5_24003_SolitaryHealing(build, true, true);
            let ctgrname = 'E0S5_' + build['lc']['id'] + "HUOGNF";
            build = assign_lb_to_build(build, ctgrname, score, lbstats, spd, breakpoints, calcDetails);
        } else if ("23004" == build['lc']['id']) {
            [score, spd, lbstats, calcDetails] = E0S1_23004_IntheNameoftheWorld(build, true, true);
            let ctgrname = 'E0S1_' + build['lc']['id'] + "HUOGNF";
            build = assign_lb_to_build(build, ctgrname, score, lbstats, spd, breakpoints, calcDetails);
        }
    return build;
}


function E1S5_23006_PatienceIsAllYouNeed(build, gnf = false, huo = false) {
    let lc_base_atk = lc_dict_by_id['23006']['atk'];
    let lc_base_hp = lc_dict_by_id['23006']['hp'];
    let total_base_atk = char_base_atk + lc_base_atk;
    let total_base_hp = char_base_hp + lc_base_hp;

    let lc_atk_p = 0;
    let lc_cd = 0;
    let lc_cr = 0;
    let lc_hp_p = 0;
    let lc_damage_bonus = 40;
    let lc_dot_bonus = 0;
    let lc_ehr = 0;
    let lc_ult_damage_bonus = 0;
    let lc_skill_damage_bonus = 0;
    let lc_fua_damage_bonus = 0;
    let lc_def_ignore = 0 + (gnf ? 16 : 0) // gnf pearls
    let lc_basic_damage_bonus = 0;
    let lc_break_effect = 0;
    let lc_spd_p = 24;

    let trace_hp_p = 10;
    let trace_fire = 0;
    let trace_atk_p = 28;
    let trace_cd = 0;
    let trace_cr = 0;
    let trace_res = 0;
    let trace_spd_f = 0;
    let trace_spd_p = huo ? 12 : 0; // huo's E1
    let trace_ehr = 18;

    let huo_atk_p = (huo ? 40 : 0) // fleetless lc ult half uptime;
    let stats = BuildStatsCalculatorNew({
        build: build,
        base_atk: total_base_atk,
        trace_atk_p: lc_atk_p + trace_atk_p + huo_atk_p,
        base_hp: total_base_hp,
        trace_hp_p: trace_hp_p + lc_hp_p,
        trace_res_p: trace_res,
        trace_ehr_p: trace_ehr + lc_ehr,
        trace_break_effect: lc_break_effect,
        base_spd: char_base_spd, trace_spd_f: trace_spd_f, trace_spd_p: trace_spd_p + lc_spd_p,
        trace_defshred: lc_def_ignore,
        trace_cr_p: lc_cr + trace_cr,
        trace_cd_p: lc_cd + trace_cd,
        trace_damage_bonus: lc_damage_bonus,
        trace_fire: trace_fire
    });

    // support stuff
    let res_shred = 0;
    let def_ignore = 0;
    let sup_damage_bonus = 0;

    let enemyres = 40 - (gnf ? 10 : 0);
    let e1_dot = 30 * hit_prob(100, stats.final_ehr, enemyres);

    let element_type_dmg = stats.lightn;
    let elemental_dmg = element_type_dmg + stats.damage_bonus + sup_damage_bonus;
    let basic_dmg_p = elemental_dmg + stats.basicdmg_p + lc_basic_damage_bonus;
    let skill_dmg_p = elemental_dmg + stats.skilldmg_p + lc_skill_damage_bonus;
    let fua_dmg_p = elemental_dmg + stats.flwupdmg_p + lc_fua_damage_bonus;
    let ult_dmg_p = elemental_dmg + stats.ultdmg_p + lc_ult_damage_bonus;
    let dot_dmg_p = elemental_dmg + stats.dot_bonus + lc_dot_bonus + e1_dot;

    // 1 targets
    let basic_atk_mult_primary = 0;
    let basic_hp_mult_primary = 0;
    let skill_atk_mult_primary = 160;
    let skill_atk_mult_adj = 60;
    let ult_atk_mult_primary = 80;
    let ult_hp_mult_primary = 0;
    let fua_atk_mult_primary = 140;
    let fua_hp_mult_primary = 0;

    let vuln = gnf ? 4 * 7.6 : 0; // E6 gives 4th stack E5 gives lvl 12 talent

    let skill_atk_primary = outgoing_dmg_js({
        'scaling_attribute': stats.final_atk,
        'cr': stats.final_cr,
        'cd': stats.final_cd,
        'skill_multiplier': skill_atk_mult_primary,
        'def_ignore_p': stats.defignore_p + def_ignore,
        'res_shred': stats.res_ignore + res_shred,
        'dmg_bonus_p': skill_dmg_p,
        'vulnerability': vuln,
        'enemylvl': 95
    })

    let skill_atk_adj = skill_atk_primary * skill_atk_mult_adj / skill_atk_mult_primary;


    let fua_atk_primary = outgoing_dmg_js({
        'scaling_attribute': stats.final_atk,
        'cr': stats.final_cr,
        'cd': stats.final_cd,
        'skill_multiplier': fua_atk_mult_primary,
        'def_ignore_p': stats.defignore_p + def_ignore,
        'res_shred': stats.res_ignore + res_shred,
        'dmg_bonus_p': fua_dmg_p,
        'vulnerability': vuln,
        'enemylvl': 95
    })

    let ult_atk_primary = outgoing_dmg_js({
        'scaling_attribute': stats.final_atk,
        'cr': stats.final_cr,
        'cd': stats.final_cd,
        'skill_multiplier': ult_atk_mult_primary,
        'def_ignore_p': stats.defignore_p + def_ignore,
        'res_shred': stats.res_ignore + res_shred,
        'dmg_bonus_p': ult_dmg_p,
        'vulnerability': vuln,
        'enemylvl': 95
    })

    let kafka_shock_mult = 290
    let kafka_shock = outgoing_dmg_js({
        'scaling_attribute': stats.final_atk,
        'cr': 0,
        'cd': 0,
        'skill_multiplier': kafka_shock_mult,
        'def_ignore_p': stats.defignore_p + def_ignore,
        'res_shred': stats.res_ignore + res_shred,
        'dmg_bonus_p': dot_dmg_p,
        'vulnerability': vuln,
        'enemylvl': 95
    })
    let kafka_shock_chance = hit_prob(130, stats.final_ehr, enemyres);

    let erode_mult = 100;
    let erode = kafka_shock * erode_mult / kafka_shock_mult;
    let erode_chance = hit_prob(100, stats.final_ehr, enemyres);


    let attacks_damage = 3 * (skill_atk_primary + 2 * skill_atk_adj) + 3 * fua_atk_primary + 3 * ult_atk_primary;
    // enemies take 7 actions
    // skill hits them trice so 0.75*3=2.25
    // ult once on 3 targets so 3
    // total dots 7+3+6.75 = 12.25 (before erosion)
    let dots_damage = 12.25 * (kafka_shock * kafka_shock_chance + erode * erode_chance);
    let score = attacks_damage + dots_damage;

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
        ["EHR", trim_after_decimal(stats_display.final_ehr) + "%"],
        ["CR", trim_after_decimal(stats_display.final_cr) + "%"],
        ["CD", trim_after_decimal(stats_display.final_cd) + "%"],
        ["Lightn", trim_after_decimal(stats_display.final_lightn)],
        ["SPD", trim_after_decimal(stats_display.final_spd)]
    ];

    let calcDetails = [
        ["Targets", 3],
        ["Skill primary + 2×Adj", String(Math.floor(skill_atk_primary + 2 * skill_atk_adj))],
        ["FUA", String(Math.floor(fua_atk_primary))],
        ["ULT", String(Math.floor(ult_atk_primary))],
        ["Shock × Chance", String(Math.floor(kafka_shock)) + " × " + kafka_shock_chance.toFixed(2)],
        ["Erode × Chance", String(Math.floor(erode)) + " × " + erode_chance.toFixed(2)],
        ["Eff Da Capo", trim_after_decimal(e1_dot) + "%"],
        ["Eff SPD", trim_after_decimal(stats.final_spd)],
    ];
    if (gnf && huo) {
        calcDetails.unshift(["E6S5 Pearls GNF and E1S1 sig fleetless Huo in team", ""]);
    }
    return [Math.floor(score), stats.final_spd, lbstats, calcDetails];

}


function E1S1_23006_PatienceIsAllYouNeed(build, gnf = false, huo = false) {
    let lc_base_atk = lc_dict_by_id['23006']['atk'];
    let lc_base_hp = lc_dict_by_id['23006']['hp'];
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
    let lc_def_ignore = 0 + (gnf ? 16 : 0) // gnf pearls
    let lc_basic_damage_bonus = 0;
    let lc_break_effect = 0;
    let lc_spd_p = 14.4;

    let trace_hp_p = 10;
    let trace_fire = 0;
    let trace_atk_p = 28;
    let trace_cd = 0;
    let trace_cr = 0;
    let trace_res = 0;
    let trace_spd_f = 0;
    let trace_spd_p = huo ? 12 : 0; // huo's E1
    let trace_ehr = 18;

    let huo_atk_p = (huo ? 40 : 0) // fleetless lc ult half uptime;
    let stats = BuildStatsCalculatorNew({
        build: build,
        base_atk: total_base_atk,
        trace_atk_p: lc_atk_p + trace_atk_p + huo_atk_p,
        base_hp: total_base_hp,
        trace_hp_p: trace_hp_p + lc_hp_p,
        trace_res_p: trace_res,
        trace_ehr_p: trace_ehr + lc_ehr,
        trace_break_effect: lc_break_effect,
        base_spd: char_base_spd, trace_spd_f: trace_spd_f, trace_spd_p: trace_spd_p + lc_spd_p,
        trace_defshred: lc_def_ignore,
        trace_cr_p: lc_cr + trace_cr,
        trace_cd_p: lc_cd + trace_cd,
        trace_damage_bonus: lc_damage_bonus,
        trace_fire: trace_fire
    });

    // support stuff
    let res_shred = 0;
    let def_ignore = 0;
    let sup_damage_bonus = 0;

    let enemyres = 40 - (gnf ? 10 : 0);
    let e1_dot = 30 * hit_prob(100, stats.final_ehr, enemyres);

    let element_type_dmg = stats.lightn;
    let elemental_dmg = element_type_dmg + stats.damage_bonus + sup_damage_bonus;
    let basic_dmg_p = elemental_dmg + stats.basicdmg_p + lc_basic_damage_bonus;
    let skill_dmg_p = elemental_dmg + stats.skilldmg_p + lc_skill_damage_bonus;
    let fua_dmg_p = elemental_dmg + stats.flwupdmg_p + lc_fua_damage_bonus;
    let ult_dmg_p = elemental_dmg + stats.ultdmg_p + lc_ult_damage_bonus;
    let dot_dmg_p = elemental_dmg + stats.dot_bonus + lc_dot_bonus + e1_dot;

    // 1 targets
    let basic_atk_mult_primary = 0;
    let basic_hp_mult_primary = 0;
    let skill_atk_mult_primary = 160;
    let skill_atk_mult_adj = 60;
    let ult_atk_mult_primary = 80;
    let ult_hp_mult_primary = 0;
    let fua_atk_mult_primary = 140;
    let fua_hp_mult_primary = 0;

    let vuln = gnf ? 4 * 7.6 : 0; // E6 gives 4th stack E5 gives lvl 12 talent

    let skill_atk_primary = outgoing_dmg_js({
        'scaling_attribute': stats.final_atk,
        'cr': stats.final_cr,
        'cd': stats.final_cd,
        'skill_multiplier': skill_atk_mult_primary,
        'def_ignore_p': stats.defignore_p + def_ignore,
        'res_shred': stats.res_ignore + res_shred,
        'dmg_bonus_p': skill_dmg_p,
        'vulnerability': vuln,
        'enemylvl': 95
    })

    let skill_atk_adj = skill_atk_primary * skill_atk_mult_adj / skill_atk_mult_primary;


    let fua_atk_primary = outgoing_dmg_js({
        'scaling_attribute': stats.final_atk,
        'cr': stats.final_cr,
        'cd': stats.final_cd,
        'skill_multiplier': fua_atk_mult_primary,
        'def_ignore_p': stats.defignore_p + def_ignore,
        'res_shred': stats.res_ignore + res_shred,
        'dmg_bonus_p': fua_dmg_p,
        'vulnerability': vuln,
        'enemylvl': 95
    })

    let ult_atk_primary = outgoing_dmg_js({
        'scaling_attribute': stats.final_atk,
        'cr': stats.final_cr,
        'cd': stats.final_cd,
        'skill_multiplier': ult_atk_mult_primary,
        'def_ignore_p': stats.defignore_p + def_ignore,
        'res_shred': stats.res_ignore + res_shred,
        'dmg_bonus_p': ult_dmg_p,
        'vulnerability': vuln,
        'enemylvl': 95
    })

    let kafka_shock_mult = 290
    let kafka_shock = outgoing_dmg_js({
        'scaling_attribute': stats.final_atk,
        'cr': 0,
        'cd': 0,
        'skill_multiplier': kafka_shock_mult,
        'def_ignore_p': stats.defignore_p + def_ignore,
        'res_shred': stats.res_ignore + res_shred,
        'dmg_bonus_p': dot_dmg_p,
        'vulnerability': vuln,
        'enemylvl': 95
    })
    let kafka_shock_chance = hit_prob(130, stats.final_ehr, enemyres);

    let erode_mult = 60;
    let erode = kafka_shock * erode_mult / kafka_shock_mult;
    let erode_chance = hit_prob(100, stats.final_ehr, enemyres);


    let attacks_damage = 3 * (skill_atk_primary + 2 * skill_atk_adj) + 3 * fua_atk_primary + 3 * ult_atk_primary;
    // enemies take 7 actions
    // skill hits them trice so 0.75*3=2.25
    // ult once on 3 targets so 3
    // total dots 7+3+6.75 = 12.25 (before erosion)
    let dots_damage = 12.25 * (kafka_shock * kafka_shock_chance + erode * erode_chance);
    let score = attacks_damage + dots_damage;

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
        ["EHR", trim_after_decimal(stats_display.final_ehr) + "%"],
        ["CR", trim_after_decimal(stats_display.final_cr) + "%"],
        ["CD", trim_after_decimal(stats_display.final_cd) + "%"],
        ["Lightn", trim_after_decimal(stats_display.final_lightn)],
        ["SPD", trim_after_decimal(stats_display.final_spd)]
    ];

    let calcDetails = [
        ["Targets", 3],
        ["Skill primary + 2×Adj", String(Math.floor(skill_atk_primary + 2 * skill_atk_adj))],
        ["FUA", String(Math.floor(fua_atk_primary))],
        ["ULT", String(Math.floor(ult_atk_primary))],
        ["Shock × Chance", String(Math.floor(kafka_shock)) + " × " + kafka_shock_chance.toFixed(2)],
        ["Erode × Chance", String(Math.floor(erode)) + " × " + erode_chance.toFixed(2)],
        ["Eff Da Capo", trim_after_decimal(e1_dot) + "%"],
        ["Eff SPD", trim_after_decimal(stats.final_spd)],
    ];
    if (gnf && huo) {
        calcDetails.unshift(["E6S5 Pearls GNF and E1S1 sig fleetless Huo in team", ""]);
    }
    return [Math.floor(score), stats.final_spd, lbstats, calcDetails];

}



function E0S1_23006_PatienceIsAllYouNeed(build, gnf = false, huo = false) {
    let lc_base_atk = lc_dict_by_id['23006']['atk'];
    let lc_base_hp = lc_dict_by_id['23006']['hp'];
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
    let lc_def_ignore = 0 + (gnf ? 16 : 0) // gnf pearls
    let lc_basic_damage_bonus = 0;
    let lc_break_effect = 0;
    let lc_spd_p = 14.4;

    let trace_hp_p = 10;
    let trace_fire = 0;
    let trace_atk_p = 28;
    let trace_cd = 0;
    let trace_cr = 0;
    let trace_res = 0;
    let trace_spd_f = 0;
    let trace_spd_p = huo ? 12 : 0; // huo's E1
    let trace_ehr = 18;

    let huo_atk_p = (huo ? 40 : 0) // fleetless lc ult half uptime;
    let stats = BuildStatsCalculatorNew({
        build: build,
        base_atk: total_base_atk,
        trace_atk_p: lc_atk_p + trace_atk_p + huo_atk_p,
        base_hp: total_base_hp,
        trace_hp_p: trace_hp_p + lc_hp_p,
        trace_res_p: trace_res,
        trace_ehr_p: trace_ehr + lc_ehr,
        trace_break_effect: lc_break_effect,
        base_spd: char_base_spd, trace_spd_f: trace_spd_f, trace_spd_p: trace_spd_p + lc_spd_p,
        trace_defshred: lc_def_ignore,
        trace_cr_p: lc_cr + trace_cr,
        trace_cd_p: lc_cd + trace_cd,
        trace_damage_bonus: lc_damage_bonus,
        trace_fire: trace_fire
    });

    // support stuff
    let res_shred = 0;
    let def_ignore = 0;
    let sup_damage_bonus = 0;

    let element_type_dmg = stats.lightn;
    let elemental_dmg = element_type_dmg + stats.damage_bonus + sup_damage_bonus;
    let basic_dmg_p = elemental_dmg + stats.basicdmg_p + lc_basic_damage_bonus;
    let skill_dmg_p = elemental_dmg + stats.skilldmg_p + lc_skill_damage_bonus;
    let fua_dmg_p = elemental_dmg + stats.flwupdmg_p + lc_fua_damage_bonus;
    let ult_dmg_p = elemental_dmg + stats.ultdmg_p + lc_ult_damage_bonus;
    let dot_dmg_p = elemental_dmg + stats.dot_bonus + lc_dot_bonus;

    // 1 targets
    let basic_atk_mult_primary = 0;
    let basic_hp_mult_primary = 0;
    let skill_atk_mult_primary = 160;
    let skill_atk_mult_adj = 60;
    let ult_atk_mult_primary = 80;
    let ult_hp_mult_primary = 0;
    let fua_atk_mult_primary = 140;
    let fua_hp_mult_primary = 0;

    let vuln = gnf ? 4 * 7.6 : 0; // E6 gives 4th stack E5 gives lvl 12 talent

    let skill_atk_primary = outgoing_dmg_js({
        'scaling_attribute': stats.final_atk,
        'cr': stats.final_cr,
        'cd': stats.final_cd,
        'skill_multiplier': skill_atk_mult_primary,
        'def_ignore_p': stats.defignore_p + def_ignore,
        'res_shred': stats.res_ignore + res_shred,
        'dmg_bonus_p': skill_dmg_p,
        'vulnerability': vuln,
        'enemylvl': 95
    })

    let skill_atk_adj = skill_atk_primary * skill_atk_mult_adj / skill_atk_mult_primary;


    let fua_atk_primary = outgoing_dmg_js({
        'scaling_attribute': stats.final_atk,
        'cr': stats.final_cr,
        'cd': stats.final_cd,
        'skill_multiplier': fua_atk_mult_primary,
        'def_ignore_p': stats.defignore_p + def_ignore,
        'res_shred': stats.res_ignore + res_shred,
        'dmg_bonus_p': fua_dmg_p,
        'vulnerability': vuln,
        'enemylvl': 95
    })

    let ult_atk_primary = outgoing_dmg_js({
        'scaling_attribute': stats.final_atk,
        'cr': stats.final_cr,
        'cd': stats.final_cd,
        'skill_multiplier': ult_atk_mult_primary,
        'def_ignore_p': stats.defignore_p + def_ignore,
        'res_shred': stats.res_ignore + res_shred,
        'dmg_bonus_p': ult_dmg_p,
        'vulnerability': vuln,
        'enemylvl': 95
    })

    let kafka_shock_mult = 290
    let kafka_shock = outgoing_dmg_js({
        'scaling_attribute': stats.final_atk,
        'cr': 0,
        'cd': 0,
        'skill_multiplier': kafka_shock_mult,
        'def_ignore_p': stats.defignore_p + def_ignore,
        'res_shred': stats.res_ignore + res_shred,
        'dmg_bonus_p': dot_dmg_p,
        'vulnerability': vuln,
        'enemylvl': 95
    })
    let enemyres = 40 - (gnf ? 10 : 0);
    let kafka_shock_chance = hit_prob(130, stats.final_ehr, enemyres);

    let erode_mult = 60;
    let erode = kafka_shock * erode_mult / kafka_shock_mult;
    let erode_chance = hit_prob(100, stats.final_ehr, enemyres);


    let attacks_damage = 3 * (skill_atk_primary + 2 * skill_atk_adj) + 3 * fua_atk_primary + 3 * ult_atk_primary;
    // enemies take 7 actions
    // skill hits them trice so 0.75*3=2.25
    // ult once on 3 targets so 3
    // total dots 7+3+6.75 = 12.25 (before erosion)
    let dots_damage = 12.25 * (kafka_shock * kafka_shock_chance + erode * erode_chance);
    let score = attacks_damage + dots_damage;

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
        ["EHR", trim_after_decimal(stats_display.final_ehr) + "%"],
        ["CR", trim_after_decimal(stats_display.final_cr) + "%"],
        ["CD", trim_after_decimal(stats_display.final_cd) + "%"],
        ["Lightn", trim_after_decimal(stats_display.final_lightn)],
        ["SPD", trim_after_decimal(stats_display.final_spd)],
    ];

    let calcDetails = [
        ["Targets", 3],
        ["Skill primary + 2×Adj", String(Math.floor(skill_atk_primary + 2 * skill_atk_adj))],
        ["FUA", String(Math.floor(fua_atk_primary))],
        ["ULT", String(Math.floor(ult_atk_primary))],
        ["Shock × Chance", String(Math.floor(kafka_shock)) + " × " + kafka_shock_chance.toFixed(2)],
        ["Erode × Chance", String(Math.floor(erode)) + " × " + erode_chance.toFixed(2)],
        ["Eff SPD", trim_after_decimal(stats.final_spd)],
    ];
    if (gnf && huo) {
        calcDetails.unshift(["E6S5 Pearls GNF and E1S1 sig fleetless Huo in team", ""]);
    }
    return [Math.floor(score), stats.final_spd, lbstats, calcDetails];

}


function E0S1_23004_IntheNameoftheWorld(build, gnf = false, huo = false) {
    let lc_base_atk = lc_dict_by_id['23004']['atk'];
    let lc_base_hp = lc_dict_by_id['23004']['hp'];
    let total_base_atk = char_base_atk + lc_base_atk;
    let total_base_hp = char_base_hp + lc_base_hp;

    let lc_atk_p = 0;
    let lc_cd = 0;
    let lc_cr = 0;
    let lc_hp_p = 0;
    let lc_damage_bonus = 40;
    let lc_dot_bonus = 0;
    let lc_ehr = 0;
    let lc_ult_damage_bonus = 0;
    let lc_skill_damage_bonus = 0;
    let lc_fua_damage_bonus = 0;
    let lc_def_ignore = 0 + (gnf ? 16 : 0) // gnf pearls
    let lc_basic_damage_bonus = 0;
    let lc_break_effect = 0;

    let trace_hp_p = 10;
    let trace_fire = 0;
    let trace_atk_p = 28;
    let trace_cd = 0;
    let trace_cr = 0;
    let trace_res = 0;
    let trace_spd_f = 0;
    let trace_spd_p = huo ? 12 : 0; // huo's E1
    let trace_ehr = 18;

    let huo_atk_p = (huo ? 40 : 0) // fleetless lc ult half uptime;
    let stats = BuildStatsCalculatorNew({
        build: build,
        base_atk: total_base_atk,
        trace_atk_p: lc_atk_p + trace_atk_p + huo_atk_p,
        base_hp: total_base_hp,
        trace_hp_p: trace_hp_p + lc_hp_p,
        trace_res_p: trace_res,
        trace_ehr_p: trace_ehr + lc_ehr,
        trace_break_effect: lc_break_effect,
        base_spd: char_base_spd, trace_spd_f: trace_spd_f, trace_spd_p: trace_spd_p,
        trace_defshred: lc_def_ignore,
        trace_cr_p: lc_cr + trace_cr,
        trace_cd_p: lc_cd + trace_cd,
        trace_damage_bonus: lc_damage_bonus,
        trace_fire: trace_fire
    });

    // support stuff
    let res_shred = 0;
    let def_ignore = 0;
    let sup_damage_bonus = 0;

    let element_type_dmg = stats.lightn;
    let elemental_dmg = element_type_dmg + stats.damage_bonus + sup_damage_bonus;
    let basic_dmg_p = elemental_dmg + stats.basicdmg_p + lc_basic_damage_bonus;
    let skill_dmg_p = elemental_dmg + stats.skilldmg_p + lc_skill_damage_bonus;
    let fua_dmg_p = elemental_dmg + stats.flwupdmg_p + lc_fua_damage_bonus;
    let ult_dmg_p = elemental_dmg + stats.ultdmg_p + lc_ult_damage_bonus;
    let dot_dmg_p = elemental_dmg + stats.dot_bonus + lc_dot_bonus;

    // 1 targets
    let basic_atk_mult_primary = 0;
    let basic_hp_mult_primary = 0;
    let skill_atk_mult_primary = 160;
    let skill_atk_mult_adj = 60;
    let ult_atk_mult_primary = 80;
    let ult_hp_mult_primary = 0;
    let fua_atk_mult_primary = 140;
    let fua_hp_mult_primary = 0;

    let vuln = gnf ? 4 * 7.6 : 0; // E6 gives 4th stack E5 gives lvl 12 talent

    let skill_atk_primary = outgoing_dmg_js({
        'scaling_attribute': stats.final_atk,
        'cr': stats.final_cr,
        'cd': stats.final_cd,
        'skill_multiplier': skill_atk_mult_primary,
        'def_ignore_p': stats.defignore_p + def_ignore,
        'res_shred': stats.res_ignore + res_shred,
        'dmg_bonus_p': skill_dmg_p,
        'vulnerability': vuln,
        'enemylvl': 95
    })

    let skill_atk_adj = skill_atk_primary * skill_atk_mult_adj / skill_atk_mult_primary;


    let fua_atk_primary = outgoing_dmg_js({
        'scaling_attribute': stats.final_atk,
        'cr': stats.final_cr,
        'cd': stats.final_cd,
        'skill_multiplier': fua_atk_mult_primary,
        'def_ignore_p': stats.defignore_p + def_ignore,
        'res_shred': stats.res_ignore + res_shred,
        'dmg_bonus_p': fua_dmg_p,
        'vulnerability': vuln,
        'enemylvl': 95
    })

    let ult_atk_primary = outgoing_dmg_js({
        'scaling_attribute': stats.final_atk,
        'cr': stats.final_cr,
        'cd': stats.final_cd,
        'skill_multiplier': ult_atk_mult_primary,
        'def_ignore_p': stats.defignore_p + def_ignore,
        'res_shred': stats.res_ignore + res_shred,
        'dmg_bonus_p': ult_dmg_p,
        'vulnerability': vuln,
        'enemylvl': 95
    })

    let kafka_shock_mult = 290
    let kafka_shock = outgoing_dmg_js({
        'scaling_attribute': stats.final_atk,
        'cr': 0,
        'cd': 0,
        'skill_multiplier': kafka_shock_mult,
        'def_ignore_p': stats.defignore_p + def_ignore,
        'res_shred': stats.res_ignore + res_shred,
        'dmg_bonus_p': dot_dmg_p,
        'vulnerability': vuln,
        'enemylvl': 95
    })
    let enemyres = 40 - (gnf ? 10 : 0);
    let kafka_shock_chance = hit_prob(130, stats.final_ehr, enemyres);

    let attacks_damage = 3 * (skill_atk_primary + 2 * skill_atk_adj) + 3 * fua_atk_primary + 3 * ult_atk_primary;
    // enemies take 7 actions
    // skill hits them trice so 0.75*3=2.25
    // ult once on 3 targets so 3
    // total dots 7+3+6.75 = 12.25 (before erosion)
    let dots_damage = 12.25 * kafka_shock * kafka_shock_chance;
    let score = attacks_damage + dots_damage;

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
        ["EHR", trim_after_decimal(stats_display.final_ehr) + "%"],
        ["CR", trim_after_decimal(stats_display.final_cr) + "%"],
        ["CD", trim_after_decimal(stats_display.final_cd) + "%"],
        ["Lightn", trim_after_decimal(stats_display.final_lightn)],
        ["SPD", trim_after_decimal(stats_display.final_spd)]
    ];

    let calcDetails = [
        ["Targets", 3],
        ["Skill primary", String(Math.floor(skill_atk_primary))],
        ["Skill 2×Adj", String(Math.floor(2 * skill_atk_adj))],
        ["FUA", String(Math.floor(fua_atk_primary))],
        ["ULT", String(Math.floor(ult_atk_primary))],
        ["Shock × Chance", String(Math.floor(kafka_shock)) + " × " + kafka_shock_chance.toFixed(2)],
    ];
    if (gnf && huo) {
        calcDetails.unshift(["SPD after Huo E1", trim_after_decimal(stats.final_spd)]);
        calcDetails.unshift(["E6S5 Pearls GNF and E1S1 sig fleetless Huo in team", ""]);
    }
    return [Math.floor(score), stats.final_spd, lbstats, calcDetails];

}


function E0S5_24003_SolitaryHealing(build, gnf = false, huo = false) {
    let lc_base_atk = lc_dict_by_id['24003']['atk'];
    let lc_base_hp = lc_dict_by_id['24003']['hp'];
    let total_base_atk = char_base_atk + lc_base_atk;
    let total_base_hp = char_base_hp + lc_base_hp;

    let lc_atk_p = 0;
    let lc_cd = 0;
    let lc_cr = 0;
    let lc_hp_p = 0;
    let lc_damage_bonus = 0;
    let lc_dot_bonus = 48;
    let lc_ehr = 0;
    let lc_ult_damage_bonus = 0;
    let lc_skill_damage_bonus = 0;
    let lc_fua_damage_bonus = 0;
    let lc_def_ignore = 0 + (gnf ? 16 : 0) // gnf pearls
    let lc_basic_damage_bonus = 0;
    let lc_break_effect = 40;

    let trace_hp_p = 10;
    let trace_fire = 0;
    let trace_atk_p = 28;
    let trace_cd = 0;
    let trace_cr = 0;
    let trace_res = 0;
    let trace_spd_f = 0;
    let trace_spd_p = huo ? 12 : 0; // huo's E1
    let trace_ehr = 18;

    let huo_atk_p = (huo ? 40 : 0) // fleetless lc ult half uptime;
    let stats = BuildStatsCalculatorNew({
        build: build,
        base_atk: total_base_atk,
        trace_atk_p: lc_atk_p + trace_atk_p + huo_atk_p,
        base_hp: total_base_hp,
        trace_hp_p: trace_hp_p + lc_hp_p,
        trace_res_p: trace_res,
        trace_ehr_p: trace_ehr + lc_ehr,
        trace_break_effect: lc_break_effect,
        base_spd: char_base_spd, trace_spd_f: trace_spd_f, trace_spd_p: trace_spd_p,
        trace_defshred: lc_def_ignore,
        trace_cr_p: lc_cr + trace_cr,
        trace_cd_p: lc_cd + trace_cd,
        trace_damage_bonus: lc_damage_bonus,
        trace_fire: trace_fire
    });

    // support stuff
    let res_shred = 0;
    let def_ignore = 0;
    let sup_damage_bonus = 0;

    let element_type_dmg = stats.lightn;
    let elemental_dmg = element_type_dmg + stats.damage_bonus + sup_damage_bonus;
    let basic_dmg_p = elemental_dmg + stats.basicdmg_p + lc_basic_damage_bonus;
    let skill_dmg_p = elemental_dmg + stats.skilldmg_p + lc_skill_damage_bonus;
    let fua_dmg_p = elemental_dmg + stats.flwupdmg_p + lc_fua_damage_bonus;
    let ult_dmg_p = elemental_dmg + stats.ultdmg_p + lc_ult_damage_bonus;
    let dot_dmg_p = elemental_dmg + stats.dot_bonus + lc_dot_bonus;

    // 1 targets
    let basic_atk_mult_primary = 0;
    let basic_hp_mult_primary = 0;
    let skill_atk_mult_primary = 160;
    let skill_atk_mult_adj = 60;
    let ult_atk_mult_primary = 80;
    let ult_hp_mult_primary = 0;
    let fua_atk_mult_primary = 140;
    let fua_hp_mult_primary = 0;

    let vuln = gnf ? 4 * 7.6 : 0; // E6 gives 4th stack E5 gives lvl 12 talent

    let skill_atk_primary = outgoing_dmg_js({
        'scaling_attribute': stats.final_atk,
        'cr': stats.final_cr,
        'cd': stats.final_cd,
        'skill_multiplier': skill_atk_mult_primary,
        'def_ignore_p': stats.defignore_p + def_ignore,
        'res_shred': stats.res_ignore + res_shred,
        'dmg_bonus_p': skill_dmg_p,
        'vulnerability': vuln,
        'enemylvl': 95
    })

    let skill_atk_adj = skill_atk_primary * skill_atk_mult_adj / skill_atk_mult_primary;


    let fua_atk_primary = outgoing_dmg_js({
        'scaling_attribute': stats.final_atk,
        'cr': stats.final_cr,
        'cd': stats.final_cd,
        'skill_multiplier': fua_atk_mult_primary,
        'def_ignore_p': stats.defignore_p + def_ignore,
        'res_shred': stats.res_ignore + res_shred,
        'dmg_bonus_p': fua_dmg_p,
        'vulnerability': vuln,
        'enemylvl': 95
    })

    let ult_atk_primary = outgoing_dmg_js({
        'scaling_attribute': stats.final_atk,
        'cr': stats.final_cr,
        'cd': stats.final_cd,
        'skill_multiplier': ult_atk_mult_primary,
        'def_ignore_p': stats.defignore_p + def_ignore,
        'res_shred': stats.res_ignore + res_shred,
        'dmg_bonus_p': ult_dmg_p,
        'vulnerability': vuln,
        'enemylvl': 95
    })

    let kafka_shock_mult = 290
    let kafka_shock = outgoing_dmg_js({
        'scaling_attribute': stats.final_atk,
        'cr': 0,
        'cd': 0,
        'skill_multiplier': kafka_shock_mult,
        'def_ignore_p': stats.defignore_p + def_ignore,
        'res_shred': stats.res_ignore + res_shred,
        'dmg_bonus_p': dot_dmg_p,
        'vulnerability': vuln,
        'enemylvl': 95
    })
    let enemyres = 40 - (gnf ? 10 : 0);
    let kafka_shock_chance = hit_prob(130, stats.final_ehr, enemyres);

    let attacks_damage = 3 * (skill_atk_primary + 2 * skill_atk_adj) + 3 * fua_atk_primary + 3 * ult_atk_primary;
    // enemies take 7 actions
    // skill hits them trice so 0.75*3=2.25
    // ult once on 3 targets so 3
    // total dots 7+3+6.75 = 12.25 (before erosion)
    let dots_damage = 12.25 * kafka_shock * kafka_shock_chance;
    let score = attacks_damage + dots_damage;

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
        ["EHR", trim_after_decimal(stats_display.final_ehr) + "%"],
        ["CR", trim_after_decimal(stats_display.final_cr) + "%"],
        ["CD", trim_after_decimal(stats_display.final_cd) + "%"],
        ["Lightn", trim_after_decimal(stats_display.final_lightn)],
        ["SPD", trim_after_decimal(stats_display.final_spd)]
    ];

    let calcDetails = [
        ["Targets", 3],
        ["Skill primary", String(Math.floor(skill_atk_primary))],
        ["Skill 2×Adj", String(Math.floor(2 * skill_atk_adj))],
        ["FUA", String(Math.floor(fua_atk_primary))],
        ["ULT", String(Math.floor(ult_atk_primary))],
        ["Shock × Chance", String(Math.floor(kafka_shock)) + " × " + kafka_shock_chance.toFixed(2)],
    ];
    if (gnf && huo) {
        calcDetails.unshift(["SPD after Huo E1", trim_after_decimal(stats.final_spd)]);
        calcDetails.unshift(["E6S5 Pearls GNF and E1S1 sig fleetless Huo in team", ""]);
    }
    return [Math.floor(score), stats.final_spd, lbstats, calcDetails];

}

function E0S5_21008_EyesofthePrey(build, gnf = false, huo = false) {
    let lc_base_atk = lc_dict_by_id['21008']['atk'];
    let lc_base_hp = lc_dict_by_id['21008']['hp'];
    let total_base_atk = char_base_atk + lc_base_atk;
    let total_base_hp = char_base_hp + lc_base_hp;

    let lc_atk_p = 0;
    let lc_cd = 0;
    let lc_cr = 0;
    let lc_hp_p = 0;
    let lc_damage_bonus = 0;
    let lc_dot_bonus = 48
    let lc_ehr = 40
    let lc_ult_damage_bonus = 0;
    let lc_skill_damage_bonus = 0;
    let lc_fua_damage_bonus = 0;
    let lc_def_ignore = 0 + (gnf ? 16 : 0) // gnf pearls
    let lc_basic_damage_bonus = 0;
    let lc_break_effect = 0;

    let trace_hp_p = 10;
    let trace_fire = 0;
    let trace_atk_p = 28;
    let trace_cd = 0;
    let trace_cr = 0;
    let trace_res = 0;
    let trace_spd_f = 0;
    let trace_spd_p = huo ? 12 : 0; // huo's E1
    let trace_ehr = 18;

    let huo_atk_p = (huo ? 40 : 0) // fleetless lc ult half uptime;
    let stats = BuildStatsCalculatorNew({
        build: build,
        base_atk: total_base_atk,
        trace_atk_p: lc_atk_p + trace_atk_p + huo_atk_p,
        base_hp: total_base_hp,
        trace_hp_p: trace_hp_p + lc_hp_p,
        trace_res_p: trace_res,
        trace_ehr_p: trace_ehr + lc_ehr,
        trace_break_effect: lc_break_effect,
        base_spd: char_base_spd, trace_spd_f: trace_spd_f, trace_spd_p: trace_spd_p,
        trace_defshred: lc_def_ignore,
        trace_cr_p: lc_cr + trace_cr,
        trace_cd_p: lc_cd + trace_cd,
        trace_damage_bonus: lc_damage_bonus,
        trace_fire: trace_fire
    });

    // support stuff
    let res_shred = 0;
    let def_ignore = 0;
    let sup_damage_bonus = 0;

    let element_type_dmg = stats.lightn;
    let elemental_dmg = element_type_dmg + stats.damage_bonus + sup_damage_bonus;
    let basic_dmg_p = elemental_dmg + stats.basicdmg_p + lc_basic_damage_bonus;
    let skill_dmg_p = elemental_dmg + stats.skilldmg_p + lc_skill_damage_bonus;
    let fua_dmg_p = elemental_dmg + stats.flwupdmg_p + lc_fua_damage_bonus;
    let ult_dmg_p = elemental_dmg + stats.ultdmg_p + lc_ult_damage_bonus;
    let dot_dmg_p = elemental_dmg + stats.dot_bonus + lc_dot_bonus;

    // 1 targets
    let basic_atk_mult_primary = 0;
    let basic_hp_mult_primary = 0;
    let skill_atk_mult_primary = 160;
    let skill_atk_mult_adj = 60;
    let ult_atk_mult_primary = 80;
    let ult_hp_mult_primary = 0;
    let fua_atk_mult_primary = 140;
    let fua_hp_mult_primary = 0;

    let vuln = gnf ? 4 * 7.6 : 0; // E6 gives 4th stack E5 gives lvl 12 talent

    let skill_atk_primary = outgoing_dmg_js({
        'scaling_attribute': stats.final_atk,
        'cr': stats.final_cr,
        'cd': stats.final_cd,
        'skill_multiplier': skill_atk_mult_primary,
        'def_ignore_p': stats.defignore_p + def_ignore,
        'res_shred': stats.res_ignore + res_shred,
        'dmg_bonus_p': skill_dmg_p,
        'vulnerability': vuln,
        'enemylvl': 95
    })

    let skill_atk_adj = skill_atk_primary * skill_atk_mult_adj / skill_atk_mult_primary;


    let fua_atk_primary = outgoing_dmg_js({
        'scaling_attribute': stats.final_atk,
        'cr': stats.final_cr,
        'cd': stats.final_cd,
        'skill_multiplier': fua_atk_mult_primary,
        'def_ignore_p': stats.defignore_p + def_ignore,
        'res_shred': stats.res_ignore + res_shred,
        'dmg_bonus_p': fua_dmg_p,
        'vulnerability': vuln,
        'enemylvl': 95
    })

    let ult_atk_primary = outgoing_dmg_js({
        'scaling_attribute': stats.final_atk,
        'cr': stats.final_cr,
        'cd': stats.final_cd,
        'skill_multiplier': ult_atk_mult_primary,
        'def_ignore_p': stats.defignore_p + def_ignore,
        'res_shred': stats.res_ignore + res_shred,
        'dmg_bonus_p': ult_dmg_p,
        'vulnerability': vuln,
        'enemylvl': 95
    })

    let kafka_shock_mult = 290
    let kafka_shock = outgoing_dmg_js({
        'scaling_attribute': stats.final_atk,
        'cr': 0,
        'cd': 0,
        'skill_multiplier': kafka_shock_mult,
        'def_ignore_p': stats.defignore_p + def_ignore,
        'res_shred': stats.res_ignore + res_shred,
        'dmg_bonus_p': dot_dmg_p,
        'vulnerability': vuln,
        'enemylvl': 95
    })
    let enemyres = 40 - (gnf ? 10 : 0);
    let kafka_shock_chance = hit_prob(130, stats.final_ehr, enemyres);

    let attacks_damage = 3 * (skill_atk_primary + 2 * skill_atk_adj) + 3 * fua_atk_primary + 3 * ult_atk_primary;
    // enemies take 7 actions
    // skill hits them trice so 0.75*3=2.25
    // ult once on 3 targets so 3
    // total dots 7+3+6.75 = 12.25 (before erosion)
    let dots_damage = 12.25 * kafka_shock * kafka_shock_chance;
    let score = attacks_damage + dots_damage;

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
        ["EHR", trim_after_decimal(stats_display.final_ehr) + "%"],
        ["CR", trim_after_decimal(stats_display.final_cr) + "%"],
        ["CD", trim_after_decimal(stats_display.final_cd) + "%"],
        ["Lightn", trim_after_decimal(stats_display.final_lightn)],
        ["SPD", trim_after_decimal(stats_display.final_spd)]
    ];

    let calcDetails = [
        ["Targets", 3],
        ["Skill primary", String(Math.floor(skill_atk_primary))],
        ["Skill 2×Adj", String(Math.floor(2 * skill_atk_adj))],
        ["FUA", String(Math.floor(fua_atk_primary))],
        ["ULT", String(Math.floor(ult_atk_primary))],
        ["Shock × Chance", String(Math.floor(kafka_shock)) + " × " + kafka_shock_chance.toFixed(2)],
    ];
    if (gnf && huo) {
        calcDetails.unshift(["SPD after Huo E1", trim_after_decimal(stats.final_spd)]);
        calcDetails.unshift(["E6S5 Pearls GNF and E1S1 sig fleetless Huo in team", ""]);
    }
    return [Math.floor(score), stats.final_spd, lbstats, calcDetails];

}

function E0S5_21022_Fermata(build, gnf = false, huo = false) {
    let lc_base_atk = lc_dict_by_id['21022']['atk'];
    let lc_base_hp = lc_dict_by_id['21022']['hp'];
    let total_base_atk = char_base_atk + lc_base_atk;
    let total_base_hp = char_base_hp + lc_base_hp;

    let lc_atk_p = 0;
    let lc_cd = 0;
    let lc_cr = 0;
    let lc_hp_p = 0;
    let lc_damage_bonus = 32;
    let lc_ult_damage_bonus = 0;
    let lc_skill_damage_bonus = 0;
    let lc_fua_damage_bonus = 0;
    let lc_def_ignore = 0 + (gnf ? 16 : 0) // gnf pearls
    let lc_basic_damage_bonus = 0;
    let lc_break_effect = 32;

    let trace_hp_p = 10;
    let trace_fire = 0;
    let trace_atk_p = 28;
    let trace_cd = 0;
    let trace_cr = 0;
    let trace_res = 0;
    let trace_spd_f = 0;
    let trace_spd_p = huo ? 12 : 0; // huo's E1
    let trace_ehr = 18;

    let huo_atk_p = (huo ? 40 : 0) // fleetless lc ult half uptime;
    let stats = BuildStatsCalculatorNew({
        build: build,
        base_atk: total_base_atk,
        trace_atk_p: lc_atk_p + trace_atk_p + huo_atk_p,
        base_hp: total_base_hp,
        trace_hp_p: trace_hp_p + lc_hp_p,
        trace_res_p: trace_res,
        trace_ehr_p: trace_ehr,
        trace_break_effect: lc_break_effect,
        base_spd: char_base_spd, trace_spd_f: trace_spd_f, trace_spd_p: trace_spd_p,
        trace_defshred: lc_def_ignore,
        trace_cr_p: lc_cr + trace_cr,
        trace_cd_p: lc_cd + trace_cd,
        trace_damage_bonus: lc_damage_bonus,
        trace_fire: trace_fire
    });

    // support stuff
    let res_shred = 0;
    let def_ignore = 0;
    let sup_damage_bonus = 0;

    let element_type_dmg = stats.lightn;
    let elemental_dmg = element_type_dmg + stats.damage_bonus + sup_damage_bonus;
    let basic_dmg_p = elemental_dmg + stats.basicdmg_p + lc_basic_damage_bonus;
    let skill_dmg_p = elemental_dmg + stats.skilldmg_p + lc_skill_damage_bonus;
    let fua_dmg_p = elemental_dmg + stats.flwupdmg_p + lc_fua_damage_bonus;
    let ult_dmg_p = elemental_dmg + stats.ultdmg_p + lc_ult_damage_bonus;
    let dot_dmg_p = elemental_dmg;

    // 1 targets
    let basic_atk_mult_primary = 0;
    let basic_hp_mult_primary = 0;
    let skill_atk_mult_primary = 160;
    let skill_atk_mult_adj = 60;
    let ult_atk_mult_primary = 80;
    let ult_hp_mult_primary = 0;
    let fua_atk_mult_primary = 140;
    let fua_hp_mult_primary = 0;

    let vuln = gnf ? 4 * 7.6 : 0; // E6 gives 4th stack E5 gives lvl 12 talent

    let skill_atk_primary = outgoing_dmg_js({
        'scaling_attribute': stats.final_atk,
        'cr': stats.final_cr,
        'cd': stats.final_cd,
        'skill_multiplier': skill_atk_mult_primary,
        'def_ignore_p': stats.defignore_p + def_ignore,
        'res_shred': stats.res_ignore + res_shred,
        'dmg_bonus_p': skill_dmg_p,
        'vulnerability': vuln,
        'enemylvl': 95
    })

    let skill_atk_adj = skill_atk_primary * skill_atk_mult_adj / skill_atk_mult_primary;


    let fua_atk_primary = outgoing_dmg_js({
        'scaling_attribute': stats.final_atk,
        'cr': stats.final_cr,
        'cd': stats.final_cd,
        'skill_multiplier': fua_atk_mult_primary,
        'def_ignore_p': stats.defignore_p + def_ignore,
        'res_shred': stats.res_ignore + res_shred,
        'dmg_bonus_p': fua_dmg_p,
        'vulnerability': vuln,
        'enemylvl': 95
    })

    let ult_atk_primary = outgoing_dmg_js({
        'scaling_attribute': stats.final_atk,
        'cr': stats.final_cr,
        'cd': stats.final_cd,
        'skill_multiplier': ult_atk_mult_primary,
        'def_ignore_p': stats.defignore_p + def_ignore,
        'res_shred': stats.res_ignore + res_shred,
        'dmg_bonus_p': ult_dmg_p,
        'vulnerability': vuln,
        'enemylvl': 95
    })

    let kafka_shock_mult = 290
    let kafka_shock = outgoing_dmg_js({
        'scaling_attribute': stats.final_atk,
        'cr': 0,
        'cd': 0,
        'skill_multiplier': kafka_shock_mult,
        'def_ignore_p': stats.defignore_p + def_ignore,
        'res_shred': stats.res_ignore + res_shred,
        'dmg_bonus_p': dot_dmg_p,
        'vulnerability': vuln,
        'enemylvl': 95
    })
    let enemyres = 40 - (gnf ? 10 : 0);
    let kafka_shock_chance = hit_prob(130, stats.final_ehr, enemyres);

    let attacks_damage = 3 * (skill_atk_primary + 2 * skill_atk_adj) + 3 * fua_atk_primary + 3 * ult_atk_primary;
    // enemies take 7 actions
    // skill hits them trice so 0.75*3=2.25
    // ult once on 3 targets so 3
    // total dots 7+3+6.75 = 12.25 (before erosion)
    let dots_damage = 12.25 * kafka_shock * kafka_shock_chance;
    let score = attacks_damage + dots_damage;

    let stats_display = BuildStatsCalculatorNew({
        build: build,
        base_atk: total_base_atk,
        trace_atk_p: lc_atk_p + trace_atk_p,
        base_hp: total_base_hp,
        trace_hp_p: trace_hp_p + lc_hp_p,
        trace_res_p: trace_res,
        trace_ehr_p: trace_ehr,
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
        ["EHR", trim_after_decimal(stats_display.final_ehr) + "%"],
        ["CR", trim_after_decimal(stats_display.final_cr) + "%"],
        ["CD", trim_after_decimal(stats_display.final_cd) + "%"],
        ["Lightn", trim_after_decimal(stats_display.final_lightn)],
        ["SPD", trim_after_decimal(stats_display.final_spd)]
    ];

    let calcDetails = [
        ["Targets", 3],
        ["Skill primary", String(Math.floor(skill_atk_primary))],
        ["Skill 2×Adj", String(Math.floor(2 * skill_atk_adj))],
        ["FUA", String(Math.floor(fua_atk_primary))],
        ["ULT", String(Math.floor(ult_atk_primary))],
        ["Shock × Chance", String(Math.floor(kafka_shock)) + " × " + kafka_shock_chance.toFixed(2)],
    ];
    if (gnf && huo) {
        calcDetails.unshift(["SPD after Huo E1", trim_after_decimal(stats.final_spd)]);
        calcDetails.unshift(["E6S5 Pearls GNF and E1S1 sig fleetless Huo in team", ""]);
    }
    return [Math.floor(score), stats.final_spd, lbstats, calcDetails];

}

function E0S5_21001_GoodNightandSleepWell(build, gnf = false, huo = false) {
    let lc_base_atk = lc_dict_by_id['21001']['atk'];
    let lc_base_hp = lc_dict_by_id['21001']['hp'];
    let total_base_atk = char_base_atk + lc_base_atk;
    let total_base_hp = char_base_hp + lc_base_hp;

    let lc_atk_p = 0;
    let lc_cd = 0;
    let lc_cr = 0;
    let lc_hp_p = 0;
    let lc_damage_bonus = 72;
    let lc_ult_damage_bonus = 0;
    let lc_skill_damage_bonus = 0;
    let lc_fua_damage_bonus = 0;
    let lc_def_ignore = 0 + (gnf ? 16 : 0) // gnf pearls
    let lc_basic_damage_bonus = 0;

    let trace_hp_p = 10;
    let trace_fire = 0;
    let trace_atk_p = 28;
    let trace_cd = 0;
    let trace_cr = 0;
    let trace_res = 0;
    let trace_spd_f = 0;
    let trace_spd_p = huo ? 12 : 0; // huo's E1
    let trace_ehr = 18;

    let huo_atk_p = (huo ? 40 : 0) // fleetless lc ult half uptime;
    let stats = BuildStatsCalculatorNew({
        build: build,
        base_atk: total_base_atk,
        trace_atk_p: lc_atk_p + trace_atk_p + huo_atk_p,
        base_hp: total_base_hp,
        trace_hp_p: trace_hp_p + lc_hp_p,
        trace_res_p: trace_res,
        trace_ehr_p: trace_ehr,
        base_spd: char_base_spd, trace_spd_f: trace_spd_f, trace_spd_p: trace_spd_p,
        trace_defshred: lc_def_ignore,
        trace_cr_p: lc_cr + trace_cr,
        trace_cd_p: lc_cd + trace_cd,
        trace_damage_bonus: lc_damage_bonus,
        trace_fire: trace_fire
    });

    // support stuff
    let res_shred = 0;
    let def_ignore = 0;
    let sup_damage_bonus = 0;

    let element_type_dmg = stats.lightn;
    let elemental_dmg = element_type_dmg + stats.damage_bonus + sup_damage_bonus;
    let basic_dmg_p = elemental_dmg + stats.basicdmg_p + lc_basic_damage_bonus;
    let skill_dmg_p = elemental_dmg + stats.skilldmg_p + lc_skill_damage_bonus;
    let fua_dmg_p = elemental_dmg + stats.flwupdmg_p + lc_fua_damage_bonus;
    let ult_dmg_p = elemental_dmg + stats.ultdmg_p + lc_ult_damage_bonus;
    let dot_dmg_p = elemental_dmg;

    // 1 targets
    let basic_atk_mult_primary = 0;
    let basic_hp_mult_primary = 0;
    let skill_atk_mult_primary = 160;
    let skill_atk_mult_adj = 60;
    let ult_atk_mult_primary = 80;
    let ult_hp_mult_primary = 0;
    let fua_atk_mult_primary = 140;
    let fua_hp_mult_primary = 0;

    let vuln = gnf ? 4 * 7.6 : 0; // E6 gives 4th stack E5 gives lvl 12 talent

    let skill_atk_primary = outgoing_dmg_js({
        'scaling_attribute': stats.final_atk,
        'cr': stats.final_cr,
        'cd': stats.final_cd,
        'skill_multiplier': skill_atk_mult_primary,
        'def_ignore_p': stats.defignore_p + def_ignore,
        'res_shred': stats.res_ignore + res_shred,
        'dmg_bonus_p': skill_dmg_p,
        'vulnerability': vuln,
        'enemylvl': 95
    })

    let skill_atk_adj = skill_atk_primary * skill_atk_mult_adj / skill_atk_mult_primary;


    let fua_atk_primary = outgoing_dmg_js({
        'scaling_attribute': stats.final_atk,
        'cr': stats.final_cr,
        'cd': stats.final_cd,
        'skill_multiplier': fua_atk_mult_primary,
        'def_ignore_p': stats.defignore_p + def_ignore,
        'res_shred': stats.res_ignore + res_shred,
        'dmg_bonus_p': fua_dmg_p,
        'vulnerability': vuln,
        'enemylvl': 95
    })

    let ult_atk_primary = outgoing_dmg_js({
        'scaling_attribute': stats.final_atk,
        'cr': stats.final_cr,
        'cd': stats.final_cd,
        'skill_multiplier': ult_atk_mult_primary,
        'def_ignore_p': stats.defignore_p + def_ignore,
        'res_shred': stats.res_ignore + res_shred,
        'dmg_bonus_p': ult_dmg_p,
        'vulnerability': vuln,
        'enemylvl': 95
    })

    let kafka_shock_mult = 290
    let kafka_shock = outgoing_dmg_js({
        'scaling_attribute': stats.final_atk,
        'cr': 0,
        'cd': 0,
        'skill_multiplier': kafka_shock_mult,
        'def_ignore_p': stats.defignore_p + def_ignore,
        'res_shred': stats.res_ignore + res_shred,
        'dmg_bonus_p': dot_dmg_p,
        'vulnerability': vuln,
        'enemylvl': 95
    })
    let enemyres = 40 - (gnf ? 10 : 0);
    let kafka_shock_chance = hit_prob(130, stats.final_ehr, enemyres);

    let attacks_damage = 3 * (skill_atk_primary + 2 * skill_atk_adj) + 3 * fua_atk_primary + 3 * ult_atk_primary;
    // enemies take 7 actions
    // skill hits them trice so 0.75*3=2.25
    // ult once on 3 targets so 3
    // total dots 7+3+6.75 = 12.25 (before erosion)
    let dots_damage = 12.25 * kafka_shock * kafka_shock_chance;
    let score = attacks_damage + dots_damage;

    let stats_display = BuildStatsCalculatorNew({
        build: build,
        base_atk: total_base_atk,
        trace_atk_p: lc_atk_p + trace_atk_p,
        base_hp: total_base_hp,
        trace_hp_p: trace_hp_p + lc_hp_p,
        trace_res_p: trace_res,
        trace_ehr_p: trace_ehr,
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
        ["EHR", trim_after_decimal(stats_display.final_ehr) + "%"],
        ["CR", trim_after_decimal(stats_display.final_cr) + "%"],
        ["CD", trim_after_decimal(stats_display.final_cd) + "%"],
        ["Lightn", trim_after_decimal(stats_display.final_lightn)],
        ["SPD", trim_after_decimal(stats_display.final_spd)]
    ];

    let calcDetails = [
        ["Targets", 3],
        ["Skill primary", String(Math.floor(skill_atk_primary))],
        ["Skill 2×Adj", String(Math.floor(2 * skill_atk_adj))],
        ["FUA", String(Math.floor(fua_atk_primary))],
        ["ULT", String(Math.floor(ult_atk_primary))],
        ["Shock × Chance", String(Math.floor(kafka_shock)) + " × " + kafka_shock_chance.toFixed(2)],
    ];
    if (gnf && huo) {
        calcDetails.unshift(["SPD after Huo E1", trim_after_decimal(stats.final_spd)]);
        calcDetails.unshift(["E6S5 Pearls GNF and E1S1 sig fleetless Huo in team", ""]);
    }
    return [Math.floor(score), stats.final_spd, lbstats, calcDetails];

}