const bookingContainer = document.querySelector('#booking-container')

fetch('http://localhost:3000/carts/book')
.then(response => response.json())
.then(data => {
  if (data.result === true) {
    bookingContainer.innerHTML = `
    <h2>My Bookings</h2>
    <div id="bookings"></div>
    <div class="border"></div>
    <p>Enjoy your travels with Tickethack!</p>`
  }
})