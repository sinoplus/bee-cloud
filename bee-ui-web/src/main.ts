import { createApp } from 'vue'

import Cookies from 'js-cookie'

import ElementPlus from 'element-plus'

// 中文语言
import locale from 'element-plus/lib/locale/lang/zh-cn'
import 'element-plus/dist/index.css'

import '@/assets/styles/index.scss' // global css

import App from './App.vue'
import store from './store'
import router from './router'

import directive from './directive' // directive

// 注册指令
import plugins from './plugins' // plugins
import { download } from '@/utils/request'

// svg图标
import 'virtual:svg-icons-register'
import SvgIcon from '@/components/SvgIcon/index.vue'
import elementIcons from '@/components/SvgIcon/svgicon'

import {
  addDateRange,
  handleTree,
  parseTime,
  resetForm,
  selectDictLabel,
  selectDictLabels,
} from '@/utils/tools'

import 'animate.css'

const app = createApp(App)

// 全局方法挂载
app.config.globalProperties.download = download
app.config.globalProperties.parseTime = parseTime
app.config.globalProperties.resetForm = resetForm
app.config.globalProperties.handleTree = handleTree
app.config.globalProperties.addDateRange = addDateRange
app.config.globalProperties.selectDictLabel = selectDictLabel
app.config.globalProperties.selectDictLabels = selectDictLabels

app.use(router)
app.use(store)
app.use(plugins)
app.use(elementIcons)
app.component('SvgIcon', SvgIcon)

directive(app)

// 使用element-plus 并且设置全局的大小
app.use<any>(ElementPlus, {
  locale,
  // 支持 large、default、small
  size: Cookies.get('size') || 'default',
})

app.mount('#app')
