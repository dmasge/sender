import ach from "$lib/assets/lb/ach.png";
import night from "$lib/assets/lb/lc/night.png";
import cruising from "$lib/assets/lb/lc/cruising.png"
import darkness from "$lib/assets/lb/lc/darkness.png"
import swordplay from "$lib/assets/lb/lc/swordplay.png"
import sleep from "$lib/assets/lb/lc/sleep.png"

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
];

export function getPicForCtgr(str) {
    switch(str){
        case 'night' : return night;
        case 'cruising' : return cruising;
        case 'darkness' : return darkness;
        case 'swordplay' : return swordplay;
        case 'sleep' : return sleep;

    }
}





