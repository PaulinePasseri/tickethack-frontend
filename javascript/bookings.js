const bookingContainer = document.querySelector('#booking-container')

fetch('https://tickethack-backend-inky.vercel.app/carts/book')
.then(response => response.json())
.then(data => {
  console.log(data)
  if (data.result === true) {
    bookingContainer.innerHTML = `
    <div class="booking-info">
      <p>My Bookings</p>
      <div id="bookings"></div>
      <div class="border-booking"></div>
      <p class="text-booking">Enjoy your travels with Tickethack!</p>
    </div>`
  }
  const bookings = document.querySelector('#bookings')
  for (let i = 0; i < data.cart.length; i++) {
    let formatDate = new Date(data.cart[i].trips.date)
    let hours = formatDate.getHours()
    let minutes = formatDate.getMinutes()
    let currentDate = new Date()
    let currentHour = currentDate.getHours()
    let timeLeft = hours - currentHour
    bookings.innerHTML += `
    <div class="cart">
      <span class="cart-info">${data.cart[i].trips.departure} > ${data.cart[i].trips.arrival}</span>
      <span class="cart-info">${hours}:${minutes}</span>
      <span class="cart-info">${data.cart[i].trips.price}€</span>
      <span class="cart-info">Departure in ${timeLeft} hours</span>
    </div>`
  }
})