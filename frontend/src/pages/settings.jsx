import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import queryString from 'query-string';

import {
  AccountSettings,
  BCVerificationSettings,
  MemberHeader,
  ProfileSettings,
  SettingsSelector,
} from 'components/settings';
import { ensureUserIsAuthenticated, refreshUserData } from 'utils/auth';
import { getItemJson } from 'utils/localStorageJsonUtils';
import settingsStyles from 'styles/pages/Settings.module.scss';
import commonStyles from 'styles/commonStyles.module.scss';
import { SITE_NAME_BASE } from 'pages/_app';

const Settings = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [pageLoaded, setPageLoaded] = useState(false);
  const [currentSection, setCurrentSection] = useState('profile');

  useEffect(async () => {
    if (!(await ensureUserIsAuthenticated(router, dispatch))) {
      return;
    }

    await refreshUserData();

    const parsedQueryString = queryString.parse(location.search);
    const queriedSection = parsedQueryString.section;

    if (
      queriedSection === 'profile' ||
      queriedSection === 'account' ||
      queriedSection === 'bcverification'
    ) {
      setCurrentSection(parsedQueryString.section);
    }

    setPageLoaded(true);
  }, []);

  return (
    <>
      <Head>
        <title>Settings – {SITE_NAME_BASE}</title>
      </Head>

      <div
        className={`${commonStyles.expandedWidthContainer} ${settingsStyles.settings}`}
      >
        {pageLoaded && (
          <>
            <MemberHeader userData={getItemJson('loggedInUserData')} />
            <div className={settingsStyles.selectorAndSection}>
              <div className={settingsStyles.settingsSelector}>
                <SettingsSelector
                  currentSection={currentSection}
                  setCurrentSection={setCurrentSection}
                />
              </div>

              <div className={settingsStyles.settingsSection}>
                {currentSection === 'profile' && <ProfileSettings />}
                {currentSection === 'account' && <AccountSettings />}
                {currentSection === 'bcverification' && (
                  <BCVerificationSettings />
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Settings;
