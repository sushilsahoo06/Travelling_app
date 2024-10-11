function validateForm() {
  const country = document.getElementById('#country').value;

  // Check if country contains only letters and spaces
  const isValidCountry = /^[A-Za-z\s]+$/.test(country);

  if (!isValidCountry) {
    alert('Invalid country name! Please enter only letters.');
    return false;  // Prevent the form from being submitted
  }

  return true;  // Allow the form to be submitted
}
