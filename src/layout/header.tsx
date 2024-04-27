"use client"

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
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react"
import { RiDeviceFill, RiMenuLine, RiMoonFill, RiSunFill } from "@remixicon/react"
import Link from "next/link"
import { useRef } from "react"
import { Case, Switch } from "react-if"

const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef<HTMLButtonElement | null>(null)
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <div className="flex items-center shadow justify-between px-6 py-2">
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

            <DrawerBody className="!px-0 flex flex-col">
              <Button
                as={Link}
                onClick={onClose}
                href={"/devices"}
                variant={"ghost"}
                rounded={"none"}
                size={"lg"}
                className="!justify-start space-x-2"
              >
                <RiDeviceFill size={"1.2rem"} />
                <span>Devices</span>
              </Button>
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
