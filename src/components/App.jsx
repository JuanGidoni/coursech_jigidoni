import { useState, useEffect } from 'react'
import '../components/styles/App.css';
import Header from './Header'
import Navbar from './Navbar'
import img1 from './assets/products/1.png'
import {Inicio, Tienda, Carrito} from './Pages'
function App() {

  const goTo = (n) => {
    setPage(n)
  }
  const defaults = [
    {
      'id': 1,
      'title': 'Product 1',
      'price': 250,
      'description': 'Description product number 1',
      'img': img1
    },{
      'id': 2,
      'title': 'Product 2',
      'price': 8250,
      'description': 'Description product number 2',
    },{
      'id': 3,
      'title': 'Product 3',
      'price': 1250,
      'description': 'Description product number 3',
    },
  ]
  const [page, setPage] = useState(0);
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [products, setProducts] = useState([])

  useEffect(() => {
      setProducts(defaults)
  }, [])
  
  return (
    <div className="App">
      <Header />
      <Navbar goTo={goTo} cart={cart} />
      {page === 1 ? (
        <Carrito cart={cart} setCart={setCart} total={total} setTotal={setTotal} />
      ) : page === 2 ? (
        <Tienda cart={cart} setCart={setCart} total={total} setTotal={setTotal} products={products} />
      ) : (
        <Inicio />
      )}
    </div>
  );
}

export default App;
