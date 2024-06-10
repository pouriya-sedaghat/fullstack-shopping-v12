import Layout from "../../layout/Layout";

import { Row, Col } from "reactstrap";

import AdminMenu from "../../components/AdminMenu";

import { useState, useEffect } from "react";

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  async function getProducts() {
    const respose = await fetch("/api/admin/product");

    const data = await respose.json();

    setProducts(data);
  }

  return (
    <Layout title="Products">
      <Row className="py-4">
        <AdminMenu />
        <Col
          xs={9}
          className="d-flex flex-wrap justify-content-center align-content-center offset-1 bg-dark text-light p-3 rounded-4 my-3"
        >
          <h2 className="h5 w-100">Products</h2>
          <table className="table table-bordered table-light table-hover table-striped text-center align-middle">
            <thead>
              <tr>
                <th>Title</th>
                <th>Price</th>
                <th>Count</th>
              </tr>
            </thead>
            <tbody>
              {products.map((item) => (
                <tr key={item._id}>
                  <td>{item.title}</td>
                  <td>{item.price}</td>
                  <td>{item.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Col>
      </Row>
    </Layout>
  );
}

Products.auth = { onlyAdmin: true };

export default Products;
