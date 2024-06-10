import Layout from "../../layout/Layout";

import { Row, Col } from "reactstrap";

import AdminMenu from "../../components/AdminMenu";

import { useState, useEffect } from "react";

function Dashboard() {
  const [count, setCount] = useState({});

  useEffect(() => {
    getCount();
  }, []);

  async function getCount() {
    const respose = await fetch("/api/admin/summary");

    const data = await respose.json();

    setCount(data);
  }

  return (
    <Layout title="Dashboard">
      <Row className="py-4">
        <AdminMenu />
        <Col
          xs={9}
          className="d-flex align-items-center offset-1 bg-dark text-light my-3 p-3 rounded-4"
        >
          <div className="w-25 d-flex justify-content-evenly bg-light text-dark text-center rounded-4 mx-auto">
            <div className="mx-2 py-2">
              <p className="mb-1">Users</p>
              <p className="m-0">{count.userCount}</p>
            </div>
            <div className="mx-2 py-2">
              <p className="mb-1">Products</p>
              <p className="m-0">{count.productCount}</p>
            </div>
            <div className="mx-2 py-2">
              <p className="mb-1">Orders</p>
              <p className="m-0">{count.orderCount}</p>
            </div>
          </div>
        </Col>
      </Row>
    </Layout>
  );
}

Dashboard.auth = { onlyAdmin: true };

export default Dashboard;
