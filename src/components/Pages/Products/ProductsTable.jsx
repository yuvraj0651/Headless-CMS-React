import { useDispatch } from 'react-redux'
import { DeletingProducts } from '../../API/ProductsThunk';
import { useEffect, useState } from 'react';

const ProductsTable = ({ products }) => {

    const [currentPage, setCurrentPage] = useState(1);

    const dispatch = useDispatch();

    const deleteHandler = async (id) => {
        await dispatch(DeletingProducts(id));
    };

    const itemsPerPage = 6;
    const lastItemIndex = currentPage * itemsPerPage;
    const firstItemIndex = lastItemIndex - itemsPerPage;
    const paginatedProducts = products.slice(firstItemIndex, lastItemIndex);

    const totalPages = Math.ceil(products.length / itemsPerPage);
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    };

    useEffect(() => {
        if (currentPage > totalPages) {
            setCurrentPage(totalPages || 1);
        }
    }, [products, totalPages]);

    return (
        <>
            <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
                <table className="w-full text-sm">
                    <thead className="bg-slate-100">
                        <tr>
                            <th className="p-3 text-left">Title</th>
                            <th>Price</th>
                            <th>Stock</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            paginatedProducts.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className='text-center pt-[1rem]'>
                                        <p className='capitalize text-[0.9rem] font-[500] tracking-wide'>no data to show</p>
                                    </td>
                                </tr>
                            ) : (
                                paginatedProducts?.map((p) => (
                                    <tr key={p.id} className="border-t">
                                        <td className="p-3">{p.title}</td>
                                        <td>₹{p.price}</td>
                                        <td>{p.stock}</td>
                                        <td>{p.status}</td>
                                        <td>
                                            <button
                                                onClick={() => deleteHandler(p.id)}
                                                className="text-red-500 hover:underline"
                                            >
                                                Delete
                                            </button>
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
        </>
    )
}

export default ProductsTable