import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export const relicsDbWriteable = writable(0);
let itemName = "relicsDb";



export function loadRelicsDb(uid) {
    if (browser) {
        let localStorageItem = localStorage.getItem(itemName);
        let parsedlocalStorageItem = localStorageItem ? JSON.parse(localStorageItem) : {};
        if (parsedlocalStorageItem.hasOwnProperty(uid)){
            return parsedlocalStorageItem[uid];
        }
        return {};
    }
}
export function addRelicsToDbFromBuilds(uid, builds){
    if (browser) {
        let localStorageItem = localStorage.getItem(itemName);
        let parsedlocalStorageItem = localStorageItem ? JSON.parse(localStorageItem) : {};

        // if no uid on this player, add it
        if (!parsedlocalStorageItem.hasOwnProperty(uid)) {
            parsedlocalStorageItem[uid] = {};
        }

        for (let build of builds){
            let relics = build['r'];
            for (let relic of relics){
                if (relic.hasOwnProperty('t')){
                    let relicHash = hashObject(relic);
                    parsedlocalStorageItem[uid][relicHash] = relic;
                }
            }
        }

        localStorage.setItem(itemName, JSON.stringify(parsedlocalStorageItem));
        relicsDbWriteable.update((n) => parsedlocalStorageItem);
    }
}

export function removeRelicFromDb(uid, relicKey){
    if (browser) {
        let localStorageItem = localStorage.getItem(itemName);
        let parsedlocalStorageItem = localStorageItem ? JSON.parse(localStorageItem) : {};

        // if no uid on this player, add it
        if (!parsedlocalStorageItem.hasOwnProperty(uid)) {
            parsedlocalStorageItem[uid] = {};
        }

        delete parsedlocalStorageItem[uid][relicKey];

        localStorage.setItem(itemName, JSON.stringify(parsedlocalStorageItem));
        relicsDbWriteable.update((n) => parsedlocalStorageItem);
    }
}

//#region  hash
function sortedStringify(obj) {
    if (typeof obj !== 'object' || obj === null) {
        return JSON.stringify(obj);
    }

    let keys = Object.keys(obj).sort();
    let sortedObj = keys.reduce((result, key) => {
        result[key] = sortedStringify(obj[key]);
        return result;
    }, {});

    return JSON.stringify(sortedObj);
}

function simpleHash(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        let charCode = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + charCode;
        hash |= 0; // Convert to a 32-bit integer
    }
    return hash;
}

function hashObject(obj) {
    let str = sortedStringify(obj);
    return simpleHash(str);
}
//#endregion hash