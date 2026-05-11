/* ═══════════════════ LANGUAGE SWITCHER & ROUTING ═══════════════════ */

// Diccionario de rutas exactas entre Español e Inglés
const routeMap = {
    // Inicio y raíz
    '/': '/en/index.html',
    '/es/': '/en/index.html',
    '/en/': '/es/index.html',
    '/es/index.html': '/en/index.html',
    '/en/index.html': '/es/index.html',

    // La Firma
    '/es/la-firma.html': '/en/the-firm.html',
    '/en/the-firm.html': '/es/la-firma.html',

    // Hub de servicios
    '/es/servicios/': '/en/services/',
    '/en/services/': '/es/servicios/',
    '/es/servicios/index.html': '/en/services/index.html',
    '/en/services/index.html': '/es/servicios/index.html',

    // Subpáginas de servicios
    '/es/servicios/litigios.html': '/en/services/litigation.html',
    '/en/services/litigation.html': '/es/servicios/litigios.html',

    '/es/servicios/corporativo.html': '/en/services/corporate.html',
    '/en/services/corporate.html': '/es/servicios/corporativo.html',

    '/es/servicios/personas.html': '/en/services/individuals.html',
    '/en/services/individuals.html': '/es/servicios/personas.html',

    // Otras páginas
    '/es/internacional.html': '/en/international.html',
    '/en/international.html': '/es/internacional.html',

    '/es/contacto.html': '/en/contact.html',
    '/en/contact.html': '/es/contacto.html',

    '/es/recursos.html': '/en/resources.html',
    '/en/resources.html': '/es/recursos.html'
};

function switchLanguage(targetLang) {
    // Save preference
    localStorage.setItem('preferredLang', targetLang);

    const currentPath = window.location.pathname;
    const currentHash = window.location.hash;

    // Find if the current path exists in our map
    let targetPath = '/';

    // Exact match or normalize it
    // Verify if the current path already matches the target language.
    const isCurrentlyEn = currentPath.startsWith('/en/');
    const isCurrentlyEs = currentPath.startsWith('/es/');

    if ((targetLang === 'en' && isCurrentlyEn) || (targetLang === 'es' && isCurrentlyEs)) {
        // User clicked the language they are already on.
        return;
    }

    if (routeMap[currentPath]) {
        targetPath = routeMap[currentPath];
    } else {
        // Fallback checks
        let normalizedPath = currentPath;
        if (!normalizedPath.endsWith('.html') && !normalizedPath.endsWith('/')) {
             normalizedPath += '/';
        }

        if (routeMap[normalizedPath]) {
            targetPath = routeMap[normalizedPath];
        } else {
            // Default fallbacks if page not found in dictionary
            if (targetLang === 'en') {
                targetPath = '/en/index.html';
            } else {
                targetPath = '/es/index.html';
            }
        }
    }

    // Redirect
    window.location.href = targetPath + currentHash;
}

// Auto-detect and redirect on root index.html
document.addEventListener('DOMContentLoaded', () => {
    const isRoot = window.location.pathname === '/' || window.location.pathname === '/index.html';

    if (isRoot) {
        const saved = localStorage.getItem('preferredLang');
        if (saved === 'en') {
            window.location.replace('/en/index.html');
        } else if (saved === 'es') {
            window.location.replace('/es/index.html');
        } else {
            const browserLang = navigator.language || 'es';
            if (browserLang.startsWith('en')) {
                window.location.replace('/en/index.html');
            } else {
                window.location.replace('/es/index.html');
            }
        }
    }
});
