import { useDataContext } from '../../Context/GeneralContext'
import ItemCartBox from './ItemCartBox'
import { useHistory } from 'react-router-dom'

const Cart = () => {
    const history = useHistory()
    const {
        states, functions }
        = useDataContext()

    const emptyCart = <div><p className="text-muted">Tu carrito esta vacio.</p></div>
    if (states.cart.length === 0) return emptyCart
    return (
        <>
            <div className="card cart col-12 col-md-6 offset-md-3 shadow">
                <div className="cart-body">
                    {
                        states.cart && states.cart.length > 0 ? (
                            states.cart.map((v, i) => {
                                return <ItemCartBox key={i} price={v.price} id={v.id} product={v} qty={v.qty}> {v.title} </ItemCartBox>
                            })
                        ) : (<li> Sin productos en el carrito. </li>)
                    }
                </div>
                <div className="cart-price">
                    Total
                    {states.total && states.total > 0 ? <p>$ {states.total}</p> : <p>$ {states.total}</p>}
                </div>
            </div>

            <div className="card cart col-12 col-md-6 offset-md-3 pb-5">
                <p className="text-muted mb-2 text-center">Finish your order</p>
                <div className="cart-order w-100 px-5 py-3">
                    <form onSubmit={(e) => functions.placeOrder(e, history)}>
                        <input type="text" name="name" placeholder={'Your Name'} value={states.name} onChange={(e) => functions.setName(e.target.value)} required className="form-control mb-2" />
                        <input type="text" name="lastname" placeholder="Your Lastname" value={states.lastName} onChange={(e) => functions.setLastname(e.target.value)} required className="form-control mb-2" />
                        <input type="tel" name="phone" placeholder="Your Phone number" value={states.phone} onChange={(e) => functions.setPhone(e.target.value)} required className="form-control mb-2" />
                        <input type="email" name="email" placeholder="Your Email" value={states.email} onChange={(e) => functions.setEmail(e.target.value)} required className="form-control mb-2" />
                        <button type="submit">Place order</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Cart
