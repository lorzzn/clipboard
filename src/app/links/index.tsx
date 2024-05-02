"use client"

import AddLinkButton from "@/components/AddLinkButton"
import LinkItem from "@/components/LinkItem"
import useUserLinksStore from "@/store/userLinks"
import { twclx } from "@/utils/twclx"
import { Progress, Text } from "@chakra-ui/react"
import useDidMount from "beautiful-react-hooks/useDidMount"
import { When } from "react-if"
import { getClipboard } from "../action"

const Links = () => {
  const { links, getLinks, loading } = useUserLinksStore()

  useDidMount(async () => {
    await getLinks()
    console.log(links)
  })

  return (
    <div className={twclx(["flex flex-col relative"])}>
      <Text fontWeight={"bold"} fontSize={"2xl"}>
        Linked IDs
      </Text>
      <When condition={loading}>
        <Progress size="xs" isIndeterminate className="!absolute top-0 left-0 right-0" />
      </When>

      <div className="flex flex-col space-y-2 pt-3">
        {links.map((item, index) => {
          return <LinkItem key={index}>{item.linkedUserId}</LinkItem>
        })}
      </div>

      <When condition={!loading}>
        <div className="pt-3">
          <AddLinkButton onSuccess={() => getClipboard()} />
        </div>
      </When>
    </div>
  )
}

export default Links
