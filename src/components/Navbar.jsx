import { NavLink, useNavigate } from "react-router-dom";
import flipkartlogo from "../assets/flipkart.png";
import "../css/navbar.css";
import { LuCircleUserRound } from "react-icons/lu";
import { BsCart3 } from "react-icons/bs";
import { Badge } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { FaRegCircleUser } from "react-icons/fa6";
import { logout } from "../redux/slice/authSlice";
import { useLocation } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import { IoIosPower } from "react-icons/io";
import { FaBox } from "react-icons/fa6";

import { Dropdown, Button } from "antd";
import { CiSearch } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";

// Dropdown menu items



const Navbar = () => {
  const navigate=useNavigate()

const dispatch=useDispatch()
const items = [
  
  {
    key: "1",
    label: <NavLink className="dropdown-option" to="profile">  <FaUserCircle color="#2874f0" />Profile</NavLink>,
  },
  {
    key: "2",
    label: <NavLink className="dropdown-option" to="orders">  <FaBox />Orders</NavLink>,
  },
  {
   key:"3",
   label: <NavLink className="dropdown-option" to="wishlist"> <FaHeart color="red" />Wishlist</NavLink>
  },
  {
    key: "4",
    label: <span className="dropdown-option" onClick={()=>{logoutClick()}}>   <IoIosPower />Logout</span>,
  },
  
];

 function logoutClick(){
  const token = localStorage.removeItem("token")
  console.log(token)
  dispatch(logout())
  if(location.pathname!="products"){
    navigate("/")
  }
 }


  const isloggedin = useSelector((state) => state.auth.isLoggedin);
  
//   console.log(isloggedin)
  // const cartItems = useSelector((state) => state.cart.item);
  return (
    <div className="navbar">
      <NavLink to="/" className="navbar_logo">
        <img style={{ height: "45px", width: "45px" }} src={flipkartlogo} />
      </NavLink>
      
      <div  className="navbar_search">
        <input type="text"  placeholder= "Search for Products, Brands and More"
         />
         
      </div>

      <div className="navbar_links">
        <div className="navbar_menu">
          <NavLink to="products">Product</NavLink>
        </div>

        {isloggedin && <div className="navbar_menu">
          {/* <Badge count={cartItems.length}>
            <BsCart3 />
          </Badge> */}
           <FaShoppingCart /><NavLink to="cart">  Cart</NavLink>
        </div>}

        {!isloggedin && (
          <div className="navbar_menu">
            <LuCircleUserRound />
            <NavLink to="login">Login</NavLink>
          </div>
        )}

        {isloggedin && (
          <div className="navbar_menu">
            <FaRegCircleUser />
            
            <Dropdown menu={{ items }} placement="bottomLeft">
              Accounts
            </Dropdown>

          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
