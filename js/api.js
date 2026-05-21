const BASE_URL = "http://185.72.144.247:7757";

let allFilms = [];
let top25Films = [];
let allActors = [];

async function fetchFilms() {
    try {
        const response = await fetch(`${BASE_URL}/films`);
        const data = await response.json();
        allFilms = data;
        return data;
    } catch (error) {
        console.error('Ошибка загрузки фильмов:', error);
        return [];
    }
}

async function fetchTop25() {
    try {
        const response = await fetch(`${BASE_URL}/top25`);
        const data = await response.json();
        top25Films = data;
        return data;
    } catch (error) {
        console.error('Ошибка загрузки ТОП-25:', error);
        return [];
    }
}

async function fetchActors() {
    try {
        const response = await fetch(`${BASE_URL}/actors`);
        const data = await response.json();
        allActors = data;
        return data;
    } catch (error) {
        console.error('Ошибка загрузки актёров:', error);
        return [];
    }
}

async function fetchFilmById(id) {
    try {
        const response = await fetch(`${BASE_URL}/films/${id}`);
        return await response.json();
    } catch (error) {
        console.error('Ошибка загрузки фильма:', error);
        return null;
    }
}

async function fetchActorById(id) {
    try {
        const response = await fetch(`${BASE_URL}/actors/${id}`);
        return await response.json();
    } catch (error) {
        console.error('Ошибка загрузки актёра:', error);
        return null;
    }
}