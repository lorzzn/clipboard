import { VercelRequest, VercelResponse } from "@vercel/node";

export type HandlerFunction = (request: VercelRequest, response: VercelResponse) => Promise<void> | void
