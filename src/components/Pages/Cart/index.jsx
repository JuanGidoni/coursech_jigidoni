import { useCartContext } from '../../Context/CartContext'
import ItemCartBox from './ItemCartBox'
import { useHistory } from 'react-router-dom'

const Cart = () => {
    const history = useHistory()
    const {
        cart, total, name, lastName, phone, email,
        setName, setLastname, setPhone, setEmail,
        placeOrder }
        = useCartContext()

    const emptyCart = <div><p className="text-muted">Tu carrito esta vacio.</p></div>
    if (cart.length === 0) return emptyCart
    return (
        <>
            <div className="card cart col-12 col-md-6 offset-md-3 shadow">
                <div className="cart-body">
                    {
                        cart && cart.length > 0 ? (
                            cart.map((v, i) => {
                                return <ItemCartBox key={i} price={v.price} id={v.id} product={v} qty={v.qty}> {v.title} </ItemCartBox>
                            })
                        ) : (<li> Sin productos en el carrito. </li>)
                    }
                </div>
                <div className="cart-price">
                    Total
                    {total && total > 0 ? <p>$ {total}</p> : <p>$ {total}</p>}
                </div>
            </div>

            <div className="card cart col-12 col-md-6 offset-md-3 pb-5">
                <p className="text-muted mb-2 text-center">Finish your order</p>
                <div className="cart-order w-100 px-5 py-3">
                    <form onSubmit={(e) => placeOrder(e, history)}>
                        <input type="text" name="name" placeholder={'Your Name'} value={name} onChange={(e) => setName(e.target.value)} required className="form-control mb-2" />
                        <input type="text" name="lastname" placeholder="Your Lastname" value={lastName} onChange={(e) => setLastname(e.target.value)} required className="form-control mb-2" />
                        <input type="tel" name="phone" placeholder="Your Phone number" value={phone} onChange={(e) => setPhone(e.target.value)} required className="form-control mb-2" />
                        <input type="email" name="email" placeholder="Your Email" value={email} onChange={(e) => setEmail(e.target.value)} required className="form-control mb-2" />
                        <button type="submit">Place order</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Cart
