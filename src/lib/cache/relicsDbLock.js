import { browser } from '$app/environment';
import { writable } from 'svelte/store';
import { loadRelicsDb } from "$lib/cache/relicsDb.js";


export const relicsDbLockWriteable = writable(0);
let itemName = "relicsDbLock";

export function isRelicLocked(uid, key) {
    if (browser) {
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

export function toogleRelicLock(uid, key) {
    if (browser) {
        let currVal = isRelicLocked(uid, key);
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
        return flipVal;
    }
}


export function loadUnlockedRelics(uid){
    let allRelics = loadRelicsDb(uid);
    let unlockedRelics = {};
    for (var key in allRelics) {
        if (!isRelicLocked(uid, key)) {
            unlockedRelics[key] = allRelics[key];
        }
    }

    return unlockedRelics;
}

export function unlockAllRelics(uid){
    if (browser) {
        let localStorageItem = localStorage.getItem(itemName);
        let parsedlocalStorageItem = localStorageItem ? JSON.parse(localStorageItem) : {};
        console.log(
            parsedlocalStorageItem[uid]);
        parsedlocalStorageItem[uid] = {};
        console.log(parsedlocalStorageItem[uid]);
        localStorage.setItem(itemName, JSON.stringify(parsedlocalStorageItem));
        relicsDbLockWriteable.update((n) => parsedlocalStorageItem);
    }
}