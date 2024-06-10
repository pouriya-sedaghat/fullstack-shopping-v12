import { Col } from "reactstrap";

import Link from "next/link";
import Image from "next/image";

import { useContext } from "react";
import { CartContext } from "../context/cart";

import { toast } from "react-toastify";

function ProductItem(props) {
  const {
    state: {
      cart: { cartItems },
    },
    dispatch,
  } = useContext(CartContext);

  function addToCartHandler(product) {
    const existingItem = cartItems.find((item) => item.slug === product.slug);

    const quantity = existingItem ? existingItem.quantity + 1 : 1;

    if (product.count < quantity) return toast.error("Product Is Out.");

    dispatch({ type: "ADD_ITEM", payload: { ...product, quantity } });

    toast.success("Product Added.");
  }

  return (
    <Col xs={3} className="d-flex justify-content-center py-3">
      <div>
        <Link
          href={`/product/${props.slug}`}
          className="d-block overflow-hidden rounded"
        >
          <Image src={props.image} width={200} height={290} alt={props.title} />
        </Link>
        <div className="px-1 pt-3">
          <h2 className="h5">Title : {props.title}</h2>
          <p>Price : {props.price.toLocaleString() + " IRR"}</p>
          <button
            onClick={() => addToCartHandler(props)}
            className="btn btn-dark opacity-75 d-block mx-auto"
          >
            Add To Cart
          </button>
        </div>
      </div>
    </Col>
  );
}

export default ProductItem;
