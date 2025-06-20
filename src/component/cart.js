import { getElement, getStorageItem, setStorageItem } from "../utils.js";
import { displayCartItem, cartPriceTotal } from "./displayCart.js";

const cartBtn = getElement(".header_cart-btn");
const container = getElement(".container");

export const inJectCartHTML = () => {
  //카트페이지 요소 불러오기
  const cartHTML = `
           <div class="cart_page_bg"></div>
    <aside class="cart_page">
        <div class="close_btn">
          <i class="fa-solid fa-xmark fa-xl"></i>
        </div>
        <h3 class="cart_title">your cart</h3>
        <ul class="cart_item_lists">
        </ul>
        <div class="cart_bottom">
          <div class="total_price"></div>
          <button class="checkout_btn">checkout</button>
        </div>
      </aside>`;
  if (container) {
    container.insertAdjacentHTML("beforeend", cartHTML);
  } else {
    throw new Error("장바구니를 불러올수 없습니다.");
  }

  //카트창 열기버튼 기능
  const cartBox = getElement(".cart_page");
  const closeBtn = getElement(".close_btn");
  const cartPageBg = getElement(".cart_page_bg");

  cartBtn.addEventListener("click", () => {
    cartBox.classList.add("visible");
    cartPageBg.classList.add("visible");
  });
  //카트창 닫기버튼 기능
  closeBtn.addEventListener("click", () => {
    cartBox.classList.remove("visible");
    cartPageBg.classList.remove("visible");
  });
};

document.addEventListener("click", (e) => {
  const target = e.target;
  if (target.classList.contains("fa-cart-plus")) {
    const id = target.dataset.id;
    const products = getStorageItem("store");
    const product = products.find((item) => {
      return item.id === id;
    });
    if (product) {
      const updateCart = addToCart(product); //cart받아오기
      displayCartItem(updateCart); //화면에 랜더링
      cartPriceTotal(updateCart); //총가격계산
      updateCartCount(); //상품종류개수 카운트
    }
  }
});

//--------------카트에 담기추가 기능
export const addToCart = (product) => {
  let cart = getStorageItem("cart");
  const existingItem = cart.find((catItem) => catItem.id === product.id);
  if (existingItem) {
    existingItem.amount += 1;
  } else {
    cart.push({ ...product, amount: 1 });
  }

  setStorageItem("cart", cart); //카트에 추가하고 로컬cart키에 저장까지만..

  return cart;
};

//헤더라인 카트바구니 카운트 기능(상품종류개수 카운트)
export const updateCartCount = () => {
  let cart = getStorageItem("cart");
  const cartNum = document.querySelector(".cart_num");
  if (cart.length === 0) {
    cartNum.textContent = `0`;
  } else {
    cartNum.textContent = cart.length;
  }
};
