import * as components from '@element-plus/icons-vue'
import type { App } from 'vue'

export default {
  install: (app: App) => {
    for (const key in components) {
      const componentConfig = (components as any)[key]
      app.component(componentConfig.name, componentConfig)
    }
  },
}
