import Link from '../../Link'
import { FormControl } from 'react-bootstrap'
import { FaCartPlus } from 'react-icons/fa'

const ItemContainer = ({
    id,
    image,
    title,
    price,
    available_quantity,
    qty,
    setQty,
}) => {
    const Image = image ? image : null
    return (
        <div className="d-flex flex-column justify-content-center align-items-center h-100 w-100">
            <div className="list-group-item list-group-item-action">
                <div className="flex-column align-items-end">
                    {title}
                    <p><small>Envio Grátis</small></p>
                    <div className="d-flex justify-content-center align-items-end">
                        <span className="badge badge-info badge-pill flex-fill">{available_quantity} in stock</span>
                        <span className="badge badge-success badge-pill flex-fill">$ {price}</span>
                    </div>
                </div>
                <div className="item-img">
                    {Image ? (
                        <img src={Image} alt={title} title={title} className="img-fluid" />
                    ) : (
                        <p className="muted">No Picture</p>
                    )}
                </div>
            </div>
            <div className="d-flex justify-content-center align-items-center flex-fill my-2">
                <Link btnType="addcart" itemCart={{
                    'title': title,
                    'id': id,
                    'price': parseInt(price),
                    "qty": parseInt(qty)
                }} className="d-flex justify-content-between align-items-start h-100 w-100 btn btn-primary">
                    <FaCartPlus />
                </Link>
                <FormControl value={qty} onChange={(e) => setQty(e.target.value)} type="number" min={0} max={available_quantity} className="h-100 w-100 text-dark" />
            </div>
        </div>
    )
}

export default ItemContainer
