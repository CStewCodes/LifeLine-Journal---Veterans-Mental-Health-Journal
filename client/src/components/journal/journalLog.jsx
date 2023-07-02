import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";

const JournalLog = () => {
  const [journalEntries, setJournalEntries] = useState([]);

  useEffect(() => {
    const storedEntries = localStorage.getItem("journal entry");
    if (storedEntries) {
      setJournalEntries(JSON.parse(storedEntries));
    }
  }, []);

  const formatDate = (date) => {
    const formattedDate = new Date(date);
    const year = formattedDate.getFullYear();
    const month = String(formattedDate.getMonth() + 1).padStart(2, "0");
    const day = String(formattedDate.getDate()).padStart(2, "0");
    return `${month}/${day}/${year}`;
  };

  return (
    <Container>
      <h1>Journal Log</h1>
      <Row>
        <Col>
          {journalEntries.length > 0 ? (
            <ul>
              {journalEntries.map((entry, index) => (
                <li key={index}>
                  <p>Date: {formatDate(entry.date)}</p>
                  <p>Subject: {entry.subject}</p>
                  <p>Entry: {entry.entry}</p>
                  <p>Emotion: {entry.emotion}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No journal entries found.</p>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default JournalLog;
