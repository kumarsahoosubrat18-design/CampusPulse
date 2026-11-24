// Filter event cards by type and search text.
document.querySelectorAll("[data-event-browser]").forEach((browser) => {
  const buttons = browser.querySelectorAll("[data-event-filter]");
  const cards = browser.querySelectorAll("[data-event-type]");
  const search = browser.querySelector("#event-search");
  const results = browser.querySelector("#event-results");
  const emptyMessage = browser.querySelector("#event-empty");
  let activeType = "all";

  function showMatchingEvents() {
    const query = search.value.trim().toLowerCase();
    let visibleCount = 0;

    cards.forEach((card) => {
      const typeMatches = activeType === "all" || card.dataset.eventType === activeType;
      const textMatches = card.textContent.toLowerCase().includes(query);
      card.hidden = !(typeMatches && textMatches);
      if (!card.hidden) visibleCount++;
    });

    results.textContent = `${visibleCount} ${visibleCount === 1 ? "event" : "events"} shown`;
    emptyMessage.hidden = visibleCount > 0;
  }

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      activeType = button.dataset.eventFilter;
      buttons.forEach((item) => {
        const selected = item === button;
        item.classList.toggle("is-selected", selected);
        item.setAttribute("aria-pressed", selected);
      });
      showMatchingEvents();
    });
  });

  search.addEventListener("input", showMatchingEvents);
  showMatchingEvents();
});
