import { API } from '../../../node_modules/oba-wrapper/js/index.js';
import { saveData, cleanData } from './data.js';
import state from './state.js';

async function getBooks() {
    localStorage.clear();
    const api = new API({
        key: "1e19898c87464e239192c8bfe422f280"
    });

    // const stream = await api.createStream(`search/${state.searchQuery}&facet=type(book)&librarian=true`);
    // stream
    //     .pipe(renderResults);

    const iterator = await api.createIterator(`search/${state.searchQuery}&facet=type(book)&librarian=true`);
    for await (const response of iterator) {
        const data = response.map(function(item) {
            return cleanData(item);
        });

        saveData(data);
        return data;
    }
}
    
export { getBooks };