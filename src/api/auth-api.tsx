import { instance, APIResponseType, ResultCodeEnum, ResultCodeForCaptchaEnum} from "./api";

type MeResponseDataType = {
  id: number, 
  email: string, 
  login: string
}
type LoginResponceType = {
  userId: number
}

export const authAPI = {
  me() {
    return (
      instance.get<APIResponseType<MeResponseDataType>>(`auth/me`).then(respons => respons.data)
    );
  },

  login(email: string, password: string, rememberMe = false, captcha: null | string = null) {
    return (
      instance.post<APIResponseType<LoginResponceType, ResultCodeEnum | ResultCodeForCaptchaEnum>>('auth/login', { email, password, rememberMe, captcha })
        .then(response => response.data)
    );
  },
  loginOut() {
    return (
      instance.delete('auth/login')
    );
  },
};
