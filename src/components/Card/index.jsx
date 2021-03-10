import React from 'react'
import '../styles/Card.css'
import Link from '../Link'
const Card = (props) => {
    return (                
        <div className="card">
        {props.image ? (
                    <img src={props.image} alt={props.title} title={props.title} />
                ) : (
                    <h2>{props.title}</h2>
                )}
        <p className="price">{props.price}</p>
        <p>{props.description}</p>
            <Link type="addcart" cart={props.cart} setCart={props.setCart} itemCart={{
                    'title': props.title,
                    'description': props.description,
                    'price': props.price
                }}>
                {props.price}
            </Link>
        </div>
    )
}

export default Card
