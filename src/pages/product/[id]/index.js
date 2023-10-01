import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import getProductById from "../../../../apiCalls/get-product-by-id";
import verifyToken from "../../../../apiCalls/verify-token";
import { Box } from "@mui/material";
import Navbar from "../../../../components/Navbar";
import Modal from "../../../../components/Modal";
import CustomSnackbar from "../../../../components/Snackbar";

const ProductDetailed = () => {
  const router = useRouter();
  const { id } = router.query;
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);



  const [product, setProduct] = useState({
    _id: "",
    name: "",
    desc: "",
    category: "",
    brand: "",
    price: "",
    weight: "",
  });

  const [verificationLoading, setVerificationLoading] = useState(false);
  const [verified, setVerified] = useState(true);

  useEffect(() => {
    if (id) {
      setLoading(true);
      console.log(id);
      getProductById(id).then((response) => {
        setProduct(response.data);
        setLoading(false);
      });
    }
  }, [id]);

  return (
    <>
      <Navbar />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
        }}
      >
        {verificationLoading ? (
          <p>Verifying...</p>
        ) : !verified ? (
          <p>You aren't verified to visit this page</p>
        ) : (
          <div>
            <div>
              {loading ? (
                <p>Loading...</p>
              ) : (
                <>
                  <h2>{product.name}</h2>
                  <p>{product.desc}</p>
                  <div>{product.category}</div>
                  <div>Manufacturer: {product.brand}</div>
                  <div>{product.price}$</div>
                  <div>{product.weight}kg</div>
                </>
              )}
            </div>
            <div>
              <button onClick={() => setOpen(true)}>Update</button>
            </div>
            <Modal id={id} open={open} setOpen={setOpen} />

          </div>
        )}
      </Box>
    </>
  );
};

export default ProductDetailed;