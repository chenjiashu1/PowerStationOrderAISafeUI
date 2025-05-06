<template>
  <div class="dashboard-container">
    <el-container>
      <el-header class="header">
        <div class="header-left">
          <span class="logout-btn" @click="handleLogout">退出登录</span>
        </div>
        <div class="header-title">光伏电站AI应急安全指挥管理系统</div>
      </el-header>

      <el-container>
        <el-aside width="200px">
          <el-menu default-active="1" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b"
            @select="handleMenuSelect">
            <el-menu-item index="4" route="/orders">电站订单</el-menu-item>
            <el-menu-item index="1" route="/monitor">光伏电站监控</el-menu-item>
            <el-menu-item index="2" route="/emergency">应急指挥</el-menu-item>
            <el-menu-item index="3" route="/warning">安全预警</el-menu-item>
          </el-menu>
        </el-aside>

        <el-main>
          <el-row :gutter="20" style="margin-top: 20px">
            <el-col :span="24">
              <el-card>
                <h3>电站订单管理</h3>
                <el-table :data="orderData" style="width: 100%">
                  <el-table-column prop="id" label="订单ID" width="180"></el-table-column>
                  <el-table-column prop="station" label="电站名称"></el-table-column>
                  <el-table-column prop="type" label="订单类型"></el-table-column>
                  <el-table-column prop="status" label="状态"></el-table-column>
                  <el-table-column prop="date" label="创建日期"></el-table-column>
                </el-table>
              </el-card>
            </el-col>
          </el-row>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { useRouter } from 'vue-router'
  import { ElMessageBox } from 'element-plus'

  export default defineComponent({
    name: 'Dashboard',
    setup() {
      const router = useRouter()

      const handleLogout = () => {
        ElMessageBox.confirm('确定要退出登录吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          localStorage.removeItem('isAuthenticated')
          router.push('/login')
        })
      }

      const handleMenuSelect = (index) => {
        const routes = ['/monitor', '/emergency', '/warning', '/orders']
        router.push(routes[parseInt(index) - 1])
      }

      const orderData = [
        {
          id: 'ORD-2023001',
          station: '阳光光伏电站',
          type: '设备维护',
          status: '进行中',
          date: '2023-05-10'
        },
        {
          id: 'ORD-2023002',
          station: '蓝天光伏电站',
          type: '安全检查',
          status: '已完成',
          date: '2023-05-08'
        },
        {
          id: 'ORD-2023003',
          station: '绿能光伏电站',
          type: '应急处理',
          status: '待处理',
          date: '2023-05-12'
        }
      ]

      return {
        handleLogout,
        handleMenuSelect,
        orderData
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
    background-color: #545c64;
    color: white;
    padding: 0 20px;
  }

  .header-left {
    width: 200px;
  }

  .logout-btn {
    cursor: pointer;
    color: #fff;
  }

  .logout-btn:hover {
    color: #ffd04b;
  }

  .header-title {
    flex: 1;
    text-align: center;
    font-size: 20px;
    font-weight: bold;
  }

  .el-aside {
    background-color: #545c64;
  }

  .el-main {
    padding: 20px;
    background-color: #f0f2f5;
  }

  .chart-container,
  .alert-container {
    height: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>