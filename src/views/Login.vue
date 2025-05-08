<template>
  <div class="login-container">
    <el-card class="login-card">
      <h2>光伏电站AI应急安全指挥管理系统</h2>
      <el-form 
        :model="loginForm" 
        :rules="loginRules" 
        ref="loginFormRef"
        @submit.prevent="handleLogin"
      >
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            placeholder="请输入用户名"
            prefix-icon="el-icon-user"
          />
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            type="password"
            placeholder="请输入密码"
            prefix-icon="el-icon-lock"
            show-password
          />
        </el-form-item>
        <el-form-item>
          <el-button 
            type="primary" 
            native-type="submit"
            :loading="loading"
            style="width: 100%"
          >
            登录
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

export default defineComponent({
  setup() {
    const loginFormRef = ref()
    const router = useRouter()
    const loading = ref(false)

    const loginForm = reactive({
      username: '',
      password: ''
    })

    const loginRules = reactive({
      username: [
        { required: true, message: '请输入用户名', trigger: 'blur' }
      ],
      password: [
        { required: true, message: '请输入密码', trigger: 'blur' }
      ]
    })

    const handleLogin = () => {
      loginFormRef.value.validate((valid: boolean) => {
        if (valid) {
          loading.value = true
          // 模拟登录验证
          setTimeout(() => {
            if (loginForm.username === 'admin' && loginForm.password === 'admin') {
              localStorage.setItem('isAuthenticated', 'true')
              localStorage.setItem('username', loginForm.username)
              ElMessage.success('登录成功')
              router.push('/')
            } else {
              ElMessage.error('用户名或密码错误')
            }
            loading.value = false
          }, 500)
        }
      })
    }

    return {
      loginFormRef,
      loginForm,
      loginRules,
      loading,
      handleLogin
    }
  }
})
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f7fa;
}
.login-card {
  width: 400px;
  padding: 20px;
}
h2 {
  text-align: center;
  margin-bottom: 20px;
  color: #409eff;
}
</style>
