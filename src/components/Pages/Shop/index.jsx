import React from 'react'
import Card from '../../Card'
import { Row, Col } from 'react-bootstrap'

const Shop = ({
    cart, setCart, total, setTotal, products, className, filteredProducts, setFilteredProducts
}) => {
    return (
        <Row>
            {products && products.length > 0 && filteredProducts.length < 1 ? products.map((v, i) => (
                <Col md="4" key={i}>
                    <Card key={i}
                        image={v.img}
                        cart={cart}
                        setCart={setCart}
                        price={v.price}
                        title={v.title}
                        description={v.description}
                        total={total}
                        setTotal={setTotal}
                    />
                </Col>
            )) : filteredProducts && filteredProducts.length > 0 ? filteredProducts.map((v, i) => (
                <Col md="4" key={i}>
                    <Card key={i}
                        image={v.img}
                        cart={cart}
                        setCart={setCart}
                        price={v.price}
                        title={v.title}
                        description={v.description}
                        total={total}
                        setTotal={setTotal}
                    />
                </Col>
            )) : 'Lista de productos vacia.'
            }
        </Row>
    )
}

export default Shop
