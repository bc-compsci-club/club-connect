import React from 'react';

import { Button } from 'components/common';
import resetEmailSentStyles from './ResetEmailSent.module.scss';
import formStyles from 'styles/shared/Form.module.scss';

const ResetEmailSent = () => {
  return (
    <div>
      <p className={resetEmailSentStyles.resetPasswordText}>
        If an account exists with the email you entered, check your email for a
        link to finish resetting your password.
      </p>

      <Button
        classNamePassed={formStyles.cardSecondaryButtons}
        href="/login"
        big
        asLink
      >
        Return to Log In
      </Button>
    </div>
  );
};

export default ResetEmailSent;
