import { useDataContext } from '../Context/GeneralContext'
import { Alert } from 'react-bootstrap'

const ErrorBox = () => {
    const { states } = useDataContext()
    return (
        states.status.error ? <Alert variant="danger" >{states.status.message}</Alert> :
        states.status.state && !states.status.error ? <Alert variant="success" >{states.status.message}</Alert> :
        ''
    )
}

export default ErrorBox
