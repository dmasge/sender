// Create a cache
let cache = new Map();

async function getPlayer(uid){
    // If the key is in the cache, return the cached data
    if (cache.has(uid)) {
        return cache.get(uid);
    }

    let url = `https://slprivate.azurewebsites.net/api/get_player_data?uid=${uid}`;
    let response = await fetch(url);

    // Check if the fetch was successful
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    } else {
        let jsonData = await response.json();

        // Store the data in the cache
        cache.set(uid, jsonData);

        // Set a timeout to delete the data from the cache after 5 min
        setTimeout(() => { cache.delete(uid); }, 0.5 * 60 * 1000);

        return jsonData;
    }
}


async function refreshPlayer(uid) {
    await fetch(`https://slprivate.azurewebsites.net/api/upsert_player_data?uid=${uid}`);

    // Remove the old data from the cache
    cache.delete(uid);
}

export async function load({ params }) {
    try {
        const uid = params.slug;
        let jsonData = await getPlayer(uid);
        let data = {
            'jsonData': jsonData,
        }
        return data;
    }
    catch (error) {
        console.log(error);
       // throw redirect(307, '/err');
    }
}

export const actions = {
	default: async ({ params }) => {
        try {
            const uid = params.slug;
            await refreshPlayer(uid);
            const player = await getPlayer(uid);
            return player;
        } catch (error) {
            console.log(error);
            // Handle the error appropriately here
            // Maybe return a default player object or throw an error
        }
	}
};

