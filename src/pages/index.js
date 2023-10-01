import { Inter } from "next/font/google";
import Link from "next/link";
import { useEffect, useState } from "react";
import getAllProducts from "../../apiCalls/get-all-products";
import verifyToken from "../../apiCalls/verify-token";
import { Box, Button, TextField } from "@mui/material";
import deleteProduct from "../../apiCalls/delete-product";
import { useRouter } from "next/router";
import Navbar from "../../components/Navbar";
import CustomSnackbar from "../../components/Snackbar";

const inter = Inter({ subsets: ["latin"] });

const ProductCard = ({
  id,
  name,
  price,
  setSnackbarMessage,
  setSnackbarSeverity,
  setSnackbarOpen,
}) => {
  const handleDelete = () => {
    deleteProduct(id)
      .then((response) => {
        setSnackbarMessage("Product deleted successfully");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
      })
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
        <img
            src="https://www.hmmawards.com/wp-content/uploads/woocommerce-placeholder-300x300.png"
            alt="Product Image"
            width={150} // Set the desired width
            height={150} // Set the desired height
          />
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

  const [renderProducts, setRenderProducts] = useState([]);

  const [verificationLoading, setVerificationLoading] = useState(false);
  const [verified, setVerified] = useState(false);

  const [searchText, setSearchText] = useState("");

  const router = useRouter();

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [snackbarMessage, setSnackbarMessage] = useState("");

  // useEffect(() => {
  //   router.push("/login");
  // }, []);

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
            setRenderProducts(response.data);
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

  useEffect(() => {
    if (searchText === "") {
      setRenderProducts(products);
    } else {
      const filteredProducts = products.filter((product) =>
        product.name.includes(searchText)
      );
      setRenderProducts(filteredProducts);
    }
  }, [searchText]);

  return (
    <>
      <Navbar />
      <Box sx={{ display: "flex" }}>
        <TextField
          placeholder="search"
          sx={{ mx: "auto" }}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </Box>
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
            renderProducts.map((product) => (
              
              <ProductCard
                setSnackbarMessage={setSnackbarMessage}
                setSnackbarSeverity={setSnackbarSeverity}
                setSnackbarOpen={setSnackbarOpen}
                key={product._id}
                id={product._id}
                name={product.name}
                price={product.price}
              />
            ))
          )}
        </div>
      </Box>
      <CustomSnackbar
        open={snackbarOpen}
        setOpen={setSnackbarOpen}
        severity={snackbarSeverity}
        message={snackbarMessage}
      />
    </>
  );
}