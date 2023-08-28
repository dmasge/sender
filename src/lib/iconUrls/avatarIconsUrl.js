import { starRailRes, extension } from "$lib/constants.js";

export function getAvatarUrl(str) {
    if (str.length > 6) {
        return starRailRes + str;
    } else {
        return starRailRes + "icon/avatar/" + str + extension;
    }
}


export function getRelicUrl(str) {
    if (str.length > 6) {
        return starRailRes + str;
    } else {
        return starRailRes + "icon/relic/" + str + extension;
    }
}



function replacePNGwithWEBP(text) {
    return text.replace(/\.png/g, extension);
}
