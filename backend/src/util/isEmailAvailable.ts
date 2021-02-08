import RegisteredMemberModel from '../models/RegisteredMember.model';
import JoinedMemberModel from '../models/JoinedMember.model';
import { Op } from 'sequelize';

/**
 * Queries the registered member and joined member database to check if an email
 * is available for use.
 *
 * @param email The email to check.
 * @return Whether or not the email is available for use.
 */
export const isEmailAvailable = async (email: string): Promise<boolean> => {
  // Check registered members
  const foundRegisteredMember = await RegisteredMemberModel.findOne({
    where: {
      [Op.or]: [
        {
          email: email,
        },
        {
          brooklynCollegeEmail: email,
        },
      ],
    },
  });

  if (foundRegisteredMember !== null) {
    return false;
  }

  // No member exists in the registered member database, check joined users
  const foundJoinedMember = await JoinedMemberModel.findOne({
    where: { email: email },
  });

  return foundJoinedMember === null;
};
