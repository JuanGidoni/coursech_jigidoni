import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Card from '../../Card'
import { useDataContext } from '../../Context/GeneralContext'
import { Row, Col } from 'react-bootstrap'

const Category = () => {
    const { id } = useParams()

    const { filteredProducts, MatchItem, setFiltered, setCart, cart, total, setTotal, qty, setQty, categories, setLoading } = useDataContext()
    useEffect(() => {

        const gCatRes = () => {
            setLoading(true)
            const itemName = categories.find(v => v.id === id.toString() ? v : false)
            MatchItem(itemName.item.name, 'categories')
            setFiltered(true)
        }
        return gCatRes()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])
    return (
        <div className="list-group">
            <Row>
                {filteredProducts && filteredProducts.length > 0 ? filteredProducts.map((v, i) => (
                    <Col md="4" key={i}>
                        <Card key={i}
                            id={v.id}
                            image={v.item.img}
                            cart={cart}
                            setCart={setCart}
                            available_quantity={v.item.stock}
                            price={v.item.price}
                            title={v.item.title}
                            total={total}
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
