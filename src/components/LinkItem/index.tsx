import { twclx } from "@/utils/twclx"
import { Button, Card, CardBody } from "@chakra-ui/react"

type LinkItemProps = {
  children?: React.ReactNode
}

const LinkItem = ({ children }: LinkItemProps) => {
  return (
    <Card>
      <CardBody
        as={Button}
        onClick={() => {}}
        className={twclx(["!justify-start !whitespace-normal !text-start break-all"])}
      >
        {children}
      </CardBody>
    </Card>
  )
}

export default LinkItem
