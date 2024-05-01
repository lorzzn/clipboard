"use client"

import { ClipboardEntity } from "@/entity/clipboard"
import { UserEntity } from "@/entity/types/user"
import useDidMount from "beautiful-react-hooks/useDidMount"
import cookie from "js-cookie"
import { useState } from "react"
import * as actions from "./action"

const App = () => {
  const [user, setUser] = useState<UserEntity>()
  const [clipboard, setClipboard] = useState<ClipboardEntity>()
  const [loading, setLoading] = useState(true)

  const getSession = async () => {
    const res = await actions.getSession()
    cookie.set("session", res.session, {
      expires: new Date(res.user.expiresAt),
    })
    setUser(res.user as UserEntity)
    setClipboard(await actions.getClipboard())
  }

  const init = async () => {
    setLoading(true)
    try {
      await getSession()
    } catch (error) {
      throw error
    }
    setLoading(false)
  }

  useDidMount(() => {
    init()
  })

  return (
    <div className="flex flex-col">
      <div>hello</div>
      {loading && <div>loading</div>}
      <div>{JSON.stringify(user)}</div>
      <div>{JSON.stringify(clipboard)}</div>
    </div>
  )
}

export default App
