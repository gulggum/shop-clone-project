import { getProductData } from "../fetch.js";
import { getElement, formatPrice } from "../utils.js";

const feturedList = getElement(".featured_lists");

const displayProducts = async () => {
  const products = await getProductData();
  //featured가 true인것만 필터링해 보여주기
  const featuredFilter = products.filter(
    (product) => product.featured === true
  );
  console.log(featuredFilter);
  feturedList.innerHTML = featuredFilter
    .map((product) => {
      const { id, name, image, price } = product;
      return ` <article class="featured_wrap">
            <div class="featured_info">
              <div class="product_img">
                <img src="${image}" alt="img" />
                <div class="featured_links">
                  <i class="fa-solid fa-magnifying-glass"></i>
                  <i class="fa-solid fa-cart-plus"></i>
                </div>
              </div>
              <h5 class="product_title">${name}</h5>
              <div class="product_price">${formatPrice(price)}</div>
            </div>
          </article>`;
    })
    .join("");
};

export { displayProducts };
