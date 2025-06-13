//element불러오는 함수
function getElement(element) {
  return document.querySelector(element);
}
function getElements(element) {
  return document.querySelectorAll(element);
}

export { getElement, getElements };
