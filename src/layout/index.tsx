"use client"

import { UserEntity } from "@/entity/types/user"
import useUserStore from "@/store/user"
import useDidMount from "beautiful-react-hooks/useDidMount"
import cookie from "js-cookie"
import * as appActions from "../app/action"
import Content from "./content"
import Header from "./header"

type LayoutProps = {
  children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  const { setUser, setLoading, getClipboard } = useUserStore()

  const getSession = async () => {
    const res = await appActions.getSession()
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
    <div className="min-h-screen flex flex-col max-h-screen overflow-x-hidden">
      <Header />
      <Content>{children}</Content>
    </div>
  )
}

export default Layout
