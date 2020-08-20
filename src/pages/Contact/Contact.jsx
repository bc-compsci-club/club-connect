import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import ContactForm from "./components/Contact Form";



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
    <div className="Home">
      <article>
        <Header width={width} />
        {/* <Header width={width} />
        <Email />
        <SocialMedia width={width} /> */}
        <ContactForm />
      </article>
    </div>
  );
};

export default Contact;