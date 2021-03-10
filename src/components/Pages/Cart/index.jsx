import React from 'react'

const Cart = (props) => {
    let newTotal = 0
    return (
        <div className="card cart">
            Tu carrito: 
            <br/>
            {
                props.cart && props.cart.length > 0 ? (
                    props.cart.map((v,i) => {
                        newTotal += props.total+v.price
                        return <li key={i} >{v.title} | $ {v.price} </li>
                    })
                ) : <li> Tu carrito esta vació. </li> 

            }
            <p className="total">Total: $ {newTotal}</p>
        </div>
    )
}

export default Cart
