"use client"

import { UserEntity } from "@/entity/types/user"
import cookie from "js-cookie"
import { useEffect, useState } from "react"
import { session } from "./action"

const App = () => {
  const [user, setUser] = useState<UserEntity>()

  const init = async () => {
    const res = await session()
    cookie.set("session", res.session, {
      expires: new Date(res.user.expiresAt),
    })
    setUser(res.user as UserEntity)
  }

  useEffect(() => {
    init()
  }, [])
  return (
    <div className="flex flex-col">
      <div>hello</div>
      <div>{JSON.stringify(user)}</div>
    </div>
  )
}

export default App
