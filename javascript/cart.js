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
          <button class="purchase-btn"><i class="fa-solid fa-xmark"></i></button>
        </div>
    `;
        document.querySelector("#cart-container").innerHTML += `
          <div id="total-cart">
            <span class= "total-price">price : price</span>
            <button id=${data.cart[i]._id} class= "purchase-btn">Purchase</span>
          </div>
          `;
      }
    }
    document
      .querySelector(".purchase-btn")
      .addEventListener("click", function () {
        fetch("http://localhost:3000/carts/buy", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            tripId: this.id,
          }),
        });
      });
  });
i;
