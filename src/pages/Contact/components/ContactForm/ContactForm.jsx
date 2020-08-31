// @flow
import React, { Component } from 'react';
import Axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import './ContactForm.scss';

class ContactForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      message: '',
      disabled: false,
      emailSent: null,
    };
  }

  handleChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    console.log(event.target);

    this.setState({
      disabled: true,
    });

    Axios.post(
      'https://bc-cs-club-website.ue.r.appspot.com/api/email',
      this.state
    )
      .then((res) => {
        if (res.data.success) {
          this.setState({
            disabled: false,
            emailSent: true,
          });
        } else {
          this.setState({
            disabled: false,
            emailSent: false,
          });
        }
      })
      .catch((err) => {
        console.log(err);

        this.setState({
          disabled: false,
          emailSent: false,
        });
      });
  };

  render() {
    return (
      <section className="contact">
        <div className="contact-container">
          <Form onSubmit={this.handleSubmit}>
            {/* input fields */}

            <div className="fields">
              <Form.Group>
                <Form.Label className="helloworld" htmlFor="full-name">
                  Full Name
                </Form.Label>
                <Form.Control
                  id="full-name"
                  name="name"
                  type="text"
                  value={this.state.name}
                  onChange={this.handleChange}
                  required
                />
              </Form.Group>

              <Form.Group>
                <Form.Label htmlFor="email">Email</Form.Label>
                <Form.Control
                  id="email"
                  name="email"
                  type="email"
                  value={this.state.email}
                  onChange={this.handleChange}
                  required
                />
              </Form.Group>

              <Form.Group>
                <Form.Label htmlFor="message">Message</Form.Label>
                <Form.Control
                  id="message"
                  name="message"
                  as="textarea"
                  rows="5"
                  value={this.state.message}
                  onChange={this.handleChange}
                  required
                />
              </Form.Group>
            </div>

            {/* Button sends the email */}
            <Button type="submit" disabled={this.state.disabled}>
              Send Message
            </Button>

            {/* Approval/Rejection alert */}
            <div className="alertMessage">
              {this.state.emailSent === true && (
                <Alert
                  variant="success"
                  onClose={() => this.setState({ emailSent: null })}
                  dismissible
                >
                  <Alert.Heading>Email sent!</Alert.Heading>
                  <p>Our representive will contact you shorltly!</p>
                </Alert>
              )}
              {this.state.emailSent === false && (
                <Alert
                  variant="danger"
                  onClose={() => this.setState({ emailSent: null })}
                  dismissible
                >
                  <Alert.Heading>Email not sent!</Alert.Heading>
                  <p>
                    Sorry, there is a problem on our end. Please contact us at
                    <a href="mailto:contact@bccompsci.club">
                      contact@bccompsci.club
                    </a>
                    manually.
                  </p>
                </Alert>
              )}
            </div>
          </Form>
        </div>
      </section>
    );
  }
}

export default ContactForm;
