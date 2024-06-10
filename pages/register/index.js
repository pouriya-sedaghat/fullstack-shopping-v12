import Layout from "../../layout/Layout";

import { Row, Col } from "reactstrap";

import { useForm } from "react-hook-form";

import { signIn } from "next-auth/react";

import { useSession } from "next-auth/react";

import { useEffect } from "react";

import { useRouter } from "next/router";

import { toast } from "react-toastify";

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { data: session } = useSession();

  const router = useRouter();

  async function submitHandler({ username, email, password }) {
    const reqBody = { username, email, password };

    const response = await fetch("/api/user", {
      method: "POST",
      body: JSON.stringify({ username, email, password }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();

    if (data.massage) {
      toast.error(data.massage);
    } else {
      try {
        const result = await signIn("credentials", {
          redirect: true,
          callbackUrl: "/",
          email,
          password,
        });
        if (result.error) console.log("Failed To Sigin.");
      } catch (err) {
        console.log(err);
      }
    }
  }

  useEffect(() => {
    if (session?.user) {
      router.push("/");
    }
  }, [session, router]);

  return (
    <Layout title="Register">
      <Row className="justify-content-center py-4">
        <Col
          xs={3}
          className="d-flex justify-content-center bg-dark text-light rounded-5 my-3"
        >
          <form onSubmit={handleSubmit(submitHandler)} className="py-4">
            <h2 className="h5">Register</h2>
            <div>
              <label htmlFor="username">Username :</label>
              <br />
              <input
                type="text"
                placeholder="Enter Your Username"
                id="username"
                {...register("username", { required: true })}
                className="bg-transparent text-reset border border-light rounded mt-1 py-1 px-2"
                autoFocus
              />
              {errors.username && (
                <small className="d-block text-danger my-1">
                  Please Enter Your Username.
                </small>
              )}
            </div>
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
            <button className="btn btn-outline-primary d-block mx-auto mt-3 py-1">
              Register
            </button>
          </form>
        </Col>
      </Row>
    </Layout>
  );
}

export default Register;
