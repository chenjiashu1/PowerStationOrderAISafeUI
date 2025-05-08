<template>
  <div class="order-detail-container">
    <el-container>
      <el-header class="header">
        <div class="header-title">订单详情 - 订单号: {{orderNo}}</div>
        <div class="action-buttons">
          <el-button-group>
            <el-button type="primary" @click="handleWorkInspect(orderNo)">安全作业巡查</el-button>
            <el-button type="warning" @click="handleDisasterWarn(orderNo)">自然灾害预警</el-button>
            <el-button type="info" @click="handleSmartAnalysis(orderNo)">智能运维分析</el-button>
            <el-button type="success" @click="handleLog(orderNo)">查看日志</el-button>
            <el-button @click="handleBack">返回</el-button>
          </el-button-group>
        </div>
      </el-header>

      <el-main v-loading="loading">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-card>
              <template #header>
                <div class="card-header">电站信息</div>
              </template>
              <el-descriptions :column="1" border>
                <el-descriptions-item label="订单号">{{orderInfo.order_no}}</el-descriptions-item>
                <el-descriptions-item label="安装地址">{{orderInfo.installation_address}}</el-descriptions-item>
                <el-descriptions-item label="省">{{orderInfo.installation_province}}</el-descriptions-item>
                <el-descriptions-item label="市">{{orderInfo.installation_province_city}}</el-descriptions-item>
                <el-descriptions-item label="区">{{orderInfo.installation_county}}</el-descriptions-item>
                <el-descriptions-item label="最大抗风等级">{{orderInfo.max_support_wind_power || '未设置'}}级</el-descriptions-item>
                <el-descriptions-item label="电站图片">
                  <el-image 
                    style="width: 100%; height: 200px"
                    :src="orderInfo.pv_pic || 'https://cjs-2.oss-cn-shenzhen.aliyuncs.com/%E6%AD%A3%E7%A1%AE%E6%96%BD%E5%B7%A5%E7%9D%80%E8%A3%85.png'"
                    :preview-src-list="[orderInfo.pv_pic || 'https://cjs-2.oss-cn-shenzhen.aliyuncs.com/%E6%AD%A3%E7%A1%AE%E6%96%BD%E5%B7%A5%E7%9D%80%E8%A3%85.png']"
                    fit="cover"
                  />
                </el-descriptions-item>
                <el-descriptions-item label="施工图片">
                  <el-image 
                    style="width: 100%; height: 200px"
                    :src="orderInfo.construction_work_pic"
                    :preview-src-list="[orderInfo.construction_work_pic]"
                    fit="cover"
                  />
                </el-descriptions-item>

              </el-descriptions>
            </el-card>
          </el-col>

          <el-col :span="12">
            <el-card>
              <template #header>
                <div class="card-header">运行数据</div>
              </template>
              <el-table :data="monitorData" border style="width: 100%">
                <el-table-column prop="record_time" label="记录时间" width="180">
                  <template #default="{row}">
                    {{ new Date(row.record_time).toLocaleString() }}
                  </template>
                </el-table-column>
                <el-table-column prop="voltage" label="电压(V)" width="100"></el-table-column>
                <el-table-column prop="current" label="电流(A)" width="100"></el-table-column>
                <el-table-column prop="power_generation" label="发电量(kWh)" width="120"></el-table-column>
                <el-table-column prop="avg_module_temp" label="组件温度(℃)" width="120"></el-table-column>
                <el-table-column prop="avg_ambient_temp" label="环境温度(℃)" width="120"></el-table-column>
                <el-table-column prop="system_efficiency" label="系统效率(%)" width="120"></el-table-column>
                <el-table-column prop="work_hour_count" label="等效利用小时数 (h)" width="120"></el-table-column>
              </el-table>
            </el-card>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, h } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import { ElMessage, ElMessageBox } from 'element-plus'

