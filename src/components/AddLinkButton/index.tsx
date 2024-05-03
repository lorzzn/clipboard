import useUserLinksStore from "@/store/userLinks"
import { Button, HStack, PinInput, PinInputField, Text, useDisclosure } from "@chakra-ui/react"
import { RiAddLine, RiCloseLine } from "@remixicon/react"
import { toString } from "lodash"
import { useMemo, useState } from "react"
import { Else, If, Then } from "react-if"

export type AddLinkButtonProps = {
  onSuccess?: (id: string) => void
}

const AddLinkButton = ({ onSuccess }: AddLinkButtonProps) => {
  const [value, setValue] = useState("")
  const { isOpen, onOpen, onClose: _onClose } = useDisclosure()
  const [saveLoading, setSaveLoading] = useState(false)

  const createLink = useUserLinksStore((s) => s.createLink)

  const valueIsOk = useMemo(() => toString(value).length === 6, [value])

  const onClose = () => {
    setValue("")
    _onClose()
  }

  const handleConfim = async () => {
    setSaveLoading(true)
    try {
      await createLink(value)
      onSuccess?.(value)
      onClose()
    } catch (error) {}
    setSaveLoading(false)
  }

  return (
    <div className="flex flex-col space-y-3">
      <If condition={isOpen}>
        <Then>
          <Text fontSize={"2xl"}>Enter the ID you want to link.</Text>
          <div className="flex justify-center items-center py-6">
            <HStack>
              <PinInput value={value} onChange={setValue}>
                <PinInputField />
                <PinInputField />
                <PinInputField />
                <PinInputField />
                <PinInputField />
                <PinInputField />
              </PinInput>
            </HStack>
          </div>

          <div className="flex items-center space-x-3">
            <Button className="space-x-1" colorScheme="gray" onClick={onClose}>
              <RiCloseLine />
              <span>Cancel</span>
            </Button>
            <Button
              onClick={handleConfim}
              className="flex-1"
              colorScheme="blue"
              isLoading={saveLoading}
              isDisabled={!valueIsOk}
            >
              Confirm
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

export default AddLinkButton
