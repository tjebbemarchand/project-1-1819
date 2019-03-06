import { renderHomepage } from './render.js';
import { handleData } from './data.js';

export default function setupRoutes() {
    routie({
        '/': function() {
            renderHomepage();
        },
        '/overviewpage': async function() {
            const data = await handleData();
            renderOverviewpage(data);
        }
    });
}