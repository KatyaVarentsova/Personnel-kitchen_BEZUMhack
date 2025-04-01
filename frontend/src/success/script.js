document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".card");
  function showTooltip(card) {
    const tooltip = document.createElement("div");
    tooltip.className = "card-tooltip";
    tooltip.textContent = "Да хватит уже тыкать на все подряд!!!";
    document.body.appendChild(tooltip);
    
    const rect = card.getBoundingClientRect();
    tooltip.style.left = rect.left + "px";
    tooltip.style.top = (rect.top - 30) + "px";
    
    setTimeout(() => {
      tooltip.remove();
    }, 1500);
  }

  cards.forEach(card => {
    card.addEventListener("click", () => {
      showTooltip(card);
    });
  });
});
