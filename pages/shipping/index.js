import Layout from "../../layout/Layout";
import CheckoutWizard from "../../components/CheckoutWizard";

import { Row, Col } from "reactstrap";

import { useForm } from "react-hook-form";

import { useContext, useEffect } from "react";
import { CartContext } from "../../context/cart";

import { toast } from "react-toastify";

import { useRouter } from "next/router";

function Shipping() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const {
    state: {
      cart: { shippingData },
    },
    dispatch,
  } = useContext(CartContext);

  const router = useRouter();

  function submitHandler({ fullName, postalCode, address }) {
    dispatch({
      type: "SAVE_SHIPPING_DATA",
      payload: { fullName, postalCode, address },
    });

    toast.success("Shipping Data Saved.");

    router.push("/payment-method");
  }

  useEffect(() => {
    setValue("fullName", shippingData.fullName);
    setValue("postalCode", shippingData.postalCode);
    setValue("address", shippingData.address);
  }, [
    setValue,
    shippingData.fullName,
    shippingData.postalCode,
    shippingData.address,
  ]);

  return (
    <Layout title="Shipping">
      <Row>
        <CheckoutWizard activeStep={1} />
      </Row>
      <Row className="py-4">
        <Col
          xs={4}
          className="d-flex justify-content-center offset-4 bg-dark text-light rounded-3 my-3 p-4"
        >
          <form onSubmit={handleSubmit(submitHandler)}>
            <h2 className="h5">Shipping Data</h2>
            <div>
              <label className="mb-1" htmlFor="fullName">
                Full Name :
              </label>
              <br />
              <input
                type="text"
                placeholder="Enter Your Full Name"
                {...register("fullName", { required: true })}
                id="fullName"
                className="text-reset bg-transparent border border-light rounded px-2 py-1"
                autoFocus
              />
              {errors.fullName && (
                <small className="d-block text-danger mt-1">
                  Enter Your Full Name.
                </small>
              )}
            </div>
            <div className="my-1">
              <label className="mb-1" htmlFor="postalCode">
                Postal Code :
              </label>
              <br />
              <input
                type="text"
                placeholder="Enter Your Postal Code"
                {...register("postalCode", {
                  required: true,
                  minLength: { value: 10, message: "Invalid Postal Code." },
                  maxLength: { value: 10, message: "Invalid Postal Code." },
                })}
                id="postalCode"
                className="text-reset bg-transparent border border-light rounded px-2 py-1"
                autoFocus
              />
              {errors.postalCode &&
                (errors.postalCode.message ? (
                  <small className="d-block text-danger mt-1">
                    {errors.postalCode.message}
                  </small>
                ) : (
                  <small className="d-block text-danger mt-1">
                    Enter Your Postal Code.
                  </small>
                ))}
            </div>
            <div>
              <label className="mb-1" htmlFor="address">
                Address :
              </label>
              <br />
              <textarea
                type="text"
                placeholder="Enter Your Address"
                {...register("address", { required: true })}
                id="address"
                className="text-reset bg-transparent border border-light rounded px-2 py-1"
                cols={40}
                rows={4}
                autoFocus
              />
              {errors.address && (
                <small className="d-block text-danger mt-1">
                  Enter Your Address.
                </small>
              )}
            </div>
            <button className="btn btn-outline-success d-block mx-auto mt-3">
              Next
            </button>
          </form>
        </Col>
      </Row>
    </Layout>
  );
}

Shipping.auth = true;

export default Shipping;
