import { Col } from "reactstrap";

import Link from "next/link";

function AdminMenu() {
  return (
    <Col
      xs={2}
      className="my-3 p-2 align-self-start d-flex justify-content-center text-light bg-dark rounded-4"
    >
      <ul className="list-unstyled m-0">
        <li className="my-1">
          <Link
            href="/admin/dashboard"
            d
            className="text-reset text-decoration-none p-2"
          >
            Dashboard
          </Link>
        </li>
        <li className="my-1">
          <Link
            href="/admin/users"
            d
            className="text-reset text-decoration-none p-2"
          >
            Users
          </Link>
        </li>
        <li className="my-1">
          <Link
            href="/admin/products"
            d
            className="text-reset text-decoration-none p-2"
          >
            Products
          </Link>
        </li>
        <li className="my-1">
          <Link
            href="/admin/orders"
            d
            className="text-reset text-decoration-none p-2"
          >
            Orders
          </Link>
        </li>
      </ul>
    </Col>
  );
}

export default AdminMenu;
