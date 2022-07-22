import admin from "./initFirebaseAdmin";

import type { Question } from "types/firebase";

// 質問取得 server side
export const getQuestionSsr = async (
  questionId: string | string[] | undefined
) => {
  if (typeof questionId !== "string") return null;

  const db = admin.firestore();
  const questionCollection = db.collection("questions");
  const questionDoc = await questionCollection.doc(questionId).get();

  if (questionDoc.exists) {
    const parse = JSON.parse(JSON.stringify(questionDoc.data()));
    const result: Question = {
      docId: questionDoc.id,
      atCreated: parse?.atCreated,
      atUpdated: parse?.atUpdated,
      question: parse?.question,
    };
    return result;
  } else {
    return null;
  }
};
