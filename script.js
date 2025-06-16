// Optional: add scroll-based highlighting
window.addEventListener('scroll', () => {
  document.querySelectorAll('.snake-point').forEach(el => {
    const rect = el.getBoundingClientRect();
    el.classList.toggle('active', rect.top < window.innerHeight / 2);
  });
});
