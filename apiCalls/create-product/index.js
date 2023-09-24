import axios from "axios";

const BASE_URL = "http://localhost:3000";

const createProduct = async (name, desc, brand, category, weight, price) => {
  let data = JSON.stringify({
    name,
    desc,
    brand,
    category,
    weight,
    price,
  });

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `${BASE_URL}/api/create-product`,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  const response = await axios.request(config);
  return response;
};

export default createProduct;
