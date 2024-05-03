"use client"

import AddLinkButton from "@/components/AddLinkButton"
import LinkItem from "@/components/LinkItem"
import useSingleToast from "@/hooks/useSingleToast"
import useUserStore from "@/store/user"
import useUserLinksStore from "@/store/userLinks"
import { twclx } from "@/utils/twclx"
import { Progress, Text } from "@chakra-ui/react"
import useDidMount from "beautiful-react-hooks/useDidMount"
import { When } from "react-if"

const Links = () => {
  const { links, getLinks, loading } = useUserLinksStore()
  const ok = useUserStore((state) => state.computed.ok)
  const { showToast } = useSingleToast()

  useDidMount(() => {
    if (ok) {
      getLinks()
    }
    useUserStore.subscribe((state) => {
      if (state.computed.ok) {
        getLinks()
      }
    })
  })

  const handleAddLinkSuccess = (id: string) => {
    showToast({
      title: `The request to link ID ${id} has been sent successfully`,
      description:
        "After the request is approved, the ID will be shown in your list. If the id is not exist, new user with the id will not receive this request.",
      status: "success",
      duration: 3000,
      isClosable: true,
    })
  }

  return (
    <div className={twclx(["flex flex-col relative pt-3"])}>
      <When condition={loading}>
        <Progress size="xs" isIndeterminate className="!absolute top-0 left-0 right-0" />
      </When>

      <Text fontWeight={"bold"} fontSize={"2xl"}>
        Linked IDs
      </Text>

      <div className="flex flex-col space-y-2 pt-3">
        {links.map((item, index) => {
          if (item.linkedUserId) {
            return <LinkItem id={item.linkedUserId} status={item.status} key={index} />
          }
        })}
      </div>

      <When condition={!loading}>
        <div className="pt-3">
          <AddLinkButton onSuccess={(id) => handleAddLinkSuccess(id)} />
        </div>
      </When>
    </div>
  )
}

export default Links
