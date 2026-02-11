import './App.css'
import { Navigate, Route, Routes } from 'react-router';
import AuthPage from './components/Pages/InitialPage/AuthPage';
import Header from './components/Layout/Header/Header';
import Footer from './components/Layout/Footer/Footer';
import Home from './components/Pages/Home/Home';
import ProtectedRoutes from "./components/Routes/ProtectedRoutes";
import UnAuthorizedPage from './components/Routes/UnAuthorizedPage';
import Dashboard from './components/Pages/Dashboard/Dashboard';
import Products from './components/Pages/Products/Products';
import AddProducts from './components/Pages/Products/AddProducts';
import Orders from './components/Pages/Orders/Orders';
import Customers from './components/Pages/Customers/Customers';
import Settings from './components/Pages/Settings/Settings';
import Analytics from './components/Pages/Analytics/Analytics';

function App() {

  return (
    <>
      {/* Header Component */}
      <Header />
      {/* Main Component */}
      <main className="main-section">
        <Routes>
          <Route path="/" element={<Navigate to="/auth" replace />} />
          <Route path='/auth' element={<AuthPage />} />
          <Route path="/unauthorized" element={<UnAuthorizedPage />} />

          <Route path="/home" element={
            <ProtectedRoutes allowedRole={["admin"]}>
              <Home />
            </ProtectedRoutes>
          }>
            <Route index element={<Dashboard />} />
            <Route path='products'>
              <Route index element={<Products />} />
              <Route path='add' element={<AddProducts />} />
            </Route>
            <Route path='orders' element={<Orders />}></Route>
            <Route path='customers' element={<Customers />}></Route>
            <Route path='settings' element={<Settings />} ></Route>
            <Route path='analytics' element={<Analytics />} />
          </Route>
        </Routes>
      </main>
      {/* Footer Component */}
      <Footer />
    </>
  )
}

export default App
