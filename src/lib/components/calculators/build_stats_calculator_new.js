import { getRelicSets } from "$lib/components/buildSuggestions/BuildSuggestions.js";

export function BuildStatsCalculatorNew(params){
        let defaultValues = {
            build: undefined,
            base_hp: 0,
            base_atk: 0,
            base_def: 0,
            base_spd: 0,
            trace_spd_f: 0,
            trace_atk_p: 0,
            trace_defshred : 0,
            trace_atk_f: 0,
            trace_cr_p: 0,
            trace_cd_p: 0,
            trace_spd_p: 0,
            trace_ehr_p: 0,
            trace_hp_p: 0,
            trace_def_p: 0,
            trace_res_p: 0,
            trace_phys: 0,
            trace_qua: 0,
            trace_fire: 0,
            trace_imag: 0,
            trace_ice: 0,
            trace_err: 0,
            trace_fire: 0,
            trace_damage_bonus: 0,
            trace_break_effect:0,
            trace_dot_bonus : 0,
            count_conditionals: true,
        };
        var params = {...defaultValues, ...params};
        var build = params.build;
        build['rs'] = getRelicSets(build['r']);
        try{
        var count_conditionals = params.count_conditionals;
        var self_ult_used = params.ult_used;
            
        var self_build = build;
        // base stats
        var self_base_cr = 5;
        var self_base_cd = 50;
        var self_base_hp = params.base_hp;
        var self_base_atk = params.base_atk;
        var self_base_def = params.base_def;
        var self_base_spd = params.base_spd;
        // stat modifiers
        var self_hp_f = 0;
        var self_atk_f = params.trace_atk_f;
        var self_def_f = 0;
        var self_res_ignore = 0;
        var self_defignore_p = params.trace_defshred;
        var self_spd_f = params.trace_spd_f;
        var self_spd_p = params.trace_spd_p;
        var self_hp_p = params.trace_hp_p;
        var self_atk_p = params.trace_atk_p;
        var self_def_p = params.trace_def_p;
        var self_cr_p = params.trace_cr_p;
        var self_cd_p = params.trace_cd_p;
        var self_ohb_p = 0; // outgoing healing bonus
        var self_ehr_p = params.trace_ehr_p;
        var self_phys = params.trace_phys;
        var self_fire = params.trace_fire;
        var self_ice = params.trace_ice;
        var self_lightn = 0;
        var self_wind = 0;
        var self_qua = params.trace_qua;
        var self_imag = params.trace_imag;
        var self_be_p = params.trace_break_effect;
        var self_err_p = 100 + params.trace_err;
        var self_res_p = params.trace_res_p;
        var self_ultdmg_p = 0;
        var self_flwupdmg_p = 0;
        var self_skilldmg_p = 0;
        var self_basicdmg_p = 0;
        var self_shield_absorb_p = 0;
        var self_damage_bonus = params.trace_damage_bonus;
        var self_dot_bonus = params.trace_dot_bonus;
        var self_dmg_red_1 = 0; // wuther
        var self_final_atk = 0;
        var self_final_hp = 0;
        var self_final_def = 0;
        var self_final_spd = 0;
        var self_final_cr = 0;
        var self_final_cd = 0;
        var self_final_ehr = 0;
        var self_final_break = 0;
        var self_final_res = 0;
        var self_final_qua = 0;
        var self_final_wind = 0;
        var self_final_lightn = 0;
        var self_final_phys = 0;
        var self_final_err = 0;
        //
        get_stat_modifiers_from_build()
        var result = finalized_stats();
        } catch (error) {
            console.log(error);
        }
        return result;

    function finalized_stats(){
        return {
            final_hp : self_final_hp,
            final_def : self_final_def,
            final_atk : self_final_atk,
            ohb_p : self_ohb_p,
            dmg_red_1: self_dmg_red_1,
            final_res : self_final_res,
            final_spd : self_final_spd,
            final_err : self_final_err,
            defignore_p : self_defignore_p,
            final_qua : self_final_qua,
            fire : self_fire,
            ice : self_ice,
            skilldmg_p : self_skilldmg_p,
            final_cr : self_final_cr,
            final_cd : self_final_cd,
            ultdmg_p : self_ultdmg_p,
            damage_bonus : self_damage_bonus,
            flwupdmg_p : self_flwupdmg_p,
            res_ignore :self_res_ignore,
            final_wind : self_final_wind,
            final_lightn : self_final_lightn,
            lightn : self_final_lightn,
            basicdmg_p : self_basicdmg_p,
            final_ehr : self_final_ehr,
            final_break : self_final_break,
            dot_bonus:self_dot_bonus,
        }
    }

    function get_stat_modifiers_from_build(){
        get_mainstats()
        get_substats()
        calc_final_stats() // for conditionals
        get_set_effects()
        calc_final_stats() // for final
    }


    function get_mainstats(){
        for (let relic of self_build['r']){
            let main_s = relic['m']
            let p = main_s[1].includes("%");
            let main_val = parseFloat(main_s[1].replace('%',''));
            let main_name = main_s[0].toLowerCase();
            if (p){
                if (main_name.includes('cr')){
                    self_cr_p += main_val;}
                else if (main_name.includes('cd')){
                    self_cd_p += main_val;
                }
                else if (main_name.includes('hp')){
                    self_hp_p += main_val;}
                else if (main_name.includes('atk')){
                    self_atk_p += main_val;}
                else if (main_name.includes('def')){
                    self_def_p += main_val;}
                else if (main_name.includes('ehr')){
                    self_ehr_p += main_val;}
                else if (main_name.includes('br')){
                    self_be_p += main_val;}
                else if (main_name.includes('heal')){
                    self_ohb_p += main_val;}
                else if (main_name.includes('phys')){
                    self_phys += main_val;}
                else if (main_name.includes('fire')){
                    self_fire += main_val;}
                else if (main_name.includes('ice')){
                    self_ice += main_val;}
                else if (main_name.includes('lightn')){
                    self_lightn += main_val;}
                else if (main_name.includes('wind')){
                    self_wind += main_val;}
                else if (main_name.includes('qua')){
                    self_qua += main_val;}
                else if (main_name.includes('img')){
                    self_imag += main_val;}
                else if (main_name.includes('err')){
                    self_err_p += main_val;}
                else if (main_name.includes('res')){
                    self_res_p += main_val;}
                }
            else{
                if (main_name.includes('hp')){
                    self_hp_f += main_val;}
                else if (main_name.includes('def')){
                    self_def_f += main_val;}
                else if (main_name.includes('atk')){
                    self_atk_f += main_val;}
                else if (main_name.includes('spd')){
                    self_spd_f += main_val;}
                }
       }
    }

    function get_set_effects(){
        let relic_sets = JSON.parse(JSON.stringify(self_build['rs']));
        let is_dict = false;
        for (let relic_set of self_build['rs']) {
            if (typeof relic_set === 'object' && relic_set !== null && !Array.isArray(relic_set)) {
                is_dict = true;
                break;
            }
        }

        if (!is_dict) {
            relic_sets = [];
            for (let relic_set of self_build['rs']) {
                let set_id = relic_set[0];
                let cnt = relic_set[1];
                relic_sets.push({'id' : set_id, 'cnt' : cnt});
            }
        }
        
        for (let relic_set of relic_sets) {
            let set_id = relic_set['id'];
            let cnt = relic_set['cnt'];
        
            if (set_id === "101") { // passerby
                if (cnt === 2) {
                    self_ohb_p += 10;
                }
            } else if (set_id === "102") { // musketeer
                if (cnt === 2) {
                    self_atk_p += 12;
                } else if (cnt === 4) {
                    self_basicdmg_p += 10;
                    self_spd_p += 6;
                }
            } else if (set_id === "103") { // purity palace
                if (cnt === 2) {
                    self_def_p += 15;
                } else if (cnt === 4) {
                    self_shield_absorb_p += 20;
                }
            } else if (set_id === "104") { // hunter of glacial forest
                if (cnt === 2) {
                    self_ice += 10;
                } 
                else if (cnt === 4 && count_conditionals) {
                    if (self_ult_used && self_build['k'].includes("1212")){
                        self_cd_p += 25;
                    }
                } 
            } else if (set_id === "105") { // Champion of Streetwise Boxing
                if (cnt === 2) {
                    self_phys += 10;
                } else if (cnt === 4 && count_conditionals) {       
                    self_atk_p += 25;
                }
            } else if (set_id === "106") { // guard of wuthering snow
                if (cnt === 2) {
                    self_dmg_red_1 += 8;
                }
            } 
            else if (set_id === "107") { // firesmith of lava-forging
                if (cnt === 2) {
                    self_fire += 10;
                } else if (cnt === 4) {
                    self_skilldmg_p += 12;
                    if (self_build['k'].includes("1003") && count_conditionals) {
                        self_fire += 1.2;
                    } 
                }
            } else if (set_id === "108") { // genius
                if (cnt === 2) {
                    self_qua += 10;
                } else if (cnt === 4) {
                    if (self_build['k'].includes("1102") || self_build['k'].includes("1006") || self_build['k'].includes("1201")) {
                        self_defignore_p += 20;
                    } else {
                        self_defignore_p += 10;
                    }
                }
            } else if (set_id === "109") { // band of sizzling thunder
                if (cnt === 2) {
                    self_lightn += 10;
                } else if (cnt === 4 && count_conditionals) {
                    self_atk_p += 20;
                }
            } else if (set_id === "111") { // thief of shooting meteor
                if (cnt === 2) {
                    self_be_p += 16;
                } else if (cnt === 4) {
                    self_be_p += 16;
                }
            } else if (set_id === "112") { // wastelander
                if (cnt === 2) {
                    self_imag += 10;
                } else if (cnt === 4 && count_conditionals) {
                    self_cr_p += 10;
                }
            } else if (set_id === "113") { // longevous disciple
                if (cnt === 2) {
                    self_hp_p += 12;
                } else if (cnt === 4 && count_conditionals) {
                    self_cr_p += 16;
                }
            } else if (set_id === "114") { // Messenger Traversing Hackerspace
                if (cnt === 2) {
                    self_spd_p += 6;
                } else if (cnt === 4) {
                    self_spd_p += 12;
                }
            } else if (set_id === "115") { // The Ashblazing Grand Duke
                let stack_atk_p = 6 * 0.8; // pareto stack
                if (cnt === 2) {
                    self_flwupdmg_p += 20;
                } else if (cnt === 4 && count_conditionals) {
                    if (self_build['k'].includes("1005")) { // kafker
                        self_atk_p += 6 * stack_atk_p;
                    } else if (self_build['k'].includes("1204")){ // jing yuan
                        self_atk_p += 8 * stack_atk_p;
                    } else if (self_build['k'].includes("1003")){ // himeko
                        self_atk_p += 8 * stack_atk_p;
                    } else if (self_build['k'].includes("1107")){ // clara
                        self_atk_p += 3 * stack_atk_p;
                    } 
                }
            } else if (set_id === "116") { // Prisoner in Deep Confinement
                if (cnt === 2) {
                    self_atk_p += 12;
                } else if (cnt === 4) {
                    if (self_build['k'].includes("1005")) {
                        self_defignore_p += 18;
                    } 
                }
            } else if (set_id === "110") { // eagle of twilight lane
                if (cnt === 2) {
                    self_wind += 10;
                }
            } 
            // ornaments
            if (set_id === "301" && cnt === 2) { // space sealing station
                // if seele always give 24, otherwise do calc
                self_atk_p += 12;
                if (count_conditionals) {
                    calc_final_stats();
                    if (self_final_spd > 120) {
                        self_atk_p += 12;
                    }
                }
            } else if (set_id === "306" && cnt === 2) { // inert salsotto in set_name 
                self_cr_p += 8;
                calc_final_stats();
                if (self_final_cr >= 50) {
                    self_ultdmg_p += 15;
                    self_flwupdmg_p += 15;
                }
            } else if (set_id === "309" && cnt === 2) { // rutilant
                self_cr_p += 8;
                calc_final_stats();
                if (self_final_cr >= 70) {
                    self_skilldmg_p += 20;
                    self_basicdmg_p += 20;
                    }
                } else if (set_id === "305" && cnt === 2) { // celestial differentiator
                    self_cd_p += 16;
                } else if (set_id === "308" && cnt === 2) { // sprightly vonwacq
                    self_err_p += 5;
                } else if (set_id === "303" && cnt === 2) { // Pan-Galactic Commercial Enterprise
                    self_ehr_p += 10;
                    if (count_conditionals) {
                        self_atk_p += Math.min(self_ehr_p * 0.25, 25);
                    }
                } else if (set_id === "307" && cnt === 2) { // kingdom of banditry
                    self_be_p += 16;
                    if (count_conditionals) {
                        calc_final_stats();
                        if (self_final_spd >= 145) {
                            self_be_p += 20;
                        }
                    }
                } else if (set_id === "304" && cnt === 2) { // belobog of the architects
                    self_def_p += 15;
                    if (count_conditionals) {
                        calc_final_stats();
                        if (self_ehr_p >= 50) {
                            self_def_p += 15;
                        }
                    }
                } else if (set_id === "302" && cnt === 2) { // fleet of ageless
                    self_hp_p += 12;
                    if (count_conditionals) {
                        calc_final_stats();
                        if (self_final_spd > 120) {
                            self_atk_p += 8;
                        }
                    }
                } else if (set_id === "310" && cnt === 2) { // broken keel
                    self_res_p += 10;
                    if (count_conditionals) {
                        calc_final_stats();
                        if (self_final_res > 30) {
                            self_cd_p += 10;
                        }
                    }
                } else if (set_id === "311" && cnt === 2) { // Firmament Frontline Glamoth
                    self_atk_p += 12;
                    if (count_conditionals) {
                        calc_final_stats();
                        if (self_final_spd >= 160) {
                            self_damage_bonus += 18;
                        } else if (self_final_spd >= 135) {
                            self_damage_bonus += 12;
                        }
                    }
                } else if (set_id === "312" && cnt === 2) { // penacony
                    self_err_p += 5;
                }
            }
        }


        function get_substats() {
            for (let relic of self_build['r']) {
                for (let sub of relic['sb']) {
                    let p  = sub[1].includes("%");
                    let sub_val = parseFloat(sub[1].replace('%',''));
                    let sub_name = sub[0].toLowerCase();
                    if (p) {
                        if (sub_name.includes('cr')) {
                            self_cr_p += sub_val;
                        } else if (sub_name.includes('cd')) {
                            self_cd_p += sub_val;
                        } else if (sub_name.includes('hp')) {
                            self_hp_p += sub_val;
                        } else if (sub_name.includes('atk')) {
                            self_atk_p += sub_val;
                        } else if (sub_name.includes('def')) {
                            self_def_p += sub_val;
                        } else if (sub_name.includes('ehr')) {
                            self_ehr_p += sub_val;
                        } else if (sub_name.includes('res')) {
                            self_res_p += sub_val;
                        } else if ('br' === sub_name) {
                            self_be_p += sub_val;
                        }
                    } else {
                        if (sub_name.includes('hp')) {
                            self_hp_f += sub_val;
                        } else if (sub_name.includes('atk')) {
                            self_atk_f += sub_val;
                        } else if (sub_name.includes('def')) {
                            self_def_f += sub_val;
                        } else if (sub_name.includes('spd')) {
                            self_spd_f += sub_val;
                        }
                    }
                }
            }
        }
        

        function calc_final_stats() {
            self_final_atk = self_base_atk * (1 + self_atk_p/100) + self_atk_f;
            self_final_hp = self_base_hp * (1 + self_hp_p/100) + self_hp_f;
            self_final_def = self_base_def * (1 + self_def_p/100) + self_def_f;
            self_final_spd = self_base_spd * (1 + self_spd_p/100) + self_spd_f;
            self_final_cr = self_base_cr + self_cr_p;
            self_final_cd = self_base_cd + self_cd_p;
            self_final_ehr = self_ehr_p;
            self_final_err = self_err_p;
            self_final_break = self_be_p;
            self_final_res = self_res_p;
        
            self_final_qua = self_qua;
            self_final_wind = self_wind;
            self_final_phys = self_phys;
            self_final_lightn = self_lightn;
        }
    }



