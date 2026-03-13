let currentStep = 1;

function nextStep() {
  if (validateStep(currentStep)) {
    // Mark current step as completed
    document.querySelector(`.step[data-step="${currentStep}"]`).classList.add('completed');
    document.querySelector(`.step[data-step="${currentStep}"]`).classList.remove('active');
    
    // Hide current form step
    document.querySelector(`.form-step[data-step="${currentStep}"]`).classList.remove('active');
    
    // Move to next step
    currentStep++;
    
    // Show next step
    document.querySelector(`.step[data-step="${currentStep}"]`).classList.add('active');
    document.querySelector(`.form-step[data-step="${currentStep}"]`).classList.add('active');
    
    // Update summary if on step 3
    if (currentStep === 3) {
      updateSummary();
    }
  }
}

function prevStep() {
  // Remove completed from current step
  document.querySelector(`.step[data-step="${currentStep}"]`).classList.remove('active');
  
  // Hide current form step
  document.querySelector(`.form-step[data-step="${currentStep}"]`).classList.remove('active');
  
  // Move to previous step
  currentStep--;
  
  // Show previous step
  document.querySelector(`.step[data-step="${currentStep}"]`).classList.remove('completed');
  document.querySelector(`.step[data-step="${currentStep}"]`).classList.add('active');
  document.querySelector(`.form-step[data-step="${currentStep}"]`).classList.add('active');
}

function validateStep(step) {
  const currentFormStep = document.querySelector(`.form-step[data-step="${step}"]`);
  const inputs = currentFormStep.querySelectorAll('input[required], select[required], textarea[required]');
  let isValid = true;
  
  inputs.forEach(input => {
    input.classList.remove('error');
    if (!input.value || (input.type === 'checkbox' && !input.checked)) {
      input.classList.add('error');
      isValid = false;
    }
  });
  
  return isValid;
}

function updateSummary() {
  const destination = document.getElementById('destination');
  const packageSelect = document.getElementById('package');
  const travelDate = document.getElementById('travelDate').value;
  const returnDate = document.getElementById('returnDate').value;
  const adults = document.getElementById('adults').value;
  const children = document.getElementById('children').value;
  const transport = document.querySelector('input[name="transport"]:checked').value;
  
  document.getElementById('summaryDestination').textContent = destination.options[destination.selectedIndex].text;
  document.getElementById('summaryPackage').textContent = packageSelect.options[packageSelect.selectedIndex].text;
  document.getElementById('summaryDates').textContent = `${travelDate} to ${returnDate}`;
  document.getElementById('summaryTravelers').textContent = `${adults} Adults, ${children} Children`;
  document.getElementById('summaryTransport').textContent = transport.charAt(0).toUpperCase() + transport.slice(1);
}

// Form submission
document.getElementById('bookingForm').addEventListener('submit', (e) => {
  e.preventDefault();
  
  if (validateStep(3)) {
    // Hide form card
    document.getElementById('formCard').style.display = 'none';
    
    // Show success state
    const successState = document.getElementById('successState');
    successState.classList.add('active');
  }
});
