import UserLink from "@/entity/userLink"
import { Button, Text } from "@chakra-ui/react"
import { toString } from "lodash"
import Link from "next/link"
import LinkId from "."

type LinkedPageProps = {
  params: {
    id: string
  }
}

const LinkIdPage = (props: LinkedPageProps) => {
  const id = toString(props.params.id)
  if (!UserLink.validateLinkedUserId(id)) {
    return (
      <div className="flex-1 flex flex-col justify-center items-center">
        <Text fontSize={"2xl"} fontWeight={"medium"}>
          The ID format is incorrect.
        </Text>
        <Button as={Link} href={"/"} variant={"link"} size={"lg"} className="mt-4">
          <Text fontWeight={"medium"}>Go home</Text>
        </Button>
      </div>
    )
  }

  return <LinkId id={props.params.id} />
}

export default LinkIdPage
