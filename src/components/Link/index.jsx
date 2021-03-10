import React from 'react'

const Link = (props) => {
    return (
        <>
        { props.type === 'pagination' ? (
        <button onClick={() => props.goTo(props.page)} className={props.className}>
            {props.children}
        </button>
        ) : props.type === 'addcart' ? (
        <button onClick={() => {
            props.setCart([
            ...props.cart, props.itemCart
            ])
        }} className={props.className}>
            $ {props.children}
        </button>
        ): (
        <button onClick={() => props.goTo(props.page)} className={props.className}>
            {props.children}
        </button>
        )}
        </>
    )
}

export default Link
