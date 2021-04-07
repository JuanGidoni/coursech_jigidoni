import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'
import ItemContainer from './ItemContainer'
import { useDataContext } from '../../Context/GeneralContext'

const ItemList = () => {

    const { itemId } = useParams();

    const { filteredProducts, status, setFiltered, MatchItem, formatString } = useDataContext()
    



    useEffect(() => {
        if (itemId) {
            setFiltered(true)
            MatchItem(itemId)
        }

    }, [itemId])

    return (
        <div className="list-group">
            <Row>
                {filteredProducts && filteredProducts.length > 0 ? filteredProducts.map((v, i) => (
                    <Col md="4" key={i}>
                        <ItemContainer key={i}
                            id={v.id}
                            image={v.thumbnail}
                            available_quantity={v.available_quantity}
                            price={v.price}
                            title={formatString(v.title, 35)}
                            seller={v.seller}
                        />
                    </Col>
                )) : status.message
                }
            </Row>
        </div>
    )
}

export default ItemList
