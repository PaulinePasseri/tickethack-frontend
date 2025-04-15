const searchBtn = document.querySelector('#search-btn')
const rightContainer = document.querySelector("#right-container")
const arrival = document.querySelector('#arrival')
const departure = document.querySelector('#departure')
const date = document.querySelector('#date')

searchBtn.addEventListener('click', function() {
  fetch('http://localhost:3000/trips', {
    method: 'POST',
    headers: { 'Content-Type' : 'application/json' },
    body: JSON.stringify({
      departure: departure.value,
      arrival: arrival.value,
      date: date.value
    })
  })
  .then(response => response.json())
  .then(data => {
    if (data.result === false) {
      rightContainer.innerHTML = `
      <img id="logo-img" src="./images/notfound.png" alt="logo loupe">
      <div id="border"></div>
      <p>No trip found.</p>`
    } else {
      rightContainer.innerHTML =''
      for (let i = 0; i< data.trips.length; i++) {
        let formatDate = new Date(data.trips[i].date)
        let hours = formatDate.getHours()
        let minutes = formatDate.getMinutes()
        rightContainer.innerHTML += `
        <div class="trip-container" data-id=${data.trips[i]._id}>
          <span class="trip-info">${data.trips[i].departure} ></span>
          <span class="trip-info">${data.trips[i].arrival}</span>
          <span class="trip-info">${hours}:${minutes}</span>
          <span class="trip-info">${data.trips[i].price}€</span>
          <button class="book-btn">Book</button>
        </div>
        `
      } 
      const bookBtns = document.querySelectorAll('.book-btn') 
      for (const bookBtn of bookBtns) {
        bookBtn.addEventListener('click', function() {
          fetch('http://localhost:3000/carts', {
            method: 'POST',
            headers: { 'Content-Type' : 'application/json' },
            body: JSON.stringify({
              isPaid: false,
              trips: this.id
            })
          })
        })
      }
    }

  })
})