import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export const subWeightsInventoryWriteable = writable(0);
let itemName = "subWeightsInventory";

export function loadSubWeightsInventory() {
    if (browser) {
        let localStorageItem = localStorage.getItem(itemName);
        let parsedlocalStorageItem = localStorageItem ? JSON.parse(localStorageItem) : new Array(12).fill(0);
        return parsedlocalStorageItem;
    }
}

export function saveSubWeightsInventory(newWeights){
    if (browser) {
        localStorage.setItem(itemName, JSON.stringify(newWeights));
        subWeightsInventoryWriteable.update((n) => newWeights);
    }
}

