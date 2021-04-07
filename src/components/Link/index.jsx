import React from 'react'
import { useDataContext } from '../Context/GeneralContext';

const Link = (props) => {

    const { addToCart, handleRemoveItem } = useDataContext()
    return (
        <>
            { props.btnType === 'addcart' ? (
                <button onClick={() => {
                    addToCart(props.itemCart)
                }} className={props.className}>
                    {props.children}
                </button>
            ) : props.btnType === 'removeItem' ? (
                <button onClick={() => handleRemoveItem(props.product)} className={props.className}>
                    {props.children}
                </button>
            ) : (
                <button onClick={() => props.onClick} className={props.className}>
                    {props.children}
                </button>
            )}
        </>
    )
}

export default Link
