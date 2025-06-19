import { formatPrice } from "../utils.js";

export const displayProducts = (element, company) => {
  let displayItems = company
    .map((item) => {
      const { id, image, name, price } = item;
      return `<article class="featured_wrap">
            <div class="featured_info">
              <div class="product_img">
                <img src="${image}" alt="img" />
                <div class="featured_links">
                  <a href="./detail.html?id=${id}"><i class="fa-solid fa-magnifying-glass"></i></a>
                  <i class="fa-solid fa-cart-plus"></i>
                </div>
              </div>
              <h5 class="product_title">${name}</h5>
              <div class="product_price">${formatPrice(price)}</div>
            </div>
          </article>`;
    })
    .join("");
  element.innerHTML = displayItems;
};

export const displayDetailProduct = () => {};
