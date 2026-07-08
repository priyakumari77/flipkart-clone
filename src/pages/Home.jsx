 
 import "../css/home_categories.css"
import { Carousel } from "antd";
import Products from "./Products";
const Home =()=>{
    return(

        <div className="home_main">
        
        <div className="home_categories" >
           
           <div className="categories_item">
            <img src=" https://rukminim2.flixcart.com/flap/64/64/image/29327f40e9c4d26b.png?q=100"></img>
             <h3>kilos</h3>
           </div >
           <div  className="categories_item">
            <img src ="https://rukminim2.flixcart.com/flap/64/64/image/22fddf3c7da4c4f4.png?q=100"></img>
            <h3>Mobile</h3>
           </div>
           <div  className="categories_item">
            <img src ="https://rukminim2.flixcart.com/fk-p-flap/64/64/image/0d75b34f7d8fbcb3.png?q=100"></img>
            <h3>Fashion</h3>
           </div>

           <div className="caregories_item">
            <img src ="https://rukminim2.flixcart.com/flap/64/64/image/69c6589653afdb9a.png?q=100"></img>
            <h3>Electronics</h3>
           </div>

           <div  className="categories_item">
            <img src ="https://rukminim2.flixcart.com/flap/64/64/image/ab7e2b022a4587dd.jpg?q=100"></img>
            <h3>Furniture</h3>
           </div>
           <div  className="categories_item">
            <img src ="https://rukminim2.flixcart.com/fk-p-flap/64/64/image/0139228b2f7eb413.jpg?q=100"></img>
            <h3>Washing Machine</h3>
           </div>
           <div  className="categories_item">
            <img src ="https://rukminim2.flixcart.com/flap/64/64/image/71050627a56b4693.png?q=100"></img>
            <h3>Flight Bookings</h3>
           </div>
           <div  className="categories_item">
            <img src ="https://rukminim2.flixcart.com/flap/64/64/image/dff3f7adcf3a90c6.png?q=100"></img>
            <h3>Beauty&Toys</h3>
           </div>
        </div>



        <Carousel arrows={true} autoplay autoplaySpeed={1500}>

            
      <div>
        <img src="https://rukminim2.flixcart.com/fk-p-flap/1620/270/image/2b436dcb807a35db.jpeg?q=20"></img>
       
      </div>
      <div>
       <img src="https://rukminim2.flixcart.com/fk-p-flap/1620/270/image/1bd9f11edbf77427.jpg?q=20"></img>
      </div>
      <div>
        <img src="https://rukminim2.flixcart.com/fk-p-flap/1620/270/image/e2d8a680db051b90.jpg?q=20"/>
        
      </div>
      <div>
        <img src="https://rukminim2.flixcart.com/fk-p-flap/1620/270/image/fa6a8ba7d645d8ee.jpg?q=20"/>
      </div>
    </Carousel>


           <Products/>

             </div>

    )
}

export default Home 