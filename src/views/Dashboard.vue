<template>
  <div class="dashboard-container">
    <el-container>
      <el-header class="header">
        <div class="header-title">光伏电站AI应急安全指挥系统</div>
        <div class="header-user">
          <el-dropdown>
            <span class="el-dropdown-link">
              <el-avatar :size="30" :src="user.avatar" />
              {{ user.name }}
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>个人中心</el-dropdown-item>
                <el-dropdown-item @click="handleLogout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </el-header>

      <el-container>
        <el-aside width="200px">
          <el-menu
            router
            :default-active="$route.path"
            class="el-menu-vertical"
          >
            <el-menu-item index="/">
              <el-icon><HomeFilled /></el-icon>
              <span>首页</span>
            </el-menu-item>
            <el-menu-item index="/orders">
              <el-icon><Document /></el-icon>
              <span>订单管理</span>
            </el-menu-item>
            <el-menu-item index="/knowledge-base">
              <el-icon><Reading /></el-icon>
              <span>知识库</span>
            </el-menu-item>
          </el-menu>
        </el-aside>

        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import { Document, HomeFilled, Reading } from '@element-plus/icons-vue'

export default defineComponent({
  name: 'Dashboard',
  setup() {
    const router = useRouter()
    const user = {
      name: '管理员',
      avatar: ''
    }

    const handleLogout = () => {
      localStorage.removeItem('isAuthenticated')
      router.push('/login')
    }

    return {
      user,
      handleLogout
    }
  }
})
</script>

<style scoped>
.dashboard-container {
  height: 100vh;
}

.header {
  display: flex;
  align-items: center;
  background: linear-gradient(to right, #1e3c72, #2a5298);
  color: white;
  padding: 0 20px;
}

.header-title {
  flex: 1;
  text-align: center;
  font-size: 22px;
  font-weight: bold;
}

.el-aside {
  background: linear-gradient(to bottom, #2c3e50, #4ca1af);
}

.el-menu {
  border-right: none;
}

.el-main {
  padding: 20px;
  background-color: #f8fafc;
}
</style>
