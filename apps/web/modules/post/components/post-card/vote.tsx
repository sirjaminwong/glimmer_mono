"use client";

import { useMutation } from "@tanstack/react-query";
import { ThumbsUp } from "lucide-react";
import { trpc } from "../../../../app/trpc";
import { useCallback, useState } from "react";

export const Vote = ({
  postId,
  initCount,
}: {
  postId: string;
  initCount: number;
}) => {
  const [count, setCount] = useState(initCount);
  const mutation = useMutation({
    mutationFn: () => {
      return trpc.post.vote.mutate({ postId, userId: "1" });
    },
    onSuccess: (data) => {
      setCount(data.count);
    },
  });

  const handleVote = useCallback(() => {
    mutation.mutate();
  }, []);

  return (
    <>
      <ThumbsUp size="20" onClick={handleVote} />
      {count}
    </>
  );
};
