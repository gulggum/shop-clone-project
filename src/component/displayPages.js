import { getProductData, URL } from "../fetch.js";
import {
  formatPrice,
  getElement,
  getElements,
  getStorageItem,
} from "../utils.js";
import { addToCart } from "./cart.js";
import { displayCartItem, cartPriceTotal } from "./displayCart.js";
import { updateCartCount } from "./cart.js";
import { displayProducts } from "./displayProducts.js";

const feturedList = getElement(".featured_lists");
const companyUl = getElement(".company_menu_lists");
const productLists = getElement(".products_lists");
const searchForm = getElement(".search_form");
const searchInput = getElement(".search_input");
const priceInput = getElement(".price_input");
const priceValue = getElement(".price_value");
const detailContainer = getElement(".detail_container");

//-------------------------featured lists
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

//--------------------------- products페이지
const displayProductsPage = async () => {
  const allProducts = await getProductData();
  const products = [...allProducts];
  if (!productLists) return; //- 해당요소없을시 아래함수 실행되지않게 방어

  const companies = products.reduce(
    (acc, curr) => {
      if (!acc.includes(curr.company)) {
        acc.push(curr.company);
      }
      return acc;
    },
    ["all"]
  );
  //메뉴바 메뉴 리스트 출력
  const companyName = companies.map((company) => {
    return `  <li class="company_name">${company}</li>`;
  });
  companyUl.innerHTML = companyName.join("");
  if (!productLists) return;

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
      }
    });
  });
  displayProducts(productLists, products);

  //검색필터 기능
  searchForm.addEventListener("input", (e) => {
    e.preventDefault();
    const searchValue = searchInput.value.toLowerCase();
    const searchFilter = products.filter((product) => {
      return product.name.toLowerCase().includes(searchValue);
    });
    if (searchFilter.length === 0) {
      productLists.innerHTML = `<p>검색결과가 없습니다.</p>`;
    } else {
      return displayProducts(productLists, searchFilter);
    }
  });

  //가격필터 기능
  let maxPrice = products.map((product) => product.price);
  maxPrice = Math.max(...maxPrice);
  maxPrice = Math.ceil(maxPrice / 100);
  priceInput.value = maxPrice;
  priceInput.max = maxPrice;
  priceInput.min = 0;
  priceValue.textContent = `value:$${maxPrice}`;

  priceInput.addEventListener("input", () => {
    const value = parseInt(priceInput.value);
    priceValue.textContent = `value:$${value}`;

    let priceFilter = products.filter(
      (product) => product.price / 100 <= value
    );

    displayProducts(productLists, priceFilter);
    if (priceFilter.length < 1) {
      productLists.innerHTML = `<p>조건에 맞는 결과를 찾지 못하였습니다.</p>`;
    }
  });
};

//-----------------detail page

const displayDetailPage = async () => {
  if (!detailContainer) return; //- 해당요소없을시 아래함수 실행되지않게 방어
  const params = new URLSearchParams(window.location.search);
  const urlId = params.get("id");
  try {
    const res = await fetch(`${URL}/${urlId}`);
    const product = await res.json();
    const { id, name, price, company, description, image } = product;
    const { 0: firstColor, 1: secondColor } = product.colors;

    detailContainer.innerHTML = `
 <article class="detail_wrap">
          <img class="detail_img" src="${image}" alt="img" />
          <div class="detail_info">
            <div class="detail_title">${name}</div>
            <div class="detail_company">by ${company}</div>
            <div class="detail_price">${formatPrice(price)}</div>
            <div class="detail_color">
              <span style="background:${firstColor};"></span>
              <span  style="background:${secondColor};"></span>
            </div>
            <div class="detail_desc">
             ${description}
            </div>
            <button class="add_cart_btn" data-id="${id}">
             add to cart
            </button>
          </div>
        </article>`;

    //-------detail페이지에 addToCart기능
    document.addEventListener("click", (e) => {
      const target = e.target;
      if (target.classList.contains("add_cart_btn")) {
        const id = target.dataset.id;
        const products = getStorageItem("store");
        const product = products.find((item) => {
          return item.id === id;
        });
        if (product) {
          const updateCart = addToCart(product); //cart받아오기
          displayCartItem(updateCart); //화면에 랜더링
          cartPriceTotal(updateCart); //총가격계산
          updateCartCount(); //상품종류개수 카운트
        }
      }
    });
  } catch (error) {
    detailContainer.innerHTML = `<p>상세페이지를 불러올수 없습니다.</p>`;
  }
};

export { displayFeatured, displayProductsPage, displayDetailPage };
