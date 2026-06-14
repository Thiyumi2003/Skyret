import { useState } from "react";
import { FaEye } from "react-icons/fa6";
import { TbTrash } from "react-icons/tb";
import getFormattedPrice from "../utils/price-format";
import { FaPhoneAlt } from "react-icons/fa";
import { MdHome } from "react-icons/md";

export default function CustomerOrderDetailsModal(props){

    const [isModalOpen , setIsModalOpen] = useState(false)

    const order = props.order


    return(
        <>
            <FaEye className="text-2xl text-blue-500 cursor-pointer hover:text-blue-700"
                onClick={
                    ()=>{
                        setIsModalOpen(true)
                    }
                }
            />
            {
                isModalOpen&&
                <div className="w-screen h-screen fixed bg-black/30 top-0 left-0 flex justify-center items-center text-secondary z-99">
                    <div className="w-[800px]  bg-white flex flex-col justify-center items-center rounded-lg p-4 relative">

                        <button className="absolute top-2 right-2 text-gray-500 cursor-pointer hover:text-red-700" onClick={()=>setIsModalOpen(false)}>X</button>

                        <div className="w-full ">
                            <div className="w-full flex  items-center">
                               <span className="inline-block rounded-md bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
													{order.orderId}
							    </span>
                                <div className="flex flex-col gap-2">
                                    {/* email in italic */}
                                    <span className="text-sm text-gray-500 italic ml-2">{order.email}</span>
                                </div>
                                {/* phone */}
                                <div className="flex flex-col gap-2">
                                    <span className="ml-10 text-gray-800 flex justify-center items-center gap-2"><FaPhoneAlt />{order.phone}</span>
                                </div>
                            </div>
                         
                            <div className="w-full flex justify-between items-center mt-2">
                                <div className="flex  justify-center items-center gap-2">
                                    <MdHome />
                                    <p className="text-gray-800"><span className="font-semibold">{order.firstName} {order.lastName}</span>, {order.addressLineOne} {order.addressLineTwo} , {order.city} , {order.state} , {order.postalCode}</p>
                                </div>                                
                            </div>
                            <div className="w-full flex gap-2 items-center mt-2 pb-2">
                                <span className="text-gray-600">Order Date: {new Date(order.date).toLocaleDateString()}</span>
                                {/* status */}
                                <span className="inline-block rounded-full bg-blue-50 text-blue-600 px-3 py-1 text-xs font-medium">
                                                    {order.status}
                                </span>
                                
                            </div>
                            <div className="w-full flex gap-2 items-center mt-2 pb-2">
                                <p className="text-gray-800 font-semibold ">Order Notes:</p>
                                <p className="text-gray-600">{order.notes}</p>
                            </div>
                        </div>
                        <div className="w-full h-[250px]  flex flex-col overflow-y-scroll items-center p-4">
                            {
                                order.items.map(
                                    (item , index)=>{
                                        return(
                                            <div key={index} className="w-full flex justify-between items-center bg-gray-100 rounded-lg p-2 mb-2">
                                                <div className="flex items-center gap-4">
                                                    <img className="w-[80px] h-[80px] object-cover rounded-lg" src={item.product.image}/>
                                                    <div className="flex flex-col gap-1">
                                                        <span className="font-semibold text-gray-800">{item.product.name}</span>
                                                        <span className="text-sm text-gray-500">Quantity: {item.quantity}</span>
                                                        <span className="text-sm text-gray-500">Price: {getFormattedPrice(item.product.price)}</span>
                                                    </div>
                                                </div>
                                                <div className="text-lg font-semibold text-gray-800">
                                                    {getFormattedPrice(item.product.price * item.quantity)}
                                                </div>
                                            </div>
                                        )
                                    }
                                )
                            }
                        </div>
                        <div  className="w-full flex justify-end items-center bg-gray-100 rounded-lg p-4 m-2">
                            <span className="text-lg font-semibold text-gray-800">Total: {getFormattedPrice(order.total)}</span>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}
