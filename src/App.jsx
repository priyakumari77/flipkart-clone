import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { BrowserRouter, Route, Routes, NavLink } from "react-router-dom";
import ProductDetails from "./pages/ProductDetails";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "./redux/slice/authSlice";
import { logout } from "./redux/slice/authSlice";
import Orders from "./pages/Orders";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./components/NotFound";
import ScrollToTop from "./components/ScrollToTop";
import Wishlist from "./pages/Wishlist";

function App() {
  const isloggedin = useSelector((state) => state.auth.isLoggedin);

  const dispatch = useDispatch();

  //handling token expire , if token expire calling logout function
  async function fetchUser() {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        dispatch(login(token));
        const res = await axios.get(
          "https://flipkart-backend-0rv2.onrender.com/user/fetch-user",
          {
            headers: { authorization: token },
          }
        );
        console.log(res.data);
      }
    } catch (error) {
      console.log(error);
      logoutClick();
    }
  }


  useEffect(() => {
    fetchUser();
  }, []);

  function logoutClick() {
    const token = localStorage.removeItem("token");
    console.log(token);
    dispatch(logout());
  }



  return (
    <div>
      <BrowserRouter basename="/flipkart-clone">
        <Navbar />
        <ScrollToTop />

        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="login" element={<Login />}></Route>


          <Route
            path="/cart"
            element={
              <ProtectedRoute isloggedin={isloggedin}>
                <Cart />
              </ProtectedRoute>
            }
          />

          {/* <Route path="cart" element ={<Cart/>}></Route> */}
          <Route path="products" element={<Products />}></Route>
          <Route path="product-detail/:id" element={<ProductDetails />}></Route>
          <Route path="signup" element={<Signup />}></Route>

          <Route
            path="profile"
            element={
              <ProtectedRoute isloggedin={isloggedin}>
                <Profile />
              </ProtectedRoute>
            }
          ></Route>
          {/* <Route path="profile" element={<Profile/>}></Route> */}

          <Route
            path="wishlist"
            element={
              <ProtectedRoute isloggedin={isloggedin}>
                <Wishlist />
              </ProtectedRoute>
            }
          ></Route>

          <Route
            path="orders"
            element={
              <ProtectedRoute isloggedin={isloggedin}>
                <Orders />
              </ProtectedRoute>
            }
          ></Route>
          {/* <Route path="orders" element={<Orders/>}></Route> */}
          <Route path="*" element={<NotFound />}></Route>
        </Routes>

        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
