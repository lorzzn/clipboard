"use client"

import AddTextButton from "@/components/AddTextButton"
import TextItem from "@/components/TextItem"
import { ClipboardEntity } from "@/entity/clipboard"
import { UserEntity } from "@/entity/types/user"
import { Button, Progress } from "@chakra-ui/react"
import useDidMount from "beautiful-react-hooks/useDidMount"
import cookie from "js-cookie"
import { useState } from "react"
import { When } from "react-if"
import * as actions from "./action"

const App = () => {
  const [user, setUser] = useState<UserEntity>()
  const [clipboard, setClipboard] = useState<ClipboardEntity>({
    data: [],
    id: 0,
  })
  const [loading, setLoading] = useState(true)

  const getClipboard = async () => {
    setLoading(true)
    try {
      setClipboard(await actions.getClipboard())
    } catch (error) {}
    setLoading(false)
  }

  const getSession = async () => {
    const res = await actions.getSession()
    cookie.set("session", res.session, {
      expires: new Date(res.user.expiresAt),
    })
    setUser(res.user as UserEntity)
    await getClipboard()
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
    <div className="flex flex-col relative">
      <When condition={loading}>
        <Progress size="xs" isIndeterminate className="!absolute top-0 left-0 right-0" />
      </When>

      <div className="flex flex-col space-y-2 pt-3">
        {clipboard.data.map((item) => {
          return <TextItem key={item}>{item}</TextItem>
        })}
      </div>

      <When condition={!loading}>
        <div className="pt-3">
          <AddTextButton onSuccess={() => getClipboard()} />
        </div>
      </When>
    </div>
  )
}

export default App
