import type { VercelRequest, VercelResponse } from "@vercel/node"
// import { randomString } from '../../utils/string'

export default async function handler(request: VercelRequest, response: VercelResponse) {
  console.log( request.cookies.session);
  // console.log(await getSession(true, request.cookies.session));
  
  
  
  const { name = "World" } = request.query
  response.send(`Hello ${name}!`)
}
