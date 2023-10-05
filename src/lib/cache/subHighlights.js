import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export const subHighlightsWriteable = writable(0);
let itemName = "subHighlights";

export function loadSubHighlights() {
    if (browser) {

        let subHighlights = localStorage.getItem(itemName);
        let parsedsubHighlights = subHighlights ? JSON.parse(subHighlights) : {};
        subHighlightsWriteable.update((n) => parsedsubHighlights);
    }
}

export function toogleSubHighlights(charId, subType) {

    if (browser) {
        let subHighlights = localStorage.getItem(itemName);
        let parsedsubHighlights = subHighlights ? JSON.parse(subHighlights) : {};
        if (!parsedsubHighlights.hasOwnProperty(charId)) {
            parsedsubHighlights[charId] = {};
        }

        if (!parsedsubHighlights[charId].hasOwnProperty(subType)) {
            parsedsubHighlights[charId][subType] = true;
        } else {
            parsedsubHighlights[charId][subType] = !parsedsubHighlights[charId][subType];
        }

        localStorage.setItem(itemName, JSON.stringify(parsedsubHighlights));
        subHighlightsWriteable.update((n) => parsedsubHighlights);
    }

}

export function getSubAffixBackgroundColor(charId, key) {

    if (browser) {
        let subHighlights = localStorage.getItem(itemName);
        let parsedsubHighlights = subHighlights ? JSON.parse(subHighlights) : {};
        if (!parsedsubHighlights.hasOwnProperty(charId)) {
            return "#ffe2ae";
        }
        else {
            if (!parsedsubHighlights[charId].hasOwnProperty(key)) {
                return 'transparent';
            } else {
                return parsedsubHighlights[charId][key] ? "#ffe2ae" : "transparent";
            }
        }
    }
}

export function getSubAffixTextColor(charId, key) {

    if (browser) {
        let subHighlights = localStorage.getItem(itemName);
        let parsedsubHighlights = subHighlights ? JSON.parse(subHighlights) : {};
        if (!parsedsubHighlights.hasOwnProperty(charId)) {
            return 'rgba(0, 0, 0, 1)';
        }
        else {
            if (!parsedsubHighlights[charId].hasOwnProperty(key)) {
                return 'rgba(0, 0, 0, 0.3)';
            } else {
                return parsedsubHighlights[charId][key] ? 'rgba(0, 0, 0, 1)' : "rgba(0, 0, 0, 0.3)";
            }
        }
    }
}
