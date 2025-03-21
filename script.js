// Add an event listener to handle the form submission
document.getElementById('zipForm').addEventListener('submit', function(e) {
  e.preventDefault(); // Prevent the default form submission behavior
  const zip = document.getElementById('zip').value.trim(); // Get the zip code entered by the user
  const resultDiv = document.getElementById('result');
  resultDiv.innerHTML = 'Loading...'; // Show a loading message

  // Fetch data from the Zippopotam.us API using the provided zip code
  fetch(`https://api.zippopotam.us/us/${zip}`)
    .then(response => {
      if (!response.ok) {
        // If response is not ok, throw an error
        throw new Error('Zip code not found');
      }
      return response.json(); // Parse the JSON response
    })
    .then(data => {
      // Clear previous result and display new data
      resultDiv.innerHTML = '';
      const { 'post code': postCode, places } = data;
      const place = places[0];
      resultDiv.innerHTML = `
        <h2>Zip Code: ${postCode}</h2>
        <p><strong>City:</strong> ${place['place name']}</p>
        <p><strong>State:</strong> ${place['state']}</p>
        <p><strong>Country:</strong> ${data.country}</p>
      `;
    })
    .catch(error => {
      // Display an error message if the API call fails
      resultDiv.innerHTML = `<p>Error: ${error.message}</p>`;
    });
});
