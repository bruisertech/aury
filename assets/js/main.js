/* ═══════════════════ MAIN JS ═══════════════════ */

document.addEventListener('DOMContentLoaded', () => {
    /* ═══════════════════ HEADER SCROLL ═══════════════════ */
    const header = document.querySelector('header');
    if (header) {
      window.addEventListener('scroll', () => {
        header.style.background = window.scrollY > 60 ? 'rgba(4,8,16,0.99)' : 'rgba(8,15,32,0.97)';
      });
      // Set initial state
      header.style.background = window.scrollY > 60 ? 'rgba(4,8,16,0.99)' : 'rgba(8,15,32,0.97)';
    }

    /* ═══════════════════ MOBILE NAV ═══════════════════ */
    const hamburger = document.getElementById('hamburger');
    const mobileNav = document.getElementById('mobile-nav');

    if (hamburger && mobileNav) {
      hamburger.addEventListener('click', toggleMobile);
    }

    function toggleMobile() {
      mobileNav.classList.toggle('open');
      hamburger.classList.toggle('open');
    }

    window.closeMobile = function() {
      if (mobileNav) mobileNav.classList.remove('open');
      if (hamburger) hamburger.classList.remove('open');
    };

    /* ═══════════════════ TABS ═══════════════════ */
    window.showTab = function(tabId, ev) {
      document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      const targetTab = document.getElementById('tab-' + tabId);
      if(targetTab) targetTab.classList.add('active');
      if(ev && ev.currentTarget) ev.currentTarget.classList.add('active');
    };

    /* ═══════════════════ SMOOTH SCROLL ═══════════════════ */
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', e => {
        const href = a.getAttribute('href');
        if(href === '#') return;
        const target = document.querySelector(href);
        if(target) { e.preventDefault(); target.scrollIntoView({behavior:'smooth',block:'start'}); }
      });
    });

    /* ═══════════════════ SCROLL REVEAL ═══════════════════ */
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('visible'); });
    }, {threshold: 0.08});

    document.querySelectorAll('.reveal, .area-card, .sol-card, .service-feature, .credential-item, .recurso-card, .nivel').forEach(el => {
      el.classList.add('reveal');
      revealObserver.observe(el);
    });

    /* ═══════════════════ POLICIES MODAL ═══════════════════ */
    window.openPolicy = function(id) {
        // Find policy elements or create them if they don't exist
        let modal = document.getElementById('policies-modal');
        if (!modal) return;

        const data = policyContent[id];
        if(!data) return;
        document.getElementById('policies-content').innerHTML = `
          <h2>${data.title}</h2>
          <p class="policy-date">${data.date}</p>
          ${data.content}
        `;
        modal.classList.add('open');
        document.body.style.overflow = 'hidden';
    };

    window.closePolicies = function() {
        const modal = document.getElementById('policies-modal');
        if (modal) modal.classList.remove('open');
        document.body.style.overflow = '';
    };

    window.closePoliciesIf = function(e) {
        if(e.target === document.getElementById('policies-modal')) closePolicies();
    };

    /* ═══════════════════ KEYBOARD ESC ═══════════════════ */
    document.addEventListener('keydown', e => {
      if(e.key === 'Escape') {
          if(typeof closeModal === 'function') closeModal();
          if(typeof closePolicies === 'function') closePolicies();
      }
    });

    /* ═══════════════════ FORM SUBMIT ═══════════════════ */
    window.submitForm = function() {
        const nombre = document.getElementById('f-nombre').value.trim();
        const email = document.getElementById('f-email').value.trim();
        const area = document.getElementById('f-area').value;
        const caso = document.getElementById('f-caso').value.trim();
        const privacidadEl = document.getElementById('privacidad');
        const privacidad = privacidadEl ? privacidadEl.checked : false;

        // Determine current language from URL or path
        const isEng = window.location.pathname.includes('/en/');
        const lang = isEng ? 'en' : 'es';

        if(!nombre || !email || !area || !caso) {
          alert(lang === 'es' ? 'Por favor complete todos los campos obligatorios (*)' : 'Please fill in all required fields (*)');
          return;
        }
        if(!privacidad) {
          alert(lang === 'es' ? 'Debe aceptar la Política de Privacidad para continuar.' : 'You must accept the Privacy Policy to continue.');
          return;
        }

        const tel = document.getElementById('f-tel').value;
        const pais = document.getElementById('f-pais').value;
        const subject = encodeURIComponent(`Consulta Jurídica — ${area} — ${nombre}`);
        const body = encodeURIComponent(`NUEVA CONSULTA JURÍDICA\n\nNombre: ${nombre}\nTeléfono: ${tel}\nEmail: ${email}\nPaís: ${pais}\nÁrea: ${area}\n\nDescripción del caso:\n${caso}\n\n---\nEnviado desde www.aurydiaz.com`);

        window.location.href = `mailto:auryfernandiaz@gmail.com?cc=fernan@aurydiaz.com&subject=${subject}&body=${body}`;

        const formContent = document.getElementById('form-content');
        const formSuccess = document.getElementById('form-success');
        if (formContent) formContent.style.display = 'none';
        if (formSuccess) formSuccess.style.display = 'block';
    };
  });

  // Política de datos centralizada
  const policyContent = {
      privacidad: {
        title: 'Política de Privacidad y Tratamiento de Datos Personales',
        date: 'Última actualización: Enero 2025',
        content: `
          <h3>1. Responsable del Tratamiento</h3>
          <p>Aury Díaz & Asociados, liderado por Aury Fernán Díaz Alarcón, con domicilio en la ciudad de Santiago de Cali, Valle del Cauca, Colombia. Correo: fernan@aurydiaz.com</p>
          <h3>2. Fundamento Legal</h3>
          <p>Esta política se rige por la <strong>Ley 1581 de 2012</strong> de Protección de Datos Personales, el <strong>Decreto 1377 de 2013</strong> y demás normas concordantes. Para clientes internacionales, también se consideran los principios del <strong>GDPR</strong> (Reglamento Europeo) y las regulaciones aplicables en EE.UU.</p>
          <h3>3. Datos que Recopilamos</h3>
          <p>Recopilamos únicamente los datos necesarios para prestar el servicio jurídico: nombre, teléfono, correo electrónico, país de residencia y descripción del asunto jurídico. No recopilamos datos sensibles sin consentimiento expreso.</p>
          <h3>4. Finalidad del Tratamiento</h3>
          <ul><li>Prestación de servicios jurídicos contratados</li><li>Comunicación sobre el estado de los asuntos</li><li>Envío de información jurídica relevante (con opción de cancelación)</li><li>Cumplimiento de obligaciones legales profesionales</li></ul>
          <h3>5. Secreto Profesional</h3>
          <p>Toda la información proporcionada está protegida por el <strong>secreto profesional del abogado</strong>, conforme al artículo 28 del Código Disciplinario del Abogado. Esta protección es absoluta e inviolable.</p>
          <h3>6. Derechos del Titular</h3>
          <p>Usted tiene derecho a: conocer, actualizar, rectificar, suprimir sus datos y revocar la autorización. Puede ejercerlos escribiendo a fernan@aurydiaz.com.</p>
          <h3>7. Habeas Data</h3>
          <p>Para solicitar la baja o modificación de sus datos, envíe comunicación escrita a fernan@aurydiaz.com. Responderemos en un plazo máximo de 15 días hábiles conforme a la Ley 1581 de 2012.</p>
        `
      },
      terminos: {
        title: 'Términos de Uso del Sitio Web',
        date: 'Última actualización: Enero 2025',
        content: `
          <h3>1. Naturaleza del Contenido</h3>
          <p>El contenido de este sitio web tiene carácter <strong>informativo y educativo</strong>. No constituye asesoría jurídica. Cada caso tiene sus propias particularidades y requiere análisis profesional individualizado.</p>
          <h3>2. Relación Abogado-Cliente</h3>
          <p>La relación profesional abogado-cliente solo se establece mediante contrato de prestación de servicios jurídicos debidamente suscrito. El formulario de contacto no crea dicha relación.</p>
          <h3>3. Propiedad Intelectual</h3>
          <p>Todos los contenidos del sitio (textos, diseño, marca Aury Díaz & Asociados) son propiedad exclusiva de Aury Fernán Díaz Alarcón. Queda prohibida su reproducción sin autorización expresa.</p>
          <h3>4. Limitación de Responsabilidad</h3>
          <p>Aury Díaz & Asociados no se responsabiliza por decisiones tomadas con base en el contenido informativo del sitio sin haber obtenido asesoría jurídica formal y personalizada.</p>
          <h3>5. Ley Aplicable</h3>
          <p>Este sitio se rige por las leyes de la República de Colombia. Para asuntos con elementos internacionales, se aplicarán los tratados y convenios internacionales vigentes.</p>
        `
      },
      aviso: {
        title: 'Aviso Legal',
        date: 'Enero 2025',
        content: `
          <h3>Identificación del Titular</h3>
          <p><strong>Razón Social:</strong> Aury Díaz & Asociados<br><strong>Propietario:</strong> Aury Fernán Díaz Alarcón<br><strong>Tarjeta Profesional:</strong> Abogado inscrito ante el Consejo Superior de la Judicatura<br><strong>Domicilio:</strong> Santiago de Cali, Valle del Cauca, Colombia<br><strong>Contacto:</strong> fernan@aurydiaz.com</p>
          <h3>Ejercicio Profesional</h3>
          <p>El Dr. Aury Fernán Díaz Alarcón ejerce la abogacía de manera independiente, regulado por la <strong>Ley 1123 de 2007</strong> (Código Disciplinario del Abogado) y sometido a la ética y deontología profesional.</p>
          <h3>Conflicto de Intereses</h3>
          <p>Aury Díaz & Asociados no ha estado ni está vinculado a ninguna entidad pública o privada que pueda generar conflictos de interés. Toda representación se realiza con plena independencia.</p>
          <h3>Confidencialidad</h3>
          <p>El secreto profesional es un deber irrenunciable del abogado. Toda información recibida de clientes o potenciales clientes es estrictamente confidencial.</p>
        `
      },
      cookies: {
        title: 'Política de Cookies',
        date: 'Enero 2025',
        content: `
          <h3>¿Qué son las Cookies?</h3>
          <p>Las cookies son pequeños archivos de texto que se almacenan en su dispositivo cuando visita nuestro sitio web. Nos permiten mejorar su experiencia de navegación.</p>
          <h3>Cookies que Utilizamos</h3>
          <ul>
            <li><strong>Cookies técnicas (esenciales):</strong> Necesarias para el funcionamiento básico del sitio. No requieren consentimiento.</li>
            <li><strong>Cookie de idioma:</strong> Almacena su preferencia de idioma (español/inglés). Se guarda en localStorage.</li>
            <li><strong>Cookies de análisis:</strong> Si se activan, nos ayudan a entender cómo se usa el sitio (Google Analytics). Requieren su consentimiento.</li>
          </ul>
          <h3>Base Legal</h3>
          <p>La gestión de cookies se realiza conforme a la <strong>Ley 1581 de 2012</strong> y los estándares internacionales aplicables.</p>
          <h3>Gestión de Cookies</h3>
          <p>Puede configurar su navegador para bloquear o eliminar cookies. Esto puede afectar la funcionalidad del sitio. Para más información sobre gestión de cookies, visite la ayuda de su navegador.</p>
          <h3>Contacto</h3>
          <p>Para consultas sobre cookies: fernan@aurydiaz.com</p>
        `
      }
    };
