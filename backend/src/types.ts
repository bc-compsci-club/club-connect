import { ParamsDictionary } from 'express-serve-static-core';

import { Roles } from './security/accessControl';

// Common data for club events.
export interface ClubEventBase {
  internalName: string;
  title: string;
  banner?: string;
  presentingMemberId?: number; // Refers to `memberId` on `member` table
  startDateTime?: Date;
  endDateTime?: Date;
  eventLocation?: string;
  shortDescription?: string;
  longDescription?: string;
  externalLink?: string;
  externalLinkButtonText?: string;
}

// Common data for verifications.
export interface VerificationBase {
  key: string;
  expiryDateTime: Date;
  memberId: number;
}

// Represents a registered member saved in the user's browser's localStorage.
export interface MemberData {
  memberId: number;
  firstName: string;
  lastName: string;
  email: string;
  brooklynCollegeEmail?: string;
  memberImage?: string;
  role: Roles;
}

/**
 * A listing in the event browser
 *
 * @deprecated
 */
export interface ClubEventListing {
  id: number;
  internalName: string;
  title: string;
  banner?: string; // A link to the banner on Google Cloud Storage
}

// Required credentials to authenticate a member
export interface AuthenticationCredentials {
  email: string;
  password: string;
}

// Required data to register a new member
export interface RegisteringMember extends AuthenticationCredentials {
  firstName: string;
  lastName: string;
}

export interface JoiningMember {
  firstName: string;
  lastName: string;
  email: string;
}

export interface PasswordResetBody {
  key: string;
  password: string;
}

// Contents of the JWT used to authenticate
export interface JwtContents {
  memberId: string;
  expires: number;
}

// Options for the image processor cloud function.
export interface ImageProcessorOptions {
  crop?: {
    cropUsing: 'ratio' | 'resolution';
    horizontal: number;
    vertical: number;
  };
  resize?: {
    ignoreAspectRatio?: boolean;
    width: number;
    height: number;
  };
  optimize?: {
    quality?: number;
  };
}

// Common Request Params
// ParamsDictionary requires strings for all members
export interface IdParams extends ParamsDictionary {
  id: string;
}

// Common Request Bodies
export interface FormMultipartBody {
  formDataJson: string;
}

export interface EmailBody {
  email: string;
}

export interface VerificationBody {
  key: string;
  password: string;
}
