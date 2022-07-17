import { useState, useEffect } from "react";

import { Timestamp } from "firebase/firestore";
import { useRouter } from "next/router";
import InfiniteScroll from "react-infinite-scroller";

import AnswerItem from "./AnswerItem";

import { getAnswers, getOldestAnswer, getRealTimeAnswers } from "libs/answer";
import { Answer } from "types/firebase";

const AnswerList = () => {
  const router = useRouter();
  const [oldest, setOldest] = useState<Answer | null>(null);
  const [newAnswers, setNewAnswers] = useState<Answer[]>([]);
  const [oldAnswers, setOldAnswers] = useState<Answer[]>([]);
  const { id } = router.query;

  const limit = 20;

  const hasMore = oldest
    ? !Boolean(oldAnswers.find((i) => i.docId === oldest.docId))
    : false;

  useEffect(() => {
    if (typeof id === "string") {
      const now = Timestamp.now();

      getOldestAnswer(id).then((result) => {
        setOldest(result);
      });
      getAnswers(id, now, limit).then((result) => {
        setOldAnswers(result);
      });
      getRealTimeAnswers(id, now, setNewAnswers);
    }
  }, [id]);

  const onMoreLoad = () => {
    if (oldAnswers[oldAnswers.length - 1] && typeof id === "string") {
      const last = oldAnswers[oldAnswers.length - 1].atCreated;
      getAnswers(id, last, limit).then((results) => {
        setOldAnswers([...oldAnswers, ...results]);
      });
    }
  };

  return (
    <InfiniteScroll
      loadMore={onMoreLoad}
      hasMore={hasMore}
      loader={<div key={0}>loading...</div>}
    >
      <ul>
        {newAnswers.map((answer) => {
          return <AnswerItem key={answer.docId} answer={answer.answer} />;
        })}
        {oldAnswers.map((answer) => {
          return <AnswerItem key={answer.docId} answer={answer.answer} />;
        })}
      </ul>
    </InfiniteScroll>
  );
};

export default AnswerList;
