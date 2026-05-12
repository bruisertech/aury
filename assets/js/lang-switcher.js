/* ═══════════════════ LANGUAGE SWITCHER & ROUTING ═══════════════════ */

// Diccionario de rutas exactas entre Español e Inglés
const routeMap = {
    // Inicio y raíz
    '/': '/en/index.html',
    '/index.html': '/en/index.html',
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

    const isCurrentlyEn = currentPath.indexOf('/en/') !== -1;
    const isCurrentlyEs = currentPath.indexOf('/es/') !== -1;

    if ((targetLang === 'en' && isCurrentlyEn) || (targetLang === 'es' && isCurrentlyEs)) {
        return; // Already on the correct language
    }

    // Try to normalize the path by stripping the root path (useful for GH pages)
    let normalizedCheckPath = currentPath;
    let rootPath = '';

    if (isCurrentlyEs) {
        const idx = currentPath.indexOf('/es/');
        rootPath = currentPath.substring(0, idx);
        normalizedCheckPath = currentPath.substring(idx);
    } else if (isCurrentlyEn) {
        const idx = currentPath.indexOf('/en/');
        rootPath = currentPath.substring(0, idx);
        normalizedCheckPath = currentPath.substring(idx);
    } else {
        const lastSlash = currentPath.lastIndexOf('/');
        rootPath = currentPath.substring(0, lastSlash);
        normalizedCheckPath = '/' + currentPath.substring(lastSlash + 1);
    }

    let targetPath = '/';

    if (routeMap[normalizedCheckPath]) {
        targetPath = routeMap[normalizedCheckPath];
    } else {
        // Fallback checks
        let normalizedPath = normalizedCheckPath;
        if (!normalizedPath.endsWith('.html') && !normalizedPath.endsWith('/')) {
             normalizedPath += '/';
        }

        if (routeMap[normalizedPath]) {
            targetPath = routeMap[normalizedPath];
        } else {
            if (targetLang === 'en') {
                targetPath = '/en/index.html';
            } else {
                targetPath = '/es/index.html';
            }
        }
    }

    window.location.href = rootPath + targetPath + currentHash;
}

// Auto-detect and redirect on root index.html
document.addEventListener('DOMContentLoaded', () => {
    const isEs = window.location.pathname.indexOf('/es/') !== -1;
    const isEn = window.location.pathname.indexOf('/en/') !== -1;

    // Only redirect if we are not in an es/ or en/ subfolder (meaning we are at the root)
    if (!isEs && !isEn) {
        const saved = localStorage.getItem('preferredLang');
        if (saved === 'en') {
            window.location.replace('./en/index.html');
        } else if (saved === 'es') {
            window.location.replace('./es/index.html');
        } else {
            const browserLang = navigator.language || 'es';
            if (browserLang.startsWith('en')) {
                window.location.replace('./en/index.html');
            } else {
                window.location.replace('./es/index.html');
            }
        }
    }
});
