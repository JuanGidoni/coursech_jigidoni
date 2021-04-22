import { useDataContext } from '../../Context/GeneralContext'
import OrderBox from './OrderBox'
import { Link } from 'react-router-dom'

const OrdersList = () => {
    const { states } = useDataContext()

    return (
        <div className="row">
            {states.orders && states.orders.length > 0 ?
                states.orders.map(
                    (v, i) => (
                        <Link key={i} to={`/orders/${v.id}`} className="col-4 text-decoration-none" >
                            <OrderBox items={v.order.items} buyer={v.order.buyer} date={v.order.date} total={v.order.total} id={v.id} />
                        </Link>
                    )
                ) : 'No se encontraron ordenes.'}
        </div>
    )
}

export default OrdersList
