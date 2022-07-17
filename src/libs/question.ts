import type { Question } from "types/firebase";

// 質問作成
export const createQuestion = async (question: string) => {
  if (!question) return null;

  const { getFirestore, addDoc, collection, serverTimestamp } = await import(
    "firebase/firestore"
  );

  const db = getFirestore();

  const newQuestion: Omit<Question, "docId"> = {
    atCreated: serverTimestamp(),
    atUpdated: serverTimestamp(),
    question: question,
  };
  const docRef = await addDoc(collection(db, "questions"), newQuestion);
  return docRef.id;
};

// 質問取得
export const getQuestion = async (questionId: string | undefined) => {
  if (!questionId) return null;

  const { getFirestore, getDoc, doc } = await import("firebase/firestore");
  const db = getFirestore();
  const docRef = doc(db, "questions", questionId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const result: Question = {
      docId: docSnap.id,
      atCreated: docSnap.data().atCreated,
      atUpdated: docSnap.data().atUpdated,
      question: docSnap.data().question,
    };
    return result;
  } else {
    return null;
  }
};
