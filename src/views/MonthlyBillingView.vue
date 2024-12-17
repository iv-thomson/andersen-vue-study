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
    <div class="monthly-billing__wrapper monthly-billing__wrapper_small">
      <CategorySwitch v-model="selectedCategory" :categories="categoryOptions">
      </CategorySwitch>
    </div>
    <div class="monthly-billing__wrapper monthly-billing__wrapper_medium">
      <BaseChartContainer
        :chart-data="chartDataCopy"
        @chart-created="onChartCreated"
      />
    </div>
  </div>
</template>

<script>
import CategorySwitch from '@/components/AssetsTable/CategorySwitch.vue'
import BaseChartContainer from '@/components/BaseChartContainer/BaseChartContainer.vue'
import initXYChart from '@/components/BaseChartContainer/MonthlyBillingChartConfig/MonthlyBillingChartConfig'
import { getHttpRequest } from '@/services/httpService'

export default {
  name: 'MonthlyBilling',
  components: { CategorySwitch, BaseChartContainer },
  data() {
    return {
      jobsData: [],
      categoryOptions: [
        {
          name: 'July 2024',
        },
        {
          name: 'August 2024',
        },
        {
          name: 'September 2024',
        },
      ],
      selectedCategory: 'September 2024',
      chartData: [
        { country: 'USA', litres1: 20, litres2: 15, litres3: 15 },
        { country: 'Germany', litres1: 35, litres2: 25, litres3: 15 },
        { country: 'France', litres1: 30, litres2: 20, litres3: 15 },
      ],
    }
  },
  computed: {
    chartDataCopy() {
      return JSON.parse(JSON.stringify(this.chartData))
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
    onChartCreated(chart, chartData) {
      // Настраиваем график
      initXYChart(chart, chartData)
    },
  },
}
</script>

<style lang="scss" scoped>
.monthly-billing {
  position: relative;
  padding: 0 80px 30px;
  display: flex;
  flex-direction: column;
  gap: 36px;

  &__header {
    max-width: 1308px;
    position: relative;
    display: flex;
    margin-top: 10px;
    justify-content: space-between;
    align-items: baseline;
  }

  &__page-title {
    padding-left: 40px;
    margin-bottom: 0;
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

  &__wrapper {
    max-width: 1308px;
    display: flex;
    flex-direction: column;
    gap: 25px;
    border: 1px solid #bdbfc1;
    border-radius: 28px;
    box-shadow: 0px 10px 10px -5px #0000000a;
    box-shadow: 0px 20px 25px -5px #0000001a;
    &_small {
      padding: 0 18px;
    }
    &_medium {
      padding: 24px;
    }
  }

  &__table-filters {
    display: flex;
    align-items: end;
    gap: 18px;
  }
}
</style>
