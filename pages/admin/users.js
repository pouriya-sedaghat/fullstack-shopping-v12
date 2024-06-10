import Layout from "../../layout/Layout";

import { Row, Col } from "reactstrap";

import AdminMenu from "../../components/AdminMenu";

import { useState, useEffect } from "react";

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  async function getUsers() {
    const respose = await fetch("/api/admin/user");

    const data = await respose.json();

    setUsers(data);
  }

  return (
    <Layout title="Users">
      <Row className="py-4">
        <AdminMenu />
        <Col
          xs={9}
          className="d-flex flex-wrap justify-content-center align-content-center offset-1 bg-dark text-light p-3 rounded-4 my-3"
        >
          <h2 className="h5 w-100">Users</h2>
          <table className="table table-bordered table-light table-hover table-striped text-center align-middle">
            <thead>
              <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Is Admin</th>
              </tr>
            </thead>
            <tbody>
              {users.map((item) => (
                <tr key={item._id}>
                  <td>{item.username}</td>
                  <td>{item.email}</td>
                  <td>{item.isAdmin ? "True" : "False"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Col>
      </Row>
    </Layout>
  );
}

Users.auth = { onlyAdmin: true };

export default Users;
