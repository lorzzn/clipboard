import useSingleToast from "@/hooks/useSingleToast"
import { Button, Show, Textarea, useDisclosure } from "@chakra-ui/react"
import { RiAddLine, RiCloseLine } from "@remixicon/react"
import { useState } from "react"
import { Else, If, Then } from "react-if"
import * as appActions from "../../app/action"
import AutoGrowingTextarea from "../AutoGrowingTextarea"

export type AddTextButtonProps = {
  onSuccess?: () => void
}

const AddTextButton = ({ onSuccess }: AddTextButtonProps) => {
  const [textValue, setTextValue] = useState("")
  const { isOpen, onOpen, onClose: _onClose } = useDisclosure()
  const [saveLoading, setSaveLoading] = useState(false)
  const { showToast } = useSingleToast()

  const onClose = () => {
    setTextValue("")
    _onClose()
  }

  const handleReadFromClipboard = () => {
    navigator.clipboard
      .readText()
      .then((text) => {
        setTextValue(text)
      })
      .catch(() => {
        showToast({
          title: "Failed to read from clipboard. Please ensure you have granted permission",
          status: "error",
          isClosable: true,
        })
      })
  }

  const handleSave = async () => {
    setSaveLoading(true)
    try {
      await appActions.userClipboardAction("add", textValue)
      onSuccess?.()
      onClose()
    } catch (error) {}
    setSaveLoading(false)
  }

  return (
    <div className="flex flex-col space-y-3">
      <If condition={isOpen}>
        <Then>
          <Textarea
            as={AutoGrowingTextarea}
            placeholder="input your text here"
            className="w-full flex-1 resize-none min-h-fit break-all"
            value={textValue}
            size={"lg"}
            onChange={(e) => setTextValue(e.target.value)}
          />
          <Show below={"md"}>
            <div className="flex">
              <Button onClick={handleReadFromClipboard} className="flex-1">
                Read from clipboard
              </Button>
            </div>
          </Show>
          <div className="flex items-center space-x-3">
            <Button className="space-x-1" colorScheme="gray" onClick={onClose}>
              <RiCloseLine />
              <span>Cancel</span>
            </Button>
            <Show above="md">
              <Button onClick={handleReadFromClipboard} className="flex-1">
                Read from clipboard
              </Button>
            </Show>
            <Button
              onClick={handleSave}
              className="flex-1"
              colorScheme="blue"
              isLoading={saveLoading}
              isDisabled={!textValue}
            >
              Save
            </Button>
          </div>
        </Then>

        <Else>
          <Button onClick={onOpen} size={"lg"} variant={"outline"}>
            <RiAddLine />
          </Button>
        </Else>
      </If>
    </div>
  )
}

export default AddTextButton
