import type { App } from 'vue'
import copyText from './common/copyText'

export default function directive(app: App) {
  app.directive('copyText', copyText)
}
