"use client";
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../../auth/service";
import { Button } from "@repo/ui/components";
import { useRouter } from "next/navigation";

const UserProfile = () => {
  const router = useRouter();
  const { data } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });

  if (data) {
    return <div>name: {JSON.stringify(data)}</div>;
  }

  return <Button onClick={() => router.push("landing")}>登录</Button>;
};

export default UserProfile;
