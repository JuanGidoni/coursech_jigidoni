import { useState, useEffect } from 'react'
import '../components/styles/App.css'
import Menu from './Menu'
// import img1 from './assets/products/1.png'
// import img2 from './assets/products/2.png'
// import img3 from './assets/products/3.png'
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
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [status, setStatus] = useState('')

  const getDataResults = async () => {
    try {
      const res = await fetch('https://api.mercadolibre.com/sites/MLA/search?q=placa+video')
      const response = await res.json()
      setProducts(response.results)
      return response.results
    } catch (error) {
      console.log(error)
    }
  }


  useEffect(() => {
    const allProducts = () => {
      if (filteredProducts && filteredProducts.length > 1) {
        setFilteredProducts([])
      } else if (!products && filteredProducts.length < 0) {
        setProducts(filteredProducts)
        getDataResults()
      } else {
        getDataResults()
      }
    }
    console.log('i fire in App');
    return allProducts()
  }, [filteredProducts])


  return (
    <div className="App">
      <Router>
        <Menu cart={cart} logo={logo} total={total} products={products} setFilteredProducts={setFilteredProducts} filteredProducts={filteredProducts} />
        <Container>
          <Switch>
            <Route
              exact
              path='/'>
              <Shop products={products} cart={cart} total={total} setCart={setCart} setTotal={setTotal} filteredProducts={filteredProducts} setFilteredProducts={setFilteredProducts} status={status} setStatus={setStatus} />
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
              <ItemList products={products} setProducts={setProducts} cart={cart} total={total} setCart={setCart} setTotal={setTotal} filteredProducts={filteredProducts} setFilteredProducts={setFilteredProducts} status={status} setStatus={setStatus} />
            </Route>

          </Switch>
        </Container>
      </Router>
    </div>
  );
}

export default App;
