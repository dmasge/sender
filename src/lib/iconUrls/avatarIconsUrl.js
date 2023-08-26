import { starRailRes } from "$lib/constants.js";

export function getAvatarUrl(str) {
    if (str.length > 6) {
        return starRailRes + str;
    } else {
        return starRailRes + "icon/avatar/" + str + ".png";
    }
}


export function getRelicUrl(str) {
    if (str.length > 6) {
        return starRailRes + str;
    } else {
        return starRailRes + "icon/relic/" + str + ".png";
    }
}
