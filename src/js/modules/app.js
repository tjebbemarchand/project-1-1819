'use strict';

import setupRoutes from './router.js';

const dom = {
    app: document.querySelector('main')
};

const state = {
    searchQuery: ''
};

function init() {
    setupRoutes();
}

export { dom, state, init };