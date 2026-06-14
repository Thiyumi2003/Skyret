import { useState } from "react";
import toast from "react-hot-toast";
import uploadMedia from "../../utils/mediaUpload";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AdminAddProductPage(){

    const [productId, setProductId] = useState("");
    const [name, setName] = useState("");
    const [altNames, setAltNames] = useState("");
    const [price, setPrice] = useState("");
    const [labelledPrice, setLabelledPrice] = useState("");
    const [description, setDescription] = useState("");
    const [images, setImages] = useState([]);
    const [brand, setBrand] = useState("Apple");
    const [model, setModel] = useState("");
    const [category, setCategory] = useState("Laptop");
    const [isAvailable, setIsAvailable] = useState(true);
    const [stock, setStock] = useState(0);
    const [isSaving, setIsSaving] = useState(false);
    const navigate = useNavigate();
    
    async function handleSave(){

        try{
            setIsSaving(true);
            const token = localStorage.getItem("token");

            if(token == null){
                toast.error("You must be logged in to perform this action.");
                window.location.href = "/login";
                return;
            }

            const mediaUploadPromises = []

            for(let i=0; i<images.length; i++){
                mediaUploadPromises.push(uploadMedia(images[i]));
            }

            const uploadResults = await Promise.allSettled(mediaUploadPromises);
            const urls = uploadResults
                .filter((result) => result.status === "fulfilled")
                .map((result) => result.value)
                .filter(Boolean);

            const productImages = urls.length > 0
                ? urls
                : ["/images/default-product-01.png", "/images/default-product-02.png"];

            const altNamesArray = altNames.split(",")

            const productData = {
                productId : productId,
                name : name,
                altNames : altNamesArray,
                price : price,
                labelledPrice : labelledPrice,
                description : description,
                images : productImages,
                brand : brand,
                model : model,
                category : category,
                isAvailable : isAvailable,
                stock : stock
            }


            await axios.post(import.meta.env.VITE_API_URL+"/products", productData,
                {
                    headers : {
                        "Authorization" : "Bearer "+token
                    }
                }
            )

            toast.success("Product added successfully!");
            //
            navigate("/admin/products");


        }catch(error){
            setIsSaving(false);
            console.error("Error adding product:", error);
            console.log("Error response data:", error?.response);

                        if (error?.response?.status === 401 || error?.response?.status === 403) {
                            setIsSaving(false);
                            localStorage.removeItem("token");
                            toast.error("Your session expired. Please log in again.");
                            navigate("/login");
                            return;
                        }

                        if (error?.response?.status === 400) {
                setIsSaving(false);
                            toast.error(error?.response?.data?.message || "Please check the product fields and try again.");
                            return;
                        }

            toast.error(error?.response?.data?.message || "Failed to add product. Please try again.")
        }
    }

    return(
        <div className="w-full h-full flex flex-col items-center p-4 overflow-y-scroll">
            <div className="sticky top-0 w-full h-25 rounded-lg bg-accent text-white flex items-center p-5 justify-between shadow-2xl">
                <h1 className="text-2xl  font-semibold">Add New Product</h1>
                <div className="h-full  flex justify-center items-center">
                    <button onClick={handleSave} className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600" >{isSaving? "Saving..." : "Save"}</button>
                    <button className="ml-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">Cancel</button>
                </div>
            </div>
            <div className="w-full flex flex-wrap bg-white shadow-2xl p-5 mt-8 rounded-lg">
                
                <div className="w-1/4   p-2">
                    <label className="block mb-2 font-semibold">Product ID</label>
                    <input className="border border-gray-300 rounded-md p-2 w-full"
                        value={productId}
                        onChange={(e)=>{setProductId(e.target.value)}}
                    />
                </div>
                <div className="w-3/4   p-2">
                    <label className="block mb-2 font-semibold">Name</label>
                    <input className="border border-gray-300 rounded-md p-2 w-full"
                        value={name}
                        onChange={(e)=>{setName(e.target.value)}}
                    />
                </div>
                <div className="w-full   p-2">
                    <label className="block mb-2 font-semibold">Alternative Names (comma separated)</label>
                    <input className="border border-gray-300 rounded-md p-2 w-full"
                        value={altNames}
                        onChange={(e)=>{setAltNames(e.target.value)}}
                    />
                </div>
                <div className="w-1/4   p-2">
                    <label className="block mb-2 font-semibold">Price</label>
                    <input className="border border-gray-300 rounded-md p-2 w-full"
                        value={price}
                        onChange={(e)=>{setPrice(e.target.value)}}
                    />
                </div>
                <div className="w-1/4   p-2">
                    <label className="block mb-2 font-semibold">Labelled Price</label>
                    <input className="border border-gray-300 rounded-md p-2 w-full"
                        value={labelledPrice}
                        onChange={(e)=>{setLabelledPrice(e.target.value)}}
                    />
                </div>
                <div className="w-1/4   p-2">
                    <label className="block mb-2 font-semibold">Category</label>
                    <select
                    value={category}
                    onChange={
                        (e)=>{
                            setCategory(e.target.value);                            
                        }                        
                    } className="border border-gray-300 rounded-md p-2 w-full">
                        <option value="Laptop" >Laptop</option>
                        <option value="Mobile">Mobile</option>
                        <option value="Headphones">Headphones</option>
                        <option value="Camera">Camera</option>
                        <option value="Others">Others</option>
                        {/* graphic cards, processors, ssd, monitors, printers */}
                        <option value="Graphic Card">Graphic Card</option>
                        <option value="Processor">Processor</option>
                        <option value="SSD">SSD</option>
                        <option value="Monitor">Monitor</option>
                        <option value="Printer">Printer</option>
                    </select>
                </div>
                <div className="w-1/4   p-2">
                    {/* images */}
                    <label className="block mb-2 font-semibold">Images</label>
                    <input type="file" multiple className="border border-gray-300 rounded-md p-2 w-full"
                        onChange={
                            (e)=>{
                                setImages(e.target.files)
                            }
                        }
                    />
                </div>
                <div className="w-full   p-2">
                    <label className="block mb-2 font-semibold">Description</label>
                    <textarea className="border border-gray-300 rounded-md p-2 w-full"
                        value={description}
                        onChange={(e)=>{setDescription(e.target.value)}}
                    />
                </div>
                <div className="w-1/4   p-2">
                    <label className="block mb-2 font-semibold">Brand</label>
                    <select
                        value={brand}
                        onChange={
                            (e)=>{
                                setBrand(e.target.value);                            
                            }
                        } className="border border-gray-300 rounded-md p-2 w-full  ">
                        <option value="Apple" >Apple</option>
                        <option value="Samsung">Samsung</option>
                        <option value="Sony">Sony</option>
                        <option value="Dell">Dell</option>
                        <option value="HP">HP</option>
                        <option value="Lenovo">Lenovo</option>
                        <option value="Asus">Asus</option>
                        <option value="Acer">Acer</option>
                        <option value="Nvidia">Nvidia</option>
                        <option value="AMD">AMD</option>
                        <option value="Others">Others</option>
                    </select>
                </div>
                <div className="w-1/4   p-2">
                    <label className="block mb-2 font-semibold">Model</label>
                    <input className="border border-gray-300 rounded-md p-2 w-full"
                        value={model}
                        onChange={(e)=>{setModel(e.target.value)}}
                    />
                </div>
                <div className="w-1/4   p-2">
                    <label className="block mb-2 font-semibold">Stock</label>
                    <input className="border border-gray-300 rounded-md p-2 w-full"
                        value={stock}
                        onChange={(e)=>{setStock(e.target.value)}}
                    />
                </div>
                {/* <div className="w-1/4   p-2 flex items-center">
                    <label className="block mb-2 font-semibold mr-4">Available</label>
                    <input type="checkbox" checked={isAvailable} onChange={(e)=>{setIsAvailable(e.target.checked)}} />
                </div> */}
                <div className="w-1/4   p-2 ">
                    <label className="block mb-2 font-semibold ">Availability</label>
                    <select
                        value={isAvailable}
                        onChange={
                            (e)=>{
                                setIsAvailable(e.target.value === "true");
                            }
                        } className="border border-gray-300 rounded-md p-2 w-full  ">
                        <option className="bg-green-600 text-white font-semibold" value={true} >Available</option>
                        <option className="bg-red-600 text-white font-semibold" value={false}>Not Available</option>
                    </select>
                </div>
            </div>
            
        </div>
    )
}