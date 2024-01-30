import React, { useEffect, useState } from 'react';

const QuotationDetail = ({ quotation, onClose }) => {
    const [quotationDetails, setQuotationDetails] = useState([]);

    useEffect(() => {
        const fetchQuotationDetails = async () => {
            try {
                const response = await fetch(`https://localhost:7196/api/Quotation/${quotation.id}`);
                if (response.ok) {
                    const data = await response.json();
                    setQuotationDetails(data);
                } else {
                    console.error('Failed to fetch quotation details');
                }
            } catch (error) {
                console.error('Error fetching quotation details:', error);
            }
        };

        fetchQuotationDetails();
    }, [quotation.id]);

    return (
        <div>
            <table className="table table-white" align="center">
                <thead>
                    <tr>
                        <th scope="col">Product</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Total</th>
                    </tr>
                </thead>

                <tbody>
                    {quotationDetails.map((detail) => (
                        <tr key={detail.id}>
                            <td>{detail.product.name}</td>
                            <td>{detail.quantity}</td>
                            <td>{detail.subTotal}VND</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default QuotationDetail;
