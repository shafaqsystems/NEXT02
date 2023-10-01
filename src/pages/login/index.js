import React, { useState } from "react";
import login from "../../../apiCalls/login";
import { Box, Button, Input, TextField } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    setLoading(true);
    login(email, password)
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        setLoading(false);
        router.push("/");
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
      });
  };

  return (
    <>
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
              sx={{
                color: "white",
                mt: 3,
                width: "100%",
              }}
              onClick={handleSubmit}
              disabled={loading}
            >
              Submit
            </Button>
            <Link href="/signup">
              <p style={{ marginTop: "10px", textAlign: "center" }}>
                Sign-up instead
              </p>
            </Link>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Login;