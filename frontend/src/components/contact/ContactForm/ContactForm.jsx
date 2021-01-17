import { useState } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

import contactFormStyles from './ContactForm.module.scss';
import { API_ROOT } from 'pages/_app';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const [disabled, setDisabled] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [attemptedToSend, setAttemptedToSend] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setAttemptedToSend(true);
    setDisabled(true);

    axios
      .post(`${API_ROOT}/contact`, {
        name: name,
        email: email,
        message: message,
      })
      .then((res) => {
        if (res.data.success) {
          setEmailSent(true);
        } else {
          setDisabled(false);
          setEmailSent(false);
        }
      })
      .catch(() => {
        setDisabled(false);
        setEmailSent(false);
      });
  };

  return (
    <section className={contactFormStyles.contactForm}>
      <div className={contactFormStyles.container}>
        <Form onSubmit={handleSubmit}>
          {!emailSent && (
            <>
              <div className={contactFormStyles.fields}>
                <Form.Group>
                  <Form.Label htmlFor="full-name">Full Name*</Form.Label>
                  <Form.Control
                    id="full-name"
                    name="name"
                    type="text"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label htmlFor="email">Email*</Form.Label>
                  <Form.Control
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label htmlFor="message">Message*</Form.Label>
                  <Form.Control
                    id="message"
                    name="message"
                    as="textarea"
                    rows="5"
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    required
                  />
                </Form.Group>
              </div>

              <Button
                className={contactFormStyles.submitButton}
                type="submit"
                disabled={disabled}
              >
                {disabled ? 'Sending...' : 'Send Message'}
              </Button>
            </>
          )}
        </Form>

        {/* Success/Error Alert */}
        {/* Shown only if the user tried to send a message at least once */}
        {attemptedToSend && (
          <div
            className={`contact-form-alert ${contactFormStyles.alertMessage}`}
          >
            {emailSent ? (
              <Alert variant="success">
                <Alert.Heading>Message sent!</Alert.Heading>
                <p>
                  Thank you! We have received your message and will get back to
                  you soon.
                </p>
              </Alert>
            ) : (
              <Alert variant="danger">
                <Alert.Heading>Uh oh!</Alert.Heading>
                <p>
                  An error occurred while sending your message to us! Please try
                  clicking "Send Message" again. If that still doesn&apos;t
                  work, please send us your message by email at&nbsp;
                  <a href="mailto:contact@bccompsci.club">
                    contact@bccompsci.club
                  </a>
                  . We apologize for any inconvenience this may have caused!
                </p>
              </Alert>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default ContactForm;
