<script setup name="Oss" lang="ts">
import { getCurrentInstance, reactive, ref, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import { delOss, listOss } from '@/api/system/oss'
import { parseTime } from '@/utils/tools'

const router = useRouter()
const { proxy } = getCurrentInstance()

const ossList = ref([])
const open = ref(false)
const showTable = ref(true)
const buttonLoading = ref(false)
const loading = ref(true)
const showSearch = ref(true)
const ids = ref([])
const single = ref(true)
const multiple = ref(true)
const total = ref(0)
const title = ref('')
const type = ref(0)
const previewListResource = ref(true)
const daterangeCreateTime = ref([])
// 默认排序
const defaultSort = ref({
  prop: 'createTime',
  order: 'ascending',
})

const data = reactive({
  form: {},
  // 查询参数
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    fileName: undefined,
    originalName: undefined,
    fileSuffix: undefined,
    url: undefined,
    createTime: undefined,
    createBy: undefined,
    service: undefined,
  },
  rules: {
    file: [
      {
        required: true,
        message: '文件不能为空',
        trigger: 'blur',
      },
    ],
  },
})

const {
  queryParams,
  form,
  rules,
} = toRefs(data)

/** 查询OSS对象存储列表 */
function getList() {
  loading.value = true
  proxy.getConfigKey('sys.oss.previewListResource').then((response) => {
    previewListResource.value = response.msg === undefined ? true : response.msg === 'true'
  })
  listOss(proxy.addDateRange(queryParams.value, daterangeCreateTime.value, 'CreateTime')).then((response: any) => {
    ossList.value = response.rows
    total.value = response.total
    loading.value = false
    showTable.value = true
  })
}

function checkFileSuffix(fileSuffix: string) {
  const arr = ['.png', '.jpg', '.jpeg']
  return arr.includes(String(fileSuffix).toLowerCase())
}

/** 取消按钮 */
function cancel() {
  open.value = false
  reset()
}

/** 表单重置 */
function reset() {
  form.value = {
    file: undefined,
  }
  proxy.resetForm('ossRef')
}

/** 搜索按钮操作 */
function handleQuery() {
  queryParams.value.pageNum = 1
  getList()
}

/** 重置按钮操作 */
function resetQuery() {
  showTable.value = false
  daterangeCreateTime.value = []
  proxy.resetForm('queryRef')
  queryParams.value.orderByColumn = defaultSort.value.prop
  queryParams.value.isAsc = defaultSort.value.order
  handleQuery()
}

/** 选择条数  */
function handleSelectionChange(selection) {
  ids.value = selection.map(item => item.ossId)
  single.value = selection.length !== 1
  multiple.value = !selection.length
}

// 设置列的排序为我们自定义的排序
function handleHeaderClass({ column }) {
  column.order = column.multiOrder
}

// 点击表头进行排序
function handleHeaderCLick(column) {
  if (column.sortable !== 'custom')
    return

  switch (column.multiOrder) {
    case 'descending':
      column.multiOrder = 'ascending'
      break
    case 'ascending':
      column.multiOrder = ''
      break
    default:
      column.multiOrder = 'descending'
      break
  }
  handleOrderChange(column.property, column.multiOrder)
}

function handleOrderChange(prop, order) {
  const orderByArr = queryParams.value.orderByColumn ? queryParams.value.orderByColumn.split(',') : []
  const isAscArr = queryParams.value.isAsc ? queryParams.value.isAsc.split(',') : []
  const propIndex = orderByArr.indexOf(prop)
  if (propIndex !== -1) {
    if (order) {
      // 排序里已存在 只修改排序
      isAscArr[propIndex] = order
    }
    else {
      // 如果order为null 则删除排序字段和属性
      isAscArr.splice(propIndex, 1)// 删除排序
      orderByArr.splice(propIndex, 1)// 删除属性
    }
  }
  else {
    // 排序里不存在则新增排序
    orderByArr.push(prop)
    isAscArr.push(order)
  }
  // 合并排序
  queryParams.value.orderByColumn = orderByArr.join(',')
  queryParams.value.isAsc = isAscArr.join(',')
  getList()
}

/** 任务日志列表查询 */
function handleOssConfig() {
  router.push('/system/oss-config/index')
}

/** 文件按钮操作 */
function handleFile() {
  reset()
  open.value = true
  title.value = '上传文件'
  type.value = 0
}

/** 图片按钮操作 */
function handleImage() {
  reset()
  open.value = true
  title.value = '上传图片'
  type.value = 1
}

/** 提交按钮 */
function submitForm() {
  open.value = false
  getList()
}

/** 下载按钮操作 */
function handleDownload(row) {
  proxy.$download.oss(row.ossId)
}

/** 用户状态修改  */
function handlePreviewListResource(previewListResource) {
  const text = previewListResource ? '启用' : '停用'
  proxy.$modal.confirm(`确认要"${text}""预览列表图片"配置吗?`).then(() => {
    return proxy.updateConfigByKey('sys.oss.previewListResource', previewListResource)
  }).then(() => {
    getList()
    proxy.$modal.msgSuccess(`${text}成功`)
  }).catch(() => {
  })
}

