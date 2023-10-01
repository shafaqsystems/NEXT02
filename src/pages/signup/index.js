import React, { useState } from "react";
import signup from "../../../apiCalls/signup";
import { Box, Button, Input, TextField } from "@mui/material";
import Link from "next/link";

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
          <TextField
            label="Email"
            variant="standard"
            type="text"
            sx={{ width: "100%" }}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Box>
        <Box>
          <TextField
            id="standard-error"
            label="Password"
            variant="standard"
            type="password"
            sx={{ mt: 1, width: "100%" }}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Box>
        <Box>
          <Button
            variant="contained"
            color="primary"
            sx={{
              mt: 3,
              width: "100%",
            }}
            onClick={handleSubmit}
          >
            Submit
          </Button>
          <Link href="/login">
            <p style={{ marginTop: "10px", textAlign: "center" }}>
              Log-in instead
            </p>
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default Signup;