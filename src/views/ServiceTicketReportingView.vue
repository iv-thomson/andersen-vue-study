<template>
  <div :class="styles['service-ticket-reporting']">
    <h1 :class="styles['service-ticket-reporting__page-title']">
      Service ticket reporting
    </h1>
    <BaseTable :items-data="ticketsData" />
  </div>
</template>

<script>
import styles from '@/styles/ServiceTicketReporting.module.scss'
import BaseTable from '@/components/BaseTable/BaseTable.vue'
import { getHttpRequest } from '@/services/httpService'

export default {
  name: 'ServiceTicketReporting',
  components: {
    BaseTable,
  },
  data() {
    return {
      styles,
      ticketsData: [],
    }
  },
  async created() {
    try {
      const data = await getHttpRequest('/service-ticket-reporting.json')
      this.ticketsData = data
    } catch (error) {
      console.error('Ошибка загрузки данных:', error)
    }
  },
}
</script>
