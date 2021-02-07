import React from 'react';
import Accordion from 'react-bootstrap/Accordion';

import contributeStyles from 'styles/pages/Contribute.module.scss';

const Role = (props) => {
  return (
    <Accordion>
      <div className={contributeStyles.contributeRole}>
        <Accordion.Toggle
          className={contributeStyles.contributeRoleToggle}
          eventKey="0"
        >
          <h2>{props.title}</h2>
        </Accordion.Toggle>
        <Accordion.Collapse eventKey="0">
          <div>
            {props.children}
            <a
              className={contributeStyles.contributeRoleApply}
              href="https://bccompsci.club/contribute/apply"
              target="_blank"
              rel="noopener noreferrer"
            >
              Apply for this Role
            </a>
          </div>
        </Accordion.Collapse>
      </div>
    </Accordion>
  );
};

export default Role;
