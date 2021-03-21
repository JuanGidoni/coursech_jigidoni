import React from 'react'

const Cart = ({
    cart, setCart, total, setTotal
}) => {
    return (
        <div className="card cart">
            Tu carrito: 
            <br/>
            {
                cart && cart.length > 0 ? (
                    cart.map((v,i) => {
                        return <li key={i} >{v.title} | $ {v.price} </li>
                    })
                ) : <li> Sin productos en el carrito. </li> 

            }
            <p className="total">Total: $ {total}</p>
        </div>
    )
}

export default Cart
