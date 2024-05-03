"use client"

import useUserStore from "@/store/user"
import mitter from "@/utils/mitter"
import { twclx } from "@/utils/twclx"
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  UseToastOptions,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react"
import { css } from "@emotion/css"
import { RiDeviceFill, RiMenuLine, RiMoonFill, RiRefreshFill, RiSunFill } from "@remixicon/react"
import useDidMount from "beautiful-react-hooks/useDidMount"
import Link from "next/link"
import { useRef } from "react"
import { Case, Switch, When } from "react-if"

const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef<HTMLButtonElement | null>(null)
  const { colorMode, toggleColorMode } = useColorMode()
  const { user, deleteUser } = useUserStore((s) => ({
    user: s.user,
    deleteUser: s.deteleUser,
  }))

  const handleDeleteUser = async () => {
    await deleteUser()
    onClose()
  }

  return (
    <div
      className={twclx([
        "flex items-center shadow justify-between px-6 py-2 sticky top-0 z-50 backdrop-blur-3xl bg-opacity-80",
        css`
          background-color: var(--chakra-colors-chakra-body-bg);
        `,
      ])}
    >
      <div className="flex items-center space-x-1">
        <Button ref={btnRef} colorScheme="gray" variant={"ghost"} onClick={onOpen} size={"sm"}>
          <RiMenuLine size={"1rem"} />
        </Button>
        <Button variant={"link"} as={Link} href={"/"}>
          Clipboard Next
        </Button>
        <Drawer isOpen={isOpen} placement="left" onClose={onClose} finalFocusRef={btnRef}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Clipboard Next</DrawerHeader>

            <DrawerBody className="!px-0 flex flex-col justify-between">
              <div className="flex flex-col">
                <Button
                  as={Link}
                  onClick={onClose}
                  href={"/links"}
                  variant={"ghost"}
                  rounded={"none"}
                  size={"lg"}
                  className="!justify-start space-x-2"
                >
                  <RiDeviceFill size={"1.2rem"} />
                  <span>Links</span>
                </Button>
                <Button
                  onClick={handleDeleteUser}
                  variant={"ghost"}
                  rounded={"none"}
                  size={"lg"}
                  className="!justify-start space-x-2"
                >
                  <RiRefreshFill size={"1.2rem"} />
                  <span>Delete this account</span>
                </Button>
              </div>

              <When condition={user.id}>
                <span className="text-sm text-center opacity-60">ID: {user.id}</span>
              </When>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </div>

      <Menu>
        <MenuButton as={Button} variant={"ghost"} size={"sm"}>
          <Switch>
            <Case condition={colorMode === "light"}>
              <RiSunFill size={"1rem"} />
            </Case>
            <Case condition={colorMode === "dark"}>
              <RiMoonFill size={"1rem"} />
            </Case>
          </Switch>
        </MenuButton>
        <MenuList>
          <MenuOptionGroup value={colorMode} title="Theme" onChange={() => toggleColorMode()}>
            <MenuItemOption value="light">
              <div className="flex items-center">
                <RiSunFill size={"1rem"} className="mr-2" />
                <span>Light</span>
              </div>
            </MenuItemOption>
            <MenuItemOption value="dark">
              <div className="flex items-center">
                <RiMoonFill size={"1rem"} className="mr-2" />
                <span>Dark</span>
              </div>
            </MenuItemOption>
          </MenuOptionGroup>
        </MenuList>
      </Menu>
    </div>
  )
}

export default Header
