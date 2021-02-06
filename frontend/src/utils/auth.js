import axios from 'axios';
import { toast } from 'react-toastify';

import { getItemJson, setItemJson } from 'utils/localStorageJsonUtils';
import { toastErrorCenter } from 'utils/generalUtils';
import { logInAction, logOutAction } from 'actions/userLoggedIn';
import { API_ROOT } from 'pages/_app';

// Write to both Redux store and localStorage
// We use the Redux store because it auto-updates the header's state when the user logs out without needing to refresh the page
// If we only read from localStorage, we would have to pass the header state all over the place to avoid needing to refresh
export const setLoggedIn = async (dispatch) => {
  // Save user data in localStorage
  await refreshUserData();
  setItemJson('userLoggedIn', true);
  dispatch(logInAction());
};

export const setLoggedOut = async (dispatch, router, routeTo = '/') => {
  // Set Redux and localStorage to be logged out
  setItemJson('userLoggedIn', false);
  dispatch(logOutAction());

  // Push to unauthenticated route to avoid issues if the user is still on an
  // authenticated page and loggedInUserData is cleared
  await router.push(routeTo);

  // Clear local user data
  localStorage.removeItem('loggedInUserData');

  // Request to overwrite token with immediately expiring one to clear it
  try {
    await axios.post(
      `${API_ROOT}/accounts/logout`,
      {},
      {
        withCredentials: true,
      }
    );
  } catch (err) {
    toastErrorCenter(
      'An error occurred while logging you out. Please try again.'
    );
    console.error(err);
  }
};

export const refreshUserData = async () => {
  let res;
  try {
    res = await axios.get(`${API_ROOT}/accounts/data`, {
      withCredentials: true,
    });
  } catch (err) {
    toastErrorCenter(
      'There was an error while updating your member profile. Some parts of the portal may not function properly. Please try logging out and logging in again.'
    );
    console.error(err);
    return;
  }

  setItemJson('loggedInUserData', res.data);
};

/**
 * Authenticates the user and redirects them to login if they aren't logged in.
 * @param dispatch The Redux dispatch.
 * @param router The Next.js router.
 * @return {Promise<boolean>} True if the user is logged in, False otherwise and
 * redirects them to log in.
 */
export const ensureUserIsAuthenticated = async (router, dispatch) => {
  try {
    await axios.get(`${API_ROOT}/accounts/ping`, { withCredentials: true });
  } catch (err) {
    if (err.response && err.response.status === 401) {
      // Prompt to log in again
      await setLoggedOut(dispatch, router, '/login');
      await loginRedirect(router);
    }

    return false;
  }

  // User is authenticated
  return true;
};

/**
 * Redirects the user to the login page and redirects back to a path after a successful login.
 * @param {router} router A Next.js router instance
 * @returns {void}
 */
export const loginRedirect = async (router) => {
  toast.warn('Please log in before visiting this page.', {
    position: 'top-center',
  });

  await router.push({
    pathname: '/login',
    query: { returnToPage: router.asPath },
  });
};

export const getUserIsLoggedIn = () => {
  return getItemJson('userLoggedIn');
};

export const getUserData = () => {
  return getItemJson('loggedInUserData');
};
