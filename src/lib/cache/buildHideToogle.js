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

export function countHiddenBuilds(builds) {
    let hiddenBuildsCount = 0;
    for (let i = 0; i < builds.length; i++) {
        if (isBuildHidden(builds[i])) {
            hiddenBuildsCount++;
        }
    }
    return hiddenBuildsCount;
}

export function toogleBuildHidden(build) {
    if (browser) {
        let key = build['k'];
        let uid = build['id'];
        let currVal = isBuildHidden(build);
        if (!currVal) {
            let isUserSure = confirm("Are you sure you want to hide this build? \nTo see this build again, you'll have to toogle the checkbox at the top of the profile page and unhide.");
            if (isUserSure) {
                // isUserSure = confirm("Are you ABSOLUTELY sure about hiding the build? \nyou may have TROUBLE finding it later (unless toogle checkbox).");
                // if (isUserSure) {
                // } else {
                // return currVal;
                // }
            } else {

                return currVal;
            }
        }
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
