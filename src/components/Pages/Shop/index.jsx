import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Card from '../../Card'
import { Row, Col } from 'react-bootstrap'
import { useDataContext } from '../../Context/DataContext'
import Loader from '../../Loader'

const Shop = () => {
    const { categoryId } = useParams();
    //local loading
    const [loading, setLoading] = useState(true)
    const { categories, setProducts, products, db } = useDataContext()

    useEffect(() => {
        setLoading(true)
        if (categoryId) {
            const filterCategoryName = categories.find(i => i.id === categoryId)
            const itemCollection = db.collection("items")
            const catFilter = itemCollection.where('categoryId', '==', filterCategoryName.item.name)
            catFilter.get().then(querySnapshot => {
                if (querySnapshot.size === 0) {
                    console.log('no category found')
                } else {
                    setProducts(querySnapshot.docs.map(doc => ({
                        id: doc.id,
                        item: doc.data()
                    })))
                }
            }).catch((err) => {
                console.log(err)
            }).finally(() => {
                setLoading(false)
            })
        }else {
            const itemCollection = db.collection("items")
            itemCollection.get().then(querySnapshot => {
                if (querySnapshot.size === 0) {
                    console.log('item not found or empty')
                } else {
                    setProducts(querySnapshot.docs.map(doc => ({
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [categoryId])
    return (
        loading ? <Loader /> :
            <div className="list-group">
                <Row>
                    {products && products.length > 0 ? products.map((v, i) => (
                        <Col md="4" key={i} className="mb-3 p-1">
                            <Card key={i}
                                id={v.id}
                                image={v.item.img}
                                available_quantity={v.item.stock}
                                price={parseInt(v.item.price)}
                                title={v.item.title}
                                free_shipping={v.item.free_shipping}
                            />
                        </Col>
                    )) : 'No has seleccionado ningun item o no existen productos'
                    }
                </Row>
            </div>
    )
}

export default Shop
