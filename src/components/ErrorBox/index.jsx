import React from 'react'
import { useDataContext } from '../Context/GeneralContext'
import { Alert } from 'react-bootstrap'

const ErrorBox = () => {
    const { status } = useDataContext()
    return (
        status.error ? <Alert variant="danger" >{status.message}</Alert> :
        status.state && !status.error ? <Alert variant="success" >{status.message}</Alert> :
        ''
    )
}

export default ErrorBox
