import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Button } from "@mui/material";
import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 200,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  fontFamily: "Helvetica, Arial, sans-serif",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  color: "black",
};

function CartModal({ modaltitle, modaldescription, open, setOpen }) {
  //check if user has ebeen authenticated when clicked. If not authenticated, prompt user to log in.
  const { isAuthenticated, user } = useAuth0();

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      {isAuthenticated && user ? (
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="cart-modal-title"
          aria-describedby="cart-modal-description"
        >
          <Box
            sx={{
              ...style,
              fontFamily: "'Arial', sans-serif",
            }}
          >
            <h2 id="cart-modal-title">{modaltitle}</h2>
            <p id="cart-modal-description">{modaldescription}</p>

            <Button onClick={handleClose}>Close</Button>
          </Box>
        </Modal>
      ) : (
        <p>Please sign in to view your cart.</p>
      )}
    </div>
  );
}

export default CartModal;
