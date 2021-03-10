import React from 'react'
import Link from '../Link'
import { FaCartPlus } from 'react-icons/fa';
const Navbar = ({goTo, cart}) => {
    return (
        <nav>
            <ul className="navbar">
                <li>
                    <Link goTo={goTo} page={1} className="btn" type="pagination">
                        Inicio
                    </Link>
                </li>
                <li>
                    <Link goTo={goTo} page={2} className="btn" type="pagination">
                    Tienda
                    </Link>
                </li>
                <li>
                    <Link goTo={goTo} page={3} className="btn" type="pagination">
                    Carrito {cart && cart.length} <FaCartPlus />
                    </Link>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar
