import Layout from "../../layout/Layout";

import { Row, Col } from "reactstrap";

import AdminMenu from "../../components/AdminMenu";

import { useState, useEffect } from "react";

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getOrders();
  }, []);

  async function getOrders() {
    const respose = await fetch("/api/admin/order");

    const data = await respose.json();

    setOrders(data);
  }

  return (
    <Layout title="Orders">
      <Row className="py-4">
        <AdminMenu />
        <Col
          xs={9}
          className="d-flex flex-wrap justify-content-center align-content-center offset-1 bg-dark text-light p-3 rounded-4 my-3"
        >
          <h2 className="h5 w-100">Orders</h2>
          <table className="table table-bordered table-lihgt table-hover table-striped text-center align-middle">
            <thead>
              <tr>
                <th>Title</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Subtotal</th>
                <th>Subtotal Price</th>
                <th>Total Price</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((item, index) => (
                <>
                  {item.orderItems.map((oItem, oIndex) => (
                    <tr key={item._id}>
                      <td>{oItem.title}</td>
                      <td>{oItem.quantity}</td>
                      <td>{oItem.price.toLocaleString()} IRR</td>
                      <td>
                        {(oItem.quantity * oItem.price).toLocaleString()} IRR
                      </td>
                      {oIndex === 0 && (
                        <td rowSpan={item.orderItems.length}>
                          {item.totalPrice.toLocaleString() + " IRR"}
                        </td>
                      )}
                      {oIndex === 0 && index === 0 && (
                        <td
                          rowSpan={orders.reduce(
                            (acc, cur) => acc + cur.orderItems.length,
                            0
                          )}
                        >
                          {orders
                            .reduce((acc, cur) => acc + cur.totalPrice, 0)
                            .toLocaleString() + " IRR"}
                        </td>
                      )}
                    </tr>
                  ))}
                </>
              ))}
            </tbody>
          </table>
        </Col>
      </Row>
    </Layout>
  );
}

Orders.auth = { onlyAdmin: true };

export default Orders;
