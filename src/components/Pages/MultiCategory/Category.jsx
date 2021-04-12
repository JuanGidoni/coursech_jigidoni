import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Card from '../../Card'
import { useDataContext } from '../../Context/GeneralContext'
import { Row, Col } from 'react-bootstrap'

const Category = () => {
    const { id } = useParams()

    const { products, getResultsById, setFiltered, setCart, cart, total, setTotal, qty, setQty } = useDataContext()
    useEffect(() => {

        const gCatRes = () => {
            getResultsById(id)
            setFiltered(true)
        }
        return gCatRes()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])
    return (
        <div className="list-group">
            <Row>
                {products && products.length > 0 ? products.map((v, i) => (
                    <Col md="4" key={i}>
                        <Card key={i}
                            id={v.id}
                            image={v.thumbnail}
                            cart={cart}
                            setCart={setCart}
                            available_quantity={v.available_quantity}
                            price={v.price}
                            title={v.title}
                            total={total}
                            seller={v.seller}
                            setTotal={setTotal}
                            qty={qty}
                            setQty={setQty}
                        />
                    </Col>
                )) : 'No has seleccionado ningun item o no existen productos'
                }
            </Row>
        </div>
    )
}

export default Category