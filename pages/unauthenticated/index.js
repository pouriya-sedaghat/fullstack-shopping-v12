import Layout from "../../layout/Layout";

import { Row, Col } from "reactstrap";

function UnAuthenticated() {
  return (
    <Layout title="Access Denied">
      <Row className="py-4">
        <Col xs={12} className="my-3 p-3 text-center bg-dark text-light">
          <h2 className="h5 ">Access Denied</h2>
        </Col>
      </Row>
    </Layout>
  );
}

export default UnAuthenticated;
