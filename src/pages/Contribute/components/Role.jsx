import React from 'react';
import { Link } from 'react-router-dom';
import Accordion from 'react-bootstrap/Accordion';

const Role = (props) => {
  return (
    <Accordion>
      <div className="Contribute-Role">
        <Accordion.Toggle as={Link} variant="link" eventKey="0">
          <h2>{props.title}</h2>
        </Accordion.Toggle>
        <Accordion.Collapse eventKey="0">
          <div>
            {props.children}
            <a
              href="https://bccompsci.club/contribute/apply"
              className="role-apply"
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
