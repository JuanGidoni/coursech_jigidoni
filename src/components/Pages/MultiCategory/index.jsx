import { Link } from 'react-router-dom'
import { useDataContext } from '../../Context/GeneralContext'

const MultiCategory = () => {

    const { states } =  useDataContext()
    return (
        <div className="row w-100">
            {
                states.categories && states.categories.length > 0 ? states.categories.map(
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
