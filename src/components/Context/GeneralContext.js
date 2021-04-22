import React, { useContext, useState, useEffect } from "react"
import Loader from "../Loader";
import { getFirebase, getFirestore } from '../Firebase'

const DataContext = React.createContext()

export function useDataContext() {
    return useContext(DataContext)
}

export function DataProvider({ children, ...props }) {

    const [status, setStatus] = useState({
        status: false,
        id: null,
        message: null,
        console: null,
        error: null
    })

    const db = getFirestore
    const fb = getFirebase
    const batch = db.batch()

    const [cart, setCart] = useState([])
    const [total, setTotal] = useState(0);
    const [filtered, setFiltered] = useState(false)
    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])
    const [orders, setOrders] = useState([])
    const [filteredProducts, setFilteredProducts] = useState([])
    const [filteredCategory, setFilteredCategory] = useState([])
    const [added, setAdded] = useState(false)
    const [qty, setQty] = useState(0)
    const [totalItems, setTotalItems] = useState(0)
    const [founded, setFounded] = useState(false)
    const [localOrder, setLocalOrder] = useState([])
    const [name, setName] = useState('')
    const [lastName, setLastname] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [orderFound, setOrderFound] = useState([])


    const [loading, setLoading] = useState(true)


    const handleRemoveItem = (p) => {

        if (cart && cart.length > 0) {

            const idx = cart.findIndex(v => v.id === p.id);

            if (idx >= 0 ? 1 : 0) {

                setAdded(false)

                const temp = [...cart];

                temp.splice(idx, idx >= 0 ? 1 : 0);

                setCart(temp);

                setTotal(total - p.price * p.qty)

                setStatus({
                    state: false,
                    id: null,
                    message: `Item ${p.id} removed from the cart. -${p.price}`,
                    error: true,
                })
                resetStatus(2500)

            } else {
                setStatus({
                    state: false,
                    id: null,
                    message: `Item ${p.id} not exist.`,
                    error: true,
                })
                resetStatus(2500)
            }
        } else {
            setStatus({
                state: false,
                id: null,
                message: `Cart is empty or 404`,
                error: true,
            })
            resetStatus(2500)
        }
    }


    const getDataResults = async (e) => {
        try {
            products.filter(item => item.title.includes(e) ? item : false).map(
                (v) => (
                    setFilteredProducts(v)
                )
            )
        } catch (error) {
            setStatus(error)
        }
    }

    const resetStatus = (time) => {
        setTimeout(() => {
            setLoading(false)
        }, time - 2000);
        setTimeout(() => {
            setStatus({
                state: false,
                id: null,
                message: null,
                error: false
            })
        }, time);
    }

    const addToCart = (p) => {
        setLoading(true)
        if (cart && cart.length > 0) {
            const idx = cart.findIndex(v => v.id === p.id);

            if (idx >= 0 ? 1 : 0) {

                setAdded(false)

                setStatus({
                    state: false,
                    id: p.id,
                    message: `Item ${p.id} already in cart...`,
                    error: true
                })
                resetStatus(3000)
            } else {
                setTotalItems(totalItems + p.qty)
                setCart([...cart, p])
                setQty(p.qty)
                setStatus({
                    state: true,
                    id: p.id,
                    message: `Item ${p.id} added to cart +(${p.price}) x${p.qty} `,
                    error: false
                })
                setTotal(total + p.price * p.qty)

                setAdded(true)

                resetStatus(2500)

            }
        } else {

            setTotalItems(p.qty)

            setCart([...cart, p])
            setQty(p.qty)
            setStatus({
                state: true,
                id: p.id,
                message: `Item ${p.id} added to cart +(${p.price}) x${p.qty}`,
                error: false
            })
            setTotal(total + p.price * p.qty)
            resetStatus(2000)
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

    const MatchItem = async (valor, filtro) => {
        setLoading(true)
        try {
            if (filtro === 'product') {
                products.map((v, i) => (
                    valor === v.id && setFilteredProducts([v])
                ))
                setLoading(false)
            }else {
                setFilteredProducts([])
                setFilteredCategory('')
                setStatus({
                    state: true,
                    id: null,
                    message: `Cannot match item. Error, check line 187 Context.`,
                    error: true
                })
            }

        } catch (error) {
            return setStatus(error)
        }
    }


    const MatchOrder = async (i) => {
        setLoading(true)
        try {
            const idOrder = orders && orders.find(item => item.id === i)
            if (idOrder) {
                setFounded(true)
                setLocalOrder([idOrder])
                setLoading(false)
            } else {
                setFounded(false)
                setLocalOrder([])
                setLoading(false)
            }
        } catch (error) {
            setStatus({
                state: true,
                id: null,
                message: `Cannot match item. Error, check line 221 Context.`,
                error: true
            })
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
                h.push('/orders/' + doc.id)
            })
            .catch(err => {
                console.log(err)
            })
            .finally((doc) => {
                console.log('Orden terminada...')
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
        const unsubscribe = () => {
            setLoading(true)

            const categoryCollection = db.collection("categories")
            categoryCollection.get().then(querySnapshot => {
                if (querySnapshot.size === 0) {
                    setStatus({
                        state: true,
                        id: null,
                        message: `Categories not found or empty...`,
                        error: true
                    })
                } else {
                    setCategories(querySnapshot.docs.map(doc => ({
                        id: doc.id,
                        item: doc.data()
                    })))
                }
            }).catch((err) => {
                setStatus({
                    state: true,
                    id: null,
                    message: `Failed to fetch categories or server response 404/500`,
                    console: err,
                    error: true
                })
            })

            const itemCollection = db.collection("items")
            itemCollection.get().then(querySnapshot => {
                if (querySnapshot.size === 0) {
                    setStatus({
                        state: true,
                        id: null,
                        message: `Items not found or empty...`,
                        error: true
                    })
                } else {
                    setProducts(querySnapshot.docs.map(doc => ({
                        id: doc.id,
                        item: doc.data()
                    })))
                }
            }).catch((err) => {
                setStatus({
                    state: true,
                    id: null,
                    message: `Failed to fetch items or server response 404/500`,
                    console: err,
                    error: true
                })
            }).finally(() => {
                setLoading(false)
            })

            const orderCollection = db.collection("orders")
            orderCollection.get().then(querySnapshot => {
                if (querySnapshot.size === 0) {
                    setStatus({
                        state: true,
                        id: null,
                        message: `Not orders found`,
                        error: true
                    })
                    setOrders([])
                } else {
                    setOrders(...orders, querySnapshot.docs.map(doc => ({
                        id: doc.id,
                        order: doc.data()
                    })))
                }
            }).catch((err) => {
                setStatus({
                    state: true,
                    id: null,
                    message: `Failed to fetch orders or server response 404/500`,
                    console: err,
                    error: true
                })
            }).finally(() => {
                setLoading(false)
            })
        }

        return unsubscribe()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const value = {
        functions: {
            placeOrder,
            getDataResults,
            checkAddedCart,
            MatchOrder,
            setFilteredCategory,
            setLoading,
            setProducts,
            setQty,
            setStatus,
            setAdded,
            setFiltered,
            setFilteredProducts,
            setCart,
            addToCart,
            setTotal,
            MatchItem,
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
        },
        states: {
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
            loading,
            totalItems,
            filtered,
            filteredProducts,
            filteredCategory,
            categories,
            added,
            status,
            products,
            orders
        }
    }

    return (
        <DataContext.Provider value={value} props={props}>
            {loading ? <Loader /> : children}
        </DataContext.Provider>
    )
}
