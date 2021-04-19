import React, { useContext, useState, useEffect } from "react"
import Loader from "../Loader";
import { getFirestore } from '../Firebase'
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

    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);
    const [filtered, setFiltered] = useState(false)
    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])
    const [filteredProducts, setFilteredProducts] = useState([])
    const [added, setAdded] = useState(false)
    const [qty, setQty] = useState(0)
    const [totalItems, setTotalItems] = useState(0)

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
        try {
            if (filtro === 'product') {
                products.map((v, i) => (
                    valor === v.id && setFilteredProducts([v])
                ))
                setLoading(false)
            } else if (filtro === 'categories') {
                products.map((v, i) => (
                    valor === v.item.categoryId && setFilteredProducts([v])
                ))
                setLoading(false)
            } else {
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


    useEffect(() => {
        const unsubscribe = () => {
            setLoading(true)
            const db = getFirestore

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
            // getDataResults('notebooks')
        }

        return unsubscribe()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const value = {
        getDataResults,
        checkAddedCart,
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
        cart,
        qty,
        total,
        loading,
        totalItems,
        filtered,
        filteredProducts,
        categories,
        added,
        status,
        products,
    }

    return (
        <DataContext.Provider value={value} props={props}>
            {loading ? <Loader /> : children}
        </DataContext.Provider>
    )
}