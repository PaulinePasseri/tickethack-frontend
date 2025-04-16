fetch("http://localhost:3000/carts/cart")
  .then((response) => response.json())
  .then((data) => {
    console.log(data.trips)
    if ((data.result === true)) {
      for (let i = 0; i< data.cart.length; i++){
        document.querySelector("#cart-container").innerHTML = `
        <div id="text">
          <p>My cart</p>
        </div>
        <div class="cart">
          <span class="cart-info">${data.cart[i].arrival}">"${data.cart[i].departure}</span>
          <span class="cart-info">${data.cart[i].date}</span>
          <span class="cart-info">${data.cart[i].price}</span>
          <button class="delete-btn"><i class="fa-solid fa-xmark"></i></button>
        </div>
        <div id="total-cart">
          <span class= "total-price">${data.cart[i].price}</span>
          <span class= "purchase-btn">Purchase</span>
        </div>
    `;
       } }
  });
