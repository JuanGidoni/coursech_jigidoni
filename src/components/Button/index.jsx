import { useDataContext } from '../Context/GeneralContext';

const Button = (props) => {

    const { functions } = useDataContext()

    const buttonPay =
        <button onClick={() => {
            functions.addToCart(props.itemCart)
        }} className={props.className}>
            {props.children}
        </button>

    const buttonRemove =
        <button onClick={() => functions.handleRemoveItem(props.product)}
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
