import React, { useState } from "react";
import login from "../../../apiCalls/login";
import { Box, Button, Input } from "@mui/material";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    login(email, password)
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        console.log("Logged in");
      })
      .catch((e) => console.log(e));
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      <Box sx={{ width: "min(90%, 500px)" }}>
        <Box>
          <Input
            placeholder="Email"
            type="text"
            sx={{ width: "100%" }}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Box>
        <Box>
          <Input
            placeholder="Password"
            type="password"
            sx={{ mt: 1, width: "100%" }}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Box>
        <Box>
          <Button
            variant="conatined"
            color="primary"
            sx={{
              backgroundColor: "blue",
              color: "white",
              mt: 3,
              width: "100%",
            }}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
