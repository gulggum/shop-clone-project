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

export { getElement, getElements, setStorageItem };
