import ach from "$lib/assets/lb/ach.png";
import night from "$lib/assets/lb/lc/night.png";
import cruising from "$lib/assets/lb/lc/cruising.png"
import darkness from "$lib/assets/lb/lc/darkness.png"
import swordplay from "$lib/assets/lb/lc/swordplay.png"
import sleep from "$lib/assets/lb/lc/sleep.png"
import gn from "$lib/assets/lb/lc/gn.png"
import tutorial from "$lib/assets/lb/lc/tutorial.png"
import resolution from "$lib/assets/lb/lc/resolution.png"
import rain from "$lib/assets/lb/lc/rain.png"
import irreplaceable from "$lib/assets/lb/lc/irreplaceable.png"
import mutual from "$lib/assets/lb/lc/mutual.png"
import secret from "$lib/assets/lb/lc/secret.png"
import unreachable from "$lib/assets/lb/lc/unreachable.png"
import fall from "$lib/assets/lb/lc/fall.png"
import breakfast from "$lib/assets/lb/lc/erudition/breakfast.png"
import dawn from "$lib/assets/lb/lc/erudition/dawn.png"
import geniuses from "$lib/assets/lb/lc/erudition/geniuses.png"
import milky from "$lib/assets/lb/lc/erudition/milky.png"
import today from "$lib/assets/lb/lc/erudition/today.png"

export const leaderboards = [
    {
        title: "Achievements",
        info: [{ pic: ach, url: "/achievments/1", desc: "" }],
    },
    {
        title: "Seele",
        info: [
            { pic: night, url: "/seele/night/1", desc: "" },
            { pic: cruising, url: "/seele/cruising/1", desc: "" },
            { pic: darkness, url: "/seele/darkness/1", desc: "" },
            { pic: swordplay, url: "/seele/swordplay/1", desc: "" },
            { pic: sleep, url: "/seele/sleep/1", desc: "" }
        ],
    },
    {
        title: "Silver Wolf",
        info: [
            { pic: tutorial, url: "/sw/tutorial/1", desc: " " },
            { pic: rain, url: "/sw/rain/1", desc: " " },
            { pic: resolution, url: "/sw/resolution/1", desc: " " },
            { pic: gn, url: "/sw/gn/1", desc: " " },
        ],
    },
    {
        title: "Blade",
        info: [
            { pic: unreachable, url: "/blade/unreachable/1", desc: " " },
            { pic: secret, url: "/blade/secret/1", desc: " " },
            { pic: fall, url: "/blade/fall/1", desc: " " },
            { pic: mutual, url: "/blade/mutual/1", desc: " " },
            { pic: irreplaceable, url: "/blade/irreplaceable/1", desc: " " },
        ],
    },
    {
        title: "Qingque",
        info: [
            { pic: today, url: "/qingque/E6S5_today/1", desc: " " },
            { pic: dawn, url: "/qingque/E6S1_dawn/1", desc: " " },
            { pic: breakfast, url: "/qingque/E6S5_breakfast/1", desc: " " },
            { pic: geniuses, url: "/qingque/E6S5_geniuses/1", desc: " " },
            { pic: milky, url: "/qingque/E6S1_milky/1", desc: " " },
        ],
    },
];

export function getPicForCtgr(str) {
    if (checkIfStartsWIthEdilonSuperimpose(str)){
        str = extractAfterUnderscore(str);
    }
    str = removeUnderscoreAndNumbers(str);
    switch (str) {
        case 'today': return today;
        case 'dawn': return dawn;
        case 'breakfast': return breakfast;
        case 'geniuses': return geniuses;
        case 'milky': return milky;
        case 'night': return night;
        case 'cruising': return cruising;
        case 'darkness': return darkness;
        case 'swordplay': return swordplay;
        case 'sleep': return sleep;
        case 'tutorial': return tutorial;
        case 'rain': return rain;
        case 'resolution': return resolution;
        case 'gn': return gn;
        case 'unreachable': return unreachable;
        case 'secret': return secret;
        case 'fall': return fall;
        case 'mutual': return mutual;
        case 'irreplaceable': return irreplaceable;

    }
}


export function capitalizeAndRemoveUnderscores(str) {
    return str.split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

export function removeUnderscoreAndNumbers(str) {
    return str.replace(/_[0-9]+$/, '');
}

function extractAfterUnderscore(str) {
    let index = str.indexOf('_');
    if (index === -1) {
        return '';
    }
    return str.slice(index + 1);
}

function checkIfStartsWIthEdilonSuperimpose(str) {
    let pattern = /^[a-zA-Z]\d[a-zA-Z]\d/;
    return pattern.test(str);
}


