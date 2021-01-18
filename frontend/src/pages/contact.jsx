import ContactForm from 'components/contact/ContactForm';
import commonStyles from 'styles/commonStyles.module.scss';
import contactStyles from 'styles/pages/Contact.module.scss';

const Contact = () => {
  return (
    <div className={`${commonStyles.styles} ${contactStyles.contact}`}>
      <section>
        <article>
          <h1>Contact Us</h1>
          <p>
            If you have any questions, comments, and/or concerns, are interested
            in leading an event, want to sponsor the club, or have something
            else you want to talk to us about, you&apos;ve come to the right
            place!
          </p>
          <p>
            Please fill out the form below and we&apos;ll be in touch shortly.
            Thank you!
          </p>
        </article>
      </section>
      <ContactForm />
    </div>
  );
};

export default Contact;
