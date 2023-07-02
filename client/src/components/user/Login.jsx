import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./login.css";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

const Login = () => {
  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid Email").required("Please enter a valid email").max(255, "Email cannot have more than 255 characters"),
    password: Yup.string()
      .required("Please enter a password")
      .max(100, "Password cannot have more than 100 characters")
      .matches("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$", "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"),
  });

  const handleSubmit = (values) => {
    const registrationSuccessful = true;
    Swal.fire("Success", "Welcome Back! :)", "success");

    const encryptedPassword = AES.encrypt(values.password, values.password).toString();
    values.password = encryptedPassword;

    console.log(values);
    localStorage.setItem("login", JSON.stringify(values));
  };

  return (
    <div className="login-container">
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        <Form className="login-form">
          <h1 className="login-title">Sign In</h1>
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
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default Login;
