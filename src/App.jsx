import './App.css'
import CartProvider, { CartContext } from './Components/CartProvider'
import Header from './Components/Header'
import SpecificProduc from './Components/SpecificProduct'
import {Toaster} from 'react-hot-toast'

function App() {
  
  return (
    <>
    <CartProvider>
      <Header />
      <SpecificProduc />

      <Toaster position='bottom-center' />
      </CartProvider>
    </>
  )
}

export default App
