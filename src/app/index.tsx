"use client"

import cookie from "js-cookie"
import { useEffect } from "react"
import { createOrUpdateSession } from "./action"

const App = () => {
  const init = async () => {
    const res = await createOrUpdateSession()
    cookie.set("session", res.session, {
      expires: new Date(res.user.expiresAt),
    })
  }

  useEffect(() => {
    init()
  }, [])
  return <div className="flex flex-col">hello</div>
}

export default App
