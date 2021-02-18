const api = 'http://localhost/api';
const routes = {
    'film': '/get-films',
    'language': '/get-language',

    'registerFilm': '/film'
}  

export default class Api{
    paginatorFilm(page){
        return get(`${routes.film}?page=${page}`)
    }

    getLanguage(){
        return get(routes.language)
    }

    async filmCreate(body){
        return await post(routes.registerFilm, body)
    }
}

function get(url){
    return new Promise((resolve) => {
        fetch(`${api}${url}`, {
            method: 'GET',
            headers: headers(),
        })
        .then(res => res.json())
        .then(data => {
            resolve(data);
        })
    })
}

function post(url, body){
    return new Promise((resolve) => {
        fetch(`${api}${url}`, {
            method: 'POST',
            headers: headers(),
            body: JSON.stringify(body),
        })
        .then(res => res.json())
        .then(data => {
            resolve(data)
        })
    })
}

// function put(url, body={}){
//     return new Promise((resolve) => {
//         fetch(`${api}${url}`, {
//             method: 'PUT',
//             headers: headers(),
//             body: JSON.stringify(body)
//         })
//         .then(res => res.json())
//         .then(data => {
//             resolve(data)
//         })
//     })
// }


function headers(){
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("X-Requested-With", "XMLHttpRequest");
    return headers;
}