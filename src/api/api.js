import axios from "axios";



const instance = axios.create({
  withCredentials: true,
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  headers: {
    "API-KEY": "3b4235c9-3ad0-432a-a8a4-8bf64ae9fa5f"
  }
})

export const usersAPI = {
  getUser(curruntPage = 1, pageSize = 3) {
    return (
      instance.get(`users?page=${curruntPage}&count=${pageSize}`)
        .then(response => response.data)
    )
  },
  getProfile(userId = 2) {
    console.warn("Obsolate method. Plese Use - profileAPI ")
    return (profileAPI.getProfile(userId))
  },
  follow(userId) {
    return (instance.post(`follow/${userId}`)
    )
  },
  unfollow(userId) {
    return (instance.delete(`follow/${userId}`)
    )
  },
}

export const profileAPI = {

  getProfile(userId = 2) {
    return (instance.get(`profile/` + userId)
      .then(response => response.data)
    )
  },
  getStaus(userId) {
    return   instance.get(`/profile/status/` + userId)
  },
  upDateStatus (status) {
    return instance.put(`/profile/status`, {status: status})
  },
  savePhoto(profile) {
    const formData = new FormData();
    formData.append('image', profile)
    return instance.put(`/profile/photo`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  },
  savesFrofile (profile) {
    return (
      instance.put('profile', profile)
    );
  }
}

export const authAPI = {
  me() {
    return (
      instance.get(`auth/me`)
    )
  },
 /*  dateSend () {
    return (
      instance.post('auth/login')
    )
  }, */
  login (email, password, rememberMe = false) {
    return (
      instance.post('auth/login', {email, password, rememberMe})
    );
  },
  loginOut () {
    return (
      instance.delete('auth/login')
    );
  },
}

/*  */

