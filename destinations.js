// Filter functionality for destinations page
const filterButtons = document.querySelectorAll('.filter-btn');
const destinationCards = document.querySelectorAll('.destination-card');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Remove active class from all buttons
    filterButtons.forEach(btn => btn.classList.remove('active'));
    
    // Add active class to clicked button
    button.classList.add('active');
    
    // Get filter value
    const filterValue = button.getAttribute('data-filter');
    
    // Filter cards
    destinationCards.forEach(card => {
      const cardRegion = card.getAttribute('data-region');
      
      if (filterValue === 'all' || cardRegion === filterValue) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });
  });
});
