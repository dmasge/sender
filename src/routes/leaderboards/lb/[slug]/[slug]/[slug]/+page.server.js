import { getIdFromName } from "$lib/constants.js";
import { redirect } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';


export async function load({ url }) {

    try {
        let str = url.pathname;
        let splitStr = str.split("/");
        let charName = splitStr[3];

        let k = getIdFromName(charName);
        if (k == null) {
            throw error(404);
        }
        let ctgr = splitStr[4];
        let page = splitStr[5];

        let fetch_url = `https://seeleland.azurewebsites.net/api/get_lb_data?k=${k}&ctgr=${ctgr}&page=${page}`;
        let response = await fetch(fetch_url);
        let lbData = await response.json();
        
        let data = {
            'k': k,
            'charName' : charName,
            'ctgr': ctgr,
            'page': page,
            'lbData': lbData
        }

        return data;
    } catch (error) {
        console.log(error);
        throw redirect(307, '../../../err');
    }
}

