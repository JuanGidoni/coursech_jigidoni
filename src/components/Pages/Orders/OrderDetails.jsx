const OrderDetails = ({ items, buyer, date, total, id }) => {
    return (
        <div className="d-flex justify-content-center align-items-center p-2">
            <div className="d-flex flex-column justify-content-center align-items-start w-100 bg-dark h-100 p-5 shadow">
                <div className="text-success">
                    <div className="buyer-name">
                        Name: {buyer.name}
                    </div>
                    <div className="buyer-lastname">
                        Lastname: {buyer.lastName}
                    </div>
                    <div className="buyer-email">
                        Email: {buyer.email}
                    </div>
                    <div className="buyer-phone">
                        Contact: {buyer.phone}
                    </div>
                </div>
                <div className="extra-info">
                    <div className="total text-warning">
                        Total: $ {total}
                    </div>
                    <div className="id text-muted">
                        ID: {id}
                    </div>
                    <div className="date text-muted">
                        Date: {date.toDate().toDateString()}
                    </div>
                </div>
                <div>
                {items && items.length > 0 ? items.map(
                    (v) => <div key={v.id} className="items"> {v.title} </div>
                ) : 'No items'
                }
                </div>
            </div>
        </div>
    )
}

export default OrderDetails
