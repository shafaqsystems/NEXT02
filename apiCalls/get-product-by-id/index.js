import axios from "axios";

const BASE_URL = "http://localhost:3000";

const getProductById = async (id) => {
  console.log(id);
  let data = JSON.stringify({
    id,
  });

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `${BASE_URL}/api/get-product-by-id`,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  const response = await axios.request(config);
  return response;
};

export default getProductById;
