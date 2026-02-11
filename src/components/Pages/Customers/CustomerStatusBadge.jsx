import React from 'react'

const styles = {
    active: "bg-green-100 text-green-700",
    blocked: "bg-red-100 text-red-700",
};

const CustomerStatusBadge = ({ status }) => {
    return (
        <span
            className={`px-2 py-1 rounded-[7px] uppercase font-[600] text-xs ${styles[status]}`}
        >
            {status}
        </span>
    )
}

export default CustomerStatusBadge