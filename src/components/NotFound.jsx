import "../css/notfound.css"
import { Link } from "react-router-dom"
function NotFound(){
    return(
       <div className="notfound-div">
         <h1>404</h1>
        <h2>Oops! page not found</h2>
         <p>The page you're looking for doesn't exist or has been moved.</p>
         <Link to="/" className="home-link">Go to Homepage</Link>
       </div>
    )
}

export default NotFound