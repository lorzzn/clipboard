"use client"

import useUserStore from "@/store/user"
import { useUserClipboardStore } from "@/store/userClipboard"
import useDidMount from "beautiful-react-hooks/useDidMount"
import Content from "./content"
import Header from "./header"

type LayoutProps = {
  children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  const { getUser } = useUserStore()
  const getClipboard = useUserClipboardStore((s) => s.getClipboard)

  const init = async () => {
    await getUser()
    await getClipboard()
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
