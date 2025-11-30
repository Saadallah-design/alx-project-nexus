import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import ProductList from './components/product/ProductList';
import PromoSection from './components/common/PromoSection';
import CartDrawer from './components/cart/CartDrawer';
import CheckoutPage from './pages/CheckoutPage';

function App() {
  return (
    <Router>
      <CartDrawer />
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <PromoSection />
              <ProductList />
            </Layout>
          }
        />
        <Route path="/checkout" element={<CheckoutPage />} />
      </Routes>
    </Router>
  );
}

export default App;

