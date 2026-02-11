import CustomerStatusBadge from "../Customers/CustomerStatusBadge";
import CustomerActions from "../Customers/CustomerActions";

const CustomersTable = ({ customers }) => {
    return (
        <>
            <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
                <table className="w-full text-sm">
                    <thead className="bg-slate-100 text-slate-600">
                        <tr>
                            <th className="px-4 py-3 text-left">Customer</th>
                            <th className="px-4 py-3 text-left">Email</th>
                            <th className="px-4 py-3 text-left">Orders</th>
                            <th className="px-4 py-3 text-left">Role</th>
                            <th className="px-4 py-3 text-left">Status</th>
                            <th className="px-4 py-3 text-left">Joined</th>
                            <th className="px-4 py-3 text-right">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {customers?.length === 0 ? (
                            <tr>
                                <td colSpan={7} className="text-center py-6 text-slate-500">
                                    No customers found
                                </td>
                            </tr>
                        ) : (
                            customers?.map((cust) => (
                                <tr
                                    key={cust.id}
                                    className="border-t hover:bg-slate-50"
                                >
                                    <td className="px-4 py-3">
                                        <p className="font-medium">{cust?.name}</p>
                                        <p className="text-xs text-slate-500">{cust?.id}</p>
                                    </td>

                                    <td className="px-4 py-3">
                                        <p>{cust?.email}</p>
                                        <p className="text-xs text-slate-500">{cust?.phone || "0987654321"}</p>
                                    </td>

                                    <td className="px-4 py-3">{cust?.orders || Math.floor(Math.random() * 10)}</td>

                                    <td className="px-4 py-3 capitalize">
                                        {cust?.role ?? "N/A"}
                                    </td>

                                    <td className="px-4 py-3">
                                        <CustomerStatusBadge status={cust.status} />
                                    </td>

                                    <td className="px-4 py-3 text-slate-500">
                                        {cust?.joined || "N/A"}
                                    </td>

                                    <td className="px-4 py-3 text-right">
                                        <CustomerActions />
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default CustomersTable