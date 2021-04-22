import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDataContext } from '../../Context/GeneralContext'
import OrderBox from './OrderBox'
const Order = () => {
    const { id } = useParams()

    const { states, functions } = useDataContext()

    useEffect(() => {
        console.log('runing order', id, states.orderFound)
        const ordersFounded = () => {
            functions.setOrderFound([states.orders.find(i => i.id === id)])
        }
        return ordersFounded()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])
    return (
        <div className="orders">
            {states.orderFound && states.orderFound.length > 0 ?
                states.orderFound.map(item => item.id === id ?
                    <OrderBox key={item.id} items={item.order.items} buyer={item.order.buyer} date={item.order.date} total={item.order.total} id={item.id} />
                    : 'No item found'
                ) : 'Content of the order not found'}
        </div>
    )
}

export default Order
