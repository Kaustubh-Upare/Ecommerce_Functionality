import { Avatar, Box, Button, Card, CardContent, Chip, Container, Grid, List, ListItem, ListItemIcon, ListItemText, Paper, Rating, Typography } from "@mui/material"
import AntiqueImage from '../assets/Antique.jpeg'
import { useState } from "react";
import {Check, ShoppingCart} from '@mui/icons-material'
const SpecificProduc=()=>{

  const oo=[
    {imk:AntiqueImage,color:'red',size:'S'},
    {imk:AntiqueImage,color:'purple',size:'M'},
    {imk:AntiqueImage,color:'green',size:'L'},
    {imk:AntiqueImage,color:'yellow',size:'Xl'},
  ]
  const features=['100% Cotton','Regular Fit','Machine Washable','Checkered Pattern'
  ]

  const [selectedColor,setSelectedColor]=useState(null);
  const [selectedSize,setSelectedSize]=useState('')

  return(
  <Container sx={{padding:{xs:'2rem',md:'4rem',width:'100%',height:'100%'}}}>
      <Grid container spacing={2} width={'100%'} height={'100%'}>
        <Grid size={{xs:12,md:6}} spacing={2}>
          <Paper sx={{ aspectRatio: "1/1", overflow: "hidden", borderRadius: 2 }}>
          <Box component={'img'}
          src={AntiqueImage}
            alt="Antique"
            sx={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          </Paper>

          <Grid container marginTop={2} spacing={2}>
           {oo.map((r)=>(
            <Grid size={3}>
            <Paper sx={{ aspectRatio: "1/1", overflow: "hidden", borderRadius: 1 }}>
          <Box component={'img'}
          src={r.imk}
            alt="Antique"
            sx={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          </Paper>
          </Grid>  
           ))}
          </Grid>

        </Grid>
        
        <Grid size={{xs:12,md:6}}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          
          <Box>
            <Typography variant="h4" textAlign={'left'} gutterBottom fontWeight="bold">
                  H-Top TShirt
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Rating value={4} precision={0.1} readOnly size="small" />
                  <Typography variant="body2" color="text.secondary">
                    4.2 (1847 reviews)
                  </Typography>
                </Box>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Typography variant="h4" component="span" fontWeight="bold">
                  ₹1299
                </Typography>
                <Typography
                  variant="h6"
                  component="span"
                  color="text.secondary"
                  sx={{ textDecoration: "line-through" }}
                >
                  ₹1900
                </Typography>
                <Chip label={`$40% off`} color="error" size="small" />
              </Box>
          
            <Box>
                  <Typography variant="h6" gutterBottom textAlign={'left'}>
                    Color: {selectedColor ? selectedColor.name : "Select Color"}
                  </Typography>
                  <Box sx={{ display: "flex", gap: 1 }}>
                    {oo.map((col)=>(
                      <Box key={col.color}
                      sx={{
                        cursor: "pointer",
                        border: selectedColor?.value === col.color ? 2 : 0,
                        borderColor: "primary.main",
                        borderRadius: "50%",
                        p: selectedColor?.value === col.color ? 0.5 : 0,
                      }}
                      
                      >
                        <div 
                        style={{
                          backgroundColor:col.color,
                          height:40,
                          width:40,
                          borderRadius:50,
                          border:selectedColor?.value==col.color?'1px solid #e0e0e0':'0.5px solid #e0e0e0'
                        }}
                        />
                      </Box>
                    ))}
                  </Box>
                  {/* <Box sx={{ display: "flex", gap: 1 }}>
                    {productData.colors.map((color) => (
                      <Box
                        key={color.value}
                        sx={{
                          position: "relative",
                          cursor: "pointer",
                          border: selectedColor?.value === color.value ? 2 : 0,
                          borderColor: "primary.main",
                          borderRadius: "50%",
                          p: selectedColor?.value === color.value ? 0.5 : 0,
                        }}
                        onClick={() => handleColorSelect(color)}
                        onMouseEnter={() => handleColorHover(color)}
                        onMouseLeave={handleColorLeave}
                      >
                        <Avatar
                          sx={{
                            width: 40,
                            height: 40,
                            bgcolor: color.hex,
                            border: color.hex === "#ffffff" ? "1px solid #e0e0e0" : "none",
                          }}
                        >
                          {selectedColor?.value === color.value && (
                            <Check sx={{ color: color.hex === "#ffffff" ? "black" : "white", fontSize: 20 }} />
                          )}
                        </Avatar>
                      </Box>
                    ))}
                  </Box> */}
            </Box>

             <Box>
                <Typography variant="h6" gutterBottom textAlign={'left'}>
                  Size: { "Select Size" || selectedSize }
                </Typography>
                <Grid container spacing={1}>
                  {oo.map((o) => (
                    <Grid size={3 } key={o.size}>
                      <Button
                      // variant={"outlined"}
                        variant={selectedSize === o.size ? "contained" : "outlined"}
                        onClick={() => setSelectedSize(o.size)}
                        color="warning"
                        fullWidth
                        
                        sx={{ minWidth: 60, height: 48 }}
                      >
                        {o.size}
                      </Button>
                    </Grid>
                  ))}
                </Grid>
              </Box>

              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<ShoppingCart />}
                  
                  // onClick={handleAddToCart}
                  sx={{ height: 48,bgcolor:'rgb(34, 34, 34)' }}
                >Add To Cart
                </Button>
                <Button variant="outlined" size="large" 
                // onClick={handleBuyNow}
                
                 sx={{ height: 48,border:'0.5px solid rgb(221, 221, 221)',color:"black" }}>
                  Buy Now
                </Button>

              </Box>
              <Card elevation={1} sx={{boxShadow:'none',border:'0.5px solid rgb(207, 205, 205)'}}>
                <CardContent>
                  <Typography variant="h6" fontFamily={'Roboto'} gutterBottom textAlign={'left'}>
                    Product Features
                  </Typography>
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
    )
}

export default SpecificProduc;