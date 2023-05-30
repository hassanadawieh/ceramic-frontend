import react , { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Header from "../src/components/Header/Header";
import Footer from "../src/components/Footer/Footer";
import Home from "../src/pages/Home/Home";
import ContactUs from "../src/pages/ContactUs/ContactUs";
import NotFound from "../src/pages/NotFound/NotFound";
import Order from "../src/pages/Order/Order";
import Product from "../src/pages/Product/Product";
import Unauthorized from "../src/pages/Unauthorized/Unauthorized";
import DashboardHome from "./pages/DashboardHome/DashboardHome.js";
import DashboardAdmins from "./pages/DashboardAdmins/DashboardAdmins";
import DashboardOrders from "./pages/DashboardOrders/DashboardOrders";
import DashboardProducts from "./pages/DashboardProducts/DashboardProducts";
import DashboardTrainings from "./pages/DashboardTrainings/DashboardTrainings";
import DashboardCategories from "./pages/DashboardCategories/DashboardCategories";
import PrivateRoutes from "./utils/privateRoutes";
import DashboardPage from "./pages/Dashboard/Dashboard.js";
import Login from "../src/pages/Login/Login";
import  { DataProvider} from "./MyContext"
import './App.css';

function App() {

const location = useLocation();
const isNotFoundPath =  location.pathname === "*";
const isUnauthorizedPath = location.pathname === "/unauthorized";
const isDashboardPath = location.pathname.startsWith("/dashboard"); 
const isLoginPath = location.pathname === "/login";

const shouldRenderHeader =  isNotFoundPath || isUnauthorizedPath || isDashboardPath || isLoginPath;


  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);


  return (
    <DataProvider>
      <div className="App">
        {!shouldRenderHeader && <Header className="header" />}
        <Routes>
          <Route>
            <Route exact path="/" element={<Home />} />
            <Route path="order" element={<Order />} />
            <Route path="products" element={<Product />} />
            <Route path="contact" element={<ContactUs />} />
            <Route path="*" element={<NotFound />} />
            <Route path="unauthorized" element={<Unauthorized />} />
            <Route path="login" element={<Login />} />
          </Route>
          <Route path="/" element={<PrivateRoutes />}>
            <Route path="/" element={<DashboardPage />}>
              <Route path="/dashboard" element={<DashboardHome />} />
              <Route path="/dashboard-admins" element={<DashboardAdmins />} />
              <Route path="/dashboard-orders" element={<DashboardOrders />} />
              <Route
                path="/dashboard-products"
                element={<DashboardProducts />}
              />
              <Route
                path="/dashboard-trainings"
                element={<DashboardTrainings />}
              />
              <Route
                path="/dashboard-categories"
                element={<DashboardCategories />}
              />
            </Route>
          </Route>
        </Routes>
        {!shouldRenderHeader && <Footer className="footer" />}
      </div>
    </DataProvider>
  );
}

export default App;
