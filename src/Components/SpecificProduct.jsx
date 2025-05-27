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
  Popover
} from "@mui/material";
import AntiqueImage from '../assets/Antique.jpeg';
import DarkMaroon from '../assets/DarkMaroon.jpeg';
import BeigeImage from '../assets/BeigeShirt.jpeg';
import BlackImage from '../assets/Black.jpeg';
import DarkBlueImage from '../assets/DarkBlue.jpeg';
import { useContext, useEffect, useRef, useState } from "react";
import { Check, ShoppingCart } from '@mui/icons-material';
import toast from "react-hot-toast";
import { CartContext } from "./CartProvider";

const productVariants = [
    { imk: DarkBlueImage, color: 'DarkBlue', size: 'S' },
    { imk: DarkMaroon, color: 'Maroon', size: 'M' },
    { imk: BeigeImage, color: 'Beige', size: 'L' },
    { imk: BlackImage, color: 'Black', size: 'XL' },
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
  const {cart,setCart}=useContext(CartContext);
  const [zoomVisible,setZoomVisible]=useState(true);
  const [zoomPosition,setZoomPosition]=useState({x:0,y:0});
  const [previewImage, setPreviewImage] = useState(BeigeImage);
  const [defaultImage,setDefaultImage]=useState(BeigeImage)
  const [user, setUser] = useState(()=>{
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  })
  const imageRef=useRef();

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
  const handleHover=(image)=>{
    setPreviewImage(image)
  }
  const resetImage = () => {
    setPreviewImage(defaultImage);
  };
  const ImageSelectionHandler=(va)=>{
    console.log('va',va)
    setDefaultImage(va.imk);
    setPreviewImage(va.imk);
    setSelectedColor(va.color)
  }

  const addToCart=(e)=>{
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
     console.log('haa',e.currentTarget)
  }

  const handleImageMouseHover=(e)=>{
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    setZoomPosition({ x, y });

    // const bounds=imageRef.current.getBoundingClientRect();
    //  const x = ((e.clientX - bounds.left) / bounds.width) * 100;
    // const y = ((e.clientY - bounds.top) / bounds.height) * 100;
    // setZoomPosition({ x, y });
  }

  return (
    <Container sx={{ py: { xs: 3, md: 8 } }}>
      
      <Grid container spacing={4}>
        {/* Left Section - Images */}
        <Grid size={{xs:12,md:6}} >
          <Paper sx={{ aspectRatio: "1/1", overflow: "hidden", borderRadius: 2 }}>
            <Box
              // ref={imageRef}
              
              component="img"
              src={previewImage}
              alt="Antique"
              sx={{ width: "100%", height: "100%", objectFit: "contain",cursor:'crosshair' }}
              onMouseEnter={()=>setZoomVisible(true)}
              onMouseLeave={() => setZoomVisible(false)}
              onMouseMove={(e)=>handleImageMouseHover(e)}
            />
          </Paper>
          {/* ------------------ */}
          
          

          {/* ------------------- */}
          <Grid container spacing={2} mt={1}>
            {productVariants.map((variant, index) => (
              
              <Grid size={3} key={index}
              onMouseEnter={()=>handleHover(variant.imk)}
              onMouseLeave={resetImage}
              onClick={()=>ImageSelectionHandler(variant)}
              >
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
        <Grid size={{xs:12,md:6}} sx={{position:'relative'}}>
          {zoomVisible && (
  <Box
    sx={{
      position: "absolute",
      top: 0,
      left: 0,
      width: "99%",
      height: "75%",
      bgcolor: "#fff",
      border: "1px solid #ccc",
      zIndex: 10,
      display: { xs: 'none', md: 'block' },
      overflow: "hidden",
    }}
  >
    <Box
      component="img"
      src={previewImage}
      sx={{
        position: "absolute",
        top: `${-zoomPosition.y * 1.5}px`,
        left: `${-zoomPosition.x * 2.5}px`,
        width: "1200px",
        height: "1200px",
        objectFit: "contain",
      }}
    />
  </Box>
)}
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
                    onMouseEnter={()=>handleHover(variant.imk)}
                    onMouseLeave={resetImage}
                    key={variant.color}
                    onClick={() => ImageSelectionHandler(variant)}
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
                onClick={(e)=>addToCart(e)}
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
