import { getUserData, getUserIsLoggedIn } from 'utils/auth';
import { toast } from 'react-toastify';

/**
 * Retrieves the logged in member's profile image.
 * @return {string} The URL of the member's profile image.
 */
export const getMemberImage = () => {
  if (getUserIsLoggedIn() && getUserData().memberImage) {
    return getUserData().memberImage;
  } else {
    return 'https://storage.googleapis.com/club-connect/public/member-images/default.png';
  }
};

/**
 * Checks whether or not an email is a Brooklyn College email.
 *
 * @param {string} email The email to verify
 * @return {boolean} Whether or not the email is a Brooklyn College email.
 */
export const isBrooklynCollegeEmail = (email) => {
  const domain = email.substring(email.lastIndexOf('@') + 1);
  return (
    domain === 'bcmail.cuny.edu' || // New BC student email
    domain === 'bcmail.brooklyn.cuny.edu' || // Old BC student email
    domain === 'brooklyn.cuny.edu' || // General BC email
    domain === 'sci.brooklyn.cuny.edu' // Department BC email
  );
};

/**
 * Shows a success toast in the top center of the screen.
 * @param {string} message The message to show.
 */
export const toastSuccessCenter = (message) => {
  toast.success(message, { position: 'top-center' });
};

/**
 * Shows an error toast in the top center of the screen.
 * @param {string} message The message to show.
 */
export const toastErrorCenter = (message) => {
  toast.error(message, { position: 'top-center' });
};
