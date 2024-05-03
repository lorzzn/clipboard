import useUserLinksStore from "@/store/userLinks"
import { twclx } from "@/utils/twclx"
import { Button, Card, CardBody, CardFooter } from "@chakra-ui/react"
import { RiAlertFill } from "@remixicon/react"
import Link from "next/link"
import { When } from "react-if"

type LinkItemProps = {
  id: string | number
  onDeleteSuccess?: () => void
  status: 0 | 1
}

const LinkItem = ({ id, onDeleteSuccess, status }: LinkItemProps) => {
  const { deleteLink } = useUserLinksStore()

  const handleDelete = async () => {
    await deleteLink(id)
    onDeleteSuccess?.()
  }

  return (
    <Card>
      <CardBody
        as={({
          linkedUserID,
          children,
          className,
        }: {
          linkedUserID: string | number
          children: React.ReactNode
          className?: string
        }) => (
          <Button as={Link} href={`/links/${linkedUserID}`} className={className}>
            <div className="flex flex-col">
              <span className="text-2xl">{children}</span>
              <When condition={status === 0}>
                <div className="flex space-x-1 text-xs mt-3 text-orange-300">
                  <RiAlertFill size={"1rem"} />
                  <span>
                    {
                      "This link have not been confirmed, you can click to confirm or click delete to refuse this link request."
                    }
                  </span>
                </div>
              </When>
            </div>
          </Button>
        )}
        linkedUserID={id}
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
