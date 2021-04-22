import Card from '../../Card'
import { Row, Col } from 'react-bootstrap'
import { useDataContext } from '../../Context/GeneralContext'

const Shop = () => {
    const {
        states
        } = useDataContext()

    return (
        <div className="list-group">
            <Row>
                {states.products && states.products.length > 0 ? states.products.map((v, i) => (
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
