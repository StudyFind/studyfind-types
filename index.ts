// CUSTOM TYPES

export type URL = string;
// * must start with https://
// * must not have any whitespace

export type Email = string;
// * must contain an @ symbol
// * must not have any whitespace
// * must be entirely lower case

export type Phone = string;
// * must be exactly 10 characters long
// * must only include numeric characters
// * is assumed to be a US number with a +1 country code

export type Date = string;
// * must be formatted as YYYY-MM-DD

export type Timestamp = number;
// * must be an integer
// * must be a Unix Timestamp in milliseconds

export type UserID = string;
// * must be 28 case-sensitive alphanumeric characters

export type DocumentID = string;
// * must be 20 case-sensitive alphanumeric characters

export type Timezone =
  | "America/Adak"
  | "America/Anchorage"
  | "America/Boise"
  | "America/Chicago"
  | "America/Denver"
  | "America/Detroit"
  | "America/Indiana/Indianapolis"
  | "America/Indiana/Knox"
  | "America/Indiana/Marengo"
  | "America/Indiana/Petersburg"
  | "America/Indiana/Tell_City"
  | "America/Indiana/Vevay"
  | "America/Indiana/Vincennes"
  | "America/Indiana/Winamac"
  | "America/Juneau"
  | "America/Kentucky/Louisville"
  | "America/Kentucky/Monticello"
  | "America/Los_Angeles"
  | "America/Menominee"
  | "America/Metlakatla"
  | "America/New_York"
  | "America/Nome"
  | "America/North_Dakota/Beulah"
  | "America/North_Dakota/Center"
  | "America/North_Dakota/New_Salem"
  | "America/Phoenix"
  | "America/Sitka"
  | "America/Yakutat"
  | "Pacific/Honolulu";

// * must be one of ["America/Adak", "America/Anchorage", "America/Boise", "America/Chicago", "America/Denver", "America/Detroit", "America/Indiana/Indianapolis", "America/Indiana/Knox", "America/Indiana/Marengo", "America/Indiana/Petersburg", "America/Indiana/Tell_City", "America/Indiana/Vevay", "America/Indiana/Vincennes", "America/Indiana/Winamac", "America/Juneau", "America/Kentucky/Louisville", "America/Kentucky/Monticello", "America/Los_Angeles", "America/Menominee", "America/Metlakatla", "America/New_York", "America/Nome", "America/North_Dakota/Beulah", "America/North_Dakota/Center", "America/North_Dakota/New_Salem", "America/Phoenix", "America/Sitka", "America/Yakutat", "Pacific/Honolulu"]

export type Address = string;
// * must be a valid address from Google Places API

export type Latitude = number;
// * must be an integer or float
// * must be between -90 and +90

export type Longitude = number;
// * must be an integer or float
// * must be between -180 and +180

export type WeeklyOffset = number;
// * must be an integer
// * must be between 0 and 604800000

export type UserType = "RESEARCHER" | "PARTICIPANT";
// * must be one of ["RESEARCHER", "PARTICIPANT"]

// DOCUMENTS

interface CreateTracking {
  createdAt: Timestamp;
}

interface UpdateTracking {
  updatedAt: Timestamp;
}

interface TimezoneStructure {
  timezone: {
    region: Timezone;
    autodetect: boolean;
    updatedAt: Timestamp; // ! added later
  };
}

interface LocationStructure {
  location: {
    address: Address;
    coordinates: {
      latitude: Latitude;
      longitude: Longitude;
    };
    autodetect: boolean;
    updatedAt: Timestamp; // ! added later
  };
}

interface NotificationSettingsStructure {
  notifications: {
    local: boolean;
    email: boolean;
    phone: boolean;
  };
}

/* researcher */
export interface ResearcherDocumentStructure
  extends CreateTracking,
    UpdateTracking,
    TimezoneStructure,
    NotificationSettingsStructure {
  organization: string;
  background: string;
  phone: Phone;
  timezone: {
    region: Timezone;
    autodetect: boolean;
    updatedAt: Timestamp; // ! added later
  };
  notifications: {
    local: boolean;
    email: boolean;
    phone: boolean;
  };
}

/* participant */

type BiologicalSex = "Male" | "Female";

export interface ParticipantDocumentStructure
  extends CreateTracking,
    UpdateTracking,
    TimezoneStructure,
    LocationStructure,
    NotificationSettingsStructure {
  sex: BiologicalSex;
  birthdate: Date;
  availability: string;
  phone: Phone;
  enrolled: DocumentID[];
  saved: DocumentID[];
}

export interface CommonNotificationDocumentStructure
  extends CreateTracking,
    UpdateTracking {
  link: URL;
  read: boolean;
  title: string;
  description: string;
}

export interface ResearcherNotificationDocumentStructure
  extends CommonNotificationDocumentStructure {
  code:
    | "CREATE_ACCOUNT"
    | "DELETE_ACCOUNT"
    | "CREATE_STUDY"
    | "DELETE_STUDY"
    | "PARTICIPANT_ENROLLED"
    | "PARTICIPANT_CONFIRMED_MEETING"
    | "PARTICIPANT_CONFIRMED_REMINDER"
    | "MEETING_NOW";
}

