import { Link } from 'react-router-dom'
import { useDataContext } from '../../Context/GeneralContext'

const MultiCategory = () => {

    const { categories } = useDataContext()
    return (
        <div className="row w-100">
            {
                categories && categories.length > 0 ? categories.map(
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
