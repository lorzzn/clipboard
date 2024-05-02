import useSingleToast from "@/hooks/useSingleToast"
import { twclx } from "@/utils/twclx"
import { Button, Card, CardBody, IconButton, Portal } from "@chakra-ui/react"
import { RiDeleteBin5Line, RiDeleteBinLine } from "@remixicon/react"
import useDidMount from "beautiful-react-hooks/useDidMount"
import { motion, useMotionValue } from "framer-motion"
import { throttle } from "lodash"
import { useRef, useState } from "react"
import { Else, If, Then, When } from "react-if"
import * as appActions from "../../app/action"

export type TextItemProps = {
  index: number
  children: string
  onDeleteSuccess?: () => void
}

const TextItem = ({ children, index, onDeleteSuccess }: TextItemProps) => {
  const { showToast } = useSingleToast()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const [isBeingDragged, setIsBeingDragged] = useState<boolean>(false)
  const [isEnteredDelete, setIsEnteredDelete] = useState(false)
  const [deleteLoading, setDeleteLoading] = useState(false)

  const deleteButtonRef = useRef<HTMLButtonElement>(null)

  const lockBodyScroll = (on: boolean) => {
    if (on) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
  }

  const handleXYChange = throttle(
    () => {
      const flag = Boolean(x.get() || y.get())
      setIsBeingDragged(flag)
      lockBodyScroll(flag)
    },
    60,
    { leading: true, trailing: true },
  )

  const handleMouseOrTouchMove = (e: MouseEvent | TouchEvent) => {
    if (!deleteButtonRef.current) {
      setIsEnteredDelete(false)
      return
    }

    const { touches } = e as TouchEvent
    const { clientX, clientY } = touches ? touches[0] : (e as MouseEvent)
    const rect = deleteButtonRef.current.getBoundingClientRect()
    const { top, left, bottom, right } = rect

    if (clientX >= left && clientX <= right && clientY >= top && clientY <= bottom) {
      setIsEnteredDelete(true)
    } else {
      setIsEnteredDelete(false)
    }
  }

  useDidMount(() => {
    x.onChange(handleXYChange)
    y.onChange(handleXYChange)
    window.addEventListener("mousemove", handleMouseOrTouchMove)
    window.addEventListener("touchmove", handleMouseOrTouchMove)
  })

  const handleClick = () => {
    if (isBeingDragged) {
      return
    }

    navigator.clipboard
      .writeText(children as string)
      .then(() => {
        showToast({
          title: "Copied to clipboard",
          status: "success",
          duration: 3000,
          isClosable: true,
        })
      })
      .catch((err) => {
        showToast({
          title: "Failed to copy to clipboard",
          description: err.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        })
      })
  }

  const handleDragEnd = async () => {
    if (!isEnteredDelete) {
      return
    }

    setDeleteLoading(true)
    try {
      await appActions.clipboardAction("delete", index)
      onDeleteSuccess?.()
    } catch (error) {}
    setDeleteLoading(false)
  }

  return (
    <>
      <motion.div
        drag
        dragConstraints={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
        }}
        dragElastic={1}
        style={{ x, y }}
        onDragEnd={handleDragEnd}
      >
        <Card>
          <CardBody
            as={Button}
            onClick={handleClick}
            colorScheme="teal"
            className={twclx(["!justify-start !whitespace-normal !text-start break-all"])}
          >
            {children}
          </CardBody>
        </Card>
      </motion.div>

      <When condition={isBeingDragged}>
        <Portal>
          <div className="fixed bottom-9 w-full flex justify-center pointer-events-none">
            <IconButton
              ref={deleteButtonRef}
              isLoading={deleteLoading}
              aria-label="delete"
              size={"lg"}
              colorScheme="red"
              rounded={"full"}
              sx={{
                backgroundColor: isEnteredDelete ? "red.400" : "red.200",
              }}
              icon={
                <If condition={isEnteredDelete}>
                  <Then>
                    <RiDeleteBin5Line />
                  </Then>
                  <Else>
                    <RiDeleteBinLine />
                  </Else>
                </If>
              }
            />
          </div>
        </Portal>
      </When>
    </>
  )
}

export default TextItem
