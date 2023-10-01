import { useEffect, useState } from "react";
import createProduct from "../../../apiCalls/create-product";
import verifyToken from "../../../apiCalls/verify-token";
import { Box, Button, Input } from "@mui/material";
import Navbar from "../../../components/Navbar";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [weight, setWeight] = useState("");
  const [price, setPrice] = useState("");

  const [verificationLoading, setVerificationLoading] = useState(false);
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    setVerificationLoading(true);
    verifyToken()
      .then((response) => {
        setVerified(true);
        setVerificationLoading(false);
      })
      .catch((e) => {
        setVerified(false);
        setVerificationLoading(false);
      });
  }, [verified]);

  const handleSubmit = () => {
    createProduct(name, desc, brand, category, weight, price)
      .then((response) => console.log(response))
      .catch((e) => console.log(e));
  };
  return (
    <>
      <Navbar />
      {verificationLoading ? (
        <p>Verifying...</p>
      ) : !verified ? (
        <p>You aren't verified to visit this page</p>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh",
          }}
        >
          <Box>
            <Input
              sx={{ width: "100%", mb: 1 }}
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
            />
          </Box>
          <Box>
            <Input
              sx={{ width: "100%", mb: 1 }}
              placeholder="Desc"
              onChange={(e) => setDesc(e.target.value)}
            />
          </Box>
          <Box>
            <Input
              sx={{ width: "100%", mb: 1 }}
              placeholder="Brand"
              onChange={(e) => setBrand(e.target.value)}
            />
          </Box>
          <Box>
            <Input
              sx={{ width: "100%", mb: 1 }}
              placeholder="Category"
              onChange={(e) => setCategory(e.target.value)}
            />
          </Box>
          <Box>
            <Input
              sx={{ width: "100%", mb: 1 }}
              placeholder="Weight"
              onChange={(e) => setWeight(e.target.value)}
            />
          </Box>
          <Box>
            <Input
              sx={{ width: "100%", mb: 3 }}
              placeholder="Price"
              onChange={(e) => setPrice(e.target.value)}
            />
          </Box>
          <Box>
            <Button
              sx={{ width: "100%", backgroundColor: "blue", color: "white" }}
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </Box>
        </Box>
      )}
    </>
  );
};

export default AddProduct;