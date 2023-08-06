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
            { pic: tutorial, url: "/sw/tutorial_134/1", desc: "134" },
            { pic: rain, url: "/sw/rain/1", desc: " " },
            { pic: rain, url: "/sw/rain_134/1", desc: "134" },
            { pic: resolution, url: "/sw/resolution/1", desc: " " },
            { pic: resolution, url: "/sw/resolution_134/1", desc: "134" },
            { pic: gn, url: "/sw/gn/1", desc: " " },
            { pic: gn, url: "/sw/gn_134/1", desc: "134" },
        ],
    },
    {
        title: "Blade",
        info: [
            { pic: unreachable, url: "/blade/unreachable/1", desc: " " },
            { pic: unreachable, url: "/blade/unreachable_134/1", desc: "134" },
            { pic: secret, url: "/blade/secret/1", desc: " " },
            { pic: secret, url: "/blade/secret_134/1", desc: "134" },
            { pic: fall, url: "/blade/fall/1", desc: " " },
            { pic: fall, url: "/blade/fall_134/1", desc: "134" },
            { pic: mutual, url: "/blade/mutual/1", desc: " " },
            { pic: mutual, url: "/blade/mutual_134/1", desc: "134" },
            { pic: irreplaceable, url: "/blade/irreplaceable/1", desc: " " },
            { pic: irreplaceable, url: "/blade/irreplaceable_134/1", desc: "134" },
        ],
    },
];

export function getPicForCtgr(str) {
    switch(str){
        case 'night' : return night;
        case 'cruising' : return cruising;
        case 'darkness' : return darkness;
        case 'swordplay' : return swordplay;
        case 'sleep' : return sleep;
        case 'tutorial' : return tutorial;
        case 'tutorial_134' : return tutorial;
        case 'rain' : return rain;
        case 'rain_134' : return rain;
        case 'resolution' : return resolution;
        case 'resolution_134' : return resolution;
        case 'gn' : return gn;
        case 'gn_134' : return gn;
        case 'unreachable' : return unreachable;
        case 'secret' : return secret;
        case 'fall' : return fall;
        case 'mutual' : return mutual;
        case 'irreplaceable' : return irreplaceable;
        case 'unreachable_134' : return unreachable;
        case 'secret_134' : return secret;
        case 'fall_134' : return fall;
        case 'mutual_134' : return mutual;
        case 'irreplaceable_134' : return irreplaceable;
    }
}


export function capitalizeAndRemoveUnderscores(str) {
    return str.split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}




