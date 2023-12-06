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
        parsedlocalStorageItem[uid] = {};
        localStorage.setItem(itemName, JSON.stringify(parsedlocalStorageItem));
        relicsDbLockWriteable.update((n) => parsedlocalStorageItem);
    }
}

export function LockAllDisplayedRelics(uid, relics){
    if (browser) {
        // relics here is a list of lists
        // first element (0 index) is key
        // second elemnt (1 index) is value 
        let localStorageItem = localStorage.getItem(itemName);
        let parsedlocalStorageItem = localStorageItem ? JSON.parse(localStorageItem) : {};
        if (!parsedlocalStorageItem.hasOwnProperty(uid)) {
            parsedlocalStorageItem[uid] = {};
        }
        for (let relic of relics) {
            let key = relic[0];
            parsedlocalStorageItem[uid][key] = true;
        }
        localStorage.setItem(itemName, JSON.stringify(parsedlocalStorageItem));
        relicsDbLockWriteable.update((n) => parsedlocalStorageItem);
    }
}

export function UnlockAllDisplayedRelics(uid, relics){
    if (browser) {
        // relics here is a list of lists
        // first element (0 index) is key
        // second elemnt (1 index) is value 
        let localStorageItem = localStorage.getItem(itemName);
        let parsedlocalStorageItem = localStorageItem ? JSON.parse(localStorageItem) : {};
        if (!parsedlocalStorageItem.hasOwnProperty(uid)) {
            parsedlocalStorageItem[uid] = {};
        }
        for (let relic of relics) {
            let key = relic[0];
            parsedlocalStorageItem[uid][key] = false;
        }
        localStorage.setItem(itemName, JSON.stringify(parsedlocalStorageItem));
        relicsDbLockWriteable.update((n) => parsedlocalStorageItem);
    }
}
