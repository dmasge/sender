export const lc_dict_by_id = {
    '23011' : {
        'hp' : 1270.08,
        'atk' : 423.36,
        'def' : 529.2,
    },
    '24002' : {
        'hp' : 1058.4,
        'atk' : 423.36,
        'def' : 529.2,
    },
    '21009' : {
        'hp' : 952.56,
        'atk' : 423.36,
        'def' : 396.9,
    },
    '23005' : {
        'hp' : 1058.4,
        'atk' : 476.28,
        'def' : 595.35,
    },
    '21002' : {
        'hp' : 952.56,
        'atk' : 370.44,
        'def' : 463.05,
    }, 
    '23012' : { 
        // Sleep like the dead
        'hp'  : 1058.4,
        'atk' : 582.12,
        'def' : 463.05
    },
    '24001' : { 
        // Cruising in the Stellar Sea
        'hp'  : 952.56,
        'atk' : 529.2,
        'def' : 463.05
    },
    '21010' : {
        // Swordplay
        'hp'  : 952.56,
        'atk' : 476.28,
        'def' : 330.75
    },
    '23001' : {
        // In the Night
        'hp'  : 1058.4,
        'atk' : 582.12,
        'def' : 463.05
    },
    '21027' : {
        // breakfast
        'hp'  : 846.72,
        'atk' : 476.28,
        'def' : 396.9
    },
    '23000' : {
        // Night on the Milky Way
        'hp'  : 1164.24,
        'atk' : 582.12,
        'def' : 396.9
    },
    '21013' : {
        // Make the World Clamor
        'hp'  : 846.72,
        'atk' : 476.28,
        'def' : 396.9
    },
    '21020' : {
        // Geniuses' Repose
        'hp'  : 846.72,
        'atk' : 476.28,
        'def' : 396.9
    },
    '21006' : {
        // The Birth of the Self
        'hp'  : 952.56,
        'atk' : 476.28,
        'def' : 330.75
    },
    '23010' : {
        // Before Dawn
        'hp'  : 1058.4,
        'atk' : 582.12,
        'def' : 463.05
    },
    '21034' : {
        // Today Is Another Peaceful Day
        'hp'  : 846.72,
        'atk' : 529.2,
        'def' : 330.75
    },
    '23014' : {
        // I Shall Be My Own Sword
        'hp'  : 1164.24,
        'atk' : 582.12,
        'def' : 396.9
    },
    '24000' : {
        // On the Fall of an Aeon
        'hp'  : 1058.4,
        'atk' : 529.2,
        'def' : 396.9
    },
    '21012' : {
        // A Secret Vow
        'hp'  : 1058.4,
        'atk' : 476.28,
        'def' : 264.6
    },
    '21019' : {
        // Under the Blue Sky
        'hp'  : 952.56,
        'atk' : 476.28,
        'def' : 330.75
    },
    '23002' : {
        // Something Irreplaceable
        'hp'  : 1164.24,
        'atk' : 582.12,
        'def' : 396.9
    },
    '23009' : {
        // The Unreachable Side
        'hp'  : 1270.08,
        'atk' : 582.12,
        'def' : 330.75
    },
    '21001' : {
        // Good Night and Sleep Well
        'hp'  : 952.56,
        'atk' : 476.28,
        'def' : 330.75
    },
    '21022' : {
        // Fermata
        'hp'  : 952.56,
        'atk' : 476.28,
        'def' : 330.75,
    },
    '21008' : {
        // Eyes of the Prey
        'hp' : 952.56,
        'atk': 476.28,
        'def': 330.75,
    },
    '24003' : {
        // Solitary Healing
        'hp' : 1058.4,
        'atk': 529.2,
        'def': 396.9,
    },
    '23004' : {
        // In the Name of the World
        'hp' : 1058.4,
        'atk': 582.12,
        'def': 463.05,
    },  
    '23006' : {
        // Patience Is All You Need
        'hp' : 1058.4,
        'atk' : 582.12,
        'def' : 463.05,
    }, 
    '23016' : {
        // Worrisome, Blissful
        'hp' : 1058.4,
        'atk' : 582.12,
        'def' : 463.05,
    }, 
    '21003' : {
        // OnlySilenceRemains
        'hp' : 952.56,
        'atk' : 476.28,
        'def' : 330.75,
    }, 
    '23018' : {
        // An Instant Before A Gaze
        'hp' : 1058.4,
        'atk' : 582.12,
        'def' : 463.05,
    },
    '21024' : {
        // River Flows in Spring
        'hp' : 846.72,
        'atk' : 476.28,
        'def' : 396.9,
    }
}

export function get_itn_stack_count(spd) {
    if (spd >= 160) return 6;
    var remainder_100s = spd % 100;
    var stacks = Math.min(Math.max(Math.floor(remainder_100s / 10), 0), 6);
    return stacks;
}

export function sltd_eff_cr(cr) {
    cr = Math.min(Math.max(cr, 5), 100);
    let x = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100];
    let y = [27, 26.5, 26, 25.5, 25, 24, 23, 22, 21, 19, 18, 16, 14, 11, 8, 5, 3, 1, 0.5, 0];
    for (let i = 0; i < x.length - 1; i++) {
        if (x[i] <= cr && cr <= x[i + 1]) {
            let slope = (y[i + 1] - y[i]) / (x[i + 1] - x[i]);
            let cr_b4_resurg = (y[i] + slope * (cr - x[i]));
            return cr_b4_resurg;
        }
    }
    return 0;
}
