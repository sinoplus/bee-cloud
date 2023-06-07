import { defineStore } from 'pinia'
import type { IChangeSetting } from './type/index'
import defaultSettings from '@/settings'
import { useDynamicTitle } from '@/utils/dynamicTitle'

const {
  sideTheme,
  showSettings,
  topNav,
  tagsView,
  fixedHeader,
  sidebarLogo,
  dynamicTitle,
} = defaultSettings
const layoutSetting = localStorage.getItem('layout-setting')
const storageSetting = layoutSetting ? JSON.parse(layoutSetting) : ''

const useSettingsStore = defineStore('settings', {
  state: () => ({
    title: '',
    theme: storageSetting.theme || '#409EFF',
    sideTheme: storageSetting.sideTheme || sideTheme,
    showSettings,
    topNav:
      storageSetting.topNav === undefined ? topNav : storageSetting.topNav,
    tagsView:
      storageSetting.tagsView === undefined
        ? tagsView
        : storageSetting.tagsView,
    fixedHeader:
      storageSetting.fixedHeader === undefined
        ? fixedHeader
        : storageSetting.fixedHeader,
    sidebarLogo:
      storageSetting.sidebarLogo === undefined
        ? sidebarLogo
        : storageSetting.sidebarLogo,
    dynamicTitle:
      storageSetting.dynamicTitle === undefined
        ? dynamicTitle
        : storageSetting.dynamicTitle,
  }),
  actions: {
    // 修改布局设置
    changeSetting(data: IChangeSetting) {
      const {
        key,
        value,
      } = data
      // eslint-disable-next-line no-prototype-builtins
      if (this.hasOwnProperty(key)) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        this[key] = value
      }
    },
    // 设置网页标题
    setTitle(title: string) {
      this.title = title
      useDynamicTitle()
    },
  },
})

export default useSettingsStore
