"use client"

import cookie from "js-cookie"
import { useEffect, useState } from "react"
import { getFApiBaseUrl, session } from "./action"
import { UserEntity } from "@/entity/types/user"

const App = () => {
  const [baseUrl, setBaseUrl] = useState("")
  const [user, setUser] = useState<UserEntity>()

  const init = async () => {
    try {
      const baseUrl = getFApiBaseUrl()
      setBaseUrl(baseUrl)

      const res = await session()
      cookie.set("session", res.session, {
        expires: new Date(res.user.expiresAt),
      })
      setUser(res.user as UserEntity)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    init()
  }, [])
  return <div className="flex flex-col">
    <div>hello</div>
    <div>serverless baseUrl: {baseUrl}</div>
    <div>
      {JSON.stringify(user)}
    </div>
  </div>
}

export default App
