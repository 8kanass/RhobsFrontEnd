export async function fetchBodies(isPlanet){
    const API_URL = 'https://api.le-systeme-solaire.net/rest.php/bodies';
    const response = await fetch(
        `${API_URL}?data=id,name,gravity&order=id,asc&filter[]=isPlanet,eq,${isPlanet}`
        );
    const data = await response.json();
    return data;
};

export async function fetchBody(body){
    const API_URL = 'https://api.le-systeme-solaire.net/rest.php/bodies';
    const response = await fetch(
        `${API_URL}/${body}`
        );
    const data = await response.json();
    return data;
};