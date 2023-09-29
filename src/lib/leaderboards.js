let ach = "https://raw.githubusercontent.com/Sinkira/sinkiresource/main/assets/ach68x68.webp";
let night = "https://raw.githubusercontent.com/Sinkira/sinkiresource/main/icon/light_cone/23001.webp";
let cruising = "https://raw.githubusercontent.com/Sinkira/sinkiresource/main/icon/light_cone/24001.webp";
let darkness = "https://raw.githubusercontent.com/Sinkira/sinkiresource/main/icon/light_cone/21031.webp"
let swordplay = "https://raw.githubusercontent.com/Sinkira/sinkiresource/main/icon/light_cone/21010.webp"
let sleep = "https://raw.githubusercontent.com/Sinkira/sinkiresource/main/icon/light_cone/23012.webp"
let gn = "https://raw.githubusercontent.com/Sinkira/sinkiresource/main/icon/light_cone/21001.webp"
let tutorial = "https://raw.githubusercontent.com/Sinkira/sinkiresource/main/icon/light_cone/22000.webp"
let resolution = "https://raw.githubusercontent.com/Sinkira/sinkiresource/main/icon/light_cone/21015.webp"
let rain = "https://raw.githubusercontent.com/Sinkira/sinkiresource/main/icon/light_cone/23007.webp"
let irreplaceable = "https://raw.githubusercontent.com/Sinkira/sinkiresource/main/icon/light_cone/23002.webp"
let mutual = "https://raw.githubusercontent.com/Sinkira/sinkiresource/main/icon/light_cone/20016.webp"
let secret = "https://raw.githubusercontent.com/Sinkira/sinkiresource/main/icon/light_cone/21012.webp"
let unreachable = "https://raw.githubusercontent.com/Sinkira/sinkiresource/main/icon/light_cone/23009.webp"
let fall = "https://raw.githubusercontent.com/Sinkira/sinkiresource/main/icon/light_cone/24000.webp"
let breakfast = "https://raw.githubusercontent.com/Sinkira/sinkiresource/main/icon/light_cone/21027.webp"
let dawn = "https://raw.githubusercontent.com/Sinkira/sinkiresource/main/icon/light_cone/23010.webp"
let geniuses = "https://raw.githubusercontent.com/Sinkira/sinkiresource/main/icon/light_cone/21020.webp"
let milky = "https://raw.githubusercontent.com/Sinkira/sinkiresource/main/icon/light_cone/23000.webp"
let today = "https://raw.githubusercontent.com/Sinkira/sinkiresource/main/icon/light_cone/21034.webp"
let birth = "https://raw.githubusercontent.com/Sinkira/sinkiresource/main/icon/light_cone/21006.webp"
let clamor = "https://raw.githubusercontent.com/Sinkira/sinkiresource/main/icon/light_cone/21013.webp"
let moles = "https://raw.githubusercontent.com/Sinkira/sinkiresource/main/icon/light_cone/21005.webp"
let woof = "https://raw.githubusercontent.com/Sinkira/sinkiresource/main/icon/light_cone/21026.webp"
let under = "https://raw.githubusercontent.com/Sinkira/sinkiresource/main/icon/light_cone/21019.webp"
let collapsing = "https://raw.githubusercontent.com/Sinkira/sinkiresource/main/icon/light_cone/20002.webp"
let name = "https://raw.githubusercontent.com/Sinkira/sinkiresource/main/icon/light_cone/23004.webp"
let eyes = "https://raw.githubusercontent.com/Sinkira/sinkiresource/main/icon/light_cone/21008.webp"
let patience = "https://raw.githubusercontent.com/Sinkira/sinkiresource/main/icon/light_cone/23006.webp"
let fermata = "https://raw.githubusercontent.com/Sinkira/sinkiresource/main/icon/light_cone/21022.webp"
let brighter = 'https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/icon/light_cone/23015.png'

function generateLeaderboard(charId, title, info) {
    return {
        title,
        charId,
        info: info.map(({ pic, url, desc }) => ({
            pic,
            url: url.replace('{charId}', charId),
            desc,
        }))
    };
}


