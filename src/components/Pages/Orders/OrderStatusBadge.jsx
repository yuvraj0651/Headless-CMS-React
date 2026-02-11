import React from 'react';

const statusStyles = {
    Pending: "bg-yellow-100 text-yellow-700",
    Shipped: "bg-blue-100 text-blue-700",
    Delivered: "bg-green-100 text-green-700",
    Cancelled: "bg-red-100 text-red-700",
};

const OrderStatusBadge = ({ status }) => {
    return (
        <span
            className={`px-3 py-1 rounded-[4px] uppercase text-[0.65rem] font-[600] bg-green-100 text-green-700`}
        >
            {status}
        </span>
    )
}

export default OrderStatusBadge