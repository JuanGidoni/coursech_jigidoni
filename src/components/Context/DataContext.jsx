import React, { useContext, useState, useEffect } from "react"
import Loader from "../Loader";
import { getFirestore } from '../Firebase'

const DataContext = React.createContext()

export function useDataContext() {
    return useContext(DataContext)
}

export function DataProvider({ children, ...props }) {


    const db = getFirestore

    const [loading, setLoading] = useState(true)
    const [filtered, setFiltered] = useState(false)
    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])
    const [filteredProducts, setFilteredProducts] = useState([])
    const [filteredCategory, setFilteredCategory] = useState([])


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
    const getCategories = () => {
        const categoryCollection = db.collection("categories")
        categoryCollection.get().then(querySnapshot => {
            if (querySnapshot.size === 0) {
                console.log('Categories not found or empty...')
            } else {
                setCategories(querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    item: doc.data()
                })))
            }
        }).catch((err) => {
            console.log(err)
        }).finally(() => {
            setLoading(false)
        })
    }

    useEffect(() => {
        setLoading(true)
        getCategories()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const value = {
        db,
        getCategories,
        setFilteredCategory,
        setLoading,
        setProducts,
        setFiltered,
        setFilteredProducts,
        formatString,
        loading,
        filtered,
        filteredProducts,
        filteredCategory,
        categories,
        products,
    }

    return (
        <DataContext.Provider value={value} props={props}>
            {loading ? <Loader /> : children}
        </DataContext.Provider>
    )
}
