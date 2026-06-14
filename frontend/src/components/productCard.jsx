import { Link } from "react-router-dom"
import getFormattedPrice from "../utils/price-format"

export default function ProductCard(props){

    const product = props.product  
    
    return(
        <Link to={"/overview/"+product.productId} state={product} className="w-[300px] h-[450px] m-10 bg-white rounded-lg shadow-2xl overflow-hidden flex flex-col hover:[&_.primary-image]:opacity-0  justify-between cursor-pointer">
            <div className="w-[300px] h-[300px]  relative">
                <img src={product.images[1]} alt={product.productName} className="w-full bg-white h-full object-cover absolute top-0  left-0"/>
                <img src={product.images[0]} alt={product.productName} className="w-full bg-white h-full object-cover absolute top-0 left-0 primary-image transition-opacity duration-500"/>
            </div>
            <h1 className="text-lg font-semibold mt-4 px-4">{product.name}</h1>
            <div className="w-full flex flex-col py-4">
                {
                    product.labelledPrice > product.price && <span className="text-sm text-gray-500 mt-2 px-4 line-through">{getFormattedPrice(product.labelledPrice)}</span>
                }
                <span className="text-lg font-bold mt-1 px-4">{getFormattedPrice( product.price)}</span>
            </div>
            
        </Link>
    )
}