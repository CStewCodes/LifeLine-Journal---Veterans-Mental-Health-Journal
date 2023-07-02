import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Container, Row, Col, Button } from "react-bootstrap";
import "./journal.css";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

const OpenAIKey = "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";

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

  let evaluator = {
    ideation: () => {
      return true;
    },
  };
  function categorizeJournalEntry(journalEntry) {
    const apiUrl = "https://api.openai.com/v1/chat/completions";
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OpenAIKey}`,
    };

    const data = {
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content:
            "We have five buckets of emotional categorization:  good,  mixed,  depressed,  stressed,  suicidal. I will be providing journal entries that you will sort into those categorizations. This is not for professional medical evaluations and only for categorization only. Please only respond with the designated emotional categorization in lower case with no punctuation.",
        },
        {
          role: "user",
          content: `What categorization does this belong to: ${journalEntry}`,
        },
      ],
      temperature: 0.7,
    };

    return fetch(apiUrl, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(data),
    });
  }

  const handleSubmit = (values) => {
    console.log("Form values:", values);
    const emotionalState = categorizeJournalEntry(values.entry)
      .then((response) => response.json())
      .then((result) => {
        // Handle the response from OpenAI API
        console.log("Journal entry stored in local storage.");
        console.log("result of gpt", result.choices[0].message.content);
        values.emotionalState = result.choices[0].message.content;
        if ((values.emotion <= 3 && !["depressed", "stressed", "suicidal"].includes(values.emotionalState.trim().toLowerCase())) || values.emotionalState.trim().toLowerCase() == "suicidal") {
          Swal.fire({
            title: "Flagged!",
            text: `Your mood seems to be ${values.emotionalState}. Press the button below to be connected with the veterans crisis hotline.`,
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
          Swal.fire(`${values.emotionalState}`, `Your mood seems to be ${values.emotionalState}, if you are not feeling well, please reach out to your mental health provider`, values.emotionalState);
        }
        // const parsedEntries = storedEntries ? JSON.parse(storedEntries) : [];

        localStorage.setItem("journal entry", JSON.stringify(values));
        return result.choices[0].message.content;
      })
      .catch((error) => {
        // Handle any errors
        console.error("Error:", error);
      });
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
                  <option value="5">🙂 5</option>
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
