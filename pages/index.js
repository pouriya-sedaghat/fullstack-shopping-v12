import Layout from "../layout/Layout";

// import { products } from "../data/products.json";

import { Row } from "reactstrap";

import ProductItem from "../components/ProductItem";

import db from "../utils/db";
import Product from "../models/product.model";

function Home({ products }) {
  return (
    <Layout title="Home">
      <Row className="py-4">
        {products.map((item) => (
          <ProductItem key={item.slug} {...item} />
        ))}
      </Row>
    </Layout>
  );
}

export async function getServerSideProps() {
  await db.content();

  const products = await Product.find().lean();

  return {
    props: { products: products.map(db.convertToObject) },
  };
}

export default Home;
