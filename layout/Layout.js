import Header from "../components/Header";
import Footer from "../components/Footer";

import Head from "next/head";

import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.min.css";

function Layout({ children, title }) {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <ToastContainer position="bottom-left" limit={1} />
      <Header />
      <main className="container">{children}</main>
      <Footer />
    </>
  );
}

export default Layout;
