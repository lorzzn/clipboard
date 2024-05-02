"use client"

import AddTextButton from "@/components/AddTextButton"
import TextItem from "@/components/TextItem"
import useUserClipboardStore from "@/store/userClipboard"
import { twclx } from "@/utils/twclx"
import { Progress } from "@chakra-ui/react"
import { When } from "react-if"

const App = () => {
  const { clipboard, loading, getClipboard } = useUserClipboardStore()

  return (
    <div className={twclx(["flex flex-col relative"])}>
      <When condition={loading}>
        <Progress size="xs" isIndeterminate className="!absolute top-0 left-0 right-0" />
      </When>

      <div className="flex flex-col space-y-2 pt-3">
        {clipboard.data.map((item, index) => {
          return (
            <TextItem key={index} index={index} onDeleteSuccess={() => getClipboard()}>
              {item}
            </TextItem>
          )
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
