"use client"

import { getUserClipboard } from "@/app/action"
import TextItem from "@/components/TextItem"
import useSingleToast from "@/hooks/useSingleToast"
import RuntimeError from "@/pkgs/runtime-error"
import useUserStore from "@/store/user"
import { twclx } from "@/utils/twclx"
import { Progress, Text } from "@chakra-ui/react"
import useDidMount from "beautiful-react-hooks/useDidMount"
import { useState } from "react"
import { When } from "react-if"
import * as linksIdActions from "./action"

type LinkIdProps = {
  id: string
}

const LinkId = ({ id }: LinkIdProps) => {
  const ok = useUserStore((state) => state.computed.ok)
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<string[]>([])
  const { showToast } = useSingleToast()

  const init = async () => {
    setLoading(true)
    try {
      const { data } = await linksIdActions.getLinkedUserClipboard(id)
      setData(data)
    } catch (error) {
      const message = (error as RuntimeError).message || "Get user clipboard failed"
      showToast({
        title: message,
        status: "error",
        isClosable: true,
      })
    }
    setLoading(false)
  }

  useDidMount(() => {
    if (ok) {
      init()
    }
    useUserStore.subscribe((state) => {
      if (state.computed.ok) {
        init()
      }
    })
  })

  return (
    <div className={twclx(["flex flex-col relative pt-3"])}>
      <When condition={loading}>
        <Progress size="xs" isIndeterminate className={twclx(["!absolute top-0 left-0 right-0"])} />
      </When>

      <When condition={data.length === 0 && !loading}>
        <Text className="w-full text-center text-gray-400">No data</Text>
      </When>

      <div className="flex flex-col space-y-2 pt-3">
        {data.map((item, index) => {
          return (
            <TextItem key={index} index={index} onDeleteSuccess={() => getUserClipboard()}>
              {item}
            </TextItem>
          )
        })}
      </div>
    </div>
  )
}

export default LinkId
