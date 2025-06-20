import {
  getElement,
  formatPrice,
  getStorageItem,
  setStorageItem,
} from "../utils.js";
import { updateCartCount } from "./cart.js";

export const displayCartItem = (cart) => {
  const cartLists = getElement(".cart_item_lists");
  cartLists.innerHTML = cart
    .map((item) => {
      return `<li class="cart_item" data-id="${item.id}">
            <img src="${item.image}" alt="${item.name}" class="cart_item_img" />
            <div class="cart_item_info">
              <span class="item_name">${item.name}</span>
              <span class="item_price">${formatPrice(item.price)}</span>
              <span class="remove_btn">remove</span>
            </div>
            <div class="cart_item_count">
              <button class="count_up" id="${item.id}">
                <i class="fa-solid fa-chevron-up"></i>
              </button>
              <span class="count_num">${item.amount}</span>
              <button class="count_down" id="${item.id}">
                <i class="fa-solid fa-chevron-down"></i>
              </button>
            </div>
          </li>
    `;
    })
    .join("");
};

//수량조절
export const cartUpDownCount = () => {
  document.addEventListener("click", (e) => {
    const target = e.target;
    const button = target.closest("button");
    if (!button) return;

    const id = button.id;
    if (!id) return;

    let cart = getStorageItem("cart");
    const item = cart.find((item) => item.id === id);

    if (button.classList.contains("count_up")) {
      item.amount += 1;
    } else if (button.classList.contains("count_down")) {
      item.amount -= 1;
      if (item.amount === 0) {
        cart = cart.filter((item) => item.id !== id);
      }
    }
    setStorageItem("cart", cart);
    displayCartItem(cart);
    cartPriceTotal(cart);
    updateCartCount(cart);
  });
};

//장바구니 토탈계산
export const cartPriceTotal = (cart) => {
  const totalPrice = getElement(".total_price");
  const total = cart.reduce((sum, item) => {
    return sum + item.price * item.amount;
  }, 0);
  totalPrice.textContent = `total: ${formatPrice(total)}`;
};

//카트아이템 삭제기능
export const cartItemRemove = () => {
  const cartLists = getElement(".cart_item_lists");
  cartLists.addEventListener("click", (e) => {
    const target = e.target;
    if (target.classList.contains("remove_btn")) {
      const li = getElement(".cart_item");
      const id = li.dataset.id;
      let cart = getStorageItem("cart");
      cart = cart.filter((item) => item.id !== id);
      setStorageItem("cart", cart);
      displayCartItem(cart);
      cartPriceTotal(cart);
    }
  });
};
