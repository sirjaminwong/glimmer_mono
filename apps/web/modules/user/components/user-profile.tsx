"use client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getProfile } from "../../auth/service";
import { Button } from "@repo/ui/components";
import { useRouter } from "next/navigation";

const UserProfile = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });

  const handleLogout = () => {
    localStorage.removeItem("token");
    queryClient.clear();
    router.push("/login");
  };

  if (data) {
    return (
      <div>
        <div>name: {JSON.stringify(data)}</div>
        <Button onClick={handleLogout}>退出登录</Button>
      </div>
    );
  }

  return <Button onClick={() => router.push("/login")}>登录</Button>;
};

export default UserProfile;
