import React from 'react'
import Home from '../Pages/Home'
import Shop from '../Pages/Shop'
import Cart from '../Pages/Cart'

const Inicio = (props) => {
    return (
        <Home props={props} />
    )
}

const Tienda = (props) => {
    return (
        <Shop cart={props.cart} setCart={props.setCart} total={props.total} setTotal={props.setTotal} products={props.products} className="flex"/>
    )
}

const Carrito = (props) => {
    return (
        <Cart cart={props.cart} setCart={props.setCart} total={props.total} setTotal={props.setTotal} />
    )
}

export {
    Inicio,
    Tienda,
    Carrito
  }