import { useRef } from 'react'
import { FaCartPlus, FaSearch, FaDollarSign } from 'react-icons/fa';
import { Link } from 'react-router-dom'
import { Navbar, Nav, Form, Button, FormControl } from 'react-bootstrap'

const Menu = ({ cart, logo, total, products, filteredProducts, setFilteredProducts }) => {
    const searchRef = useRef();
    const filterProds = (e) => {
        let filteredP = [];
        console.log(products);
        console.log(filteredProducts);
        if (products && products.length > 0) {
            products.filter(product => product.title.toLowerCase().includes(e)).map(filteredProduct => {
                filteredP.push(filteredProduct)
                return setFilteredProducts(filteredP)
            })
        } else {
            console.log('No se pudo filtrar')
        }
    }
    const buttonSearch = (e) => {
        e.preventDefault()
        let filteredP = [];
        console.log(products);
        console.log(filteredProducts);
        if (products && products.length > 0) {
            products.filter(product => product.title.toLowerCase().includes(searchRef.current.value)).map(filteredProduct => {
                filteredP.push(filteredProduct)
                return setFilteredProducts(filteredP)
            })
        } else {
            console.error('No se pudo filtrar')
        }
    }

    return (
        <div className="pb-5">
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="#home">
                    <img
                        src={logo}
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                        alt="React Logo, Juan Ignacio Gidoni"
                    />
                    Juan Ignacio Gidoni
                </Navbar.Brand>
                <Nav className="ml-auto">
                    <Link to="/" className="nav-link">Home</Link>
                </Nav>
                <Form inline onSubmit={buttonSearch}>
                    <Link to="/cart" className="text-success text-decoration-none">
                    <Button variant="outline-success mr-2" className="d-flex flex-fill">
                        {cart && cart.length > 0 ? (
                            `${cart.length}`
                        ) : '0'}
                        <FaCartPlus className="ml-2" />
                    </Button>
                    </Link>

                    <Button disabled variant="outline-success mr-2" className="d-flex flex-fill">
                        {total}
                        <FaDollarSign className="ml-2" />
                    </Button>
                    <FormControl type="text" placeholder="Search Products..." className="mr-sm-2" ref={searchRef} onChange={(e) => filterProds(e.target.value)} />
                    <Button variant="outline-info" type="submit"><FaSearch /></Button>
                </Form>
            </Navbar>
        </div>
    )
}

export default Menu
