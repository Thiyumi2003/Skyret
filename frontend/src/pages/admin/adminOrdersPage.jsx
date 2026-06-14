import { Link } from "react-router-dom";
import { FaEye, FaPlus } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { BiEdit } from "react-icons/bi";
import LoadingAnimation from "../../components/loadingAnimation";
import ProductDeleteModal from "../../components/productDeleteModal";
import getFormattedPrice from "../../utils/price-format";
import OrderDetailsModal from "../../components/orderDetailsModal";
import api from "../../utils/api";

export default function AdminOrdersPage() {
	const [orders, setOrders] = useState([]);
	const [pageSize, setPageSize] = useState(10);
	const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalOrders, setTotalOrders] = useState(0);
	const [isOrdersAreLoaded, setIsOrdersAreLoaded] = useState(false);

	useEffect(() => {
		if (!isOrdersAreLoaded) {
			api
				.get(
					"/orders/" +
						pageSize +
						"/" +
						currentPage
				)
				.then((response) => {
					setOrders(response.data.orders);
                    setTotalPages(response.data.totalPages);
                    setTotalOrders(response.data.total);
					setIsOrdersAreLoaded(true);
				})
				.catch((error) => {
					console.log(error);
				});
		}
	}, [isOrdersAreLoaded]);

	return (
		<div className="w-full h-full overflow-y-scroll bg-gray-50 p-6 rounded-lg">
			<div className="sticky top-0 z-10 w-full min-h-[90px] rounded-2xl bg-white border border-gray-200 shadow-sm flex items-center justify-between px-6 mb-6">
				<div>
					<h1 className="text-3xl font-bold text-gray-800">Orders</h1>
					<p className="text-sm text-gray-500 mt-1">
						Manage your store Orders with ease
					</p>
				</div>
                <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-600">
                        Total Orders: <span className="font-semibold text-gray-800">{totalOrders}</span>
                    </span>
                </div>
			</div>

			{isOrdersAreLoaded ? (
				<>
					<div className="w-full overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-sm">
						<table className="w-full min-w-[1200px] text-sm text-gray-700">
							<thead className="bg-gray-100 text-gray-600">
								<tr>
									<th className="text-left font-semibold px-5 py-4">
										Order ID
									</th>
									<th className="text-left font-semibold px-5 py-4">Email</th>
									<th className="text-left font-semibold px-5 py-4">
										First Name
									</th>
									<th className="text-left font-semibold px-5 py-4">
										Last Name
									</th>
									<th className="text-left font-semibold px-5 py-4">Phone</th>
									<th className="text-left font-semibold px-5 py-4">Date</th>
									<th className="text-left font-semibold px-5 py-4">Total</th>
									<th className="text-left font-semibold px-5 py-4">Status</th>
                                    <th className="text-left font-semibold px-5 py-4">Actions</th>
								</tr>
							</thead>

							<tbody>
								{orders.map((item) => {
									return (
										<tr
											key={item.orderId}
											className="border-t border-gray-200 hover:bg-gray-50 transition-colors duration-200"
										>
											<td className="px-5 py-4">
												<span className="inline-block rounded-md bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
													{item.orderId}
												</span>
											</td>

											<td className="px-5 py-4">
												<div className="font-semibold text-gray-800">
													{item.email}
												</div>
											</td>

											<td className="px-5 py-4 text-gray-500">
												{item.firstName}
											</td>

											<td className="px-5 py-4 text-gray-500">
												{item.lastName}
											</td>

											<td className="px-5 py-4 text-gray-700">{item.phone}</td>

											<td className="px-5 py-4 text-gray-600">
												{new Date(item.date).toLocaleDateString()}
											</td>
											<td className="px-5 py-4">
												<span className="font-semibold text-gray-800">
													{getFormattedPrice(item.total)}
												</span>
											</td>

											<td className="px-5 py-4">
												<span className="inline-block rounded-full bg-blue-50 text-blue-600 px-3 py-1 text-xs font-medium">
													{item.status}
												</span>
											</td>
                                            <td className="px-5 py-4">
                                                <OrderDetailsModal order={item} refresh={()=>setIsOrdersAreLoaded(false)}/>
                                            </td>
										</tr>
									);
								})}
							</tbody>
						</table>
					</div>
					<div className="w-full flex justify-end items-center gap-3 mt-4">
						<button
							onClick={() => {
								if (currentPage > 1) {
									setCurrentPage(currentPage - 1);
									setIsOrdersAreLoaded(false);
								}
							}}
							className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors duration-200"
						>
							Previous
						</button>
						<span className="text-sm text-gray-600">Page {currentPage} of {totalPages}</span>
						<button
							onClick={() => {
								setCurrentPage(currentPage + 1);
								setIsOrdersAreLoaded(false);
							}}
							className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors duration-200"
						>
							Next
						</button>
                        <select
                            value={pageSize}
                            onChange={(e) => {
                                setPageSize(parseInt(e.target.value));
                                setIsOrdersAreLoaded(false);
                            }}
                            className="ml-4 px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors duration-200"
                        >
                            <option value={2}>2</option>
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                            <option value={20}>20</option>
                            <option value={50}>50</option>
                        </select>
					</div>
				</>
			) : (
				<LoadingAnimation />
			)}
		</div>
	);
}
