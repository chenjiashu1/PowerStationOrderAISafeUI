<template>
  <div class="welcome-container">
    <el-card class="welcome-card">
      <template #header>
        <div class="card-header">
          <h2>光伏电站AI应急安全指挥管理系统</h2>
        </div>
      </template>
      <div class="welcome-content">
        <el-image src="/welcome-bg.png" fit="cover" />
        <div class="welcome-text">
          <h3>欢迎使用系统</h3>
          <p>本系统提供光伏电站的AI安全监测、应急指挥和运维管理功能</p>
          <el-button type="primary" @click="goToOrders">进入订单管理</el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'Welcome',
  setup() {
    const router = useRouter()

    const goToOrders = () => {
      router.push('/orders')
    }

    return {
      goToOrders
    }
  }
})
</script>

<style scoped>
.welcome-container {
  padding: 20px;
  height: calc(100vh - 60px);
  display: flex;
  justify-content: center;
  align-items: center;
}

.welcome-card {
  width: 80%;
  max-width: 1000px;
}

.card-header {
  text-align: center;
}

.welcome-content {
  display: flex;
  gap: 20px;
}

.welcome-text {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px;
}

.el-image {
  flex: 1;
  max-height: 400px;
}
</style>
