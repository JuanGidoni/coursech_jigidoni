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

const App = () => {

  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [filtered, setFiltered] = useState(false)
  const [products, setProducts] = useState([])
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


  useEffect(() => {
    const allProducts = () => {
      if (filtered && filteredProducts && filteredProducts.length > 1) {
        setFilteredProducts([])
      } else if (!filtered && filteredProducts.length < 0) {
        setFilteredProducts([])
        setProducts(filteredProducts)
        getDataResults()
      } else {
        getDataResults()
      }
    }
    return allProducts()
  }, [filteredProducts])


  return (
    <div className="App">
      <Router>
        <Menu cart={cart} logo={logo} total={total} products={products} setFilteredProducts={setFilteredProducts} filteredProducts={filteredProducts} status={status} setStatus={setStatus} getDataResults={getDataResults} />
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
              path='/category/:id'>
              <Shop products={products} cart={cart} total={total} setCart={setCart} setTotal={setTotal} filteredProducts={filteredProducts} setFilteredProducts={setFilteredProducts} />
            </Route>

            <Route
              exact
              path='/item/:itemId'>
              <ItemList products={products} setProducts={setProducts} cart={cart} total={total} setCart={setCart} setTotal={setTotal} filteredProducts={filteredProducts} setFilteredProducts={setFilteredProducts} status={status} setStatus={setStatus} filtered={filtered} setFiltered={setFiltered} />
            </Route>

          </Switch>
        </Container>
      </Router>
    </div>
  );
}

export default App;
