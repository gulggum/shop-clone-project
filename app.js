import {
  displayFeatured,
  displayProductsPage,
  displayDetailPage,
} from "./src/component/displayPages.js";
import { navToggle } from "./src/component/nav_toggle.js";
import { setupStore } from "./src/component/store.js";
import { getProductData } from "./src/fetch.js";

async function load() {
  navToggle();
  displayFeatured();
  displayProductsPage();
  displayDetailPage();
  const products = await getProductData();
  if (products) {
    setupStore(products);
  }
}

window.addEventListener("DOMContentLoaded", load);
