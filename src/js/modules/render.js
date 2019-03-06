import { dom } from './app.js';
import { handleData, saveInputData } from './data.js';
import { limitBookTitle } from './utilities.js';
import { state } from './app.js';

function renderHomepage() {
    clearPage();
    // <div class="logo"><img src='./assets/img/oba-logo.svg'</div>
    const homepage = `
        <header class="header">
            <form class="search">
                <input type="text" placeholder="Zoek op een boek die je leuk vond..." class="search__input">
                <button type="submit" class="search__submit">Zoek</button>
            </form>
        </header>
    `;
    dom.page.insertAdjacentHTML('afterbegin', homepage);

    // Insert DOM elements into the DOM object.
    dom.form = document.querySelector('.search');
    dom.input = document.querySelector('.search__input');
    dom.searchBtn = document.querySelector('.search__submit');

    dom.searchBtn.addEventListener('click', async function(e) {
        e.preventDefault();
        
        const input = dom.input.value.toLowerCase();
        if(input !== '') {
            renderLoader();
            saveInputData(input);
            const data = await handleData();
            renderResults(data);
        }
    });
}

function renderResults(books) {
    clearPage();

    const searchedBook = books[0];
    const results = books.slice(1, books.length - 3);

    const chosenBook = `
        <h2>Als je '${searchedBook.title}' leuk vond.</h2>
        <div class="searched-book">
            <img src="${searchedBook.images.full}">
            <h3>${searchedBook.title}</h3>
        </div>
        <h2>Dan bevelen wij deze boeken aan...</h2>
    `;
    dom.app.insertAdjacentHTML('afterbegin', chosenBook);

    const booksContainer = document.createElement('section');
    booksContainer.classList = 'section-books';
    dom.app.appendChild(booksContainer);

    results.forEach(function(book) {
        const element = `
            <div class="book-result">
                <div class="book-result__image">
                    <img src='${book.images.full}'>
                </div>
            </div>
        `;
        booksContainer.insertAdjacentHTML('afterbegin', element);
    });
}

function clearPage() {
    while (dom.app.hasChildNodes()) {
        dom.app.removeChild(dom.app.firstChild); // Remove every element.
    }
}

function renderLoader() {
    const loader = `
        <div class="loader">
            <svg viewBox="0 0 456 488" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="1.41421">
            <g fill="#aaa59f" fill-rule="nonzero">
            <path d="M39.323 203.641c15.664 0 29.813-9.405 35.872-23.854 25.017-59.604 83.842-101.61 152.42-101.61 37.797 0 72.449 12.955 100.23 34.442l-21.775 3.371c-7.438 1.153-13.224 7.054-14.232 14.512-1.01 7.454 3.008 14.686 9.867 17.768l119.746 53.872c5.249 2.357 11.33 1.904 16.168-1.205 4.83-3.114 7.764-8.458 7.796-14.208l.621-131.943c.042-7.506-4.851-14.144-12.024-16.332-7.185-2.188-14.947.589-19.104 6.837l-16.505 24.805C354.398 26.778 294.1 0 227.615 0 126.806 0 40.133 61.562 3.167 149.06c-5.134 12.128-3.84 26.015 3.429 36.987 7.269 10.976 19.556 17.594 32.727 17.594zM448.635 301.184c-7.27-10.977-19.558-17.594-32.728-17.594-15.664 0-29.813 9.405-35.872 23.854-25.018 59.604-83.843 101.61-152.42 101.61-37.798 0-72.45-12.955-100.232-34.442l21.776-3.369c7.437-1.153 13.223-7.055 14.233-14.514 1.009-7.453-3.008-14.686-9.867-17.768L33.779 285.089c-5.25-2.356-11.33-1.905-16.169 1.205-4.829 3.114-7.764 8.458-7.795 14.207l-.622 131.943c-.042 7.506 4.85 14.144 12.024 16.332 7.185 2.188 14.948-.59 19.104-6.839l16.505-24.805c44.004 43.32 104.303 70.098 170.788 70.098 100.811 0 187.481-61.561 224.446-149.059 5.137-12.128 3.843-26.014-3.425-36.987z"/>
            </g>
            </svg>
        </div>
    `;
    dom.app.insertAdjacentHTML('afterbegin', loader); // Insert HTML into the DOM.
}

export {
    renderHomepage,
    renderResults
};