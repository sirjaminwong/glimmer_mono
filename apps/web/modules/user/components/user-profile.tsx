"use client";

import { useQuery } from "@tanstack/react-query";
import { trpc } from "../../../app/trpc";

const UserProfile = () => {
  const { data } = useQuery({
    queryKey: ["user", { screenName: "jamin" }],
    queryFn: () => trpc.user.getUser.query({ screenName: "jaminst" }),
  });

  return <div>name: {JSON.stringify(data)}</div>;
};

export default UserProfile;