export interface ParticipantNotificationDocumentStructure
  extends CommonNotificationDocumentStructure {
  code:
    | "CREATE_ACCOUNT"
    | "DELETE_ACCOUNT"
    | "RESEARCHER_SENT_MESSAGE"
    | "RESEARCHER_CREATED_MEETING"
    | "RESEARCHER_UPDATED_MEETING"
    | "RESEARCHER_DELETED_MEETING"
    | "RESEARCHER_CREATED_REMINDER"
    | "RESEARCHER_UPDATED_REMINDER"
    | "RESEARCHER_DELETED_REMINDER"
    | "RESEARCHER_CHANGED_PARTICIPANT_STATUS"
    | "MEETING_NOW"
    | "REMINDER_NOW";
}

/* study */

type Location = {
  address: Address;
  coordinates: {
    latitude: Latitude;
    longitude: Longitude;
  };
};

type Question = {
  type: "Inclusion" | "Exclusion";
  prompt: string;
};

type Resource = {
  name: string;
  link: URL;
};

export interface StudyDocumentStructure extends CreateTracking, UpdateTracking {
  activated: boolean;
  title: string;
  description: string;
  sex: "All" | "Male" | "Female";

  minAge: number;
  maxAge: number;
  acceptsHealthyVolunteers: boolean;
  type: "Observational" | "Interventional";

  researcher: {
    id: UserID;
    name: string;
    email: Email;
  };

  conditions: string[];

  locations: Location[];
  questions: Question[];
  resources: Resource[];
}

/* study participant */

type Reponse = "Yes" | "No" | "Unsure";

export interface StudyParticipantDocumentStructure
  extends CreateTracking,
    UpdateTracking {
  status: "interested" | "consented" | "screened" | "accepted" | "rejected";
  responses: Reponse[];
  timezone: Timezone;
  availability: string;
}

/* note */

export interface NoteDocumentStructure extends CreateTracking, UpdateTracking {
  title: string;
  body: string;
}

/* message */

export interface MessageDocumentStructure
  extends CreateTracking,
    UpdateTracking {
  user: UserID;
  text: string;
  read: boolean;
}

/* meeting */

export interface MeetingDocumentStructure
  extends CreateTracking,
    UpdateTracking {
  name: string;
  link: URL;
  time: Timestamp;
  participantID: UserID;
  researcherID: UserID;
  studyID: DocumentID;
  confirmedByParticipant: boolean;
}

/* reminder  */

export interface ReminderDocumentStructure
  extends CreateTracking,
    UpdateTracking {
  title: string;
  times: WeeklyOffset[];
  startDate: Date;
  endDate: Date;
  participantID: UserID;
  researcherID: UserID;
  studyID: DocumentID;
  confirmedByParticipant: boolean;
}

/* feedback  */

export interface FeedbackDocumentStructure extends CreateTracking {
  side: UserType;
  email: Email;
  title: string;
  body: string;
  system: "Android" | "iOS" | "macOS" | "Windows" | "Linux";
  browser:
    | "Firefox"
    | "Opera"
    | "Internet Edge"
    | "Chrome"
    | "Safari"
    | "Other";
}

/* mailing  */

export interface MailingDocumentStructure extends CreateTracking {
  side: UserType;
  email: Email;
}

// PAYLOADS

// update researcher

export interface UpdateResearcherPayload
  extends UpdateTracking,
    ResearcherDocumentStructure {}

// read researcher notification

export interface ReadResearcherNotificationPayload extends UpdateTracking {
  read: true;
}

// update participant

export interface UpdateParticipantPayload
  extends UpdateTracking,
    ParticipantDocumentStructure {}

// read participant notification

export interface ReadParticipantNotificationPayload extends UpdateTracking {
  read: true;
}

// update study

export interface UpdateStudyPayload extends UpdateTracking {
  title: string;
  description: string;
  sex: "All" | "Male" | "Female";

  minAge: number;
  maxAge: number;
  acceptsHealthyVolunteers: boolean;
  type: "Observational" | "Interventional";

  conditions: string[];

  locations: Location[];
  questions: Question[];
  resources: Resource[];
}

// toggle activation study

export interface ToggleActivationStudyPayload extends UpdateTracking {
  activated: boolean;
}

// change status study participant

export interface ChangeStatusStudyParticipantPayload extends UpdateTracking {
  status: "interested" | "consented" | "screened" | "accepted" | "rejected";
}

// maintain study participant [BACKEND] (update participant timezone and availability)

export interface MaintainParticipantPayload extends UpdateTracking {
  timezone: Timezone;
  availability: string;
}

// update note

export interface UpdateNotePayload extends UpdateTracking {
  title: string;
  body: string;
}

// read message

export interface ReadMessagePayload extends UpdateTracking {
  read: true;
}

// update meeting

export interface UpdateMeetingPayload extends UpdateTracking {
  name: string;
  link: URL;
  time: Timestamp;
}

// confirm meeting

export interface ConfirmMeetingPayload extends UpdateTracking {
  confirmedByParticipant: true;
}

// update reminder

export interface UpdateReminderPayload extends UpdateTracking {
  title: string;
  times: WeeklyOffset[];
  startDate: Date;
  endDate: Date;
}

// confirm reminder

export interface ConfirmReminderPayload extends UpdateTracking {
  confirmedByParticipant: true;
}

// firebase auth

export interface FirebaseUser {
  uid: string;
  email: string;
  displayName: string;
}

export interface FirebaseUserCustomClaims {
  usertype: "RESEARCHER" | "PARTICIPANT";
  stripeRole: "STANDARD" | "PREMIUM";
}
