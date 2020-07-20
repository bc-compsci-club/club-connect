// @flow
import React from 'react';
import './Join.scss';

const Join = () => {
  return (
    <div className="Join">
      <h1>Join the Club</h1>
      <form
        name="join"
        method="POST"
        data-netlify="true"
        data-netlify-recaptcha="true"
      >
        <table>
          <tbody>
            <tr>
              <td>
                <label htmlFor="first-name">First Name</label>
              </td>
              <td>
                <input type="text" name="first-name" id="first-name" required />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="last-name">Last Name</label>
              </td>
              <td>
                <input type="text" name="last-name" id="last-name" required />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="email">Email Address</label>
              </td>
              <td>
                <input type="email" name="email" id="email" required />
              </td>
            </tr>
          </tbody>
        </table>
        <div data-netlify-recaptcha="true"></div>
        <input type="submit" value="Join the Club" />
      </form>
    </div>
  );
};

export default Join;
