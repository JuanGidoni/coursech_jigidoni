import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'
import ItemDetails from './ItemDetails'
import { useDataContext } from '../../Context/DataContext'
import { useCartContext } from '../../Context/CartContext'
import Loader from '../../Loader'

const Item = () => {

    const { itemId } = useParams();
    // local loading
    const [loading, setLoading] = useState(true)

    const { setFiltered, filteredProducts, setFilteredProducts, db } = useDataContext()
    const { cart, qty, added, setQty, setAdded, formatString } = useCartContext()

    const checkIfItemInCart = async () => {
        if (cart && cart.length > 0) {
            const findItem = await cart.find(item => item.id === itemId);
            setLoading(false)
            return findItem ? true : false
        } else {
            return false
        }
    }


    useEffect(() => {
        setLoading(true)
        if (itemId) {
            setFiltered(true)
            const itemCollection = db.collection("items")
            const item = itemCollection.doc(itemId)
            item.get().then((doc) => {
                if (!doc.exists) {
                    console.log('Item does not exist!')
                    return
                }
                console.log('Item found')
                setFilteredProducts([{ id: doc.id, item: doc.data() }])
            }).catch((err) => {
                console.log(err)
            }).finally(() => {
                setLoading(false)
            })
            checkIfItemInCart().then(
                (res) => {
                    if (res) {
                        setAdded(true)
                        setQty(1)
                    } else {
                        setAdded(false)
                        setQty(1)
                    }
                }
            ).catch(err => console.log(err))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [itemId])

    return (
        <div className="list-group">
            {loading ? <Loader /> :
                <Row>
                    {filteredProducts && filteredProducts.length > 0 ? filteredProducts.map((v, i) => (
                        <Col md="12" key={i} className="mb-3 p-1">
                            <ItemDetails key={i}
                                id={v.id}
                                image={v.item.img}
                                available_quantity={v.item.stock}
                                description={v.item.description}
                                free_shipping={v.item.free_shipping}
                                price={v.item.price}
                                title={formatString(v.item.title, 35)}
                                qty={qty}
                                setQty={setQty}
                                added={added}
                            />
                        </Col>
                    )) : 'No items found'
                    }
                </Row>
            }
        </div>
    )
}

export default Item
