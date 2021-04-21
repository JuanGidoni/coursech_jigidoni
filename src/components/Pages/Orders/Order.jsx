import { useParams } from 'react-router-dom'
import { useDataContext } from '../../Context/GeneralContext'
import OrderBox from './OrderBox'
const Order = () => {
    const { id } = useParams()

    const { orders } = useDataContext()

    const orderFound = orders.filter(i => i.id === id)
    return (
        <div className="orders">
            {orderFound && orderFound.length > 0 ?
                orderFound.map(item => item.id === id ?
                        <OrderBox key={item.id} items={item.order.items} buyer={item.order.buyer} date={item.order.date} total={item.order.total} id={item.id} />
                        : 'No item found'
                ) : 'Content of the order not found'}
        </div>
    )
}

export default Order
