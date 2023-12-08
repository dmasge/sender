import { browser } from '$app/environment';
import { writable } from 'svelte/store';

export const buildHideToogleWriteable = writable(0);
let itemName = "buildHideToogle";

export function isBuildHidden(build) {
    if (browser) {
        let key = build['k'];
        let uid = build['id'];
        let localStorageItem = localStorage.getItem(itemName);
        let parsedlocalStorageItem = localStorageItem ? JSON.parse(localStorageItem) : {};
        if (parsedlocalStorageItem.hasOwnProperty(uid)) {
            if (parsedlocalStorageItem[uid].hasOwnProperty(key)) {
                return parsedlocalStorageItem[uid][key];
            }
            return false;
        }
        return false;
    }
}

export function toogleBuildHidden(build) {
    if (browser) {
        let key = build['k'];
        let uid = build['id'];
        let currVal = isBuildHidden(build);
        let flipVal = !currVal;
        let localStorageItem = localStorage.getItem(itemName);
        let parsedlocalStorageItem = localStorageItem ? JSON.parse(localStorageItem) : {};
        if (parsedlocalStorageItem.hasOwnProperty(uid)) {
            parsedlocalStorageItem[uid][key] = flipVal;
        } else {
            parsedlocalStorageItem[uid] = {};
            parsedlocalStorageItem[uid][key] = flipVal;
        }
        localStorage.setItem(itemName, JSON.stringify(parsedlocalStorageItem));
        buildHideToogleWriteable.update((n) => parsedlocalStorageItem);
        return flipVal;
    }
}
