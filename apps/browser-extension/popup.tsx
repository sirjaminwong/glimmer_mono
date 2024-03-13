"use client"

import { useEffect, useState } from "react"
import { trpc } from "./trpc"

export default function ClientSide(): React.ReactNode {
  const [greeting, setGreeting] = useState("")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  useEffect(() => {
    trpc.user.getUser
      .query({ email: `Tom` })
      .then((data) => setGreeting(data.user?.name || "no name"))
  }, [])
  return (
    <div>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <br />
      <input value={email} onChange={(e) => setEmail(e.target.value)} />
      <button
        onClick={() => {
          if (!name || !email) return
          trpc.user.userCreate.mutate({ name, email })
        }}>
        提交
      </button>
      <p>I am client side: {greeting}</p>
    </div>
  )
}
