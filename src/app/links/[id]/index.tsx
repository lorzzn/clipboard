"use client"

import TextItem from "@/components/TextItem"
import useSingleToast from "@/hooks/useSingleToast"
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
  const { ok, loading: _loading } = useUserStore((state) => ({
    ok: state.computed.ok,
    loading: state.loading,
  }))

  const [loading, setLoading] = useState(_loading)
  const [data, setData] = useState<string[]>([])
  const { showToast } = useSingleToast()

  const getData = async () => {
    setLoading(true)
    try {
      const { data, ok } = await linksIdActions.getLinkedUserClipboard(id)
      if (ok) {
        setData(data.data)
      } else {
        if (data.toast) {
          showToast(data.toast)
        }
      }
    } catch (error) {}
    setLoading(false)
  }

  useDidMount(() => {
    if (ok) {
      getData()
    }
    useUserStore.subscribe((state) => {
      if (state.computed.ok) {
        getData()
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
            <TextItem key={index} index={index} onDeleteSuccess={() => getData()}>
              {item}
            </TextItem>
          )
        })}
      </div>
    </div>
  )
}

export default LinkId
