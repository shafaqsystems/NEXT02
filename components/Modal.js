import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import MuiModal from "@mui/material/Modal";
import updateProduct from "../apiCalls/update-product";
import CustomSnackbar from "./Snackbar";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function Modal({ id, open, setOpen }) {
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [name, setName] = React.useState("");
  const [desc, setDesc] = React.useState("");
  const [brand, setBrand] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [weight, setWeight] = React.useState("");
  const [price, setPrice] = React.useState("");

  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = React.useState("success");
  const [snackbarMessage, setSnackbarMessage] = React.useState("");

  const handleSubmit = () => {
    if (!name || !desc || !brand || !category || !weight || !price) {
      console.log("Please fill in all the fields");
      return;
    }
    updateProduct(id, name, desc, brand, category, weight, price)
      .then((response) => {
        setSnackbarMessage("Product updated successfully");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
      })
      .catch((e) => {
        setSnackbarMessage("Error updating product");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      });
  };

  return (
    <div>
      <MuiModal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Update
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <input
              placeholder="name"
              onChange={(e) => setName(e.target.value)}
            />
            <input
              placeholder="desc"
              onChange={(e) => setDesc(e.target.value)}
            />
            <input
              placeholder="brand"
              onChange={(e) => setBrand(e.target.value)}
            />
            <input
              placeholder="category"
              onChange={(e) => setCategory(e.target.value)}
            />
            <input
              placeholder="weight"
              onChange={(e) => setWeight(e.target.value)}
            />
            <input
              placeholder="price"
              onChange={(e) => setPrice(e.target.value)}
            />
            <button onClick={handleSubmit}>Submit</button>
          </Typography>
          <CustomSnackbar
            open={snackbarOpen}
            setOpen={setSnackbarOpen}
            severity={snackbarSeverity}
            message={snackbarMessage}
          />
        </Box>
      </MuiModal>
    </div>
  );
}