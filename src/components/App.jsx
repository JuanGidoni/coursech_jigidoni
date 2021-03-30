import { useState, useEffect } from 'react'
import '../components/styles/App.css'
import Menu from './Menu'
import Shop from './Pages/Shop'
import Cart from './Pages/Cart'
import logo from './assets/logo.svg';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
// import PrivateRoute from './Pages/PrivateRoutes' // Esto se utilizara en un futuro (auth)
import { Container } from 'react-bootstrap'
import ItemList from './Pages/Shop/ItemList'
import MultiCategory from './Pages/MultiCategory'
import Category from './Pages/MultiCategory/Category'

const App = () => {

  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [filtered, setFiltered] = useState(false)
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [status, setStatus] = useState('')

  const getDataResults = async (e) => {
    try {
      const res = await fetch(`https://api.mercadolibre.com/sites/MLA/search?q=${e}`)
      const response = await res.json()
      setProducts(response.results)
    } catch (error) {
      setStatus(error)
    }
  }
  const getCategoryResults = async () => {
      try {
        const res = await fetch(`https://api.mercadolibre.com//sites/MLA/categories`)
        const response = await res.json()
        setCategories(response)
      } catch (error) {
        setStatus(error)
      }
  }


  useEffect(() => {
    const allProducts = () => {
      if (filtered && filteredProducts && filteredProducts.length > 1) {
        setFilteredProducts([])
      } else if (!filtered && filteredProducts.length < 0) {
        setFilteredProducts([])
        setProducts(filteredProducts)
        getCategoryResults()
        getDataResults()
      } else {
        getCategoryResults()
        getDataResults()
      }
    }
    return allProducts()
    
    // eslint-disable-next-line no-sparse-arrays
  }, [filteredProducts])


  return (
    <div className="App">
      <Router>
        <Menu cats={categories} cart={cart} logo={logo} total={total} products={products} setFilteredProducts={setFilteredProducts} filteredProducts={filteredProducts} status={status} setStatus={setStatus} getDataResults={getDataResults} />
        <Container>
          <Switch>
            <Route
              exact
              path='/'>
              <Shop products={products} cart={cart} total={total} setCart={setCart} setTotal={setTotal} filteredProducts={filteredProducts} setFilteredProducts={setFilteredProducts} status={status} setStatus={setStatus} filtered={filtered} setFiltered={setFiltered} />
            </Route>
            <Route
              exact
              path='/cart'>
              <Cart products={products} cart={cart} total={total} setCart={setCart} setTotal={setTotal} />
            </Route>


            <Route
              exact
              path='/item/:itemId'>
              <ItemList products={products} setProducts={setProducts} cart={cart} total={total} setCart={setCart} setTotal={setTotal} filteredProducts={filteredProducts} setFilteredProducts={setFilteredProducts} status={status} setStatus={setStatus} filtered={filtered} setFiltered={setFiltered} />
            </Route>

            <Route
              exact
              path='/categories'>
              <MultiCategory cats={categories} />
            </Route>

            <Route
              exact
              path='/category/:id'>
              <Category products={products} setStatus={setStatus} setProdcuts={setProducts}  filteredProducts={filteredProducts} setFilteredProducts={setFilteredProducts} status={status} filtered={filtered} setFiltered={setFiltered}/>
            </Route>
            
            <Route
            exact
            path="*">
              <div>Error 404, page not found.</div>
            </Route>

          </Switch>
        </Container>
      </Router>
    </div>
  );
}

export default App;
