import './App.css'
import Layout from './components/layout/Layout'
import ProductList from './components/product/ProductList'
import PromoSection from './components/common/PromoSection'

function App() {
  return (
    <Layout>
      <PromoSection />
      <ProductList />
      
    </Layout>
  )
}

export default App

