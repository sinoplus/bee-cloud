import { defineStore } from 'pinia'
import type { IUserInfo } from './type/index'
import { getInfo, login, logout } from '@/api/login'
import { getToken, removeToken, setToken } from '@/utils/auth'
import defAva from '@/assets/images/profile.png'

const useUserStore = defineStore('user', {
  state: () => ({
    token: getToken(),
    name: '',
    avatar: '',
    roles: [] as string[],
    permissions: [],
  }),
  actions: {
    // 登录
    login(userInfo: IUserInfo) {
      const username = userInfo.username.trim()
      const password = userInfo.password
      const code = userInfo.code
      const uuid = userInfo.uuid
      return new Promise<void>((resolve, reject) => {
        login(username, password, code, uuid)
          .then((res) => {
            console.log(res, 90900)
            const data = res.data
            setToken(data.access_token)
            this.token = data.access_token
            resolve()
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    // 获取用户信息
    getInfo() {
      return new Promise((resolve, reject) => {
        getInfo()
          .then((res: any) => {
            const user = res.data?.user
            const avatar
              = user.avatar == '' || user.avatar == null ? defAva : user.avatar

            if (res.data?.roles?.length > 0) {
              // 验证返回的roles是否是一个非空数组
              this.roles = res.data?.roles
              this.permissions = res.data?.permissions
            }
            else {
              this.roles = ['ROLE_DEFAULT']
            }
            this.name = user.userName
            this.avatar = avatar
            resolve(res)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    // 退出系统
    logOut() {
      return new Promise<void>((resolve, reject) => {
        logout()
          .then(() => {
            this.token = ''
            this.roles = []
            this.permissions = []
            removeToken()
            resolve()
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
  },
})

export default useUserStore
