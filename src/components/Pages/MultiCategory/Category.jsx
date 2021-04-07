import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Card from '../../Card'
import { useDataContext } from '../../Context/GeneralContext'

const Category = () => {
    const { id } = useParams()

    const { products, getResultsById, setFiltered } = useDataContext()
    useEffect(() => {

        const gCatRes = () => {
            getResultsById(id)
            setFiltered(true)
        }
        return gCatRes()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])
    return (
        <div>
            {
                products && products.length > 0 ? products.map(
                    (v, i) => (
                        <Card key={i}
                            id={v.id}
                            image={v.thumbnail}
                            available_quantity={v.available_quantity}
                            price={v.price}
                            title={v.title}
                            seller={v.seller}
                        />
                    )
                )
                    : 'No filtered'
            }
        </div>
    )
}

export default Category