function get_breakpoint(spd, breakpoints) {
    for (let i = breakpoints.length - 1; i >= 0; i--) {
        if (breakpoints[i] && spd >= parseFloat(breakpoints[i])) {
            return "_" + Math.ceil(parseFloat(breakpoints[i])).toString();
        }
    }
    return "";
}

export function assign_lb_to_build(build, ctgrname, score, display_stats, spd, breakpoints, calcDetails) {
    if (!('lb' in build)) build['lb'] = {};
    if (!('lbstats' in build)) build['lbstats'] = [];
    if (!('calcDetails' in build)) build['calcDetails'] = [];
    if (!('effSpd' in build)) build['effSpd'] = {};
    if (!('frontScore' in build)) build['frontScore'] = {};

    let spd_ctgr = get_breakpoint(spd, breakpoints);
    ctgrname += spd_ctgr;
    build['calcDetails'][ctgrname] = calcDetails;
    build['lbstats'][ctgrname] = display_stats;
    build['effSpd'][ctgrname] = trim_after_decimal(spd);
    build['frontScore'][ctgrname] = score;
    return build;
}

function trim_after_decimal(x) {
    let x_split = x.toString().split(".");
    if (x_split.length == 1) return x_split[0];
    
    let formatted_x = x_split[0] + "." + x_split[1][0];
    
    return formatted_x;
}


