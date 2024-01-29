import { getIdFromName } from "$lib/constants.js";
import { redirect } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';

// Create a cache
let cache = new Map();

export async function load({ url }) {
    try {
        let str = url.pathname;
        let splitStr = str.split("/");
        let charName = splitStr[3];

        let k;
        if (/^\d+$/.test(charName)) {
            k = charName;
        } else {
            k = getIdFromName(charName);
        }
        if (k == null) {
            throw error(404);
        }
        let ctgr = splitStr[4];
        let page = splitStr[5];

        // Create a unique key for this request
        let key = `${k}-${ctgr}-${page}`;

        // If the key is in the cache, return the cached data
        if (cache.has(key)) {
            return cache.get(key);
        }

        let fetch_url = `https://slprivate.azurewebsites.net/api/get_lb_data?k=${k}&ctgr=${ctgr}&page=${page}`;
        let response = await fetch(fetch_url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        } else {
            let lbData = await response.json();
            
            let data = {
                'k': k,
                'charName' : charName,
                'ctgr': ctgr,
                'page': page,
                'lbData': lbData
            }

            // Store the data in the cache
            cache.set(key, data);

            // Set a timeout to delete the data from the cache after 15 sec
            setTimeout(() => { cache.delete(key); }, 8 * 1000);

            return data;
        }
    } catch (error) {
        console.log(error);
        throw redirect(307, '../../../err');
    }
}
