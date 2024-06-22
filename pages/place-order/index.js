import Layout from "../../layout/Layout";
import CheckoutWizard from "../../components/CheckoutWizard";

import { Row, Col } from "reactstrap";

import { useContext } from "react";
import { CartContext } from "../../context/cart";

import Link from "next/link";
import Image from "next/image";

import { toast } from "react-toastify";

import { useRouter } from "next/router";

function PlaceOrder() {
  const {
    state: {
      cart: { cartItems, shippingData, paymentMethod },
    },
    dispatch,
  } = useContext(CartContext);

  const router = useRouter();

  async function placeOrderHandler() {
    const totalPrice = cartItems.reduce(
      (acc, cur) => acc + cur.quantity * cur.price,
      0
    );

    const reqBody = {
      orderItems: cartItems,
      shippingData,
      paymentMethod,
      totalPrice,
    };

    const response = await fetch("/api/order", {
      method: "POST",
      body: JSON.stringify(reqBody),
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();
    console.log(data);

    toast.success("Order Placed.");

    dispatch({ type: "CLEAR_HISTORY" });

    router.push("/order-completed");
  }

  return (
    <Layout title="Place Order">
      <Row>
        <CheckoutWizard activeStep={3} />
      </Row>
      <Row className="py-4">
        <Col xs={12} className="py-3">
          <h2 className="h5">Shipping Data</h2>
          <p>Full Name : {shippingData.fullName}</p>
          <p>Postal Code : {shippingData.postalCode}</p>
          <p>Address : {shippingData.address}</p>
          <Link href="/shipping">
            <button className="btn btn-outline-warning">Edit</button>
          </Link>
        </Col>
      </Row>
      <Row className="py-4">
        <Col xs={12} className="py-3">
          <h2 className="h5">Payment Method</h2>
          <p>Method : {paymentMethod}</p>
          <Link href="/payment-method">
            <button className="btn btn-outline-warning">Edit</button>
          </Link>
        </Col>
      </Row>
      <Row className="py-4">
        <Col xs={12} className="py-3">
          <h2 className="h5">Orders</h2>
          <table className="table table-bordered table-dark table-hover table-striped text-center align-middle">
            <thead>
              <tr>
                <th>Item</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.slug}>
                  <td>
                    <Image
                      src={item.image}
                      width={15}
                      height={20}
                      alt={item.title}
                      className="me-2"
                    />
                    {item.title}
                  </td>
                  <td>{item.quantity}</td>
                  <td>{item.price.toLocaleString()} IRR</td>
                  <td>{(item.quantity * item.price).toLocaleString()} IRR</td>
                </tr>
              ))}
            </tbody>
          </table>
          <Link href="/cart">
            <button className="btn btn-outline-warning">Edit</button>
          </Link>
        </Col>
      </Row>
      <Row className="py-4">
        <Col xs={12} className="py-3">
          <h2 className="h5">Order Summery</h2>
          <div>
            <p>
              Total Price:{" "}
              {cartItems
                .reduce((acc, cur) => acc + cur.quantity * cur.price, 0)
                .toLocaleString() + " IRR"}
            </p>
            <button
              onClick={placeOrderHandler}
              className="btn btn-outline-success"
            >
              Place Order
            </button>
          </div>
        </Col>
      </Row>
    </Layout>
  );
}

PlaceOrder.auth = true;

export default PlaceOrder;
