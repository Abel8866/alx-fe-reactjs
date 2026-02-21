import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";

const registrationSchema = Yup.object({
  username: Yup.string().trim().required("Username is required"),
  email: Yup.string()
    .trim()
    .email("Enter a valid email")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export default function FormikForm() {
  return (
    <Formik
      initialValues={{ username: "", email: "", password: "" }}
      validationSchema={registrationSchema}
      onSubmit={(values, { resetForm }) => {
        console.log("Registration submitted:", values);
        resetForm();
      }}
    >
      <Form className="registration-form">
        <div className="form-field">
          <label htmlFor="username">Username</label>
          <Field
            id="username"
            name="username"
            type="text"
            autoComplete="username"
          />
          <ErrorMessage name="username" component="p" className="form-error" />
        </div>

        <div className="form-field">
          <label htmlFor="email">Email</label>
          <Field id="email" name="email" type="email" autoComplete="email" />
          <ErrorMessage name="email" component="p" className="form-error" />
        </div>

        <div className="form-field">
          <label htmlFor="password">Password</label>
          <Field
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
          />
          <ErrorMessage name="password" component="p" className="form-error" />
        </div>

        <button type="submit">Register</button>
      </Form>
    </Formik>
  );
}
