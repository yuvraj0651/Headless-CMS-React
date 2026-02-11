import React from 'react'

const CustomerActions = () => {
    return (
        <div className="flex justify-end gap-2">
            <button className="text-blue-600 hover:underline text-xs">
                View
            </button>
            <button className="text-red-600 hover:underline text-xs">
                Block
            </button>
        </div>
    )
}

export default CustomerActions