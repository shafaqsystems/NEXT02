import React, { useState } from "react";
import signup from "../../../apiCalls/signup";
import { Box, Button, Input } from "@mui/material";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    signup(email, password)
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
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

export default Signup;
