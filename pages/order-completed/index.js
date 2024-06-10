import Layout from "../../layout/Layout";

import { Row, Col } from "reactstrap";

import Link from "next/link";

function OrderCompleted() {
  return (
    <Layout>
      <Row className="py-4">
        <Col xs={2} className="bg-dark offset-5 text-center rounded-5 text-light my-3 p-3">
          <h2 className="h5">Thanks For Order</h2>
          <Link href="/order-history" className="mx-auto">
            <button className="btn btn-outline-light">Order history</button>
          </Link>
        </Col>
      </Row>
    </Layout>
  );
}

export default OrderCompleted;
