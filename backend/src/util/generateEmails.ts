import { MailDataRequired } from '@sendgrid/mail';

import { JoinedMemberInstance } from '../models/JoinedMember.model';
import { RegisteredMemberInstance } from '../models/RegisteredMember.model';
import { ClubEventRequestInstance } from '../models/ClubEventRequest.model';

/**
 * Generates a SendGrid email for account activations.
 *
 * @param member A Sequelize instance for a joined member.
 * @param activationKey The activation key used to activate the member's account.
 * @return The generated email.
 */
export const generateAccountActivationEmail = (
  member: JoinedMemberInstance,
  activationKey: string
): MailDataRequired => {
  return {
    to: member.email,
    from: process.env.SG_AND_ADMIN_EMAIL as string,
    replyTo: process.env.SG_AND_ADMIN_EMAIL as string,
    subject: 'Finish activating your BC Computer Science Club account',
    html: `
        Hi ${member.firstName},
        
        <br />
        <br />
        
        Thank you for activating your Brooklyn College Computer Science Club account! To complete the activation process, please open or copy and paste the link below in your browser. The activation link will be active for 24 hours.
        
        <br />
        <br />
        
        <a href="${process.env.FRONTEND_DOMAIN}/join/activate?key=${activationKey}">
          ${process.env.FRONTEND_DOMAIN}/join/activate?key=${activationKey}
        </a>
        
        <br />
        <br />
        
        If you didn't request to activate your account, you can safely ignore this email.
        
        <br />
        <br />
        
        Best,
        <br />
        The Brooklyn College Computer Science Club
        `,
  };
};

/**
 * Generates a SendGrid email for verifying a member's Brooklyn College email.
 *
 * @param bcEmail The Brooklyn College email to verify.
 * @param member A Sequelize instance for a registered member.
 * @param verificationKey The verification key used to verify the member's account.
 * @return The generated email.
 */
export const generateBrooklynCollegeVerificationEmail = (
  bcEmail: string,
  member: RegisteredMemberInstance,
  verificationKey: string
): MailDataRequired => {
  return {
    to: bcEmail,
    from: process.env.SG_AND_ADMIN_EMAIL as string,
    replyTo: process.env.SG_AND_ADMIN_EMAIL as string,
    subject: 'Please verify your Brooklyn College email address',
    html: `
        Hi ${member.firstName},
        
        <br />
        <br />
        
        Thank you for verifying your Brooklyn College email address for the Brooklyn College Computer Science Club! To complete the verification process, please open or copy and paste the link below in your browser. The verification link will be active for 24 hours.
        
        <br />
        <br />
        
        <a href='${process.env.FRONTEND_DOMAIN}/verify/bc?key=${verificationKey}'>
          ${process.env.FRONTEND_DOMAIN}/verify/bc?key=${verificationKey}
        </a>
        
        <br />
        <br />
        
        If you didn't request to verify your Brooklyn College email address, you can safely ignore this email.
        
        <br />
        <br />
        
        Best,
        <br />
        The Brooklyn College Computer Science Club
        `,
  };
};

/**
 * Generates a SendGrid email for resetting a registered club member's password.
 *
 * @param member A Sequelize instance for a registered member.
 * @param passwordResetKey The password reset key used to verify the member's account.
 * @return The generated email.
 */
export const generatePasswordResetEmail = (
  member: RegisteredMemberInstance,
  passwordResetKey: string
): MailDataRequired => {
  return {
    to: member.email,
    from: process.env.SG_AND_ADMIN_EMAIL as string,
    replyTo: process.env.SG_AND_ADMIN_EMAIL as string,
    subject: 'Reset your BC Computer Science Club account password',
    html: `
        Hi ${member.firstName},
        
        <br />
        <br />
        
        We received a request to reset your Brooklyn College Computer Science Club account's password. To finish resetting your password, please open or copy and paste the link below in your browser. The link will be active for 1 hour.
        
        <br />
        <br />
        
        <a href='${process.env.FRONTEND_DOMAIN}/resetpassword?key=${passwordResetKey}'>
          ${process.env.FRONTEND_DOMAIN}/resetpassword?key=${passwordResetKey}
        </a>
        
        <br />
        <br />
        
        If you didn't request to reset your password, you can safely ignore this email.
        
        <br />
        <br />
        
        Best,
        <br />
        The Brooklyn College Computer Science Club
        `,
  };
};

/**
 * Generates a SendGrid email for sending the club admins data about a submitted
 * event request.
 *
 * @param member A Sequelize instance for the registered member that submitted the event.
 * @param eventRequestData The data for the submitted event request.
 * @param requestNumber The request number of the submitted event request.
 * @return The generated email.
 */
export const generateEventRequestEmail = (
  member: RegisteredMemberInstance,
  eventRequestData: ClubEventRequestInstance,
  requestNumber: number
): MailDataRequired => {
  const bannerLink = `https://storage.cloud.google.com/${process.env.GOOGLE_CLOUD_STORAGE_BUCKET}/${eventRequestData.banner}`;

  return {
    to: process.env.SG_AND_ADMIN_EMAIL as string,
    from: process.env.SG_AND_ADMIN_EMAIL as string,
    replyTo: member.email,
    subject: `New Event Request From ${member.firstName} ${member.lastName}`,
    html: `
    ${member.firstName} ${member.lastName} (<a href='mailto:${member.email}'>${
      member.email
    }</a>) has submitted a new event request.
    
    <br />
    <br />
    <strong>Title:</strong> ${eventRequestData.title}
    <br />
    <strong>Start Date and Time:</strong> ${new Date(
      eventRequestData.startDateTime
    ).toLocaleString()}
    <br />
    <strong>End Date and Time:</strong> ${new Date(
      eventRequestData.endDateTime
    ).toLocaleString()}
    <br />
    <strong>Location:</strong> ${eventRequestData.eventLocation}
    <br />
    <strong>External Link:</strong> ${eventRequestData.externalLink}
    <br />
    
    <br />
    <strong>Short Description:</strong>
    <br />
    ${eventRequestData.shortDescription}
    <br />
    
    <br />
    <strong>Long Description:</strong>
    <br />
    ${eventRequestData.longDescription}
    <br />
    
    <br />
    <strong>Banner (Requires Login):</strong> <a href=${bannerLink}>${bannerLink}</a>
    <br />
    
    <br />
    <strong>Internal Name:</strong> ${eventRequestData.internalName}
    <br />
    <strong>External Link Button Text:</strong> ${
      eventRequestData.externalLinkButtonText
    }
    <br />
    <strong>Request Number: </strong> ${requestNumber}
    <br />
    <strong>Submitting Member ID: </strong> ${member.memberId}
    `,
  };
};
