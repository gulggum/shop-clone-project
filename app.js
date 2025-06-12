import { navToggle } from "./src/component/nav_toggle.js";
import { getElement } from "./src/init.js";

const loading = getElement(".loading");

function load() {
  loading.classList.remove("hidden");

  navToggle();
}

window.addEventListener("DOMContentLoaded", load);
