import { navToggle } from "./src/component/nav_toggle.js";
import { getProductData } from "./src/fetch.js";
import { getElement } from "./src/init.js";

function load() {
  navToggle();
  getProductData();
}

window.addEventListener("DOMContentLoaded", load);
