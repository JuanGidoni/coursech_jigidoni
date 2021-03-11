import React from 'react'
import Home from '../Pages/Home'
import Shop from '../Pages/Shop'
import Cart from '../Pages/Cart'

const Inicio = (props) => {
    return (
        <Home props={props} />
    )
}

const Tienda = ({
    cart, setCart, total, setTotal, products,
}) => {
    return (
        <Shop cart={cart} setCart={setCart} total={total} setTotal={setTotal} products={products} className="flex"/>
    )
}

const Carrito = ({
    cart, setCart, total, setTotal,
}) => {
    return (
        <Cart cart={cart} setCart={setCart} total={total} setTotal={setTotal} />
    )
}

export {
    Inicio,
    Tienda,
    Carrito
  }
  