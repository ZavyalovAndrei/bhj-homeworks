const changeQuantityButtons = document.querySelectorAll(".product__quantity");
let basket = document.querySelector(".cart__products");
const delayAnimation = 480;
const basketContainer = document.querySelector(".cart");
const key = "cart";
let localStorageArray = restoreObject() || [];

localStorageArray.forEach((element) => {
  const id = element.id;
  const image = element.imageLink;
  const quantity = element.quantity;
  addToBasket(id, image, quantity);
});

changeQuantityButtons.forEach((changeQuantityButton) => {
  changeQuantityButton.addEventListener("click", (element) => {
    let quantity = +element.currentTarget.querySelector(
      ".product__quantity-value"
    ).textContent;
    if (
      element.target.classList.contains("product__quantity-control_dec") &&
      quantity > 0
    ) {
      quantity--;
    } else if (
      element.target.classList.contains("product__quantity-control_inc")
    ) {
      quantity++;
    }
    element.currentTarget.querySelector(
      ".product__quantity-value"
    ).textContent = quantity;
    if (element.target.classList.contains("product__add")) {
      let productCard = element.target.closest(".product");
      let id = productCard.dataset.id;
      let imageLink = productCard.querySelector(".product__image").src;
      const currentProductInBasket = document.querySelector(
        '.cart__product[data-id="' + id + '"]'
      );
      if (!currentProductInBasket) {
        if (basketContainer.style.display === "none") {
          basketContainer.style.display = "block";
        }
        addToBasket(id, imageLink, quantity);
        const productData = {
          id: id,
          imageLink: imageLink,
          quantity: quantity,
        };
        localStorageArray.push(productData);
        saveObject(localStorageArray);
        const addedProduct = document.querySelector(
          '.cart__product[data-id="' + id + '"]'
        );

        const addedProductImage = addedProduct.querySelector(
          ".cart__product-image"
        );

        const productImage = productCard.querySelector(".product__image");
        moveToBasket(productImage, addedProductImage);
        addedProduct.style.display = "none";
        setTimeout(
          () => (addedProduct.style.display = "block"),
          delayAnimation
        );
      } else {
        const newQuantity =
          +currentProductInBasket.querySelector(".cart__product-count")
            .textContent + quantity;
        setTimeout(
          () =>
            (currentProductInBasket.querySelector(
              ".cart__product-count"
            ).textContent = newQuantity),
          delayAnimation
        );

        moveToBasket(
          productCard.querySelector(".product__image"),
          currentProductInBasket.querySelector(".cart__product-image")
        );
        localStorageArray.forEach((element) => {
          if (element.id === id) {
            element.quantity = newQuantity;
          }
        });
        saveObject(localStorageArray);
      }
    }
  });
});

document.querySelector(".cart__products").addEventListener("click", (event) => {
  const parent = document.querySelector(".cart__products");
  const deletedElement = event.target.closest(".cart__product");
  parent.removeChild(deletedElement);
  const delitedId = deletedElement.dataset.id;
  for (let i = 0; i < localStorageArray.length; i++) {
    if (localStorageArray[i].id === delitedId) {
      localStorageArray.splice(i, 1);
      saveObject(localStorageArray);
    }
  }
  if (parent.children.length === 0) {
    basketContainer.style.display = "none";
  }
});

function addToBasket(id, imageLink, quantity) {
  basket.insertAdjacentHTML(
    "afterBegin",
    '<div class="cart__product" data-id="' +
      id +
      '"><img class="cart__product-image" src="' +
      imageLink +
      '"><div class="cart__product-count">' +
      quantity +
      '</div><div class="cart__product-delete" id="delete__buttton">X</div></div>'
  );
}

function moveToBasket(product, productInBasket) {
  let productPosition = product.getBoundingClientRect();
  let productInBasketPosition = productInBasket.getBoundingClientRect();

  let productClone = product.cloneNode();

  productClone.style.position = "fixed";
  productClone.style.left = productPosition["x"] + "px";
  productClone.style.top = productPosition["y"] + "px";
  productClone.style.border = "none";
  productClone.style.zIndex = 10;

  let start_x = productPosition["x"] + 0.5 * productPosition["width"];
  let start_y = productPosition["top"] + 0.5 * productPosition["height"];

  let delta_x =
    productInBasketPosition["x"] +
    0.5 * productInBasketPosition["width"] -
    start_x;
  let delta_y =
    productInBasketPosition["y"] +
    0.5 * productInBasketPosition["height"] -
    start_y;

  document.body.appendChild(productClone);
  void productClone.offsetWidth;
  productClone.style.transform = "translateX(" + delta_x + "px)";
  productClone.style.transform += "translateY(" + delta_y + "px)";
  productClone.style.transition = "0.5s";

  setTimeout(() => document.body.removeChild(productClone), delayAnimation);
}

function saveObject(object) {
  localStorage.setItem(key, JSON.stringify(object));
}

function restoreObject() {
  return JSON.parse(localStorage.getItem(key));
}
