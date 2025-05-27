import {AppBar, Box, IconButton, Toolbar, Typography} from '@mui/material'
import {Person, ShoppingCart} from '@mui/icons-material'
const Header=()=>{
    return(
        <>
        <AppBar>
            <Toolbar sx={{bgcolor:'white'}} >
                <Typography variant='h6' sx={{color:'black'}}>
                    ShopMart
                </Typography>

                <Box sx={{marginLeft:'auto',paddingRight:{xs:'0.1rem',sm:'2rem'}}}>
                    <IconButton color='warning'>
                        <ShoppingCart />
                    </IconButton>

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