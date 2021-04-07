import Link from '../../Link'

const ItemContainer = (props) => {
    const Image = props.image ? props.image : null
    return (
        <Link btnType="addcart" itemCart={{
            'title': props.title,
            'id': props.id,
            'price': props.price
        }} className="list-group-item list-group-item-action d-flex justify-content-between align-items-start h-100 w-100">
            <div className="flex-column align-items-end">
                {props.title}
                <p><small>by {props.seller.seller_reputation.power_seller_status} seller</small></p>
                <div className="d-flex justify-content-center align-items-end">
                    <span className="badge badge-info badge-pill flex-fill">{props.available_quantity} in stock</span>
                    <span className="badge badge-success badge-pill flex-fill">$ {props.price}</span>
                </div>
            </div>
            <div className="item-img">
                {Image ? (
                    <img src={Image} alt={props.title} title={props.title} className="img-fluid" />
                ) : (
                    <p className="muted">No Picture</p>
                )}
            </div>
        </Link>
    )
}

export default ItemContainer
