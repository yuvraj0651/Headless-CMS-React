import { useEffect, useMemo, useState } from "react";
import OrdersTable from "./OrdersTable";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllOrders } from "../../API/OrdersThunk";

const Orders = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectStatus, setSelectStatus] = useState("all-status");

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAllOrders());
    }, [dispatch]);

    const { ordersData, isLoading } = useSelector(
        (state) => state.orders
    );

    const filteredOrders = useMemo(() => {
        if (!searchTerm.trim()) return ordersData;

        return ordersData.filter((item) =>
            item.orderId
                ?.toLowerCase()
                .includes(searchTerm.toLowerCase())
        );
    }, [searchTerm, ordersData]);

    if (isLoading) return <p className="p-6">Loading Orders...</p>;

    return (
        <div className="p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-semibold text-slate-800">
                        Orders
                    </h1>
                    <p className="text-sm text-slate-500">
                        Manage customer orders
                    </p>
                </div>

                <div className="flex gap-2">
                    <select
                        value={selectStatus}
                        onChange={(e) => setSelectStatus(e.target.value)}
                        className="border rounded-lg px-3 py-2 text-sm">
                        <option value="all-status" hidden>All Status</option>
                        <option value="pending">Pending</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search Order ID..."
                        className="border rounded-lg px-3 py-2 text-sm"
                    />
                </div>
            </div>

            <OrdersTable orders={filteredOrders} />
        </div>
    );
};

export default Orders;
