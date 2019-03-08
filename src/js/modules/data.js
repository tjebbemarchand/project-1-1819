import { getBooks } from './api.js';
import state from './state.js';

async function handleData() {
    // localStorage.clear();
    let localStorageData = localStorage.getItem('oba');
    localStorageData = JSON.parse(localStorageData);

    let data;
    if (!localStorageData) {
        data = await getBooks();
    } else {
        data = localStorageData;
    }

    return data;
}

function cleanData(item) {
    return {
        author: {
            fullname: item.author && item.author.fullname ? item.author.fullname : undefined,
            firstname: item.author && item.author.firstname ? item.author.firstname : undefined,
            lastname: item.author && item.author.lastname ? item.author.lastname : undefined
        },
        format: item.format ? item.format : undefined,
        identifiers: {
            isbnId: item.identifiers && item.identifiers[1] ? item.identifiers[1]["isbn-id"] : undefined
        },
        images: {
            small: item.images && item.images[0] ? item.images[0] : undefined,
            full: item.images && item.images[1] ? item.images[1] : undefined
        },
        languages: item.original ? item.original : undefined,
        publication: {
            publisher: item.publication && item.publication.publisher ? item.publication.publisher : undefined,
            year: item.publication && item.publication.year ? item.publication.year : undefined
        },
        series: item.series ? item.series : undefined,
        genre: item.genres ? item.genres : undefined,
        subjects: item.subjects ? item.subjects : undefined,
        summary: item.summary ? item.summary : undefined,
        targetAudiences: item.targetAudiences ? item.targetAudiences : undefined,
        title: item.title ? item.title.full : undefined
    }
}

function saveInputData(input) {
    state.searchQuery = input;
}

function saveData(data) {
    localStorage.setItem('results', JSON.stringify(data));
}

export {
    handleData,
    cleanData,
    saveInputData,
    saveData
};