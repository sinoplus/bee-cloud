<script lang="ts" setup>
import { reactive, ref } from 'vue'

const dialogFormVisible = ref(false)
const formLabelWidth = '80px'

const form = reactive({
  name: '',
  password: '',
})

function open() {
  form.password = ''
  form.name = ''
  dialogFormVisible.value = true
}
</script>

<template>
  <span>
    <span @click="open"><slot /></span>
    <el-dialog v-model="dialogFormVisible" title="欢迎登录" width="500px">
      <el-form :model="form">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input
            v-model="form.password"
            autocomplete="off"
            type="password"
            show-password
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false">
            登录
          </el-button>
        </span>
      </template>
    </el-dialog>
  </span>
</template>

<style lang="scss" module>

</style>
