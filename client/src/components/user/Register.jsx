import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const Register = () => {
  const initialValues = {
    firstName: "",
    lastName: "",
    mi: "",
    email: "",
    password: "",
    passwordConfirm: "",
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    mi: Yup.string(),
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string().required("Password is required").min(6, "Password must be at least 6 characters"),
    passwordConfirm: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm password is required"),
  });

  const handleSubmit = (values) => {
    console.log(values);
  };

  return (
    <div>
      <h1>Registration</h1>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        <Form>
          <div>
            <label htmlFor="firstName">First Name:</label>
            <Field type="text" id="firstName" name="firstName" />
            <ErrorMessage name="firstName" component="div" className="error-message" />
          </div>
          <div>
            <label htmlFor="lastName">Last Name:</label>
            <Field type="text" id="lastName" name="lastName" />
            <ErrorMessage name="lastName" component="div" className="error-message" />
          </div>
          <div>
            <label htmlFor="mi">Middle Initial:</label>
            <Field type="text" id="mi" name="mi" />
            <ErrorMessage name="mi" component="div" className="error-message" />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <Field type="email" id="email" name="email" />
            <ErrorMessage name="email" component="div" className="error-message" />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <Field type="password" id="password" name="password" />
            <ErrorMessage name="password" component="div" className="error-message" />
          </div>
          <div>
            <label htmlFor="passwordConfirm">Confirm Password:</label>
            <Field type="password" id="passwordConfirm" name="passwordConfirm" />
            <ErrorMessage name="passwordConfirm" component="div" className="error-message" />
          </div>
          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </div>
  );
};

export default Register;
