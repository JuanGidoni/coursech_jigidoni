import React from 'react'

const Navbar = ({goTo}) => {
    return (
        <nav>
            <ul class="navbar">
                <li onClick={() => goTo(1)}>Inicio</li>
                <li onClick={() => goTo(2)}>Tienda</li>
                <li onClick={() => goTo(3)}>Carrito</li>
            </ul>
        </nav>
    )
}

export default Navbar
