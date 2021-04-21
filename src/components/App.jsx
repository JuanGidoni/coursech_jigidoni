import '../components/styles/App.css'
import Menu from './Menu'
import Shop from './Pages/Shop'
import Cart from './Pages/Cart'
import { DataProvider } from './Context/GeneralContext'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
// import PrivateRoute from './Pages/PrivateRoutes' // Esto se utilizara en un futuro (auth)
import { Container } from 'react-bootstrap'
import ItemList from './Pages/Shop/ItemList'
import MultiCategory from './Pages/MultiCategory'
import Category from './Pages/MultiCategory/Category'
import ErrorBox from './ErrorBox'
import './styles/App.css'
import OrderList from './Pages/Orders'
import Order from './Pages/Orders/Order'

const App = () => {


  return (
    <div className="App">
      <Router>
        <DataProvider>

          <Menu />

          <Container>

            <ErrorBox />

            <Switch>
              <Route
                exact
                path='/'>
                <Shop />
              </Route>
              <Route
                exact
                path='/cart'>
                <Cart />
              </Route>


              <Route
                exact
                path='/item/:itemId'>
                <ItemList />
              </Route>

              <Route
                exact
                path='/categories'>
                <MultiCategory />
              </Route>

              <Route
                exact
                path='/category/:id'>
                <Category />
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

        </DataProvider>
      </Router>
    </div>
  );
}

export default App;
