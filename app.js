import {
  displayFeatured,
  displayProductsPage,
} from "./src/component/displayPages.js";
import { navToggle } from "./src/component/nav_toggle.js";
import { setupStore } from "./src/component/store.js";
import { getProductData } from "./src/fetch.js";
import { getElement } from "./src/utils.js";
import { displayProducts } from "./src/component/displayProducts.js";

async function load() {
  navToggle();
  displayFeatured();
  displayProductsPage();
  const products = await getProductData();
  if (products) {
    setupStore(products);
  }
}

window.addEventListener("DOMContentLoaded", load);
