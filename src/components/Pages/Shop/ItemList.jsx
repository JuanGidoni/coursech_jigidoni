import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'
import ItemContainer from './ItemContainer'

const ItemList = ({ cart, setProducts, setCart, total, setTotal, products, className, filteredProducts, setFilteredProducts, status, setStatus }) => {

    const { itemId } = useParams();

    let newId = parseInt(itemId)

    const MatchItem = async () => {
        try {
            await products.map((v, i) => (
                newId === i ? setFilteredProducts([v]) : (false)
            ))
        } catch (error) {
            return setStatus(error)
        }
    }
    
    function formatString(text, length) {
        if (text == null) {
            return "";
        }
        if (text.length <= length) {
            return text;
        }
        text = text.substring(0, length);
        let last = text.lastIndexOf(" ");
        text = text.substring(0, last);
        return text + "...";
    }


    useEffect(() => {
        if(itemId)
        MatchItem()
        console.log('i fire in ItemList');

    }, [itemId])

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
                            title={formatString(v.title, 35)}
                            total={total}
                            seller={v.seller}
                            setTotal={setTotal}
                            setFilteredProducts={setFilteredProducts}
                            status={status}
                            setStatus={setStatus}
                        />
                    </Col>
                )) : status
                }
            </Row>
        </div>
    )
}

export default ItemList
