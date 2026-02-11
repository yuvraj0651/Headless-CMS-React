import { useSelector } from "react-redux";

const RecentOrders = ({orders}) => {
    
    if (orders.length === 0) {
        return (
            <div className="bg-white rounded-xl p-4 shadow-sm">
                <h2 className="text-sm font-semibold mb-4">Recent Orders</h2>
                <p className="text-gray-500 text-sm">No orders available.</p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl p-4 shadow-sm">
            <h2 className="text-sm font-semibold mb-4">Recent Orders</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th
                                scope="col"
                                className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Order ID
                            </th>
                            <th
                                scope="col"
                                className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Customer
                            </th>
                            <th
                                scope="col"
                                className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Amount
                            </th>
                            <th
                                scope="col"
                                className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Status
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {orders.map((order) => (
                            <tr key={order.id}>
                                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">
                                    {order.id}
                                </td>
                                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">
                                    {order.customer}
                                </td>
                                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">
                                    ₹{order.amount}
                                </td>
                                <td className="px-4 py-2 whitespace-nowrap">
                                    <span
                                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${order.status === "Delivered"
                                            ? "bg-green-100 text-green-800"
                                            : "bg-yellow-100 text-yellow-800"
                                            }`}
                                    >
                                        {order.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RecentOrders;
