import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router';
import { AddingProducts, fetchAllProducts } from '../../API/ProductsThunk';
import ProductForm from './ProductForm';

const AddProducts = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const addProductHandler = async (item) => {
        await dispatch(AddingProducts(item));
        navigate("/home/products");
    };

    return <ProductForm onSubmit={addProductHandler} />
}

export default AddProducts