import { Container, Row, Col } from "reactstrap";

import Link from "next/link";

import { useContext } from "react";
import { CartContext } from "../context/cart";

import React, { useState, useEffect } from "react";

import { useSession, signOut } from "next-auth/react";

import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import PropTypes from "prop-types";

import Cookies from "js-cookie";

function Header({ direction, ...args }) {
  const {
    state: {
      cart: { cartItems },
    },
    dispatch,
  } = useContext(CartContext);

  const [totalCountProducts, setTotalCountProducts] = useState(0);

  const { status, data: session } = useSession();

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);

  function signOutHandler() {
    signOut({ callbackUrl: "/login" });

    dispatch({ type: "CLEAR_HISTORY" });
  }

  useEffect(() => {
    setTotalCountProducts(
      cartItems.reduce((acc, cur) => acc + cur.quantity, 0)
    );
  }, [cartItems]);

  return (
    <Container fluid className="bg-dark text-light">
      <Row>
        <Col
          xs={12}
          className="d-flex justify-content-between align-items-center py-2"
        >
          <Link href="/" className="text-decoration-none text-reset">
            <h1 className="px-2 h4">Shopping</h1>
          </Link>
          <ul className="d-flex align-items-center list-unstyled mb-0">
            <li className="me-1">
              <Link
                href="/cart"
                className="text-decoration-none text-reset px-2"
              >
                Cart <span>{totalCountProducts}</span>
              </Link>
            </li>
            <li>
              {status === "loading" ? (
                "Loading..."
              ) : session?.user ? (
                <div className="d-flex">
                  <Dropdown
                    isOpen={dropdownOpen}
                    toggle={toggle}
                    direction={direction}
                  >
                    <DropdownToggle caret color="dark">
                      {session.user.name}
                    </DropdownToggle>
                    <DropdownMenu {...args} className="text-center w-100">
                      {session?.user?.isAdmin && (
                        <DropdownItem>
                          <Link
                            href="/admin/dashboard"
                            className="text-success text-decoration-none"
                          >
                            Dashboard
                          </Link>
                        </DropdownItem>
                      )}
                      <DropdownItem>
                        <Link
                          href="/order-history"
                          className="text-primary text-decoration-none"
                        >
                          Order History
                        </Link>
                      </DropdownItem>
                      <DropdownItem
                        onClick={signOutHandler}
                        className="text-danger"
                      >
                        Signout
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </div>
              ) : (
                <Link
                  href="/login"
                  className="text-decoration-none text-reset px-2"
                >
                  Login
                </Link>
              )}
            </li>
          </ul>
        </Col>
      </Row>
    </Container>
  );
}

export default Header;
