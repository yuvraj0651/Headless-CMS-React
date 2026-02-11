import { useEffect, useMemo, useState } from 'react';
import CustomersTable from "../Customers/CustomersTable";
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllCustomers } from "../../API/CustomersThunk";

const Customers = () => {

    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);

    const dispatch = useDispatch();

    const { customersData } = useSelector((state) => state.customers);
    console.log(customersData);

    useEffect(() => {
        dispatch(fetchAllCustomers());
    }, [dispatch]);

    const filteredCustomers = useMemo(() => {
        return customersData.filter((cust) => {
            const matchesSearch =
                cust.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                cust.email.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesStatus =
                statusFilter === "all" || cust.status === statusFilter;

            return matchesSearch && matchesStatus;
        });
    }, [searchTerm, statusFilter, customersData]);

    const itemsPerPage = 5;
    const lastItemIndex = currentPage * itemsPerPage;
    const firstItemIndex = lastItemIndex - itemsPerPage;
    const paginatedItems = filteredCustomers.slice(firstItemIndex, lastItemIndex);

    const totalPages = Math.ceil(customersData.length / itemsPerPage);
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    };

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-semibold text-slate-800">
                        Customers
                    </h1>
                    <p className="text-sm text-slate-500">
                        Manage your customers
                    </p>
                </div>

                {/* Filters */}
                <div className="flex gap-2">
                    <input
                        type="text"
                        placeholder="Search name or email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="border rounded-lg px-3 py-2 text-sm w-56"
                    />

                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="border rounded-lg px-3 py-2 text-sm"
                    >
                        <option value="all">All Status</option>
                        <option value="active">Active</option>
                        <option value="blocked">Blocked</option>
                    </select>
                </div>
            </div>

            {/* Table */}
            <CustomersTable customers={paginatedItems} />
            <div className="flex items-center justify-between px-4 py-3 bg-white border-t rounded-b-xl">
                {/* Left info */}
                <p className="text-sm text-slate-500">
                    Page <span className="font-medium">{currentPage}</span> of{" "}
                    <span className="font-medium">{totalPages}</span>
                </p>

                {/* Pagination buttons */}
                <div className="flex items-center gap-1">
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
                </div>
            </div>
        </div>
    )
}

export default Customers