import React from 'react';
import Head from 'next/head';

import ContactForm from 'components/contact/ContactForm';
import commonStyles from 'styles/commonStyles.module.scss';
import contactStyles from 'styles/pages/Contact.module.scss';
import { SITE_TITLE_BASE } from 'pages/_app';

const Contact = () => {
  return (
    <>
      <Head>
        <title>Contact | {SITE_TITLE_BASE}</title>
      </Head>
      <div className={`${commonStyles.text} ${contactStyles.contact}`}>
        <section>
          <article>
            <h1 className={commonStyles.centerElement}>Contact Us</h1>
            <p>
              If you have any questions, comments, and/or concerns, are
              interested in leading an event, want to sponsor the club, or have
              something else you want to talk to us about, you&apos;ve come to
              the right place!
            </p>
            <p>
              Please fill out the form below and we&apos;ll be in touch shortly.
              Thank you!
            </p>
          </article>
        </section>
        <ContactForm />
      </div>
    </>
  );
};

export default Contact;