export const leaderboards = [
    {
        title: "Achievements",
        info: [{ pic: ach, url: "/achievments/1", desc: "" }],
        charId: "",
    },
    generateLeaderboard('1102', 'Seele', [
        { pic: night, url: "/{charId}/night/1", desc: " " },
        { pic: night, url: "/{charId}/E2S5_night/1", desc: "S5" },
        { pic: cruising, url: "/{charId}/cruising/1", desc: " " },
        { pic: darkness, url: "/{charId}/darkness/1", desc: " " },
        { pic: swordplay, url: "/{charId}/swordplay/1", desc: " " },
        { pic: sleep, url: "/{charId}/sleep/1", desc: " " }
    ]),
    generateLeaderboard('1209', 'Yanqing', [
        { pic: 'https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/icon/light_cone/23012.png',
             url: "/{charId}/E0S1_23012/1", desc: " " },
        { pic: 'https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/icon/light_cone/23012.png',
             url: "/{charId}/E0S5_23012/1", desc: "S5" },
        { pic: 'https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/icon/light_cone/21024.png',
             url: "/{charId}/E0S5_21024_134/1", desc: " " },
        { pic: 'https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/icon/light_cone/24001.png',
             url: "/{charId}/E0S5_24001/1", desc: " " },
        { pic: 'https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/icon/light_cone/21010.png',
             url: "/{charId}/E0S5_21010/1", desc: " " }
    ]),
    generateLeaderboard('1213', 'Dan Heng Imbibitor Lunae', [
        { pic: brighter, url: "/{charId}/E0S1_23015/1", desc: " " },
        { pic: brighter, url: "/{charId}/E0S5_23015/1", desc: "S5" },
        { pic: fall, url: "/{charId}/E0S5_24000/1", desc: " " },
        { pic: under, url: "/{charId}/E0S5_21019/1", desc: " " },
        { pic: irreplaceable, url: "/{charId}/E0S1_23002/1", desc: " " }
    ]),
    generateLeaderboard('1005', 'Kafka', [
        { pic: patience, url: "/{charId}/E0S1_patience_134/1", desc: "" },
        { pic: gn, url: "/{charId}/E0S5_gn_134/1", desc: "" },
        { pic: fermata, url: "/{charId}/E0S5_fermata_134/1", desc: "" },
        { pic: name, url: "/{charId}/E0S1_name_134/1", desc: "" },
        { pic: eyes, url: "/{charId}/E0S5_eyes_134/1", desc: "" }
    ]),
    generateLeaderboard('1006', 'Silver Wolf', [
        { pic: tutorial, url: "/{charId}/tutorial_134/1", desc: " " },
        { pic: rain, url: "/{charId}/rain_134/1", desc: " " },
        { pic: rain, url: "/{charId}/E2S1_rain_134/1", desc: "E2" },
        { pic: gn, url: "/{charId}/gn_134/1", desc: " " },
        { pic: resolution, url: "/{charId}/resolution_134/1", desc: " " }
    ]),
    generateLeaderboard('1205', 'Blade', [
        { pic: unreachable, url: "/{charId}/unreachable/1", desc: " " },
        { pic: unreachable, url: "/{charId}/E2S1_unreachable/1", desc: "E2" },
        { pic: unreachable, url: "/{charId}/E2S5_unreachable/1", desc: "E2S5" },
        { pic: secret, url: "/{charId}/secret/1", desc: " " },
        { pic: fall, url: "/{charId}/fall/1", desc: " " },
        { pic: mutual, url: "/{charId}/mutual/1", desc: " " },
        { pic: irreplaceable, url: "/{charId}/irreplaceable/1", desc: " "},
    ]),
   
    generateLeaderboard('1201', 'Qingque', [
        { pic: today, url: "/{charId}/E6S5_today/1", desc: " " },
        { pic: dawn, url: "/{charId}/E6S1_dawn/1", desc: " " },
        { pic: breakfast, url: "/{charId}/E6S5_breakfast/1", desc: " " },
        { pic: geniuses, url: "/{charId}/E6S5_geniuses/1", desc: " " },
        { pic: milky, url: "/{charId}/E6S1_milky/1", desc: " " }
    ]),
    generateLeaderboard('1107', 'Clara', [
        { pic: irreplaceable, url: "/{charId}/E2S1_irreplaceable/1", desc: " " },
        { pic: fall, url: "/{charId}/E2S5_fall/1", desc: " " },
        { pic: moles, url: "/{charId}/E2S5_moles/1", desc: " " },
        { pic: secret, url: "/{charId}/E2S5_secret/1", desc: " " },
        { pic: woof, url: "/{charId}/E2S5_woof/1", desc: " " },
        { pic: under, url: "/{charId}/E2S5_under/1", desc: " " },
        { pic: collapsing, url: "/{charId}/E2S5_collapsing/1", desc: " " },
    ]),
   
    generateLeaderboard('1204', 'Jing Yuan', [
        { pic: dawn, url: "/{charId}/E0S1_dawn/1", desc: " " },
        { pic: breakfast, url: "/{charId}/E0S5_breakfast/1", desc: " " },
        { pic: birth, url: "/{charId}/E0S5_birth/1", desc: " " },
        { pic: geniuses, url: "/{charId}/E0S5_geniuses/1", desc: " " },
        { pic: today, url: "/{charId}/E0S5_today/1", desc: " " },
        { pic: milky, url: "/{charId}/E0S1_milky/1", desc: " " }
    ])
];

export function getPicForCtgr(str) {
    if (checkIfStartsWIthEdilonSuperimpose(str)){
        str = extractAfterUnderscore(str);
    }
    str = removeUnderscoreAndNumbers(str);
    switch (str) {
        case 'birth' : return birth;
        case 'clamor' : return clamor;
        case 'moles' : return moles;
        case 'woof' : return woof;
        case 'under' : return under;
        case 'collapsing' : return collapsing;
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
        case 'patience': return patience;
        case 'eyes': return eyes;
        case 'fermata': return fermata;
        case 'name': return name;
        case 'brighter' : return brighter;
        // default : return 1102Derp;
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


