import { AccessControl } from 'accesscontrol';

// Roles for club members.
export enum Roles {
  Member = 'Member', // Unverified club member
  BrooklynCollegeMember = 'BrooklynCollegeMember', // Brooklyn College verified club member
  Admin = 'Admin', // Executive Board member
}

// Resources that members can access.
export enum Resources {
  Announcements = 'Announcements',
  BrooklynCollegeAnnouncements = 'BrooklynCollegeAnnouncements',
  ClubEvents = 'ClubEvents',
}

const grants = {
  [Roles.Admin]: {
    [Resources.Announcements]: {
      'create:any': ['*'],
      'read:any': ['*'],
      'update:any': ['*'],
      'delete:any': ['*'],
    },
    [Resources.BrooklynCollegeAnnouncements]: {
      'create:any': ['*'],
      'read:any': ['*'],
      'update:any': ['*'],
      'delete:any': ['*'],
    },
    [Resources.ClubEvents]: {
      'create:any': ['*'],
      'read:any': ['*'],
      'update:any': ['*'],
      'delete:any': ['*'],
    },
  },
  [Roles.BrooklynCollegeMember]: {
    $extend: [Roles.Member],
    [Resources.BrooklynCollegeAnnouncements]: {
      'read:any': ['*'],
    },
  },
  [Roles.Member]: {},
};

const ac = new AccessControl(grants).lock();

export default ac;