export default defineComponent({
  name: 'OrderDetail',
  props: {
    orderNo: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const route = useRoute()
    const router = useRouter()
    const orderInfo = ref<any>({})
    const monitorData = ref<any[]>([])
    const loading = ref(false)

    const fetchOrderInfo = async () => {
      try {
        loading.value = true
        const response = await axios.get(`http://localhost:5000/order_info/${props.orderNo}`)
        orderInfo.value = response.data
      } catch (error) {
        ElMessage.error('获取订单信息失败')
      }
    }

    const fetchMonitorData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/order/monitor/${props.orderNo}`)
        monitorData.value = Array.isArray(response.data) ? response.data : [response.data]
      } catch (error) {
        ElMessage.error('获取运行数据失败')
      } finally {
        loading.value = false
      }
    }

    const handleBack = () => {
      router.push('/orders')
    }

    onMounted(() => {
      fetchOrderInfo()
      fetchMonitorData()
    })

    const handleWorkInspect = async (orderNo: string) => {
      try {
        loading.value = true
        const response = await axios.get(`http://localhost:5000/order/work_inspect/${orderNo}`)
        ElMessage.success(response.data.message || '安全作业巡查成功')
      } catch (error) {
        ElMessage.error('安全作业巡查失败')
      } finally {
        loading.value = false
      }
    }

    const handleDisasterWarn = async (orderNo: string) => {
      try {
        loading.value = true
        const response = await axios.get(`http://localhost:5000/order/disaster_warn/${orderNo}`)
        ElMessage.success(response.data.message || '自然灾害预警成功')
      } catch (error) {
        ElMessage.error('自然灾害预警失败')
      } finally {
        loading.value = false
      }
    }

    const handleSmartAnalysis = async (orderNo: string) => {
      try {
        loading.value = true
        const response = await axios.get(`http://localhost:5000/order/smart_analysis/${orderNo}`)
        ElMessage.success(response.data.message || '智能运维分析完成')
      } catch (error) {
        ElMessage.error('智能运维分析失败')
      } finally {
        loading.value = false
      }
    }

    const handleSafetyAnalysis = async (orderNo: string) => {
      try {
        loading.value = true
        const response = await axios.get(`http://localhost:5000/order/smart_analysis/${orderNo}`)
        ElMessageBox({
          title: 'AI安全分析报告',
          message: response.data.report || '未发现安全隐患',
          confirmButtonText: '确定',
          dangerouslyUseHTMLString: true,
          customClass: 'safety-report',
          width: '60%'
        })
      } catch (error) {
        ElMessage.error('安全分析失败')
      } finally {
        loading.value = false
      }
    }

    const handleLog = async (orderNo: string) => {
      try {
        loading.value = true
        const { data } = await axios.get(`http://localhost:5000/order/log/${orderNo}`)
        if (data && data.length > 0) {
          ElMessageBox({
            title: `订单操作日志 - 共${data.length}条`,
            message: () => {
              return h('div', { class: 'log-list-container' }, [
                h('el-timeline', null, 
                  data.map(item => h('el-timeline-item', {
                    props: {
                      timestamp: new Date(item.operation_time).toLocaleString(),
                      placement: 'top',
                      type: item.operation_result === '成功' ? 'success' : 
                            item.operation_result === '失败' ? 'danger' : 'warning'
                    }
                  }, [
                    h('el-card', { class: 'log-item' }, [
                      h('div', { class: 'log-header' }, [
                        h('span', { class: 'log-operation' }, item.operation_name),
                        h('el-tag', { 
                          class: 'log-result',
                          type: item.operation_result === '成功' ? 'success' : 
                                item.operation_result === '失败' ? 'danger' : 'warning'
                        }, item.operation_result)
                      ]),
                      h('div', { class: 'log-content' }, [
                        h('p', { class: 'log-description' }, item.operation_description),
                        h('p', { class: 'log-ai' }, [
                          h('span', { class: 'ai-label' }, 'AI分析: '),
                          item.ai_remark
                        ])
                      ])
                    ])
                  ]))
                )
              ])
            },
            customClass: 'log-dialog',
            width: '700px',
            confirmButtonText: '关闭',
            showClose: true
          })
        } else {
          ElMessage.info('暂无日志记录')
        }
      } catch (error) {
        ElMessage.error('获取日志失败')
      } finally {
        loading.value = false
      }
    }

    return {
      orderInfo,
      monitorData,
      loading,
      handleBack,
      handleWorkInspect,
      handleDisasterWarn,
      handleSmartAnalysis,
      handleSafetyAnalysis,
      handleLog
    }
  }
})
</script>

<style scoped>
.order-detail-container {
  height: 100vh;
  background: #f5f7fa;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fff;
  padding: 0 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.header-title {
  font-size: 18px;
  font-weight: bold;
}

.card-header {
  font-weight: bold;
  font-size: 16px;
}

.el-main {
  padding: 20px;
}

.el-card {
  margin-bottom: 20px;
}
</style>

<style>
.log-dialog {
  max-width: 900px;
  max-height: 600px;
  overflow-y: auto;
  padding: 20px;
}

.log-dialog .el-message-box__content {
  padding: 0;
}

.log-list-container {
  max-height: 500px;
  overflow-y: auto;
  padding: 10px;
}

.log-item {
  margin-bottom: 10px;
}

.log-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.log-operation {
  font-weight: bold;
  font-size: 16px;
}

.log-result {
  margin-left: 10px;
}

.log-content {
  padding: 5px 0;
}

.log-description {
  margin: 5px 0;
  color: #606266;
}

.log-ai {
  margin: 5px 0;
  padding: 8px;
  background: #f5f7fa;
  border-radius: 4px;
}

.ai-label {
  font-weight: bold;
  color: #409eff;
}

.safety-report {
  max-width: 800px;
}
</style>
