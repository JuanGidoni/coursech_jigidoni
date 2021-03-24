import Card from '../../Card'
import { Row, Col } from 'react-bootstrap'
import ItemContainer from './ItemContainer'

const Shop = ({
    cart, setCart, total, setTotal, products, className, filteredProducts, setFilteredProducts
}) => {
    return (
        <div className="list-group">
            <Row>
                {

                    products && products.length > 0 ? products.map((v, i) => (
                        <Col md="4" key={i}>
                            <Card key={v.id}
                                i={i}
                                image={v.thumbnail}
                                cart={cart}
                                setCart={setCart}
                                available_quantity={v.available_quantity}
                                price={v.price}
                                title={v.title}
                                total={total}
                                seller={v.seller}
                                setTotal={setTotal}
                            />
                        </Col>
                    )) : filteredProducts && filteredProducts.length > 0 ? filteredProducts.map((v, i) => (
                        <Col md="4" key={i}>
                            <ItemContainer key={v.id}
                                i={i}
                                image={v.thumbnail}
                                cart={cart}
                                setCart={setCart}
                                available_quantity={v.available_quantity}
                                price={v.price}
                                title={v.title}
                                total={total}
                                seller={v.seller}
                                setTotal={setTotal}
                                setFilteredProducts={setFilteredProducts}
                            />
                        </Col>
                    )) : 'No has seleccionado ningun item o no existen productos'
                }
            </Row>
        </div>
    )
}

export default Shop
