import { PhotosType, ProfileType } from "../types/types";
import { instance, APIResponseType} from "./api";

//profileAPI --

type SavesFrofileResponDataType = {
  photos: PhotosType
}

export const profileAPI = {
  getProfile(userId = 2) {
    return (instance.get<ProfileType>(`profile/` + userId)
      .then(response => response.data)
    );
  },
  getStaus(userId: number) {
    return instance.get<string>(`/profile/status/` + userId).then(res => res.data);
  },
  upDateStatus(status: string) {
    return instance.put<APIResponseType>(`/profile/status`, { status: status }).then(res => res.data);
  },
  savePhoto(photFile: File) {
    const formData = new FormData();
    formData.append('image', photFile);
    return instance.put<APIResponseType<SavesFrofileResponDataType>>(`/profile/photo`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(res => res.data);
  },
  savesFrofile(profile: ProfileType) {
    return (
      instance.put<APIResponseType>('profile', profile).then(res => res.data)
    );
  }
};
