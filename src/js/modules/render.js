import { dom } from './app.js';
import { saveInputData } from './data.js';
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
    dom.app.insertAdjacentHTML('afterbegin', homepage);

    // Insert DOM elements into the DOM object.
    dom.form = document.querySelector('.search');
    dom.input = document.querySelector('.search__input');
    dom.searchBtn = document.querySelector('.search__submit');

    dom.searchBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        const input = dom.input.value.toLowerCase();
        if(input !== '') {
            saveInputData(input);
            window.location.hash = `/overviewpage`;
        }
    });
}

function renderOverviewpage(books) {
    clearPage();

    const searchedBook = books[0];
    const results = books.slice(1, books.length);

    const chosenBook = `
        <div class="searched-book">
            <img src="${searchedBook.images.full}">
            <h3>${searchedBook.title}</h3>
        </div>
    `;
    dom.app.insertAdjacentHTML('afterbegin', chosenBook);

    const booksContainer = document.createElement('section');
    booksContainer.classList = 'books';
    dom.app.appendChild(booksContainer);

    results.forEach(function(book) {
        const element = `
            <div class="books__book">
                <img src='${book.images.full}'>
                <h3>${book.title}</h3>
                <span>${book.author.fullname}</span>
            </div>
        `;
        booksContainer.insertAdjacentHTML('afterbegin', element);
    });
}

function renderResults(data) {
    console.log(data);
}

function clearPage() {
    while (dom.app.hasChildNodes()) {
        dom.app.removeChild(dom.app.firstChild); // Remove every element.
    }
}

export {
    renderHomepage,
    renderOverviewpage,
    renderResults
};