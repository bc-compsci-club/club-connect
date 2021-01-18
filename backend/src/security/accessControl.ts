import { AccessControl } from 'accesscontrol';

export enum Roles {
  Member = 'Member', // Unverified club member
  CunyMember = 'CunyMember', // CUNY verified club member
  BrooklynCollegeMember = 'BrooklynCollegeMember', // Brooklyn College verified club member
  Admin = 'Admin', // Executive Board member
}

export enum Resources {
  Announcements = 'Announcements',
  BrooklynCollegeAnnouncements = 'BrooklynCollegeAnnouncements',
  CunyAnnouncements = 'CunyAnnouncements',
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
    [Resources.CunyAnnouncements]: {
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
    $extend: [Roles.CunyMember],
    [Resources.BrooklynCollegeAnnouncements]: {
      'read:any': ['*'],
    },
  },
  [Roles.CunyMember]: {
    [Resources.CunyAnnouncements]: {
      'read:any': ['*'],
    },
  },
  [Roles.Member]: {},
};

console.log(grants);

const ac = new AccessControl(grants).lock();

export default ac;
