import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Badge, Modal } from 'react-bootstrap';
import QuotationDetail from './QuotationDetail';
import Swal from 'sweetalert2'

const QuotationList = () => {
  const [quotations, setQuotations] = useState([]);
  const [selectedQuotation, setSelectedQuotation] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showQuotationDetail, setShowQuotationDetail] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newQuotation, setNewQuotation] = useState({
    customerId: '',
    products: [{ productId: '', quantity: 1 }],
  });

  useEffect(() => {
    const fetchQuotations = async () => {
      try {
        const response = await fetch('https://localhost:7196/api/Quotation');
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setQuotations(data);
        } else {
          console.error('Failed to fetch quotations');
        }
      } catch (error) {
        console.error('Error fetching quotations:', error);
      }
    };

    const fetchCustomers = async () => {
      try {
        const response = await fetch('https://localhost:7196/api/Customers');
        if (response.ok) {
          const data = await response.json();
          setCustomers(data);
        } else {
          console.error('Failed to fetch customers');
        }
      } catch (error) {
        console.error('Error fetching customers:', error);
      }
    };

    const fetchProducts = async () => {
      try {
        const response = await fetch('https://localhost:7196/api/Products');
        if (response.ok) {
          const data = await response.json();
          setProducts(data);
        } else {
          console.error('Failed to fetch products');
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchQuotations();
    fetchCustomers();
    fetchProducts();
  }, []);

  const showDetail = (quotation) => {
    setSelectedQuotation(quotation);
    setShowQuotationDetail(true);
  };

  const closeDetail = () => {
    setSelectedQuotation(null);
    setShowQuotationDetail(false);
  };

  //fetch
  const fetchQuotations = async () => {
    try {
      const response = await fetch('https://localhost:7196/api/Quotation');
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setQuotations(data);
      } else {
        console.error('Failed to fetch quotations');
      }
    } catch (error) {
      console.error('Error fetching quotations:', error);
    }
  };

  const Swal = require('sweetalert2')

  const handleConfirmQuotation = async (id) => {
    try {
      const response = await fetch(`https://localhost:7196/api/Quotation/${id}/confirm`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        console.log('Quotation confirmed successfully.');

        Swal.fire({
          title: "Confirmed!",
          text: "You clicked the button!",
          icon: "success"
        });

        fetchQuotations();
      } else {
        console.error('Failed to confirm quotation.');
      }
    } catch (error) {
      console.error('Error confirming quotation:', error);
    }
  };

  const handleCancelQuotation = async (id) => {
    try {
      const response = await fetch(`https://localhost:7196/api/Quotation/${id}/cancel`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        console.log('Quotation canceled successfully.');

        Swal.fire({
          title: "Canceled!",
          text: "You clicked the button!",
          icon: "success"
        });

        fetchQuotations();
      } else {
        console.error('Failed to cancel quotation.');
      }
    } catch (error) {
      console.error('Error canceling quotation:', error);
    }
  };

  const handleRemoveQuotation = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(`https://localhost:7196/api/Quotation/${id}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
          });

          if (response.ok) {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success"
            });

            fetchQuotations();
          } else {
            console.error('Failed to remove quotation');
          }
        } catch (error) {
          console.error('Error removing quotation:', error);
        }
      }
    });
  };


  const getAvailableProducts = (selectedProducts) => {
    return products.filter((product) => !selectedProducts.some((selected) => selected.productId === product.id));
  };

  const handleCreateQuotation = async () => {
    if (!newQuotation.customerId || !newQuotation.products.some(product => product.productId)) {
      console.error('Invalid quotation. CustomerId and at least one product are required.');
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Invalid quotation!",
      });
      return;
    }

    const uniqueProductIds = new Set();

    const hasDuplicates = newQuotation.products.some(product => {
      if (uniqueProductIds.has(product.productId)) {
        return true;
      } else {
        uniqueProductIds.add(product.productId);
        return false;
      }
    });

    if (hasDuplicates) {
      console.error('Invalid quotation. Duplicate products are not allowed.');
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Duplicate products are not allowed!",
      });
      return;
    }

    try {
      const response = await fetch('https://localhost:7196/api/Quotation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customerId: newQuotation.customerId,
          products: newQuotation.products,
        }),
      });

      if (response.ok) {
        const createdQuotation = await response.json();
        setQuotations((prevQuotations) => [...prevQuotations, createdQuotation]);

        Swal.fire({
          title: "Done!",
          text: "You clicked the button!",
          icon: "success"
        });

        fetchQuotations();
      } else {
        const errorText = await response.text();
        console.error('Failed to create quotation:', errorText);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Failed to create quotation!",
        });
      }
    } catch (error) {
      console.error('Error creating quotation:', error);
    }

    setNewQuotation({
      customerId: '',
      products: [{ productId: '', quantity: 1 }],
    });

    setShowCreateForm(false);
  };

  const handleAddProduct = () => {
    setNewQuotation((prevQuotation) => ({
      ...prevQuotation,
      products: [...prevQuotation.products, { productId: '', quantity: 1 }],
    }));
  };

  const handleRemoveProduct = (index) => {
    setNewQuotation((prevQuotation) => {
      const newProducts = [...prevQuotation.products];
      newProducts.splice(index, 1);
      return {
        ...prevQuotation,
        products: newProducts,
      };
    });
  };

  const handleProductChange = (index, field, value) => {
    setNewQuotation((prevQuotation) => {
      const newProducts = prevQuotation.products.map((product, i) => {
        if (i === index) {
          return { ...product, [field]: value };
        }
        return product;
      });
      return { ...prevQuotation, products: newProducts };
    });
  };

  const formatCreatedAt = (createdAt) => {
    const date = new Date(createdAt);
    const day = date.getDate();
    const month = date.getMonth() + 1; // Months are zero-based
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;
    const formattedHours = hours < 10 ? `0${hours}` : hours;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${formattedDay}/${formattedMonth}/${year} (${formattedHours}:${formattedMinutes})`;
  };

  return (
    <Container>
      <div className="container mt-4">
        <h1 style={{ textAlign: 'center' }}>Quotations</h1>

        <div>
          <Button className="btn btn-success mt-4" onClick={() => setShowCreateModal(true)}>
            Create
          </Button>
        </div>

        <Modal show={showCreateModal} onHide={() => setShowCreateModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title >Create Quotation</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form>
              {/* Select customer */}
              <Form.Group controlId="customerSelect">
                <Form.Label>Select Customer:</Form.Label>
                <Form.Control
                  as="select"
                  value={newQuotation.customerId}
                  onChange={(e) => setNewQuotation({ ...newQuotation, customerId: e.target.value })}
                >
                  <option value="" disabled>
                    Choose...
                  </option>
                  {customers.map((customer) => (
                    <option key={customer.id} value={customer.id}>
                      {customer.name}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>

              <br></br>
              {/* Add products */}
              <Form.Group controlId="products">
                {newQuotation.products.map((product, index) => (
                  <div key={index} className="mb-2">
                    <Form.Group controlId={`productSelect-${index}`}>
                      <Form.Label>Product:</Form.Label>
                      <Form.Control
                        as="select"
                        value={product.productId}
                        onChange={(e) => handleProductChange(index, 'productId', e.target.value)}
                      >
                        <option value="" disabled>
                          Choose Product...
                        </option>
                        {products.map((productOption) => (
                          <option key={productOption.id} value={productOption.id} disabled={newQuotation.products.some(p => p.productId === productOption.id && p !== product)}>
                            {productOption.name}
                          </option>
                        ))}
                      </Form.Control>
                    </Form.Group>

                    <Form.Group controlId={`quantity-${index}`}>
                      <Form.Label>Quantity:</Form.Label>
                      <Form.Control
                        type="number"
                        min="1"
                        value={product.quantity}
                        onChange={(e) => handleProductChange(index, 'quantity', e.target.value)}
                      />
                    </Form.Group>

                    <Button
                      variant="secondary"
                      onClick={() => handleRemoveProduct(index)}
                      style={{ marginTop: '10px' }}
                    >
                      Remove
                    </Button>
                  </div>
                ))}

              </Form.Group>

              <br></br>

              {/* Add + Save button */}
              <Button
                variant="warning"
                onClick={handleAddProduct}
                disabled={getAvailableProducts(newQuotation.products).length === 0}
                style={{ marginRight: '5px' }}
              >
                Add More
              </Button>

              <Button className="btn btn-success" onClick={handleCreateQuotation}>
                Save Quotation
              </Button>
            </Form>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="danger" onClick={() => setShowCreateModal(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        <table className="table table-white" align="center">
          <thead>
            <tr>
              <th scope="col">Customer</th>
              <th scope="col">Total</th>
              <th scope="col">Status</th>
              <th scope="col">CreateAt</th>
              <th scope="col">Action</th>
              <th scope="col">Remove</th>
            </tr>
          </thead>
          <tbody>
            {quotations.map((quotation) => (
              <tr key={quotation.id}>
                <td>{quotation.customer ? quotation.customer.name : 'Unknown Customer'}</td>
                <td>{quotation.total}VND</td>
                <td>
                  <Badge
                    bg={
                      quotation.status === 'Quoting'
                        ? 'primary'
                        : quotation.status === 'Confirmed'
                          ? 'success'
                          : 'danger'
                    }
                  >
                    {quotation.status}
                  </Badge>
                </td>
                <td>{formatCreatedAt(quotation.createdAt)}</td>
                <td>
                  <div className="buttonContainer">
                    {quotation.status !== 'Quoting' ? (
                      <Button
                        className="btn btn-warning"
                        onClick={() => showDetail(quotation)}
                        style={{ marginRight: '5px' }}
                      >
                        Detail
                      </Button>
                    ) : (
                      <div className="buttonContainer">
                        <Button
                          className="btn btn-warning"
                          onClick={() => showDetail(quotation)}
                          style={{ marginRight: '5px' }}
                        >
                          Detail
                        </Button>

                        <Button
                          variant="success"
                          onClick={() => handleConfirmQuotation(quotation.id)}
                          style={{ marginRight: '5px' }}
                        >
                          Confirm
                        </Button>

                        <Button
                          variant="secondary"
                          onClick={() => handleCancelQuotation(quotation.id)}
                          style={{ marginRight: '5px' }}
                        >
                          Cancel
                        </Button>
                      </div>
                    )}
                  </div>
                </td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => handleRemoveQuotation(quotation.id)}
                  >
                    Remove
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {selectedQuotation && (
          <Modal show={showQuotationDetail} onHide={closeDetail}>
            <Modal.Header closeButton>
              <Modal.Title>Quotation Detail</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <QuotationDetail quotation={selectedQuotation} />
            </Modal.Body>

            <Modal.Footer>
              <Button
                variant="danger"
                onClick={closeDetail}
              >
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        )}

      </div>
    </Container>
  );
};

export default QuotationList;