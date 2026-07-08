import { FaStar } from "react-icons/fa";
import { PiShoppingCartFill } from "react-icons/pi";
import { AiFillThunderbolt } from "react-icons/ai";
import { BiSolidCoupon } from "react-icons/bi";
import { FaTag } from "react-icons/fa6";
import "../css/productdetails.css";
import { use, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { addToCart } from "../redux/slice/cartSlice";
import { useParams } from "react-router-dom";
import axios from "axios";
import { message } from "antd";
import { Spin } from "antd";

const ProductDetails = () => {
  const [product, setProduct] = useState(null)
  const [color, setColor] = useState(null)
  const [size, setselectedSize] = useState(null)
  const [loading, setLoading] = useState(false)

  const [messageApi, contextHolder] = message.useMessage()
  const navigate = useNavigate()

  const { id } = useParams()

  async function fetchProductDetail() {
    try {
      setLoading(true)
      const res = await axios.get("https://flipkart-backend-0rv2.onrender.com//user/fetch-single-product", {
        params: { "productId": id, }
      })
      console.log(res.data)
      setProduct(res.data.data)

      if (res.data.data.colorCategory) {
        setColor(res.data.data.colorCategory[0].color)
      }
      if (res.data.data.sizeCategory) {
        setselectedSize(res.data.data.sizeCategory[0].size)
      }

      setLoading(false)

    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProductDetail()
  }, [])


  async function addtocart() {
    try {
      setLoading(true)
      const token = localStorage.getItem("token")
      if (token) {
        const res = await axios.post("https://flipkart-backend-0rv2.onrender.com//user/add-to-cart", {
          productId: product._id,
          color: color,
          size: size,
        }, {
          headers: { authorization: token }
        })
        console.log(res.data)
        messageApi.success("Item added to cart")
        setTimeout(() => { navigate("/cart") }, 1000)

      }
      else {
        messageApi.error("You have to login first!")
        setTimeout(() => { navigate("/login") }, 1000)
      }

      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }


  async function buySingleProduct() {
    try {
      setLoading(true)
      const token = localStorage.getItem("token")
      if (token) {
        const res = await axios.post("https://flipkart-backend-0rv2.onrender.com//user/place-single-order", {
          productId: product._id,
          color: color,
          size: size,
        }, {
          headers: { authorization: token }
        })
        console.log(res.data)
        messageApi.success("Order Placed")
        setTimeout(() => { navigate("/orders") }, 1000)
      }
      else {
        messageApi.error("You have to login first!")
        setTimeout(() => { navigate("/login") }, 1000)
      }

      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }


  //payment
  async function processingPayment() {
    const token = localStorage.getItem("token")
    setLoading(true)
    const { data } = await axios.post(

      "https://flipkart-backend-0rv2.onrender.com//user/create-payment-order",
      {
        amount: Number(product.price),
        currency: "INR",
        receipt: "receipt#1",
        notes: {},
      },
      {
        headers: {
          authorization: token,
        }
      }
    );

    setLoading(false)

    console.log(data)

    const options = {
      key: "rzp_test_B9RwKdpPVSHcZx",
      amount: data.data.amount,
      currency: data.data.currency,
      name: "flipkart",
      description: "abcd",
      order_id: data.data.id,
      handler: async (response) => {
        let verifyResponse = await axios.post(
          "https://flipkart-backend-0rv2.onrender.com//user/verify-payment",
          {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          },
          {
            headers: {
              authorization: token,
            }
          }
        );
        // Payload.paymentId = response.razorpay_payment_id;
        if (verifyResponse.data.success) {
          await buySingleProduct();
          // console.log("Order Response", response);
          // setOrder(JSON.stringify(response.data.data));
          navigate("/orders");
          messageApi.success("Order Placed successfully!", {
            // position: "top-center",
            // timeout: 3000,
          });
        } else {
          // router.push("/paymentFailed");

          messageApi.error("Failed to place the order. Please try again.", {
            position: "top-center",
            timeout: 3000,
          });
        }
      },
      prefill: {
        name: "Keya Tarafdar",
        email: "keya@gmail.com",
        contact: "9999999999",
      },
      theme: {
        color: "#F37254",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  }




  //  const location = useLocation()  //data receive
  //  const product = location.state.product 
  //  const initialVariant = location.state.selectedVariant
  //  const[color,setColor] = useState(initialVariant.color)
  //  const[selectedsize,setselectedSize] = useState(initialVariant.size)
  //  console.log(location.state)
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

  // const dispatch=useDispatch()

  // function getSelectedvarient(){
  //     const variant = product.variants.find((item)=>item.color===color)
  //     console.log(variant)
  //     return variant

  // }

  // console.log(selectedsize,'selectedsize')

  // function getSelectedsizeobj(){
  //      const variant = getSelectedvarient()
  //     const size = variant.sizes.find((item)=>{
  //         return item.size===selectedsize
  //      })
  //      console.log(size)
  //      console.log(variant)
  //      return size
  // }

  // function getDiscountPercent(originalPrice, discountedPrice) {
  //   if (!originalPrice || originalPrice <= 0) return 0;
  //   const discount = ((originalPrice - discountedPrice) / originalPrice) * 100;
  //   return Math.round(discount); // return rounded percentage
  // }
  // const sizeObj = getSelectedsizeobj()
  // const price = sizeObj.price
  // const sellingPrice = sizeObj.sellingPrice
  // const discountPercent = getDiscountPercent(price,sellingPrice)
  // const selectedVariant = getSelectedvarient()

  const imgurl = product && product.colorCategory && product.colorCategory.find((colorObj) => color === colorObj.color)

  return (
    <div className="productdetails-main">
      <div className="left-section">

        <div className="product-img" style={{ paddingLeft: "5px" }}>
          <img src={(imgurl && imgurl.image) ?? (product && product.image)}></img>

        </div>

        <div className="button" style={{ paddingLeft: "5px" }}>

          {contextHolder}
          <button onClick={() => { addtocart() }} className="addtocart-button" >
            <PiShoppingCartFill className="addtocart-icon" />
            ADD TO CART
          </button>
          <button onClick={() => { processingPayment() }} className="buynow-button">
            <AiFillThunderbolt className="buynow-icon" />
            BUY NOW
          </button>
        </div>
      </div>
      <div className="right-section">
        <h3>
          {product?.name}
        </h3>
        {/* <div className="ratings-review">
          <div className="ratings">
            {product.ratings} <FaStar />
          </div>
          <div className="review-count">{product.ratingCount} Ratings & {product.review} Review</div>
        </div> */}
        <div className="price-row">
          <p>₹{product && product.price} </p>
          {/* <h5>₹{price}</h5>
          <h6>{discountPercent}% off</h6> */}
        </div>

        {product && product.colorCategory && <div className="color-box">
          <h4>Color</h4>
          <div className="color-list">
            {product && product.colorCategory && product.colorCategory.map((item, index) => {

              return <div key={index} className={`color-item ${color === item.color && "selectedColor"}`} onClick={() => { setColor(item.color) }}> <img src={item.image} /></div>

            })}

          </div>
        </div>}

        {product && product.sizeCategory && <div className="prod-size">
          <h4>Size</h4>
          <div className="product-size">
            {product && product.sizeCategory && product.sizeCategory.map((item, index) => {
              return <div key={index} className={`p-size ${size === item.size && "selectedColor"}`} onClick={() => { setselectedSize(item.size) }}>{item.size}</div>
            })}
          </div>
        </div>}


        <div className="hightlight-section">
          <h4>Highlights</h4>
          <div className="list-section">
            <div
              className="product-highlights"
              dangerouslySetInnerHTML={{ __html: product && product.highlights }}
            ></div>

          </div>
        </div>

        <div className="description-style">
          <h4>Description</h4>
          <p>
            {product && product.description}
          </p>
        </div>

        <div className="Important-notes">
          <h4>Important Notes</h4>
          <p>
            For multicolor products, please check the image for colour details
            before purchasing.
          </p>
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


        <Spin size='large' fullscreen spinning={loading} />

      </div>
    </div>
  );


};


export default ProductDetails;
