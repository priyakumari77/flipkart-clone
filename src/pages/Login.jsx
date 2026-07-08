import "../css/login.css"
const Login =()=>{
    return(
        <div className="login_wrapper">

        <div className="login_container"> 
       
       <div className="left_section">

       <h2>Login</h2>
       <p>Get access to your Orders, Wishlist and Recommendations</p>
       <img src="https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/login_img_c4a81e.png" alt="login" />
       </div>
       <div className="right_section">
        <form>
            <h3>Email</h3>
            <input type="Email" placeholder="Enter your Email/ Mobile Number" />
            <p>By continuing, you agree to Flipkart's Terms of Use and Privacy Policy.
            </p>
            <button>Request OTP </button>
            <p className="create-account">
                New to Flipkart? <span>  Create an account </span>
            </p>
        </form>

       </div>
        </div>

        </div>
    )
}

export default Login