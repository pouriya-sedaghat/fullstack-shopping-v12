import { Col } from "reactstrap";

function CheckoutWizard({ activeStep = 0 }) {
  const titles = ["User Login", "Shipping", "Payment Method", "Place Order"];

  return (
    <Col xs={12}>
      <ul className="d-flex text-center list-unstyled m-0">
        {titles.map((item, index) => (
          <li
            key={index.toString()}
            className={`flex-grow-1 fw-bold py-2 ${
              activeStep >= index
                ? "border-bottom border-2 border-primary text-primary"
                : "text-secondary"
            }`}
          >
            {item}
          </li>
        ))}
      </ul>
    </Col>
  );
}

export default CheckoutWizard;
