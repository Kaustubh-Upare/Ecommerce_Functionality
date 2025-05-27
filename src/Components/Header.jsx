import {AppBar, Backdrop, Badge, Box, IconButton, Toolbar, Typography} from '@mui/material'
import {Person, ShoppingCart} from '@mui/icons-material'
import { lazy, Suspense, useContext, useEffect, useState } from 'react'
import { CartContext } from './CartProvider'

const LazyCartDialog=lazy(()=>import('./Dialog/AddToCartDialog'));
const Header=()=>{

    const {cart :carty}=useContext(CartContext)
    const [anchorE,setAnchorE]=useState(null);
    const [openAddToCart,setOpenAddToCart]=useState(false);

    const handleAddToCart=(e)=>{
        setAnchorE(e.currentTarget);
        setOpenAddToCart(true);
    }
    return(
        <>
        <AppBar>
            <Suspense fallback={<Backdrop open />}>
            {openAddToCart && <LazyCartDialog anchor={anchorE} open={openAddToCart} onCloseC={()=>setOpenAddToCart(false)} />}
            </Suspense>

            <Toolbar sx={{bgcolor:'white'}} >
                <Typography variant='h6' sx={{color:'black'}}>
                    ShopMart
                </Typography>

                <Box sx={{marginLeft:'auto',paddingRight:{xs:'0.1rem',sm:'2rem'}}}>
                    <Badge badgeContent={carty?.length} color='primary' >
                    <IconButton color='warning' onClick={(e)=>handleAddToCart(e)} >
                        <ShoppingCart />
                    </IconButton>
                    </Badge>

                    <IconButton color='primary'>
                        <Person/>
                    </IconButton>

                </Box>

            </Toolbar>
        </AppBar>
        </>
    )
}

export default Header;