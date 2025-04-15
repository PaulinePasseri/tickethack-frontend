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
    console.log(data)
    if (data.result === false) {
      rightContainer.innerHTML = `
      <img id="logo-img" src="./images/notfound.png" alt="logo loupe">
      <div id="border"></div>
      <p>No trip found.</p>`
    } else {
      rightContainer.innerHTML =''
      for (let i = 0; i< data.trips.length; i++) {
        rightContainer.innerHTML += `
        <div class="trip-container">
          <span class="trip-info">${data.trips[i].arrival}</span>
          <span class="trip-info">${data.trips[i].departure}</span>
          <span class="trip-info">${data.trips[i].date}</span>
          <span class="trip-info">${data.trips[i].price}</span>
          <button class="book-btn">Book</button>
        </div>
        `
      }  
    }
  })
})