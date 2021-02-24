const api = 'http://localhost/api';
const routes = {
    'film': '/film',
    'language': '/get-language',

    'searchFilm': '/search-film',
    'getOneFilm': '/search-one-film',

    'consultLenguage': '/get-film-by-language'

}  

export default class Api{
    paginatorFilm(page){
        return get(`${routes.film}?page=${page}`)
    }

    getLanguage(){
        return get(routes.language)
    }

    async filmCreate(body){
        await post(routes.film, body)
        return location.reload();
    }

    getFilmSearch(search){
        return get(`${routes.searchFilm}/${search}`)
    }

    async deletFilmSearch(id){
        await delet(`${routes.film}/${id}`)
        return location.reload();
    }

    getOneFilm(name){
        return get(`${routes.getOneFilm}/${name}`);
    }

    async filmUpdate(body, id){
        await put(`${routes.film}/${id}`, body);
        return location.reload();
        
    }

    consultLanguageFilm(language, page){
        return get(`${routes.consultLenguage}/${language}?page=${page}`)
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

function delet(url){
    return new Promise((resolve) => {
        fetch(`${api}${url}`, {
            method: 'DELETE',
            headers: headers(),
        })
        .then(res => res.json())
        .then(data => {
            resolve(data)
        })
    })
}

function put(url, body={}){
    return new Promise((resolve) => {
        fetch(`${api}${url}`, {
            method: 'PUT',
            headers: headers(),
            body: JSON.stringify(body)
        })
        .then(res => res.json())
        .then(data => {
            resolve(data)
        })
    })
}


function headers(){
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("X-Requested-With", "XMLHttpRequest");
    return headers;
}