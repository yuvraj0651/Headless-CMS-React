import OrderStatusBadge from './OrderStatusBadge';
import OrderActions from './OrderActions';
import { useSelector } from 'react-redux';
import { useState } from 'react';

const OrdersTable = ({ orders }) => {
    const [currentPage, setCurrentPage] = useState(1);

    const { ordersData } = useSelector((state) => state.orders);
    console.log(ordersData);

    const itemsPerPage = 6;
    const lastItemIndex = currentPage * itemsPerPage;
    const firstItemIndex = lastItemIndex - itemsPerPage;
    const paginatedOrders = orders.slice(firstItemIndex, lastItemIndex);

    const totalPages = Math.ceil(orders.length / itemsPerPage);
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    };

    return (
        <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
            <table className="w-full text-sm">
                <thead className="bg-slate-100 text-slate-600">
                    <tr>
                        <th className="px-4 py-3 text-left">Order ID</th>
                        <th className="px-4 py-3 text-left">Discount</th>
                        <th className="px-4 py-3 text-left">Date</th>
                        <th className="px-4 py-3 text-left">Total</th>
                        <th className="px-4 py-3 text-left">Status</th>
                        <th className="px-4 py-3 text-right">Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        paginatedOrders.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="text-center">
                                    <p>No Orders Found</p>
                                </td>
                            </tr>
                        ) : (
                            paginatedOrders.map((order) => (
                                <tr
                                    key={order.id}
                                    className="border-t hover:bg-slate-50"
                                >
                                    <td className="px-4 py-3 font-medium">
                                        {order.id}
                                    </td>
                                    <td className="px-4 py-3">
                                        {order.discount}
                                    </td>
                                    <td className="px-4 py-3">
                                        {order.orderDate}
                                    </td>
                                    <td className="px-4 py-3">
                                        {Math.round(order.grandTotal).toFixed(2)}
                                    </td>
                                    <td className="px-4 py-3">
                                        <OrderStatusBadge status={order.status} />
                                    </td>
                                    <td className="px-4 py-3 text-right">
                                        <OrderActions />
                                    </td>
                                </tr>
                            ))
                        )}
                </tbody>
            </table>
            <div className="flex items-center gap-1 justify-end mt-[1.5rem] mb-[1rem] mr-[1rem]">
                <button
                    onClick={() => setCurrentPage(1)}
                    className="px-3 py-1.5 text-sm rounded-lg border text-slate-600 hover:bg-slate-100 disabled:opacity-50 capitalize disabled:cursor-not-allowed"
                    disabled={currentPage === 1}
                >
                    First
                </button>
                {/* Previous */}
                <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    className="px-3 py-1.5 text-sm rounded-lg border text-slate-600 hover:bg-slate-100 disabled:opacity-50"
                    disabled={currentPage === 1}
                >
                    Prev
                </button>
                {/* Page Numbers */}
                {pageNumbers.map((page) => {
                    return (
                        <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`px-3 py-1.5 text-sm rounded-lg border
                                ${currentPage === page
                                    ? "bg-indigo-600 text-white border-indigo-600"
                                    : "text-slate-600 hover:bg-slate-100"
                                }`}
                        >
                            {page}
                        </button>
                    );
                })}
                {/* Next */}
                <button
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    className="px-3 py-1.5 text-sm rounded-lg border text-slate-600 hover:bg-slate-100 disabled:opacity-50"
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
                <button
                    onClick={() => setCurrentPage(totalPages)}
                    className="px-3 py-1.5 text-sm rounded-lg border text-slate-600 hover:bg-slate-100 disabled:opacity-50 capitalize disabled:cursor-not-allowed"
                    disabled={currentPage === totalPages}
                >
                    Last
                </button>
            </div>
        </div>
    )
}

export default OrdersTable