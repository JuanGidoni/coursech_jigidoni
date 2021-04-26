import '../components/styles/App.css'
import Menu from './Menu'
import Shop from './Pages/Shop'
import Cart from './Pages/Cart'
import { DataProvider } from './Context/DataContext'
import { CartProvider } from './Context/CartContext'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
// import PrivateRoute from './Pages/PrivateRoutes' // Esto se utilizara en un futuro (auth)
import { Container } from 'react-bootstrap'
import Item from './Pages/Shop/Item'
import './styles/App.css'
import OrderList from './Pages/Orders'
import Order from './Pages/Orders/Order'
import Footer from './Footer'

const App = () => {


  return (
    <div className="App">
      <Router>
        <DataProvider>
          <CartProvider>
            <Menu />

            <Container className="content">

              <Switch>
                <Route
                  exact
                  path={['/', '/category/:categoryId']}>
                  <Shop />
                </Route>

                <Route
                  exact
                  path='/cart'>
                  <Cart />
                </Route>

                <Route
                  exact
                  path={['/item/:itemId', '/category/:categoryId']}>
                  <Item />
                </Route>

                <Route
                  exact
                  path='/orders'>
                  <OrderList />
                </Route>

                <Route
                  exact
                  path='/orders/:id'>
                  <Order />
                </Route>

                <Route
                  exact
                  path="*">
                  <div>Error 404, page not found.</div>
                </Route>

              </Switch>
            </Container>

            <Footer />
          </CartProvider>
        </DataProvider>
      </Router>
    </div>
  );
}

export default App;
