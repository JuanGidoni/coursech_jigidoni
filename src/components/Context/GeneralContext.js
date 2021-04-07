import React, { useContext, useState, useEffect } from "react"

const DataContext = React.createContext()

export function useDataContext() {
    return useContext(DataContext)
}

export function DataProvider({ children, ...props }) {

    const [status, setStatus] = useState({
        status: false,
        id: null,
        message: null,
        error: null
    })

    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);
    const [filtered, setFiltered] = useState(false)
    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])
    const [filteredProducts, setFilteredProducts] = useState([])
    const [added, setAdded] = useState(false)


    const handleRemoveItem = (p) => {

        if (cart && cart.length > 0) {

            const idx = cart.findIndex(v => v.id === p.id);

            if (idx >= 0 ? 1 : 0) {

                setAdded(false)

                const temp = [...cart];

                temp.splice(idx, idx >= 0 ? 1 : 0);

                setCart(temp);

                setTotal(total - p.price)

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
            const res = await fetch(`https://api.mercadolibre.com/sites/MLA/search?q=${e}`)
            const response = await res.json()
            setProducts(response.results)
        } catch (error) {
            setStatus(error)
        }
    }
    const getCategoryResults = async () => {
        try {
            const res = await fetch(`https://api.mercadolibre.com//sites/MLA/categories`)
            const response = await res.json()
            setCategories(response)
        } catch (error) {
            setStatus(error)
        }
    }


    const getResultsById = async (e) => {
        try {
            const res = await fetch(`https://api.mercadolibre.com//sites/MLA/search?category=${e}`)
            const response = await res.json()
            setFilteredProducts(response.results)
        } catch (error) {
            setStatus(error)
        }
    }
    const resetStatus = (time) => {

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

                setCart([...cart, p])

                setStatus({
                    state: true,
                    id: p.id,
                    message: `Item ${p.id} added to cart +(${p.price})`,
                    error: false
                })
                setTotal(total + p.price)

                setAdded(true)

                resetStatus(2500)

            }
        } else {

            setCart([...cart, p])

            setStatus({
                state: true,
                id: p.id,
                message: `Item ${p.id} added to cart +(${p.price})`,
                error: false
            })
            setTotal(total + p.price)
            resetStatus(2000)
            setAdded(true)
        }
    }

    // this arrow function works to check if a favorite exist to set the Added style to the Favorite Button or none
    const checkAddedCart = (id) => {

        if (cart && cart.length > 0) {

            const itemFound = cart.some(item => item.id === id)

            itemFound ? setAdded(true) : setAdded(false)

        } else {

            setAdded(false)

        }

    }

    const MatchItem = async (e) => {
        try {
            await products.map((v, i) => (
                e === v.id ? setFilteredProducts([v]) : false
            ))
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
            getDataResults('notebooks')
            getCategoryResults()
        }

        return unsubscribe()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const value = {
        getDataResults,
        getCategoryResults,
        checkAddedCart,
        setProducts,
        setStatus,
        setAdded,
        setFiltered,
        setFilteredProducts,
        setCart,
        addToCart,
        setTotal,
        getResultsById,
        MatchItem,
        formatString,
        handleRemoveItem,
        cart,
        total,
        filtered,
        filteredProducts,
        categories,
        added,
        status,
        products,
    }

    return (
        <DataContext.Provider value={value} props={props}>
            {children}
        </DataContext.Provider>
    )
}