import { redirect } from '@sveltejs/kit';

export async function load({ url }) {

    try {
        if (url.href.includes("leaderboards/lb?k=")) {
            let k = url.searchParams.get('k');
            let ctgr = url.searchParams.get('ctgr');
            let page = url.searchParams.get('page');
            let lbData = []

            let fetch_url = `https://seeleland.azurewebsites.net/api/get_lb_data?k=${k}&ctgr=${ctgr}&page=${page}`;

            let response = await fetch(fetch_url);
            lbData = await response.json();
            

            let data = {
                'k': k,
                'ctgr': ctgr,
                'page': page,
                'lbData': lbData
            }
            return data
        }
    } catch (error) {
        console.log(error);
       // throw redirect(307, '/err');
    }
}









