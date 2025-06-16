//element불러오는 함수
function getElement(element) {
  return document.querySelector(element);
}
function getElements(element) {
  return document.querySelectorAll(element);
}

//loacalstorage에 데이터 저장
const setStorageItem = (name, item) => {
  localStorage.setItem(name, JSON.stringify(item));
};

//가격 포맷함수(USD기준)
const formatPrice = (price) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format((price / 100).toFixed(2));
};

export { getElement, getElements, setStorageItem, formatPrice };
