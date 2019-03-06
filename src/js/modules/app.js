'use strict';

import setupRoutes from './router.js';
import { renderHomepage } from './render.js';

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
}

export { dom, state, init };