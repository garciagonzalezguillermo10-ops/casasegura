document.addEventListener('DOMContentLoaded', () => {

  // Smooth scroll para los enlaces de nav
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Formulario de contacto
  const form = document.getElementById('form-contacto');
  const respuesta = document.getElementById('respuesta');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const nombre = document.getElementById('nombre').value.trim();
    respuesta.textContent = `Gracias, ${nombre}. Te contactaremos pronto.`;
    form.reset();
  });

});
