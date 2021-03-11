import React from 'react'
import '../styles/Card.css'
import Link from '../Link'
import PropTypes from 'prop-types'

const Card = ({
    image,
    cart,
    setCart,
    price,
    title,
    description,
    total,
    setTotal
}) => {

    const Image = image ? image : null
    return (                
        <div className="card">
        {Image ? (
                    <img src={Image} alt={title} title={title} className="fluid" />
                ) : (
                    <p class="muted">No Picture</p>
                )}
        <h2>{title}</h2>
        <p className="price">{price}</p>
        <p>{description}</p>
            <Link type="addcart" cart={cart} setCart={setCart} itemCart={{
                    'title': title,
                    'description': description,
                    'price': price
                }}>
                {price}
            </Link>
        </div>
    )
}

Card.propTypes  = {
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string,
    cart: PropTypes.array.isRequired,
    setCart: PropTypes.func.isRequired,
}

export default Card
