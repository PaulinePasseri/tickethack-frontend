fetch("http://localhost:3000/carts/cart")
  .then((response) => response.json())
  .then((data) => {
    if (data.result === true) {
      document.querySelector("#cart-container").innerHTML = `
        <div id="content-cart">
          <div id="fixed-content-cart">
          <p>My cart</p>
          </div>
          <div id="cart-list">
          </div>
        </div> 
      `;

      for (let i = 0; i < data.cart.length; i++) {
        //console.log(data.cart[i].trips.arrival)
        const formatDate = new Date(data.cart[i].trips.date);
        let hours = formatDate.getHours();
        let minutes = formatDate.getMinutes();
        document.querySelector("#cart-list").innerHTML += `
        <div class="cart">
          <span class="cart-info">${data.cart[i].trips.arrival}>${data.cart[i].trips.departure}</span>
          <span class="cart-info">${hours}:${minutes}</span>
          <span class="cart-info">${data.cart[i].trips.price}€</span>
          <button class="delete-btn" id=${data.cart[i].trips._id}><i class="fa-solid fa-xmark"></i></button>
        </div>
    `;
      }
      document.querySelector("#cart-container").innerHTML += `
      <div id="total-cart">
        <span class="total-price">price : price</span>
        <button class="purchase-btn">Purchase</button>
      </div>
      `;
      const purchaseButton = document.querySelector(".purchase-btn");
      console.log(purchaseButton)
      purchaseButton.addEventListener("click", function() {
          fetch("http://localhost:3000/carts/buy", {
            method: "PUT",
          })
          .then(response => response.json())
          .then(data => {
            window.location.assign('bookings.html')
          })
        document.querySelector("#cart-container").innerHTML =
        `<div class="text">
          <p>
            <span class="text2">No tickets in your cart.</span
            ><span class="text2">Why no plan a trip?</span>
          </p>
        </div>
        `
        }) 
        const deleteBtns = document.querySelectorAll('.delete-btn') 
        for (const deleteBtn of deleteBtns) {
          deleteBtn.addEventListener('click', function() {
            fetch('http://localhost:3000/carts', {
              method: 'DELETE',
              headers: { 'Content-Type' : 'application/json' },
              body: JSON.stringify({
                tripId: this.id
              })
            })
            .then(response => response.json())
            .then(data => {
              console.log(data)
            })
          })
        }     
    }
  });
