import Layout from "../../layout/Layout";

import { useContext } from "react";
import { CartContext } from "../../context/cart";

import { Row, Col } from "reactstrap";

import Image from "next/image";
import { useRouter } from "next/router";

import dynamic from "next/dynamic";

function Cart() {
  const {
    state: {
      cart: { cartItems },
    },
    dispatch,
  } = useContext(CartContext);

  const router = useRouter();

  function removeOfCartHandler(item) {
    dispatch({ type: "REMOVE_ITEM", payload: item });
  }

  function goToCheckout() {
    router.push("login?redirect=/shipping");
  }

  return (
    <Layout title="Cart">
      <Row className="py-4">
        <Col xs={9} className="py-3">
          <table className="table table-bordered table-dark table-hover table-striped text-center align-middle">
            <thead>
              <tr>
                <th>Item</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.length > 0 ? (
                cartItems.map((item) => (
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
                    <td>{item.price.toLocaleString()}</td>
                    <td>
                      <button
                        onClick={removeOfCartHandler.bind(null, item)}
                        className="btn btn-outline-warning"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4}>No Item</td>
                </tr>
              )}
            </tbody>
          </table>
        </Col>
        <Col xs={3} className="text-center text-light py-3">
          <div className="bg-dark rounded-4 py-5">
            <button onClick={goToCheckout} className="btn btn-outline-light">
              Checkout
            </button>
            <p className="m-0 mt-2">
              Total Price :{" "}
              {cartItems
                .reduce((acc, cur) => acc + cur.price * cur.quantity, 0)
                .toLocaleString() + " IRR"}
            </p>
          </div>
        </Col>
      </Row>
    </Layout>
  );
}

export default dynamic(Promise.resolve(Cart), { ssr: false });
