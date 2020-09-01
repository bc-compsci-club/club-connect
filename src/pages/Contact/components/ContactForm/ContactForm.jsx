// @flow
import React, { useState } from 'react';
import Axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import './ContactForm.scss';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [disabled, setDisabled] = useState(false);
  const [emailSent, setEmailSent] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();

    setDisabled(true);

    Axios.post('https://bc-cs-club-website.ue.r.appspot.com/api/email', {
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
    <section className="contact">
      <div className="contact-container">
        <Form onSubmit={handleSubmit}>
          {/* input fields */}
          <div className="fields">
            <Form.Group>
              <Form.Label className="helloworld" htmlFor="full-name">
                Full Name*
              </Form.Label>
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

          {/* Approval/Rejection alert */}
          <div className="alertMessage">
            {emailSent !== null ? (
              emailSent ? (
                <Alert
                  variant="success"
                  // onClose={}
                  dismissible
                >
                  <Alert.Heading>Message sent!</Alert.Heading>
                  <p>
                    Thank you! We have received your message and will get back
                    to you shortly.
                  </p>
                </Alert>
              ) : (
                <>
                  <Button type="submit" disabled={disabled}>
                    {disabled ? 'Sending...' : 'Send Message'}
                  </Button>
                  <Alert
                    variant="danger"
                    // onClose={() => setEmailSent(null)}
                    dismissible
                  >
                    <Alert.Heading>Uh oh!</Alert.Heading>
                    <p>
                      It seems that there was a problem on our end! Please try
                      sending the message again above. If that doesn't work,
                      please send us your message by email at&nbsp;
                      <a href="mailto:contact@bccompsci.club">
                        contact@bccompsci.club
                      </a>
                      . We apologize for any inconvenience this may have caused!
                    </p>
                  </Alert>
                </>
              )
            ) : (
              <Button type="submit" disabled={disabled}>
                {disabled ? 'Sending...' : 'Send Message'}
              </Button>
            )}
          </div>
        </Form>
      </div>
    </section>
  );
};

export default ContactForm;
