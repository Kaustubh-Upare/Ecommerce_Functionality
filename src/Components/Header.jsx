import {AppBar, Backdrop, Badge, Box, IconButton, Toolbar, Tooltip, Typography} from '@mui/material'
import {AccountCircle, Person, ShoppingCart} from '@mui/icons-material'
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
               <Typography
                        variant="h4"
                        sx={{
                            fontFamily: 'Playfair Display',
                            fontWeight: 'bold',
                            letterSpacing: 1.5,
                            color: 'rgb(190, 2, 181)',
                            textShadow: '1px 1px 2px rgba(0,0,0,0.2)',
                        }}
                        >
                        ECom
                        <Box
                            component="span"
                            sx={{
                            color: '#d32f2f', 
                            fontFamily: 'Pacifico',
                            ml: 0.5,
                            }}
                        >
                            Mart
                        </Box>
                </Typography>
                <Box sx={{marginLeft:'auto',paddingRight:{xs:'0.1rem',sm:'2rem'}}}>
                    <Tooltip title={'Cart'}>
                    <Badge badgeContent={carty?.length} color='primary' >
                    <IconButton color='secondary' onClick={(e)=>handleAddToCart(e)} >
                        <ShoppingCart />
                    </IconButton>
                    </Badge>
                    </Tooltip>

                    <Tooltip title={'Account'}>
                    <IconButton color='secondary'>
                        <AccountCircle fontSize='inherit'/>
                    </IconButton>
                    </Tooltip>

                </Box>

            </Toolbar>
        </AppBar>
        </>
    )
}

export default Header;