/* eslint-disable no-unused-vars */
import { useLocation, Routes, Route, Navigate } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Home from './pages/homePage/Home';
import About from './pages/aboutPage/About';
import Login from './pages/loginPage/Login';
import Product from './pages/productPage/Product';
import ProductFilter from './pages/productFilterPage/ProductFilter';
import Cart from './pages/cartPage/Cart';
import BuyPage from './pages/buyPage/Buy';
import PaymentPage from './pages/paymentPage/Payment';
import NotFound from './pages/notFoundPage/NotFound';
import { useAuth } from './AuthProvider';
import { useNavigation } from './NavigationProvider';

export default function AnimatedRoutes() {
    const location = useLocation();
    const { isAuthenticated } = useAuth();
    const { isNavigatingToPayment, setIsNavigatingToPayment } = useNavigation();

    return (
        <TransitionGroup>
            <CSSTransition key={location.key} classNames="fade" timeout={300}>
                <Routes location={location}>
                    <Route path="/" element={<Home />} />
                    <Route path="/product/:id" element={<Product />} />
                    <Route
                        path="/productFilter/:category"
                        element={<ProductFilter />}
                    />
                    <Route path="/productFilter" element={<ProductFilter />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/cart" element={<Cart />} />
                    {/* <Route
                        path="/buy"
                        element={
                            isAuthenticated || isNavigatingToPayment ? (
                                <BuyPage />
                            ) : (
                                <Navigate to="/" />
                            )
                        }
                    />
                    <Route
                        path="/payment"
                        element={
                            isAuthenticated || isNavigatingToPayment ? (
                                <PaymentPage />
                            ) : (
                                <Navigate to="/" />
                            )
                        }
                    /> */}
                    <Route path="/buy" element={<BuyPage />} />
                    <Route path="/payment" element={<PaymentPage />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </CSSTransition>
        </TransitionGroup>
    );
}
