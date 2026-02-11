import { configureStore } from "@reduxjs/toolkit";
import AuthThunk from "../../API/AuthThunk";
import DashboardThunk from "../../API/DashboardThunk";
import ProductsThunk from "../../API/ProductsThunk";
import OrdersThunk from "../../API/OrdersThunk";
import CustomersThunk from "../../API/CustomersThunk";
import SettingsThunk from "../../API/SettingsThunk";

const Store = configureStore({
    reducer: {
        auth: AuthThunk,
        dashboard: DashboardThunk,
        products: ProductsThunk,
        orders: OrdersThunk,
        customers: CustomersThunk,
        settings: SettingsThunk,
    }
});

export default Store;