'use strict';

import { init } from './modules/app.js';

init();
window.location.hash = '/';

// dom.button.addEventListener('click', async function(e) {
//     e.preventDefault();
//     saveInputData(dom.input.value);
//     const data = await handleData();
//     renderResults(data);

//     dom.input.value = '';
// });