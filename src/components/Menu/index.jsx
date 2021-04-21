import { FaCartPlus, FaDollarSign, FaShoppingBag } from 'react-icons/fa';
import { Link } from 'react-router-dom'
import { Navbar, Nav, Button, NavDropdown } from 'react-bootstrap'
import logo from '../assets/logo.svg';
import { useDataContext } from '../Context/GeneralContext';

const Menu = () => {

    const { total, categories, totalItems} = useDataContext()

    return (
        <div className="pb-5">
            <Navbar bg="dark" variant="dark">
                <Navbar>
                    <Link to='/' className='navbar-brand'>
                        <img
                            src={logo}
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                            alt="React Logo, Juan Ignacio Gidoni"
                        />
                    Juan Ignacio Gidoni
                    </Link>
                </Navbar>
                <Nav className="ml-auto">
                    <Link to="/" className="nav-link">Home</Link>
                    <NavDropdown title="Categories" id="basic-nav-dropdown" className="mr-2">
                        {categories && categories.length > 0 ? categories.map(
                            (v, i) => (
                            <Link to={`/category/${v.id}`} className="dropdown-item" key={i}>
                                {v.item.name.charAt(0).toUpperCase() + v.item.name.slice(1)}
                            </Link>
                            )
                        ) : 'No dropdown items found...'}
                    </NavDropdown>
                    <Link to="/orders" className="text-success text-decoration-none">
                        <Button variant="outline-success mr-2" className="d-flex flex-fill">
                            Orders
                            <FaShoppingBag className="ml-2" />
                        </Button>
                    </Link>
                    <Link to="/cart" className="text-success text-decoration-none">
                        <Button variant="outline-success mr-2" className="d-flex flex-fill">
                            {totalItems}
                            <FaCartPlus className="ml-2" />
                        </Button>
                    </Link>

                    <Button disabled variant="none mr-2" className="d-flex flex-fill text-white">
                        {total}
                        <FaDollarSign className="ml-2" />
                    </Button>
                </Nav>
            </Navbar>
        </div>
    )
}

export default Menu
