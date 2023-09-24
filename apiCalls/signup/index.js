import axios from "axios";

const BASE_URL = "http://localhost:3000";

const signup = async (email, password) => {
  console.log(email, password);

  let data = JSON.stringify({
    email,
    password,
  });

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `${BASE_URL}/api/signup`,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  const response = await axios.request(config);
  return response;
};

export default signup;
