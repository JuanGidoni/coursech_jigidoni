import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'
import ItemContainer from './ItemContainer'
import { useDataContext } from '../../Context/GeneralContext'
import Loader from '../../Loader'

const ItemList = () => {

    const { itemId } = useParams();

    const { states, functions } = useDataContext()

    const checkIfItemInCart = async () => {
        if (states.cart && states.cart.length > 0) {
            const findItem = states.cart.find(item => item.id === itemId);
            return findItem ? true : false
        } else {
            return false
        }
    }


    useEffect(() => {
        if (itemId) {
            functions.setFiltered(true)
            functions.MatchItem(itemId, 'product')
            functions.setLoading(false)
            functions.setQty(0)
            checkIfItemInCart().then(
                (res) => res ? functions.setAdded(true) : functions.setAdded(false)
            ).catch(err => console.log(err))
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [itemId])

    return (
        <div className="list-group">
            {states.loading ? <Loader /> :
                <Row>
                    {states.filteredProducts && states.filteredProducts.length > 0 ? states.filteredProducts.map((v, i) => (
                        <Col md="12" key={i} className="mb-3 p-1">
                            <ItemContainer key={i}
                                id={v.id}
                                image={v.item.img}
                                available_quantity={v.item.stock}
                                description={v.item.description}
                                free_shipping={v.item.free_shipping}
                                price={v.item.price}
                                title={functions.formatString(v.item.title, 35)}
                                qty={states.qty}
                                setQty={functions.setQty}
                                added={states.added}
                            />
                        </Col>
                    )) : states.status.message
                    }
                </Row>
            }
        </div>
    )
}

export default ItemList
