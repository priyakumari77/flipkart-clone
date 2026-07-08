import "../css/home_categories.css";
import { Carousel } from "antd";
import Products from "./Products";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ProductbyCategory from "../components/ProductbyCategory";
const Home = () => {
  const [category, setCategory] = useState([]);
  const navigate = useNavigate();

  const [button, setButton] = useState(0);

  async function getCategory() {
    try {
      const res = await axios.get(
        "https://flipkert-backend.onrender.com/user/fetch-all-categories"
      );
      console.log(res.data);
      console.log(res.data.data);
      setCategory(res.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getCategory();
  }, [button]);

  return (
    <div className="home_main">
      <div style={{ height: "20px" }}></div>

      <div className="home_categories">
        {/* {console.log(category)} */}

         {category.map((item) => {
          return (
            <div
              className="categories_item"
              onClick={() => {
                navigate("/products", {
                  state: {
                    category: item.name,
                  },
                });
              }}
              key={item._id}
            >
              <img src={item.image}></img>
              <h3>{item.name}</h3>
            </div>
          );
        })}

        {/* <button onClick={() => setButton(button + 1)}>{button}</button> */}

        {/* <div className="categories_item">
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
           </div> */}
           
      </div>

      <Carousel
        style={{ margin: "20px" }}
        arrows={true}
        autoplay
        autoplaySpeed={1500}
      >
        <div>
          <img src="https://rukminim2.flixcart.com/fk-p-flap/1620/270/image/f2ffab1767893241.jpg?q=80" />
        </div>

        <div>
          <img src="https://rukminim2.flixcart.com/fk-p-flap/1620/270/image/2b436dcb807a35db.jpeg?q=20"></img>
        </div>
        <div>
          <img src="https://rukminim2.flixcart.com/fk-p-flap/1620/270/image/1bd9f11edbf77427.jpg?q=20"></img>
        </div>
        <div>
          <img src="https://rukminim2.flixcart.com/fk-p-flap/1620/270/image/e2d8a680db051b90.jpg?q=20" />
        </div>
        <div>
          <img src="https://rukminim2.flixcart.com/fk-p-flap/1620/270/image/fa6a8ba7d645d8ee.jpg?q=20" />
        </div>

        <div>
          <img src="https://rukminim2.flixcart.com/fk-p-flap/1620/270/image/d8baef8bd2d25575.jpeg?q=80" />
        </div>
      </Carousel>

      {/* <Products/> */}

      <ProductbyCategory category={"Fashion"} />
      <ProductbyCategory category={"Mobile"} />

      <div style={{ height: "20px" }}></div>
    </div>
  );
};

export default Home;
