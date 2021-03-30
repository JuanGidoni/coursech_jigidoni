import { Link } from 'react-router-dom'

const MultiCategory = ({ cats}) => {
    return (
        <div className="row w-100">
            {
                cats && cats.length > 0 ? cats.map(
                    (v) => (
                        <Link to={`/category/${v.id}`}>
                            {v.name}
                        </Link>
                    )
                ) : (
                    'No categories found...'
                )
            }
        </div>
    )
}

export default MultiCategory
