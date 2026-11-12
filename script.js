// VORTEX DIGITAL — personalize os dados de contato antes de publicar.
const WHATSAPP_NUMBER = "5564999712061"; // Troque pelo número real: país + DDD + número, somente dígitos.

document.getElementById("year").textContent = new Date().getFullYear();

const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");
menuToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});
nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  nav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
}));

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

document.getElementById("contact-form").addEventListener("submit", event => {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const name = form.get("name").trim();
  const email = form.get("email").trim();
  const service = form.get("service");
  const message = form.get("message").trim();

  if (!/^\d{10,15}$/.test(WHATSAPP_NUMBER)) {
    alert("Configure o número de WhatsApp no arquivo script.js antes de usar o formulário.");
    return;
  }

  const text = [
    "Olá! Vim pelo site da Vortex Digital.",
    "",
    `Nome: ${name}`,
    `E-mail: ${email}`,
    `Serviço: ${service}`,
    `Projeto: ${message}`
  ].join("\n");

  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
});