import Link from "next/link";
import Layout from "../../layout/Layout";

import { Row, Col } from "reactstrap";

import { useForm } from "react-hook-form";

import { signIn } from "next-auth/react";

import { useSession } from "next-auth/react";

import { useEffect } from "react";

import { useRouter } from "next/router";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { data: session } = useSession();

  const router = useRouter();
  const { redirect } = router.query;

  async function submitHandler({ email, password }) {
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
      if (result.error) console.log("Failed To Sigin.");
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    if (session?.user) {
      router.push(redirect || "/");
    }
  }, [session, router, redirect]);

  return (
    <Layout title="Login">
      <Row className="justify-content-center py-4">
        <Col
          xs={3}
          className="d-flex justify-content-center bg-dark text-light rounded-5 my-3"
        >
          <form onSubmit={handleSubmit(submitHandler)} className="py-5">
            <h2 className="h5">Login</h2>
            <div>
              <label htmlFor="email">Email :</label>
              <br />
              <input
                type="email"
                placeholder="Enter Your Email"
                id="email"
                {...register("email", { required: true })}
                className="bg-transparent text-reset border border-light rounded mt-1 py-1 px-2"
                autoFocus
              />
              {errors.email && (
                <small className="d-block text-danger my-1">
                  Please Enter Your Email.
                </small>
              )}
            </div>
            <div className="my-2">
              <label htmlFor="password">Password :</label>
              <br />
              <input
                type="password"
                placeholder="Enter Your Password"
                id="password"
                {...register("password", {
                  required: true,
                  minLength: {
                    value: 5,
                    message: "Please Enter More Than 5 Characters.",
                  },
                })}
                className="bg-transparent text-reset border border-light rounded mt-1 py-1 px-2"
                autoFocus
              />
              {errors.password &&
                (errors.password.message ? (
                  <small className="d-block text-danger my-1">
                    {errors.password.message}
                  </small>
                ) : (
                  <small className="d-block text-danger my-1">
                    Please Enter Your Password.
                  </small>
                ))}
            </div>
            <div className="mb-3">
              <Link
                href="/register"
                className="text-decoration-none text-reset"
              >
                <small className="d-block my-1">
                  Don't Have An Account?
                  <span className="text-warning"> Register</span>
                </small>
              </Link>
            </div>
            <button className="btn btn-outline-primary d-block mx-auto py-1">
              login
            </button>
          </form>
        </Col>
      </Row>
    </Layout>
  );
}

export default Login;
