import Products from "./pages/Products"
import Cart from "./pages/Cart"
import Login from "./pages/Login"
import Home from "./pages/Home"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import { BrowserRouter,Route,Routes,NavLink} from "react-router-dom"
import ProductDetails from "./pages/ProductDetails"
function App(){
  return(
    <div>
      <BrowserRouter>
      <Navbar/>
     

      <Routes>
       <Route path="/" element = {<Home/>} ></Route>
      <Route path="login" element={<Login/>}></Route>
      <Route path="cart" element ={<Cart/>}></Route>
      <Route path="products" element ={<Products/>}></Route>
      <Route path="product-detail" element={<ProductDetails/>}></Route>

      </Routes>

      </BrowserRouter>

    <Footer/>
    
    </div>
  )
}

export default App