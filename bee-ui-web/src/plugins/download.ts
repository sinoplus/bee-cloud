import { Message } from '@element-plus/icons-vue'
import axios from 'axios'
import { ElLoading, ElMessage } from 'element-plus'
import { saveAs } from 'file-saver'
import { getToken } from '@/utils/auth'
import errorCode from '@/utils/errorCode'
import { blobValidate } from '@/utils/tools'

const baseURL = import.meta.env.VITE_APP_BASE_API

export default {
  oss(ossId: string) {
    const url = `${baseURL}/resource/oss/download/${ossId}`
    const downloadLoadingInstance = ElLoading.service({
      text: '正在下载数据，请稍候',
      background: 'rgba(0, 0, 0, 0.7)',
    })
    axios({
      method: 'get',
      url,
      responseType: 'blob',
      headers: { Authorization: `Bearer ${getToken()}` },
    }).then((res) => {
      blobValidate(res.data).then((isBlob) => {
        if (isBlob) {
          const blob = new Blob([res.data], { type: 'application/octet-stream' })
          this.saveAs(blob, decodeURI(res.headers['download-filename']))
        }
        else {
          this.printErrMsg(res.data)
        }
        downloadLoadingInstance.close()
      })
    }).catch((r) => {
      console.error(r)
      Message.error('下载文件出现错误，请联系管理员！')
      downloadLoadingInstance.close()
    })
  },
  zip(targetUrl: string, name: string) {
    const url = baseURL + targetUrl
    axios({
      method: 'get',
      url,
      responseType: 'blob',
      headers: {
        Authorization: `Bearer ${getToken()}`,
        datasource: localStorage.getItem('dataName'),
      },
    }).then(async (res) => {
      const isLogin = await blobValidate(res.data)
      if (isLogin) {
        const blob = new Blob([res.data], { type: 'application/zip' })
        this.saveAs(blob, name)
      }
      else {
        this.printErrMsg(res.data)
      }
    })
  },
  saveAs(text: Blob, name: string, opts?: any) {
    saveAs(text, name, opts)
  },
  async printErrMsg(data: any) {
    const resText = await data.text()
    const rspObj = JSON.parse(resText)
    const errMsg = errorCode[rspObj.code] || rspObj.msg || errorCode.default
    ElMessage.error(errMsg)
  },
}
