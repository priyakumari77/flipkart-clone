import { FaStar } from "react-icons/fa";
import { PiShoppingCartFill } from "react-icons/pi";
import { AiFillThunderbolt } from "react-icons/ai";
import { BiSolidCoupon } from "react-icons/bi";
import { FaTag } from "react-icons/fa6";
import "../css/productdetails.css";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/slice/cartSlice";

const ProductDetails = () => {



  const location = useLocation()  //data receive
  const product = location.state.product
  const initialVariant = location.state.selectedVariant
  const [color, setColor] = useState(initialVariant.color)
  const [selectedsize, setselectedSize] = useState(initialVariant.size)
  console.log(location.state)
  //  const product = {
  //   id: 1,
  //   name: "Nike Air Max",
  //   brand: "Nike",
  //   description: "Stylish and comfortable running shoes.",
  //   ratings:4,
  //   review:4109,
  //   ratingCount:52859,
  //   highlights:[ "Breathable mesh upper for comfort",
  //    "Visible Air Max cushioning in the heel",
  //    "Durable rubber outsole for traction",
  //    "Padded collar and tongue for added support",
  //    "Lightweight design for all-day wear",
  //    "Iconic Nike Swoosh branding",
  //    "Ideal for casual and athletic use" ],
  //   variants: [
  //     {
  //       color: "Red",
  //       image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //       sizes: [
  //         { size: "6", price: 5000, sellingPrice:4000, stock: 3 },
  //         { size: "7", price: 5000, sellingPrice:3500, stock: 5 },
  //       ]
  //     },
  //     {
  //       color: "Blue",
  //       image: "https://plus.unsplash.com/premium_photo-1663100769321-9eb8fe5a8e6b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bmlrZSUyMHNob2VzJTIwYmx1ZXxlbnwwfHwwfHx8MA%3D%3D",
  //       sizes: [
  //         { size: "6", price: 4800, sellingPrice:4000, stock: 2 },
  //         { size: "7", price: 4800, sellingPrice:4000, stock: 0 },
  //       ]
  //     }
  //   ]
  // };

  const dispatch = useDispatch()

  function getSelectedvarient() {
    console.log(product)
    const variant = product.variants.find((item) => item.color === color)
    console.log(variant)
    return variant

  }

  console.log(selectedsize, 'selectedsize')

  function getSelectedsizeobj() {
    const variant = getSelectedvarient()
    const size = variant.sizes.find((item) => {
      return item.size === selectedsize
    })
    console.log(size)
    console.log(variant)
    return size
  }

  function getDiscountPercent(originalPrice, discountedPrice) {
    if (!originalPrice || originalPrice <= 0) return 0;
    const discount = ((originalPrice - discountedPrice) / originalPrice) * 100;
    return Math.round(discount); // return rounded percentage
  }
  const sizeObj = getSelectedsizeobj()
  const price = sizeObj.price
  const sellingPrice = sizeObj.sellingPrice
  const discountPercent = getDiscountPercent(price, sellingPrice)


  const selectedVariant = getSelectedvarient()

  //
  return (
    <div className="productdetails-main">
      <div className="left-section">

        <div className="product-img">
          <img src={selectedVariant.image}></img>
        </div>

        <div className="button">
          <button className="addtocart-button" onClick={() => {
            dispatch(addToCart({
              product, selectedProduct: {
                color: color,
                size: selectedsize,

              }
            }))
          }}>
            <PiShoppingCartFill className="addtocart-icon" />
            ADD TO CART
          </button>
          <button className="buynow-button">
            <AiFillThunderbolt className="buynow-icon" />
            BUY NOW
          </button>
        </div>
      </div>
      <div className="right-section">
        <h3>
          {product.name}
        </h3>
        <div className="ratings-review">
          <div className="ratings">
            {product.ratings} <FaStar />
          </div>
          <div className="review-count">{product.ratingCount} Ratings & {product.review} Review</div>
        </div>
        <div className="price-row">
          <p>₹{sellingPrice} </p>
          <h5>₹{price}</h5>
          <h6>{discountPercent}% off</h6>
        </div>

        <div className="color-box">
          <h4>Color</h4>
          <div className="color-list">
            {product.variants.map((item) => {
              // const selectedVariant = getSelectedvarient() 
              return <div id={item.color} className={`color-item ${selectedVariant.color === item.color ? "selectedColor" : " "}`} onClick={() => { setColor(item.color) }}> <img src={item.image} /></div>

            })}

          </div>
        </div>
        <div className="prod-size">
          <h4>Size</h4>
          <div className="product-size">
            {selectedVariant.sizes.map((item) => {
              return <div className={`p-size  ${sizeObj.size === item.size ? "selectedColor" : " "}`} onClick={() => { setselectedSize(item.size) }}>{item.size}</div>
            })}
          </div>
        </div>



        <div className="offers">
          <h3>Coupons for you</h3>
          <p>
            <BiSolidCoupon className="coupon-icon" />
            <strong>Special Price</strong>Get extra ₹15 off on 20 item(s) (price
            inclusive of cashback/coupon) <span>T&C</span>
          </p>
          <h3>Available Offers</h3>
          <p>
            <FaTag className="coupon-icon" />
            <strong>Special Price </strong> Get extra 27% off (price inclusive
            of cashback/coupon) <span>T&C</span>
          </p>
          <p>
            <FaTag className="coupon-icon" />
            <strong>Bank Offer</strong> 5% Unlimited Cashback on Flipkart Axis
            Bank Credit Card <span>T&C</span>
          </p>
          <p>
            <FaTag className="coupon-icon" />
            <strong>Bank Offer </strong> 10% off on Axis Credit Card
            Transactions, up to ₹750 on orders of ₹1000 and above{" "}
            <span>T&C</span>
          </p>
          <p>
            <FaTag className="coupon-icon" />
            <strong>Bank Offer</strong> 10% off on Kotak Credit Card
            Transactions, up to ₹750 on orders of ₹1000 and above{" "}
            <span>T&C</span>
          </p>
        </div>

        <div className="hightlight-section">
          <h4>Highlights</h4>
          <div className="list-section">
            {product.highlights.map((item) => {
              return <li>{item}</li>
            })}
          </div>

        </div>
        <div className="Important-notes">
          <h4>Important Notes</h4>
          <p>
            For multicolor products, please check the image for colour details
            before purchasing.
          </p>
        </div>

        <div className="description-style">
          <h4>Description</h4>
          <p>
            {product.description}
          </p>
        </div>

      </div>
    </div>
  );
};

export default ProductDetails;
