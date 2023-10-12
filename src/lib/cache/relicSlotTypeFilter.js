import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export const relicSlotTypeFilterWriteable = writable(0);
let itemName = "relicSlotTypeFilter";

export function loadrelicSlotTypeFilter() {
    if (browser) {
        let localStorageItem = localStorage.getItem(itemName);
        let parsedlocalStorageItem = localStorageItem ? JSON.parse(localStorageItem) : [false, true, true, true, true, true, true];
        return parsedlocalStorageItem;
    }
}

export function saverelicSlotTypeFilter(newWeights){
    if (browser) {
        localStorage.setItem(itemName, JSON.stringify(newWeights));
        relicSlotTypeFilterWriteable.update((n) => newWeights);
    }
}

