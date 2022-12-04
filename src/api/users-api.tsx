import { APIResponseType, GetItemsType, instance} from "./api"



export const usersAPI = {
  getUser(curruntPage = 1, pageSize = 3, term: string = '', friend: null | boolean = null) {
    return (
      instance.get<GetItemsType>(`users?page=${curruntPage}&count=${pageSize}&term=${term}` + 
      (friend === null ? '' : `&friend=${friend}`))
        .then(response => response.data)
    )
  },
  follow(userId: number) {
    return (instance.post<APIResponseType>(`follow/${userId}`)
    )
  },
  unfollow(userId: number) {
    return (instance.delete<APIResponseType>(`follow/${userId}`)
    )
  },
}