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
   return instance.get(`profile/`+ userId)
   .then(response => response.data)
  }
}


