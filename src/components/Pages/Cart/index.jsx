import { useState } from 'react'
import { useDataContext } from '../../Context/GeneralContext'
import ItemCartBox from './ItemCartBox'
import firebase from 'firebase/app'
import { getFirestore } from '../../Firebase'
import { useHistory } from 'react-router-dom'

const Cart = () => {
    const history = useHistory()
    const { cart, total, setOrders, orders, setCart, setTotal, setFilteredProducts, setTotalItems } = useDataContext()
    const [name, setName] = useState('')
    const [lastName, setLastname] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const db = getFirestore

    let order = {}

    const placeOrder = (e) => {
        e.preventDefault()
        order.date = firebase.firestore.Timestamp.fromDate(new Date());
        order.total = total
        order.items = cart && cart.map(
            cartItem => {
                const id = cartItem.id
                const title = cartItem.title
                const price = cartItem.price
                return { id, title, price }
            }
        )
        order.buyer = { name, lastName, phone, email }
        const orderCollection = db.collection('orders')
        orderCollection.add(order)
            .then(doc => {
                setOrders([...orders, { id: doc.id, order: order }])
                setCart([])
                setFilteredProducts([])
                setTotal(0)
                setTotalItems(0)
                history.push('/orders/' + doc.id)
            })
            .catch(err => {
                console.log(err)
            })
            .finally((doc) => {
                console.log('Orden terminada...')
            })
        const itemsToUpdate = db.collection('items').where(
            firebase.firestore.FieldPath.documentId(), 'in', cart.map(i => i.id)
        )
        const batch = db.batch()

        itemsToUpdate.get()
            .then(collection => {
                collection.docs.forEach(docSnapshot => {
                    batch.update(docSnapshot.ref, {
                        stock: docSnapshot.data().stock - cart.find(item => item.id === docSnapshot.id).qty
                    })
                })
                batch.commit().then(res => {
                    console.log('resultado batch', res)
                })
            })
    }

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
                    <form onSubmit={(e) => placeOrder(e)}>
                        <input type="text" name="name" placeholder={'Your Name'} value={name} onChange={(e) => setName(e.target.value)} required className="form-control mb-2" />
                        <input type="text" name="lastname" placeholder="Your Lastname" onChange={(e) => setLastname(e.target.value)} required className="form-control mb-2" />
                        <input type="tel" name="phone" placeholder="Your Phone number" onChange={(e) => setPhone(e.target.value)} required className="form-control mb-2" />
                        <input type="email" name="email" placeholder="Your Email" onChange={(e) => setEmail(e.target.value)} required className="form-control mb-2" />
                        <button type="submit">Place order</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Cart
