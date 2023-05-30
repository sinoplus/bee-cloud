/**
 * v-hasRole 角色权限处理
 * Copyright (c) 2023
 */

import type { DirectiveBinding } from 'vue'
import useUserStore from '@/store/modules/user'

export default {
  mounted(el: HTMLElement, binding: DirectiveBinding, vnode: any) {
    const { value } = binding
    const super_admin = 'admin'
    const roles = useUserStore().roles

    if (value && Array.isArray(value) && value.length > 0) {
      const roleFlag = value

      const hasRole = roles.some((role) => {
        return super_admin === role || roleFlag.includes(role)
      })

      if (!hasRole)
        el.parentNode && el.parentNode.removeChild(el)
    }
    else {
      throw new Error('请设置角色权限标签值')
    }
  },
}
