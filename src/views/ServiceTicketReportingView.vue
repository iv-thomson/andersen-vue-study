<template>
  <div class="service-ticket-reporting">
    <div class="service-ticket-reporting__header">
      <h1 class="service-ticket-reporting__page-title">
        Service ticket reporting
      </h1>
      <button class="service-ticket-reporting__exportBtn">
        <img src="@/assets/icons/file-excel.svg" alt="export" />Export to Excel
      </button>
    </div>
    <div class="service-ticket-reporting__tableWrapper">
      <div class="service-ticket-reporting__tableHeader">
        <h2 class="service-ticket-reporting__tableTitle">Service tickets</h2>
        <div class="service-ticket-reporting__tableFilters">
          <BaseSelect
            :options="selectOptions"
            :selected-value="selectedValue"
            @select="handleSelectOption"
          />
          <BaseSearch
            v-model="searchValue"
            placeholder="Search Device List..."
            @search="handleSearchClick"
          />
        </div>
      </div>
      <BaseTable :items-data="filteredData" />
    </div>
  </div>
</template>

<script>
import BaseTable from '@/components/BaseTable/BaseTable.vue'
import BaseSelect from '@/components/BaseSelect.vue'
import BaseSearch from '@/components/BaseSearch.vue'
import { getHttpRequest } from '@/services/httpService'

export default {
  name: 'ServiceTicketReporting',
  components: {
    BaseTable,
    BaseSelect,
    BaseSearch,
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
      searchValue: '',
    }
  },
  async created() {
    try {
      const data = await getHttpRequest('/service-ticket-reporting.json')
      this.ticketsData = data
      this.filteredData = [...data]
    } catch (error) {
      console.error('Data fetching error:', error)
    }
  },
  methods: {
    handleSelectOption(option) {
      this.selectedValue = option.name
      this.searchValue = ''

      if (option.name === 'all') {
        this.filteredData = [...this.ticketsData]
      } else {
        this.filteredData = this.ticketsData.filter(
          item => item.status === option.name,
        )
      }
    },

    handleSearchClick(value) {
      if (value) {
        this.filteredData = this.filteredData.filter(item => {
          return Object.values(item).some(field =>
            String(field).toLowerCase().includes(value.toLowerCase()),
          )
        })
      } else {
        this.filteredData = this.ticketsData
        this.selectedValue = 'all'
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.service-ticket-reporting {
  position: relative;
  padding: 0 80px 30px;

  &__header {
    max-width: 1308px;
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__page-title {
    padding-left: 40px;
  }

  &__page-title::before {
    content: '';
    position: absolute;
    top: 25px;
    left: 0;
    width: 32px;
    height: 32px;
    background: url('../assets/icons/chart-line.svg') no-repeat center/contain;
  }

  &__exportBtn {
    width: 157px;
    height: 36px;
    border-radius: 12px;
    cursor: pointer;
    border: none;
    background-color: #004b85;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
  }

  &__tableWrapper {
    max-width: 1308px;
    display: flex;
    flex-direction: column;
    gap: 25px;
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
    margin: 0;
  }

  &__tableFilters {
    display: flex;
    align-items: center;
    gap: 18px;
  }
}
</style>
