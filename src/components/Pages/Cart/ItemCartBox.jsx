import Button from '../../Button'
import { FaWindowClose } from 'react-icons/fa'

const ItemCartBox = ({children, price, id, product, qty}) => {
    return (
        <div className="d-flex align-items-center justify-content-between itemCart-box bb-1">
            <p className="p-0 m-0">{children}</p> 
            <p className="p-0 m-0">$ {price} x {qty} </p>
            <Button btnType="removeItem" className="p-0 m-0 w-auto bg-transparent text-danger ml-1" product={product}> 
                <FaWindowClose/>
            </Button>
        </div>
    )
}

export default ItemCartBox
