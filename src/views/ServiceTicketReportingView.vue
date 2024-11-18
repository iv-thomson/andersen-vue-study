<template>
  <div class="service-ticket-reporting">
    <h1 class="service-ticket-reporting__page-title">
      Service ticket reporting
    </h1>
    <div class="service-ticket-reporting__tableWrapper">
      <div class="service-ticket-reporting__tableHeader">
        <h2 class="service-ticket-reporting__tableTitle">Service tickets</h2>
        <div class="service-ticket-reporting__tableFilters">
          <BaseSelect
            :options="selectOptions"
            :selected-value="selectedValue"
            @select="handleSelectOption"
          />
        </div>
      </div>
      <BaseTable :items-data="filteredTickets" />
    </div>
  </div>
</template>

<script>
import BaseTable from '@/components/BaseTable/BaseTable.vue'
import BaseSelect from '@/components/BaseSelect.vue'
import { getHttpRequest } from '@/services/httpService'

export default {
  name: 'ServiceTicketReporting',
  components: {
    BaseTable,
    BaseSelect,
  },
  data() {
    return {
      ticketsData: [],
      selectOptions: [
        { name: 'all', value: 0 },
        { name: 'active', value: 1 },
        { name: 'inactive', value: 2 },
        { name: 'suspended', value: 3 },
      ],
      selectedValue: 'Ticket Type',
      filteredData: [],
    }
  },
  computed: {
    filteredTickets() {
      if (this.filteredData.length) return this.filteredData
      else return this.ticketsData
    },
  },
  async created() {
    try {
      const data = await getHttpRequest('/service-ticket-reporting.json')
      this.ticketsData = data
    } catch (error) {
      console.error('Ошибка загрузки данных:', error)
    }
  },
  methods: {
    handleSelectOption(option) {
      this.selectedValue = option.name
      this.filteredData = []
      let that = this
      if (option.name === 'all') return (this.filteredData = [])
      this.ticketsData.map(function (item) {
        if (item.status === option.name) {
          that.filteredData.push(item)
        }
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.service-ticket-reporting {
  position: relative;
  padding: 30px 80px;

  &__page-title::before {
    content: '';
    position: absolute;
    top: 55px;
    left: 35px;
    width: 32px;
    height: 32px;
    background-image: url('../assets/icons/chart-line.svg');
    background-size: contain;
    background-repeat: no-repeat;
  }

  &__tableWrapper {
    max-width: 1308px;
    display: flex;
    flex-direction: column;
    gap: 18px;
    padding: 36px;
    border: 1px solid #bdbfc1;
    border-radius: 28px;
    box-shadow: 0px 10px 10px -5px #0000000a;
    box-shadow: 0px 20px 25px -5px #0000001a;
  }

  &__tableHeader {
    display: flex;
    justify-content: space-between;
  }

  &__tableTitle {
    margin-top: 0;
  }
}
</style>
