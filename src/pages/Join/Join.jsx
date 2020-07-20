// @flow
import React from 'react';
import './Join.scss';

const Join = () => {
  return (
    <section className="Join">
      <div className="join-flex-container">
        <div className="join-container">
          <h1>Join the Club</h1>
          <form
            name="join"
            method="POST"
            action="/pages/Join/success"
            data-netlify="true"
            // data-netlify-recaptcha="true"
          >
            <input type="hidden" name="form-name" value="join" />
            <div className="form-name-row">
              <div className="form-first-name">
                <label htmlFor="first-name">First Name*</label>
                <input type="text" name="first-name" id="first-name" required />
              </div>

              <div className="form-last-name">
                <label htmlFor="last-name">Last Name*</label>
                <input type="text" name="last-name" id="last-name" required />
              </div>
            </div>

            <div className="form-email">
              <label htmlFor="email">Email Address*</label>
              <input type="email" name="email" id="email" required />
            </div>

            {/* <div data-netlify-recaptcha="true"></div> */}
            <br />
            <div>
              <input type="submit" value="Join!" />
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Join;