/** 删除按钮操作 */
function handleDelete(row) {
  const ossIds = row.ossId || ids.value
  proxy.$modal.confirm(`是否确认删除OSS对象存储编号为"${ossIds}"的数据项?`).then(() => {
    loading.value = true
    return delOss(ossIds)
  }).then(() => {
    loading.value = false
    getList()
    proxy.$modal.msgSuccess('删除成功')
  }).finally(() => {
    loading.value = false
  })
}

getList()
</script>

<template>
  <div class="app-container">
    <el-form v-show="showSearch" ref="queryRef" :model="queryParams" :inline="true">
      <el-form-item label="文件名" prop="fileName">
        <el-input
          v-model="queryParams.fileName"
          placeholder="请输入文件名"
          clearable
          style="width: 200px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="原名" prop="originalName">
        <el-input
          v-model="queryParams.originalName"
          placeholder="请输入原名"
          clearable
          style="width: 200px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="文件后缀" prop="fileSuffix">
        <el-input
          v-model="queryParams.fileSuffix"
          placeholder="请输入文件后缀"
          clearable
          style="width: 200px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="创建时间">
        <el-date-picker
          v-model="daterangeCreateTime"
          value-format="YYYY-MM-DD HH:mm:ss"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :default-time="[new Date(2000, 1, 1, 0, 0, 0), new Date(2000, 1, 1, 23, 59, 59)]"
        />
      </el-form-item>
      <el-form-item label="上传人" prop="createBy">
        <el-input
          v-model="queryParams.createBy"
          placeholder="请输入上传人"
          clearable
          style="width: 200px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="服务商" prop="service">
        <el-input
          v-model="queryParams.service"
          placeholder="请输入服务商"
          clearable
          style="width: 200px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="search" @click="handleQuery">
          搜索
        </el-button>
        <el-button icon="Refresh" @click="resetQuery">
          重置
        </el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          v-hasPermi="['system:oss:upload']"
          type="primary"
          plain
          icon="Plus"
          @click="handleFile"
        >
          上传文件
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          v-hasPermi="['system:oss:upload']"
          type="primary"
          plain
          icon="Plus"
          @click="handleImage"
        >
          上传图片
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          v-hasPermi="['system:oss:remove']"
          type="danger"
          plain
          icon="Delete"
          :disabled="multiple"
          @click="handleDelete"
        >
          删除
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          v-hasPermi="['system:oss:edit']"
          :type="previewListResource ? 'danger' : 'warning'"
          plain
          @click="handlePreviewListResource(!previewListResource)"
        >
          预览开关 : {{ previewListResource ? "禁用" : "启用" }}
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          v-hasPermi="['system:oss:list']"
          type="info"
          plain
          icon="Operation"
          @click="handleOssConfig"
        >
          配置管理
        </el-button>
      </el-col>
      <right-toolbar v-model:showSearch="showSearch" @queryTable="getList" />
    </el-row>

    <el-table
      v-if="showTable" v-loading="loading" :data="ossList"
      :header-cell-class-name="handleHeaderClass"
      @selection-change="handleSelectionChange"
      @header-click="handleHeaderCLick"
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column v-if="false" label="对象存储主键" align="center" prop="ossId" />
      <el-table-column label="文件名" align="center" prop="fileName" />
      <el-table-column label="原名" align="center" prop="originalName" />
      <el-table-column label="文件后缀" align="center" prop="fileSuffix" />
      <el-table-column label="文件展示" align="center" prop="url">
        <template #default="scope">
          <ImagePreview
            v-if="previewListResource && checkFileSuffix(scope.row.fileSuffix)"
            :width="100" :height="100"
            :src="scope.row.url"
            :preview-src-list="[scope.row.url]"
          />
          <span
            v-if="!previewListResource || !checkFileSuffix(scope.row.fileSuffix)"
            v-text="scope.row.url"
          />
        </template>
      </el-table-column>
      <el-table-column label="创建时间" align="center" prop="createTime" width="180" sortable="custom">
        <template #default="scope">
          <span>{{ parseTime(scope.row.createTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="上传人" align="center" prop="createBy" />
      <el-table-column label="服务商" align="center" prop="service" sortable="custom" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template #default="scope">
          <el-button
            v-hasPermi="['system:oss:download']" link type="primary" icon="Edit"
            @click="handleDownload(scope.row)"
          >
            下载
          </el-button>
          <el-button
            v-hasPermi="['system:oss:remove']" link type="primary" icon="Delete"
            @click="handleDelete(scope.row)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total > 0"
      v-model:page="queryParams.pageNum"
      v-model:limit="queryParams.pageSize"
      :total="total"
      @pagination="getList"
    />

    <!-- 添加或修改OSS对象存储对话框 -->
    <el-dialog v-model="open" :title="title" width="500px" append-to-body>
      <el-form ref="ossRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="文件名">
          <fileUpload v-if="type === 0" v-model="form.file" />
          <imageUpload v-if="type === 1" v-model="form.file" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button :loading="buttonLoading" type="primary" @click="submitForm">
            确 定
          </el-button>
          <el-button @click="cancel">
            取 消
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
