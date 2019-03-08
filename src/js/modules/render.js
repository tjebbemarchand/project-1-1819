import { dom } from './app.js';
import { handleData, saveInputData } from './data.js';

function renderHomepage() {
    clearPage();
    const homepage = `
        <header class="header">
            <a href="/">
                <svg class="logo" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 607.09 322.22"><defs><style>.cls-1,.cls-2{fill:#fff;}.cls-2{fill-rule:evenodd;}</style></defs><title>oba-logo-white</title><path class="cls-1" d="M119.53,215.45c0-23.64-15.79-38-38.9-38s-38.92,14.14-38.92,38,15.61,38,38.92,38S119.53,239.33,119.53,215.45ZM0,215.45c0-47.22,31.84-85,80.63-85s80.68,38,80.68,85-31.84,85-80.68,85S0,262.9,0,215.45ZM536,198.9c0,14.46,1.28,46.58,22.16,46.58,11.34,0,16.75-12,16.75-22.3,0-18.57-9.8-35.87-28.85-35.87H536V198.9Zm48-11.34v.64c16.49,10.39,23.12,29.27,23.12,48.54,0,28.58-16.43,54.43-47.45,54.43-53.17,0-54.06-64.19-54.06-103.54-16.82,0-27.52,13.88-27.52,30.16a50.65,50.65,0,0,0,18.66,38.34l-25.91,25.34a98.1,98.1,0,0,1-25-67.48c0-55.07,28.15-69.71,79.34-69.71h78.14v43.28Z"/><path class="cls-2" d="M193.41,0h63.23V135.1h.82c14.33-19.71,38.85-26.81,65-26.81,58.21,0,93.61,52,93.61,108.68,0,61.84-40.31,105.25-100.74,105.25a79.61,79.61,0,0,1-62.86-31.69h-.82v26.94h-58.2V0ZM302.23,266.84c31.85,0,50.56-21,50.56-51.58s-19.1-51.59-50.56-51.59-50.62,20.91-50.62,51.78S270.71,267,302.23,267Z"/></svg>
            </a>
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
            // renderResults();
        }
    });
}

function renderResults(books) {
    clearPage();

    const searchedBook = books[0];
    const results = books.slice(1, books.length - 3);

    const chosenBook = `
        <h2>Als je '${searchedBook.titles["other-title"]._text}' leuk vond.</h2>
        <div class="searched-book">
            <img src="${searchedBook.coverimages.coverimage[1]._text}">
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
                    <img data-id="${book.identifiers["isbn-id"] ? book.identifiers["isbn-id"]._text : undefined}" src='${book.coverimages.coverimage[1]._text}'>
                </div>
            </div>
        `;
        booksContainer.insertAdjacentHTML('afterbegin', element);
    });

    document.querySelectorAll('.book-result').forEach(function(el) {
        el.addEventListener('click', function(e) {
            const id = e.srcElement.dataset.id;
            renderDetails(results, id);
        });
    });
}

function renderPopular() {
    let popular = localStorage.getItem('popular');
    popular = JSON.parse(popular);

    const title = document.createElement('h1');
    title.textContent = 'Populaire boeken deze week';
    title.classList = 'popular-title';
    dom.app.appendChild(title);

    const popularSection = document.createElement('section');
    popularSection.classList = 'popular-section';
    dom.app.appendChild(popularSection);

    popular.forEach(function(book) {
        const element = `
            <div class="book-result">
                <div class="book-result__image">
                    <img data-id="${book.identifiers.isbnId}" src='${book.images.full}'>
                </div>
            </div>
        `;
        popularSection.insertAdjacentHTML('afterbegin', element);
    });

    document.querySelectorAll('.book-result').forEach(function(el) {
        el.addEventListener('click', function(e) {
            const id = e.srcElement.dataset.id;
            renderDetails(popular, id);
        });
    });
}

function renderDetails(books, id) {
    const popupBook = books.find(function (book) {
        return true
    });

    const popup = `
        <div class="popup">
            <div class="popup__content">
                <div class="popup__left">
                    <img class="popup__image" src="${popupBook.coverimages.coverimage[1]._text}">
                </div>
                <div class="popup__right">
                    <a href="#" class="popup__close">&times;</a>
                    <span class="popup__like">&hearts;</span>
                    <h3 class="popup__title">${popupBook.titles.title._text}</h3>
                    <h4 class="popup__author">${popupBook.authors ? popupBook.authors.author._text : 'niet bekend'}</h4>
                    <p class="popup__summary">${popupBook.summaries ? popupBook.summaries.summary._text : ''}</p>
                    <uL class="popup__details">
                        <li>Taal: ${popupBook.languages ? popupBook.languages.language._text : 'niet bekend'}</li>
                        <li>Uitgebracht: ${popupBook.publication && popupBook.publication.publisher && popupBook.publication.publisher._text ? popupBook.publication.publisher._text : 'niet bekend'}</li>
                        <li>Jaar uitgebracht: ${popupBook.publication ? popupBook.publication.year._text : 'niet bekend'}</li>
                    </uL>
                </div>
            </div>
        </div>
    `;

    dom.app.insertAdjacentHTML('beforeend', popup);

    document.querySelector('.popup__close').addEventListener('click', function(e) {
        var elem = document.querySelector('.popup');
        elem.parentNode.removeChild(elem);
    });

    document.querySelector('.popup__like').addEventListener('click', function() {
        this.style.color = '#EB1F25';
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
    renderPopular,
    renderResults
};