// def abbreviateStatMihomo(stat_name):
//     statShorthands = {
//         "CRIT Rate" : "CR",
//         "CRIT DMG" : "CD",
//         "Break Effect" : "BR",
//         "Effect Hit Rate" : "EHR",
//         "Effect RES" : "RES",
//         "Quantum DMG Boost" : "Qua",
//         "Lightning DMG Boost" : "Lightn",
//         "Physical DMG Boost" : "Phys",
//         "Outgoing Healing Boost" : "Heal",
//         "Wind DMG Boost" : "Wind",
//         "Energy Regeneration Rate" : "ERR",
//         "Fire DMG Boost" : "Fire",
//         "Imaginary DMG Boost" : "Img",
//         "Ice DMG Boost" : "Ice"
//     }
//     if stat_name in statShorthands:
//         return statShorthands[stat_name]
//     else:
//         return stat_name
    

// import math
// def get_breakpoint(spd, breakpoints):
//     for i in range(len(breakpoints) - 1, -1, -1):
//         if breakpoints[i] and spd >= float(breakpoints[i]):
//             return "_" + str(math.ceil(float(breakpoints[i])))
//     return ""



// def assign_lb_to_build(build, ctgrname, score, display_stats, spd, breakpoints):
//         spd_ctgr = get_breakpoint(spd, breakpoints)
//         ctgrname += spd_ctgr
//         build['lb'][ctgrname] = { 'sc' : score }
//         build['lbstats'] = display_stats
//         return build

// def assign_lb_to_build_without_display(build, ctgrname, score, spd, breakpoints):
//         spd_ctgr = get_breakpoint(spd, breakpoints)
//         ctgrname += spd_ctgr
//         build['lb'][ctgrname] = { 'sc' : score }
//         return build

