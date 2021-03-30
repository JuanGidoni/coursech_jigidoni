import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Card from '../../Card'

const Category = ({products, setStatus, setProducts, setFiltered, setFilteredProducts, filtered }) => {
    const { id } = useParams()

    useEffect(() => {

        const getResultsById = async (e) => {
            try {
                const res = await fetch(`https://api.mercadolibre.com//sites/MLA/search?category=${e}`)
                const response = await res.json()
                setFilteredProducts(response.results)
            } catch (error) {
                setStatus(error)
            }
        }

        const gCatRes = () => {
            getResultsById(id)
            setFiltered(true)
        }
        return gCatRes()
    // eslint-disable-next-line no-sparse-arrays
    }, [id, setFiltered, setFilteredProducts, setProducts, setStatus])
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