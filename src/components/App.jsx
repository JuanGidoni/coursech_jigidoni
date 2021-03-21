import { useState, useEffect } from 'react'
import '../components/styles/App.css'
import Menu from './Menu'
import img1 from './assets/products/1.png'
import img2 from './assets/products/2.png'
import img3 from './assets/products/3.png'
import Shop from './Pages/Shop'
import Cart from './Pages/Cart'
import logo from './assets/logo.svg';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
// import PrivateRoute from './Pages/PrivateRoutes' // Esto se utilizara en un futuro (auth)
import { Container } from 'react-bootstrap'

const App = () => {

  const defaults = [
    {
      'id': 1,
      'title': 'Tarjeta Grafica Evga Geforce Rtx 3090 Xc3 Ultra A Pedido',
      'category': 'placas',
      'price': 1014849,
      'description': 'La EVGA GeForce RTX 3090 es colosalmente poderosa en todos los sentidos imaginables, lo que le brinda un nivel completamente nuevo de rendimiento con una resolución de 8K. Está impulsado por la arquitectura NVIDIA Ampere, que duplica el trazado de rayos y el rendimiento de la IA con núcleos RT mejorados, núcleos Tensor y nuevos multiprocesadores de transmisión. Combinado con la próxima generación de diseño, refrigeración y overclocking con EVGA Precision X1, la serie EVGA GeForce RTX 3090 redefine la definición de máximo rendimiento.',
      'img': img1
    }, {
      'id': 2,
      'title': 'Gigabyte GeForce RTX 3090 Gaming OC 24G',
      'category': 'placas',
      'price': 339202,
      'description': 'Gigabyte GeForce RTX 3090 Gaming OC 24G Graphics Double Data Rate 6X GV-N 3090 Gaming OC-24GD Tarjeta De Video',
      'img': img2
    }, {
      'id': 3,
      'title': 'Placa Video Geforce Asus Rtx 3090 24gb Rog Strix Oc Mexx 1',
      'category': 'placas',
      'price': 1018834,
      'description': `- Marca : ASUS
      - Modelo : ROG Strix GeForce RTX 3090
      - P/N : ROG-STRIX-RTX3090-O24G-GAMING
      - UPC : 192876928622
      - Chipset : NVIDIA GeForce RTX 3090
      - Coolers : 3
      - Pci Express : PCIe 4.0 16x
      - DirectX : 12
      - OpenGl : 4.6
      - Memoria : GDDR6X 24GB
      - Bits : 384
      - CUDA Cores : 10496
      - Core Clock : 1890 MHz
      - Mem Clock : 19.5 Gbps
      - Alimen. Suple : 3 x 8-pin
      - Fuente optima : 800w
      - Vga : No
      - Dvi : No
      - Hdmi : 2
      - Display Port : 3
      - Máximos displays soportados : 4
      - Perfil Bajo : No
      - Backplate : Si
      - Dimensiones : 31.85 x 14.01 x 5.78 CM
      - Slots PCI-e : 2,9
      - Iluminacion : Si`,
      'img': img3
    },
  ]

  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])

  useEffect(() => {
    const allProducts = setProducts(defaults);

    return allProducts
  }, [])


  return (
    <div className="App">
      <Router>
        <Menu cart={cart} logo={logo} total={total} products={products} setFilteredProducts={setFilteredProducts} filteredProducts={filteredProducts} />
        <Container>
          <Switch>
            <Route
              exact
              path='/'
              render={(props) => (
                <Shop {...props} products={products} cart={cart} total={total} setCart={setCart} setTotal={setTotal} filteredProducts={filteredProducts} setFilteredProducts={setFilteredProducts} />
              )}
            />
            <Route
              exact
              path='/cart'
              render={(props) => (
                <Cart {...props} products={products} cart={cart} total={total} setCart={setCart} setTotal={setTotal} />
              )}
            />
          </Switch>
        </Container>
      </Router>
    </div>
  );
}

export default App;
