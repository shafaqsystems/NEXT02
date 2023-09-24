import { Inter } from "next/font/google";
import Link from "next/link";
import { useEffect, useState } from "react";
import getAllProducts from "../../apiCalls/get-all-products";
import verifyToken from "../../apiCalls/verify-token";
import { Box, Button } from "@mui/material";
import deleteProduct from "../../apiCalls/delete-product";

const inter = Inter({ subsets: ["latin"] });

const ProductCard = ({ id, name, price }) => {
  const handleDelete = () => {
    deleteProduct(id)
      .then((response) => console.log(response))
      .catch((e) => console.log(e));
  };

  return (
    <Box
      sx={{
        mb: 2,
        boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
        transition: "0.3s",
        p: 5,
      }}
    >
      <Link href={`/product/${id}`}>
        <div>
          <p>{id}</p>
          <p>{name}</p>
          <p>{price}</p>
        </div>
      </Link>
      <Button
        sx={{ mt: 1, backgroundColor: "red", color: "white" }}
        onClick={() => handleDelete(id)}
      >
        Delete
      </Button>
    </Box>
  );
};

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);

  const [verificationLoading, setVerificationLoading] = useState(false);
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    setVerificationLoading(true);
    verifyToken()
      .then((response) => {
        setVerified(true);
        setVerificationLoading(false);
        setLoading(true);
        getAllProducts()
          .then((response) => {
            setProducts(response.data);
            setLoading(false);
          })
          .catch((e) => {
            console.log(e);
            setLoading(false);
          });
      })
      .catch((e) => {
        setVerified(false);
        setVerificationLoading(false);
      });
  }, [verified]);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      <div>
        {verificationLoading ? (
          <p>Verifying...</p>
        ) : !verified ? (
          <p>You aren't authorized to visit this page</p>
        ) : loading ? (
          <p>Loading...</p>
        ) : (
          products.map((product) => (
            <ProductCard
              key={product._id}
              id={product._id}
              name={product.name}
              price={product.price}
            />
          ))
        )}
      </div>
    </Box>
  );
}
