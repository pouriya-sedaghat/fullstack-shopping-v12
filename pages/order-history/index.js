import Layout from "../../layout/Layout";

import { Row, Col } from "reactstrap";

import { useState, useEffect } from "react";
import { data } from "autoprefixer";

function OrderHistory() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getOrders();
  }, []);

  async function getOrders() {
    const response = await fetch("/api/order/history");

    const data = await response.json();

    setOrders(data);
  }

  return (
    <Layout title="Order History">
      <Row className="py-4">
        <Col xs={12} className="py-3">
          <h2 className="h5">Order History</h2>
          <table className="table table-bordered table-dark table-hover table-striped text-center align-middle">
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

export default OrderHistory;
