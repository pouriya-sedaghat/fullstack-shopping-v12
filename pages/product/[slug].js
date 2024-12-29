import Layout from "../../layout/Layout";

import { useRouter } from "next/router";
import Image from "next/image";

// import { products } from "../../data/products.json";

import { Col, Row } from "reactstrap";

import { useContext } from "react";
import { CartContext } from "../../context/cart";

import db from "../../utils/db";
import Product from "../../models/product.model";

import { toast } from "react-toastify";

function ProductDetail({ loadedProduct }) {
  const router = useRouter();
  // const {
  //   query: { slug },
  // } = router;

  // const loadedProduct = products.find((item) => item.slug === slug);

  const {
    state: {
      cart: { cartItems },
    },
    dispatch,
  } = useContext(CartContext);

  function addToCartHandler() {
    const existingItem = cartItems.find(
      (item) => item.slug === loadedProduct.slug
    );

    const quantity = existingItem ? existingItem.quantity + 1 : 1;

    if (loadedProduct.count < quantity) return toast.error("Product Is Out.");

    dispatch({ type: "ADD_ITEM", payload: { ...loadedProduct, quantity } });

    toast.success("Product Added.");

    router.push("/cart");
  }

  if (!loadedProduct) return <div>Product Not Found.</div>;
  return (
    <Layout title={loadedProduct.title}>
      <Row className="py-4">
        <Col xs={12} className="text-dark py-3">
          <div className="text-center">
            <Image
              src={loadedProduct.image}
              width={240}
              height={330}
              alt={loadedProduct.title}
              className="rounded"
            />
          </div>
          <div>
            <h2 className="h5">{loadedProduct.title}</h2>
            <p>Category : {loadedProduct.category}</p>
            <p>{loadedProduct.description}</p>
            <p>Count : {loadedProduct.count}</p>
            <p>Price : {loadedProduct.price.toLocaleString() + " IRR"}</p>
            <button
              onClick={addToCartHandler}
              className="btn btn-dark opacity-75 d-block mx-auto"
            >
              Add To Cart
            </button>
          </div>
        </Col>
      </Row>
    </Layout>
  );
}

export async function getServerSideProps({ params: { slug } }) {
  await db.content();

  const product = await Product.findOne({ slug }).lean();

  return {
    props: { loadedProduct: product ? db.convertToObject(product) : null },
  };
}

export default ProductDetail;
