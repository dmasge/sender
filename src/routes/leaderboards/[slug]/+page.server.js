import { redirect } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';


async function getPlayer(uid){
    let url = `https://slprivate.azurewebsites.net/api/get_player_data?uid=${uid}`;
    let response = await fetch(url);
    let jsonData = await response.json();
    return jsonData
}

async function refreshPlayer(uid) {
    await fetch(
        `https://slprivate.azurewebsites.net/api/upsert_player_data?uid=${uid}`
    );
}


export async function load({ params }) {

    try {
        const uid = params.slug;
        let jsonData = getPlayer(uid);
        let data = {
            'jsonData': jsonData,
        }
        return data
    }
    catch (error) {
        console.log(error);
       // throw redirect(307, '/err');
    }
}

export const actions = {
	default: async ({ params }) => {
        const uid = params.slug;
        await refreshPlayer(uid);
        const player = await getPlayer(uid);
        return player;
	}
};










