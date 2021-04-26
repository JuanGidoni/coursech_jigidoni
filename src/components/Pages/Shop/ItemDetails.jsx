import Button from '../../Button'
import { FormControl } from 'react-bootstrap'
import { FaCartPlus } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useCartContext } from '../../Context/CartContext'

const ItemDetails = ({
    id,
    image,
    title,
    price,
    available_quantity,
    description,
    free_shipping,
    qty,
    setQty,
    added
}) => {
    const Image = image ? image : null

    const { addToCart } = useCartContext()
    const p = {
        'title': title,
        'id': id,
        'price': parseInt(price),
        "qty": parseInt(qty)
    }
    return (
        <div className="d-flex flex-column justify-content-center align-items-center h-100 w-100">
            <div className="list-group-item list-group-item-action">
                <div className="d-flex flex-fill h-100 align-items-center justify-content-center">
                    <div className="item-detail w-100">
                        <h2 className="text-info p-0 m-0">{title}</h2>
                        <p className="text-muted mb-1">{description}</p>
                        {free_shipping ? <p>Envio Grátis</p> : <p className="small text-muted">Envio a cargo del comprador</p>}
                        <div className="d-flex w-50 justify-content-center align-items-end">
                            <span className={`badge ${available_quantity > 0 ? 'badge-info' : 'badge-danger'} badge-pill flex-fill`}>{available_quantity > 0 ? `Stock: ${available_quantity}` : 'Sin stock' }</span>
                            <span className="badge badge-success badge-pill flex-fill">$ {price}</span>
                        </div>
                    </div>
                    <div className="item-img w-100 text-center h-100">
                        {Image ? (
                            <img src={Image} alt={title} title={title} className="img-fluid h-100" />
                        ) : (
                            <p className="muted">No Picture</p>
                        )}
                    </div>
                </div>
            </div>
            {
                added ?
                    <Link to="/cart" className="btn btn-primary mt-3">
                        Terminar Compra
                </Link> : available_quantity > 0 ?
                    <div className="d-flex justify-content-center align-items-center flex-fill my-2">
                        <Button onClick={() => addToCart(p)} className="d-flex justify-content-between align-items-center h-100 w-100 btn btn-primary">
                            Comprar <FaCartPlus />
                        </Button>
                        <FormControl value={qty >= 0 ? qty : 1} onChange={(e) => setQty(e.target.value)} type="number" min={1} max={available_quantity} disabled className="h-100 w-100 text-dark" />
                        <div className="btn btn-warning" onClick={() => setQty(qty + 1)}>
                            +
                    </div>
                        <div className="btn btn-danger" disabled={qty <= 1 ? true : false} onClick={() => qty <= 1 ? false : setQty(qty - 1)}>
                            -
                    </div>
                    </div> : ''
            }

        </div>
    )
}

export default ItemDetails
