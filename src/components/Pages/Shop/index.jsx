import { useEffect } from 'react'
import Card from '../../Card'
import { Row, Col } from 'react-bootstrap'
import ItemContainer from './ItemContainer'

const Shop = ({
    cart, setCart, total, setTotal, products, className, filteredProducts, setFilteredProducts, setStatus, status, setFiltered, filtered
}) => {
    useEffect(() => {
        const shopItems = () => {
            if (filtered) {
                setFilteredProducts([])
                setFiltered(false)
            } else {
                setFiltered(true)
            }
        }
        console.log('i fire in Shop');
        return shopItems()
    }, [])
    return (
        <div className="list-group">
            <Row>
                {filteredProducts && filteredProducts.length > 0 ? filteredProducts.map((v, i) => (
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
                            setStatus={setStatus}
                            status={status}
                            setFilteredProducts={setFilteredProducts}
                        />
                    </Col>
                )) :
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
                    )) : 'No has seleccionado ningun item o no existen productos'
                }
            </Row>
        </div>
    )
}

export default Shop
