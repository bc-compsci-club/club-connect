import React from 'react';

import './Join.scss';

const Join = () => {
  return (
    <div className="Join">
      <h1>Join the Club</h1>

      {/* Temporary solution from the old club website until we get a real sign up system working */}
      <div id="mc_embed_signup">
        <form
          action="https://facebook.us19.list-manage.com/subscribe/post?u=10977c9f89dfd57c862cbd7a0&amp;id=70d61209ae"
          method="post"
          id="mc-embedded-subscribe-form"
          name="mc-embedded-subscribe-form"
          // class="validate"
          target="_blank"
          // novalidate
        >
          <div id="mc_embed_signup_scroll">
            <div className="w3-text-white">
              <span className="w3-text-red">*</span> indicates required
            </div>
            <div className="w3-input">
              <label htmlFor="mce-FNAME">First Name </label>
              <input
                className="w3-input"
                type="text"
                value=""
                name="FNAME"
                id="mce-FNAME"
              />
            </div>
            <div className="w3-input">
              <label htmlFor="mce-LNAME" className="w3-text-white">
                Last Name{' '}
              </label>
              <input
                className="w3-input"
                type="text"
                value=""
                name="LNAME"
                id="mce-LNAME"
              />
            </div>
            <div className="w3-input">
              <label htmlFor="mce-EMAIL" className="w3-text-white">
                Email Address<span className="w3-text-red">*</span>
              </label>
              <input
                className="w3-input"
                type="email"
                value=""
                name="EMAIL"
                id="mce-EMAIL"
              />
            </div>
          </div>
          <div id="mce-responses" className="clear">
            <div className="response" id="mce-error-response"></div>
            <div className="response" id="mce-success-response"></div>
          </div>
          <div aria-hidden="true">
            <input
              id="hidden_field"
              type="text"
              name="b_10977c9f89dfd57c862cbd7a0_70d61209ae"
              tabIndex="-1"
              value=""
            />
          </div>
          <div className="clear">
            <input
              type="submit"
              value="Subscribe"
              name="subscribe"
              id="mc-embedded-subscribe"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Join;
