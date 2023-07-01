import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Container, Row, Col, Card } from "react-bootstrap";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import "./register.css";
import { AES } from "crypto-js";

const Register = () => {
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirm: "",
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required("Please enter a first name").max(100, "First name cannot have more than 100 characters"),
    lastName: Yup.string().required("Please enter a last name").max(100, "Last name cannot have more than 100 characters"),
    email: Yup.string().email("Invalid Email").required("Please enter a valid email").max(255, "Email cannot have more than 255 characters"),
    password: Yup.string()
      .required("Please enter a password")
      .max(100, "Password cannot have more than 100 characters")
      .matches("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$", "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"),
    passwordConfirm: Yup.string()
      .required("Please confirm your password")
      .oneOf([Yup.ref("password")], "Passwords must match"),
  });

  const handleSubmit = (values) => {
    const registrationSuccessful = true;
    Swal.fire("Success", "Thank You For Registering! :)", "success");

    const encryptedPassword = AES.encrypt(values.password, "secret-key").toString();
    values.password = encryptedPassword;
    const encryptedPasswordConfirm = AES.encrypt(values.passwordConfirm, "secret-key").toString();
    values.passwordConfirm = encryptedPasswordConfirm;

    console.log(values);

    localStorage.setItem("register", JSON.stringify(values));
  };

  return (
    <Container className="register-container">
      <Row className="justify-content-center">
        <Col xs={12} sm={8} md={6} lg={5} xl={4}>
          <Card className="register-form">
            <Card.Body>
              <h1 className="register-title">Register Account</h1>
              <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                <Form>
                  <div className="form-group">
                    <label htmlFor="firstName">First Name</label>
                    <Field type="text" id="firstName" name="firstName" className="form-control" />
                    <ErrorMessage name="firstName" component="div" className="error-message" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <Field type="text" id="lastName" name="lastName" className="form-control" />
                    <ErrorMessage name="lastName" component="div" className="error-message" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <Field type="email" id="email" name="email" className="form-control" />
                    <ErrorMessage name="email" component="div" className="error-message" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <Field type="password" id="password" name="password" className="form-control" />
                    <ErrorMessage name="password" component="div" className="error-message" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="passwordConfirm">Confirm Password</label>
                    <Field type="password" id="passwordConfirm" name="passwordConfirm" className="form-control" />
                    <ErrorMessage name="passwordConfirm" component="div" className="error-message" />
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </Form>
              </Formik>
            </Card.Body>
            <Card.Footer className="register-footer">
              <ul>
                <li>
                  Click{" "}
                  <a href="/login" className="text-inherit fw-semi-bold">
                    here
                  </a>{" "}
                  if you already have an account.
                </li>
                <li>
                  By signing up, you agree to our{" "}
                  <a href="/terms" className="text-inherit fw-semi-bold">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="/privacy" className="text-inherit fw-semi-bold">
                    Privacy Policy
                  </a>
                  .
                </li>
              </ul>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
