"use client"

import useUserStore from "@/store/user"
import mitter from "@/utils/mitter"
import { UseToastOptions, useToast } from "@chakra-ui/react"
import useDidMount from "beautiful-react-hooks/useDidMount"
import Content from "./content"
import Header from "./header"

type LayoutProps = {
  children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  const { getUser } = useUserStore()
  const toast = useToast()

  const init = async () => {
    mitter.on("app:toast", (toastConfig) => {
      toast(toastConfig as UseToastOptions)
    })
    await getUser()
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
