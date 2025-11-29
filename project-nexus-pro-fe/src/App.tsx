import './App.css'
import Layout from './components/layout/Layout'
import ProductList from './components/product/ProductList'
import PromoSection from './components/common/PromoSection'
import CartDrawer from './components/cart/CartDrawer'

function App() {
  return (
    <Layout>
      <CartDrawer />
      <PromoSection />
      <ProductList />

    </Layout>
  )
}

export default App

