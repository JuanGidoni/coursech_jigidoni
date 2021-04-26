import React, { useContext, useState, useEffect } from "react"
import { getFirebase, getFirestore } from '../Firebase'

const CartContext = React.createContext()

export function useCartContext() {
    return useContext(CartContext)
}

export function CartProvider({ children, ...props }) {

    const db = getFirestore
    const fb = getFirebase
    const batch = db.batch()

    const [cart, setCart] = useState([])
    const [total, setTotal] = useState(0);
    const [orders, setOrders] = useState([])
    const [added, setAdded] = useState(false)
    const [qty, setQty] = useState(1)
    const [totalItems, setTotalItems] = useState(0)
    const [founded, setFounded] = useState(false)
    const [localOrder, setLocalOrder] = useState([])
    const [name, setName] = useState('')
    const [lastName, setLastname] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [orderFound, setOrderFound] = useState([])

    const handleRemoveItem = (p) => {
        if (cart && cart.length > 0) {
            const idx = cart.findIndex(v => v.id === p.id);
            if (idx >= 0 ? 1 : 0) {
                setAdded(false)
                const temp = [...cart];
                temp.splice(idx, idx >= 0 ? 1 : 0);
                setCart(temp);
                setTotal(total - p.price * p.qty)
                setTotalItems(totalItems - p.qty)
            } else {
                console.log('item not exist')
            }
        } else {
            console.log('cart empty')
        }
    }


    const addToCart = (p) => {
        if (cart && cart.length > 0) {
            const idx = cart.findIndex(v => v.id === p.id);
            if (idx >= 0 ? 1 : 0) {
                setAdded(false)
            } else {
                setTotalItems(totalItems + p.qty)
                setCart([...cart, p])
                setQty(p.qty)
                setTotal(total + p.price * p.qty)
                setAdded(true)
            }
        } else {
            setTotal(total + p.price * p.qty)
            setTotalItems(p.qty)
            setCart([...cart, p])
            setQty(p.qty)
            setAdded(true)
        }
    }

    const checkAddedCart = (id) => {
        if (cart && cart.length > 0) {
            const itemFound = cart.some(item => item.id === id)
            itemFound ? setAdded(true) : setAdded(false)
        } else {
            setAdded(false)
        }
    }

    function formatString(text, length) {
        if (text == null) {
            return "";
        }
        if (text.length <= length) {
            return text;
        }
        text = text.substring(0, length);
        let last = text.lastIndexOf(" ");
        text = text.substring(0, last);
        return text + "...";
    }

    const placeOrder = (e, h) => {
        e.preventDefault()
        let order = {}
        order.date = fb.firestore.Timestamp.fromDate(new Date());
        order.total = total
        order.items = cart && cart.map(
            cartItem => {
                const id = cartItem.id
                const title = cartItem.title
                const price = cartItem.price
                const qty = cartItem.qty
                return { id, title, price, qty }
            }
        )
        order.buyer = { name, lastName, phone, email }
        const orderCollection = db.collection('orders')
        orderCollection.add(order)
            .then(doc => {
                setOrders([...orders, { id: doc.id, order: order }])
                h.push('/orders/' + doc.id)
            })
            .catch(err => {
                console.log(err)
            })
            .finally((doc) => {
                setCart([])
                setTotal(0)
                setTotalItems(0)
                console.log('Orden terminada...', doc)
            })
        const itemsToUpdate = db.collection('items').where(
            fb.firestore.FieldPath.documentId(), 'in', cart.map(i => i.id)
        )

        itemsToUpdate.get()
            .then(collection => {
                collection.docs.forEach(docSnapshot => {
                    batch.update(docSnapshot.ref, {
                        stock: docSnapshot.data().stock - cart.find(item => item.id === docSnapshot.id).qty
                    })
                })
                batch.commit().then(res => console.log('resultado batch', res)
                ).catch(err => console.log(err))
            })
    }

    useEffect(() => {
            const orderCollection = db.collection("orders")
            orderCollection.get().then(querySnapshot => {
                
                    if (querySnapshot.size === 0) {
                        setOrders([])
                    } else {
                        setOrders(...orders, querySnapshot.docs.map(doc => ({
                            id: doc.id,
                            order: doc.data()
                        })))
                    }
            }).catch((err) => {
                console.log(err)
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const value = {
        placeOrder,
        checkAddedCart,
        setQty,
        setAdded,
        setCart,
        addToCart,
        setTotal,
        formatString,
        setTotalItems,
        handleRemoveItem,
        setOrders,
        setLocalOrder,
        setOrderFound,
        setFounded,
        setName,
        setLastname,
        setEmail,
        setPhone,
        localOrder,
        founded,
        name,
        orderFound,
        lastName,
        phone,
        email,
        cart,
        qty,
        total,
        totalItems,
        added,
        orders
    }

    return (
        <CartContext.Provider value={value} props={props}>
            {children}
        </CartContext.Provider>
    )
}
