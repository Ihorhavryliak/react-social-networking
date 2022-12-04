import axios from "axios";
import { UserType } from "../types/types";

export const instance = axios.create({
  withCredentials: true,
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  headers: {
    "API-KEY": "3b4235c9-3ad0-432a-a8a4-8bf64ae9fa5f"
  }
})

export type GetItemsType = {
  items: Array<UserType>
  totalCount: number
  error: string | null
}


// enums ResultCodeEnum
export enum ResultCodeEnum {
  Sucsses = 0,
  Error = 1,
}

export enum ResultCodeForCaptchaEnum {
  CaptchaIsRequiret = 10
}


export type APIResponseType<D = {}, RC = ResultCodeEnum> = { 
  data: D
  messages: Array<string>
  resultCode: RC
}
