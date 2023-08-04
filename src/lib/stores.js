import { writable } from 'svelte/store';

export const getOrRefresh = writable("ono");


export function formatStat(str) {
    if (str.includes('%')) {
        let index = str.indexOf('.');
        if (index !== -1) {
            return str.slice(0, index + 2) + '%';
        } else {
            return str;
        }
    } else {
        let index = str.indexOf('.');
        if (index !== -1) {
            return str.slice(0, index);
        } else {
            return str;
        }
    }
}



// Shorthand for stats
let statShorthands = {
    "CRIT Rate" : "CR",
    "CRIT DMG" : "CD",
    "Break Effect" : "Break",
    "Effect Hit Rate" : "EHR",
    "Effect RES" : "RES",
    "Quantum DMG Boost" : "Qua",
    "Lightning DMG Boost" : "Lightn",
    "Physical DMG Boost" : "Phys",
    "Outgoing Healing Boost" : "Heal",
    "Wind DMG Boost" : "Wind",
    "Energy Regeneration Rate" : "ERR",
    "Fire DMG Boost" : "Fire",
    "Imaginary DMG Boost" : "Img",
    "Ice DMG Boost" : "Ice"
 }
export function abbreviateStat(str) {
    if (statShorthands.hasOwnProperty(str)) {
        return statShorthands[str];
    } else {
        return str;
    }
}