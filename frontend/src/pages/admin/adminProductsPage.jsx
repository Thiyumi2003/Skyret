import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { BiEdit } from "react-icons/bi";
import LoadingAnimation from "../../components/loadingAnimation";
import ProductDeleteModal from "../../components/productDeleteModal";
import api from "../../utils/api";


export default function AdminProductsPage() {
    const [products, setProducts] = useState([]);
    const [isProductsAreLoaded, setIsProductsAreLoaded] = useState(false);

    useEffect(
        () => {
            if (!isProductsAreLoaded) {
                api.get("/products").then(
                    (response) => {
                        setProducts(response.data);
                        setIsProductsAreLoaded(true);
                    }
                ).catch(
                    (error) => {
                        console.log(error);
                    }
                );
            }
        },
        [isProductsAreLoaded]
    );

    return (
        <div className="w-full h-full overflow-y-scroll bg-gray-50 p-6 rounded-lg">
            <div className="sticky top-0 z-10 w-full min-h-[90px] rounded-2xl bg-white border border-gray-200 shadow-sm flex items-center justify-between px-6 mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Products</h1>
                    <p className="text-sm text-gray-500 mt-1">Manage your store inventory with ease</p>
                </div>
            </div>

            {
                isProductsAreLoaded ?
                    <div className="w-full overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-sm">
                        <table className="w-full min-w-[1200px] text-sm text-gray-700">
                            <thead className="bg-gray-100 text-gray-600">
                                <tr>
                                    <th className="text-left font-semibold px-5 py-4">Image</th>
                                    <th className="text-left font-semibold px-5 py-4">Product ID</th>
                                    <th className="text-left font-semibold px-5 py-4">Name</th>
                                    <th className="text-left font-semibold px-5 py-4">Price</th>
                                    <th className="text-left font-semibold px-5 py-4">Labelled Price</th>
                                    <th className="text-left font-semibold px-5 py-4">Brand</th>
                                    <th className="text-left font-semibold px-5 py-4">Model</th>
                                    <th className="text-left font-semibold px-5 py-4">Category</th>
                                    <th className="text-left font-semibold px-5 py-4">Availability</th>
                                    <th className="text-left font-semibold px-5 py-4">Stock</th>
                                    <th className="text-left font-semibold px-5 py-4">Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    products.map((item) => {
                                        return (
                                            <tr
                                                key={item.productId}
                                                className="border-t border-gray-200 hover:bg-gray-50 transition-colors duration-200"
                                            >
                                                <td className="px-5 py-4">
                                                    <img
                                                        src={item.images[0]}
                                                        alt={item.name}
                                                        className="w-16 h-16 object-cover rounded-xl border border-gray-200 bg-white"
                                                    />
                                                </td>

                                                <td className="px-5 py-4">
                                                    <span className="inline-block rounded-md bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
                                                        {item.productId}
                                                    </span>
                                                </td>

                                                <td className="px-5 py-4">
                                                    <div className="font-semibold text-gray-800">{item.name}</div>
                                                </td>

                                                <td className="px-5 py-4 font-semibold text-green-600">
                                                    Rs. {item.price}
                                                </td>

                                                <td className="px-5 py-4 text-gray-500">
                                                    Rs. {item.labelledPrice}
                                                </td>

                                                <td className="px-5 py-4 text-gray-700">
                                                    {item.brand || "-"}
                                                </td>

                                                <td className="px-5 py-4 text-gray-600">
                                                    {item.model || "-"}
                                                </td>

                                                <td className="px-5 py-4">
                                                    <span className="inline-block rounded-full bg-blue-50 text-blue-600 px-3 py-1 text-xs font-medium">
                                                        {item.category}
                                                    </span>
                                                </td>

                                                <td className="px-5 py-4">
                                                    <span
                                                        className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                                                            item.isAvailable
                                                                ? "bg-green-50 text-green-600"
                                                                : "bg-red-50 text-red-600"
                                                        }`}
                                                    >
                                                        {item.isAvailable ? "Available" : "Unavailable"}
                                                    </span>
                                                </td>

                                                <td className="px-5 py-4">
                                                    <span className="font-semibold text-gray-800">{item.stock}</span>
                                                </td>

                                                <td className="px-5 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <ProductDeleteModal
                                                            product={item}
                                                            refresh={() => {
                                                                setIsProductsAreLoaded(false);
                                                            }}
                                                        />
                                                        <Link
                                                            to="/admin/edit-product"
                                                            state={item}
                                                            className="w-9 h-9 rounded-lg border border-blue-100 bg-blue-50 flex items-center justify-center hover:bg-blue-100 transition-colors"
                                                        >
                                                            <BiEdit className="text-xl text-blue-600 cursor-pointer" />
                                                        </Link>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                    :
                    <LoadingAnimation />
            }

            <Link
                to="/admin/add-product"
                className="fixed bottom-8 right-8 w-[64px] h-[64px] bg-accent flex justify-center items-center text-white text-3xl rounded-2xl shadow-lg hover:scale-105 transition-transform duration-200"
            >
                <FaPlus />
            </Link>
        </div>
    );
}