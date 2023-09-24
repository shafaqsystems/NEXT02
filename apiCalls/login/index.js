import axios from "axios";

const BASE_URL = "http://localhost:3000";

const login = async (email, password) => {
  let data = JSON.stringify({
    email,
    password,
  });

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `${BASE_URL}/api/login`,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  const response = await axios.request(config);
  return response;
};

export default login;
