import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Rating,
  Typography,
} from "@mui/material";
import AntiqueImage from '../assets/Antique.jpeg';
import { useEffect, useState } from "react";
import { Check, ShoppingCart } from '@mui/icons-material';
import toast from "react-hot-toast";

const productVariants = [
    { imk: AntiqueImage, color: 'red', size: 'S' },
    { imk: AntiqueImage, color: 'purple', size: 'M' },
    { imk: AntiqueImage, color: 'green', size: 'L' },
    { imk: AntiqueImage, color: 'yellow', size: 'XL' },
  ];

  const features = [
    '100% Cotton',
    'Regular Fit',
    'Machine Washable',
    'Checkered Pattern',
  ];

const SpecificProduct = () => {
  
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [cart, setCart] = useState(()=>{
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  })
  const [user, setUser] = useState(()=>{
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  })

  useEffect(()=>{
      localStorage.setItem('cart',JSON.stringify(cart));
  },[cart])

  const handleBuyNow=()=>{
   if (!selectedColor && !selectedSize) {
     toast.error('Please select both color and size');
     return;
  }

  if (!selectedColor) {
    toast.error('Please select a color');
    return;
  }

  if (!selectedSize) {
    toast.error('Please select a size');
    return;
  }
  const loadingToastId = toast.loading('Proceeding to buying options...')
   setTimeout(() => {
    toast.dismiss(loadingToastId); // remove loading toast
    toast.success('Success! Ready to buy.');
  }, 3000);
 
  
  
  }

  const addToCart=()=>{
    console.log('ok')
    if(!selectedColor && !selectedSize){
      
      toast.error('Please Firstly Select Color and Size');
      return;
    }
    const cartItem={
      id:Date.now(),
      name:'Some Kind Of Shirt',
      price:1299,
      size:selectedSize,
      color:selectedColor,
      quantity:1
    }
    const existing=cart.findIndex((item)=>item.name===cartItem.name && item.size === cartItem.size && item.color === cartItem.color)
    
    if(existing!=-1){
      const updatedCart = [...cart];
      updatedCart[existing].quantity += 1;
      setCart(updatedCart);
    }else{
      setCart((p)=>[cartItem,...p]);
    }
     toast.success('Item added to cart!');
  }

  return (
    <Container sx={{ py: { xs: 3, md: 8 } }}>
      <Grid container spacing={4}>
        {/* Left Section - Images */}
        <Grid size={{xs:12,md:6}}>
          <Paper sx={{ aspectRatio: "1", overflow: "hidden", borderRadius: 2 }}>
            <Box
              component="img"
              src={AntiqueImage}
              alt="Antique"
              sx={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </Paper>

          <Grid container spacing={2} mt={1}>
            {productVariants.map((variant, index) => (
              <Grid size={3} key={index}>
                <Paper sx={{ aspectRatio: "1", overflow: "hidden", borderRadius: 1 }}>
                  <Box
                    component="img"
                    src={variant.imk}
                    alt={`Variant ${index}`}
                    sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/* Right Section - Product Details */}
        <Grid size={{xs:12,md:6}}>
          <Box display="flex" flexDirection="column" gap={3} textAlign={'left'}>
            {/* Title & Rating */}
            <Box >
              <Typography variant="h4" fontWeight="bold">H-Top TShirt</Typography>
              <Box display="flex" alignItems="center" gap={1}>
                <Rating value={4.2} precision={0.1} readOnly size="small" />
                <Typography variant="body2" color="text.secondary">
                  4.2 (1847 reviews)
                </Typography>
              </Box>
            </Box>

            {/* Price */}
            <Box display="flex" alignItems="center" gap={2}>
              <Typography variant="h5" fontWeight="bold">₹1299</Typography>
              <Typography variant="body1" color="text.secondary" sx={{ textDecoration: 'line-through' }}>
                ₹1900
              </Typography>
              <Chip label="40% off" color="error" size="small" />
            </Box>

            {/* Color Selection */}
            <Box>
              <Typography variant="h6" gutterBottom>Color: {selectedColor || "Select Color"}</Typography>
              <Box display="flex" gap={2} flexWrap="wrap">
                {productVariants.map((variant) => (
                  <Box
                    key={variant.color}
                    onClick={() => setSelectedColor(variant.color)}
                    sx={{
                      cursor: 'pointer',
                      border: selectedColor === variant.color ? '2px solid #1976d2' : '1px solid #ccc',
                      borderRadius: '50%',
                      width: 40,
                      height: 40,
                      backgroundColor: variant.color,
                    }}
                  />
                ))}
              </Box>
            </Box>

            {/* Size Selection */}
            <Box>
              <Typography variant="h6" gutterBottom>Size: {selectedSize || "Select Size"}</Typography>
              <Grid container spacing={1}>
                {productVariants.map((variant) => (
                  <Grid  size={3}  key={variant.size}>
                    <Button
                      fullWidth
                      variant={selectedSize === variant.size ? "contained" : "outlined"}
                      color="warning"
                      sx={{ height: 48 }}
                      onClick={() => setSelectedSize(variant.size)}
                    >
                      {variant.size}
                    </Button>
                  </Grid>
                ))}
              </Grid>
            </Box>

            {/* Action Buttons */}
            <Box
              display="flex"
              flexDirection={{ xs: 'column', sm: 'row' }}
              gap={2}
            >
              <Button
                variant="contained"
                size="large"
                startIcon={<ShoppingCart />}
                sx={{ flex: 1, bgcolor: 'rgb(34, 34, 34)' }}
                onClick={addToCart}
              >
                Add To Cart
              </Button>
              <Button
                variant="outlined"
                size="large"
                sx={{ flex: 1, border: '1px solid #ddd', color: "black" }}
                onClick={handleBuyNow}
              >
                Buy Now
              </Button>
            </Box>

            {/* Features */}
            <Card elevation={0} sx={{ border: '1px solid #ccc' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>Product Features</Typography>
                <List dense>
                  {features.map((feature, index) => (
                    <ListItem key={index} sx={{ px: 0 }}>
                      <ListItemIcon sx={{ minWidth: 32 }}>
                        <Check color="success" fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary={feature} />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SpecificProduct;
