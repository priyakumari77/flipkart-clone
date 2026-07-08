import { NavLink } from "react-router-dom"
import flipkartlogo from "../assets/flipkart.png"
import "../css/navbar.css"
import { LuCircleUserRound } from "react-icons/lu";
import { BsCart3 } from "react-icons/bs";
import { Badge } from "antd";
import { useSelector } from "react-redux";

const Navbar =()=>{

    const cartItems = useSelector((state)=>state.cart.item)
    return(
        <div className="navbar">
            <NavLink to ="/" className="navbar_logo"><img style={{height:"45px",width:"45px"}}  src= {flipkartlogo}/> 
            </NavLink>
            <div className="navbar_search">
                <input type="text" 
                placeholder="search product name"/>
                
            </div>

            
            <div className="navbar_links">

                <div className="navbar_menu">
                    <NavLink to="products">Product</NavLink>

                </div>

                <div className="navbar_menu">
                    <Badge count ={cartItems.length}>
                    <BsCart3 />
                    </Badge>
                <NavLink to ="cart">Cart</NavLink>
                </div>
               
            <div className="navbar_menu">

           <LuCircleUserRound />
            <NavLink to ="login">Login</NavLink>
             </div>
            </div>

        </div>
    )
}

export default Navbar

