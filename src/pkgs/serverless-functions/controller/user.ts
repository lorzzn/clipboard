import * as userServices from "../service/user"
import { HandlerFunction } from "../types"

export const createSession: HandlerFunction = async (request, response) => {
  response.status(200).json(await userServices.createSession(request))
}

export const updateSession: HandlerFunction = async (request, response) => {
  response.status(200).json(await userServices.updateSession(request))
}

export const getSession: HandlerFunction = async (request, response) => {
  try {
    await updateSession(request, response)
  } catch (error) {
    await createSession(request, response)
  }
}

export const getClipboard: HandlerFunction = async (request, response) => {
  response.status(200).json(await userServices.getClipboard(request))
}

export const userClipboardAction: HandlerFunction = async (request, response) => {
  response.status(200).json(await userServices.userClipboardAction(request))
}

export const createRelate: HandlerFunction = async (request, response) => {
  response.status(200).json(await userServices.createLink(request))
}
