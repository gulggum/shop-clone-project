import { setStorageItem } from "../utils.js";

const setupStore = (products) => {
  setStorageItem("store", products);
};

export { setupStore };
