fetch("http://localhost:3000/carts")
  .then((response) => response.json())
  .then((data) => {
    if ((result = true)) {
      for (let i = 0; i< data.carts.length; i++){
        document.querySelector("#cart-container").innerHTML = `
        <div id="text">
        <p>My cart</p>
        </div>
        <div class="cart">
        <span class="cart-info">${data.carts[i].arrival}">"${data.carts[i].departure}</span>
        <span class="cart-info">${data.carts[i].date}</span>
        <span class="cart-info">${data.carts[i].price}</span>
        <button class="delete-btn"><i class="fa-solid fa-xmark"></i></button>
        </div>
        <div id="total-cart">
        <span class= "total-price">${data.carts[i].price}</span>
        <span class= "purchase-btn">Purchase</span>
        </div>
    `;
       } }
  });
