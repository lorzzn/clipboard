"use client"

import { useEffect } from "react"
import { createOrUpdateSession } from "./action"
import cookie from 'js-cookie'

const App = () => {
  const init = async () => {
    const res = await createOrUpdateSession()
    cookie.set('session', res.session)
  }

  useEffect(() => {
    init()
  }, [])
  return <div className="flex flex-col">hello</div>
}

export default App
