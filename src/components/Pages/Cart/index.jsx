import React from 'react'
import { useDataContext } from '../../Context/GeneralContext'
import ItemCartBox from './ItemCartBox'

const Cart = () => {
    const { cart, total } = useDataContext()
    return (
        <div className="card cart col-6 offset-3">
            Tu carrito: 
            <br/>
            {
                cart && cart.length > 0 ? (
                    cart.map((v,i) => {
                        return <ItemCartBox key={i} price={v.price} id={v.id} product={v} qty={v.qty}> {v.title} </ItemCartBox>
                    })
                ) : (<li> Sin productos en el carrito. </li>)
            }
            <br/>
            {
                total && total === 0 ? (
                    <p className="total">Total: 0{total}</p>
                    ) : (
                        <p className="total">Total: $ {total}</p>
                    )
            }
            
        </div>
    )
}

export default Cart
