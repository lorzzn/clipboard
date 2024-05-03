"use client"

import AddTextButton from "@/components/AddTextButton"
import TextItem from "@/components/TextItem"
import useUserStore from "@/store/user"
import useUserClipboardStore from "@/store/userClipboard"
import { twclx } from "@/utils/twclx"
import { Progress } from "@chakra-ui/react"
import useDidMount from "beautiful-react-hooks/useDidMount"
import { When } from "react-if"

const App = () => {
  const { userClipboard, loading, getUserClipboard } = useUserClipboardStore()
  const ok = useUserStore((s) => s.computed.ok)

  useDidMount(() => {
    if (ok) {
      getUserClipboard()
    }
    useUserStore.subscribe((state) => {
      if (state.computed.ok) {
        getUserClipboard()
      }
    })
  })

  return (
    <div className={twclx(["flex flex-col relative"])}>
      <When condition={loading}>
        <Progress size="xs" isIndeterminate className={twclx(["!absolute top-0 left-0 right-0"])} />
      </When>

      <div className="flex flex-col space-y-2 pt-3">
        {userClipboard.data.map((item, index) => {
          return (
            <TextItem key={index} index={index} onDeleteSuccess={() => getUserClipboard()}>
              {item}
            </TextItem>
          )
        })}
      </div>

      <When condition={!loading}>
        <div className="pt-3">
          <AddTextButton onSuccess={() => getUserClipboard()} />
        </div>
      </When>
    </div>
  )
}

export default App
