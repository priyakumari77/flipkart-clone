import { useLocation, useNavigate } from "react-router-dom";
import "../css/products.css";

// import { addToCart } from "../redux/slice/cartSlice";
import { useDispatch } from "react-redux";
import { message, Spin } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import { IoIosHeartEmpty } from "react-icons/io";
import { FaHeart } from "react-icons/fa";

const Products = () => {
  //view more
  const [expandedTitles, setExpandedTitles] = useState({});
  const toggleTitle = (id) => {
    setExpandedTitles((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const [loading, setLoading] = useState(false);
  const [addToCartLoading, setaddToCartLoading] = useState(false);
  const [wishlist, setWishlist] = useState([]);

  const location = useLocation(); //getting category name for filter
  const filterCategory = location.state && location.state.category;
  console.log(filterCategory);



  const [messageApi, contextHolder] = message.useMessage();
  const [products, setProduct] = useState([]);


  //add to cart function

  async function addProductToCart(item) {
    try {
      setaddToCartLoading(true);
      const token = localStorage.getItem("token");
      if (token === null) {
        messageApi.info("please login first to add any product to cart");
        setaddToCartLoading(false);
        return;
      }
      const res = await axios.post(
        "https://flipkart-backend-0rv2.onrender.com//user/add-to-cart",
        {
          productId: item._id,
          color: item.colorCategory && item.colorCategory[0].color,
          size: item.sizeCategory && item.sizeCategory[0].size,
        },
        {
          headers: {
            authorization: token,
          },
        }
      );

      setaddToCartLoading(false);
      messageApi.success("Product added");
      console.log(res.data);
    } catch (error) {
      messageApi.error("Fail to add product");
      console.log(error);
      setaddToCartLoading(false);
    }
  }

  async function fetchProduct() {
    try {
      setLoading(true);
      const res = await axios.get(
        "https://flipkart-backend-0rv2.onrender.com//user/fetch-all-products",
        {
          params: {
            category: filterCategory,
          },
        }
      );
      console.log(res.data);
      setProduct(res.data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProduct();
  }, []);

  const navigate = useNavigate();

  //calling this for getting wishlist product
  async function fetchUser() {
    try {
      const token = localStorage.getItem("token")
      const res = await axios.get("https://flipkart-backend-0rv2.onrender.com//user/fetch-user", {
        headers: { authorization: token }
      })
      console.log(res.data)
      setWishlist(res.data.data.wishlist)

    } catch (error) {
      console.log(error)

    }
  }
  console.log(wishlist)
  useEffect(() => {
    fetchUser()
  }, [])


  //wishlist 
  async function addWishlist(item) {

    try {
      const token = localStorage.getItem("token")
      const res = await axios.post("https://flipkart-backend-0rv2.onrender.com//user/add-to-wishlist", {

        "productId": item._id,
        color: item.colorCategory && item.colorCategory[0].color,
        size: item.sizeCategory && item.sizeCategory[0].size,
      },
        {
          headers: {
            authorization: token,
          }
        })
      console.log(res.data)
      setWishlist(res.data.data)
      messageApi.success("Item added to wishlist")
      console.log(wishlist)

    } catch (error) {
      console.log(error)
    }
  }

  // for highliting already added products
  function existingWishlist(productId) {
    const result = wishlist.find((item) => item._id === productId)

    return result != null
  }




  async function removeFromWishlist(item) {
    try {

      const token = localStorage.getItem('token')
      const res = await axios.post("https://flipkart-backend-0rv2.onrender.com//user/remove-from-wishlist",
        {
          "productId": item._id,
          color: item.colorCategory && item.colorCategory[0].color,
          size: item.sizeCategory && item.sizeCategory[0].size,

        },
        {
          headers: {
            authorization: token,
          }
        })

      console.log(res.data)
      fetchUser()
      messageApi.success("Item removed")


    } catch (error) {
      console.log(error)
    }
  }



  return (
    <div>
      {contextHolder}
      <div className="product-itemlist">
        {/* {productList.map((item) => {
          return (
            <div className="product-item" key={item.id}>
              <img
                onClick={() =>
                  navigate("/product-detail", {
                    state: {
                      product: item,
                      selectedVariant: {
                        color: item.variants[0].color,
                        size: item.variants[0].sizes[0].size,
                      },
                    },
                  })
                }
                src={item.imgurl}
                alt=""
              />
              <h3
                onClick={() =>
                  navigate("/product-detail", {
                    state: {
                      product: item,
                      selectedVariant: {
                        color: item.variants[0].color,
                        size: item.variants[0].sizes[0].size,
                      },
                    },
                  })
                }
              >
                {item.name}
              </h3>
              <h4> ₹{item.price}</h4>
              <button
                onClick={() => { 
                  messageApi.success("item added")
                  dispatch(addToCart({product:item,selectedProduct : {
                    color: item.variants[0].color,
                   size: item.variants[0].sizes[0].size,
                  }}));
                }}
              >
                Add to cart
              </button>
            </div>
          ); */}
        {/* })} */}



        {products.map((item) => {
          const imgurl = item.colorCategory && item.colorCategory[0].image;
          const isExpanded = expandedTitles[item._id] || false;

          existingWishlist(item._id)

          return (
            <div className="product-item" key={item._id}>
              <img
                onClick={() => {
                  navigate(`/product-detail/${item._id}`);
                }}
                src={imgurl ?? item.image}
                alt={item.name}
              />
              {existingWishlist(item._id) ? <FaHeart onClick={() => { removeFromWishlist(item) }} className="wishlist-icon" color="red" /> :
                <IoIosHeartEmpty onClick={() => { addWishlist(item) }} className="wishlist-icon" />}

              {/* <h3>{item.name}</h3> */}
              <p className="product-name">
                {isExpanded
                  ? item?.name
                  : item?.name?.slice(0, 50) +
                  (item?.name?.length > 50 ? "..." : "")}
                {item?.name?.length > 50 && (
                  <span
                    onClick={() => toggleTitle(item._id)}
                    className="text-blue"

                  >
                    {isExpanded ? "Show less" : "Show more"}

                  </span>
                )}

              </p>
              {/* {item?.name?.length > 50 && (
              <span
                onClick={() => toggleTitle(item._id)}
                className="text-blue-500 cursor-context-menu"
              
              >
                {isExpanded ? "Show less" : "Show more"}
                
              </span>
            )} */}

              <h4> ₹{item.price}</h4>
              <button
                onClick={() => {
                  // addProductToCart(item)

                  if (item.sizeCategory || item.colorCategory) {
                    alert("first you have to select size");
                    navigate(`/product-detail/${item._id}`);
                  } else {
                    addProductToCart(item)
                  }
                }}
              >
                Add to cart
              </button>

              {/* {cart.some((cartItem)=>{cartItem.product._id===item._id})? <button>GO TO CART</button>:<button onClick={()=>{
            addProductToCart(item)
          }}>Add to cart</button>}
       */}
            </div>
          );
        })}

        {!loading && products.length === 0 && (
          <h3 style={{ textAlign: "center", width: "100%" }}>
            Product not found
          </h3>
        )}
        {loading && (
          <h3 style={{ textAlign: "center", width: "100%" }}>
            <Spin size="large" spinning />
          </h3>
        )}

        <Spin size="large" fullscreen spinning={addToCartLoading} />
      </div>
    </div>
  );
};

export default Products;
