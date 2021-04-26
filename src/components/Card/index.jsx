import '../styles/Card.css'
// import Link from '../Link'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { useDataContext } from '../Context/DataContext'

const Card = ({
  image,
  price,
  title,
  available_quantity,
  id,
  free_shipping
}) => {

  const { formatString } = useDataContext()

  const Image = image ? image : null
  return (
    <div className="h-100 w-100 shadow p-1 bb-1">
      <Link to={`/item/${id}`} className="w-100 h-100 d-flex flex-column align-items-center justify-content-center text-decoration-none">
        <div className="d-flex flex-column h-100 justify-content-start">
          <div className="item-img w-100 text-center">
            {Image ? (
              <img src={Image} alt={title} title={title} className="img-fluid h-100" />
            ) : (
              <p className="muted">No Picture</p>
            )}
          </div>
        </div>
          <div className="d-flex flex-column align-items-center justify-content-end h-100">
            <h2 className="text-info p-0 m-0">{formatString(title, 25)}</h2>
            {free_shipping ? <p className="small text-muted">Envio Grátis</p> : <p className="small text-muted">Envio a cargo del comprador</p>}
            <div className="d-flex flex-column justify-content-center align-items-center pb-3">
              <span className={`badge ${available_quantity > 0 ? 'badge-info' : 'badge-danger'} badge-pill flex-fill mb-2`}>{available_quantity > 0 ? `Stock: ${available_quantity}` : 'Sin stock' }</span>
              <span className="badge badge-success badge-pill flex-fill p-2">$ {price}</span>
            </div>
          </div>
      </Link>
    </div>
  )
}

Card.propTypes = {
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string,
}

export default Card
