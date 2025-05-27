import './App.css'
import Header from './Components/Header'
import SpecificProduc from './Components/SpecificProduct'
import {Toaster} from 'react-hot-toast'

function App() {
  
  return (
    <>
      <Header />
      <SpecificProduc />

      <Toaster position='bottom-center' />
    </>
  )
}

export default App
