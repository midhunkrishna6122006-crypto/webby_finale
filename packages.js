document.addEventListener('DOMContentLoaded', () => {
  // Accordion functionality for package itineraries
  const accordionTriggers = document.querySelectorAll('.accordion-trigger');

  accordionTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const packageCard = trigger.closest('.package-card');
      const isOpen = packageCard.classList.contains('open');
      
      // Close all other accordions
      document.querySelectorAll('.package-card').forEach(card => {
        card.classList.remove('open');
        const btn = card.querySelector('.accordion-trigger');
        if (btn) {
          btn.textContent = 'View Itinerary ↓';
        }
      });
      
      // Toggle current accordion
      if (!isOpen) {
        packageCard.classList.add('open');
        trigger.textContent = 'Hide Itinerary ↑';
      } else {
        packageCard.classList.remove('open');
        trigger.textContent = 'View Itinerary ↓';
      }
    });
  });

  // Destination query parameter filtering (show ONLY the relevant package)
  const params = new URLSearchParams(window.location.search);
  const destination = (params.get('destination') || '').toLowerCase().trim();
  if (!destination) return; // no param: show all packages normally

  const labelMap = {
    bali: 'Bali',
    tokyo: 'Tokyo',
    japan: 'Japan',
    bangkok: 'Bangkok',
    santorini: 'Santorini',
    paris: 'Paris',
    rome: 'Rome',
    maldives: 'Maldives',
    sydney: 'Sydney',
    safari: 'Safari',
    newyork: 'New York',
    rio: 'Rio de Janeiro'
  };

  const label = labelMap[destination] || (destination.charAt(0).toUpperCase() + destination.slice(1));

  // Update hero title + subtitle
  const heroTitle = document.querySelector('.page-hero h1');
  if (heroTitle) heroTitle.textContent = `${label} Packages`;

  const heroSub = document.querySelector('.page-hero .hero-sub');
  if (heroSub) heroSub.textContent = `Showing packages for: ${label}`;

  const allCards = document.querySelectorAll('.package-card');
  let anyMatch = false;

  allCards.forEach(card => {
    const cardDests = (card.getAttribute('data-destination') || '').toLowerCase();
    if (cardDests.includes(destination)) {
      card.style.display = 'block';
      anyMatch = true;
    } else {
      card.style.display = 'none';
    }
  });

  const grid = document.querySelector('.packages-grid');

  // If no package exists for this destination, show a friendly message
  if (!anyMatch && grid) {
    grid.innerHTML = `
      <div class="no-package-msg" style="grid-column:1/-1; text-align:center; padding:80px 20px;">
        <h3 style="font-family:'Cormorant Garamond',serif; font-size:36px; color:var(--ocean); margin-bottom:16px;">
          No dedicated package yet for this destination
        </h3>
        <p style="font-family:'Outfit',sans-serif; font-size:16px; color:rgba(10,10,10,0.6); margin-bottom:32px;">
          We're crafting something special. In the meantime, explore our other curated packages.
        </p>
        <a href="packages.html" class="btn-primary">View All Packages →</a>
      </div>`;
    return;
  }

  // Add a "View All Packages" back button at the top of the grid
  if (grid && anyMatch) {
    const backBtn = document.createElement('div');
    backBtn.style.cssText = 'grid-column:1/-1; text-align:left; margin-bottom:8px;';
    backBtn.innerHTML = `<a href="packages.html" class="btn-outline-dark" style="font-size:14px;">← View All Packages</a>`;
    grid.prepend(backBtn);
  }
});
