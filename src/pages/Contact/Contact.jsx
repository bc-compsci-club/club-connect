// @flow
import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import ContactForm from './components/ContactForm';
import './Contact.scss';

const Contact = () => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleResize = () => {
    setWidth(window.innerWidth);
  };

  return (
    <div className="Contact">
      <article>
        <Header width={width} />
        <ContactForm />
      </article>
    </div>
  );
};

export default Contact;
