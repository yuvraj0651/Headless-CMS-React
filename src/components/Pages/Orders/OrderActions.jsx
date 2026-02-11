import React from 'react'

const OrderActions = () => {
    return (
        <div className="flex justify-end gap-2">
            <button className="text-indigo-600 hover:underline text-sm">
                View
            </button>
            <button className="text-slate-600 hover:underline text-sm">
                Edit
            </button>
        </div>
    )
}

export default OrderActions