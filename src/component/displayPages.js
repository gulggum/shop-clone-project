import { getProductData } from "../fetch.js";
import { getElement, formatPrice, getElements } from "../utils.js";
import { displayProducts } from "./displayProducts.js";

const feturedList = getElement(".featured_lists");
const companyUl = getElement(".company_menu_lists");
const productLists = getElement(".products_lists");

const displayFeatured = async () => {
  const allProducts = await getProductData();
  const products = [...allProducts];

  //featured가 true인것만 필터링해 보여주기
  const featuredFilter = products.filter(
    (product) => product.featured === true
  );
  if (!feturedList) return; //- 해당요소없을시 아래함수 실행되지않게 방어
  displayProducts(feturedList, featuredFilter);
};

// products페이지
const displayProductsPage = async () => {
  const allProducts = await getProductData();
  const products = [...allProducts];

  const companies = products.reduce(
    (acc, curr) => {
      if (!acc.includes(curr.company)) {
        acc.push(curr.company);
      }
      return acc;
    },
    ["all"]
  );
  const companyName = companies.map((company) => {
    return `  <li class="company_name">${company}</li>`;
  });
  companyUl.innerHTML = companyName.join("");

  const companyBtns = getElements(".company_name");

  //메뉴바 버튼 클릭시 상품리스트 출력
  companyBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const selectBtn = e.target.innerText;
      const companyFilter = products.filter((product) => {
        return product.company === selectBtn;
      });

      if (selectBtn === "All") {
        displayProducts(productLists, products);
      } else {
        displayProducts(productLists, companyFilter);
        console.log(companyFilter);
      }
    });
  });
  displayProducts(productLists, products);
};

export { displayFeatured, displayProductsPage };
