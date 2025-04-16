fetch("https://tickethack-backend-ivory-ten.vercel.app/carts/cart")
  .then((response) => response.json())
  .then((data) => {
    if (data.result === true) {
      document.querySelector("#cart-container").innerHTML = `
        <div id="content-cart">
          <div id="fixed-content-cart">
            <p>My cart</p>
          </div>
          <div id="cart-list"></div>
        </div> 
      `;

      let total = 0
      for (let i = 0; i < data.cart.length; i++) {
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
        total += data.cart[i].trips.price
      }
      document.querySelector("#cart-container").innerHTML += `
      <div id="total-cart">
        <span class="total-price">Total : ${total}</span>
        <button class="purchase-btn">Purchase</button>
      </div>
      `;
      const purchaseButton = document.querySelector(".purchase-btn");
      purchaseButton.addEventListener("click", function() {
          fetch("https://tickethack-backend-ivory-ten.vercel.app/carts/buy", {
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
            fetch('https://tickethack-backend-ivory-ten.vercel.app/carts', {
              method: 'DELETE',
              headers: { 'Content-Type' : 'application/json' },
              body: JSON.stringify({
                tripId: this.id
              })
            })
            .then(response => response.json())
            .then(data => {
              total = 0
              for (let i = 0; i < data.cart.length; i++) {
                total += data.cart[i].trips.price
              }
              document.querySelector('.total-price').textContent = `Total : ${total}`
              this.parentNode.remove()
            })
        
          })
        }     
    }
  });
