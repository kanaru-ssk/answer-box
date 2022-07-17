export type User = import("firebase/auth").User;

export type FieldValue = import("firebase/firestore").FieldValue;
export type Timestamp = import("firebase/firestore").Timestamp;

export type Question = {
  docId: string;
  atCreated: Timestamp | FieldValue;
  atUpdated: Timestamp | FieldValue;
  question: string;
};

export type Answer = {
  docId: string;
  atCreated: Timestamp | FieldValue;
  atUpdated: Timestamp | FieldValue;
  answer: string;
};
