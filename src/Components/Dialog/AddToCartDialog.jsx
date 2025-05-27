import { Add, Close, Remove, ShoppingBag } from "@mui/icons-material";
import {
  Box,
  Button,
  Divider,
  IconButton,
  Popover,
  Typography
} from "@mui/material";
import React, { useContext } from "react";
import { CartContext } from "../CartProvider";

const AddToCartDialog = ({ anchor, open, onCloseC }) => {
  const { cart: carty, setCart } = useContext(CartContext); // assuming setCart is available

  const increaseQty = (id) => {
    const updated = carty.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCart(updated);
  };

  const decreaseQty = (id) => {
    const updated = carty
      .map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity - 1) }
          : item
      );
    setCart(updated);
  };

  const removeItem = (id) => {
    const updated = carty.filter((item) => item.id !== id);
    setCart(updated);
  };

  return (
    <Popover
      open={open}
      anchorEl={anchor}
      onClose={onCloseC}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left"
      }}
    transformOrigin={{
    vertical: 'top',
    horizontal: 'left',
  }}
      sx={{maxHeight:'75%'}}
    >
      <Box sx={{ p: 3, minWidth: 350 }}>
        <Typography variant="h5" fontWeight="bold"  color="primary" mb={2}>
          <ShoppingBag  /> Cart Summary
        </Typography>

        {carty.length === 0 ? (
          <Typography sx={{ mt: 1 }}>Your cart is empty.</Typography>
        ) : (
          <Box>
            {carty.map((item,index) => {
                return(<React.Fragment key={index}>
              <Box
                key={item.id}
                sx={{
                  mb: 2,
                  p: 2,
                  borderRadius: 2,
                //   boxShadow: 1,
                //   bgcolor: "#f9f9f9",
                  position: "relative"
                }}
              >
                <IconButton
                  size="small"
                  onClick={() => removeItem(item.id)}
                  sx={{ position: "absolute", top: 4, right: 4 }}
                >
                  <Close fontSize="small" />
                </IconButton>

                <Typography variant="subtitle1" fontWeight="bold">
                  {item.name}
                </Typography>

                <Typography variant="body2">Size: {item.size}</Typography>

                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  mt={1}
                >
                  <Box display="flex" alignItems="center" gap={1}>
                    <Typography variant="body2">Color:</Typography>
                    <Box
                      component="span"
                      sx={{
                        width: 20,
                        height: 20,
                        borderRadius: "50%",
                        backgroundColor: item.color,
                        border: "1px solid #ccc"
                      }}
                    />
                  </Box>

                  <Box display="flex" alignItems="center" gap={1}>
                    <IconButton
                      size="small"
                      onClick={() => decreaseQty(item.id)}
                      color="primary"
                    >
                      <Remove fontSize="small" />
                    </IconButton>
                    <Typography>{item.quantity}</Typography>
                    <IconButton
                      size="small"
                      onClick={() => increaseQty(item.id)}
                      color="primary"
                    >
                      <Add fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>
              </Box>
              
              {index===carty.length-1?<></>:<Divider />}
              </React.Fragment>)
            })}

            <Divider sx={{ my: 2 }} />

            <Button fullWidth variant="contained" onClick={onCloseC}>
              Go to Cart
            </Button>
          </Box>
        )}
      </Box>
    </Popover>
  );
};

export default AddToCartDialog;
