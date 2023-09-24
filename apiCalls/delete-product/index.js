import axios from "axios";

const BASE_URL = "http://localhost:3000";

const deleteProduct = async (id) => {
  let data = JSON.stringify({
    id,
  });

  let config = {
    method: "delete",
    maxBodyLength: Infinity,
    url: `${BASE_URL}/api/delete-product`,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  const response = axios.request(config);
  return response;
};

export default deleteProduct;
