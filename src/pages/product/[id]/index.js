import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import getProductById from "../../../../apiCalls/get-product-by-id";
import verifyToken from "../../../../apiCalls/verify-token";
import { Box } from "@mui/material";

const ProductDetailed = () => {
  const router = useRouter();
  const { id } = router.query;
  const [loading, setLoading] = useState(false);
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
      )}
    </Box>
  );
};

export default ProductDetailed;
