<template>
  <div class="monthly-billing">
    <div class="monthly-billing__header">
      <h1 class="monthly-billing__page-title">
        Monthly Billing - <span>{{ firstInfoChartKey }}</span>
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
      <keep-alive>
        <BaseChartContainer
          v-if="chartDataCopy && chartDataCopy.length > 0"
          :chart-data="chartDataCopy"
          @chart-created="onChartCreated"
        >
          <template #info-block>
            <div
              v-for="(value, key) in infoChartData"
              :key="value + key"
              class="info-block info-block_chart"
            >
              <div class="info-block__value">{{ '$' + value }}</div>
              <div class="info-block__title">{{ key }}</div>
            </div>
          </template>
        </BaseChartContainer>
        <ProgressSpinner v-else />
      </keep-alive>
    </div>
    <div
      class="monthly-billing__wrapper monthly-billing__wrapper_medium monthly-billing__wrapper_dashboard"
    >
      <div
        v-for="(value, key) in dashboardData"
        :key="value + key"
        class="info-block info-block_dashboard"
      >
        <div class="info-block__value">
          {{ key === 'Average Cost Per Device' ? '$' + value : value }}
        </div>
        <div class="info-block__title">{{ key }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  fetchMonthlyBilling,
  fetchInfoPanelsData,
} from '@/api/montly-billing.api'
import ProgressSpinner from 'primevue/progressspinner'
import CategorySwitch from '@/components/AssetsTable/CategorySwitch.vue'
import BaseChartContainer from '@/components/BaseChartContainer/BaseChartContainer.vue'
import initXYChart from '@/components/BaseChartContainer/MonthlyBillingChartConfig/MonthlyBillingChartConfig'

export default {
  name: 'MonthlyBilling',
  components: { CategorySwitch, BaseChartContainer, ProgressSpinner },
  data() {
    return {
      chartData: [],
      infoData: [],
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
    }
  },
  computed: {
    firstInfoChartKey() {
      return this.infoChartData ? Object.keys(this.infoChartData)[0] : ''
    },
    categoryIndex() {
      return this.categoryOptions.findIndex(
        category => category.name === this.selectedCategory,
      )
    },
    chartDataCopy() {
      return this.categoryIndex >= 0 && this.chartData[this.categoryIndex]
        ? this.chartData[this.categoryIndex]
        : null
    },
    infoChartData() {
      const data = this.infoData[this.categoryIndex]
      if (!data) return null
      return Object.fromEntries(Object.entries(data).slice(0, 3))
    },
    dashboardData() {
      const data = this.infoData[this.categoryIndex]
      if (!data) return null
      return Object.fromEntries(Object.entries(data).slice(3))
    },
  },
  async created() {
    try {
      this.chartData = await fetchMonthlyBilling()
      this.infoData = await fetchInfoPanelsData()
    } catch (error) {
      console.error('Data fetching error:', error)
    }
  },
  methods: {
    onChartCreated(chart, chartData) {
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
    &_dashboard {
      flex-direction: row;
    }
    &_small {
      padding: 0 18px;
    }
    &_medium {
      padding: 24px;
    }
  }
}

.info-block {
  padding: 18px 18px 28px;
  border-radius: 28px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
  &_chart {
    width: 326px;
    height: 158px;
    border: 1px solid #bdbfc1;
  }
  &_dashboard {
    width: 417px;
    height: 165px;
    background: linear-gradient(135deg, #0e1629 -0.52%, #485066 99.48%);
    color: #ffffff;
  }
  &__value {
    font-size: 48px;
    font-weight: 500;
  }
}
</style>
