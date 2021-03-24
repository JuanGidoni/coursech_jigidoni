import React from 'react'
import '../styles/Card.css'
// import Link from '../Link'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const Card = ({
    image,
    cart,
    setCart,
    price,
    title,
    total,
    available_quantity,
    seller,
    setTotal,
    i
}) => {

    function formatString(text, length){
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

    const Image = image ? image : null
    return (
        <Link to={`/item/${i}`} className="list-group-item list-group-item-action d-flex justify-content-between align-items-start h-100 w-100">
        <div className="flex-column align-items-end">
            {formatString(title, 35)} 
            <p><small>by {seller.seller_reputation.power_seller_status} seller</small></p>
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
        </Link>
    )
}

Card.propTypes = {
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string,
    cart: PropTypes.array.isRequired,
    setCart: PropTypes.func.isRequired,
}

export default Card
