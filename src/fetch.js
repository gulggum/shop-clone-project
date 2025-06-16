const URL = "https://684655cc7dbda7ee7aaec05e.mockapi.io/products";

const getProductData = async () => {
  try {
    const res = await fetch(URL);
    const data = await res.json();

    return data;
  } catch (error) {
    throw new Error("데이터를 불러오지 못했습니다.");
  }
};

export { getProductData };
