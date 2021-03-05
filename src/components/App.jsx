import { useState } from 'react'
import '../components/styles/App.css';
import Header from './Header'
import Navbar from './Navbar'
import {Inicio, Tienda, Carrito} from './Pages'
function App() {

  const goTo = (n) => {
    setPage(n)
  }
  const [page, setPage] = useState(0);

  return (
    <div className="App">
      <Header />
      <Navbar goTo={goTo} />
      {page == 1 ? (
        <Inicio index={1} />
      ) : page == 2 ? (
        <Tienda index={2} />
      ) : (
        <Carrito index={3} />
      )}
    </div>
  );
}

export default App;
