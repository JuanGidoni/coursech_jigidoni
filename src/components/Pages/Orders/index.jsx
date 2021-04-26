import { useCartContext } from '../../Context/CartContext'
import { Link } from 'react-router-dom'
import { FaFileAlt } from 'react-icons/fa'

const OrdersList = () => {
    const { orders } = useCartContext()

    return (
        <div className="row">
            {orders && orders.length > 0 ?
                orders.map(
                    (v, i) => (
                        <Link key={i} to={`/orders/${v.id}`} className="col-12 col-md-6 col-lg-4 text-decoration-none mb-2 ml-0 pl-0 pr-2" >
                            <div className="p-5 text-center b-1">Order <FaFileAlt /> <br /> {v.id} </div>
                        </Link>
                    )
                ) : 'No se encontraron ordenes.'}
        </div>
    )
}

export default OrdersList
