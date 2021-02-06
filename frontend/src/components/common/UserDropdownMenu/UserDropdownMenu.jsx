import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useDispatch } from 'react-redux';

import { getUserData, setLoggedOut } from 'utils/auth';
import { Button } from 'components/common';
import styles from './UserDropdownMenu.module.scss';

const UserDropdownMenu = (props) => {
  const { setDropdownMenuOpen } = props;

  const dispatch = useDispatch();
  const router = useRouter();

  return (
    <div className={styles.dropdown}>
      <div className={styles.memberName}>
        <strong>
          {getUserData().firstName} {getUserData().lastName}
        </strong>
      </div>

      <hr className={styles.divider} />

      <ul className={styles.dropdownList}>
        {getUserData().role === 'Admin' ? (
          <>
            <li>
              <Link href={'/announcements/post'}>
                <a onClick={() => setDropdownMenuOpen(false)}>
                  Post Announcement
                </a>
              </Link>
            </li>
            <li>
              <Link href={'/events/create'}>
                <a onClick={() => setDropdownMenuOpen(false)}>Create Event</a>
              </Link>
            </li>
          </>
        ) : (
          <li>
            <Link href={'/events/request'}>
              <a onClick={() => setDropdownMenuOpen(false)}>Request Event</a>
            </Link>
          </li>
        )}
        <li>
          <Link href={'/settings'}>
            <a onClick={() => setDropdownMenuOpen(false)}>Settings</a>
          </Link>
        </li>
        <li className={styles.logOutButton}>
          <Button
            onClick={() => {
              setDropdownMenuOpen(false);
              setLoggedOut(dispatch, router);
            }}
          >
            Log Out
          </Button>
        </li>
      </ul>
    </div>
  );
};

export default UserDropdownMenu;
