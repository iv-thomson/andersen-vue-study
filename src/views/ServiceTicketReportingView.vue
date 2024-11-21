<template>
  <div class="service-ticket-reporting">
    <div class="service-ticket-reporting__header">
      <h1 class="service-ticket-reporting__page-title">
        Service ticket reporting
      </h1>
      <button class="service-ticket-reporting__export-btn">
        <img src="@/assets/icons/file-excel.svg" alt="export" />Export to Excel
      </button>
    </div>
    <div class="service-ticket-reporting__table-wrapper">
      <div class="service-ticket-reporting__table-header">
        <h2 class="service-ticket-reporting__table-title">Service tickets</h2>
        <div class="service-ticket-reporting__table-filters">
          <BaseSelect
            :options="selectOptions"
            :selected-value="selectedValue"
            @select="handleSelectOption"
          />
          <BaseSearch
            v-model="searchValue"
            placeholder="Search Device List..."
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
      selectedValue: 'all',
      searchValue: '',
    }
  },
  computed: {
    filteredData() {
      let result = [...this.ticketsData]

      if (this.selectedValue !== 'all') {
        result = result.filter(item => item.status === this.selectedValue)
      }

      if (this.searchValue) {
        result = result.filter(item =>
          Object.values(item).some(field =>
            String(field)
              .toLowerCase()
              .includes(this.searchValue.toLowerCase()),
          ),
        )
      }

      return result
    },
  },
  async created() {
    try {
      const data = await getHttpRequest('/service-ticket-reporting.json')
      this.ticketsData = data
    } catch (error) {
      console.error('Data fetching error:', error)
    }
  },
  methods: {
    handleSelectOption(option) {
      this.selectedValue = option.name
      this.searchValue = ''
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

  &__export-btn {
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

  &__table-wrapper {
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

  &__table-header {
    display: flex;
    justify-content: space-between;
  }

  &__table-title {
    margin: 0;
  }

  &__table-filters {
    display: flex;
    align-items: center;
    gap: 18px;
  }
}
</style>
