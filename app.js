import { inJectCartHTML, updateCartCount } from "./src/component/cart.js";
import {
  displayCartItem,
  cartItemRemove,
  cartUpDownCount,
} from "./src/component/displayCart.js";
import {
  displayFeatured,
  displayProductsPage,
  displayDetailPage,
} from "./src/component/displayPages.js";
import { navToggle } from "./src/component/nav_toggle.js";
import { setupStore } from "./src/component/store.js";
import { getProductData } from "./src/fetch.js";
import { getStorageItem } from "./src/utils.js";

async function load() {
  const products = await getProductData();
  if (products) {
    setupStore(products);
  }
  navToggle();
  displayFeatured();
  displayProductsPage();
  displayDetailPage();
  await inJectCartHTML();
  cartItemRemove();
  let cart = getStorageItem("cart");
  displayCartItem(cart);
  updateCartCount(cart);
  cartUpDownCount(cart);
}

window.addEventListener("DOMContentLoaded", load);
