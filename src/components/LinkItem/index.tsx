import useUserLinksStore from "@/store/userLinks"
import { twclx } from "@/utils/twclx"
import { Button, Card, CardBody, CardFooter } from "@chakra-ui/react"

type LinkItemProps = {
  id: string | number
  onDeleteSuccess?: () => void
}

const LinkItem = ({ id, onDeleteSuccess }: LinkItemProps) => {
  const { deleteLink } = useUserLinksStore()

  const handleDelete = async () => {
    await deleteLink(id)
    onDeleteSuccess?.()
  }

  return (
    <Card>
      <CardBody
        as={Button}
        onClick={() => {}}
        className={twclx(["!justify-start !whitespace-normal !text-start break-all !rounded-b-none"])}
      >
        {id}
      </CardBody>
      <CardFooter className="!p-0">
        <Button className="flex-1 !rounded-t-none" colorScheme="red" onClick={handleDelete}>
          Delete
        </Button>
      </CardFooter>
    </Card>
  )
}

export default LinkItem
