import { redirect } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';


export async function load({ url }) {

    try {
        let pageN = url.pathname.split("/").pop();
        let fetchurl = `https://slprivate.azurewebsites.net/api/get_ach_lb_data?page=${pageN}`;
        let response = await fetch(fetchurl);
        let jsonData = await response.json();
        let data = {
            'lbData': jsonData
        }

        return data;
    } catch (error) {
        console.log(error);
        throw redirect(307, '../../err');
    }
}

