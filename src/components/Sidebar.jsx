
import { useNavigate } from "react-router-dom"
import "../css/sidebar.css"
import { useDispatch } from "react-redux"
import { logout } from "../redux/slice/authSlice"
import { IoIosPower } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { FaBox } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";
import { IoMdWallet } from "react-icons/io";
const Sidebar=()=>{

    const navigate = useNavigate()
    const dispatch = useDispatch()

    function logoutClick(){
        localStorage.removeItem("token")
        dispatch(logout())
        navigate("/login")
        
    }
    return(
        <div className="sidebar">
            <h3>My Account</h3>
            <ul>
                <li style={{color:"#2874f0"}}> <FaUserCircle color="#2874f0" />Profile</li>
                <li onClick={()=>{navigate("/orders")}}>  <FaBox />Orders</li>
                <li onClick={()=>{navigate("/wishlist")}}> <FaHeart /> Wishlist</li>
                <li> <IoMdWallet />Saved Cards</li>
                <li onClick={()=>{logoutClick()}}> <IoIosPower size={20} /><span>Logout</span></li>
            </ul>
        </div>
    )
}

export default Sidebar 