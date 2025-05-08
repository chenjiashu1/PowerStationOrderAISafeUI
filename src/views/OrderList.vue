<template>
  <el-card>
    <h3>光伏电站订单列表</h3>
    <el-table :data="orderData" border style="width: 100%" v-loading="loading">
      <el-table-column prop="order_no" label="订单编号" width="180" />
      <el-table-column prop="installation_address" label="安装地址" />
      <el-table-column prop="installation_province" label="省份" width="120" />
      <el-table-column prop="installation_province_city" label="城市" width="120" />
      <el-table-column prop="max_support_wind_power" label="最大抗风等级" width="120" />
      <el-table-column label="施工图" width="120">
        <template #default="{row}">
          <el-image 
            :src="row.construction_work_pic" 
            :preview-src-list="[row.construction_work_pic]"
            fit="cover"
            style="width: 80px; height: 60px"
          />
        </template>
      </el-table-column>
      <el-table-column label="操作" width="120">
        <template #default="{row}">
          <el-button type="primary" size="small" @click="viewDetail(row.order_no)">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { ElMessage } from 'element-plus'

interface OrderItem {
  id: number
  order_no: string
  installation_address: string
  installation_province: string
  installation_province_city: string
  installation_county: string
  max_support_wind_power: number | null
  construction_work_pic: string
  pv_pic: string | null
}

export default defineComponent({
  name: 'OrderList',
  setup() {
    const router = useRouter()
    const orderData = ref<OrderItem[]>([])
    const loading = ref(false)

    const fetchOrders = async () => {
      try {
        loading.value = true
        const response = await axios.get('http://localhost:5000/order_list')
        orderData.value = response.data
      } catch (error) {
        ElMessage.error('获取订单列表失败')
        console.error(error)
      } finally {
        loading.value = false
      }
    }

    const viewDetail = (orderNo: string) => {
      router.push({ name: 'OrderDetail', params: { orderNo } })
    }

    onMounted(() => {
      fetchOrders()
    })

    return {
      orderData,
      loading,
      viewDetail
    }
  }
})
</script>

<style scoped>
.el-card {
  margin: 20px;
}
</style>
