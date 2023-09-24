import axios from "axios";

const verifyToken = async () => {
  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "http://localhost:3000/api/verify-token",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  const response = await axios.request(config);
  return response;
};

export default verifyToken;
