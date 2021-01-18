// Club event
import { Roles } from './security/accessControl';

// A full club event
export interface ClubEvent {
  id?: number; // Only optional before creating a new event and getting a new ID
  internalName: string;
  title: string;
  banner?: string;
  presenter?: string;
  presenterImage?: string;
  startDateTime?: Date;
  endDateTime?: Date;
  eventLocation?: string;
  shortDescription?: string;
  longDescription?: string;
  meetingLink?: string;
  buttonText?: string;
  hasEnded: boolean;
}

// A listing in the event browser
export interface ClubEventListing {
  id: number;
  internalName: string;
  title: string;
  banner?: string; // A link to the banner on Google Cloud Storage
}

// Club events sorted into upcoming and past events
export interface CategorizedClubEvents {
  upcomingEvents: ClubEvent[]
  pastEvents: ClubEvent[]
}

// Required data to authenticate a user
export interface AuthenticationCredentials {
  email: string;
  password: string;
}

// Adds "remember me" for when users try to log in
export interface LoggingInUser extends AuthenticationCredentials {
  rememberMe: boolean;
}

// Required data to register a new user
export interface RegisteringUser extends AuthenticationCredentials {
  firstName: string;
  lastName: string;
}

// Contents of the JWT used to authenticate
export interface JwtContents {
  userId: string;
  expires: number;
}

// Represents a fully registered user stored in the database
// We don't extend RegisteringUser because we store the hashed password instead of the raw password in AuthenticationCredentials
export interface User {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  passwordHash: string;
  role: Roles;
}

export interface VerifyEmailBody {
  type: 'BrooklynCollege' | 'Cuny';
  schoolEmail?: string;
}
