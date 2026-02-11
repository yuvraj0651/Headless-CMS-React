import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllProducts } from "../../API/ProductsThunk";
import ProductsTable from './ProductsTable';
import { useNavigate } from 'react-router';

const Products = () => {

    const [searchTerm, setSearchTerm] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { productsData, isLoading } = useSelector((state) => state.products);
    console.log("Products Data: ", productsData);

    useEffect(() => {
        if (productsData.length === 0) {
            dispatch(fetchAllProducts());
        }
    }, [dispatch, productsData.length]);

    console.log(productsData.length);

    const filteredProducts = searchTerm ? productsData.filter((item) => {
        return item.title.toLowerCase().includes(searchTerm.toLowerCase());
    }) : productsData;

    if (isLoading) return <p className="p-6">Loading products...</p>;

    return (
        <>
            <div className="p-6 space-y-4">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-semibold">Products</h1>
                    <div className='flex items-center gap-3'>
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search Order ID..."
                            className="border rounded-lg px-3 py-2 text-sm"
                        />
                        <button
                            onClick={() => navigate("/home/products/add")}
                            className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm"
                        >
                            + Add Product
                        </button>
                    </div>
                </div>
                <ProductsTable products={filteredProducts} />
            </div>
        </>
    )
}

export default Products