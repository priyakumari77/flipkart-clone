import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "../css/productbyCategory.css"


const ProductbyCategory = ({category})=>{

    const[products,setProducts] = useState([])
    // const[cat,setCat] = useState([])
    const navigate = useNavigate()

    async function fetchProductbyCategory(){
        try {
            const res = await axios.get(" https://flipkert-backend.onrender.com/user/fetch-all-products",
                {
                  
                    params:{
                        'category' : category

                    }
                }
            )

            console.log(res.data)
            setProducts(res.data.data)
        } catch (error) {
            console.log(error)
        }
    }

     useEffect(()=>{
            fetchProductbyCategory()
        },[])


    return(
        <div className="main-category">

            <div className="category-button">
                <h4>{category}</h4>
                 <button onClick={()=>{navigate("/products",{state:{
                    category : category,
                 }})}}>View All</button>
                 
                
            </div>
 
          <div className="category-products">
            {products.map((item,index)=>{
                if(index > 4){
                    return <div key={index}></div>
                }
                return <div className="category-productsItem" onClick ={()=>navigate(`/product-detail/${item._id}`)} key={item._id}>
                    <img src={ item.colorCategory ? item.colorCategory[0].image : item.image}/>
                    <h4>Name : {item.name}</h4>
                    <h4>Price :₹{item.price}</h4>

                   

                </div>
            })}
          </div>

        </div>
    )

    
}

export default ProductbyCategory