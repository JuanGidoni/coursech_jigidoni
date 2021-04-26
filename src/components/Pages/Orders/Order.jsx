import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useCartContext } from '../../Context/CartContext'
import OrderDetails from './OrderDetails'
const Order = () => {
    const { id } = useParams()

    const { orders, orderFound, setOrderFound } = useCartContext()

    useEffect(() => {
        console.log('runing order', id, orderFound)
        if(id){
            setOrderFound([orders.find(i => i.id === id)])
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])
    return (
        <div className="orders">
            {orderFound && orderFound.length > 0 ?
                orderFound.map(item => item.id === id ?
                    <OrderDetails key={item.id} items={item.order.items} buyer={item.order.buyer} date={item.order.date} total={item.order.total} id={item.id} />
                    : 'No item found'
                ) : 'Content of the order not found'}
        </div>
    )
}

export default Order
