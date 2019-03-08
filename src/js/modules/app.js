'use strict';

import { renderHomepage, renderPopular } from './render.js';

const dom = {
    page: document.querySelector('body'),
    app: document.querySelector('main')
};

const state = {
    searchQuery: ''
};

function init() {
    // setupRoutes();
    renderHomepage();
    // renderPopular();
}

export { dom, state, init };