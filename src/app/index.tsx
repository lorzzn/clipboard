"use client"

import { trpc } from "@/trpc/client"
import { getBaseUrl } from "@/utils/url"
import { useEffect } from "react"

const App = () => {
  const f = async () => {
    const data = await fetch(getBaseUrl()+"/api/nsf")
    console.log(data);
    
  }

  useEffect(() => {
    f()
  }, [])

  return <div className="flex flex-col">hello</div>
}

export default App
