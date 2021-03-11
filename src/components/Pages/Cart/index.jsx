import React from 'react'

const Cart = ({
    cart, setCart, total, setTotal
}) => {
    let newTotal = 0
    return (
        <div className="card cart">
            Tu carrito: 
            <br/>
            {
                cart && cart.length > 0 ? (
                    cart.map((v,i) => {
                        newTotal += total+v.price
                        return <li key={i} >{v.title} | $ {v.price} </li>
                    })
                ) : <li> Tu carrito esta vació. </li> 

            }
            <p className="total">Total: $ {newTotal}</p>
        </div>
    )
}

export default Cart
