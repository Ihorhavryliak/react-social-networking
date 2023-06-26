import { instance } from "./api";

type GetCapchaUrlResponseType = {
  url: string
}

export const securytyCapchaApi = {
  getCapchaUrl() {
    return (
      instance.get<GetCapchaUrlResponseType>('security/get-captcha-url').then(res => res.data)
    );
  }
};
