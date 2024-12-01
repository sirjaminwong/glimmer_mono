"use client";
import React, { useEffect } from "react";
import { Button, Input } from "@repo/ui/components";
import { useQuery } from "@tanstack/react-query";
import { register } from "../../../modules/auth/service";
import { useUserStore } from "../../../modules/auth/store";
import { useRouter } from "next/navigation";
import { useToast } from "@repo/ui/hooks";

export default function RegisterPage(): JSX.Element {
  const [name, setName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const router = useRouter();
  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) =>
    setName(event.target.value);
  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(event.target.value);
  const handleConfirmPassword = (event: React.ChangeEvent<HTMLInputElement>) =>
    setConfirmPassword(event.target.value);

  const { isPending, error, data, refetch } = useQuery({
    queryKey: ["register"],
    enabled: false,
    queryFn: () => register(name, password),
  });

  const { setUser } = useUserStore();

  const { toast } = useToast();

  useEffect(() => {
    if (data) {
      window.localStorage.setItem("token", data.access_token);
      setUser(data.user);
      toast({
        title: "登录成功",
      });
      router.push("/");
    }
  }, [data, router, setUser, toast]);

  console.log(isPending, error, data);
  return (
    <div className="flex bg-white items-center justify-center min-h-screen">
      <div className="bg-slate-950 p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">注册</h2>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            账号
          </label>
          <Input value={name} onChange={handleChangeName} />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium mb-1">
            密码
          </label>
          <Input value={password} type="password" onChange={handlePassword} />
        </div>
        <div className="mb-6">
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium mb-1"
          >
            确认密码
          </label>
          <Input
            value={confirmPassword}
            type="password"
            onChange={handleConfirmPassword}
          />
        </div>
        <Button
          className="w-full"
          onClick={() => {
            if (password !== confirmPassword) {
              toast({
                title: "两次输入的密码不一致",
                variant: "destructive",
              });
              return;
            }
            refetch();
          }}
        >
          注册
        </Button>
        <div className="mt-4 text-center">
          <p className="text-sm">
            已有账户？
            <a href="/login" className="hover:text-indigo-500 font-medium">
              登录
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
