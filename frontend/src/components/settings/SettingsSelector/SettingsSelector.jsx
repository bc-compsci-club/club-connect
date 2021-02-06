import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';

import settingsSelectorStyles from './SettingsSelector.module.scss';

const SettingsSelector = (props) => {
  const { currentSection, setCurrentSection } = props;

  return (
    <aside className={settingsSelectorStyles.container}>
      <h3 className={settingsSelectorStyles.heading}>Settings</h3>
      <hr />
      <ul className={settingsSelectorStyles.settingsList}>
        <SettingsLink
          sectionId="profile"
          currentSection={currentSection}
          setCurrentSection={setCurrentSection}
        >
          Profile
        </SettingsLink>
        <SettingsLink
          sectionId="account"
          currentSection={currentSection}
          setCurrentSection={setCurrentSection}
        >
          Account
        </SettingsLink>
        <SettingsLink
          sectionId="bcverification"
          currentSection={currentSection}
          setCurrentSection={setCurrentSection}
        >
          BC Verification
        </SettingsLink>
      </ul>
    </aside>
  );
};

const SettingsLink = (props) => {
  const { sectionId, currentSection, setCurrentSection, children } = props;

  return (
    <li className={settingsSelectorStyles.settingsLink}>
      <Link href={`/settings?section=${sectionId}`}>
        <a
          className={`${settingsSelectorStyles.link}${
            currentSection === sectionId
              ? ' ' + settingsSelectorStyles.linkSelected
              : ''
          }`}
          onClick={() => setCurrentSection(sectionId)}
        >
          {children}
        </a>
      </Link>
    </li>
  );
};

SettingsLink.propTypes = {
  sectionId: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default SettingsSelector;
