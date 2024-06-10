import Layout from "../../layout/Layout";
import CheckoutWizard from "../../components/CheckoutWizard";

import { Row, Col } from "reactstrap";

import { useState, useContext, useEffect } from "react";

import { useRouter } from "next/router";

import { CartContext } from "../../context/cart";

import { toast } from "react-toastify";

function PaymentMethod() {
  const methods = ["Gateway", "Offline Payment"];

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");

  const router = useRouter();

  const {
    state: {
      cart: { paymentMethod },
    },
    dispatch,
  } = useContext(CartContext);

  useEffect(() => {
    setSelectedPaymentMethod(paymentMethod);
  }, [paymentMethod]);

  function submitHandler(e) {
    e.preventDefault();

    if (!selectedPaymentMethod)
      return toast.error("Select Your Payment Method.");

    dispatch({ type: "SAVE_PAYMENT_METHOD", payload: selectedPaymentMethod });

    toast.success("Payment Method Saved.");

    router.push("/place-order");
  }

  return (
    <Layout title="Payment Method">
      <Row>
        <CheckoutWizard activeStep={2} />
      </Row>
      <Row className="py-4">
        <Col
          xs={4}
          className="d-flex justify-content-center offset-4 rounded-4 bg-dark text-light my-3 p-4"
        >
          <form onSubmit={submitHandler}>
            <h2 className="h5">Payment Method</h2>
            {methods.map((item, index) => (
              <div key={index.toString()}>
                <input
                  type="radio"
                  id={item}
                  name="peyment-method"
                  checked={selectedPaymentMethod === item}
                  onChange={() => setSelectedPaymentMethod(item)}
                  className="my-1"
                />
                <label htmlFor={item} className="ps-1">
                  {item}
                </label>
              </div>
            ))}
            <div className="btn-group d-block text-center mt-3">
              <button
                type="button"
                onClick={() => router.push("/shipping")}
                className="btn btn-outline-danger"
              >
                Back
              </button>
              <button className="btn btn-outline-success">Next</button>
            </div>
          </form>
        </Col>
      </Row>
    </Layout>
  );
}

PaymentMethod.auth = true;

export default PaymentMethod;
