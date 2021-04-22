import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Card from '../../Card'
import { useDataContext } from '../../Context/GeneralContext'
import { Row, Col } from 'react-bootstrap'
import { getFirestore } from '../../Firebase'
import Loader from '../../Loader'

const Category = () => {
    const { id } = useParams()
    const db = getFirestore
    const { setFilteredCategory, categories, setStatus, filteredCategory, setCart, cart, total, setTotal, qty, setQty, setLoading } = useDataContext()

    useEffect(() => {
        setFilteredCategory([])
        const filterCategoryName = categories.find(i => i.id === id)
        console.log(filterCategoryName)
        const itemCollection = db.collection("items")
                const catFilter = itemCollection.where('categoryId', '==', filterCategoryName.item.name)
                catFilter.get().then(querySnapshot => {
                    if (querySnapshot.size === 0) {
                        setStatus({
                            state: true,
                            id: null,
                            message: `Items not found or empty...`,
                            error: true
                        })
                    } else {
                        setFilteredCategory(querySnapshot.docs.map(doc => ({
                            id: doc.id,
                            item: doc.data()
                        })))
                    }
                }).catch((err) => {
                    console.log(err)
                    setStatus({
                        state: true,
                        id: null,
                        message: `Failed to fetch items category or server response 404/500`,
                        console: err,
                        error: true
                    })
                }).finally(() => {
                    setLoading(false)
                })


        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])
    return (
        <div className="container">
            <Row>
                {filteredCategory && filteredCategory.length > 0 ? filteredCategory.map((v, i) => (
                    <Col md="4" key={i}>
                        <Card key={i}
                            id={v.id}
                            image={v.item.img}
                            cart={cart}
                            setCart={setCart}
                            available_quantity={v.item.stock}
                            price={v.item.price}
                            title={v.item.title}
                            total={total}
                            setTotal={setTotal}
                            qty={qty}
                            setQty={setQty}
                        />
                    </Col>
                )) : <Loader />
                }
            </Row>
        </div>
    )
}

export default Category
