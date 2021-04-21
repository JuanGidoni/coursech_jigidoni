import { useDataContext } from '../Context/GeneralContext';

const Button = (props) => {

    const { addToCart, handleRemoveItem } = useDataContext()

    const buttonPay =
        <button onClick={() => {
            addToCart(props.itemCart)
        }} className={props.className}>
            {props.children}
        </button>

    const buttonRemove =
        <button onClick={() => handleRemoveItem(props.product)}
            className={props.className}>
            {props.children}
        </button>

    return (
        <>
            {props.btnType === 'addcart' ? (
                buttonPay
            ) : props.btnType === 'removeItem' ? (
                buttonRemove
            ) : (
                <button onClick={() => props.onClick} className={props.className}>
                    {props.children}
                </button>
            )}
        </>
    )

}

export default Button
