// Adding event listner to Add-cart-button

const cartBtn = document.getElementsByClassName("add-cart");
Array.from(cartBtn).map((element) => {
  element.addEventListener("click", AddItemToCart);
});

// Function for adding item to cart when add-cart-button is clicked

const AddItemToCart = () => {};
