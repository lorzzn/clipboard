import RuntimeError from "../../runtime-error"
import * as userServices from "../service/user"
import { HandlerFunction } from "../types"
import { ErrorResponse } from "../types/controller/common"

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

export const createLink: HandlerFunction = async (request, response) => {
  response.status(200).json(await userServices.createLink(request))
}

export const deleteLink: HandlerFunction = async (request, response) => {
  response.status(200).json(await userServices.deleteLink(request))
}

export const getLinkList: HandlerFunction = async (request, response) => {
  response.status(200).json(await userServices.getLinkList(request))
}

export const getLinkedUserClipboard: HandlerFunction = async (request, response) => {
  try {
    response.status(200).json(await userServices.getLinkedUserClipboard(request))
  } catch (error) {
    if (error instanceof RuntimeError) {
      response.status(500).json({
        message: error.message,
        toast: error.toast,
      } as ErrorResponse)
      return
    }
  }
}
