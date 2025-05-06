<template>
  <div class="dashboard-container">
    <el-container>
      <el-header class="header">
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
          <div class="logout-container">
            <span class="logout-btn" @click="handleLogout">退出登录</span>
          </div>
        </el-aside>

        <el-main>
          <el-row :gutter="20" style="margin-top: 20px">
            <el-col :span="24">
              <el-card>
                <h3>电站订单管理</h3>
<el-table v-loading="loading" :data="orderData" style="width: 100%" border stripe>
  <el-table-column prop="order_no" label="订单号" width="180" align="center"></el-table-column>
  <el-table-column prop="installation_address" label="安装地址" width="250" align="center">
    <template #default="{row}">
      {{row.installation_province}} {{row.installation_province_city}} {{row.installation_county}}<br/>
      {{row.installation_address}}
    </template>
  </el-table-column>
  <el-table-column prop="max_support_wind_power" label="抗风等级" width="120" align="center">
    <template #default="{row}">
      <el-tag :type="row.max_support_wind_power >= 10 ? 'success' : 'warning'">
        {{row.max_support_wind_power}}级
      </el-tag>
    </template>
  </el-table-column>
  <el-table-column label="电站照片" width="180" align="center">
    <template #default="{row}">
      <el-image 
        style="width: 150px; height: 100px"
        :src="row.pv_pic" 
        :preview-src-list="[row.pv_pic]"
        fit="cover"
        hide-on-click-modal
      ></el-image>
    </template>
  </el-table-column>
  <el-table-column label="施工图" width="180" align="center">
    <template #default="{row}">
      <el-image 
        style="width: 150px; height: 100px"
        :src="row.construction_work_pic" 
        :preview-src-list="[row.construction_work_pic]"
        fit="cover"
        hide-on-click-modal
      ></el-image>
    </template>
  </el-table-column>
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
import { defineComponent, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessageBox } from 'element-plus'
import axios from 'axios'

interface OrderItem {
  order_no: string
  pv_pic: string
  construction_work_pic: string
  installation_address: string
  installation_province: string
  installation_province_city: string
  installation_county: string
  installation_province_code: string
  installation_province_city_code: string
  installation_county_code: string
  max_support_wind_power: number
}

export default defineComponent({
  name: 'Dashboard',
  setup() {
    const router = useRouter()
    const orderData = ref<OrderItem[]>([])
    const loading = ref(false)

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

    const handleMenuSelect = (index: string) => {
      const routes = ['/monitor', '/emergency', '/warning', '/orders']
      router.push(routes[parseInt(index) - 1])
    }

    const fetchOrders = async () => {
      loading.value = true
      try {
        const response = await axios.get('http://127.0.0.1:5000/order_list', {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        })
          orderData.value = response.data.map((item: any) => ({
            order_no: item.order_no,
            pv_pic: item.pv_pic,
            construction_work_pic: item.construction_work_pic,
            installation_address: item.installation_address,
            installation_province: item.installation_province,
            installation_province_city: item.installation_province_city,
            installation_county: item.installation_county,
            installation_province_code: item.installation_province_code,
            installation_province_city_code: item.installation_province_city_code,
            installation_county_code: item.installation_county_code,
            max_support_wind_power: item.max_support_wind_power
          }))
      } catch (error) {
        console.error('获取订单失败:', error)
        ElMessageBox.alert('获取订单数据失败，请检查网络连接或联系管理员', '错误', {
          confirmButtonText: '确定',
          type: 'error'
        })
      } finally {
        loading.value = false
      }
    }

    onMounted(() => {
      fetchOrders()
    })

    return {
      handleLogout,
      handleMenuSelect,
      orderData,
      loading
    }
  }
})
</script>

<style scoped>
.dashboard-container {
  height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.header {
  display: flex;
  align-items: center;
  background: linear-gradient(to right, #1e3c72, #2a5298);
  color: white;
  padding: 0 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.header-title {
  flex: 1;
  text-align: center;
  font-size: 22px;
  font-weight: bold;
  letter-spacing: 1px;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.2);
}

.el-aside {
  background: linear-gradient(to bottom, #2c3e50, #4ca1af);
  position: relative;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
}

.el-menu {
  border-right: none;
}

.logout-container {
  position: absolute;
  bottom: 20px;
  left: 0;
  right: 0;
  text-align: center;
}

.logout-btn {
  cursor: pointer;
  color: #fff;
  padding: 10px 20px;
  border-radius: 4px;
  transition: all 0.3s;
  background: rgba(255,255,255,0.1);
}

.logout-btn:hover {
  background: rgba(255,255,255,0.2);
  color: #fff;
}

.el-main {
  padding: 30px;
  background-color: #f8fafc;
}

.el-card {
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  border: none;
}

.el-card h3 {
  color: #2c3e50;
  font-size: 18px;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
}

.el-table {
  border-radius: 8px;
  overflow: hidden;
}

.el-table::before {
  display: none;
}

.el-image {
  border-radius: 4px;
  transition: transform 0.3s;
}

.el-image:hover {
  transform: scale(1.05);
}

.el-tag {
  font-weight: bold;
}
</style>
