import React from 'react'
import Card from '../../Card'
const Shop = (props) => {
    return (
        <div className={props.className}>
            {props.products && props.products.length > 0 ? props.products.map((v,i) => (
                <Card key={i}
                cart={props.cart} 
                setCart={props.setCart} 
                price={v.price} 
                title={v.title}
                description={v.description}
                total={props.total}
                setTotal={props.setTotal}
                />
            )) : 'Lista de productos vacia.'
        }
        </div>
    )
}

export default Shop
