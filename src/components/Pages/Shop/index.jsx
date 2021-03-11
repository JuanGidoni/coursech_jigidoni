import React from 'react'
import Card from '../../Card'
const Shop = ({
    cart, setCart, total, setTotal, products, className
}) => {
    return (
        <div className={className}>
            {products && products.length > 0 ? products.map((v,i) => (
                <Card key={i}
                image={v.img}
                cart={cart} 
                setCart={setCart} 
                price={v.price} 
                title={v.title}
                description={v.description}
                total={total}
                setTotal={setTotal}
                />
            )) : 'Lista de productos vacia.'
        }
        </div>
    )
}

export default Shop
