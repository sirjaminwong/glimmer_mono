"use client";

import { useEffect, useState } from "react";
import { trpc } from "./trpc";

export default function ClientSide(): React.ReactNode {
  const [greeting, setGreeting] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  useEffect(() => {
    trpc.user.getUser.query({ screenName: `jamin` }).then((data) => {
      setGreeting(data?.user?.name || "no name");
    });
    fetch("http://localhost:4000/user/1")
      .then((res) => res.json())
      .then((data) => {
        console.log("data from server:");
        console.log(data);
      });
  }, []);
  return (
    <div>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <br />
      <input value={email} onChange={(e) => setEmail(e.target.value)} />
      <button
        onClick={() => {
          if (!name || !email) return;
          trpc.user.userCreate.mutate({ name, email, screenName: name });
        }}
      >
        提交
      </button>
      <p>I am client side: {greeting}</p>
    </div>
  );
}
