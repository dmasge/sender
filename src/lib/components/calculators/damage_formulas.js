export function break_damage(break_mult, break_effect = 0, max_toughness = 360, def_ignore = 0, res_multiplier = 0, vuln_multiplier = 0, broken = false) {
    let level_mult = 3767.5533; // 80 lvl
    def_ignore = Math.min(100, def_ignore);
    let defense = 1000 * (1 - def_ignore / 100);

    let final_dmg = break_mult * level_mult * (0.5 + max_toughness / 120);
    final_dmg *= (1 + break_effect / 100);
    final_dmg *= 1 - (defense / (defense + 200 + 10 * 80));
    final_dmg *= (100 + res_multiplier) / 100;
    final_dmg *= (100 + vuln_multiplier) / 100;
    if (!broken) {
        final_dmg *= 0.9;
    }

    return final_dmg;
}

export function outgoing_dmg_2({
    scaling_attribute = 0,
    cr = 5,
    cd = 50,
    skill_multiplier = 0,
    dmg_bonus_p = 0,
    def_ignore_p = 0,
    res_shred = 0,
    vulnerability = 0,
    extra_multiplier = 0,
    extra_dmg = 0,
    broken = false,
    enemylvl = 80,
    } = {}) {
    let final_dmg = (skill_multiplier / 100 + extra_multiplier) * scaling_attribute + extra_dmg;
    
    final_dmg *= 1 + dmg_bonus_p / 100;
    
    let defense = (200 + 10 * enemylvl) * (1 - def_ignore_p / 100);
    final_dmg *= 1 - (defense / (defense + 200 + 10 * 80));
    
    final_dmg *= (100 + res_shred) / 100;
    final_dmg *= (100 + vulnerability) / 100;
    if (!broken) {
        final_dmg *= 0.9;
    }
    final_dmg *= (1 + (Math.min(cr, 100) / 100) * (cd / 100));

    return final_dmg;
}


export function hit_prob(base_chance, ehr, enemy_res = 40) {
    return Math.min(base_chance / 100 * (1 + ehr / 100) * (1 - enemy_res / 100), 1);
}

export function trim_after_decimal(x) {
    let x_split = x.toString().split(".");
    if (x_split.length == 1) return x_split[0];

    let formatted_x = x_split[0] + "." + x_split[1][0];

    return formatted_x;
}

export function get_def_mult(DEF, enemylvl = 90) {
    return 1 - (DEF / (DEF + 200 + 10 * enemylvl));
}

export function get_ehp(final_hp, final_def, dmg_red_mult) {
    return final_hp / get_def_mult(final_def) / dmg_red_mult;
}

export function chance_to_resist(res, enemy_ehr_decimal = 0.32, enemy_base_chance_decimal = 1) {
    // lvl 90 kafka shock is default
    return Math.min(1, Math.max(1 - (enemy_base_chance_decimal * (1 + enemy_ehr_decimal) * (1 - res / 100)), 0));
}

export function is_using_err_rope(build) {
    let relics = build['r'];
    for (let i = 0; i < relics.length; i++) {
        let mainstat = relics[i]['m'];
        if (mainstat[0].toLowerCase() == "err") {
            return true;
        }
    }
    return false;
}
