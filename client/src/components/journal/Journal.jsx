import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Container, Row, Col, Button } from "react-bootstrap";
import "./journal.css";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

const JournalEntry = () => {
  const [selectedDate] = useState(new Date());

  const initialValues = {
    date: selectedDate,
    subject: "",
    entry: "",
    emotion: "",
  };

  const validationSchema = Yup.object({
    date: Yup.date().required("Date is required"),
    subject: Yup.string().required("Subject is required"),
    entry: Yup.string().required("Entry is required"),
    emotion: Yup.number().required("Emotion is required").min(1, "Emotion must be between 1 and 10").max(10, "Emotion must be between 1 and 10"),
  });

  // let evaluator = {
  //   ideation: () => {
  //     return true;
  //   },
  // };

  const handleSubmit = (values) => {
    console.log("Form values:", values);

    if (values.emotion <= 3 /*|| evaluator.ideation(values.entry) == true*/) {
      Swal.fire({
        title: "Flagged!",
        text: "Your mood indicates a noticeable downtrend. Please call the reference number for assistance.",
        icon: "warning",
        showCancelButton: false,
        confirmButtonText: "Call Now",
        allowOutsideClick: false,
      }).then((result) => {
        console.log("User's response:", result);

        if (result.isConfirmed) {
          window.location.href = "tel:8675309";
        }
      });
    } else {
      Swal.fire("Success", "Good Job :)", "success");
    }
    localStorage.setItem("journal entry", JSON.stringify(values));
    const parsedEntries = storedEntries ? JSON.parse(storedEntries) : [];

    console.log("Journal entry stored in local storage.");
  };

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${month}/${day}/${year}`;
  };

  return (
    <Container>
      <h1>Date Of Entry: {formatDate(selectedDate)}</h1>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        <Form>
          <Row>
            <Col>
              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <Field type="text" id="subject" name="subject" className="form-control" placeholder="Life is great! :)" />
                <ErrorMessage name="subject" component="div" className="error-message" />
              </div>
              <div className="journal-entry">
                <label htmlFor="entry">Journal Entry</label>
                <br />
                <Field as="textarea" id="entry" name="entry" className="form-control" placeholder="Journal Entry: Today has been a good day" />
                <ErrorMessage name="entry" component="div" className="error-message" />
              </div>
              <div className="emotion-meter">
                <label htmlFor="emotion">Emotional Meter</label>
                <br />
                <Field as="select" id="emotion" name="emotion" className="form-control">
                  <option value="">Select an emotion level</option>
                  <option value="1">😞 1 </option>
                  <option value="2">😔 2</option>
                  <option value="3">😕 3</option>
                  <option value="4">😐 4</option>
                  <option value="5">🙂 6</option>
                  <option value="6">😊 6</option>
                  <option value="7">😀 7</option>
                  <option value="8">😃 8 </option>
                  <option value="9">😄 9 </option>
                  <option value="10">😆 10 </option>
                </Field>
                <ErrorMessage name="emotion" component="div" className="error-message" />
              </div>
              <br />
              <Button type="submit" variant="primary" className="button-submit">
                Submit
              </Button>
            </Col>
          </Row>
        </Form>
      </Formik>
    </Container>
  );
};

export default JournalEntry;
