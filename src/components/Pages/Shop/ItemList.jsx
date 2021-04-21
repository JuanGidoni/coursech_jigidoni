import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'
import ItemContainer from './ItemContainer'
import { useDataContext } from '../../Context/GeneralContext'
import Loader from '../../Loader'

const ItemList = () => {

    const { itemId } = useParams();

    const { filteredProducts,
        status,
        setFiltered,
        MatchItem,
        formatString,
        loading,
        setLoading,
        qty,
        setAdded,
        added,
        cart,
        setQty } = useDataContext()

    const checkIfItemInCart = async () => {
        if (cart && cart.length > 0) {
            const findItem = cart.find(item => item.id === itemId);
            return findItem ? true : false
        } else {
            return false
        }
    }


    useEffect(() => {
        if (itemId) {
            setFiltered(true)
            MatchItem(itemId, 'product')
            setLoading(false)
            setQty(0)
            checkIfItemInCart().then(
                (res) => res ? setAdded(true) : setAdded(false)
            ).catch(err => console.log(err))
        }
        console.log('itemlist render')
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [itemId])

    return (
        <div className="list-group">
            {loading ? <Loader /> :
                <Row>
                    {filteredProducts && filteredProducts.length > 0 ? filteredProducts.map((v, i) => (
                        <Col md="12" key={i}>
                            <ItemContainer key={i}
                                id={v.id}
                                image={v.item.img}
                                available_quantity={v.item.stock}
                                price={v.item.price}
                                title={formatString(v.item.title, 35)}
                                qty={qty}
                                setQty={setQty}
                                added={added}
                            />
                        </Col>
                    )) : status.message
                    }
                </Row>
            }
        </div>
    )
}

export default ItemList
