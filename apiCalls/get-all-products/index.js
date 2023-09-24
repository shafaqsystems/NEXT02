import axios from "axios";

const BASE_URL = "http://localhost:3000";

const getAllProducts = async () => {
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${BASE_URL}/api/get-all-products`,
    headers: {
      "Content-Type": "application/json",
    },
  };

  const response = await axios.request(config);
  return response;
};

export default getAllProducts;
