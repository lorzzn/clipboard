import { ToastId, UseToastOptions, useToast } from "@chakra-ui/react"
import { useRef } from "react"

const useSingleToast = () => {
  const toast = useToast()
  const toastIdRef = useRef<ToastId>("")

  const showToast = (toastOptions: UseToastOptions) => {
    if (toast.isActive(toastIdRef.current)) {
      toast.update(toastIdRef.current, toastOptions)
    } else {
      toastIdRef.current = toast(toastOptions)
    }
  }

  return { showToast }
}

export default useSingleToast
