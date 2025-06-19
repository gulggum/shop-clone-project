import { getElement } from "../utils.js";
const cartBtn = getElement(".header_cart-btn");
const container = getElement(".container");

export const inJectCartHTML = () => {
  //카트페이지 요소 불러오기
  const cartHTML = `<aside class="cart_page">
        <div class="close_btn">
          <i class="fa-solid fa-xmark fa-xl"></i>
        </div>
        <h3 class="cart_title">your cart</h3>
        <ul class="cart_item_lists">
          <li class="cart_item">
            <img src="#" alt="img" class="cart_item_img" />
            <div class="cart_item_info">
              <span class="item_name">breakfast</span>
              <span class="item_price">$8.84</span>
              <span class="remove_btn">remove</span>
            </div>
            <div class="cart_item_count">
              <button class="count_up">
                <i class="fa-solid fa-chevron-up"></i>
              </button>
              <span class="count_num">6</span>
              <button class="count_down">
                <i class="fa-solid fa-chevron-down"></i>
              </button>
            </div>
          </li>
        </ul>
        <div class="cart_bottom">
          <div class="total_price">total: $53.05</div>
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

  cartBtn.addEventListener("click", () => {
    cartBox.classList.add("visible");
  });
  //카트창 닫기버튼 기능
  closeBtn.addEventListener("click", () => {
    cartBox.classList.remove("visible");
  });
};
