import { getElement } from "../utils.js";

const navBar = getElement(".mobile_nav_toggle_btn");
const navBox = getElement(".mobile_nav_box");
const closeBtn = getElement(".close-btn");

//nav동작함수들(버튼클릭시 메뉴창활성화,메뉴창 닫기버튼)

export function navToggle() {
  navBar.addEventListener("click", () => {
    navBox.classList.remove("hidden");
  });
  closeBtn.addEventListener("click", (e) => {
    navBox.classList.add("hidden");
  });
}
