/**
 * v-hasPermi 操作权限处理
 * Copyright (c) 2023
 */

import type { DirectiveBinding } from 'vue'
import useUserStore from '@/store/modules/user'

export default {
  mounted(el: HTMLElement, binding: DirectiveBinding, vnode: any) {
    const { value } = binding
    const all_permission = '*:*:*'
    const permissions = useUserStore().permissions

    if (value && Array.isArray(value) && value.length > 0) {
      const permissionFlag = value

      const hasPermissions = permissions.some((permission) => {
        return (
          all_permission === permission || permissionFlag.includes(permission)
        )
      })

      if (!hasPermissions)
        el.parentNode && el.parentNode.removeChild(el)
    }
    else {
      throw new Error('请设置操作权限标签值')
    }
  },
}
