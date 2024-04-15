const favoriteURL = "https://poke-collection-lite-production.up.railway.app";
const pokeApiURL = "https://pokeapi.co/api/v2/pokemon/";

async function GetFavorites(user) {
    return fetch(`${favoriteURL}/api/${user}/favorites`).then(response => response.json());
}

async function PostFavorites(user, body) {
    return fetch(`${favoriteURL}/api/${user}/favorites`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    }).then(response => response.json());
}

async function DeleteFavorites(user, id) {
    return fetch(`${favoriteURL}/api/${user}/favorites/${id}`, {
        method: "DELETE"
    })
}

async function GetPokemon(pokemon) {
    return fetch(`${pokeApiURL}${pokemon}`).then(response => response.json())
}

export {
    GetFavorites,
    GetPokemon,
    PostFavorites,
    DeleteFavorites,
}