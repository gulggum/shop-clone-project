import { getStorageItem, setStorageItem } from "../utils.js";

let store = getStorageItem("store");

export const setupStore = (products) => {
  setStorageItem("store", products);
  store = products; //메모리에도 갱신
};

export const findProduct = (id) => {
  const product = store.find((product) => product.id === id);
  return product;
};
