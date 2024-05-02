import useSingleToast from "@/hooks/useSingleToast"
import { twclx } from "@/utils/twclx"
import { Button, Card, CardBody } from "@chakra-ui/react"
import { PropsWithChildren } from "react"

const TextItem = ({ children }: PropsWithChildren) => {
  const { showToast } = useSingleToast()

  const handleClick = () => {
    navigator.clipboard.writeText(children as string).then(() => {
      showToast({
        title: "Copied to clipboard",
        status: "success",
        duration: 3000,
        isClosable: true,
      })
    }).catch((err) => {
      showToast({
        title: "Failed to copy to clipboard",
        description: err.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      })
    })
  }

  return (
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
  )
}

export default TextItem
