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
import gn_134 from "$lib/assets/lb/lc/gn_134.png"
import tutorial_134 from "$lib/assets/lb/lc/tutorial_134.png"
import resolution_134 from "$lib/assets/lb/lc/resolution_134.png"
import rain_134 from "$lib/assets/lb/lc/rain_134.png"



export const leaderboards = [
    {
        title: "Achievements",
        info: [{ pic: ach, url: "/achievments/1", desc: "" }],
    },
    {
        title: "Seele",
        info: [
            { pic: night, url: "/seele/night/1", desc: "S1" },
            { pic: cruising, url: "/seele/cruising/1", desc: "S5" },
            { pic: darkness, url: "/seele/darkness/1", desc: "S5" },
            { pic: swordplay, url: "/seele/swordplay/1", desc: "S5" },
            { pic: sleep, url: "/seele/sleep/1", desc: "S1" }
        ],
    },
    {
        title: "Silver Wolf",
        info: [
            { pic: tutorial, url: "/sw/tutorial/1", desc: "S5" },
            { pic: tutorial_134, url: "/sw/tutorial_134/1", desc: "S5" },
            { pic: rain, url: "/sw/rain/1", desc: "S1" },
            { pic: rain_134, url: "/sw/rain_134/1", desc: "S1" },
            { pic: resolution, url: "/sw/resolution/1", desc: "S5" },
            { pic: resolution_134, url: "/sw/resolution_134/1", desc: "S5" },
            { pic: gn, url: "/sw/gn/1", desc: "S5" },
            { pic: gn_134, url: "/sw/gn_134/1", desc: "S5" },
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
        case 'tutorial_134' : return tutorial_134;
        case 'rain' : return rain;
        case 'rain_134' : return rain_134;
        case 'resolution' : return resolution;
        case 'resolution_134' : return resolution_134;
        case 'gn' : return gn;
        case 'gn_134' : return gn_134;
    }
}






