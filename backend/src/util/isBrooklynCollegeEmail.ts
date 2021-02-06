/**
 * Checks whether or not an email is a Brooklyn College email.
 *
 * @param email The email to check.
 * @return Whether or not the email is a Brooklyn College email.
 */
export const isBrooklynCollegeEmail = (email: string): boolean => {
  const domain = email.substring(email.lastIndexOf('@') + 1);
  return (
    domain === 'bcmail.cuny.edu' || // New BC student email
    domain === 'bcmail.brooklyn.cuny.edu' || // Old BC student email
    domain === 'brooklyn.cuny.edu' || // General BC email
    domain === 'sci.brooklyn.cuny.edu' // Department BC email
  );
};
