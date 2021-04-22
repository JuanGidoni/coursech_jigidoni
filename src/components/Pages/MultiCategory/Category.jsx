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
    const { functions, states } = useDataContext()

    useEffect(() => {
        functions.setFilteredCategory([])
        
        const filteringCats = () => {
            const filterCategoryName = states.categories.find(i => i.id === id)
        console.log(filterCategoryName)
        const itemCollection = db.collection("items")
        const catFilter = itemCollection.where('categoryId', '==', filterCategoryName.item.name)
        catFilter.get().then(querySnapshot => {
            if (querySnapshot.size === 0) {
                functions.setStatus({
                    state: true,
                    id: null,
                    message: `Items not found or empty...`,
                    error: true
                })
            } else {
                functions.setFilteredCategory(querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    item: doc.data()
                })))
            }
        }).catch((err) => {
            console.log(err)
            functions.setStatus({
                state: true,
                id: null,
                message: `Failed to fetch items category or server response 404/500`,
                console: err,
                error: true
            })
        }).finally(() => {
            functions.setLoading(false)
        })
        }

        return filteringCats()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])
    return (
        <div className="container">
            <Row>
                {states.filteredCategory && states.filteredCategory.length > 0 ? states.filteredCategory.map((v, i) => (
                    <Col md="4" key={i}>
                        <Card key={i}
                            id={v.id}
                            image={v.item.img}
                            cart={states.cart}
                            setCart={functions.setCart}
                            available_quantity={v.item.stock}
                            price={parseInt(v.item.price)}
                            title={v.item.title}
                            total={states.total}
                            setTotal={functions.setTotal}
                            qty={states.qty}
                            setQty={functions.setQty}
                        />
                    </Col>
                )) : <Loader />
                }
            </Row>
        </div>
    )
}

export default Category
