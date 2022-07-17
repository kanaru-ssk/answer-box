import type { Answer, Timestamp, FieldValue } from "types/firebase";

// 回答作成
export const createAnswer = async (questionId: string, answer: string) => {
  if (!questionId) return null;

  const { getFirestore, addDoc, collection, serverTimestamp } = await import(
    "firebase/firestore"
  );

  const db = getFirestore();

  const newQuestion: Omit<Answer, "docId"> = {
    atCreated: serverTimestamp(),
    atUpdated: serverTimestamp(),
    answer: answer,
  };
  addDoc(collection(db, "questions", questionId, "answers"), newQuestion);
};

// 回答取得
export const getAnswers = async (
  questionId: string | undefined,
  start: Timestamp | FieldValue,
  limitNum: number
) => {
  if (!questionId) return [];

  const {
    getFirestore,
    query,
    collection,
    getDocs,
    startAfter,
    orderBy,
    limit,
  } = await import("firebase/firestore");
  const db = getFirestore();

  const queryRef = query(
    collection(db, "questions", questionId, "answers"),
    orderBy("atCreated", "desc"),
    startAfter(start),
    limit(limitNum)
  );
  const querySnap = await getDocs(queryRef);

  const answers: Answer[] = querySnap.docs.map((doc) => {
    return {
      docId: doc.id,
      atCreated: doc.data().atCreated,
      atUpdated: doc.data().atUpdated,
      answer: doc.data().answer,
    };
  });

  return answers;
};

// 最も古い回答取得
export const getOldestAnswer = async (
  questionId: string | null
): Promise<Answer | null> => {
  if (questionId === null) return null;

  const { getFirestore, collection, getDocs, query, where, orderBy, limit } =
    await import("firebase/firestore");

  const db = getFirestore();
  const queryRef = query(
    collection(db, "questions", questionId, "answers"),
    orderBy("atCreated", "asc"),
    limit(1)
  );
  const querySnap = await getDocs(queryRef);

  if (0 < querySnap.size) {
    const answer: Answer = {
      docId: querySnap.docs[0].id,
      atCreated: querySnap.docs[0].data().atCreated,
      atUpdated: querySnap.docs[0].data().atUpdated,
      answer: querySnap.docs[0].data().answer,
    };

    return answer;
  } else {
    return null;
  }
};

// 回答リアルタイム取得
export const getRealTimeAnswers = async (
  questionId: string | undefined,
  start: Timestamp | FieldValue,
  setNewAnswers: React.Dispatch<React.SetStateAction<Answer[]>>
) => {
  if (!questionId) return;

  const { getFirestore, query, collection, startAfter, orderBy, onSnapshot } =
    await import("firebase/firestore");
  const db = getFirestore();

  const queryRef = query(
    collection(db, "questions", questionId, "answers"),
    orderBy("atCreated", "asc"),
    startAfter(start)
  );

  return onSnapshot(queryRef, async (docs) => {
    const answers: Answer[] = [];
    docs.forEach((doc) => {
      const answer: Answer = {
        docId: doc.id,
        atCreated: doc.data().atCreated,
        atUpdated: doc.data().atUpdated,
        answer: doc.data().answer,
      };
      answers.unshift(answer);

      setNewAnswers(answers);
    });
  });
};
