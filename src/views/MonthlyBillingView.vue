<template>
  <div class="monthly-billing">
    <div class="monthly-billing__header">
      <h1 class="monthly-billing__page-title">
        Monthly Billing - <span>September 2024</span>
      </h1>
      <div class="monthly-billing__bread-crumbs">
        <span class="monthly-billing__bread-crumb">Carrier Reports</span>
        <img src="@/assets/icons/chevron-right.svg" alt="chevron" />
        <span class="monthly-billing__bread-crumb">Monthly Billing</span>
      </div>
    </div>
    <div class="monthly-billing__wrapper">
      <div class="asset-management-container">
        <CategorySwitch
          v-model="selectedCategory"
          :categories="categoryOptions"
        >
        </CategorySwitch>
        <AssetsTable :default-category="selectedCategory" />
      </div>
    </div>
  </div>
</template>

<script>
import CategorySwitch from '@/components/AssetsTable/CategorySwitch.vue'
import AssetsTable from '@/components/AssetsTable/AssetsTable.vue'
import { getHttpRequest } from '@/services/httpService'

export default {
  name: 'MonthlyBilling',
  components: {},
  data() {
    return {
      jobsData: [],
      selectOptions: [
        { name: 'all', value: 0 },
        { name: 'completed', value: 1 },
        { name: 'incompleted', value: 2 },
      ],
      selectedValue: 'all',
      searchValue: '',
    }
  },
  computed: {
    filteredData() {
      let result = [...this.jobsData]

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

      result = result.map(item => {
        return Object.keys(item)
          .filter(key => key !== 'statistics')
          .reduce((newItem, key) => {
            newItem[key] = item[key]
            return newItem
          }, {})
      })

      return result
    },
  },
  async created() {
    try {
      const data = await getHttpRequest('/activity-background-jobs.json')
      this.jobsData = data
    } catch (error) {
      console.error('Data fetching error:', error)
    }
  },
  methods: {
    handleSelectOption(option) {
      this.selectedValue = option.name
      this.searchValue = ''
    },

    handleRowButtonClick(rowDataId) {
      this.$router.push({
        name: 'job',
        params: { jobId: rowDataId },
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.monthly-billing {
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
    background: url('../assets/icons/chart-bar.svg') no-repeat center/contain;
  }

  &__bread-crumbs {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  &__bread-crumb {
    font-size: 0.8rem;
    font-weight: 600;
    text-decoration: underline;
    color: #007bff;
    cursor: pointer;
  }

  &__input {
    width: 220px;
    font-size: 0.8rem;
    position: relative;
    padding: 10px 18px;
    border: solid 1px #bdbfc1;
    border-radius: 16px;
    cursor: pointer;
  }

  &__label {
    display: flex;
    flex-direction: column;
    gap: 8px;
    font-size: 0.8rem;
    font-weight: 600;
    &:last-of-type {
      flex: 1;
    }
  }

  &__wrapper {
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

  &__table-filters {
    display: flex;
    align-items: end;
    gap: 18px;
  }
}
</style>
