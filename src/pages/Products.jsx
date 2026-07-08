import { useNavigate } from "react-router-dom";
import "../css/products.css";

import { addToCart } from "../redux/slice/cartSlice";
import { useDispatch } from "react-redux";

const Products = () => {
  //     const productList = [{
  //         id:1,
  //         name:"True Elements Goan Cashews, Premium Dryfruits Kaju ",
  //         price:846,
  //         ratings:4.2,
  //         description: '',
  //         highlights:[ "Breathable mesh upper for comfort",
  //       "Visible Air Max cushioning in the heel",
  //        "Durable rubber outsole for traction",
  //        "Padded collar and tongue for added support",
  //       "Lightweight design for all-day wear",
  //       "Iconic Nike Swoosh branding",
  //        "Ideal for casual and athletic use" ],

  //         variants: [
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
  //   ],

  //         imgurl:"https://rukminim2.flixcart.com/image/612/612/xif0q/nut-dry-fruit/a/k/z/1000-goan-cashews-premium-dryfruits-kaju-1-pouch-true-elements-original-imahbt64awgf4yfn.jpeg?q=70"
  //     },

  //     {
  //         id:2,
  //           name:"OPEN SECRET Premium Raw Chia Seeds",
  //         price:442,
  //         ratings:4.2,
  //         imgurl:"https://rukminim2.flixcart.com/image/612/612/xif0q/edible-seed/l/f/z/500-chia-seeds-2-raw-pouch-open-secret-whole-original-imah8nzjvnssydkg.jpeg?q=70"
  //     },
  //     {
  //         id:3,
  //         name:"DAILYHERBS Premium Mewa Mix ",
  //         price:165,
  //         ratings:4.2,
  //         imgurl:"https://rukminim2.flixcart.com/image/612/612/xif0q/nut-dry-fruit/h/h/r/250-premium-mewa-mix-1-plastic-bottle-dailyherbs-original-imahahzfbmhtedbj.jpeg?q=70"
  //     },
  //     {
  //         id:4,
  //         name:"DAILYHERBS Premium Mewa Mix | Almonds, Cashews, Raisins.. ",
  //         price:414,
  //         ratings:4.2,
  //         imgurl:"https://rukminim2.flixcart.com/image/612/612/xif0q/nut-dry-fruit/j/a/x/1-premium-mewa-mix-1-plastic-bottle-dailyherbs-original-imahb4hfzpbhftjz.jpeg?q=70"
  //     },{
  //         id:5,
  //         name:"Nature Aahar Mix Dry Fruit | Panchmeva | 250GM | JAR | ",
  //         price:180,
  //         ratings:4.2,
  //         imgurl:"https://rukminim2.flixcart.com/image/612/612/xif0q/nut-dry-fruit/g/q/z/250-mix-dry-fruit-panchmeva-250gm-jar-1-mason-jar-nature-aahar-original-imah8hb3k5syspyq.jpeg?q=70"
  //     },{
  //         id:6,
  //         name:"Nuvotone Flaxseed [Edible Grade] Brown Flax Seeds  (250 g)",
  //         price:200,
  //         ratings:4.2,
  //         imgurl:"https://rukminim2.flixcart.com/image/612/612/xif0q/edible-seed/1/u/n/250-flaxseed-edible-grade-1-raw-pouch-nuvotone-whole-original-imahcggrh8wgz38h.jpeg?q=70"
  //     },
  //     {
  //         id:7,
  //         name:"OPEN SECRET Premium Raw Pumpkin Seeds ",
  //         price:846,
  //         ratings:4.2,
  //         imgurl:"https://rukminim2.flixcart.com/image/612/612/xif0q/edible-seed/l/t/m/500-pumpkin-seeds-2-raw-pouch-open-secret-whole-original-imah8nznb7krbst9.jpeg?q=70"
  //     },
  //     {
  //         id:8,
  //         name:"Get Fresh Premium California Almonds Dry Fruits",
  //         price:400,
  //         ratings:4.3,
  //         imgurl:"https://rukminim2.flixcart.com/image/612/612/xif0q/nut-dry-fruit/e/t/g/500-premium-quality-dry-fruits-combo-of-almonds-cashew-250gm-2-original-imah5m49djwkhbkn.jpeg?q=70",
  //     }
  // ]
  const productList = [
    {
      id: 1,
      name: "Nike Air Max",
      brand: "Nike",
      description: "Stylish and comfortable running shoes.",
      ratings: 4,
      review: 4109,
      ratingCount: 52859,
      defaultVariant: "Red",
      price: 4000,
      highlights: [
        "Breathable mesh upper for comfort",
        "Visible Air Max cushioning in the heel",
        "Durable rubber outsole for traction",
        "Padded collar and tongue for added support",
        "Lightweight design for all-day wear",
        "Iconic Nike Swoosh branding",
        "Ideal for casual and athletic use",
      ],
      imgurl:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      variants: [
        {
          color: "Red",
          image:
            "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          sizes: [
            { size: "6", price: 5000, sellingPrice: 4000, stock: 3 },
            { size: "7", price: 5000, sellingPrice: 3500, stock: 5 },
          ],
        },
        {
          color: "Blue",
          image:
            "https://plus.unsplash.com/premium_photo-1663100769321-9eb8fe5a8e6b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bmlrZSUyMHNob2VzJTIwYmx1ZXxlbnwwfHwwfHx8MA%3D%3D",
          sizes: [
            { size: "6", price: 4800, sellingPrice: 4000, stock: 2 },
            { size: "7", price: 4800, sellingPrice: 4000, stock: 0 },
          ],
        },
      ],
    },

    {
      id: 2,
      name: "Sports Shoes",
      brand: "Nike",
      description: "Stylish and comfortable running shoes.",
      ratings: 4,
      review: 4109,
      ratingCount: 52859,
      price: 5000,
      imgurl:
        "https://plus.unsplash.com/premium_photo-1663100769321-9eb8fe5a8e6b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bmlrZSUyMHNob2VzJTIwYmx1ZXxlbnwwfHwwfHx8MA%3D%3D",
      highlights: [
        "Breathable mesh upper for comfort",
        "Visible Air Max cushioning in the heel",
        "Durable rubber outsole for traction",
        "Padded collar and tongue for added support",
        "Lightweight design for all-day wear",
        "Iconic Nike Swoosh branding",
        "Ideal for casual and athletic use",
      ],
      variants: [
        {
          color: "Red",
          image:
            "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          sizes: [
            { size: "6", price: 5000, sellingPrice: 4000, stock: 3 },
            { size: "7", price: 5000, sellingPrice: 3500, stock: 5 },
          ],
        },
        {
          color: "Blue",
          image:
            "https://plus.unsplash.com/premium_photo-1663100769321-9eb8fe5a8e6b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bmlrZSUyMHNob2VzJTIwYmx1ZXxlbnwwfHwwfHx8MA%3D%3D",
          sizes: [
            { size: "6", price: 4800, sellingPrice: 4000, stock: 2 },
            { size: "7", price: 4800, sellingPrice: 4000, stock: 0 },
          ],
        },
      ],
    },

    {
      id: 3,
      name: "Sports shoes",
      brand: "Nike",
      description: "Stylish and comfortable running shoes.",
      ratings: 4,
      review: 4109,
      ratingCount: 52859,
      price: 5000,
      imgurl:
        "https://cdn.pixabay.com/photo/2022/07/22/13/26/shoes-7338170_1280.jpg",
      highlights: [
        "Breathable mesh upper for comfort",
        "Visible Air Max cushioning in the heel",
        "Durable rubber outsole for traction",
        "Padded collar and tongue for added support",
        "Lightweight design for all-day wear",
        "Iconic Nike Swoosh branding",
        "Ideal for casual and athletic use",
      ],
      variants: [
        {
          color: "Red",
          image:
            "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          sizes: [
            { size: "6", price: 5000, sellingPrice: 4000, stock: 3 },
            { size: "7", price: 5000, sellingPrice: 3500, stock: 5 },
          ],
        },
        {
          color: "Blue",
          image:
            "https://plus.unsplash.com/premium_photo-1663100769321-9eb8fe5a8e6b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bmlrZSUyMHNob2VzJTIwYmx1ZXxlbnwwfHwwfHx8MA%3D%3D",
          sizes: [
            { size: "6", price: 4800, sellingPrice: 4000, stock: 2 },
            { size: "7", price: 4800, sellingPrice: 4000, stock: 0 },
          ],
        },
      ],
    },

    {
      id: 4,
      name: "Formal Shoes",
      brand: "Nike",
      description: "stylish and comfortable running shoes",
      review: 6000,
      ratings: 4.5,
      price: 8000,
      imgurl:
        "https://cdn.pixabay.com/photo/2022/10/08/17/04/shoes-7507418_1280.jpg",
      highlights: [
        "Lightweight and breathable materials (mesh, Flyknit)",
        "Excellent grip with durable rubber outsole",
        "Responsive and energy-returning midsole",
        "Durable and long-lasting build quality",
        "Stylish and trendy designs with iconic Nike branding",
      ],
      variants: [
        {
          color: "Brown",
          image:
            "https://images.unsplash.com/photo-1673201183138-e68d0b47dbe5?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          sizes: [
            { size: 6, price: 9000, sellingPrice: 8000, stock: 2 },
            { size: 7, price: 9100, sellingPrice: 8500, stock: 3 },
            { size: 8, price: 10000, sellingPrice: 9500, stock: 1 },
          ],
        },
        {
          color: "Black",
          image:
            "https://media.istockphoto.com/id/671028562/photo/black-leather-football-shoes-or-soccer-boots-isolated-on-white-background.jpg?s=1024x1024&w=is&k=20&c=P7f4QkJqnoW88SiARYz8UR0U6eFrrUEknIjnK8637PE=",
          sizes: [
            { size: 6, price: 4000, sellingPrice: 3000, stock: 1 },
            { size: 7, price: 5000, sellingPrice: 4000, stock: 3 },
          ],
        },
      ],
    },
    {
      id: 5,
      name: "Men Solid Polo Neck Pure Cotton Grey T-Shirt",
      brand: "WROGN",
      review: 30000,
      ratings: 4.5,
      price: 479,
      imgurl:
        "https://rukminim2.flixcart.com/image/832/832/xif0q/t-shirt/l/q/a/-original-imah43gg49rvuwhu.jpeg?q=70&crop=false",
      description: "Polo Neck T-Shirt",
      highlights: [
        "Type: Polo Neck T-Shirt",
        "Fit: Regular fit for everyday comfort",
        "Color: Solid grey for a classic, versatile look",
        "Material: Cotton blend – soft, breathable & lightweight",
        "Sleeves: Half sleeves with ribbed cuffs",
        "Collar: Polo collar with button placket",
      ],
      variants: [
        {
          color: "Black",
          image:
            "https://rukminim2.flixcart.com/image/832/832/xif0q/t-shirt/x/t/j/m-wsts025af-wrogn-original-imahfpmbmqyhfzbn.jpeg?q=70&crop=false",
          sizes: [
            { size: "S", price: 500, sellingPrice: 400, stock: 3 },
            { size: "M", price: 500, sellingPrice: 400, stock: 2 },
            { size: "L", price: 600, sellingPrice: 500, stock: 6 },
            { size: "XL", price: 500, sellingPrice: 500, stock: 2 },
            { size: "XXL", price: 500, sellingPrice: 500, stock: 3 },
          ],
        },
        {
          color: "Green",
          image:
            "https://rukminim2.flixcart.com/image/832/832/xif0q/t-shirt/m/q/m/m-wsts025bf-wrogn-original-imah259dgu8xxjvh.jpeg?q=70&crop=false",
          sizes: [
            { size: "S", price: 500, sellingPrice: 400, stock: 3 },
            { size: "M", price: 500, sellingPrice: 400, stock: 2 },
            { size: "L", price: 600, sellingPrice: 500, stock: 6 },
            { size: "XL", price: 500, sellingPrice: 500, stock: 2 },
            { size: "XXL", price: 500, sellingPrice: 500, stock: 3 },
          ],
        },
        {
          color: "Grey",
          image:
            "https://rukminim2.flixcart.com/image/832/832/xif0q/t-shirt/l/q/a/-original-imah43gg49rvuwhu.jpeg?q=70&crop=false",
          sizes: [
            { size: "S", price: 500, sellingPrice: 400, stock: 3 },
            { size: "M", price: 500, sellingPrice: 400, stock: 2 },
            { size: "L", price: 600, sellingPrice: 500, stock: 6 },
          ],
        },
      ],
    },

    {
      id: 6,
      name: "Men Solid Polo Neck Pure Cotton Beige T-Shirt",
      brand: "U.S. POLO ASSN. ",
      review: 1572,
      ratings: 4.6,
      description:
        "A classic White polo-neck tee crafted from a soft, breathable cotton-blend fabric.",
      price: 800,
      imgurl:
        "https://rukminim2.flixcart.com/image/832/832/xif0q/t-shirt/l/z/m/-original-imahfxv6zdgaspgf.jpeg?q=70&crop=false",
      highlights: [
        "Offers a clean, slightly elevated look compared to standard T-shirts",
        "Ensures structured sleeves and a tailored appearance",
        "Designed for low-maintenance use",
      ],
      variants: [
        {
          color: "Maroon",
          image:
            "https://rukminim2.flixcart.com/image/832/832/xif0q/t-shirt/f/y/p/m-ustshs1621-u-s-polo-assn-original-imagsvf85kkxfgmc.jpeg?q=70&crop=false",

          sizes: [
            { size: "S", price: 500, sellingPrice: 400, stock: 0 },
            { size: "M", price: 500, sellingPrice: 400, stock: 2 },
            { size: "L", price: 600, sellingPrice: 500, stock: 4 },
          ],
        },
        {
          color: "Orange",
          image:
            "https://rukminim2.flixcart.com/image/832/832/xif0q/t-shirt/v/s/m/m-ustshs2269-u-s-polo-assn-original-imah4rhg3fgw2fhk.jpeg?q=70&crop=false",
          sizes: [
            { size: "S", price: 500, sellingPrice: 400, stock: 3 },
            { size: "M", price: 550, sellingPrice: 400, stock: 2 },
            { size: "L", price: 700, sellingPrice: 500, stock: 0 },
          ],
        },
      ],
    },
    {
      id: 7,
      name: "Men Solid Polo Neck Cotton Blend Black T-Shirt",
      brand: "Allen Solly",
      review: 23750,
      ratings: 4.6,
      price: 846,
      imgurl:
        "https://rukminim2.flixcart.com/image/832/832/l4vnbm80/t-shirt/i/j/q/m-askporgfj72665-new-allen-solly-original-imagfzk8vjxgurcj.jpeg?q=70&crop=false",
      description:
        "This Men's Solid Polo Neck Black T-Shirt is crafted from a premium cotton-blend fabric, offering comfort, breathability, and durability. The classic polo collar with a button placket gives it a smart and timeless appeal. Designed in solid black, it pairs well with jeans, chinos, or even under a jacket for a polished look.",
      highlights: [
        "Solid black – versatile and timeless",
        "Half sleeves with ribbed edges",
        " Polo collar with button closure",
        "Ideal for office, outings, travel, or everyday wear",
        " Minimalist look with smart tailoring",
      ],
      variants: [
        {
          color: "Purple",
          image:
            "https://rukminim2.flixcart.com/image/832/832/xif0q/t-shirt/5/m/k/-original-imagzjxraj8hmzte.jpeg?q=70&crop=false",
          sizes: [
            { size: "S", price: 1000, sellingPrice: 600, stock: 0 },
            { size: "M", price: 1000, sellingPrice: 600, stock: 0 },
            { size: "L", price: 1000, sellingPrice: 600, stock: 4 },
          ],
        },
        {
          color: "Yellow",
          image:
            "https://rukminim2.flixcart.com/image/832/832/xif0q/t-shirt/p/p/o/-original-imagzjxrhdz8jyhb.jpeg?q=70&crop=false",
          sizes: [
            { size: "S", price: 1000, sellingPrice: 600, stock: 0 },
            { size: "M", price: 1000, sellingPrice: 600, stock: 0 },
            { size: "L", price: 1000, sellingPrice: 600, stock: 4 },
          ],
        },
        {
          color: "Red",
          image:
            "https://rukminim2.flixcart.com/image/832/832/xif0q/t-shirt/z/f/q/-original-imahyg9zskfnnkdy.jpeg?q=70&crop=false",
          sizes: [
            { size: "S", price: 1000, sellingPrice: 600, stock: 4 },
            { size: "M", price: 1000, sellingPrice: 600, stock: 2 },
            { size: "L", price: 1000, sellingPrice: 600, stock: 0 },
          ],
        },
      ],
    },

    {
      id: 8,
      name: "Men Solid Polo Neck Pure Cotton Grey T-Shirt",
      brand: "PUMA",
      price: 900,
      review: 17613,
      ratings: 4.1,
      imgurl:
        "https://rukminim2.flixcart.com/image/832/832/xif0q/t-shirt/u/h/8/xs-68709308-puma-original-imahcm88kvncytnu.jpeg?q=70&crop=false",
      description:
        "This PUMA Solid Polo Neck Grey T-Shirt is a perfect blend of style, comfort, and performance. Made from 100% pure cotton, it offers a soft feel and breathable comfort all day long. The polo neck with a button placket adds a touch of sophistication, while the solid grey color and signature PUMA branding ensure a clean, sporty look suitable for any casual or smart-casual occasion.",
      highlights: [
        " PUMA – Trusted global sportswear brand",
        " 100% Pure Cotton – Soft, breathable, and skin-friendly",
        " Solid grey – Subtle, stylish, and versatile",
        " Polo collar with 2–3 button placket",
        "Half sleeves with ribbed edges for better shape",
      ],

      variants: [
        {
          color: "Green",
          image:
            "https://rukminim2.flixcart.com/image/832/832/xif0q/t-shirt/r/n/w/xl-68709343-puma-original-imahcz7rz5y2aewf.jpeg?q=70&crop=false",

          sizes: [
            { size: "XS", price: 1000, sellingPrice: 600, stock: 4 },
            { size: "S", price: 1000, sellingPrice: 600, stock: 4 },
            { size: "M", price: 1000, sellingPrice: 600, stock: 2 },
            { size: "L", price: 1000, sellingPrice: 600, stock: 1 },
          ],
        },

        {
          color: "Silver Sky",
          image:
            "https://rukminim2.flixcart.com/image/832/832/xif0q/t-shirt/e/8/t/xxl-68709368-puma-original-imahcz8dkzzsmkxh.jpeg?q=70&crop=false",
          sizes: [
            { size: "XS", price: 1000, sellingPrice: 600, stock: 4 },
            { size: "S", price: 1000, sellingPrice: 600, stock: 4 },
            { size: "M", price: 1000, sellingPrice: 600, stock: 2 },
            { size: "L", price: 1000, sellingPrice: 600, stock: 1 },
          ],
        },
      ],
    },
  ];
  const navigate = useNavigate();

  const dispatch = useDispatch();
  return (
    <div>
      <div className="product-itemlist">
        {productList.map((item) => {
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
                  dispatch(addToCart({
                    product: item,
                    selectedProduct: {
                      color: item.variants[0].color,
                      size: item.variants[0].sizes[0].size,
                    }
                  }));
                }}
              >
                Add to cart
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Products;
